import { getOrders } from "@/lib/orders";
import type { Order } from "@/types";
import { OrdersClient } from "./OrdersClient";

type FilterKey = "all" | Order["status"];

function parseFilter(raw: string | string[] | undefined): FilterKey {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (
    v === "pending" ||
    v === "confirmed" ||
    v === "shipped" ||
    v === "delivered"
  ) {
    return v;
  }
  return "all";
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const sp = await searchParams;
  const orders = getOrders();
  const initialFilter = parseFilter(sp.filter);

  return (
    <OrdersClient orders={orders} initialFilter={initialFilter} />
  );
}
