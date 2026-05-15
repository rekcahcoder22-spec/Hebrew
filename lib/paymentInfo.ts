import type { PaymentMethod } from "@/types";

/** Thông tin CK — đồng bộ với chính sách thanh toán (payment-policy). */
export const BANK_TRANSFER_DETAILS = {
  bank: "Vietcombank",
  accountNo: "1018264589",
  accountName: "PHAM DUY NHAT QUANG",
} as const;

export function formatPaymentMethod(
  method: PaymentMethod | undefined,
  lang: "vi" | "en",
): string {
  if (!method) return lang === "vi" ? "—" : "—";
  if (lang === "en") {
    if (method === "bank_transfer") return "Bank transfer";
    if (method === "cod") return "Cash on delivery (COD)";
    return "VietQR (instant transfer)";
  }
  if (method === "bank_transfer") return "Chuyển khoản ngân hàng";
  if (method === "cod") return "Thanh toán khi giao hàng (COD)";
  return "VietQR (chuyển khoản nhanh)";
}
