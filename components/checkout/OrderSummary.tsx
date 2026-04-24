"use client";

import Image from "next/image";
import { useState } from "react";
import { isUploadImagePath } from "@/lib/image";
import type { CartItem } from "@/types";

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
}: {
  items: CartItem[];
  shippingPrice?: number;
  shippingMethod?: string;
}) {
  const [promo, setPromo] = useState("");
  const sub = subtotal(items);
  const showShipping = typeof shippingPrice === "number";
  const total = sub + (showShipping ? shippingPrice : 0);

  return (
    <aside className="sticky top-24 border border-hb-border bg-hb-gray p-6">
      <h2 className="mb-6 font-display text-3xl tracking-tight text-hb-white">
        ĐƠN HÀNG CỦA BẠN
      </h2>

      <ul>
        {items.map((item) => {
          const img = item.product.images[0];
          return (
            <li
              key={`${item.productId}-${item.size}`}
              className="flex items-start gap-3 border-b border-hb-border py-3"
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
                <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center bg-hb-red font-body text-[9px] text-white">
                  {item.quantity}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-base uppercase text-hb-white">
                  {item.product.name}
                </p>
                <p className="mt-1 font-body text-[9px] tracking-wider text-hb-white/40">
                  SIZE: {item.size}
                </p>
              </div>
              <p className="shrink-0 text-right font-display text-lg text-hb-gold">
                {lineTotal(item).toLocaleString("vi-VN")} ₫
              </p>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex gap-0">
        <input
          type="text"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="MÃ GIẢM GIÁ"
          className="flex-1 border border-hb-border border-r-0 bg-hb-black px-3 py-2.5 font-body text-[10px] uppercase tracking-widest text-hb-white outline-none transition-colors focus:border-hb-red"
        />
        <button
          type="button"
          className="bg-hb-border px-4 font-body text-[9px] uppercase tracking-[.15em] text-hb-white/60 transition-colors hover:bg-hb-red hover:text-white"
        >
          ÁP DỤNG
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-[10px] uppercase tracking-wider text-hb-white/50">
            TẠM TÍNH
          </span>
          <span className="font-body text-sm text-hb-white">
            {sub.toLocaleString("vi-VN")} ₫
          </span>
        </div>

        {showShipping && (
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-body text-[10px] uppercase tracking-wider text-hb-white/50">
                VẬN CHUYỂN
              </span>
              {shippingMethod ? (
                <p className="mt-0.5 font-body text-[8px] text-hb-white/30">
                  {methodLabel(shippingMethod)}
                </p>
              ) : null}
            </div>
            <div className="text-right">
              {shippingPrice === 0 ? (
                <span className="font-body text-[10px] text-hb-gold">
                  MIỄN PHÍ
                </span>
              ) : (
                <span className="font-body text-sm text-hb-white">
                  {shippingPrice.toLocaleString("vi-VN")} ₫
                </span>
              )}
            </div>
          </div>
        )}

        <div className="my-3 border-t border-hb-border" />

        <div className="flex items-center justify-between">
          <span className="font-display text-2xl text-hb-white">TỔNG CỘNG</span>
          <span className="font-display text-2xl text-hb-red">
            {total.toLocaleString("vi-VN")} ₫
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-hb-border pt-4">
        <ul className="space-y-2">
          {[
            "ĐỔI TRẢ 7 NGÀY",
            "THANH TOÁN BẢO MẬT",
            "GIAO HÀNG TOÀN QUỐC",
          ].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span className="font-body text-hb-red">✓</span>
              <span className="font-body text-[8px] uppercase tracking-[.15em] text-hb-white/30">
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
