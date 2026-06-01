import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "@/lib/currency";

const DEFAULT_CURRENCY: CurrencyCode = "INR";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  toggleCurrency: () => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: DEFAULT_CURRENCY,

      setCurrency: (currency: CurrencyCode) => {
        set({ currency });
      },

      toggleCurrency: () => {
        const currentCurrency = get().currency;

        set({
          currency:
            currentCurrency === "INR"
              ? "USD"
              : "INR",
        });
      },
    }),
    {
      name: "velr-currency",
    }
  )
);