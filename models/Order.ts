import { Schema, model, models, type Document, type Model } from "mongoose";
import type { Order } from "@/types";

export interface OrderDocument extends Omit<Order, "id">, Document {
  id: string;
}

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const CustomerInfoSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const ShippingInfoSchema = new Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    method: {
      type: String,
      required: true,
      enum: ["standard", "express", "pickup"],
    },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    customer: { type: CustomerInfoSchema, required: true },
    shipping: { type: ShippingInfoSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
      index: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: false, versionKey: false },
);

export const OrderModel: Model<OrderDocument> =
  (models.Order as Model<OrderDocument> | undefined) ??
  model<OrderDocument>("Order", OrderSchema);
