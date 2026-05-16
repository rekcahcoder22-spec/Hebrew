"use client";

import Image from "next/image";
import { HebrewWordCTA } from "@/components/ui/HebrewWordMark";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCartStore, type CartTotals } from "@/store/cartStore";
import { formatPrice, cn } from "@/lib/utils";
import { useClientMounted } from "@/hooks/useClientMounted";
import { isUploadImagePath } from "@/lib/image";

export function CartSidebar() {
  const { t } = useLanguage();
  const open = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const { items, removeItem, updateQty, getTotals } = useCartStore();
  const mounted = useClientMounted();
  const emptyTotals: CartTotals = {
    totalPrice: 0,
    totalItems: 0,
    itemCount: 0,
  };
  const { totalPrice, totalItems } = mounted ? getTotals() : emptyTotals;
  const displayItems = mounted ? items : [];

  return (
    <div
      className={cn(
        "fixed inset-0 z-[70] transition-opacity duration-300 ease-in-out",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        aria-label={t("cartSidebar.closeBackdrop")}
        className="fixed inset-0 bg-black/50"
        onClick={closeCart}
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[71] flex h-full w-full flex-col border-l border-hb-border bg-hb-black transition-transform duration-300 ease-in-out sm:w-[400px]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-hb-border px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl tracking-[0.2em] text-hb-white">
              {t("cartSidebar.title")}
            </span>
            {totalItems > 0 && (
              <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-hb-red px-1.5 font-body text-[10px] font-bold text-white">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center font-body text-lg text-hb-white/60 transition hover:text-hb-red"
            aria-label={t("cartSidebar.close")}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="font-display text-2xl tracking-[0.15em] text-hb-white">
                {t("cartSidebar.empty")}
              </p>
              <HebrewWordCTA
                href="/shop"
                variant="blood"
                onClick={closeCart}
                className="mt-6"
              >
                {t("cartSidebar.continueShopping")}
              </HebrewWordCTA>
            </div>
          ) : (
            <ul className="space-y-6">
              {displayItems.map((line) => (
                <li
                  key={`${line.productId}-${line.size}`}
                  className="flex gap-4 border-b border-hb-border pb-6"
                >
                  <div className="relative h-[100px] w-20 shrink-0 overflow-hidden bg-hb-gray">
                    {line.product.images[0] ? (
                      <Image
                        src={line.product.images[0]}
                        alt={line.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                        unoptimized={isUploadImagePath(line.product.images[0])}
                      />
                    ) : (
                      <div className="h-full w-full bg-hb-border" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-body text-sm font-medium text-hb-white">
                      {line.product.name}
                    </p>
                    <p className="mt-1 font-body text-[10px] uppercase tracking-widest text-hb-white/45">
                      {t("cartSidebar.size")} {line.size}
                    </p>
                    <p className="mt-1 font-body text-sm text-hb-gold">
                      {formatPrice(line.product.price)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        className="border border-hb-border px-2 py-1 font-body text-xs text-hb-white hover:border-hb-gold"
                        onClick={() =>
                          updateQty(
                            line.productId,
                            line.size,
                            line.quantity - 1,
                          )
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
                          updateQty(
                            line.productId,
                            line.size,
                            line.quantity + 1,
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="mt-2 font-body text-[10px] uppercase tracking-widest text-hb-red hover:underline"
                      onClick={() =>
                        removeItem(line.productId, line.size)
                      }
                    >
                      {t("cartSidebar.remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-hb-border p-4">
          <div className="mb-4 flex items-end justify-between gap-4">
            <span className="font-body text-[10px] uppercase tracking-widest text-hb-white/40">
              {t("cartSidebar.subtotal")}
            </span>
            <span className="font-display text-3xl tracking-wide text-hb-white">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <HebrewWordCTA
            href="/checkout"
            onClick={closeCart}
            aria-disabled={displayItems.length === 0}
            block
            className={
              displayItems.length === 0 ? "pointer-events-none opacity-40" : ""
            }
          >
            {t("cartSidebar.checkout")}
          </HebrewWordCTA>
          <HebrewWordCTA
            href="/shop"
            onClick={closeCart}
            variant="ghost"
            className="mt-4 block text-center"
          >
            {t("cartSidebar.continueShopping")}
          </HebrewWordCTA>
        </div>
      </aside>
    </div>
  );
}
