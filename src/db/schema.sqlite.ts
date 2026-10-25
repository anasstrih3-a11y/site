import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

// SQLite mirror of ./schema.ts (products table) — same table name and
// same column names, so both dialects stay in sync.
// Used automatically when DATABASE_URL is missing or starts with "file:".
// Differences vs Postgres: no serial/arrays/booleans in SQLite, so
//   id       -> auto-increment integer
//   features -> JSON text column (string[])
//   featured -> integer with boolean mode (true/false)
//   createdAt -> integer with timestamp mode (Date)
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  // snapshot of the Amazon price in cents (live price may vary)
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  // Amazon product page, e.g. https://www.amazon.com/dp/B09NBWL8J5
  amazonUrl: text("amazon_url").notNull(),
  // Amazon-hosted product image (m.media-amazon.com)
  image: text("image").notNull(),
  // Amazon star rating snapshot, e.g. 4.7
  rating: real("rating").notNull().default(0),
  // Amazon rating count snapshot
  ratingCount: integer("rating_count").notNull().default(0),
  features: text("features", { mode: "json" }).$type<string[]>().notNull(),
  badge: text("badge"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type SqliteProduct = typeof products.$inferSelect;
