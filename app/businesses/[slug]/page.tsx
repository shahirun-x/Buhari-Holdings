import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/site/cta-band";
import { OtherSectors } from "@/components/site/other-sectors";
import { SectionHeader } from "@/components/site/section-header";
import { getVertical, getVerticalSlugs } from "@/lib/content";
import { BLUR_INK } from "@/lib/image-placeholders";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getVerticalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vertical = getVertical(slug);

  if (!vertical) return {};

  return {
    title: vertical.name,
    description: vertical.tagline,
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const vertical = getVertical(slug);

  if (!vertical) notFound();

  return (
    <>
      {/* 1. Hero */}
      <section className="relative -mt-16 aspect-[4/5] w-full overflow-hidden lg:-mt-22 lg:aspect-[21/9]">
        <Image
          src={vertical.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_INK}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container pb-12 lg:pb-16">
            <p className="font-body text-[11px] uppercase tracking-[0.25em] text-brass">
              Businesses
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-ivory">
              {vertical.name}
            </h1>
            <p className="mt-3 font-body text-base text-ivory/75">
              {vertical.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Pull quote + overview */}
      <section className="bg-ivory py-24 lg:py-32 dark:bg-ink">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="border-t border-brass pt-8">
              <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] font-normal leading-snug tracking-[-0.01em] text-foreground">
                {vertical.pullQuote}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-prose space-y-6">
              {vertical.overview.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-body text-base leading-relaxed text-ink/75 dark:text-ivory/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Capabilities — type on sand, no cards, no borders. */}
      <section className="bg-sand py-24 dark:bg-midnight">
        <div className="container">
          <SectionHeader kicker="What we do" heading="Capabilities." />

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {vertical.capabilities.map((capability, i) => (
              <div key={capability.title}>
                <p className="font-display text-3xl leading-none text-brass tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-5 font-display text-xl leading-tight text-foreground">
                  {capability.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink/70 dark:text-ivory/70">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Approach — the newspaper motif, first use of the drop cap. */}
      <section className="bg-ivory py-24 dark:bg-ink">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              {vertical.approach.heading}
            </h2>

            <div className="mt-8 space-y-6">
              {vertical.approach.body.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={
                    i === 0
                      ? "font-body text-base leading-relaxed text-ink/75 first-letter:mt-1 first-letter:mr-3 first-letter:float-left first-letter:font-display first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-brass dark:text-ivory/75"
                      : "font-body text-base leading-relaxed text-ink/75 dark:text-ivory/75"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Other sectors */}
      <OtherSectors currentSlug={vertical.slug} />

      {/* 6. Closing CTA */}
      <CtaBand />
    </>
  );
}
