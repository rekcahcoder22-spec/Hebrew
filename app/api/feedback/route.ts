import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

type FeedbackPayload = {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  rating?: number;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FeedbackPayload;
    if (!body.name || !body.email || !body.message || !body.rating) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const db = (await connectDB()).connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    await db.collection("feedbacks").insertOne({
      name: body.name,
      email: body.email,
      phone: body.phone ?? "",
      type: body.type ?? "",
      rating: body.rating,
      message: body.message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
