import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { VerticalTile } from "@/components/site/vertical-tile";
import { WorldMap } from "@/components/site/world-map";
import { getAllVerticals } from "@/lib/content";
import { MARKETS } from "@/lib/markets";

export const metadata: Metadata = {
  title: "Businesses",
  description:
    "Eight sectors held to one standard — construction, engineering, shipping, energy, properties, manufacturing, retail and services.",
};

export default function BusinessesPage() {
  const verticals = getAllVerticals();

  return (
    <>
      {/* Type-led hero rather than a photographic one: the sector tiles
          below carry the imagery, and a second photo above them competes. */}
      <section className="bg-ivory pt-32 pb-20 dark:bg-ink">
        <div className="container">
          <SectionHeader
            size="page"
            kicker="Our businesses"
            heading="Eight sectors. One legacy."
            lead="The group builds, moves and maintains — from construction and engineering to shipping, energy and the services that keep institutions running. Each sector is run as its own enterprise, with its own people and its own standards of work. What they share is a horizon: the group has generally preferred the decision that reads well in thirty years to the one that reads well this quarter."
          />
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32 dark:bg-ink">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {verticals.map((vertical, i) => (
              <Reveal key={vertical.slug} delayMs={i * 60}>
                <VerticalTile
                  size="large"
                  slug={vertical.slug}
                  name={vertical.name}
                  tagline={vertical.tagline}
                />
                {/* Repeated outside the image as well as over it: the
                    overlaid line sits on the photograph, this one is
                    guaranteed legible whatever the photograph does. */}
                <p className="mt-4 font-body text-sm text-ink/70 dark:text-ivory/70">
                  {vertical.tagline}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 dark:bg-midnight">
        <div className="container">
          <SectionHeader kicker="Global footprint" heading="Six markets." />

          {/* The map is decorative and hidden on small screens — a
              hand-drawn world at 375px is illegible and not worth the
              bytes. The list below is the accessible presentation and
              the only one on mobile. */}
          <div className="mt-14 hidden md:block">
            <WorldMap className="mx-auto max-w-3xl" />
          </div>

          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 md:mt-12">
            {MARKETS.map((market) => (
              <li
                key={market.name}
                className="font-body text-sm uppercase tracking-[0.18em] text-ink/70 dark:text-ivory/70"
              >
                {market.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
