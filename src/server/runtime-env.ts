import process from "node:process";
import "./env";

/** Dynamic lookup so Vite/Nitro cannot replace the value at build time. */
export function getEnv(name: string): string {
  const fromProcess = process.env[name];
  if (fromProcess != null && String(fromProcess).trim() !== "") {
    return String(fromProcess).trim();
  }
  const globalEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env;
  return String(globalEnv?.[name] ?? "").trim();
}

export function envFlags() {
  const databaseUrl = getEnv("DATABASE_URL");
  return {
    hasDatabaseUrl:
      databaseUrl.startsWith("postgres://") || databaseUrl.startsWith("postgresql://"),
    hasAdminPassword: Boolean(getEnv("ADMIN_PASSWORD")),
    hasSessionSecret: getEnv("ADMIN_SESSION_SECRET").length >= 32,
  };
}
