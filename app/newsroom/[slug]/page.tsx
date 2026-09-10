import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticleCard, formatArticleDate } from "@/components/site/article-card";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHeader } from "@/components/site/section-header";
import { getArticle, getArticleSlugs, getRelatedArticles } from "@/lib/content";
import { BLUR_SAND } from "@/lib/image-placeholders";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      ...(article.date ? { publishedTime: article.date } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const formatted = formatArticleDate(article.date);
  const related = getRelatedArticles(article.slug);

  return (
    <>
      <section className="relative -mt-16 aspect-[4/5] w-full overflow-hidden lg:-mt-22 lg:aspect-[21/9]">
        <Image
          src={article.image}
          alt={article.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_SAND}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent" />
      </section>

      <article className="bg-ivory py-20 lg:py-24 dark:bg-ink">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p className="font-body text-[11px] uppercase tracking-[0.25em] text-brass">
              {formatted ? `${article.category} · ${formatted}` : article.category}
            </p>

            <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              {article.title}
            </h1>

            <div className="mt-10 space-y-6">
              {article.body.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={
                    i === 0
                      ? "font-body text-lg leading-relaxed text-ink/80 first-letter:mt-1 first-letter:mr-3 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brass dark:text-ivory/80"
                      : "font-body text-lg leading-relaxed text-ink/80 dark:text-ivory/80"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <section className="bg-sand py-24 dark:bg-midnight">
        <div className="container">
          <SectionHeader kicker="Keep reading" heading="More from the Chronicle." />

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
            {related.map((entry) => (
              <ArticleCard
                key={entry.slug}
                slug={entry.slug}
                title={entry.title}
                category={entry.category}
                date={entry.date}
                excerpt={entry.excerpt}
                image={entry.image}
                alt={entry.alt}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
