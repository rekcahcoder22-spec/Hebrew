import { Schema, model, models, type Document, type Model } from "mongoose";
import type { Product } from "@/types";

export interface ProductDocument extends Omit<Product, "id">, Document {
  id: string;
}

const ProductSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 4.7 },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["hoodies", "tees", "pants", "accessories", "outerwear"],
      required: true,
    },
    sizes: { type: [String], default: [] },
    stock: { type: Map, of: Number, default: {} },
    stockStatus: {
      type: String,
      enum: ["in-stock", "low-stock", "sold-out", "coming-soon"],
      default: "in-stock",
    },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    isNew: { type: Boolean, default: true },
    content: {
      overview: {
        primary: {
          en: { type: String },
          vi: { type: String },
        },
        secondary: {
          en: { type: String },
          vi: { type: String },
        },
      },
      specs: {
        material: {
          en: { type: String },
          vi: { type: String },
        },
        fit: {
          en: { type: String },
          vi: { type: String },
        },
        securePrint: {
          en: { type: String },
          vi: { type: String },
        },
        origin: {
          en: { type: String },
          vi: { type: String },
        },
      },
    },
    createdAt: { type: String },
    updatedAt: { type: String },
  },
  { timestamps: false, versionKey: false, suppressReservedKeysWarning: true },
);

export const ProductModel: Model<ProductDocument> =
  (models.Product as Model<ProductDocument> | undefined) ??
  model<ProductDocument>("Product", ProductSchema);
