"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { useAuthStore } from "@/store/auth";
import { formatPrice, cn } from "@/lib/utils";

import { PAYMENT_METHODS } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageTransition } from "@/components/motion/page-transition";
import { CheckoutSteps } from "@/components/checkout/checkout-steps";
import { OrderSummary } from "@/components/checkout/order-summary";

/* ---------------- TYPES ---------------- */

type Step = 0 | 1 | 2 | 3;

type CheckoutData = {
  shipping: Record<"firstName" | "lastName" | "address" | "city" | "state" | "zip", string>;
  deliveryMethod: "standard" | "express";
  paymentMethod: string;
};

/* ---------------- ANIMATION ---------------- */

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

const EXPRESS_SHIPPING = 249;

/* ---------------- COMPONENT ---------------- */

export default function CheckoutPage() {
  const router = useRouter();

  const {
    items,
    getSubtotal,
    getShipping,
    getDiscount,
    getTotal,
    clearCart,
  } = useCartStore();

  const currency = useCurrencyStore((s) => s.currency);
  const { isAuthenticated } = useAuthStore();

  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(false);

  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shipping: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    deliveryMethod: "standard",
    paymentMethod: "card",
  });

  /* ---------------- AUTH GUARD ---------------- */

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?redirect=/checkout");
    }
  }, [isAuthenticated, router]);

  const isEmptyCart = items.length === 0;

  /* ---------------- DERIVED STATE ---------------- */

  const shippingCost = useMemo(() => {
    return checkoutData.deliveryMethod === "express"
      ? EXPRESS_SHIPPING
      : getShipping();
  }, [checkoutData.deliveryMethod, getShipping]);

  const total = useMemo(() => {
    return getSubtotal() - getDiscount() + shippingCost;
  }, [getSubtotal, getDiscount, shippingCost]);

  /* ---------------- HANDLERS ---------------- */

  const updateShipping = (key: keyof CheckoutData["shipping"], value: string) => {
    setCheckoutData((p) => ({
      ...p,
      shipping: { ...p.shipping, [key]: value },
    }));
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1200));
      clearCart();
      router.push("/account?order=confirmed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- GUARDS ---------------- */

  if (!isAuthenticated) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center text-center">
          <div className="page-container max-w-md">
            <p className="editorial-subheading mb-4">Secure checkout</p>
            <h1 className="font-display text-display-md mb-6">
              Authentication required
            </h1>
            <Button asChild variant="outline">
              <Link href="/login?redirect=/checkout">Sign in</Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (isEmptyCart) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center text-center">
          <div className="page-container max-w-md">
            <p className="editorial-subheading mb-4">Checkout</p>
            <h1 className="font-display text-display-md mb-6">
              Your bag is empty
            </h1>
            <Button asChild variant="outline">
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <PageTransition>
      <div className="pt-36 md:pt-44 pb-section-lg">
        <div className="page-container max-w-6xl">

          {/* HEADER */}
          <header className="mb-24 max-w-2xl">
            <p className="editorial-subheading mb-5">Secure checkout</p>
            <h1 className="font-display text-display-lg leading-[0.95]">
              Complete your order
            </h1>
            <p className="mt-6 text-sm text-foreground-muted">
              Minimal checkout flow with structured steps.
            </p>
          </header>

          <CheckoutSteps current={step} />

          <div className="grid lg:grid-cols-[1fr_400px] gap-24 lg:gap-32">

            {/* LEFT */}
            <div>
              <AnimatePresence mode="wait">

                {/* STEP 1 */}
                {step === 0 && (
                  <motion.form
                    key="shipping"
                    {...fade}
                    className="space-y-14"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const valid = Object.values(checkoutData.shipping).every(Boolean);
                      if (valid) setStep(1);
                    }}
                  >
                    <div>
                      <h2 className="font-display text-display-sm mb-3">
                        Shipping details
                      </h2>
                      <p className="text-sm text-foreground-muted">
                        Where should this order arrive?
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-12">
                      {(["firstName", "lastName"] as const).map((f) => (
                        <div key={f} className="space-y-3">
                          <Label className="text-xs uppercase tracking-[0.18em]">
                            {f}
                          </Label>
                          <Input
                            required
                            className="h-14 text-base"
                            value={checkoutData.shipping[f]}
                            onChange={(e) => updateShipping(f, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs uppercase tracking-[0.18em]">
                        Address
                      </Label>
                      <Input
                        required
                        className="h-14 text-base"
                        value={checkoutData.shipping.address}
                        onChange={(e) => updateShipping("address", e.target.value)}
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-12">
                      {(["city", "state", "zip"] as const).map((f) => (
                        <div key={f} className="space-y-3">
                          <Label className="text-xs uppercase tracking-[0.18em]">
                            {f}
                          </Label>
                          <Input
                            required
                            className="h-14 text-base"
                            value={checkoutData.shipping[f]}
                            onChange={(e) => updateShipping(f, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>

                    <Button type="submit" size="lg" className="px-12">
                      Continue
                    </Button>
                  </motion.form>
                )}

                {/* STEP 2 */}
                {step === 1 && (
                  <motion.div {...fade} className="space-y-14">
                    <h2 className="font-display text-display-sm">
                      Delivery method
                    </h2>

                    <div className="space-y-2">
                      {[
                        {
                          id: "standard" as const,
                          label: "Standard",
                          detail: "5–7 days",
                          price: getShipping(),
                        },
                        {
                          id: "express" as const,
                          label: "Express",
                          detail: "2–3 days",
                          price: EXPRESS_SHIPPING,
                        },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            setCheckoutData((p) => ({
                              ...p,
                              deliveryMethod: m.id,
                            }))
                          }
                          className={cn(
                            "w-full flex justify-between py-6 border-b transition",
                            checkoutData.deliveryMethod === m.id
                              ? "border-foreground"
                              : "border-border/60"
                          )}
                        >
                          <div>
                            <p>{m.label}</p>
                            <p className="text-xs text-foreground-muted">
                              {m.detail}
                            </p>
                          </div>
                          <span>
                            {m.price === 0 ? "Free" : formatPrice(m.price, currency)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="ghost" onClick={() => setStep(0)}>
                        Back
                      </Button>
                      <Button onClick={() => setStep(2)}>Continue</Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 2 && (
                  <motion.div {...fade} className="space-y-14">
                    <h2 className="font-display text-display-sm">Payment</h2>

                    <div className="space-y-2">
                      {PAYMENT_METHODS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() =>
                            setCheckoutData((p) => ({
                              ...p,
                              paymentMethod: m.id,
                            }))
                          }
                          className="w-full py-6 border-b text-left"
                        >
                          <p>{m.label}</p>
                          <p className="text-xs text-foreground-muted">
                            {m.description}
                          </p>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="ghost" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)}>Review</Button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 */}
                {step === 3 && (
                  <motion.div {...fade} className="space-y-14">
                    <h2 className="font-display text-display-sm">
                      Review order
                    </h2>

                    <p className="text-sm text-foreground-muted">
                      Confirm before placing order.
                    </p>

                    <Button
                      size="lg"
                      disabled={loading}
                      onClick={handlePlaceOrder}
                    >
                      {loading
                        ? "Processing..."
                        : `Place order — ${formatPrice(total, currency)}`}
                    </Button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* RIGHT */}
            <OrderSummary
              items={items}
              currency={currency}
              subtotal={getSubtotal()}
              shipping={shippingCost}
              discount={getDiscount()}
              total={total}
            />

          </div>
        </div>
      </div>
    </PageTransition>
  );
}