import { create } from "zustand";
import type { Product } from "@/types";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  upsertProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  setProducts: (products) => set({ products }),
  upsertProduct: (product) => {
    const list = get().products;
    const i = list.findIndex((p) => p.id === product.id);
    if (i < 0) {
      set({ products: [...list, product] });
      return;
    }
    const next = [...list];
    next[i] = product;
    set({ products: next });
  },
  removeProduct: (id) =>
    set({ products: get().products.filter((p) => p.id !== id) }),
}));
