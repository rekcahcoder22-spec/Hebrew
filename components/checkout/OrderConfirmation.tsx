"use client";

import { useRouter } from "next/navigation";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import type { CartItem, CustomerInfo, ShippingInfo } from "@/types";
import {
  formatCustomerName,
  SHIPPING_MERGED_MARKER,
} from "@/lib/utils";
import { formatPaymentMethod } from "@/lib/paymentInfo";
import { useLanguage } from "@/components/providers/LanguageProvider";

function methodTitle(
  method: ShippingInfo["method"],
  t: (key: string) => string,
): string {
  if (method === "standard") return t("orderConfirmation.shipping.standard");
  if (method === "express") return t("orderConfirmation.shipping.express");
  return t("orderConfirmation.shipping.pickup");
}

export function OrderConfirmation({
  orderNumber,
  customer,
  shipping,
  items,
  total,
}: {
  orderNumber: string;
  customer: CustomerInfo;
  shipping: ShippingInfo;
  items: CartItem[];
  total: number;
}) {
  const router = useRouter();
  const { language, t } = useLanguage();
  const preview = items.slice(0, 3);

  return (
    <div className="mx-auto max-w-lg text-center">
      <div
        className="mx-auto mb-8 flex h-20 w-20 animate-popIn items-center justify-center border-2 border-hb-red"
        style={{ transformOrigin: "center" }}
      >
        <span className="font-body text-4xl font-bold text-hb-red sm:text-5xl">
          ✓
        </span>
      </div>

      <p className="font-body text-[11px] tracking-wide text-hb-white/45 sm:text-xs">
        {t("orderConfirmation.orderLabel")}
      </p>
      <p className="mt-1 font-mono text-3xl font-bold tracking-tight text-hb-white sm:text-4xl">
        #{orderNumber}
      </p>
      <p className="mt-2 font-body text-xs leading-relaxed text-hb-white/50 sm:text-sm">
        {t("orderConfirmation.thanks")}
      </p>

      <div className="mt-8 border-t border-hb-border" />

      <div className="mt-6 grid grid-cols-2 gap-6 text-left">
        <div>
          <h3 className="mb-2 font-body text-[11px] font-medium tracking-wide text-hb-red sm:text-xs">
            {t("orderConfirmation.info")}
          </h3>
          <p className="font-body text-lg font-semibold leading-snug text-hb-white sm:text-xl">
            {formatCustomerName(customer)}
          </p>
          <p className="mt-1.5 font-body text-xs leading-relaxed text-hb-white/55 sm:text-sm">
            {customer.email ? (
              <>
                {customer.email}
                <br />
              </>
            ) : null}
            {customer.phone}
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-body text-[11px] font-medium tracking-wide text-hb-red sm:text-xs">
            {t("orderConfirmation.address")}
          </h3>
          <p className="font-body text-xs leading-relaxed text-hb-white/55 sm:text-sm">
            {shipping.address}
            {shipping.ward === SHIPPING_MERGED_MARKER &&
            shipping.district === SHIPPING_MERGED_MARKER ? (
              <>
                <br />
                {shipping.city}
              </>
            ) : (
              <>
                <br />
                {shipping.ward}, {shipping.district}
                <br />
                {shipping.city}
              </>
            )}
          </p>
          <p className="mt-1.5 font-body text-xs text-luxury-gold sm:text-sm">
            {methodTitle(shipping.method, t)}
          </p>
          <p className="mt-1 font-body text-xs text-hb-white/50 sm:text-sm">
            {t("orderConfirmation.payment")}
            <span className="text-luxury-gold">
              {formatPaymentMethod(shipping.paymentMethod, language)}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 text-left">
        {preview.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex justify-between border-b border-hb-border/50 py-2"
          >
            <span className="font-body text-xs text-hb-white/60 sm:text-sm">
              {item.product.name} × {item.quantity} [{item.size}]
            </span>
            <span className="font-body text-xs font-medium tabular-nums text-luxury-gold sm:text-sm">
              {(item.product.price * item.quantity).toLocaleString("vi-VN")} ₫
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <span className="font-body text-base font-bold tracking-wide text-hb-white sm:text-lg">
          {t("orderConfirmation.total")}
        </span>
        <span className="font-body text-base font-bold tabular-nums text-hb-red sm:text-lg">
          {total.toLocaleString("vi-VN")} ₫
        </span>
      </div>

      <div className="mt-10 space-y-4">
        <HebrewWordButton
          type="button"
          block
          onClick={() => router.push("/shop")}
          className="font-body text-sm font-semibold uppercase tracking-[.14em]"
        >
          {t("orderConfirmation.continueShop")}
        </HebrewWordButton>
        <HebrewWordButton
          type="button"
          block
          blockTone="muted"
          onClick={() => router.push("/")}
          className="font-body text-sm font-semibold uppercase tracking-[.14em]"
        >
          {t("orderConfirmation.home")}
        </HebrewWordButton>
      </div>
    </div>
  );
}
