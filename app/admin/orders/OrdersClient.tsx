"use client";

import { useMemo, useState } from "react";
import type { OrderStats } from "@/lib/orders";
import type { Order } from "@/types";
import { OrderRow } from "./OrderRow";

type FilterKey = "all" | Order["status"];

const STATUS_LABELS: Record<FilterKey, string> = {
  all: "TẤT CẢ",
  pending: "CHỜ XỬ LÝ",
  confirmed: "ĐÃ XÁC NHẬN",
  shipped: "ĐANG GIAO",
  delivered: "ĐÃ GIAO",
};

export function OrdersClient({
  orders: initialOrders,
  initialFilter = "all",
}: {
  orders: Order[];
  initialFilter?: FilterKey;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterKey>(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [orders]);

  const liveStats = useMemo((): OrderStats => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      revenue: orders
        .filter((o) => o.status !== "pending")
        .reduce((sum, o) => sum + o.total, 0),
    };
  }, [orders]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return orders
      .filter((o) => filterStatus === "all" || o.status === filterStatus)
      .filter((o) => {
        if (!q) return true;
        const name =
          `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase();
        return (
          o.id.toLowerCase().includes(q) ||
          o.customer.email.toLowerCase().includes(q) ||
          name.includes(q)
        );
      });
  }, [orders, filterStatus, searchQuery]);

  async function handleStatusChange(
    orderId: string,
    newStatus: Order["status"],
  ) {
    const previous = orders.find((o) => o.id === orderId);
    setIsUpdating(orderId);
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o,
      ),
    );
    try {
      const res = await fetch(
        `/api/orders/${encodeURIComponent(orderId)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (res.ok) {
        const data = (await res.json()) as {
          success?: boolean;
          order?: Order;
        };
        if (data.order) {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? data.order! : o)),
          );
        }
      } else if (previous) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? previous : o)),
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
      if (previous) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? previous : o)),
        );
      }
    } finally {
      setIsUpdating(null);
    }
  }

  const filterKeys: FilterKey[] = [
    "all",
    "pending",
    "confirmed",
    "shipped",
    "delivered",
  ];

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-hb-black px-4 py-8 text-hb-white md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-5xl tracking-tight text-hb-white md:text-6xl">
            ORDERS
          </h1>
          <p className="mt-1 font-body text-xs text-hb-white/40">
            Quản lý đơn hàng
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="shrink-0 border border-hb-border px-4 py-2 font-body text-[9px] uppercase tracking-[.2em] text-hb-white/50 transition-all hover:border-hb-red hover:text-hb-red"
        >
          ↻ LÀM MỚI
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="border border-hb-border bg-hb-gray p-4">
          <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-hb-white/40">
            TỔNG ĐƠN
          </p>
          <p className="font-display text-3xl tracking-wide text-hb-white">
            {liveStats.total}
          </p>
        </div>
        <div className="border border-amber-500/40 bg-hb-gray p-4">
          <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-amber-400/80">
            CHỜ XỬ LÝ
          </p>
          <p
            className={`font-display text-3xl tracking-wide text-amber-300 ${
              liveStats.pending > 0 ? "animate-pulse" : ""
            }`}
          >
            {liveStats.pending}
          </p>
        </div>
        <div className="border border-hb-border bg-hb-gray p-4">
          <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-blue-400">
            ĐÃ XÁC NHẬN
          </p>
          <p className="font-display text-3xl tracking-wide text-hb-white">
            {liveStats.confirmed}
          </p>
        </div>
        <div className="border border-hb-border bg-hb-gray p-4">
          <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-hb-gold">
            ĐANG GIAO
          </p>
          <p className="font-display text-3xl tracking-wide text-hb-white">
            {liveStats.shipped}
          </p>
        </div>
        <div className="border border-hb-border bg-hb-gray p-4 sm:col-span-3 lg:col-span-1">
          <p className="mb-2 font-body text-[8px] uppercase tracking-[.2em] text-hb-white/40">
            DOANH THU
          </p>
          <p className="font-display text-2xl tracking-wide text-hb-red md:text-3xl">
            {liveStats.revenue.toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm theo tên, email, mã đơn..."
          className="min-w-[200px] flex-1 border border-hb-border bg-hb-gray px-4 py-2.5 font-body text-sm text-hb-white outline-none transition-colors placeholder:text-hb-white/25 focus:border-hb-red"
        />
        <div className="flex flex-wrap gap-2">
          {filterKeys.map((s) => {
            const active = filterStatus === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilterStatus(s)}
                className={`border px-3 py-2 font-body text-[8px] uppercase tracking-[.15em] transition-colors ${
                  active
                    ? "border-hb-red bg-hb-red text-white"
                    : "border-hb-border text-hb-white/40 hover:border-hb-red/50 hover:text-hb-white/70"
                }`}
              >
                {STATUS_LABELS[s]} ({counts[s]})
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-3xl text-hb-white/20">
            KHÔNG CÓ ĐƠN HÀNG
          </p>
          <p className="mt-2 font-body text-xs text-hb-white/20">
            Thử thay đổi bộ lọc
          </p>
        </div>
      ) : (
        <div className="border border-hb-border">
          <div className="grid grid-cols-[minmax(0,1fr),minmax(0,2fr),minmax(0,1fr),minmax(0,1fr),minmax(0,1fr),auto] gap-4 border-b border-hb-border bg-hb-gray px-4 py-3 font-body text-[8px] uppercase tracking-[.2em] text-hb-white/30">
            <span>MÃ ĐƠN / NGÀY</span>
            <span>KHÁCH HÀNG</span>
            <span>SẢN PHẨM</span>
            <span>TỔNG</span>
            <span>TRẠNG THÁI</span>
            <span className="text-right" aria-hidden>
              {" "}
            </span>
          </div>
          {filtered.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isExpanded={selectedId === order.id}
              isUpdating={isUpdating === order.id}
              onToggle={() =>
                setSelectedId(selectedId === order.id ? null : order.id)
              }
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
