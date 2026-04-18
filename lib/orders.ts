import { connectDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/Order";
import type { Order } from "@/types";

type OrderLike = Omit<Order, "createdAt" | "updatedAt"> & {
  createdAt?: unknown;
  updatedAt?: unknown;
};

function normalizeIso(value: unknown, fallback?: string): string | undefined {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return fallback;
}

function docToOrder(doc: OrderLike): Order {
  const createdAt = normalizeIso(doc.createdAt, new Date().toISOString())!;
  const updatedAt = normalizeIso(doc.updatedAt);
  return {
    id: doc.id,
    customer: doc.customer,
    shipping: doc.shipping,
    items: doc.items,
    total: doc.total,
    status: doc.status,
    createdAt,
    updatedAt,
  };
}

export async function getOrders(): Promise<Order[]> {
  await connectDB();
  const docs = await OrderModel.find({}).sort({ createdAt: -1 }).lean<Order[]>();
  return docs.map((doc) => docToOrder(doc));
}

export async function getOrderById(id: string): Promise<Order | null> {
  await connectDB();
  const doc = await OrderModel.findOne({ id }).lean<Order | null>();
  return doc ? docToOrder(doc) : null;
}

export async function createOrder(order: Order): Promise<Order> {
  await connectDB();
  const doc = await OrderModel.create(order);
  return docToOrder(doc.toObject() as Order);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"],
): Promise<Order | null> {
  await connectDB();
  const doc = await OrderModel.findOneAndUpdate(
    { id },
    { status, updatedAt: new Date() },
    { new: true },
  ).lean<Order | null>();
  return doc ? docToOrder(doc) : null;
}

export async function getOrderStats() {
  await connectDB();
  const [stats, revenueData] = await Promise.all([
    OrderModel.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    OrderModel.aggregate<{ _id: null; total: number }>([
      { $match: { status: { $ne: "pending" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]),
  ]);

  const counts = { pending: 0, confirmed: 0, shipped: 0, delivered: 0 };
  let total = 0;

  for (const row of stats) {
    if (row._id in counts) {
      counts[row._id as keyof typeof counts] = row.count;
    }
    total += row.count;
  }

  return {
    total,
    pending: counts.pending,
    confirmed: counts.confirmed,
    shipped: counts.shipped,
    delivered: counts.delivered,
    revenue: revenueData[0]?.total ?? 0,
  };
}

export type OrderStats = Awaited<ReturnType<typeof getOrderStats>>;
