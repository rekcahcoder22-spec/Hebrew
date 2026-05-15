import { NextResponse } from "next/server";
import {
  countUniqueVoucherSignups,
  displayParticipantCount,
  getVoucherCampaignCode,
  getVoucherDiscountPercent,
  VOUCHER_CAMPAIGN_CAP,
} from "@/lib/voucherSignups";

export const runtime = "nodejs";

/** Số người tham gia hiển thị (công khai, không lộ danh sách SĐT). */
export async function GET() {
  try {
    const unique = await countUniqueVoucherSignups();
    const count = displayParticipantCount(unique);
    return NextResponse.json({
      count,
      cap: VOUCHER_CAMPAIGN_CAP,
      code: getVoucherCampaignCode(),
      discountPercent: getVoucherDiscountPercent(),
    });
  } catch (err) {
    console.error("GET /api/vouchers/stats:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 },
    );
  }
}
