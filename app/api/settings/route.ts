import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getSettings, saveSettings } from "@/lib/products";
import type { BrandSettings } from "@/types";

export async function GET() {
  try {
    const settings = await getSettings();
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

async function saveSettingsHandler(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<BrandSettings> & {
      newAdminPassword?: string;
    };
    const current = await getSettings();
    const { newAdminPassword, adminPassword: clientSentHash, ...rest } = body;
    void clientSentHash;
    delete (rest as Partial<BrandSettings>).adminPassword;
    const next: BrandSettings = { ...current, ...rest };
    if (newAdminPassword && newAdminPassword.length > 0) {
      next.adminPassword = await bcrypt.hash(newAdminPassword, 10);
    }
    await saveSettings(next);
    const { adminPassword, ...publicSettings } = next;
    void adminPassword;
    return NextResponse.json(publicSettings);
  } catch (err) {
    console.error("PUT /api/settings error:", err);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 400 },
    );
  }
}

export async function PUT(request: NextRequest) {
  return saveSettingsHandler(request);
}

export async function POST(request: NextRequest) {
  return saveSettingsHandler(request);
}
