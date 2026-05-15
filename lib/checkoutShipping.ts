import type { ShippingInfo } from "@/types";

/** Đủ số lượng món trong giỏ để miễn phí ship (tiêu chuẩn / nhanh). */
export const CHECKOUT_FREE_SHIP_MIN_ITEM_QTY = 2;

const FEE_STANDARD = 30_000;
const FEE_EXPRESS = 50_000;

/** Phí ship theo từng phương thức (một kiện / trước khi áp miễn phí đa món). */
export function getCheckoutMethodBaseFee(
  method: ShippingInfo["method"],
): number {
  if (method === "standard") return FEE_STANDARD;
  if (method === "express") return FEE_EXPRESS;
  return 0;
}

/** Cùng quy tắc với trang checkout (đồng bộ với API đặt hàng). */
export function getCheckoutShippingFee(
  method: ShippingInfo["method"],
  totalItemQty: number,
): number {
  if (totalItemQty >= CHECKOUT_FREE_SHIP_MIN_ITEM_QTY) return 0;
  return getCheckoutMethodBaseFee(method);
}
