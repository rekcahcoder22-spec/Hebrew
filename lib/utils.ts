export function cn(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Ward/district khi khách chỉ nhập một khối địa chỉ (checkout rút gọn). */
export const SHIPPING_MERGED_MARKER = "\u2014";

export function formatCustomerName(customer: {
  firstName: string;
  lastName: string;
}): string {
  return [customer.firstName, customer.lastName]
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter(Boolean)
    .join(" ")
    .trim();
}
