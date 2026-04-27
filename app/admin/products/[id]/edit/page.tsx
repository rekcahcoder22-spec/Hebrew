import { notFound, redirect } from "next/navigation";
import { isAdminSessionFromCookiesStore } from "@/lib/adminAuth";
import { getProductById } from "@/lib/products";
import { EditProductClient } from "./EditProductClient";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const allowed = await isAdminSessionFromCookiesStore();
  if (!allowed) redirect("/admin/login");

  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();
  return <EditProductClient product={product} />;
}
