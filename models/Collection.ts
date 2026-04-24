import { Schema, model, models, type Document, type Model } from "mongoose";

export type CollectionProductFilterMode =
  | "featured"
  | "tag"
  | "category"
  | "ids"
  | "all";

export interface CollectionProductFilter {
  mode: CollectionProductFilterMode;
  tag?: string;
  category?: string;
  ids?: string[];
  limit?: number;
}

export interface CollectionLayout {
  columnsLg?: 2 | 4 | 5;
}

export interface CollectionDocument extends Document {
  slug: string;
  title: string;
  subtitle: string;
  viewAllHref: string;
  isHome: boolean;
  active: boolean;
  order: number;
  productFilter: CollectionProductFilter;
  layout?: CollectionLayout;
}

const ProductFilterSchema = new Schema(
  {
    mode: {
      type: String,
      enum: ["featured", "tag", "category", "ids", "all"],
      default: "featured",
    },
    tag: { type: String },
    category: { type: String },
    ids: { type: [String], default: [] },
    limit: { type: Number, default: 24 },
  },
  { _id: false },
);

const LayoutSchema = new Schema(
  {
    columnsLg: { type: Number, enum: [2, 4, 5], default: 5 },
  },
  { _id: false },
);

const CollectionSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    viewAllHref: { type: String, default: "/shop" },
    isHome: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    productFilter: { type: ProductFilterSchema, required: true },
    layout: { type: LayoutSchema },
  },
  { timestamps: true, versionKey: false },
);

export const CollectionModel: Model<CollectionDocument> =
  (models.Collection as Model<CollectionDocument> | undefined) ??
  model<CollectionDocument>("Collection", CollectionSchema);
