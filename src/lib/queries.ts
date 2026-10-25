import { db, isSqlite, products } from "@/db";
import type { Product } from "@/db/schema";
import { and, asc, desc, eq, gte, ilike, like, lte, or, type Column } from "drizzle-orm";

// Case-insensitive text search on both dialects
// (SQLite has no ILIKE — LIKE is already case-insensitive there).
function textMatch(column: Column, value: string) {
  return isSqlite ? like(column, value) : ilike(column, value);
}

export type ProductWithRating = Product;

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

export type ShopFilters = {
  category?: string;
  minPrice?: number; // cents
  maxPrice?: number; // cents
  q?: string;
  sort?: SortOption;
};

export async function getProducts(
  filters: ShopFilters = {}
): Promise<Product[]> {
  const conditions = [];
  if (filters.category && filters.category !== "All") {
    conditions.push(eq(products.category, filters.category));
  }
  if (filters.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice));
  }
  if (filters.q) {
    conditions.push(
      or(
        textMatch(products.name, `%${filters.q}%`),
        textMatch(products.description, `%${filters.q}%`),
        textMatch(products.category, `%${filters.q}%`)
      )
    );
  }

  const orderBy = (() => {
    switch (filters.sort) {
      case "price-asc":
        return [asc(products.price)];
      case "price-desc":
        return [desc(products.price)];
      case "rating":
        return [desc(products.rating), desc(products.ratingCount)];
      case "newest":
        return [desc(products.createdAt), desc(products.id)];
      default:
        return [desc(products.featured), asc(products.id)];
    }
  })();

  return db
    .select()
    .from(products)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...orderBy);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .orderBy(asc(products.id))
    .limit(6);
}

// Used only to redirect legacy /product/[slug] URLs to Amazon.
export async function getProductAmazonUrl(slug: string): Promise<string | null> {
  const rows = await db
    .select({ amazonUrl: products.amazonUrl })
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);
  return rows.length ? rows[0].amazonUrl : null;
}

export async function getCategories(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ category: products.category })
    .from(products)
    .orderBy(asc(products.category));
  return rows.map((r) => r.category);
}
