"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, memo } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export const ProductCard = memo(function ProductCard({ product, priority, className }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const currency = useCurrencyStore((s) => s.currency);

  const defaultVariant = product.variants.find((v) => v.stock > 0);
  const primarySrc = product.images?.[0];
  const hoverSrc =
    product.images?.[1] ?? product.hoverImage ?? product.images?.[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!defaultVariant) return;
      addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      name: product.name,
      size: defaultVariant.size,
      color: defaultVariant.color,
      price: product.price,
      image: primarySrc ?? hoverSrc ?? "",
      slug: product.slug,
    });
  };

  return (
    <motion.article
      className={cn("group relative", className)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-background-surface">
          <motion.div
            className="relative aspect-[3/4]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0">
              {primarySrc && (
                <Image
                  src={primarySrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={cn(
                    "object-cover transition-opacity duration-700 ease-premium",
                    hovered ? "opacity-0" : "opacity-100"
                  )}
                  priority={priority}
                  aria-hidden={hovered}
                />
              )}
              {hoverSrc && (
                <Image
                  src={hoverSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={cn(
                    "object-cover transition-opacity duration-700 ease-premium",
                    hovered ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden={!hovered}
                />
              )}
            </div>
            {product.isNew && (
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] text-foreground">
                New
              </span>
            )}
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-background/95 backdrop-blur-sm p-4 transition-transform duration-500 ease-premium group-hover:translate-y-0 sm:translate-y-0">
            <Button
              variant="outline"
              size="sm"
              className="w-full min-h-[44px]"
              onClick={handleQuickAdd}
              disabled={!defaultVariant}
            >
              Quick Add — {defaultVariant?.size ?? "N/A"}
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-sm sm:text-base text-foreground">{product.name}</h3>
          <p className="text-xs sm:text-sm text-foreground-subtle line-clamp-1">
            {product.description}
          </p>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm sm:text-base">{formatPrice(product.price, currency)}</span>
            {product.compareAtPrice && (
              <span className="text-xs sm:text-sm text-foreground-subtle line-through">
                {formatPrice(product.compareAtPrice, currency)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
});
