"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useClientMounted } from "@/hooks/useClientMounted";
import { useCartStore } from "@/store/cartStore";
import type { CartItem, CustomerInfo, ShippingInfo } from "@/types";
import { CheckoutDetailsForm } from "@/components/checkout/CheckoutDetailsForm";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { getCheckoutShippingFee, CHECKOUT_FREE_SHIP_MIN_ITEM_QTY } from "@/lib/checkoutShipping";
import { useLanguage } from "@/components/providers/LanguageProvider";

function CheckoutTopBar({
  step,
  language,
}: {
  step: 1 | 2;
  language: "vi" | "en";
}) {
  const steps = [
    { n: 1 as const, label: language === "vi" ? "ĐƠN HÀNG" : "ORDER" },
    { n: 2 as const, label: language === "vi" ? "HOÀN TẤT" : "DONE" },
  ];

  const circle = (n: 1 | 2) => {
    const done = step > n;
    const active = step === n;
    if (done) {
      return (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hb-red bg-hb-black font-body text-xs text-hb-red">
          ✓
        </span>
      );
    }
    if (active) {
      return (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hb-red bg-hb-red text-xs font-semibold text-white">
          {n}
        </span>
      );
    }
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-hb-border bg-hb-black text-xs text-hb-white/30">
        {n}
      </span>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-hb-black">
      <div className="h-[2px] bg-hb-red" />
      <div className="border-b border-hb-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 lg:px-8">
          <Link
            href="/"
            className="shrink-0 font-body text-lg font-bold tracking-[.2em] text-hb-white sm:text-xl"
          >
            HEBREW
          </Link>

          <div className="flex min-w-0 flex-1 flex-col items-center px-1">
            <div className="flex items-center justify-center">
              {steps.map((s, idx) => (
                <Fragment key={s.n}>
                  {idx > 0 ? (
                    <div
                      className={`mx-1 h-0.5 w-12 shrink-0 sm:w-16 ${
                        step > steps[idx - 1]!.n ? "bg-hb-red" : "bg-hb-border"
                      }`}
                      aria-hidden
                    />
                  ) : null}
                  {circle(s.n)}
                </Fragment>
              ))}
            </div>
            <div className="mt-1 flex justify-center gap-10 sm:gap-14">
              {steps.map((s) => (
                <span
                  key={s.n}
                  className="w-20 text-center font-body text-[10px] uppercase leading-tight tracking-[.14em] text-hb-white/50 sm:w-24 sm:text-xs sm:tracking-[.18em]"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/cart"
            className="shrink-0 font-body text-xs uppercase tracking-widest text-hb-white/65 transition hover:text-hb-white sm:text-sm"
          >
            {language === "vi" ? "VỀ GIỎ HÀNG" : "BACK TO CART"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function CheckoutPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const mounted = useClientMounted();
  const [cartHydrated, setCartHydrated] = useState(false);
  const items = useCartStore((s) => s.items);
  const getTotals = useCartStore((s) => s.getTotals);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<1 | 2>(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [liveMethod, setLiveMethod] = useState<ShippingInfo["method"]>(
    "standard",
  );
  const [promoTotals, setPromoTotals] = useState<{
    promoCode: string | null;
    discountAmount: number;
  }>({ promoCode: null, discountAmount: 0 });

  useEffect(() => {
    const persist = useCartStore.persist;
    if (!persist) return;
    if (persist.hasHydrated()) {
      setCartHydrated(true);
    }
    return persist.onFinishHydration(() => {
      setCartHydrated(true);
    });
  }, []);

  const ready = mounted && cartHydrated;

  useEffect(() => {
    if (!ready) return;
    if (items.length === 0 && step !== 2) {
      router.push("/shop");
    }
  }, [ready, items.length, step, router]);

  const handlePlaceOrder = useCallback(
    async (customer: CustomerInfo, shipping: ShippingInfo) => {
      setIsSubmitting(true);
      const orderNum = `HB${Date.now().toString().slice(-6)}`;
      const { totalPrice, totalItems } = getTotals();
      const shippingFee = getCheckoutShippingFee(shipping.method, totalItems);
      const grandTotal = Math.max(
        0,
        totalPrice + shippingFee - promoTotals.discountAmount,
      );
      const itemsSnapshot = items.map((i) => ({
        ...i,
        product: { ...i.product },
      }));

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer,
            shipping,
            items: items.map((i) => ({
              productId: i.productId,
              size: i.size,
              quantity: i.quantity,
              price: i.product.price,
              name: i.product.name,
            })),
            total: grandTotal,
            orderNumber: orderNum,
            ...(promoTotals.promoCode
              ? { promoCode: promoTotals.promoCode }
              : {}),
          }),
        });

        if (res.ok) {
          setOrderNumber(orderNum);
          setCustomerInfo(customer);
          setShippingInfo(shipping);
          setOrderedItems(itemsSnapshot);
          setOrderTotal(grandTotal);
          clearCart();
          setStep(2);
          window.scrollTo(0, 0);
        } else {
          const err = (await res.json().catch(() => null)) as {
            error?: string;
            detail?: string;
          } | null;
          const fallback =
            language === "vi" ? "Đặt hàng thất bại." : "Order placement failed.";
          toast.error(err?.detail ?? err?.error ?? fallback);
        }
      } catch {
        toast.error(
          language === "vi"
            ? "Lỗi mạng. Vui lòng thử lại."
            : "Network error. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [clearCart, getTotals, items, language, promoTotals],
  );

  const shippingSummaryPrice =
    step === 1
      ? getCheckoutShippingFee(liveMethod, getTotals().totalItems)
      : undefined;

  if (!ready) {
    return (
      <div className="min-h-screen bg-hb-black pt-24 font-body text-sm text-hb-white/55 sm:text-base">
        {language === "vi" ? "Đang tải…" : "Loading…"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hb-black">
      <CheckoutTopBar step={step} language={language} />

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr),minmax(0,360px)] lg:gap-0 lg:px-8 lg:pt-20">
        <div
          className={`order-2 min-w-0 border-hb-border p-4 sm:p-5 lg:order-1 lg:border-r lg:p-8 ${
            step === 2 ? "lg:col-span-2 lg:border-r-0" : ""
          }`}
        >
          {step === 1 ? (
            <CheckoutDetailsForm
              onSubmit={handlePlaceOrder}
              isSubmitting={isSubmitting}
              onMethodChange={setLiveMethod}
              freeShipEligible={
                getTotals().totalItems >= CHECKOUT_FREE_SHIP_MIN_ITEM_QTY
              }
              defaultCustomer={customerInfo}
              defaultShipping={shippingInfo}
              language={language}
            />
          ) : null}
          {step === 2 && customerInfo && shippingInfo ? (
            <OrderConfirmation
              orderNumber={orderNumber}
              customer={customerInfo}
              shipping={shippingInfo}
              items={orderedItems}
              total={orderTotal}
            />
          ) : null}
        </div>

        {step === 1 ? (
          <div className="order-1 min-w-0 p-4 sm:p-5 lg:order-2 lg:p-8">
            <OrderSummary
              items={items}
              shippingPrice={shippingSummaryPrice}
              shippingMethod={liveMethod}
              language={language}
              onPromoTotalsChange={setPromoTotals}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
