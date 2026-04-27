import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  adminSessionCookieOptions,
  createAdminSessionToken,
} from "@/lib/adminAuth";
import { getSettings } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const { password } = (await request.json()) as { password?: string };
    if (!password?.trim()) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }
    const settings = await getSettings();
    const ok = await bcrypt.compare(password, settings.adminPassword);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = createAdminSessionToken(settings.adminPassword);
    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      ...adminSessionCookieOptions,
      value: token,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
