import type { Collection } from "@/types";
import { IMAGES } from "@/lib/images";

export const collections: Collection[] = [
  {
    id: "essentials",
    slug: "essentials",
    name: "Essentials",
    description:
      "Minimal everyday foundations designed for layering, comfort, and long-term wear.",
    image: IMAGES.collections.bySlug.essentials,
    productCount: 10,
  },

  {
    id: "outerwear",
    slug: "outerwear",
    name: "Outerwear",
    description:
      "Structured coats, technical jackets, and cinematic silhouettes built for colder seasons.",
    image: IMAGES.collections.bySlug.outerwear,
    productCount: 8,
  },

  {
    id: "knitwear",
    slug: "knitwear",
    name: "Knitwear",
    description:
      "Heavyweight knits and textured layers crafted in muted tones and premium fabrics.",
    image: IMAGES.collections.bySlug.knitwear,
    productCount: 6,
  },

  {
    id: "bottoms",
    slug: "bottoms",
    name: "Bottoms",
    description:
      "Relaxed trousers, wide-leg denim, and utility silhouettes balancing comfort and structure.",
    image: IMAGES.collections.bySlug.bottoms,
    productCount: 7,
  },
];