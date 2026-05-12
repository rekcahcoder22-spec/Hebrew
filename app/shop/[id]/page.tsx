import { cache } from "react";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

const getCachedProducts = cache(async () => getProducts());

export async function generateStaticParams() {
  const products = await getCachedProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const products = await getCachedProducts();
  const product = products.find((item) => item.id === id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
