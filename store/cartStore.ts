import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, Size } from "@/types";

export interface CartTotals {
  totalItems: number;
  totalPrice: number;
  itemCount: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: Size, qty?: number) => void;
  removeItem: (productId: string, size: Size) => void;
  updateQty: (productId: string, size: Size, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotals: () => CartTotals;
}

function totalsFromItems(items: CartItem[]): CartTotals {
  const totalItems = items.reduce((n, i) => n + i.quantity, 0);
  const totalPrice = items.reduce(
    (n, i) => n + i.product.price * i.quantity,
    0,
  );
  const itemCount = items.length;
  return { totalItems, totalPrice, itemCount };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      getTotals: () => totalsFromItems(get().items),
      addItem: (product, size, qty = 1) => {
        const items = get().items;
        const idx = items.findIndex(
          (i) => i.productId === product.id && i.size === size,
        );
        if (idx >= 0) {
          const next = [...items];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + qty,
          };
          set({ items: next });
          return;
        }
        set({
          items: [
            ...items,
            { productId: product.id, size, quantity: qty, product },
          ],
        });
      },
      removeItem: (productId, size) =>
        set({
          items: get().items.filter(
            (i) => !(i.productId === productId && i.size === size),
          ),
        }),
      updateQty: (productId, size, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity: qty }
              : i,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "hebrew-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
