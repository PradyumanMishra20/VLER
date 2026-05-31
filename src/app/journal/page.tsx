import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { journalArticles } from "@/data/journal";
import { FadeIn } from "@/components/motion/fade-in";
import { PageTransition } from "@/components/motion/page-transition";

export const metadata: Metadata = {
  title: "Journal",
  description: "Editorials on materials, layering, and minimal wardrobe building.",
};

export default function JournalPage() {
  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">

        {/* HEADER */}
        <div className="page-container mb-16 md:mb-24">
          <FadeIn>
            <p className="editorial-subheading mb-3">
              Journal
            </p>

            <h1 className="editorial-heading">
              Stories & Process
            </h1>

            <p className="mt-4 text-sm text-foreground-muted max-w-xl leading-relaxed">
              A look into material choices, construction, and the thinking behind each release.
            </p>
          </FadeIn>
        </div>

        {/* GRID */}
        <div className="page-container grid gap-14 md:gap-20 md:grid-cols-2">

          {journalArticles.map((article, i) => (
            <FadeIn key={article.id} delay={i * 0.06}>

              <Link
                href={`/journal/${article.slug}`}
                className="group block"
              >

                {/* IMAGE */}
                <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-background-surface">

                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                  />

                  {/* subtle overlay for depth */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                </div>

                {/* META */}
                <p className="editorial-subheading mb-3 text-foreground-subtle">
                  {article.category} · {article.readTime}
                </p>

                {/* TITLE */}
                <h2 className="font-display text-2xl md:text-3xl leading-snug mb-3 group-hover:text-foreground-muted transition-colors">
                  {article.title}
                </h2>

                {/* EXCERPT */}
                <p className="text-sm text-foreground-muted leading-relaxed max-w-lg">
                  {article.excerpt}
                </p>

                {/* DATE */}
                <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

              </Link>

            </FadeIn>
          ))}

        </div>

      </div>
    </PageTransition>
  );
}