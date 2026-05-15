import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";
import { getCheckoutShippingFee } from "@/lib/checkoutShipping";
import { isAdminRequest } from "@/lib/adminAuth";
import { sendOrderNotification } from "@/lib/mailer";
import { createOrder, getOrders } from "@/lib/orders";
import { computeCampaignSubtotalDiscount } from "@/lib/voucherSignups";
import type { Order } from "@/types";
import { SHIPPING_MERGED_MARKER } from "@/lib/utils";

function parseFiniteMoney(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const t = value.trim().replace(/\s+/g, "");
    if (t === "") return null;
    const n = Number(t);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function normalizePhoneDigits(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

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
    const promoCodeRaw =
      typeof body.promoCode === "string" ? body.promoCode.trim() : "";

    if (!customer || !shipping || !items || total == null || !orderNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const totalNum = parseFiniteMoney(total);
    if (totalNum == null || totalNum < 0) {
      return NextResponse.json({ error: "Invalid total" }, { status: 400 });
    }

    const c = customer as Order["customer"];
    const phoneDigits = normalizePhoneDigits(c.phone);
    if (!c.firstName?.trim() || phoneDigits.length < 9 || phoneDigits.length > 12) {
      return NextResponse.json(
        { error: "Missing or invalid customer info" },
        { status: 400 },
      );
    }

    const s = shipping as Order["shipping"];
    if (!s.address || !s.city || !s.method) {
      return NextResponse.json(
        { error: "Missing shipping info" },
        { status: 400 },
      );
    }

    if (!["standard", "express", "pickup"].includes(s.method)) {
      return NextResponse.json(
        { error: "Invalid shipping method" },
        { status: 400 },
      );
    }

    const pay = s.paymentMethod;
    if (
      pay !== "bank_transfer" &&
      pay !== "cod" &&
      pay !== "vietqr"
    ) {
      return NextResponse.json(
        { error: "Missing or invalid payment method" },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid items" },
        { status: 400 },
      );
    }

    const rawItems = items as unknown[];
    const normalizedItems: Order["items"] = [];
    for (const raw of rawItems) {
      if (!raw || typeof raw !== "object") {
        return NextResponse.json(
          { error: "Invalid line items" },
          { status: 400 },
        );
      }
      const it = raw as Record<string, unknown>;
      const productId = String(it.productId ?? "").trim();
      const name = String(it.name ?? "").trim();
      const size = String(it.size ?? "").trim();
      const quantity = Math.trunc(Number(it.quantity));
      const price = Number(it.price);
      if (
        !productId ||
        !name ||
        !size ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        !Number.isFinite(price) ||
        price < 0
      ) {
        return NextResponse.json(
          { error: "Invalid line items" },
          { status: 400 },
        );
      }
      normalizedItems.push({ productId, name, size, quantity, price });
    }

    const subtotal = normalizedItems.reduce(
      (acc, it) => acc + it.price * it.quantity,
      0,
    );
    const qtySum = normalizedItems.reduce((acc, it) => acc + it.quantity, 0);
    const shippingFee = getCheckoutShippingFee(s.method, qtySum);
    const { discount, appliedCode } = computeCampaignSubtotalDiscount(
      subtotal,
      promoCodeRaw || undefined,
    );

    if (promoCodeRaw && !appliedCode) {
      return NextResponse.json(
        { error: "Invalid promo", detail: "Mã giảm giá không hợp lệ." },
        { status: 400 },
      );
    }

    const expectedTotal = Math.max(0, subtotal + shippingFee - discount);
    if (totalNum !== expectedTotal) {
      return NextResponse.json(
        {
          error: "Total mismatch",
          detail: "Tổng thanh toán không khớp. Vui lòng làm mới trang và thử lại.",
        },
        { status: 400 },
      );
    }

    const orderId =
      typeof orderNumber === "string"
        ? orderNumber.trim()
        : String(orderNumber ?? "").trim();
    if (!orderId) {
      return NextResponse.json(
        { error: "Invalid order number" },
        { status: 400 },
      );
    }

    const normalizedCustomer: Order["customer"] = {
      firstName: c.firstName.trim(),
      lastName: (c.lastName ?? "").trim(),
      email: (c.email ?? "").trim().toLowerCase(),
      phone: phoneDigits,
      note: typeof c.note === "string" && c.note.trim() ? c.note.trim() : "",
    };

    const normalizedShipping: Order["shipping"] = {
      address: s.address.trim(),
      city: s.city.trim(),
      district: (s.district ?? "").trim() || SHIPPING_MERGED_MARKER,
      ward: (s.ward ?? "").trim() || SHIPPING_MERGED_MARKER,
      method: s.method,
      paymentMethod: pay,
    };

    const order: Order = {
      id: orderId,
      customer: normalizedCustomer,
      shipping: normalizedShipping,
      items: normalizedItems,
      total: expectedTotal,
      ...(appliedCode
        ? { promoCode: appliedCode, discount }
        : {}),
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

    if (err instanceof mongoose.Error.ValidationError) {
      const detail = Object.values(err.errors)
        .map((e) => e.message)
        .join("; ");
      return NextResponse.json(
        { error: "Invalid order", detail },
        { status: 400 },
      );
    }

    if (err instanceof MongoServerError && err.code === 11000) {
      return NextResponse.json(
        {
          error: "Duplicate order",
          detail: "Mã đơn trùng — vui lòng thử lại.",
        },
        { status: 409 },
      );
    }

    const detail =
      err instanceof Error
        ? err.message
        : typeof err === "string"
          ? err
          : undefined;
    return NextResponse.json(
      {
        error: "Server error",
        ...(detail ? { detail } : {}),
      },
      { status: 500 },
    );
  }
}
