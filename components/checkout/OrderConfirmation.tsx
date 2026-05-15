"use client";

import { useRouter } from "next/navigation";
import { HebrewWordButton } from "@/components/ui/HebrewWordMark";
import type { CartItem, CustomerInfo, ShippingInfo } from "@/types";
import {
  formatCustomerName,
  SHIPPING_MERGED_MARKER,
} from "@/lib/utils";

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
            {formatCustomerName(customer)}
          </p>
          <p className="mt-2 font-body text-[10px] leading-loose text-hb-white/50">
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
          <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
            ĐỊA CHỈ
          </h3>
          <p className="font-body text-[10px] leading-loose text-hb-white/50">
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

      <div className="mt-10 space-y-4">
        <HebrewWordButton
          type="button"
          block
          onClick={() => router.push("/shop")}
        >
          SHOP TIẾP →
        </HebrewWordButton>
        <HebrewWordButton
          type="button"
          block
          blockTone="muted"
          onClick={() => router.push("/")}
        >
          HOME
        </HebrewWordButton>
      </div>
    </div>
  );
}
