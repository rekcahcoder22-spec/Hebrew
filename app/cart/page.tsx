"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClientMounted } from "@/hooks/useClientMounted";
import { useCartStore } from "@/store/cartStore";
import { isUploadImagePath } from "@/lib/image";

export default function CartPage() {
  const router = useRouter();
  const mounted = useClientMounted();
  const [cartHydrated, setCartHydrated] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const getTotals = useCartStore((s) => s.getTotals);

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
    if (items.length === 0) {
      router.replace("/shop");
    }
  }, [ready, items.length, router]);

  if (!ready || items.length === 0) {
    return (
      <div className="min-h-[50vh] px-6 py-24 text-center font-body text-sm text-hb-white/40">
        Đang tải giỏ hàng…
      </div>
    );
  }

  const { totalPrice } = getTotals();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl tracking-[0.2em] text-hb-white">
        GIỎ HÀNG
      </h1>
      <ul className="mt-10 space-y-8">
        {items.map((line) => (
          <li
            key={`${line.productId}-${line.size}`}
            className="flex gap-4 border-b border-hb-border pb-8"
          >
            <div className="relative h-[120px] w-24 shrink-0 overflow-hidden bg-hb-gray">
              {line.product.images[0] ? (
                <Image
                  src={line.product.images[0]}
                  alt={line.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                  unoptimized={isUploadImagePath(line.product.images[0])}
                />
              ) : (
                <div className="h-full w-full bg-hb-border" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl uppercase text-hb-white">
                {line.product.name}
              </p>
              <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-hb-white/45">
                Size {line.size}
              </p>
              <p className="mt-1 font-body text-sm text-hb-gold">
                {(line.product.price * line.quantity).toLocaleString("vi-VN")}{" "}
                ₫
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  className="border border-hb-border px-2 py-1 font-body text-xs text-hb-white hover:border-hb-gold"
                  onClick={() =>
                    updateQty(line.productId, line.size, line.quantity - 1)
                  }
                >
                  −
                </button>
                <span className="min-w-[1.5rem] text-center font-body text-xs text-hb-white">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  className="border border-hb-border px-2 py-1 font-body text-xs text-hb-white hover:border-hb-gold"
                  onClick={() =>
                    updateQty(line.productId, line.size, line.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="mt-2 font-body text-[10px] uppercase tracking-widest text-hb-red hover:underline"
                onClick={() => removeItem(line.productId, line.size)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex items-end justify-between border-t border-hb-border pt-8">
        <span className="font-body text-[10px] uppercase tracking-widest text-hb-white/40">
          Tạm tính
        </span>
        <span className="font-display text-3xl tracking-wide text-hb-white">
          {totalPrice.toLocaleString("vi-VN")} ₫
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-8 block w-full bg-hb-red py-4 text-center font-body text-xs uppercase tracking-[0.3em] text-white transition hover:bg-red-700"
      >
        Thanh toán
      </Link>
      <Link
        href="/shop"
        className="mt-4 block text-center font-body text-[10px] uppercase tracking-[0.25em] text-hb-white/45 hover:text-hb-gold"
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}
