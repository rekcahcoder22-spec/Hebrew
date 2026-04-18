import { getSettings, toPublicSettings } from "@/lib/products";
import { SettingsForm } from "./SettingsForm";

export default async function AdminSettingsPage() {
  const initial = toPublicSettings(await getSettings());
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight text-gray-900">
        Brand settings
      </h1>
      <p className="mt-1 font-mono text-sm text-gray-500">
        Cập nhật settings thương hiệu trong MongoDB.
      </p>
      <div className="mt-8">
        <SettingsForm initial={initial} />
      </div>
    </div>
  );
}
