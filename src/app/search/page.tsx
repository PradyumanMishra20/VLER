"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { PageTransition } from "@/components/motion/page-transition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return [];

    return products.filter((product) => {
      const searchPool = [
        product.name,
        product.description,
        product.category,
        ...(product.colors || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchPool.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-16 md:pb-20">

        <div className="page-container">

          {/* HEADER */}
          <FadeIn className="mb-12 md:mb-16">

            <p className="editorial-subheading mb-3">Search</p>

            <h1 className="font-display text-display-xl mb-8">
              Find your piece
            </h1>

            <div className="relative max-w-2xl">

              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-subtle" />

              <Input
                type="text"
                placeholder="Search products, colors, categories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-16 pl-14 text-base"
                autoFocus
              />

            </div>
          </FadeIn>

          {/* EMPTY STATE */}
          {!normalizedQuery && (
            <div className="text-center py-16">
              <p className="text-foreground-subtle">
                Start typing to explore the collection
              </p>
            </div>
          )}

          {/* RESULTS */}
          {normalizedQuery && (
            <FadeIn>
              <p className="text-sm text-foreground-subtle mb-8">
                {filtered.length} {filtered.length === 1 ? "result" : "results"} for{" "}
                <span className="text-foreground">&quot;{query}&quot;</span>
              </p>

              {filtered.length > 0 ? (
                <ProductGrid products={filtered} columns={4} />
              ) : (
                <div className="text-center py-16">

                  <p className="text-foreground-subtle mb-8">
                    No matching products found
                  </p>

                  <Button variant="outline" onClick={() => setQuery("")}>
                    Clear search
                  </Button>

                </div>
              )}
            </FadeIn>
          )}

        </div>
      </div>
    </PageTransition>
  );
}