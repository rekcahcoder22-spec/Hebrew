/**
 * Server-only order persistence (filesystem).
 *
 * Production: add `data/orders.json` to `.gitignore` and use a database or
 * external store — file writes are not durable on serverless multi-instance hosts.
 */

import fs from "fs";
import path from "path";
import type { Order } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "orders.json");

function ensureFile(): void {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

export function getOrders(): Order[] {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const orders: Order[] = JSON.parse(raw) as Order[];
  return orders.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getOrderById(id: string): Order | null {
  const orders = getOrders();
  return orders.find((o) => o.id === id) ?? null;
}

export function createOrder(order: Order): Order {
  ensureFile();
  const orders = getOrders();
  orders.unshift(order);
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  return order;
}

export function updateOrderStatus(
  id: string,
  status: Order["status"],
): Order | null {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  const orders: Order[] = JSON.parse(raw) as Order[];
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  const next = { ...orders[idx]!, status, updatedAt: new Date().toISOString() };
  orders[idx] = next;
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2));
  return next;
}

export function getOrderStats() {
  const orders = getOrders();
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
}

export type OrderStats = ReturnType<typeof getOrderStats>;
