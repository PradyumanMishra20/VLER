"use client";

import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export function FeaturedDrop() {
  const products = getFeaturedProducts()?.slice(0, 4) ?? [];

  const hasProducts = products.length > 0;

  return (
    <section className="py-16 md:py-20">
      <div className="page-container">

        <FadeIn
          className="flex items-end justify-between mb-12 md:mb-16"
          delay={0.1}
        >
          <div>
            <p className="editorial-subheading mb-4">
              New Arrivals
            </p>

            <h2 className="editorial-heading">
              Latest Drop
            </h2>
          </div>

          <Button
            variant="ghost"
            asChild
            className="hidden sm:inline-flex"
          >
            <Link href="/collection/fw25">
              View Collection
            </Link>
          </Button>
        </FadeIn>

        {hasProducts ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-foreground-subtle">
              No new arrivals available right now.
            </p>
          </div>
        )}

        <div className="mt-12 sm:hidden text-center">
          <Button variant="outline" asChild>
            <Link href="/collection/fw25">
              View Collection
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}