import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductsByCollection, COLLECTIONS } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((c) => c.id === slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(slug);

  return (
    <div className="pt-24 md:pt-28 pb-16 md:pb-20">
      <div className="page-container">
        {/* HEADER */}
        <FadeIn className="mb-14 md:mb-18">
          <p className="editorial-subheading mb-3">Collection</p>

          <h1 className="font-display text-display-xl text-balance leading-[0.96] mb-4">
            {collection.name}
          </h1>

          {collection.description && (
            <p className="editorial-prose max-w-2xl text-foreground-muted">
              {collection.description}
            </p>
          )}
        </FadeIn>

        {/* PRODUCTS */}
        {products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <FadeIn className="text-center py-20">
            <p className="text-foreground-subtle mb-6">
              Nothing released here yet.
            </p>

            <Button variant="outline" asChild>
              <Link href="/shop">Explore all products</Link>
            </Button>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({
    slug: collection.id,
  }));
}