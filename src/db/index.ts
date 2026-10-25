import path from "node:path";
import { Pool } from "pg";
import { drizzle as drizzlePg, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { products as pgProducts } from "./schema";
import type * as pgSchema from "./schema";
import { products as sqliteProducts } from "./schema.sqlite";

const databaseUrl = process.env.DATABASE_URL;

// ---------------------------------------------------------------------------
// Automatic database selection (zero-config local dev):
//   DATABASE_URL=file:./dev.db   -> SQLite file (no install needed)
//   DATABASE_URL missing/empty    -> SQLite file ./dev.db (same as above)
//   DATABASE_URL=postgresql://... -> PostgreSQL (as before)
// ---------------------------------------------------------------------------
export const isSqlite = !databaseUrl || databaseUrl.startsWith("file:");

export function resolveSqlitePath(url = databaseUrl): string {
  const raw = (url ?? "").replace(/^file:/, "").trim() || "./dev.db";
  return path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
}

// Canonical app types come from the Postgres schema; at runtime the
// matching table object for the active dialect is exported below.
export type AppDb = NodePgDatabase<typeof pgSchema>;

const globalForDb = globalThis as typeof globalThis & {
  __arenaPgPool?: Pool;
  __arenaSqliteConn?: Database.Database;
};

let pool: Pool | null = null;
let sqliteConn: Database.Database | null = null;
let appDb: AppDb;
let appProducts: typeof pgProducts;

if (!isSqlite) {
  pool =
    globalForDb.__arenaPgPool ??
    new Pool({ connectionString: databaseUrl });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaPgPool = pool;
  }

  appDb = drizzlePg(pool, { schema: { products: pgProducts } });
  appProducts = pgProducts;
} else {
  // better-sqlite3 creates the file automatically on first connect.
  sqliteConn =
    globalForDb.__arenaSqliteConn ?? new Database(resolveSqlitePath());

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__arenaSqliteConn = sqliteConn;
  }

  const sqliteDb = drizzleSqlite(sqliteConn, {
    schema: { products: sqliteProducts },
  });
  // Same query surface as Postgres for everything this app uses.
  appDb = sqliteDb as unknown as AppDb;
  appProducts = sqliteProducts as unknown as typeof pgProducts;
}

export const db: AppDb = appDb;
// Always import the *runtime* table from "@/db" (not "@/db/schema"),
// so queries hit the correct dialect. Types are identical.
export const products = appProducts;
export { pool };

// Graceful shutdown helper for scripts (e.g. seed.ts).
export async function closeDatabase(): Promise<void> {
  if (sqliteConn) sqliteConn.close();
  if (pool) await pool.end();
}
