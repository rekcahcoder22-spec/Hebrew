import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Binary } from "mongodb";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

type UploadDoc = {
  _id: mongoose.Types.ObjectId;
  mime: string;
  data: Buffer | Binary | Uint8Array | ArrayBuffer;
};

function toBuffer(data: UploadDoc["data"]): Buffer {
  if (Buffer.isBuffer(data)) return data;
  if (data instanceof Binary) return Buffer.from(data.buffer);
  if (data instanceof Uint8Array) return Buffer.from(data);
  if (data instanceof ArrayBuffer) return Buffer.from(data);
  return Buffer.alloc(0);
}

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

    const body = toBuffer(doc.data);
    if (body.length === 0) {
      return NextResponse.json({ error: "Image data is empty" }, { status: 404 });
    }

    const payload = Uint8Array.from(body).buffer;

    return new Response(payload, {
      headers: {
        "Content-Type": doc.mime || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(body.byteLength),
      },
    });
  } catch (error) {
    console.error("GET /api/upload/[id] error:", error);
    return NextResponse.json({ error: "Failed to load image" }, { status: 500 });
  }
}
