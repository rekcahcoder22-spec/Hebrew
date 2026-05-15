import { NextRequest, NextResponse } from "next/server";
import {
  registerVoucherPhone,
  VOUCHER_CAMPAIGN_CAP,
} from "@/lib/voucherSignups";

export const runtime = "nodejs";

function normalizePhoneDigits(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { phone?: string };
    const digits = normalizePhoneDigits(body.phone);
    if (digits.length < 9 || digits.length > 12) {
      return NextResponse.json(
        { error: "invalid_phone" },
        { status: 400 },
      );
    }

    const result = await registerVoucherPhone(digits);
    return NextResponse.json({
      ok: true,
      isNew: result.isNew,
      count: result.displayCount,
      cap: VOUCHER_CAMPAIGN_CAP,
      code: result.voucherCode,
    });
  } catch (err) {
    console.error("POST /api/vouchers/signup:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
