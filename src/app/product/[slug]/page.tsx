import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/data/products";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductRecommendations } from "@/components/product/product-recommendations";
import { PageTransition } from "@/components/motion/page-transition";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/* STATIC ROUTES */
export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

/* METADATA */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0] || "",
        },
      ],
    },
  };
}

/* PAGE */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return (
    <PageTransition>
      <div className="pt-20 md:pt-24 pb-16 md:pb-24">

        <div className="page-container">

          {/* PRODUCT */}
          <ProductDetail product={product} />

        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-20 md:mt-28">
          <ProductRecommendations
            currentProductId={product.id}
            currentCategory={product.category}
          />
        </div>

      </div>
    </PageTransition>
  );
}