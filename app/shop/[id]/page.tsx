import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const related = (await getProducts())
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
