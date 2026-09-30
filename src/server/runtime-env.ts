import "./env";

/** Dynamic lookup so Vite/Nitro cannot replace the value at build time. */
export function getEnv(name: string): string {
  const env = globalThis.process?.env as Record<string, string | undefined> | undefined;
  return String(env?.[name] ?? "").trim();
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
