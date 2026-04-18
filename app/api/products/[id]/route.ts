import { NextResponse } from "next/server";
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
    const p = getProductById(id);
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

export async function PUT(request: Request, context: Ctx) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<Product>;
    const current = getProductById(id);
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const merged: Partial<Product> = {
      ...body,
      id,
    };
    const updated = updateProduct(id, merged);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  try {
    const { id } = await context.params;
    const ok = deleteProduct(id);
    if (!ok) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
