"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ProductTable } from "@/components/admin/ProductTable";
import type { Product, StockStatus } from "@/types";

export function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState<StockStatus | "all">("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = (await res.json()) as Product[];
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q.trim() && !p.name.toLowerCase().includes(q.toLowerCase())) {
        return false;
      }
      if (category !== "all" && p.category !== category) return false;
      if (status !== "all" && p.stockStatus !== status) return false;
      return true;
    });
  }, [products, q, category, status]);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("delete failed");
    await load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl tracking-tight text-gray-900">
            Products
          </h1>
          <p className="mt-1 font-mono text-sm text-gray-500">
            Quản lý sản phẩm (API + JSON).
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-red-600 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white shadow hover:bg-red-700"
        >
          Thêm sản phẩm
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-end">
        <div className="flex-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
            Tìm theo tên
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
            Danh mục
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full min-w-[140px] rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 md:w-44"
          >
            <option value="all">Tất cả</option>
            <option value="hoodies">hoodies</option>
            <option value="tees">tees</option>
            <option value="pants">pants</option>
            <option value="accessories">accessories</option>
            <option value="outerwear">outerwear</option>
          </select>
        </div>
        <div>
          <label className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
            Trạng thái kho
          </label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as StockStatus | "all")
            }
            className="mt-1 w-full min-w-[140px] rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 md:w-44"
          >
            <option value="all">Tất cả</option>
            <option value="in-stock">in-stock</option>
            <option value="low-stock">low-stock</option>
            <option value="sold-out">sold-out</option>
            <option value="coming-soon">coming-soon</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="font-mono text-sm text-gray-500">Đang tải…</p>
        ) : (
          <ProductTable products={filtered} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
