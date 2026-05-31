"use client";

import { useState, useMemo } from "react";
import { products } from "@/data/products";
import {
  defaultFilters,
  filterProducts,
  paginateProducts,
  type ShopFilters,
  type SortOption,
} from "@/lib/shop-filters";
import { ShopFiltersPanel } from "@/components/shop/shop-filters";
import { ProductGrid } from "@/components/product/product-grid";
import { PageTransition } from "@/components/motion/page-transition";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ShopPage() {
  const [filters, setFilters] = useState<ShopFilters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return filterProducts(products, filters);
  }, [filters]);

  const { items, totalPages, total } = useMemo(() => {
    return paginateProducts(filtered, filters.page, filters.perPage);
  }, [filtered, filters.page, filters.perPage]);

  const updateFilters = (patch: Partial<ShopFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...patch,
      page: patch.page ?? 1, // always reset pagination on filter change
    }));
  };

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24 pb-16 md:pb-20">

        {/* HEADER */}
        <div className="page-container mb-8">
          <p className="editorial-subheading mb-2">Shop</p>

          <h1 className="editorial-heading">All Products</h1>

          <p className="mt-4 text-sm text-foreground-subtle">
            {total} pieces
          </p>
        </div>

        <div className="page-container">

          {/* MOBILE CONTROLS */}
          <div className="flex items-center justify-between mb-8 lg:hidden">

            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <Select
              value={filters.sort}
              onValueChange={(v) =>
                updateFilters({ sort: v as SortOption })
              }
            >
              <SelectTrigger className="w-44 border-0">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-[240px_1fr] gap-12 lg:gap-16">

            {/* FILTERS */}
            <div className={mobileFiltersOpen ? "block lg:block" : "hidden lg:block"}>
              <ShopFiltersPanel
                filters={filters}
                onChange={updateFilters}
              />
            </div>

            {/* PRODUCTS */}
            <div>

              {/* DESKTOP HEADER */}
              <div className="hidden lg:flex items-center justify-between mb-10">

                <p className="text-xs text-foreground-subtle">
                  Showing {items.length} of {total}
                </p>

                <Select
                  value={filters.sort}
                  onValueChange={(v) =>
                    updateFilters({ sort: v as SortOption })
                  }
                >
                  <SelectTrigger className="w-52">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>

                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

              </div>

              <ProductGrid products={items} columns={3} />

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => updateFilters({ page })}
                        className={
                          filters.page === page
                            ? "h-10 w-10 bg-foreground text-background text-sm"
                            : "h-10 w-10 border border-border-strong text-sm text-foreground-muted hover:text-foreground"
                        }
                      >
                        {page}
                      </button>
                    );
                  })}

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}