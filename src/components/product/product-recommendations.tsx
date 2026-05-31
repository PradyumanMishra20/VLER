"use client";

import { products } from "@/data/products";
import { ProductGrid } from "./product-grid";
import { FadeIn } from "@/components/motion/fade-in";

interface ProductRecommendationsProps {
  currentProductId: string;
  currentCategory: string;
}

export function ProductRecommendations({
  currentProductId,
  currentCategory,
}: ProductRecommendationsProps) {
  // Get products from the same category, excluding current product
  const recommendations = products
    .filter((p) => p.category === currentCategory && p.id !== currentProductId)
    .slice(0, 4);

  if (recommendations.length === 0) {
    // Fallback to featured products if no category matches
    const featured = products.filter((p) => p.featured && p.id !== currentProductId).slice(0, 4);
    if (featured.length === 0) return null;
    
    return (
      <FadeIn delay={0.2}>
        <section className="pt-section-lg border-t border-border">
          <div className="page-container">
            <p className="editorial-subheading mb-5">You might also like</p>
            <h2 className="editorial-heading mb-16">Featured Pieces</h2>
            <ProductGrid products={featured} columns={4} />
          </div>
        </section>
      </FadeIn>
    );
  }

  return (
    <FadeIn delay={0.2}>
      <section className="pt-section-lg border-t border-border">
        <div className="page-container">
          <p className="editorial-subheading mb-5">You might also like</p>
          <h2 className="editorial-heading mb-16">Similar Pieces</h2>
          <ProductGrid products={recommendations} columns={4} />
        </div>
      </section>
    </FadeIn>
  );
}
