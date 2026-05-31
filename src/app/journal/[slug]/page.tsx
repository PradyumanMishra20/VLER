import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug, journalArticles } from "@/data/journal";
import { PageTransition } from "@/components/motion/page-transition";

interface JournalArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

export default async function JournalArticlePage({
  params,
}: JournalArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <PageTransition>
      <article className="pt-24 md:pt-28 pb-section">
        <div className="page-container max-w-3xl">
          <p className="editorial-subheading mb-6">
            {article.category} — {article.readTime}
          </p>
          <h1 className="font-display text-display-md mb-8">{article.title}</h1>
          <p className="text-sm text-foreground-subtle mb-12">
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="relative aspect-[21/9] mb-16">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="page-container max-w-2xl prose prose-invert">
          <p className="text-base leading-relaxed text-foreground-muted mb-6">
            {article.excerpt}
          </p>
          <p className="text-sm leading-relaxed text-foreground-muted mb-6">
            At VELR, we approach garment development as a study in proportion and
            material longevity. Each piece in our collection is evaluated for how it
            integrates into an existing wardrobe — not as a standalone trend item,
            but as a considered addition to a system of layers.
          </p>
          <p className="text-sm leading-relaxed text-foreground-muted mb-6">
            Understanding the technical properties of fabrics — weight, weave,
            breathability, and recovery — allows for more intentional purchasing
            decisions. A 480gsm fleece serves a different function than a 240gsm
            jersey, and both have their place in a transitional wardrobe.
          </p>
          <p className="text-sm leading-relaxed text-foreground-muted">
            We believe in fewer, better pieces. Construction quality, honest
            materials, and silhouettes that remain relevant beyond a single season
            define our design philosophy.
          </p>
        </div>
      </article>
    </PageTransition>
  );
}
