"use client";

import type { ShopFilters } from "@/lib/shop-filters";
import { ALL_COLORS, ALL_SIZES } from "@/lib/shop-filters";
import { cn, formatPrice } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency";

interface ShopFiltersPanelProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  className?: string;
}

const categories = [
  { value: "all", label: "All" },
  { value: "outerwear", label: "Outerwear" },
  { value: "tops", label: "Tops" },
  { value: "bottoms", label: "Bottoms" },
  { value: "accessories", label: "Accessories" },
] as const;

const fits = [
  { value: "all", label: "All Fits" },
  { value: "oversized", label: "Oversized" },
  { value: "relaxed", label: "Relaxed" },
  { value: "regular", label: "Regular" },
  { value: "slim", label: "Slim" },
] as const;

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border pb-6 mb-6">
      <h3 className="text-xs uppercase tracking-[0.15em] text-foreground-subtle mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span
        className={cn(
          "h-3 w-3 border transition-colors",
          checked ? "bg-foreground border-foreground" : "border-border-strong group-hover:border-foreground/40"
        )}
      />
      <span className="text-sm text-foreground-muted group-hover:text-foreground transition-colors">
        {label}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
    </label>
  );
}

export function ShopFiltersPanel({
  filters,
  onChange,
  className,
}: ShopFiltersPanelProps) {
  const toggleArray = (arr: string[], value: string) =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  const currency = useCurrencyStore((s) => s.currency);

  return (
    <aside className={cn("space-y-0", className)}>
      <FilterGroup title="Category">
        <div className="space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() =>
                onChange({ ...filters, category: cat.value, page: 1 })
              }
              className={cn(
                "block text-sm transition-colors",
                filters.category === cat.value
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  sizes: toggleArray(filters.sizes, size),
                  page: 1,
                })
              }
              className={cn(
                "px-3 py-1.5 text-xs border transition-colors",
                filters.sizes.includes(size)
                  ? "border-foreground text-foreground"
                  : "border-border-strong text-foreground-muted hover:border-foreground/40"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="space-y-3">
          {ALL_COLORS.map((color) => (
            <CheckboxOption
              key={color}
              label={color}
              checked={filters.colors.includes(color)}
              onChange={() =>
                onChange({
                  ...filters,
                  colors: toggleArray(filters.colors, color),
                  page: 1,
                })
              }
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={15000}
            step={500}
            value={filters.priceMax}
            onChange={(e) =>
              onChange({
                ...filters,
                priceMax: Number(e.target.value),
                page: 1,
              })
            }
            className="w-full accent-foreground"
          />
          <p className="text-xs text-foreground-subtle">
            Up to {formatPrice(filters.priceMax, currency)}
          </p>
        </div>
      </FilterGroup>

      <FilterGroup title="Fit">
        <div className="space-y-3">
          {fits.map((fit) => (
            <button
              key={fit.value}
              type="button"
              onClick={() =>
                onChange({ ...filters, fit: fit.value, page: 1 })
              }
              className={cn(
                "block text-sm transition-colors",
                filters.fit === fit.value
                  ? "text-foreground"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {fit.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <CheckboxOption
          label="In stock only"
          checked={filters.inStockOnly}
          onChange={() =>
            onChange({
              ...filters,
              inStockOnly: !filters.inStockOnly,
              page: 1,
            })
          }
        />
      </FilterGroup>
    </aside>
  );
}
