import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { EditProductClient } from "./EditProductClient";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return <EditProductClient product={product} />;
}
