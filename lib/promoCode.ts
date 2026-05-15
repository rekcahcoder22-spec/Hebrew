/** Chuẩn hóa mã khuyến mãi để so khớp (không phân biệt hoa thường). */
export function normalizePromoCode(raw: string): string {
  return String(raw ?? "").trim().toUpperCase();
}
