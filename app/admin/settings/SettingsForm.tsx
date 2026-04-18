"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { PublicBrandSettings } from "@/lib/products";

const schema = z.object({
  dropDate: z.string().min(1),
  dropTitle: z.string().min(1),
  heroTagline: z.string().min(1),
  announcement: z.string().min(1),
  instagramUrl: z.string().url(),
  tiktokUrl: z.string().url(),
  newAdminPassword: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function SettingsForm({
  initial,
}: {
  initial: PublicBrandSettings;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dropDate: initial.dropDate.slice(0, 16),
      dropTitle: initial.dropTitle,
      heroTagline: initial.heroTagline,
      announcement: initial.announcement,
      instagramUrl: initial.instagramUrl,
      tiktokUrl: initial.tiktokUrl,
      newAdminPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: Record<string, unknown> = {
      dropDate: new Date(values.dropDate).toISOString(),
      dropTitle: values.dropTitle,
      heroTagline: values.heroTagline,
      announcement: values.announcement,
      instagramUrl: values.instagramUrl,
      tiktokUrl: values.tiktokUrl,
    };
    if (values.newAdminPassword && values.newAdminPassword.length > 0) {
      payload.newAdminPassword = values.newAdminPassword;
    }
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      toast.error("Lưu thất bại.");
      return;
    }
    toast.success("Đã lưu cài đặt.");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Drop title
        </label>
        <input
          {...register("dropTitle")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Drop date (local)
        </label>
        <input
          type="datetime-local"
          {...register("dropDate")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Hero tagline
        </label>
        <input
          {...register("heroTagline")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Announcement banner
        </label>
        <textarea
          {...register("announcement")}
          rows={3}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Instagram URL
        </label>
        <input
          {...register("instagramUrl")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          TikTok URL
        </label>
        <input
          {...register("tiktokUrl")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Đổi mật khẩu admin (tùy chọn)
        </label>
        <input
          type="password"
          {...register("newAdminPassword")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-red-600 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-red-700 disabled:opacity-50"
      >
        {isSubmitting ? "Đang lưu…" : "Lưu cài đặt"}
      </button>
    </form>
  );
}
