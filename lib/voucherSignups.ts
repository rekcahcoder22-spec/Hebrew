import { connectDB } from "@/lib/mongodb";
import { VoucherSignupModel } from "@/models/VoucherSignup";
import { normalizePromoCode } from "@/lib/promoCode";

/** Mã giảm giá công khai cho chiến dịch — đổi bằng env VOUCHER_CAMPAIGN_CODE. */
const VOUCHER_CAMPAIGN_CODE_DEFAULT = "HEBREW-VIP";

export function getVoucherCampaignCode(): string {
  const raw = process.env.VOUCHER_CAMPAIGN_CODE?.trim();
  return raw && raw.length > 0 ? raw : VOUCHER_CAMPAIGN_CODE_DEFAULT;
}

/** Phần trăm giảm trên tạm tính khi mã khớp chiến dịch. Env `VOUCHER_DISCOUNT_PERCENT`, mặc định 10. */
export function getVoucherDiscountPercent(): number {
  const raw = process.env.VOUCHER_DISCOUNT_PERCENT?.trim();
  if (!raw) return 10;
  const n = parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 0) return 10;
  return Math.min(100, n);
}

/**
 * Giảm giá (VND) trên tạm tính khi mã trùng `VOUCHER_CAMPAIGN_CODE` (so khớp không phân biệt hoa thường).
 */
export function computeCampaignSubtotalDiscount(
  subtotal: number,
  promoCodeRaw: string | undefined,
): { discount: number; appliedCode: string | null } {
  const canonical = getVoucherCampaignCode();
  const expected = normalizePromoCode(canonical);
  const input = normalizePromoCode(promoCodeRaw ?? "");
  if (!input || input !== expected || !Number.isFinite(subtotal) || subtotal <= 0) {
    return { discount: 0, appliedCode: null };
  }
  const pct = getVoucherDiscountPercent();
  const discount = Math.round((subtotal * pct) / 100);
  return {
    discount: Math.min(Math.max(0, discount), Math.floor(subtotal)),
    appliedCode: canonical,
  };
}

export const VOUCHER_DISPLAY_BASE_DEFAULT = 35;

/** Mục tiêu hiển thị trên thanh tiến độ (UI). */
export const VOUCHER_CAMPAIGN_CAP = 50;

/**
 * Cộng vào số đếm hiển thị. Mặc định 35; ghi đè bằng VOUCHER_SIGNUP_BASE_COUNT (số ≥ 0).
 */
function displayBase(): number {
  const raw = process.env.VOUCHER_SIGNUP_BASE_COUNT;
  if (raw === undefined || String(raw).trim() === "") {
    return VOUCHER_DISPLAY_BASE_DEFAULT;
  }
  const n = parseInt(String(raw), 10);
  if (!Number.isFinite(n) || n < 0) {
    return VOUCHER_DISPLAY_BASE_DEFAULT;
  }
  return n;
}

export async function countUniqueVoucherSignups(): Promise<number> {
  await connectDB();
  return VoucherSignupModel.countDocuments();
}

export function displayParticipantCount(dbUniqueCount: number): number {
  return displayBase() + dbUniqueCount;
}

export type RegisterVoucherPhoneResult = {
  isNew: boolean;
  /** Số hiển thị = base + số SĐT khác nhau trong DB */
  displayCount: number;
  cap: number;
  /** Mã áp dụng tại checkout (cùng mã cho mọi người trong chiến dịch). */
  voucherCode: string;
};

export async function registerVoucherPhone(
  phoneDigits: string,
): Promise<RegisterVoucherPhoneResult> {
  await connectDB();
  let isNew = false;
  try {
    await VoucherSignupModel.create({ phone: phoneDigits });
    isNew = true;
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code !== 11000) throw err;
  }
  const unique = await VoucherSignupModel.countDocuments();
  return {
    isNew,
    displayCount: displayParticipantCount(unique),
    cap: VOUCHER_CAMPAIGN_CAP,
    voucherCode: getVoucherCampaignCode(),
  };
}

export async function listVoucherSignups(
  limit = 500,
): Promise<{ phone: string; createdAt: string }[]> {
  await connectDB();
  const docs = await VoucherSignupModel.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<{ phone: string; createdAt: Date }[]>();
  return docs.map((d) => ({
    phone: d.phone,
    createdAt:
      d.createdAt instanceof Date
        ? d.createdAt.toISOString()
        : new Date(d.createdAt).toISOString(),
  }));
}
