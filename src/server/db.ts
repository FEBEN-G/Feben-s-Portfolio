import "./env";
import { Pool, type QueryResultRow } from "pg";

let pool: Pool | null = null;
function databaseUrl() {
  return process.env.DATABASE_URL?.trim() ?? "";
}

/** True when DATABASE_URL is a real Postgres connection string. */
export function isDatabaseConfigured() {
  const url = databaseUrl();
  if (!url) return false;
  // Reject the old local-only shorthand
  if (url === "pglite" || url.toLowerCase().startsWith("pglite:")) return false;
  return (
    url.startsWith("postgres://") ||
    url.startsWith("postgresql://")
  );
}

function sslOption() {
  const url = databaseUrl();
  if (process.env.DATABASE_SSL === "false") return false;
  if (process.env.DATABASE_SSL === "true") return { rejectUnauthorized: false };
  // Neon / Render / most cloud hosts need SSL
  if (
    url.includes("localhost") ||
    url.includes("127.0.0.1") ||
    url.includes("@postgres:")
  ) {
    return false;
  }
  return { rejectUnauthorized: false };
}

export function getPool() {
  if (!isDatabaseConfigured()) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL (local: npm run db:up).",
    );
  }

  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl(),
      ssl: sslOption(),
      max: 10,
    });
  }

  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return getPool().query<T>(text, params);
}
