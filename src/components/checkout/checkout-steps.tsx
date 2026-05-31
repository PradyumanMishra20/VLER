"use client";

import { cn } from "@/lib/utils";

export const STEPS = ["Shipping", "Delivery", "Payment", "Review"] as const;

interface CheckoutStepsProps {
  current: number;
}

export function CheckoutSteps({ current }: CheckoutStepsProps) {
  return (
    <nav aria-label="Checkout progress" className="mb-20 md:mb-24">
      <ol className="flex flex-wrap items-center gap-y-4">
        {STEPS.map((label, i) => {
          const isActive = i === current;
          const isComplete = i < current;
          const isUpcoming = i > current;

          return (
            <li
              key={label}
              className="flex items-center"
            >
              <div className="flex items-center gap-4 md:gap-6">
                
                {/* STEP LABEL */}
                <span
                  className={cn(
                    "flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] transition-colors duration-500",
                    isActive && "text-foreground",
                    isComplete && "text-foreground-subtle",
                    isUpcoming && "text-foreground-subtle/40"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm tabular-nums transition-opacity",
                      isUpcoming && "opacity-50"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {label}
                </span>

                {/* CONNECTOR */}
                {i < STEPS.length - 1 && (
                  <span
                    className={cn(
                      "hidden sm:block h-px w-10 transition-colors duration-500",
                      i < current ? "bg-foreground-subtle" : "bg-border/50"
                    )}
                    aria-hidden
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}