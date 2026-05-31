import Image from "next/image";
import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { PageTransition } from "@/components/motion/page-transition";
import { BRAND } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description: BRAND.tagline,
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">

        {/* HERO TEXT */}
        <div className="page-container mb-24">
          <FadeIn>
            <p className="editorial-subheading mb-6">About VELR</p>

            <h1 className="font-display text-display-lg max-w-4xl text-balance leading-[1.05] mb-8">
              Designed with restraint. Built for permanence.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-foreground-muted">
              VELR exists in the space between utility and refinement — where
              garments are stripped of excess and reduced to their essential form.
            </p>
          </FadeIn>
        </div>

        {/* HERO IMAGE */}
        <div className="relative h-[55vh] md:h-[75vh] mb-28 overflow-hidden">
          <Image
            src={IMAGES.about.studioEditorial}
            alt="VELR studio"
            fill
            sizes="100vw"
            className="object-cover scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* CONTENT GRID */}
        <div className="page-container grid md:grid-cols-2 gap-16 md:gap-28">

          <FadeIn>
            <h2 className="font-display text-3xl mb-6">Design philosophy</h2>

            <p className="text-sm leading-relaxed text-foreground-muted mb-6">
              {BRAND.tagline}
            </p>

            <p className="text-sm leading-relaxed text-foreground-muted mb-6">
              Each silhouette is engineered through reduction — removing what is
              unnecessary until only proportion, texture, and function remain.
            </p>

            <p className="text-sm leading-relaxed text-foreground-muted">
              The goal is not trend relevance, but longevity in both form and wear.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl mb-6">Production standard</h2>

            <p className="text-sm leading-relaxed text-foreground-muted mb-6">
              We collaborate with specialized manufacturers working with heavyweight
              cotton, technical blends, and structured knits.
            </p>

            <p className="text-sm leading-relaxed text-foreground-muted mb-6">
              Every garment is tested for fit stability, fabric behavior, and long-term
              durability before release.
            </p>

            <p className="text-sm leading-relaxed text-foreground-muted">
              Production is intentionally limited to preserve consistency and reduce waste.
            </p>
          </FadeIn>
        </div>

        {/* NEW SECTION — BRAND SIGNAL (IMPORTANT ADDITION) */}
        <div className="page-container mt-28 border-t border-white/10 pt-20">
          <FadeIn>
            <h2 className="font-display text-3xl mb-8">Archive mindset</h2>

            <p className="max-w-2xl text-sm leading-relaxed text-foreground-muted mb-10">
              Once a piece leaves production, it does not return. Each drop becomes part
              of a growing archive — a record of form, material, and intention.
            </p>

            <div className="grid md:grid-cols-3 gap-10 text-xs uppercase tracking-[0.2em] text-white/50">
              <div>Limited runs</div>
              <div>No seasonal cycles</div>
              <div>Permanent archive system</div>
            </div>
          </FadeIn>
        </div>

      </div>
    </PageTransition>
  );
}