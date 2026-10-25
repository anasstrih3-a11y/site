import "dotenv/config";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

// Automatic dialect selection — mirrors src/db/index.ts:
//   DATABASE_URL=file:./dev.db (or missing) -> SQLite, zero install
//   DATABASE_URL=postgresql://...            -> PostgreSQL
// Either way, `npx drizzle-kit push` just works with no extra flags.
const databaseUrl = process.env.DATABASE_URL;
const useSqlite = !databaseUrl || databaseUrl.startsWith("file:");

function sqliteFile(): string {
  const raw = (databaseUrl ?? "").replace(/^file:/, "").trim() || "./dev.db";
  return path.isAbsolute(raw) ? raw : path.resolve(process.cwd(), raw);
}

export default defineConfig(
  useSqlite
    ? {
        dialect: "sqlite",
        schema: "./src/db/schema.sqlite.ts",
        dbCredentials: { url: sqliteFile() },
      }
    : {
        dialect: "postgresql",
        schema: "./src/db/schema.ts",
        dbCredentials: { url: databaseUrl },
      }
);
