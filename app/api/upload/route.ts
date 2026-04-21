import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof Blob)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mime = (file.type || "").toLowerCase();
    if (!ALLOWED.has(mime)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, WebP are allowed." },
        { status: 400 },
      );
    }

    if (file.size <= 0) {
      return NextResponse.json({ error: "Empty file" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Max file size is 5MB" }, { status: 400 });
    }

    const db = (await connectDB()).connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    const binary = Buffer.from(await file.arrayBuffer());
    const res = await db.collection("uploads").insertOne({
      mime,
      size: file.size,
      data: binary,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ url: `/api/upload/${res.insertedId.toString()}` });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
