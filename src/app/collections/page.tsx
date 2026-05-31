import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { collections } from "@/data/collections";
import { FadeIn } from "@/components/motion/fade-in";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore VELR seasonal collections and essentials.",
};

export default function CollectionsPage() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">
        <div className="page-container mb-14 md:mb-20">
          <p className="editorial-subheading mb-3">Collections</p>
          <h1 className="editorial-heading">Seasonal Edits</h1>
        </div>

        <div className="space-y-3 md:space-y-4">
          {collections.map((collection, i) => (
            <FadeIn key={collection.id} delay={i * 0.08}>
              <Link
                href={`/shop?collection=${collection.slug}`}
                className="group relative block h-[55vh] md:h-[72vh] overflow-hidden"
              >
                {/* image */}
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* dark overlay for readability */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />

                {/* content */}
                <div className="absolute inset-0 flex items-start">
                  <div className="p-8 md:p-16 pt-20 md:pt-28 max-w-xl">
                    <p className="editorial-subheading mb-3 text-white/80">
                      {collection.productCount} pieces
                    </p>

                    <h2 className="text-2xl md:text-4xl font-display text-white mb-4">
                      {collection.name}
                    </h2>

                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                      {collection.description}
                    </p>

                    {/* subtle CTA hint */}
                    <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Explore collection →
                    </p>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}