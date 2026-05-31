import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { FREE_SHIPPING, SHIPPING_THRESHOLD, STANDARD_SHIPPING } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getShipping: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const PROMO_CODES: Record<string, number> = {
  VELR10: 0.1,
  ARCHIVE15: 0.15,
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscount: 0,

      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        set((state) => {
          const existing = state.items.find((i) => i.variantId === item.variantId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity } as CartItem],
          };
        });
      },

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      updateQuantity: (variantId, quantity) => {
        if (quantity < 1) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        }));
      },

      applyPromo: (code) => {
        const discount = PROMO_CODES[code.toUpperCase()];
        if (!discount) return false;
        set({ promoCode: code.toUpperCase(), promoDiscount: discount });
        return true;
      },

      clearPromo: () => set({ promoCode: null, promoDiscount: 0 }),

      clearCart: () => set({ items: [], promoCode: null, promoDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getShipping: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= SHIPPING_THRESHOLD ? FREE_SHIPPING : STANDARD_SHIPPING;
      },

      getDiscount: () => {
        const { promoDiscount } = get();
        return Math.round(get().getSubtotal() * promoDiscount);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const discount = get().getDiscount();
        return subtotal + shipping - discount;
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "velr-cart" }
  )
);
