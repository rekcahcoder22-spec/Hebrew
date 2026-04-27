import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdminSessionFromCookiesStore } from "@/lib/adminAuth";
import { getOrders, getOrderStats } from "@/lib/orders";
import { getProducts } from "@/lib/products";
import { isInStock, totalStock } from "@/lib/inventoryUtils";
import { formatPrice } from "@/lib/utils";
import { isUploadImagePath } from "@/lib/image";
import type { Order } from "@/types";

const ORDER_BADGE: Record<Order["status"], string> = {
  pending:
    "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
  confirmed: "border-blue-500/50 text-blue-400 bg-blue-500/10",
  shipped: "border-hb-gold/50 text-hb-gold bg-hb-gold/10",
  delivered: "border-green-500/50 text-green-400 bg-green-500/10",
};

const ORDER_STATUS_LABEL: Record<Order["status"], string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  shipped: "Đang giao",
  delivered: "Đã giao",
};

function formatOrderWhen(iso: string): string {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminDashboard() {
  const allowed = await isAdminSessionFromCookiesStore();
  if (!allowed) redirect("/admin/login");

  const [products, orderStats, orderList] = await Promise.all([
    getProducts(),
    getOrderStats(),
    getOrders(),
  ]);
  const total = products.length;
  const inStockCount = products.filter((p) => isInStock(p)).length;
  const soldOutCount = products.filter((p) => p.stockStatus === "sold-out").length;
  const featuredCount = products.filter((p) => p.featured).length;

  const recentOrders = orderList.slice(0, 5);

  const recent = [...products]
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5);

  const statCard = (label: string, value: number | string) => (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </p>
      <p className="mt-2 font-display text-4xl text-gray-900">{value}</p>
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight text-gray-900">
        Dashboard
      </h1>
      <p className="mt-1 font-mono text-sm text-gray-500">
        Tổng quan catalog HEBREW.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCard("Tổng sản phẩm", total)}
        {statCard("Còn hàng", inStockCount)}
        {statCard("Hết hàng", soldOutCount)}
        {statCard("Nổi bật", featuredCount)}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/admin/orders?filter=pending"
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-red-300"
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
            ĐƠN CHỜ XỬ LÝ
          </p>
          <p className="mt-2 flex items-center gap-2 font-display text-4xl text-gray-900">
            {orderStats.pending > 0 ? (
              <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-red-600" />
            ) : null}
            {orderStats.pending}
          </p>
        </Link>
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
            DOANH THU
          </p>
          <p className="mt-2 font-display text-4xl text-red-600">
            {orderStats.revenue.toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/admin/products/new"
          className="inline-block rounded-md bg-red-600 px-8 py-3 font-mono text-xs uppercase tracking-widest text-white shadow transition hover:bg-red-700"
        >
          Thêm sản phẩm mới
        </Link>
      </div>

      <div className="mt-12 rounded-lg border border-hb-border bg-hb-black p-6 text-hb-white">
        <h2 className="font-display text-4xl tracking-tight text-hb-white">
          ĐƠN HÀNG GẦN ĐÂY
        </h2>
        <ul className="mt-4">
          {recentOrders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between gap-4 border-b border-hb-border py-3 last:border-0"
            >
              <div className="min-w-0">
                <Link
                  href="/admin/orders"
                  className="font-display text-lg text-hb-white hover:text-hb-red"
                >
                  #{order.id}
                </Link>
                <p className="font-body text-xs text-hb-white/50">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
              </div>
              <p className="hidden shrink-0 font-body text-[9px] text-hb-white/30 sm:block">
                {formatOrderWhen(order.createdAt)}
              </p>
              <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-3">
                <span
                  className={`inline-flex rounded-none border px-2 py-0.5 font-body text-[8px] uppercase tracking-wider ${ORDER_BADGE[order.status]}`}
                >
                  {ORDER_STATUS_LABEL[order.status]}
                </span>
                <span className="font-display text-lg text-hb-gold">
                  {order.total.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Link
          href="/admin/orders"
          className="mt-4 inline-block font-body text-[9px] uppercase tracking-[.2em] text-hb-red hover:underline"
        >
          XEM TẤT CẢ ĐƠN HÀNG →
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500">
          Sản phẩm gần đây
        </h2>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 font-mono text-xs">
            <thead className="bg-gray-100 text-[10px] uppercase tracking-widest text-gray-500">
              <tr>
                <th className="px-3 py-2 text-left">Ảnh</th>
                <th className="px-3 py-2 text-left">Tên</th>
                <th className="px-3 py-2 text-left">Giá</th>
                <th className="px-3 py-2 text-left">Cập nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recent.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="relative h-12 w-10 overflow-hidden rounded border border-gray-100">
                      {p.images[0] ? (
                        <Image
                          src={p.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized={isUploadImagePath(p.images[0])}
                        />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-gray-900 hover:text-red-600 hover:underline"
                    >
                      {p.name}
                    </Link>
                    <p className="text-[10px] text-gray-400">
                      Tồn: {totalStock(p)}
                    </p>
                  </td>
                  <td className="px-3 py-2">{formatPrice(p.price)}</td>
                  <td className="px-3 py-2 text-gray-500">
                    {new Date(p.updatedAt).toLocaleString("vi-VN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
