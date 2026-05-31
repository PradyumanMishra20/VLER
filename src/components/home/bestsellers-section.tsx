"use client";

import { getBestsellers } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { FadeIn } from "@/components/motion/fade-in";

export function BestsellersSection() {
  const products = getBestsellers()?.slice(0, 6) ?? [];

  const hasProducts = products.length > 0;

  return (
    <section className="py-16 md:py-20">
      <div className="page-container">

        <FadeIn className="mb-12 md:mb-16" delay={0.15}>
          <p className="editorial-subheading mb-4">
            Curated
          </p>
          <h2 className="editorial-heading">
            Most Worn
          </h2>
        </FadeIn>

        {hasProducts ? (
          <ProductGrid
            products={products}
            columns={3}
          />
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-foreground-subtle">
              No bestsellers available right now.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}