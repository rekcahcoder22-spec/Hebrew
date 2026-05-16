import { NextRequest, NextResponse } from "next/server";
import {
  getVoucherCampaignCode,
  getVoucherDiscountPercent,
} from "@/lib/voucherSignups";
import { normalizePromoCode } from "@/lib/promoCode";

export const runtime = "nodejs";

/** Kiểm tra mã giảm giá — không trả mã chiến dịch khi client chưa gửi mã. */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { code?: string };
    const input = normalizePromoCode(body.code ?? "");
    const expected = normalizePromoCode(getVoucherCampaignCode());
    const valid = Boolean(input) && input === expected;
    return NextResponse.json({
      valid,
      discountPercent: valid ? getVoucherDiscountPercent() : 0,
    });
  } catch (err) {
    console.error("POST /api/vouchers/validate:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
