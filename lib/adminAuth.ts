import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { getSettings } from "@/lib/products";

export const ADMIN_SESSION_COOKIE = "hb_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getAdminSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "hebrew-admin-session-dev-secret"
  );
}

function makeSignature(payload: string): string {
  return createHmac("sha256", getAdminSessionSecret())
    .update(payload)
    .digest("hex");
}

export function createAdminSessionToken(passwordHash: string): string {
  const issuedAt = Date.now();
  const payload = `${passwordHash}:${issuedAt}`;
  const signature = makeSignature(payload);
  return `${issuedAt}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string | undefined,
  passwordHash: string,
): boolean {
  if (!token) return false;
  const [issuedAtRaw, signature] = token.split(".");
  if (!issuedAtRaw || !signature) return false;

  const issuedAt = Number(issuedAtRaw);
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return false;

  const ageSeconds = Math.floor((Date.now() - issuedAt) / 1000);
  if (ageSeconds < 0 || ageSeconds > SESSION_MAX_AGE_SECONDS) return false;

  const expected = makeSignature(`${passwordHash}:${issuedAt}`);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const settings = await getSettings();
  const token = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token, settings.adminPassword);
}

export async function isAdminSessionFromCookiesStore(): Promise<boolean> {
  const cookieStore = await cookies();
  const settings = await getSettings();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token, settings.adminPassword);
}

export const adminSessionCookieOptions = {
  name: ADMIN_SESSION_COOKIE,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
