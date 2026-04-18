"use client";

import { useRouter } from "next/navigation";
import type { CartItem, CustomerInfo, ShippingInfo } from "@/types";

function methodTitle(method: ShippingInfo["method"]): string {
  if (method === "standard") return "GIAO HÀNG TIÊU CHUẨN";
  if (method === "express") return "GIAO HÀNG NHANH";
  return "NHẬN TẠI CỬA HÀNG";
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
  const preview = items.slice(0, 3);

  return (
    <div className="mx-auto max-w-lg text-center">
      <div
        className="mx-auto mb-8 flex h-20 w-20 animate-popIn items-center justify-center border-2 border-hb-red"
        style={{ transformOrigin: "center" }}
      >
        <span className="font-display text-5xl text-hb-red">✓</span>
      </div>

      <p className="font-body text-[9px] uppercase tracking-[.3em] text-hb-white/40">
        ĐƠN HÀNG
      </p>
      <p className="mt-2 font-display text-5xl tracking-wide text-hb-white">
        #{orderNumber}
      </p>
      <p className="mt-3 font-body text-[10px] uppercase tracking-[.2em] text-hb-white/50">
        CẢM ƠN BẠN. ĐƠN HÀNG ĐÃ ĐƯỢC XÁC NHẬN.
      </p>

      <div className="mt-8 border-t border-hb-border" />

      <div className="mt-6 grid grid-cols-2 gap-6 text-left">
        <div>
          <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
            THÔNG TIN
          </h3>
          <p className="font-display text-lg text-hb-white">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="mt-2 font-body text-[10px] leading-loose text-hb-white/50">
            {customer.email}
            <br />
            {customer.phone}
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
            ĐỊA CHỈ
          </h3>
          <p className="font-body text-[10px] leading-loose text-hb-white/50">
            {shipping.address}
            <br />
            {shipping.ward}, {shipping.district}
            <br />
            {shipping.city}
          </p>
          <p className="mt-2 font-body text-[9px] text-hb-gold">
            {methodTitle(shipping.method)}
          </p>
        </div>
      </div>

      <div className="mt-6 text-left">
        {preview.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex justify-between border-b border-hb-border/50 py-2"
          >
            <span className="font-body text-[10px] text-hb-white/60">
              {item.product.name} × {item.quantity} [{item.size}]
            </span>
            <span className="font-body text-[10px] text-hb-gold">
              {(item.product.price * item.quantity).toLocaleString("vi-VN")} ₫
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <span className="font-display text-2xl text-hb-white">TỔNG CỘNG</span>
        <span className="font-display text-2xl text-hb-red">
          {total.toLocaleString("vi-VN")} ₫
        </span>
      </div>

      <div className="mt-10 space-y-3">
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="w-full bg-hb-red py-4 font-body text-[10px] uppercase tracking-[.25em] text-white transition-colors hover:bg-red-700"
        >
          TIẾP TỤC MUA SẮM →
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mt-3 w-full border border-hb-border py-3 font-body text-[10px] uppercase tracking-[.2em] text-hb-white/50 transition-colors hover:border-hb-white/40 hover:text-hb-white"
        >
          VỀ TRANG CHỦ
        </button>
      </div>
    </div>
  );
}
