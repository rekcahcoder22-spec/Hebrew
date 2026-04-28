// Run once to seed initial products into MongoDB.
// DELETE this file after seeding in production.

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ProductModel } from "@/models/Product";

const SAMPLE_PRODUCTS = [
  {
    id: "p1",
    name: "COVENANT HOODIE",
    rating: 4.9,
    price: 850000,
    description: "Premium heavyweight hoodie. 400gsm cotton fleece.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1578587018452-892b21fd5299?w=900&h=1200&fit=crop",
    ],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 5, M: 10, L: 8, XL: 3 },
    stockStatus: "in-stock",
    tags: ["hoodie", "drop001", "adore"],
    featured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "EXODUS TEE",
    rating: 4.4,
    price: 450000,
    description: "Heavyweight graphic tee. 220gsm cotton.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&h=1200&fit=crop",
    ],
    category: "tees",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: { S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    stockStatus: "sold-out",
    tags: ["tee", "drop001", "adore"],
    featured: false,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p3",
    name: "DESERT CAMO CARGO",
    rating: 4.7,
    price: 1350000,
    description: "Relaxed fit cargo pants with utility pockets.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=900&h=1200&fit=crop",
    ],
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
    rating: 4.5,
    price: 980000,
    description: "Garment-dyed crewneck sweatshirt.",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&h=1200&fit=crop",
    ],
    category: "hoodies",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 4, M: 6, L: 5, XL: 2 },
    stockStatus: "in-stock",
    tags: ["crewneck", "drop001", "adore"],
    featured: false,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p5",
    name: "HEBREW LOGO CAP",
    rating: 4.8,
    price: 520000,
    description: "6-panel structured cap with embroidered logo.",
    images: [
      "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=900&h=1200&fit=crop",
    ],
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
    rating: 5,
    price: 2200000,
    description: "Oversized work jacket with custom hardware.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&h=1200&fit=crop",
    ],
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
  {
    id: "p7",
    name: "ADORE — FRACTURED GLASS TEE",
    rating: 4.9,
    price: 1290000,
    description:
      "Concept ADORE graphic tee — mineral wash, oversized fit, 240gsm cotton.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&h=1200&fit=crop",
    ],
    category: "tees",
    sizes: ["S", "M", "L", "XL"],
    stock: { S: 6, M: 10, L: 8, XL: 4 },
    stockStatus: "in-stock",
    tags: ["adore", "concept", "graphic"],
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
