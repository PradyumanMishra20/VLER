export type CurrencyCode = "INR" | "USD";

export const BASE_CURRENCY: CurrencyCode = "INR";
export const INR_TO_USD_RATE = 0.012;

const currencyConfig: Record<
  CurrencyCode,
  { locale: string; currency: CurrencyCode }
> = {
  INR: { locale: "en-IN", currency: "INR" },
  USD: { locale: "en-US", currency: "USD" },
};

export function convertInrPrice(
  amountInInr: number,
  currency: CurrencyCode
): number {
  if (currency === "INR") return amountInInr;
  return Math.floor(amountInInr * INR_TO_USD_RATE);
}

export function formatPrice(
  amountInInr: number,
  currency: CurrencyCode = BASE_CURRENCY
): string {
  const value = convertInrPrice(amountInInr, currency);
  const config = currencyConfig[currency];

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
