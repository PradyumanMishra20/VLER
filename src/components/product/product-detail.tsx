"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductGallery } from "./product-gallery";
import { cn } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const currency = useCurrencyStore((s) => s.currency);

  const availableVariants = useMemo(
    () =>
      product.variants.filter(
        (v) => v.color === selectedColor && v.stock > 0
      ),
    [product.variants, selectedColor]
  );

  const availableSizes = useMemo(
    () => [...new Set(availableVariants.map((v) => v.size))],
    [availableVariants]
  );

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const lowStock =
    selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 5;

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      size: selectedVariant.size,
      color: selectedVariant.color,
      price: product.price,
      image: product.images?.[0],
      slug: product.slug,
    });
  };

  return (
    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 lg:gap-24 xl:gap-32">
      <ProductGallery images={product.images} name={product.name} />

      <div className="lg:sticky lg:top-32 lg:self-start space-y-12">
        <header>
          <p className="editorial-subheading mb-6">{product.category}</p>
          <h1 className="font-display text-display-lg text-balance leading-[0.96]">
            {product.name}
          </h1>
          <p className="mt-5 text-editorial-md text-foreground-muted">
            {product.description}
          </p>
          <div className="mt-10 flex items-baseline gap-5">
            <span className="font-display text-4xl tabular-nums">
              {formatPrice(product.price, currency)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-foreground-subtle line-through tabular-nums">
                {formatPrice(product.compareAtPrice, currency)}
              </span>
            )}
          </div>
        </header>

        <p className="editorial-prose text-editorial-lg">{product.longDescription}</p>

        <div className="space-y-12 pt-4 border-t border-border">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-subtle mb-6">
              Color — {selectedColor}
            </p>
            <div className="flex gap-4">
              {product.colors.map((color) => {
                const variant = product.variants.find((v) => v.color === color);
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedSize("");
                    }}
                    className={cn(
                      "h-10 w-10 rounded-full border transition-all duration-500",
                      selectedColor === color
                        ? "border-foreground ring-1 ring-foreground ring-offset-2 ring-offset-background"
                        : "border-border-strong hover:border-foreground/50"
                    )}
                    style={{ backgroundColor: variant?.colorHex }}
                    title={color}
                    aria-label={color}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-foreground-subtle mb-6">
              Size
            </p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => {
                const available = availableSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!available}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-[3.5rem] px-5 py-3.5 text-sm border transition-all duration-500",
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : available
                          ? "border-border-strong hover:border-foreground/60"
                          : "border-border/40 text-foreground-subtle/30 line-through cursor-not-allowed"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {lowStock && (
          <p className="text-xs tracking-wide text-foreground-subtle">
            Only {selectedVariant?.stock} remaining in this size
          </p>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={handleAddToCart}
          disabled={!inStock || !selectedSize}
        >
          {!selectedSize
            ? "Select size"
            : inStock
              ? "Add to bag"
              : "Unavailable"}
        </Button>

        <ul className="grid grid-cols-3 gap-8 pt-10 border-t border-border text-center">
          {[
            { label: "Complimentary shipping", sub: "On qualifying orders" },
            { label: "30-day returns", sub: "Easy exchanges" },
            { label: "Secure checkout", sub: "Portfolio demo" },
          ].map((item) => (
            <li key={item.label}>
              <p className="text-[10px] uppercase tracking-[0.16em] text-foreground-subtle leading-relaxed">
                {item.label}
              </p>
            </li>
          ))}
        </ul>

        <Accordion type="single" collapsible className="border-t border-border pt-2">
          <AccordionItem value="materials">
            <AccordionTrigger>Materials</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-foreground-muted">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="care">
            <AccordionTrigger>Care</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-foreground-muted">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping">
            <AccordionTrigger>Shipping</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {product.shipping}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
