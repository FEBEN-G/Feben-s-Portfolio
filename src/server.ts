import "./server/env";
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { isDatabaseConfigured } from "./server/db";
import { ensureDatabase } from "./server/migrate";
import { getEnv } from "./server/runtime-env";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
let dbBootstrapped = false;

function bootstrapDatabase() {
  if (dbBootstrapped) return;
  dbBootstrapped = true;

  if (getEnv("NODE_ENV") === "production") {
    if (!getEnv("ADMIN_PASSWORD")) {
      console.warn("ADMIN_PASSWORD is not set — /admin login will fail.");
    }
    if (getEnv("ADMIN_SESSION_SECRET").length < 32) {
      console.warn("ADMIN_SESSION_SECRET must be at least 32 characters.");
    }
  }

  if (isDatabaseConfigured()) {
    ensureDatabase().catch((error) => {
      console.error("Database setup failed:", error);
    });
  } else {
    console.warn("DATABASE_URL is not set — serving fallback portfolio content.");
  }
}

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    bootstrapDatabase();
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
