"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildStockForSizes } from "@/lib/inventoryUtils";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Product, Size, StockStatus } from "@/types";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

const schema = z.object({
  name: z.string().min(2, "Tối thiểu 2 ký tự"),
  description: z.string().min(10, "Tối thiểu 10 ký tự"),
  price: z.coerce.number().positive("Giá phải > 0"),
  originalPriceStr: z.string().optional(),
  category: z.enum(
    ["hoodies", "tees", "pants", "accessories", "outerwear"],
    { required_error: "Chọn danh mục" },
  ),
  sizes: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])).min(1, "Chọn ít nhất 1 size"),
  stockStatus: z.enum([
    "in-stock",
    "low-stock",
    "sold-out",
    "coming-soon",
  ]),
  tags: z.string(),
  featured: z.boolean(),
  isNew: z.boolean(),
  images: z.array(z.string().min(1)).min(1, "Thêm ít nhất 1 ảnh"),
});

type FormValues = z.infer<typeof schema>;

export type ProductFormSubmitData =
  | Omit<Product, "id" | "createdAt" | "updatedAt">
  | Omit<Product, "updatedAt">;

type Props = {
  mode: "create" | "edit";
  product?: Product;
  onSubmit: (data: ProductFormSubmitData) => void | Promise<void>; // create: no id; edit: includes id + createdAt
  isLoading: boolean;
};

function parseTags(s: string): string[] {
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export function ProductForm({ mode, product, onSubmit, isLoading }: Props) {
  const defaults: FormValues = product
    ? {
        name: product.name,
        description: product.description,
        price: product.price,
        originalPriceStr:
          product.originalPrice != null ? String(product.originalPrice) : "",
        category: product.category as FormValues["category"],
        sizes: product.sizes as Size[],
        stockStatus: product.stockStatus,
        tags: product.tags.join(", "),
        featured: product.featured,
        isNew: product.isNew,
        images: [...product.images],
      }
    : {
        name: "",
        description: "",
        price: 0,
        originalPriceStr: "",
        category: "tees",
        sizes: ["M", "L"],
        stockStatus: "in-stock",
        tags: "",
        featured: false,
        isNew: true,
        images: [],
      };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const submit = async (v: FormValues) => {
    const op = v.originalPriceStr?.trim();
    const originalPrice =
      op && Number.isFinite(Number(op)) && Number(op) > 0
        ? Number(op)
        : undefined;
    const stock = buildStockForSizes(v.sizes, v.stockStatus as StockStatus);
    const base = {
      name: v.name.trim(),
      description: v.description.trim(),
      price: v.price,
      originalPrice,
      images: v.images,
      category: v.category,
      sizes: v.sizes,
      stockStatus: v.stockStatus as StockStatus,
      stock,
      tags: parseTags(v.tags),
      featured: v.featured,
      isNew: v.isNew,
    };

    if (mode === "create") {
      await onSubmit(base);
    } else if (product) {
      const out: Omit<Product, "updatedAt"> = {
        ...product,
        ...base,
        id: product.id,
        createdAt: product.createdAt,
      };
      await onSubmit(out);
    }
  };

  const watchedImages = watch("images");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-3xl space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Tên sản phẩm *
        </label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        {errors.name && (
          <p className="mt-1 font-mono text-xs text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Mô tả *
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
        {errors.description && (
          <p className="mt-1 font-mono text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
            Giá (VND) *
          </label>
          <input
            type="number"
            {...register("price")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          {errors.price && (
            <p className="mt-1 font-mono text-xs text-red-600">
              {errors.price.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
            Giá gốc (VND, nếu có)
          </label>
          <input
            type="number"
            {...register("originalPriceStr")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Danh mục *
        </label>
        <select
          {...register("category")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        >
          <option value="hoodies">hoodies</option>
          <option value="tees">tees</option>
          <option value="pants">pants</option>
          <option value="accessories">accessories</option>
          <option value="outerwear">outerwear</option>
        </select>
        {errors.category && (
          <p className="mt-1 font-mono text-xs text-red-600">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <p className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Sizes có sẵn *
        </p>
        <Controller
          name="sizes"
          control={control}
          render={({ field }) => (
            <div className="mt-2 flex flex-wrap gap-3">
              {SIZES.map((s) => (
                <label
                  key={s}
                  className="flex cursor-pointer items-center gap-2 font-mono text-xs"
                >
                  <input
                    type="checkbox"
                    checked={field.value.includes(s)}
                    onChange={() => {
                      const cur = field.value;
                      const next = cur.includes(s)
                        ? cur.filter((x) => x !== s)
                        : [...cur, s];
                      field.onChange(next);
                    }}
                  />
                  {s}
                </label>
              ))}
            </div>
          )}
        />
        {errors.sizes && (
          <p className="mt-1 font-mono text-xs text-red-600">
            {errors.sizes.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Trạng thái kho *
        </label>
        <select
          {...register("stockStatus")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        >
          <option value="in-stock">in-stock</option>
          <option value="low-stock">low-stock</option>
          <option value="sold-out">sold-out</option>
          <option value="coming-soon">coming-soon</option>
        </select>
      </div>

      <div>
        <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Tags (phân tách bằng dấu phẩy)
        </label>
        <input
          {...register("tags")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
        />
      </div>

      <div className="flex flex-wrap gap-8">
        <label className="flex items-center gap-2 font-mono text-xs">
          <input type="checkbox" {...register("featured")} />
          Featured
        </label>
        <label className="flex items-center gap-2 font-mono text-xs">
          <input type="checkbox" {...register("isNew")} />
          Is New
        </label>
      </div>

      <section className="mt-8">
        <p className="mb-4 font-body text-[9px] uppercase tracking-[0.2em] text-hb-white/40">
          PRODUCT IMAGES
        </p>
        <div className="mb-4 flex flex-wrap gap-4">
          {["3:4 RATIO", "AUTO FIT", "900×1200px", "MAX 4 IMAGES"].map((spec) => (
            <span
              key={spec}
              className="border border-hb-border/40 px-2 py-1 font-body text-[8px] uppercase tracking-wider text-hb-white/20"
            >
              {spec}
            </span>
          ))}
        </div>
        <ImageUpload
          value={watchedImages}
          onChange={(urls) =>
            setValue("images", urls, { shouldDirty: true, shouldValidate: true })
          }
          maxImages={4}
        />
        {errors.images && (
          <p className="mt-2 font-body text-[9px] text-hb-red">
            At least 1 product image is required
          </p>
        )}
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-red-600 px-8 py-3 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? "Đang lưu…" : mode === "create" ? "Tạo sản phẩm" : "Cập nhật"}
      </button>
    </form>
  );
}
