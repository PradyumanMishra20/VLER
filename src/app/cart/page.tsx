"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/motion/page-transition";
import { Minus, Plus } from "lucide-react";

export default function CartPage() {
  /* ---------------------------
   * Zustand granular selectors
   * -------------------------- */
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);

  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const clearPromo = useCartStore((s) => s.clearPromo);

  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getShipping = useCartStore((s) => s.getShipping);
  const getDiscount = useCartStore((s) => s.getDiscount);
  const getTotal = useCartStore((s) => s.getTotal);

  const currency = useCurrencyStore((s) => s.currency);

  /* ---------------------------
   * Local UI state
   * -------------------------- */
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  /* ---------------------------
   * Derived values (safe + stable)
   * -------------------------- */
  const subtotal = useMemo(() => getSubtotal(), [items, getSubtotal]);
  const shipping = useMemo(() => getShipping(), [items, getShipping]);
  const discount = useMemo(() => getDiscount(), [items, promoCode, getDiscount]);
  const total = useMemo(() => getTotal(), [items, promoCode, getTotal]);

  /* ---------------------------
   * Promo handler
   * -------------------------- */
  const handlePromo = async () => {
    setPromoLoading(true);

    const success = applyPromo(promoInput);

    setPromoError(!success);
    if (success) setPromoInput("");

    setPromoLoading(false);
  };

  const decreaseQty = (id: string, qty: number) => {
    if (qty > 1) updateQuantity(id, qty - 1);
  };

  /* ---------------------------
   * EMPTY STATE
   * -------------------------- */
  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-[70vh] flex items-center justify-center pt-24">
          <div className="page-container max-w-md text-center">
            <p className="editorial-subheading mb-3">Your bag</p>

            <h1 className="font-display text-display-md mb-4">
              Empty composition
            </h1>

            <p className="text-sm text-foreground-muted leading-relaxed mb-10">
              No pieces selected yet. Build your rotation with intentional,
              long-wear garments.
            </p>

            <Button asChild variant="outline">
              <Link href="/shop">Explore collection</Link>
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  /* ---------------------------
   * MAIN UI
   * -------------------------- */
  return (
    <PageTransition>
      <div className="pt-32 md:pt-36 pb-section-lg">
        <div className="page-container">

          {/* HEADER */}
          <header className="mb-20 md:mb-28">
            <p className="editorial-subheading mb-4">Your bag</p>
            <h1 className="font-display text-display-lg">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </h1>
          </header>

          <div className="grid lg:grid-cols-[1fr_400px] gap-20 lg:gap-28">

            {/* ITEMS */}
            <ul className="divide-y divide-border/60">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-8 py-12 first:pt-0"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-44 w-36 md:h-52 md:w-40 overflow-hidden bg-background-surface shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 144px, 160px"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between min-w-0 py-1">

                    {/* TOP */}
                    <div className="flex justify-between gap-6">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="text-sm md:text-base hover:text-foreground-muted transition-colors"
                        >
                          {item.name}
                        </Link>

                        <p className="text-xs text-foreground-subtle mt-3 tracking-wide">
                          {item.color} · {item.size}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-[10px] uppercase tracking-[0.2em] text-foreground-subtle hover:text-foreground transition"
                      >
                        Remove
                      </button>
                    </div>

                    {/* BOTTOM */}
                    <div className="flex justify-between items-end mt-10">

                      {/* quantity */}
                      <div className="flex items-center gap-6">
                        <button
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            decreaseQty(item.variantId, item.quantity)
                          }
                          className="text-foreground-subtle hover:text-foreground disabled:opacity-30"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="text-sm tabular-nums w-5 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="text-foreground-subtle hover:text-foreground"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* price */}
                      <span className="text-sm md:text-base tabular-nums">
                        {formatPrice(item.price * item.quantity, currency)}
                      </span>
                    </div>

                  </div>
                </li>
              ))}
            </ul>

            {/* SUMMARY */}
            <aside className="lg:sticky lg:top-32 h-fit">
              <div className="border border-border/50 bg-background-elevated/20 p-10 md:p-12">

                <p className="editorial-subheading mb-10">Summary</p>

                {/* promo */}
                <div className="flex gap-3 mb-8">
                  <Input
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError(false);
                    }}
                  />

                  <Button
                    variant="outline"
                    onClick={handlePromo}
                    disabled={promoLoading}
                  >
                    {promoLoading ? "..." : "Apply"}
                  </Button>
                </div>

                {promoCode && (
                  <div className="flex justify-between text-xs text-foreground-subtle mb-6">
                    <span>{promoCode}</span>
                    <button
                      onClick={clearPromo}
                      className="uppercase tracking-[0.14em] hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs text-accent mb-6">Invalid code</p>
                )}

                {/* totals */}
                <div className="space-y-4 text-sm border-t border-border pt-8">

                  <div className="flex justify-between text-foreground-subtle">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                  </div>

                  <div className="flex justify-between text-foreground-subtle">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0
                        ? "Complimentary"
                        : formatPrice(shipping, currency)}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-foreground-subtle">
                      <span>Adjustment</span>
                      <span>-{formatPrice(discount, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-6 border-t border-border items-baseline">
                    <span className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
                      Total
                    </span>

                    <span className="font-display text-3xl">
                      {formatPrice(total, currency)}
                    </span>
                  </div>
                </div>

                {/* checkout */}
                <Button className="w-full mt-10" size="lg" asChild>
                  <Link href="/checkout">Proceed to checkout</Link>
                </Button>

              </div>
            </aside>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}