import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { BUSINESS_VERTICALS } from "@/components/site/nav-config";
import { BLUR_INK } from "@/lib/image-placeholders";

/**
 * The verticals, read straight from BUSINESS_VERTICALS so this grid, the
 * mega-menu, the footer column and the "8 business verticals" stat can
 * never drift apart. Names and taglines come from there too — the
 * mega-menu descriptors do double duty as the tile taglines.
 */
export function VerticalsGrid() {
  return (
    <section className="bg-ivory py-24 lg:py-32 dark:bg-ink">
      <div className="container">
        <div className="mb-14 max-w-2xl">
          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-brass">
            Our businesses
          </p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
            Eight sectors, one legacy.
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ink/70 dark:text-ivory/70">
            The group builds, moves and maintains — from construction and
            engineering to shipping, energy and the services that keep
            institutions running. Each sector is run as its own enterprise,
            held to the same standard the last four decades were built on.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {BUSINESS_VERTICALS.map((vertical, i) => (
            <Reveal key={vertical.slug} delayMs={i * 60}>
              <Link
                href={`/businesses/${vertical.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Image
                  src={`/images/vertical-${vertical.slug}.svg`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  placeholder="blur"
                  blurDataURL={BLUR_INK}
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/30 to-transparent" />

                <ArrowUpRight
                  className="absolute top-6 right-6 size-[18px] translate-y-1 text-brass opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-[1.75rem] leading-tight text-ivory">
                    {vertical.name}
                  </p>
                  <p className="mt-2 font-body text-sm text-ivory/75">
                    {vertical.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
