import {
  createStart,
  createMiddleware,
  createCsrfMiddleware,
} from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
  origin: (ctx) => {
    const forwardedHost = ctx.request.headers.get("x-forwarded-host");
    const forwardedProto = ctx.request.headers.get("x-forwarded-proto") ?? "https";
    if (forwardedHost) {
      return `${forwardedProto}://${forwardedHost.split(",")[0]!.trim()}`;
    }
    const renderUrl = process.env.RENDER_EXTERNAL_URL?.replace(/\/$/, "");
    if (renderUrl) return renderUrl;
    return new URL(ctx.request.url).origin;
  },
  allowRequestsWithoutOriginCheck: true,
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, errorMiddleware],
}));
