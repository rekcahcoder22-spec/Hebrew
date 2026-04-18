import { Schema, model, models, type Model, type Document } from "mongoose";

export interface SettingsDocument extends Document {
  key: string;
  value: unknown;
}

const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const SettingsModel: Model<SettingsDocument> =
  (models.Settings as Model<SettingsDocument> | undefined) ??
  model<SettingsDocument>("Settings", SettingsSchema);
