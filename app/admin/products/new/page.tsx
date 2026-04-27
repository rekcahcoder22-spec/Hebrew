import { redirect } from "next/navigation";
import { isAdminSessionFromCookiesStore } from "@/lib/adminAuth";
import { ProductNewClient } from "./ProductNewClient";

export default async function NewProductPage() {
  const allowed = await isAdminSessionFromCookiesStore();
  if (!allowed) redirect("/admin/login");
  return <ProductNewClient />;
}
