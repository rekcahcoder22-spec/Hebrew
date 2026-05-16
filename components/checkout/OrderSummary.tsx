"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { isUploadImagePath } from "@/lib/image";
import { normalizePromoCode } from "@/lib/promoCode";
import type { CartItem } from "@/types";
import {
  VOUCHER_SESSION_KEY,
  VOUCHER_UNLOCKED_EVENT,
  VoucherPhoneSignup,
} from "@/components/promo/VoucherPhoneSignup";

const stripeStyle = {
  background:
    "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.04) 12px, rgba(255,255,255,0.04) 13px)",
} as const;

function lineTotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

function subtotal(items: CartItem[]): number {
  return items.reduce((n, i) => n + lineTotal(i), 0);
}

function methodLabel(method: string | undefined): string {
  if (method === "standard") return "Giao hàng tiêu chuẩn";
  if (method === "express") return "Giao hàng nhanh";
  if (method === "pickup") return "Nhận tại cửa hàng";
  return "";
}

export function OrderSummary({
  items,
  shippingPrice,
  shippingMethod,
  language,
  onPromoTotalsChange,
}: {
  items: CartItem[];
  shippingPrice?: number;
  shippingMethod?: string;
  language: "vi" | "en";
  onPromoTotalsChange?: (payload: {
    promoCode: string | null;
    discountAmount: number;
  }) => void;
}) {
  const [promoInput, setPromoInput] = useState("");
  const [campaign, setCampaign] = useState<{
    code: string;
    discountPercent: number;
  } | null>(null);
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const applyUnlockedCode = (code: string) => {
      const trimmed = code.trim();
      if (!trimmed) return;
      setPromoInput(trimmed);
    };
    try {
      const stored = sessionStorage.getItem(VOUCHER_SESSION_KEY);
      if (stored?.trim()) applyUnlockedCode(stored);
    } catch {
      /* ignore */
    }
    const onUnlocked = (e: Event) => {
      const code = (e as CustomEvent<{ code?: string }>).detail?.code;
      if (typeof code === "string") applyUnlockedCode(code);
    };
    window.addEventListener(VOUCHER_UNLOCKED_EVENT, onUnlocked);
    return () => window.removeEventListener(VOUCHER_UNLOCKED_EVENT, onUnlocked);
  }, []);

  const sub = subtotal(items);
  const discountAmount = useMemo(() => {
    if (!promoApplied || !campaign || sub <= 0) return 0;
    const raw = Math.round((sub * campaign.discountPercent) / 100);
    return Math.min(Math.max(0, raw), sub);
  }, [promoApplied, campaign, sub]);

  useEffect(() => {
    onPromoTotalsChange?.({
      promoCode: promoApplied && campaign ? campaign.code : null,
      discountAmount,
    });
  }, [promoApplied, campaign, discountAmount, onPromoTotalsChange]);

  const showShipping = typeof shippingPrice === "number";
  const total = Math.max(0, sub + (showShipping ? shippingPrice : 0) - discountAmount);

  const applyPromo = async () => {
    const input = normalizePromoCode(promoInput);
    if (!input) {
      toast.error(
        language === "vi"
          ? "Nhập mã giảm giá (lấy mã sau khi đăng ký SĐT phía trên)."
          : "Enter a promo code (get one via phone signup above).",
      );
      return;
    }
    try {
      const res = await fetch("/api/vouchers/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: input }),
      });
      const data = (await res.json().catch(() => null)) as {
        valid?: boolean;
        discountPercent?: number;
      } | null;
      if (!res.ok || !data?.valid) {
        toast.error(
          language === "vi"
            ? "Mã không đúng hoặc đã hết hiệu lực."
            : "Invalid or expired code.",
        );
        return;
      }
      const pct =
        typeof data.discountPercent === "number" &&
        Number.isFinite(data.discountPercent) &&
        data.discountPercent >= 0
          ? Math.min(100, data.discountPercent)
          : 10;
      setCampaign({ code: promoInput.trim(), discountPercent: pct });
      setPromoApplied(true);
      toast.success(
        language === "vi"
          ? `Đã áp dụng giảm ${pct}% trên tạm tính.`
          : `${pct}% discount applied to subtotal.`,
      );
    } catch {
      toast.error(
        language === "vi"
          ? "Không kiểm tra được mã. Thử lại."
          : "Could not validate code. Try again.",
      );
    }
  };

  const clearPromo = () => {
    setPromoApplied(false);
    toast.message(
      language === "vi" ? "Đã gỡ mã giảm giá." : "Promo code removed.",
    );
  };

  return (
    <aside className="sticky top-24 min-w-0 border border-hb-border bg-hb-gray p-4 sm:p-5">
      <h2 className="mb-4 font-body text-xl font-bold uppercase tracking-[.06em] text-hb-white sm:text-2xl">
        {language === "vi" ? "Đơn hàng của bạn" : "Your order"}
      </h2>

      <ul>
        {items.map((item) => {
          const img = item.product.images[0];
          return (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex items-start gap-2.5 border-b border-hb-border py-2.5 sm:gap-3 sm:py-3"
            >
              <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-hb-black">
                {img ? (
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={isUploadImagePath(img)}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-hb-gray"
                    style={stripeStyle}
                  />
                )}
                <span className="absolute right-0 top-0 flex h-6 min-w-[1.5rem] items-center justify-center bg-hb-red px-1 font-body text-[11px] font-medium text-white sm:h-7 sm:text-xs">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-body text-sm font-semibold normal-case leading-snug text-hb-white sm:text-base">
                  {item.product.name}
                </p>
                <p className="mt-0.5 font-body text-[11px] tracking-wide text-hb-white/45 sm:text-xs">
                  SIZE: {item.size}
                </p>
              </div>
              <p className="shrink-0 text-right font-body text-sm font-bold tabular-nums text-luxury-gold sm:text-base">
                {lineTotal(item).toLocaleString("vi-VN")} ₫
              </p>
            </li>
          );
        })}
      </ul>

      <VoucherPhoneSignup context="checkout" className="mt-4" />

      <div className="mt-4 flex gap-0">
        <input
          type="text"
          value={promoInput}
          onChange={(e) => setPromoInput(e.target.value)}
          placeholder={language === "vi" ? "Mã giảm giá" : "Promo code"}
          disabled={promoApplied}
          className="flex-1 border border-hb-border border-r-0 bg-hb-black px-2.5 py-2 font-body text-xs normal-case tracking-normal text-hb-white outline-none transition-colors focus:border-hb-red enabled:opacity-100 disabled:opacity-60 sm:px-3 sm:text-sm"
        />
        {promoApplied ? (
          <button
            type="button"
            onClick={clearPromo}
            className="bg-hb-border px-3 py-2 font-body text-[11px] tracking-wide text-hb-white/75 transition-colors hover:bg-hb-red hover:text-white sm:px-3.5 sm:text-xs"
          >
            {language === "vi" ? "GỠ MÃ" : "REMOVE"}
          </button>
        ) : (
          <button
            type="button"
            onClick={applyPromo}
            className="bg-hb-border px-3 py-2 font-body text-[11px] tracking-wide text-hb-white/75 transition-colors hover:bg-hb-red hover:text-white sm:px-3.5 sm:text-xs"
          >
            {language === "vi" ? "ÁP DỤNG" : "APPLY"}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] tracking-wide text-hb-white/50 sm:text-xs">
            {language === "vi" ? "Tạm tính" : "Subtotal"}
          </span>
          <span className="font-body text-sm font-medium tabular-nums text-hb-white sm:text-base">
            {sub.toLocaleString("vi-VN")} ₫
          </span>
        </div>

        {discountAmount > 0 ? (
          <div className="flex items-center justify-between">
            <span className="font-body text-[11px] tracking-wide text-luxury-gold/90 sm:text-xs">
              {language === "vi"
                ? `Giảm giá (${campaign?.code ?? ""})`
                : `Discount (${campaign?.code ?? ""})`}
            </span>
            <span className="font-body text-sm font-medium tabular-nums text-luxury-gold sm:text-base">
              −{discountAmount.toLocaleString("vi-VN")} ₫
            </span>
          </div>
        ) : null}

        {showShipping && (
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-body text-[11px] tracking-wide text-hb-white/50 sm:text-xs">
                {language === "vi" ? "Vận chuyển" : "Shipping"}
              </span>
              {shippingMethod ? (
                <p className="mt-0.5 font-body text-[11px] text-hb-white/40 sm:text-xs">
                  {methodLabel(shippingMethod)}
                </p>
              ) : null}
            </div>
            <div className="text-right">
              {shippingPrice === 0 ? (
                <span className="font-body text-xs font-medium text-luxury-gold sm:text-sm">
                  {language === "vi" ? "Miễn phí" : "Free"}
                </span>
              ) : (
                <span className="font-body text-sm font-medium tabular-nums text-hb-white sm:text-base">
                  {shippingPrice.toLocaleString("vi-VN")} ₫
                </span>
              )}
            </div>
          </div>
        )}

        <div className="my-2 border-t border-hb-border" />

        <div className="flex items-center justify-between">
          <span className="font-body text-base font-bold uppercase tracking-wide text-hb-white sm:text-lg">
            {language === "vi" ? "Tổng cộng" : "Total"}
          </span>
          <span className="font-body text-base font-bold tabular-nums text-hb-red sm:text-lg">
            {total.toLocaleString("vi-VN")} ₫
          </span>
        </div>
      </div>

      <div className="mt-4 border-t border-hb-border pt-3">
        <ul className="space-y-1.5">
          {(language === "vi"
            ? ["Đổi trả 7 ngày", "Thanh toán bảo mật", "Giao hàng toàn quốc"]
            : [
                "7-day returns",
                "Secure checkout",
                "Nationwide delivery",
              ]
          ).map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="font-body text-hb-red">✓</span>
              <span className="font-body text-[11px] tracking-wide text-hb-white/40 sm:text-xs">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
