import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { getOrderById, updateOrderStatus } from "@/lib/orders";
import type { Order } from "@/types";

type RouteCtx = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, context: RouteCtx) {
  try {
    const allowed = await isAdminRequest(_);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const order = await getOrderById(decodeURIComponent(id));
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: RouteCtx) {
  try {
    const allowed = await isAdminRequest(req);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const { status } = (await req.json()) as { status: Order["status"] };

    const validStatuses: Order["status"][] = [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
    ];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await updateOrderStatus(decodeURIComponent(id), status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
