import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db, products } from "@/db";

export const dynamic = "force-dynamic";

function slugify(name: string): string {
  const base =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0600-\u06FF]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "product";
  return base;
}

async function uniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  let i = 2;
  for (;;) {
    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    candidate = `${base}-${i}`;
    i += 1;
  }
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// GET /api/products — list all products (newest first), for the admin page.
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(products)
      .orderBy(desc(products.id));
    return NextResponse.json({ products: rows });
  } catch {
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}

// POST /api/products — create a product from the admin form.
// Body: { name, price (dollars), description, category, image, amazonUrl }
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const category =
      typeof body?.category === "string" ? body.category.trim() : "";
    const image = typeof body?.image === "string" ? body.image.trim() : "";
    const amazonUrl =
      typeof body?.amazonUrl === "string" ? body.amazonUrl.trim() : "";
    const priceDollars =
      typeof body?.price === "string" ? parseFloat(body.price) : body?.price;

    if (!name || name.length < 3 || name.length > 200) {
      return NextResponse.json(
        { error: "Product name must be 3–200 characters." },
        { status: 400 }
      );
    }
    if (
      typeof priceDollars !== "number" ||
      !Number.isFinite(priceDollars) ||
      priceDollars <= 0 ||
      priceDollars > 1_000_000
    ) {
      return NextResponse.json(
        { error: "Price must be a positive number (in dollars)." },
        { status: 400 }
      );
    }
    if (!description || description.length > 5000) {
      return NextResponse.json(
        { error: "Description is required (max 5000 characters)." },
        { status: 400 }
      );
    }
    if (!category || category.length > 60) {
      return NextResponse.json(
        { error: "Category is required (max 60 characters)." },
        { status: 400 }
      );
    }
    if (!isHttpUrl(image)) {
      return NextResponse.json(
        { error: "Image URL must be a valid http(s) link." },
        { status: 400 }
      );
    }
    if (!isHttpUrl(amazonUrl)) {
      return NextResponse.json(
        { error: "Amazon link must be a valid http(s) link." },
        { status: 400 }
      );
    }
    let amazonHost = "";
    try {
      amazonHost = new URL(amazonUrl).hostname.toLowerCase();
    } catch {
      // already validated above
    }
    if (!/(^|\.)amazon\./.test(amazonHost)) {
      return NextResponse.json(
        { error: "The purchase link must point to an Amazon page." },
        { status: 400 }
      );
    }

    const price = Math.round(priceDollars * 100); // dollars -> cents
    const slug = await uniqueSlug(name);
    const tagline =
      description.length > 140
        ? `${description.slice(0, 137).trimEnd()}...`
        : description;

    const [created] = await db
      .insert(products)
      .values({
        slug,
        name,
        tagline,
        description,
        category,
        price,
        compareAtPrice: null,
        amazonUrl,
        image,
        rating: 0,
        ratingCount: 0,
        features: [],
        badge: null,
        featured: false,
      })
      .returning();

    return NextResponse.json({ product: created }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to save the product." },
      { status: 500 }
    );
  }
}
