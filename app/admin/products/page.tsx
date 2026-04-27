import { redirect } from "next/navigation";
import { isAdminSessionFromCookiesStore } from "@/lib/adminAuth";
import { ProductsPageClient } from "./ProductsPageClient";

export default async function AdminProductsPage() {
  const allowed = await isAdminSessionFromCookiesStore();
  if (!allowed) redirect("/admin/login");
  return <ProductsPageClient />;
}
