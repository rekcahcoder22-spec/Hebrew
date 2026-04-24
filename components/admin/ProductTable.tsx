"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { StockBadge } from "@/components/ui/StockBadge";
import { totalStock } from "@/lib/inventoryUtils";
import { isUploadImagePath } from "@/lib/image";
import type { Product } from "@/types";
import { toast } from "sonner";

export function ProductTable({
  products,
  onDelete,
}: {
  products: Product[];
  onDelete: (id: string) => void | Promise<void>;
}) {
  const [confirm, setConfirm] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  const runDelete = async () => {
    if (!confirm) return;
    setDeleting(true);
    try {
      await onDelete(confirm.id);
      toast.success("Đã xóa sản phẩm.");
      setConfirm(null);
    } catch {
      toast.error("Xóa thất bại.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 font-mono text-xs text-gray-800">
          <thead className="bg-gray-100 text-[10px] uppercase tracking-widest text-gray-500">
            <tr>
              <th className="px-3 py-3 text-left">Ảnh</th>
              <th className="px-3 py-3 text-left">Tên</th>
              <th className="px-3 py-3 text-left">Giá</th>
              <th className="px-3 py-3 text-left">Danh mục</th>
              <th className="px-3 py-3 text-left">Trạng thái</th>
              <th className="px-3 py-3 text-left">Ngày tạo</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-3 py-2">
                  <div className="relative h-16 w-12 overflow-hidden rounded border border-gray-200 bg-gray-100">
                    {p.images[0] ? (
                      <Image
                        src={p.images[0]}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized={isUploadImagePath(p.images[0])}
                      />
                    ) : null}
                  </div>
                </td>
                <td className="max-w-[200px] px-3 py-2">
                  <p className="truncate font-medium text-gray-900">{p.name}</p>
                  <p className="truncate text-[10px] text-gray-400">{p.id}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-2">
                  {formatPrice(p.price)}
                </td>
                <td className="px-3 py-2 capitalize text-gray-600">
                  {p.category}
                </td>
                <td className="px-3 py-2">
                  <StockBadge
                    status={p.stockStatus}
                    stock={
                      p.stockStatus === "low-stock"
                        ? totalStock(p)
                        : undefined
                    }
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-2 text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="space-x-2 whitespace-nowrap px-3 py-2 text-right">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-red-600 hover:underline"
                  >
                    Sửa
                  </Link>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => setConfirm(p)}
                    className="text-gray-500 hover:text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl">
            <p className="font-mono text-sm text-gray-800">
              Bạn chắc chắn muốn xóa{" "}
              <span className="font-semibold text-red-600">{confirm.name}</span>
              ?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="rounded-md bg-gray-200 px-4 py-2 font-mono text-xs uppercase tracking-widest text-gray-800 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={runDelete}
                className="rounded-md bg-red-600 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Đang xóa…" : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
