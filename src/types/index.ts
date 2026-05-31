export type ProductCategory =
  | "outerwear"
  | "tops"
  | "bottoms"
  | "accessories";

export type ProductFit = "relaxed" | "oversized" | "regular" | "slim";

export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  fit: ProductFit;
  colors: string[];
  sizes: string[];
  images: string[];
  hoverImage?: string;
  variants: ProductVariant[];
  featured?: boolean;
  bestseller?: boolean;
  isNew?: boolean;
  collection?: string;
  materials: string[];
  care: string[];
  shipping: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault?: boolean;
}
