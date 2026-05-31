 /* ---------------------------------------
   PORTFOLIO PAYMENT CONFIG
   Frontend-only mock payment system
---------------------------------------- */

/* ---------------------------------------
   PAYMENT METHODS
---------------------------------------- */

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    provider: "Secure Checkout",
    enabled: true,
    description: "Visa, Mastercard, American Express",
  },
  {
    id: "upi",
    label: "UPI",
    provider: "Instant Pay",
    enabled: true,
    description: "Google Pay, PhonePe, Paytm",
  },
  {
    id: "google_pay",
    label: "Google Pay",
    provider: "Wallet",
    enabled: true,
    description: "Fast one-tap checkout",
  },
  {
    id: "apple_pay",
    label: "Apple Pay",
    provider: "Wallet",
    enabled: true,
    description: "Secure Apple device payment",
  },
] as const;

/* ---------------------------------------
   TYPES
---------------------------------------- */

export type PaymentMethod =
  (typeof PAYMENT_METHODS)[number];

export type PaymentMethodId =
  PaymentMethod["id"];

/* ---------------------------------------
   HELPERS
---------------------------------------- */

export function getPaymentMethod(id: PaymentMethodId) {
  return PAYMENT_METHODS.find((method) => method.id === id);
}

export function getEnabledPaymentMethods() {
  return PAYMENT_METHODS.filter((method) => method.enabled);
}