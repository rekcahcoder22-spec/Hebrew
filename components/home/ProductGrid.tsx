import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";

export function ProductGrid({
  products,
  title = "COLLECTION",
  hideHeader = false,
}: {
  products: Product[];
  title?: string;
  hideHeader?: boolean;
}) {
  return (
    <section className="border-b border-hb-border bg-hb-black px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {!hideHeader && (
          <>
            <p className="font-body text-xs uppercase tracking-widest text-hb-gold">
              Hebrew studio
            </p>
            <h2 className="mt-2 font-display text-7xl leading-none tracking-tight text-hb-white md:text-9xl">
              {title}
            </h2>
          </>
        )}
        <div
          className={
            hideHeader
              ? "grid grid-cols-1 gap-px bg-hb-border sm:grid-cols-2 lg:grid-cols-3"
              : "mt-12 grid grid-cols-1 gap-px bg-hb-border sm:grid-cols-2 lg:grid-cols-3"
          }
        >
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
