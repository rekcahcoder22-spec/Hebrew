import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

type ContactPayload = {
  name?: string;
  email?: string;
  type?: string;
  instagram?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    const db = (await connectDB()).connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    await db.collection("contacts").insertOne({
      name: body.name,
      email: body.email,
      type: body.type ?? "",
      instagram: body.instagram ?? "",
      message: body.message ?? "",
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
