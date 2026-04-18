// Run once to seed initial products into MongoDB.
// DELETE this file after seeding in production.

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "COVENANT HOODIE",
    price: 850000,
    description: "Premium heavyweight hoodie. 400gsm cotton fleece.",
    images: [],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 5, M: 10, L: 8, XL: 3 },
    stockStatus: "in-stock",
    tags: ["hoodie", "drop001"],
    featured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "EXODUS TEE",
    price: 450000,
    description: "Heavyweight graphic tee. 220gsm cotton.",
    images: [],
    category: "tees",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    stockStatus: "sold-out",
    tags: ["tee", "drop001"],
    featured: false,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p3",
    name: "DESERT CAMO CARGO",
    price: 1350000,
    description: "Relaxed fit cargo pants with utility pockets.",
    images: [],
    category: "pants",
    sizes: ["S", "M", "L"],
    stock: { S: 1, M: 2, L: 0 },
    stockStatus: "low-stock",
    tags: ["pants", "cargo", "drop001"],
    featured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p4",
    name: "STONE TABLET CREWNECK",
    price: 980000,
    description: "Garment-dyed crewneck sweatshirt.",
    images: [],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 4, M: 6, L: 5, XL: 2 },
    stockStatus: "in-stock",
    tags: ["crewneck", "drop001"],
    featured: false,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p5",
    name: "HEBREW LOGO CAP",
    price: 520000,
    description: "6-panel structured cap with embroidered logo.",
    images: [],
    category: "accessories",
    sizes: ["FREE"],
    stock: { FREE: 20 },
    stockStatus: "in-stock",
    tags: ["cap", "accessories", "drop001"],
    featured: true,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p6",
    name: "PROPHET JACKET",
    price: 2200000,
    description: "Oversized work jacket with custom hardware.",
    images: [],
    category: "outerwear",
    sizes: ["M", "L", "XL"],
    stock: { M: 2, L: 1, XL: 1 },
    stockStatus: "low-stock",
    tags: ["jacket", "outerwear", "drop001", "limited"],
    featured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  try {
    await connectDB();
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(SAMPLE_PRODUCTS);
    return NextResponse.json({
      success: true,
      message: `Seeded ${SAMPLE_PRODUCTS.length} products into MongoDB`,
    });
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 },
    );
  }
}
