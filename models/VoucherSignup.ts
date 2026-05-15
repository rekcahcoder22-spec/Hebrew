import { Schema, model, models, type Document, type Model } from "mongoose";

export interface VoucherSignupLean {
  phone: string;
  createdAt: Date;
}

export interface VoucherSignupDocument extends VoucherSignupLean, Document {}

const VoucherSignupSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export const VoucherSignupModel: Model<VoucherSignupDocument> =
  (models.VoucherSignup as Model<VoucherSignupDocument> | undefined) ??
  model<VoucherSignupDocument>("VoucherSignup", VoucherSignupSchema);
