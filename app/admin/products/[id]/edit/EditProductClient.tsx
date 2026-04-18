"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ProductForm,
  type ProductFormSubmitData,
} from "@/components/admin/ProductForm";
import type { Product } from "@/types";

export function EditProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ProductFormSubmitData) => {
    if (!("id" in data) || !data.id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products/${encodeURIComponent(data.id)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Update failed");
      }
      toast.success("Đã cập nhật sản phẩm.");
      router.push("/admin/products");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Lỗi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-4xl tracking-tight text-gray-900">
        Sửa sản phẩm
      </h1>
      <p className="mt-1 font-mono text-sm text-gray-500">{product.name}</p>
      <div className="mt-8">
        <ProductForm
          mode="edit"
          product={product}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
