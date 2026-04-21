/**
 * DEV ONLY — delete this route before production deploy.
 */

import { NextResponse } from "next/server";
import { sendOrderNotification } from "@/lib/mailer";
import type { Order } from "@/types";

export const runtime = "nodejs";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const testOrder: Order = {
    id: "HB_TEST_" + Date.now().toString().slice(-4),
    customer: {
      firstName: "Test",
      lastName: "Customer",
      email: "test@example.com",
      phone: "0901234567",
      note: "Đây là đơn hàng test",
    },
    shipping: {
      address: "123 Nguyen Hue",
      city: "Ho Chi Minh",
      district: "Quan 1",
      ward: "Ben Nghe",
      method: "express",
    },
    items: [
      {
        productId: "p1",
        name: "COVENANT HOODIE",
        size: "L",
        quantity: 1,
        price: 850000,
      },
      {
        productId: "p5",
        name: "HEBREW LOGO CAP",
        size: "FREE",
        quantity: 2,
        price: 520000,
      },
    ],
    total: 1920000,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const ok = await sendOrderNotification(testOrder);
  if (!ok) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Email not sent (check GMAIL_USER, GMAIL_APP_PASSWORD, and ADMIN_EMAIL_* in .env.local).",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Test email sent! Check your inbox.",
    sentTo: [process.env.ADMIN_EMAIL_1, process.env.ADMIN_EMAIL_2].filter(
      Boolean,
    ),
  });
}
