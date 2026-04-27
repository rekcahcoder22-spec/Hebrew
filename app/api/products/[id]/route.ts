import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { revalidateShopProductPage } from "@/lib/revalidateShopProduct";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/lib/products";
import type { Product } from "@/types";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  try {
    const { id } = await context.params;
    const p = await getProductById(id);
    if (!p) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(p);
  } catch {
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, context: Ctx) {
  try {
    const allowed = await isAdminRequest(request);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = (await request.json()) as Partial<Product>;
    const current = await getProductById(id);
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const merged: Partial<Product> = {
      ...body,
      id,
    };
    const updated = await updateProduct(id, merged);
    revalidateShopProductPage(id);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: NextRequest, context: Ctx) {
  try {
    const allowed = await isAdminRequest(request);
    if (!allowed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const ok = await deleteProduct(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    revalidateShopProductPage(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
