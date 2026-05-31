import type { JournalArticle } from "@/types";
import { IMAGES } from "@/lib/images";

export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    slug: "understanding-fabric-weight",
    title: "Understanding Fabric Weight",
    excerpt:
      "How GSM and ounce measurements affect drape, warmth, and longevity in everyday garments.",
    category: "Materials",
    date: "2025-04-12",
    readTime: "6 min",
    image: IMAGES.journal.bySlug["understanding-fabric-weight"],
  },
  {
    id: "2",
    slug: "layering-transitional-weather",
    title: "Layering for Transitional Weather",
    excerpt:
      "A systematic approach to building outfits that adapt from morning chill to afternoon warmth.",
    category: "Style",
    date: "2025-03-28",
    readTime: "8 min",
    image: IMAGES.journal.bySlug["layering-transitional-weather"],
  },
  {
    id: "3",
    slug: "minimal-wardrobe-essentials",
    title: "Minimal Wardrobe Essentials",
    excerpt:
      "The twelve pieces that form the foundation of a considered, long-wearing wardrobe.",
    category: "Editorial",
    date: "2025-03-15",
    readTime: "10 min",
    image: IMAGES.journal.bySlug["minimal-wardrobe-essentials"],
  },
  {
    id: "4",
    slug: "behind-the-collection",
    title: "Behind the Collection",
    excerpt:
      "Process notes from our design studio on proportion, material selection, and construction.",
    category: "Studio",
    date: "2025-02-20",
    readTime: "7 min",
    image: IMAGES.journal.bySlug["behind-the-collection"],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}
