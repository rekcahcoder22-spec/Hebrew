"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/home/ProductGrid";
import type { Product, Size, StockStatus } from "@/types";

const CATEGORIES = [
  "all",
  "hoodies",
  "tees",
  "pants",
  "accessories",
  "outerwear",
] as const;

const SIZES: (Size | "all")[] = ["all", "XS", "S", "M", "L", "XL", "XXL"];

const AVAIL: (StockStatus | "all")[] = [
  "all",
  "in-stock",
  "low-stock",
  "sold-out",
  "coming-soon",
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low → high" },
  { value: "price-desc", label: "Price: high → low" },
] as const;

type SortValue = (typeof SORTS)[number]["value"];

export type ShopQuery = {
  category: (typeof CATEGORIES)[number];
  size: Size | "all";
  minPrice: number;
  maxPrice: number;
  availability: StockStatus | "all";
  sort: SortValue;
};

function parseQuery(sp: URLSearchParams): ShopQuery {
  const cat = sp.get("category") || "all";
  const category = CATEGORIES.includes(cat as (typeof CATEGORIES)[number])
    ? (cat as (typeof CATEGORIES)[number])
    : "all";
  const sz = sp.get("size") || "all";
  const validSizes = new Set(SIZES);
  const size =
    sz === "all" || validSizes.has(sz as Size | "all")
      ? (sz as Size | "all")
      : "all";
  const minP = sp.get("minPrice");
  const maxP = sp.get("maxPrice");
  const minPrice = minP && !Number.isNaN(Number(minP)) ? Number(minP) : NaN;
  const maxPrice = maxP && !Number.isNaN(Number(maxP)) ? Number(maxP) : NaN;
  const av = sp.get("availability") || "all";
  const availability = AVAIL.includes(av as StockStatus | "all")
    ? (av as StockStatus | "all")
    : "all";
  const so = sp.get("sort") || "featured";
  const sort = SORTS.some((x) => x.value === so) ? (so as SortValue) : "featured";

  return {
    category,
    size,
    minPrice,
    maxPrice,
    availability,
    sort,
  };
}

function pushQuery(router: ReturnType<typeof useRouter>, q: ShopQuery) {
  const sp = new URLSearchParams();
  if (q.category !== "all") sp.set("category", q.category);
  if (q.size !== "all") sp.set("size", q.size);
  if (Number.isFinite(q.minPrice) && q.minPrice > 0) {
    sp.set("minPrice", String(Math.floor(q.minPrice)));
  }
  if (Number.isFinite(q.maxPrice) && q.maxPrice > 0) {
    sp.set("maxPrice", String(Math.floor(q.maxPrice)));
  }
  if (q.availability !== "all") sp.set("availability", q.availability);
  if (q.sort !== "featured") sp.set("sort", q.sort);
  const qs = sp.toString();
  router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
}

function filterAndSort(products: Product[], q: ShopQuery): Product[] {
  let list = [...products];

  if (q.category !== "all") {
    list = list.filter((p) => p.category === q.category);
  }

  if (q.size !== "all") {
    list = list.filter(
      (p) =>
        p.sizes.includes(q.size as Size) &&
        (p.stock[q.size as Size] ?? 0) > 0,
    );
  }

  if (Number.isFinite(q.minPrice) && q.minPrice > 0) {
    list = list.filter((p) => p.price >= q.minPrice);
  }
  if (Number.isFinite(q.maxPrice) && q.maxPrice > 0) {
    list = list.filter((p) => p.price <= q.maxPrice);
  }

  if (q.availability !== "all") {
    list = list.filter((p) => p.stockStatus === q.availability);
  }

  switch (q.sort) {
    case "newest":
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "featured":
    default:
      list.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
      break;
  }

  return list;
}

function FiltersForm({
  values,
  onApply,
  onClose,
}: {
  values: ShopQuery;
  onApply: (next: ShopQuery) => void;
  onClose?: () => void;
}) {
  const [local, setLocal] = useState(values);

  useEffect(() => {
    setLocal(values);
  }, [values]);

  const apply = () => {
    onApply(local);
    onClose?.();
  };

  return (
    <div className="space-y-6 font-body text-xs uppercase tracking-widest text-hb-white/70">
      <div>
        <p className="mb-2 text-[10px] text-hb-gold">Category</p>
        <select
          value={local.category}
          onChange={(e) =>
            setLocal((s) => ({
              ...s,
              category: e.target.value as (typeof CATEGORIES)[number],
            }))
          }
          className="w-full border border-hb-border bg-hb-gray px-3 py-2 text-hb-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-[10px] text-hb-gold">Size</p>
        <select
          value={local.size}
          onChange={(e) =>
            setLocal((s) => ({ ...s, size: e.target.value as Size | "all" }))
          }
          className="w-full border border-hb-border bg-hb-gray px-3 py-2 text-hb-white"
        >
          {SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-[10px] text-hb-gold">Price (VND)</p>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            min={0}
            value={Number.isFinite(local.minPrice) ? local.minPrice || "" : ""}
            onChange={(e) =>
              setLocal((s) => ({
                ...s,
                minPrice: e.target.value === "" ? NaN : Number(e.target.value),
              }))
            }
            className="w-full border border-hb-border bg-hb-gray px-2 py-2 text-hb-white placeholder:text-hb-white/30"
          />
          <input
            type="number"
            placeholder="Max"
            min={0}
            value={Number.isFinite(local.maxPrice) ? local.maxPrice || "" : ""}
            onChange={(e) =>
              setLocal((s) => ({
                ...s,
                maxPrice: e.target.value === "" ? NaN : Number(e.target.value),
              }))
            }
            className="w-full border border-hb-border bg-hb-gray px-2 py-2 text-hb-white placeholder:text-hb-white/30"
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-[10px] text-hb-gold">Availability</p>
        <select
          value={local.availability}
          onChange={(e) =>
            setLocal((s) => ({
              ...s,
              availability: e.target.value as StockStatus | "all",
            }))
          }
          className="w-full border border-hb-border bg-hb-gray px-3 py-2 text-hb-white"
        >
          {AVAIL.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-[10px] text-hb-gold">Sort</p>
        <select
          value={local.sort}
          onChange={(e) =>
            setLocal((s) => ({ ...s, sort: e.target.value as SortValue }))
          }
          className="w-full border border-hb-border bg-hb-gray px-3 py-2 text-hb-white"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={apply}
        className="w-full border border-hb-red bg-hb-red py-3 text-hb-white transition hover:bg-red-700"
      >
        Apply
      </button>
    </div>
  );
}

export function ShopPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/products");
        const data = (await res.json()) as Product[];
        if (!cancelled && Array.isArray(data)) setProducts(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const query = useMemo(
    () => parseQuery(searchParams),
    [searchParams],
  );

  const applyQuery = useCallback(
    (next: ShopQuery) => {
      pushQuery(router, next);
    },
    [router],
  );

  const filtered = useMemo(
    () => filterAndSort(products, query),
    [products, query],
  );

  const filterPanel = (
    <FiltersForm
      values={query}
      onApply={applyQuery}
      onClose={() => setMobileFiltersOpen(false)}
    />
  );

  return (
    <div className="border-b border-hb-border bg-hb-black px-4 py-12">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-body text-[10px] uppercase tracking-[0.35em] text-hb-gold">
          Shop / Catalog
        </p>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-28 border border-hb-border bg-hb-gray/40 p-5">
              <p className="mb-4 font-display text-lg tracking-widest text-hb-white">
                FILTERS
              </p>
              {filterPanel}
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="border border-hb-border bg-hb-gray px-4 py-2 font-body text-[10px] uppercase tracking-widest text-hb-white"
              >
                Filters &amp; sort
              </button>
              <p className="font-body text-[10px] text-hb-white/40">
                {filtered.length} items
              </p>
            </div>

            <p className="mb-4 hidden font-body text-[10px] text-hb-white/40 lg:block">
              {filtered.length} items
            </p>

            {loading ? (
              <p className="font-body text-sm text-hb-white/50">Loading…</p>
            ) : (
              <ProductGrid
                products={filtered}
                title="ALL PIECES"
                subtitle="HEBREW — NEW & CORE"
                viewAllHref="/shop"
                linkLabel={`Xem ${filtered.length} sản phẩm →`}
                columnsLg={4}
              />
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,22rem)] flex-col border-l border-hb-border bg-hb-black shadow-2xl transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b border-hb-border px-4 py-4">
              <span className="font-display text-lg tracking-widest text-hb-white">
                FILTERS
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="font-body text-xs text-hb-red"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{filterPanel}</div>
          </div>
        </div>
      )}
    </div>
  );
}
