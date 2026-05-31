"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import type { CurrencyCode } from "@/lib/currency";

interface OrderSummaryProps {
  items: CartItem[];
  currency: CurrencyCode;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
}

export function OrderSummary({
  items,
  currency,
  subtotal,
  shipping,
  discount,
  total,
}: OrderSummaryProps) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <aside className="lg:sticky lg:top-32">
      <div className="border border-border/50 bg-background-elevated/20 p-10 md:p-12 backdrop-blur-sm">
        
        <p className="editorial-subheading mb-10">
          Order
        </p>

        {/* ITEMS */}
        <ul className="space-y-8 max-h-[min(45vh,360px)] overflow-y-auto pr-2">
          {safeItems.length === 0 ? (
            <p className="text-sm text-foreground-subtle">
              No items in order
            </p>
          ) : (
            safeItems.map((item) => {
              const imageSrc =
                item.image || "/placeholder.jpg";

              const lineTotal = item.price * item.quantity;

              return (
                <li
                  key={item.variantId}
                  className="flex gap-5"
                >
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative h-24 w-20 shrink-0 overflow-hidden bg-background-surface"
                  >
                    <Image
                      src={imageSrc}
                      alt={item.name || "Product"}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {item.name}
                    </p>

                    <p className="text-xs text-foreground-subtle mt-1.5">
                      {item.color || "Default"} ·{" "}
                      {item.size || "One size"} · Qty{" "}
                      {item.quantity}
                    </p>

                    <p className="text-sm mt-2.5 tabular-nums">
                      {formatPrice(lineTotal, currency)}
                    </p>
                  </div>
                </li>
              );
            })
          )}
        </ul>

        {/* TOTALS */}
        <div className="mt-12 space-y-5 border-t border-border pt-10 text-sm">
          
          <div className="flex justify-between text-foreground-subtle">
            <span>Subtotal</span>
            <span className="tabular-nums text-foreground">
              {formatPrice(subtotal || 0, currency)}
            </span>
          </div>

          <div className="flex justify-between text-foreground-subtle">
            <span>Shipping</span>
            <span className="tabular-nums text-foreground">
              {shipping === 0
                ? "Complimentary"
                : formatPrice(shipping || 0, currency)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-foreground-subtle">
              <span>Adjustment</span>
              <span className="tabular-nums">
                −{formatPrice(discount, currency)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-6 border-t border-border">
            <span className="text-xs uppercase tracking-[0.22em] text-foreground-subtle">
              Total
            </span>

            <span className="font-display text-3xl tabular-nums">
              {formatPrice(total || 0, currency)}
            </span>
          </div>
        </div>

      </div>
    </aside>
  );
}