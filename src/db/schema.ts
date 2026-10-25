import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  real,
  timestamp,
} from "drizzle-orm/pg-core";

// Affiliate catalog: every product links out to its Amazon listing.
// We never sell or fulfill directly — Amazon handles images, checkout,
// shipping, and returns.
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
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
  features: text("features").array().notNull(),
  badge: text("badge"),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
