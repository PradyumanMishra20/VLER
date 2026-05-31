import type { Product, ProductCategory, ProductFit } from "@/types";

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc";

export interface ShopFilters {
  category: ProductCategory | "all";
  sizes: string[];
  colors: string[];
  priceMin: number;
  priceMax: number;
  fit: ProductFit | "all";
  inStockOnly: boolean;
  sort: SortOption;
  page: number;
  perPage: number;
}

export const defaultFilters: ShopFilters = {
  category: "all",
  sizes: [],
  colors: [],
  priceMin: 0,
  priceMax: 15000,
  fit: "all",
  inStockOnly: false,
  sort: "featured",
  page: 1,
  perPage: 12,
};

export function filterProducts(
  products: Product[],
  filters: ShopFilters
): Product[] {
  let result = [...products];

  if (filters.category !== "all") {
    result = result.filter((p) => p.category === filters.category);
  }

  if (filters.fit !== "all") {
    result = result.filter((p) => p.fit === filters.fit);
  }

  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      filters.sizes.some((size) => p.sizes.includes(size))
    );
  }

  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      filters.colors.some((color) => p.colors.includes(color))
    );
  }

  result = result.filter(
    (p) => p.price >= filters.priceMin && p.price <= filters.priceMax
  );

  if (filters.inStockOnly) {
    result = result.filter((p) => p.variants.some((v) => v.stock > 0));
  }

  switch (filters.sort) {
    case "newest":
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "featured":
    default:
      result.sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
  }

  return result;
}

export function paginateProducts<T>(
  items: T[],
  page: number,
  perPage: number
): { items: T[]; totalPages: number; total: number } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    totalPages,
    total,
  };
}

export const ALL_SIZES = [
  "XS", "S", "M", "L", "XL", "XXL",
  "28", "30", "32", "34", "36",
  "One Size",
];

export const ALL_COLORS = [
  "Ash Grey", "Black", "Charcoal", "Stone", "Ecru",
  "Olive", "Indigo", "Graphite", "Camel", "Sand", "Natural",
];
