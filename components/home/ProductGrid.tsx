import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

function gridClass(columnsLg: 2 | 4 | 5) {
  if (columnsLg === 2) {
    return "grid-cols-1 sm:grid-cols-2";
  }
  if (columnsLg === 4) {
    return "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4";
  }
  return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
}

export function ProductGrid({
  products,
  title,
  subtitle,
  viewAllHref = "/shop",
  linkLabel,
  columnsLg = 4,
  hideHeader = false,
}: {
  products: Product[];
  title?: string;
  subtitle?: string;
  viewAllHref?: string;
  /** Ví dụ: `Xem 12 sản phẩm →` — nếu không truyền dùng VIEW ALL → */
  linkLabel?: string;
  columnsLg?: 2 | 4 | 5;
  hideHeader?: boolean;
}) {
  const colClass = gridClass(columnsLg);
  const endText = linkLabel ?? "VIEW ALL →";

  return (
    <section className="bg-void py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-8">
        {!hideHeader && (
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-[clamp(40px,7vw,72px)] leading-none tracking-tight text-hb-white">
                {title ?? "THE COLLECTION"}
              </h2>
              {subtitle ? (
                <p className="mt-2 font-body text-[9px] uppercase tracking-[0.25em] text-luxury-gold/85">
                  {subtitle}
                </p>
              ) : null}
            </div>
            <Link
              href={viewAllHref}
              className="shrink-0 font-body text-[9px] uppercase tracking-[0.15em] text-hb-white/30 transition-colors hover:text-hb-red"
            >
              {endText}
            </Link>
          </div>
        )}

        <div className={cn("grid w-full gap-4", colClass)}>
          {products.length === 0 ? (
            <div className="col-span-full py-24 text-center font-display text-3xl text-hb-white/10 md:text-5xl">
              NO PRODUCTS FOUND
            </div>
          ) : (
            products.map((product, index) => (
              <div key={product.id} className="min-w-0">
                <ProductCard
                  product={product}
                  priorityImage={index === 0}
                  eagerVisual={index === 0}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
