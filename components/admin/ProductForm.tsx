"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildStockForSizes } from "@/lib/inventoryUtils";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Product, Size, StockStatus } from "@/types";

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

function parseVndInput(value: unknown): number {
  if (typeof value === "number") return value;
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : Number.NaN;
}

const schema = z.object({
  name: z.string().min(2, "Tối thiểu 2 ký tự"),
  description: z.string().min(10, "Tối thiểu 10 ký tự"),
  price: z.preprocess(
    parseVndInput,
    z.number({ invalid_type_error: "Giá không hợp lệ" }).positive("Giá phải > 0"),
  ),
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
  overviewPrimaryVi: z.string().optional(),
  overviewPrimaryEn: z.string().optional(),
  overviewSecondaryVi: z.string().optional(),
  overviewSecondaryEn: z.string().optional(),
  specsMaterialVi: z.string().optional(),
  specsMaterialEn: z.string().optional(),
  specsFitVi: z.string().optional(),
  specsFitEn: z.string().optional(),
  specsSecurePrintVi: z.string().optional(),
  specsSecurePrintEn: z.string().optional(),
  specsOriginVi: z.string().optional(),
  specsOriginEn: z.string().optional(),
});

type FormValues = z.input<typeof schema>;
type SubmitValues = z.output<typeof schema>;

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
        overviewPrimaryVi: product.content?.overview?.primary?.vi ?? "",
        overviewPrimaryEn: product.content?.overview?.primary?.en ?? "",
        overviewSecondaryVi: product.content?.overview?.secondary?.vi ?? "",
        overviewSecondaryEn: product.content?.overview?.secondary?.en ?? "",
        specsMaterialVi: product.content?.specs?.material?.vi ?? "",
        specsMaterialEn: product.content?.specs?.material?.en ?? "",
        specsFitVi: product.content?.specs?.fit?.vi ?? "",
        specsFitEn: product.content?.specs?.fit?.en ?? "",
        specsSecurePrintVi: product.content?.specs?.securePrint?.vi ?? "",
        specsSecurePrintEn: product.content?.specs?.securePrint?.en ?? "",
        specsOriginVi: product.content?.specs?.origin?.vi ?? "",
        specsOriginEn: product.content?.specs?.origin?.en ?? "",
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
        overviewPrimaryVi: "",
        overviewPrimaryEn: "",
        overviewSecondaryVi: "",
        overviewSecondaryEn: "",
        specsMaterialVi: "",
        specsMaterialEn: "",
        specsFitVi: "",
        specsFitEn: "",
        specsSecurePrintVi: "",
        specsSecurePrintEn: "",
        specsOriginVi: "",
        specsOriginEn: "",
      };

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues, unknown, SubmitValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
  });

  const submit = async (v: SubmitValues) => {
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
      content: {
        overview: {
          primary: {
            vi: v.overviewPrimaryVi?.trim() || undefined,
            en: v.overviewPrimaryEn?.trim() || undefined,
          },
          secondary: {
            vi: v.overviewSecondaryVi?.trim() || undefined,
            en: v.overviewSecondaryEn?.trim() || undefined,
          },
        },
        specs: {
          material: {
            vi: v.specsMaterialVi?.trim() || undefined,
            en: v.specsMaterialEn?.trim() || undefined,
          },
          fit: {
            vi: v.specsFitVi?.trim() || undefined,
            en: v.specsFitEn?.trim() || undefined,
          },
          securePrint: {
            vi: v.specsSecurePrintVi?.trim() || undefined,
            en: v.specsSecurePrintEn?.trim() || undefined,
          },
          origin: {
            vi: v.specsOriginVi?.trim() || undefined,
            en: v.specsOriginEn?.trim() || undefined,
          },
        },
      },
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

      <section className="space-y-4 rounded-md border border-gray-200 p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
          Nội dung Product Detail (EN/VI)
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Tổng quan 1 (VI)
            </label>
            <textarea
              {...register("overviewPrimaryVi")}
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Overview 1 (EN)
            </label>
            <textarea
              {...register("overviewPrimaryEn")}
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Tổng quan 2 (VI)
            </label>
            <textarea
              {...register("overviewSecondaryVi")}
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Overview 2 (EN)
            </label>
            <textarea
              {...register("overviewSecondaryEn")}
              rows={3}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Chất liệu (VI)
            </label>
            <input
              {...register("specsMaterialVi")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Material (EN)
            </label>
            <input
              {...register("specsMaterialEn")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Phom dáng (VI)
            </label>
            <input
              {...register("specsFitVi")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Fit (EN)
            </label>
            <input
              {...register("specsFitEn")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Độ bền in chuẩn Web3 (VI)
            </label>
            <input
              {...register("specsSecurePrintVi")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Web3-grade Print Security (EN)
            </label>
            <input
              {...register("specsSecurePrintEn")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Xuất xứ (VI)
            </label>
            <input
              {...register("specsOriginVi")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-widest text-gray-500">
              Origin (EN)
            </label>
            <input
              {...register("specsOriginEn")}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>
      </section>

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
            type="text"
            inputMode="numeric"
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
          Tags (phân tách bằng dấu phẩy) — gõ{" "}
          <span className="text-gray-700">adore</span> để sản phẩm tự vào collection
          ADORE (trang chủ + /collections/adore); không phụ thuộc danh mục
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
