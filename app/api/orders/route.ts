import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { sendOrderNotification } from "@/lib/mailer";
import { createOrder, getOrders } from "@/lib/orders";
import type { Order } from "@/types";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const allowed = await isAdminRequest(req);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getOrders();
    return NextResponse.json(orders);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const { customer, shipping, items, total, orderNumber } = body;

    if (!customer || !shipping || !items || total == null || !orderNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const c = customer as Order["customer"];
    if (!c.firstName || !c.lastName || !c.email || !c.phone) {
      return NextResponse.json(
        { error: "Missing customer info" },
        { status: 400 },
      );
    }

    const s = shipping as Order["shipping"];
    if (
      !s.address ||
      !s.city ||
      !s.district ||
      !s.ward ||
      !s.method
    ) {
      return NextResponse.json(
        { error: "Missing shipping info" },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid items" },
        { status: 400 },
      );
    }

    if (typeof total !== "number" || !Number.isFinite(total)) {
      return NextResponse.json(
        { error: "Invalid total" },
        { status: 400 },
      );
    }

    if (typeof orderNumber !== "string" || !orderNumber.trim()) {
      return NextResponse.json(
        { error: "Invalid order number" },
        { status: 400 },
      );
    }

    const order: Order = {
      id: orderNumber.trim(),
      customer: c,
      shipping: s,
      items: items as Order["items"],
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await createOrder(order);

    let emailSent = false;
    try {
      emailSent = await sendOrderNotification(saved);
    } catch (err) {
      // Never fail order creation if notification email fails.
      console.error("Email notification error:", err);
    }

    return NextResponse.json({
      success: true,
      orderNumber: saved.id,
      emailSent,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
