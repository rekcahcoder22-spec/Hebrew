import { revalidatePath } from "next/cache";

/** Làm mới trang chi tiết đã SSG; tránh ảnh/mô tả cũ sau khi admin cập nhật. */
export function revalidateShopProductPage(productId: string) {
  revalidatePath(`/shop/${productId}`);
  revalidatePath("/");
  revalidatePath("/collections/adore");
}
