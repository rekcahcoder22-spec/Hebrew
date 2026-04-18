"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useClientMounted } from "@/hooks/useClientMounted";
import { useCartStore } from "@/store/cartStore";
import type { CartItem, CustomerInfo, ShippingInfo } from "@/types";
import { CustomerForm } from "@/components/checkout/CustomerForm";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShippingForm } from "@/components/checkout/ShippingForm";

function getShippingPrice(method: ShippingInfo["method"]): number {
  if (method === "standard") return 30000;
  if (method === "express") return 50000;
  return 0;
}

function CheckoutTopBar({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1 as const, label: "INFORMATION" },
    { n: 2 as const, label: "SHIPPING" },
    { n: 3 as const, label: "CONFIRMATION" },
  ];

  const circle = (n: 1 | 2 | 3) => {
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
            className="shrink-0 font-display text-2xl tracking-[.4em] text-hb-white"
          >
            HEBREW
          </Link>

          <div className="flex min-w-0 flex-1 flex-col items-center px-1">
            <div className="flex items-center justify-center">
              {steps.map((s, idx) => (
                <Fragment key={s.n}>
                  {idx > 0 ? (
                    <div
                      className={`mx-1 h-0.5 w-10 shrink-0 sm:w-[40px] ${
                        step > steps[idx - 1]!.n
                          ? "bg-hb-red"
                          : "bg-hb-border"
                      }`}
                      aria-hidden
                    />
                  ) : null}
                  {circle(s.n)}
                </Fragment>
              ))}
            </div>
            <div className="mt-1 flex max-w-[220px] justify-between gap-2 sm:max-w-[280px] sm:gap-4">
              {steps.map((s) => (
                <span
                  key={s.n}
                  className="w-14 text-center font-body text-[7px] uppercase leading-tight tracking-[.12em] text-hb-white/40 sm:w-16 sm:text-[8px] sm:tracking-[.15em]"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <Link
            href="/cart"
            className="shrink-0 font-body text-[10px] uppercase tracking-widest text-hb-white/60 transition hover:text-hb-white"
          >
            BACK TO CART
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useClientMounted();
  const [cartHydrated, setCartHydrated] = useState(false);
  const items = useCartStore((s) => s.items);
  const getTotals = useCartStore((s) => s.getTotals);
  const clearCart = useCartStore((s) => s.clearCart);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [orderedItems, setOrderedItems] = useState<CartItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [liveMethod, setLiveMethod] = useState<ShippingInfo["method"]>(
    "standard",
  );

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
    if (items.length === 0 && step !== 3) {
      router.push("/shop");
    }
  }, [ready, items.length, step, router]);

  useEffect(() => {
    if (step === 2) {
      setLiveMethod("standard");
    }
  }, [step]);

  const handleCustomerNext = useCallback((data: CustomerInfo) => {
    setCustomerInfo(data);
    setStep(2);
    window.scrollTo(0, 0);
  }, []);

  const handleShippingNext = useCallback(
    async (data: ShippingInfo) => {
      if (!customerInfo) {
        toast.error("Thiếu thông tin khách hàng.");
        return;
      }

      setIsSubmitting(true);
      const orderNum = `HB${Date.now().toString().slice(-6)}`;
      const { totalPrice } = getTotals();
      const shippingFee = getShippingPrice(data.method);
      const grandTotal = totalPrice + shippingFee;
      const itemsSnapshot = items.map((i) => ({ ...i, product: { ...i.product } }));

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: customerInfo,
            shipping: data,
            items: items.map((i) => ({
              productId: i.productId,
              size: i.size,
              quantity: i.quantity,
              price: i.product.price,
              name: i.product.name,
            })),
            total: grandTotal,
            orderNumber: orderNum,
          }),
        });

        if (res.ok) {
          setOrderNumber(orderNum);
          setShippingInfo(data);
          setOrderedItems(itemsSnapshot);
          setOrderTotal(grandTotal);
          clearCart();
          setStep(3);
          window.scrollTo(0, 0);
        } else {
          const err = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;
          toast.error(err?.error ?? "Đặt hàng thất bại.");
        }
      } catch {
        toast.error("Lỗi mạng. Vui lòng thử lại.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [customerInfo, clearCart, getTotals, items],
  );

  const shippingSummaryPrice =
    step === 2 ? getShippingPrice(liveMethod) : undefined;

  if (!ready) {
    return (
      <div className="min-h-screen bg-hb-black pt-24 font-body text-sm text-hb-white/40">
        Đang tải…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hb-black">
      <CheckoutTopBar step={step} />

      <div className="mx-auto max-w-6xl pt-20 lg:grid lg:grid-cols-[1fr,400px] lg:gap-0">
        <div
          className={`order-2 border-hb-border p-8 lg:order-1 lg:border-r lg:p-12 ${
            step === 3 ? "lg:col-span-2 lg:border-r-0" : ""
          }`}
        >
          {step === 1 && (
            <CustomerForm
              onNext={handleCustomerNext}
              defaultValues={customerInfo ?? undefined}
            />
          )}
          {step === 2 && (
            <ShippingForm
              onNext={handleShippingNext}
              onBack={() => {
                setStep(1);
                window.scrollTo(0, 0);
              }}
              defaultValues={shippingInfo ?? undefined}
              isSubmitting={isSubmitting}
              onMethodChange={setLiveMethod}
            />
          )}
          {step === 3 && customerInfo && shippingInfo ? (
            <OrderConfirmation
              orderNumber={orderNumber}
              customer={customerInfo}
              shipping={shippingInfo}
              items={orderedItems}
              total={orderTotal}
            />
          ) : null}
        </div>

        {step !== 3 ? (
          <div className="order-1 p-8 lg:order-2 lg:p-10">
            <OrderSummary
              items={items}
              shippingPrice={shippingSummaryPrice}
              shippingMethod={liveMethod}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
