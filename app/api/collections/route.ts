import { NextResponse } from "next/server";
import { listCollections, toPublicCollection } from "@/lib/collections";

export async function GET() {
  try {
    const list = await listCollections();
    return NextResponse.json(list.map(toPublicCollection));
  } catch (error) {
    console.error("GET /api/collections error:", error);
    return NextResponse.json(
      { error: "Failed to list collections" },
      { status: 500 },
    );
  }
}
