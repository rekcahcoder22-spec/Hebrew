import { Binary } from "mongodb";
import { connectDB } from "@/lib/mongodb";

/** Lưu bytes ảnh vào MongoDB (dùng cho production serverless — không ghi disk). */
export async function persistUploadImage(mime: string, buffer: Buffer): Promise<string> {
  const db = (await connectDB()).connection.db;
  if (!db) {
    throw new Error("Database connection unavailable");
  }
  const result = await db.collection("uploads").insertOne({
    mime,
    data: new Binary(buffer),
  });
  return `/api/upload/${result.insertedId.toString()}`;
}
