import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/site/reveal";
import { BLUR_INK } from "@/lib/image-placeholders";
import communityData from "@/content/community-band.json";

/**
 * Copy lives in content/community-band.json, which carries the
 * CLIENT-CONFIRM note on how these institutions relate to the group.
 * Read it before editing the wording here.
 */
const { kicker, heading, body, cta, image } = communityData as {
  kicker: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  image: string;
};

export function CommunityBand() {
  return (
    <section className="bg-sand dark:bg-midnight">
      {/* Image first in the DOM, so it stacks above the copy on mobile
          without any order juggling. */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-full">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={BLUR_INK}
            className="object-cover"
          />
        </div>

        <div className="flex items-center px-8 py-20 lg:px-16 lg:py-28">
          <Reveal>
            <p className="font-body text-[11px] uppercase tracking-[0.25em] text-brass">
              {kicker}
            </p>
            <h2 className="mt-5 font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-normal leading-tight tracking-[-0.02em] text-foreground">
              {heading}
            </h2>
            <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink/75 dark:text-ivory/75">
              {body}
            </p>

            <Link
              href={cta.href}
              className="group mt-8 inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="border-b border-brass pb-1">{cta.label}</span>
              <ArrowRight
                className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
