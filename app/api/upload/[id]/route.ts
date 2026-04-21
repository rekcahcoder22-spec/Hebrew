import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

type UploadDoc = {
  _id: mongoose.Types.ObjectId;
  mime: string;
  data: Buffer;
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid upload id" }, { status: 400 });
    }

    const db = (await connectDB()).connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    const doc = await db
      .collection<UploadDoc>("uploads")
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!doc) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return new NextResponse(doc.data, {
      headers: {
        "Content-Type": doc.mime || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GET /api/upload/[id] error:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
