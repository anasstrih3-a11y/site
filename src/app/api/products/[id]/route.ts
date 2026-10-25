import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, products } from "@/db";

export const dynamic = "force-dynamic";

// DELETE /api/products/[id] — remove a product from the admin page.
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id, 10);
    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }
    await db.delete(products).where(eq(products.id, productId));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete the product." },
      { status: 500 }
    );
  }
}
