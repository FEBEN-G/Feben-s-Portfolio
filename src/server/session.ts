import "./env";
import { createHash, timingSafeEqual } from "node:crypto";
import { useSession, type SessionConfig } from "@tanstack/react-start/server";

export type AdminSessionData = {
  authenticated: boolean;
};

function sessionPassword() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error(
      "Set ADMIN_SESSION_SECRET to a random string of at least 32 characters.",
    );
  }
  return secret.slice(0, 64);
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function getAdminSessionConfig(): SessionConfig {
  return {
    name: "feben-admin",
    password: sessionPassword(),
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  };
}

export async function getAdminSession() {
  return useSession<AdminSessionData>(getAdminSessionConfig());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.data.authenticated) {
    throw new Error("Unauthorized");
  }
  return session;
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not set on the server.");
  }
  return safeEqual(password, expected);
}
