import { getSettings, toPublicSettings } from "@/lib/products";
import { SettingsForm } from "./SettingsForm";

export default function AdminSettingsPage() {
  const initial = toPublicSettings(getSettings());
  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight text-gray-900">
        Brand settings
      </h1>
      <p className="mt-1 font-mono text-sm text-gray-500">
        Cập nhật <code className="text-red-600">data/settings.json</code>
      </p>
      <div className="mt-8">
        <SettingsForm initial={initial} />
      </div>
    </div>
  );
}
