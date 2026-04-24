import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { createProduct, getProducts } from "@/lib/products";
import { buildStockForSizes } from "@/lib/inventoryUtils";
import type { Product, Size, StockStatus } from "@/types";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function extFromMime(mime: string): string {
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/png") return ".png";
  if (mime === "image/webp") return ".webp";
  return ".jpg";
}

async function saveUploadedImage(file: File): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  const mime = file.type;
  if (!ALLOWED.has(mime)) return null;
  if (file.size > 5 * 1024 * 1024) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${randomUUID()}${extFromMime(mime)}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    let list = await getProducts();
    if (category && category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (featured === "true") {
      list = list.filter((p) => p.featured);
    }
    return NextResponse.json(list);
  } catch {
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const ct = request.headers.get("content-type") || "";

    if (ct.includes("application/json")) {
      const body = (await request.json()) as Omit<
        Product,
        "id" | "createdAt" | "updatedAt"
      >;
      const created = await createProduct(body);
      return NextResponse.json(created, { status: 201 });
    }

    let meta: Record<string, unknown>;

    const imageUrls: string[] = [];

    if (ct.includes("multipart/form-data")) {
      const formData = await request.formData();
      const metaRaw = formData.get("meta");
      if (typeof metaRaw !== "string") {
        return NextResponse.json({ error: "Missing meta" }, { status: 400 });
      }
      meta = JSON.parse(metaRaw) as Record<string, unknown>;
      for (const [, value] of Array.from(formData.entries())) {
        if (value instanceof File && value.size > 0) {
          const url = await saveUploadedImage(value);
          if (url) imageUrls.push(url);
        }
      }
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      meta = body;
      const imgs = meta.images;
      if (Array.isArray(imgs)) {
        for (const u of imgs) {
          if (typeof u === "string") imageUrls.push(u);
        }
      }
    }

    const name = String(meta.name ?? "").trim();
    const description = String(meta.description ?? "").trim();
    const price = Number(meta.price);
    const originalPrice =
      meta.originalPrice != null && meta.originalPrice !== ""
        ? Number(meta.originalPrice)
        : undefined;
    const category = String(meta.category ?? "");
    const sizes = meta.sizes as Size[] | undefined;
    const stockStatus = meta.stockStatus as StockStatus | undefined;
    const tags = Array.isArray(meta.tags)
      ? (meta.tags as string[])
      : typeof meta.tags === "string"
        ? meta.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];
    const featured = Boolean(meta.featured);
    const isNew = Boolean(meta.isNew);
    const content =
      typeof meta.content === "object" && meta.content !== null
        ? (meta.content as Product["content"])
        : undefined;
    const existingImages = Array.isArray(meta.images)
      ? (meta.images as string[]).filter((x) => typeof x === "string")
      : [];

    if (!name || !description || !Number.isFinite(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (!sizes?.length) {
      return NextResponse.json({ error: "Sizes required" }, { status: 400 });
    }
    if (!stockStatus) {
      return NextResponse.json(
        { error: "Stock status required" },
        { status: 400 },
      );
    }

    const images = [...existingImages, ...imageUrls].slice(0, 5);
    const stock = buildStockForSizes(sizes, stockStatus);

    const payload: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
      name,
      description,
      price,
      originalPrice:
        originalPrice != null && Number.isFinite(originalPrice) && originalPrice > 0
          ? originalPrice
          : undefined,
      images,
      category,
      sizes,
      stockStatus,
      stock,
      tags,
      featured,
      isNew,
      content,
    };

    const created = await createProduct(payload);
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 400 },
    );
  }
}
