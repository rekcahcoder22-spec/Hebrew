import { NextResponse } from "next/server";
import { getCollectionWithProductsBySlug } from "@/lib/collections";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: Ctx) {
  try {
    const { slug } = await context.params;
    const data = await getCollectionWithProductsBySlug(slug);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/collections/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to load collection" },
      { status: 500 },
    );
  }
}
