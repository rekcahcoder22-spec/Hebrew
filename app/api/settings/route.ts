import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSettings, saveSettings } from "@/lib/products";
import type { BrandSettings } from "@/types";

export async function GET() {
  try {
    const settings = getSettings();
    const { adminPassword, ...publicSettings } = settings;
    void adminPassword;
    return NextResponse.json(publicSettings);
  } catch {
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<BrandSettings> & {
      newAdminPassword?: string;
    };
    const current = getSettings();
    const { newAdminPassword, adminPassword: clientSentHash, ...rest } = body;
    void clientSentHash;
    delete (rest as Partial<BrandSettings>).adminPassword;
    const next: BrandSettings = { ...current, ...rest };
    if (newAdminPassword && newAdminPassword.length > 0) {
      next.adminPassword = await bcrypt.hash(newAdminPassword, 10);
    }
    saveSettings(next);
    const { adminPassword, ...publicSettings } = next;
    void adminPassword;
    return NextResponse.json(publicSettings);
  } catch {
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 400 },
    );
  }
}
