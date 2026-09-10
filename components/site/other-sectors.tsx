import { SectionHeader } from "@/components/site/section-header";
import { VerticalTile } from "@/components/site/vertical-tile";
import { getAllVerticals } from "@/lib/content";

/**
 * The other seven sectors, as a horizontal scroller.
 *
 * Shares the marquee's overflow pattern — its own overflow-x container, so
 * the page itself never scrolls sideways — but deliberately not its
 * animation. This one only moves when the reader moves it, with snap
 * points to land on. No client boundary is needed for that: scroll-snap
 * and overflow are CSS.
 */
export function OtherSectors({ currentSlug }: { currentSlug: string }) {
  const others = getAllVerticals().filter(
    (vertical) => vertical.slug !== currentSlug
  );

  return (
    <section className="bg-ivory py-24 dark:bg-ink">
      <div className="container">
        <SectionHeader kicker="Elsewhere in the group" heading="Other sectors." />
      </div>

      <div className="no-scrollbar mt-12 w-full snap-x snap-mandatory overflow-x-auto">
        {/* Gutter matches the container's so the first card lines up with
            the heading above it, and the last one can scroll clear. */}
        <ul className="flex w-max gap-4 px-6 md:px-10 lg:px-16">
          {others.map((vertical) => (
            <li key={vertical.slug} className="w-[200px] shrink-0 snap-start">
              <VerticalTile
                size="compact"
                slug={vertical.slug}
                name={vertical.name}
                tagline={vertical.tagline}
              />
              <p className="mt-3 font-body text-xs text-ink/60 dark:text-ivory/60">
                {vertical.tagline}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
