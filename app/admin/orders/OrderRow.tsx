"use client";

import type { Order } from "@/types";

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "CHỜ XỬ LÝ",
  confirmed: "ĐÃ XÁC NHẬN",
  shipped: "ĐANG GIAO",
  delivered: "ĐÃ GIAO",
};

const STATUS_COLORS: Record<Order["status"], string> = {
  pending:
    "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
  confirmed: "border-blue-500/50 text-blue-400 bg-blue-500/10",
  shipped: "border-hb-gold/50 text-hb-gold bg-hb-gold/10",
  delivered: "border-green-500/50 text-green-400 bg-green-500/10",
};

const STATUS_DOT: Record<Order["status"], string> = {
  pending: "bg-yellow-400",
  confirmed: "bg-blue-400",
  shipped: "bg-hb-gold",
  delivered: "bg-green-400",
};

const FLOW: Order["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
];

const FLOW_LABELS = ["CHỜ", "XÁC NHẬN", "ĐANG GIAO", "ĐÃ GIAO"];

function methodLabel(method: Order["shipping"]["method"]): string {
  if (method === "standard") return "Giao hàng tiêu chuẩn";
  if (method === "express") return "Giao hàng nhanh";
  return "Nhận tại cửa hàng";
}

function formatOrderDate(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({
  status,
  large,
}: {
  status: Order["status"];
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-none border font-body uppercase tracking-[.15em] ${STATUS_COLORS[status]} ${
        large ? "px-4 py-2 text-[10px]" : "px-2.5 py-1 text-[8px]"
      }`}
    >
      <span
        className={`shrink-0 rounded-full ${STATUS_DOT[status]} ${
          large ? "h-2 w-2" : "h-1.5 w-1.5"
        }`}
        aria-hidden
      />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function OrderRow({
  order,
  isExpanded,
  isUpdating,
  onToggle,
  onStatusChange,
}: {
  order: Order;
  isExpanded: boolean;
  isUpdating: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: Order["status"]) => void;
}) {
  const firstName =
    order.items[0]?.name != null
      ? order.items[0]!.name.length > 20
        ? `${order.items[0]!.name.slice(0, 20)}…`
        : order.items[0]!.name
      : "—";
  const extra =
    order.items.length > 1 ? `+ ${order.items.length - 1} sản phẩm khác` : null;

  const flowIdx = FLOW.indexOf(order.status);

  return (
    <div className="border-b border-hb-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="grid w-full grid-cols-[minmax(0,1fr),minmax(0,2fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),auto] gap-4 px-4 py-4 text-left transition-colors duration-150 hover:bg-hb-gray/50"
      >
        <div>
          <p className="font-display text-lg tracking-wide text-hb-white">
            #{order.id}
          </p>
          <p className="mt-0.5 font-body text-[8px] text-hb-white/30">
            {formatOrderDate(order.createdAt)}
          </p>
        </div>
        <div>
          <p className="font-body text-sm text-hb-white">
            {order.customer.firstName} {order.customer.lastName}
          </p>
          <p className="mt-0.5 font-body text-[9px] text-hb-white/40">
            {order.customer.email}
          </p>
          <p className="font-body text-[9px] text-hb-white/30">
            {order.customer.phone}
          </p>
        </div>
        <div>
          <p className="font-body text-sm text-hb-white">
            {order.items.length} sản phẩm
          </p>
          <p className="mt-0.5 font-body text-[9px] text-hb-white/30">
            {firstName}
          </p>
          {extra ? (
            <p className="font-body text-[9px] text-hb-white/30">{extra}</p>
          ) : null}
        </div>
        <div>
          <p className="font-display text-xl text-hb-red">
            {order.total.toLocaleString("vi-VN")} ₫
          </p>
        </div>
        <div className="flex items-center">
          {isUpdating ? (
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-hb-white border-t-transparent"
              aria-label="Đang cập nhật"
            />
          ) : (
            <StatusBadge status={order.status} />
          )}
        </div>
        <div className="flex items-center justify-end pr-1 font-body text-xs text-hb-white/30">
          {isExpanded ? "▲" : "▼"}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1200px]" : "max-h-0"
        }`}
      >
        <div className="border-b border-hb-border bg-hb-black/50 px-4 py-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
                SẢN PHẨM ĐẶT HÀNG
              </h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li
                    key={`${item.productId}-${item.size}-${idx}`}
                    className="flex items-center justify-between border-b border-hb-border/40 py-2 last:border-0"
                  >
                    <div>
                      <p className="font-body text-xs text-hb-white">
                        {item.name}
                      </p>
                      <p className="text-[9px] text-hb-white/40">
                        Size: {item.size} — SL: {item.quantity}
                      </p>
                    </div>
                    <p className="font-display text-base text-hb-gold">
                      {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-right font-body text-[9px] text-hb-white/40">
                Tổng: {order.total.toLocaleString("vi-VN")} ₫
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
                THÔNG TIN GIAO HÀNG
              </h3>
              <dl className="space-y-1 font-body text-[10px]">
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    HỌ TÊN:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.customer.firstName} {order.customer.lastName}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    EMAIL:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.customer.email}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    SĐT:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.customer.phone}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    ĐỊA CHỈ:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.shipping.address}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    P/X:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.shipping.ward}, {order.shipping.district}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    T/TP:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.shipping.city}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    VẬN CHUYỂN:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {methodLabel(order.shipping.method)}
                  </dd>
                </div>
                <div>
                  <dt className="inline tracking-wider text-hb-white/30">
                    GHI CHÚ:
                  </dt>
                  <dd className="ml-2 inline text-hb-white">
                    {order.customer.note?.trim() ? order.customer.note : "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <h3 className="mb-3 font-body text-[8px] uppercase tracking-[.25em] text-hb-red">
                CẬP NHẬT TRẠNG THÁI
              </h3>
              <StatusBadge status={order.status} large />
              <div className="mb-4 mt-4 flex flex-wrap items-center gap-2">
                {FLOW_LABELS.map((label, i) => {
                  const active = i <= flowIdx;
                  return (
                    <span key={label} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span className="text-hb-white/20" aria-hidden>
                          →
                        </span>
                      ) : null}
                      <span
                        className={`rounded-full border px-2 py-0.5 font-body text-[8px] uppercase tracking-wider ${
                          active
                            ? "border-hb-red bg-hb-red/20 text-hb-white"
                            : "border-hb-border bg-transparent text-hb-white/20"
                        }`}
                      >
                        {label}
                      </span>
                    </span>
                  );
                })}
              </div>
              <div className="relative mt-4 grid grid-cols-2 gap-2">
                {FLOW.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      void onStatusChange(order.id, st);
                    }}
                    disabled={order.status === st || isUpdating}
                    className={`border py-2.5 px-3 font-body text-[9px] uppercase tracking-[.15em] transition-all duration-200 ${
                      order.status === st
                        ? "cursor-default border-hb-red bg-hb-red text-white"
                        : "border-hb-border text-hb-white/50 hover:border-hb-red hover:text-hb-white disabled:cursor-not-allowed disabled:opacity-40"
                    }`}
                  >
                    {STATUS_LABELS[st]}
                  </button>
                ))}
                {isUpdating ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-hb-black/70">
                    <p className="animate-pulse font-body text-[9px] text-hb-white/40">
                      ĐANG CẬP NHẬT…
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
