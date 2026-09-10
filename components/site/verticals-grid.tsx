import { Reveal } from "@/components/site/reveal";
import { SectionHeader } from "@/components/site/section-header";
import { VerticalTile } from "@/components/site/vertical-tile";
import { BUSINESS_VERTICALS } from "@/components/site/nav-config";

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
        <SectionHeader
          className="mb-14"
          kicker="Our businesses"
          heading="Eight sectors, one legacy."
          lead="The group builds, moves and maintains — from construction and engineering to shipping, energy and the services that keep institutions running. Each sector is run as its own enterprise, held to the same standard the group has kept since 1989."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {BUSINESS_VERTICALS.map((vertical, i) => (
            <Reveal key={vertical.slug} delayMs={i * 60}>
              <VerticalTile
                slug={vertical.slug}
                name={vertical.name}
                tagline={vertical.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
