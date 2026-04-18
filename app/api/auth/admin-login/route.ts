import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
