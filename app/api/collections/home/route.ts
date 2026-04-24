import { NextResponse } from "next/server";
import { getHomeCollectionWithProducts } from "@/lib/collections";

export async function GET() {
  try {
    const data = await getHomeCollectionWithProducts();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/collections/home error:", error);
    return NextResponse.json(
      { error: "Failed to load home collection" },
      { status: 500 },
    );
  }
}
