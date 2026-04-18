"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ProductForm,
  type ProductFormSubmitData,
} from "@/components/admin/ProductForm";

export function ProductNewClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProductFormSubmitData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Create failed");
      }
      toast.success("Đã tạo sản phẩm.");
      router.push("/admin/products");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lỗi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight text-gray-900">
        Sản phẩm mới
      </h1>
      <p className="mt-1 font-mono text-sm text-gray-500">
        POST JSON tới <code className="text-red-600">/api/products</code>
      </p>
      <div className="mt-8">
        <ProductForm
          mode="create"
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
