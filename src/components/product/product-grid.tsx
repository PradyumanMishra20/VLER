import type { Product } from "@/types";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { memo } from "react";

// Dynamically import ProductCard to reduce initial bundle size
const ProductCard = dynamic(() => import("./product-card").then(mod => ({ default: mod.ProductCard })), {
  loading: () => (
    <div className="aspect-[3/4] bg-background-surface animate-pulse" />
  ),
  ssr: true,
});

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

const columnClasses = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
};

export const ProductGrid = memo(function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-foreground-subtle">No products match your filters.</p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-x-6 gap-y-12", columnClasses[columns], className)}>
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={i < 4}
        />
      ))}
    </div>
  );
});
