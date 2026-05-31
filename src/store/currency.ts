import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "@/lib/currency";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  toggleCurrency: () => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "INR",
      setCurrency: (currency) => set({ currency }),
      toggleCurrency: () =>
        set({ currency: get().currency === "INR" ? "USD" : "INR" }),
    }),
    { name: "velr-currency" }
  )
);
