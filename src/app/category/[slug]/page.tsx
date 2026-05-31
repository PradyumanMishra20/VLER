import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCategory, CATEGORIES } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  const isEmpty = products.length === 0;

  return (
    <div className="pt-24 md:pt-28 pb-20 md:pb-24">
      <div className="page-container">

        {/* HEADER */}
        <FadeIn className="mb-16 md:mb-20">
          <p className="editorial-subheading mb-4">
            Category / {category.name}
          </p>

          <h1 className="font-display text-display-xl leading-[0.96] text-balance mb-6">
            {category.name}
          </h1>

          <p className="max-w-xl text-sm text-foreground-muted leading-relaxed">
            Curated selection from the{" "}
            <span className="text-foreground">{category.name.toLowerCase()}</span>{" "}
            archive. Designed for long-term rotation and everyday structure.
          </p>
        </FadeIn>

        {/* CONTENT */}
        {!isEmpty ? (
          <div className="mt-10">
            <ProductGrid products={products} columns={4} />
          </div>
        ) : (
          <FadeIn>
            <div className="text-center py-24 border border-border/40 bg-background-elevated/10">
              <p className="editorial-subheading mb-4">
                No pieces available
              </p>

              <h2 className="font-display text-2xl mb-4">
                This category is currently quiet
              </h2>

              <p className="text-sm text-foreground-muted max-w-md mx-auto mb-10 leading-relaxed">
                New drops from this line are released in limited runs.
                Check back when the next archive update arrives.
              </p>

              <Button variant="outline" asChild>
                <Link href="/shop">Explore all products</Link>
              </Button>
            </div>
          </FadeIn>
        )}

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.id,
  }));
}