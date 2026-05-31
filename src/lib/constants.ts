export const BRAND = {
  name: "VELR",
  tagline: "Clothing designed around form, movement, and long-term wearability rather than trend cycles.",
  email: "vler.support@gmail.com",
  responseTime: "Within 24–48 hours",
} as const;

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://pinterest.com", label: "Pinterest" },
] as const;

export const SHIPPING_THRESHOLD = 9999;
export const FREE_SHIPPING = 0;
export const STANDARD_SHIPPING = 149;
