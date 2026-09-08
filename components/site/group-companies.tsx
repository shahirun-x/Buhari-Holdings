"use client";

import * as React from "react";
import Image from "next/image";

import { MastheadRule } from "@/components/site/masthead-rule";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { BLUR_MIST } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";
import enterprisesData from "@/content/associated-enterprises.json";

type Enterprise = { name: string; placeholder?: boolean };

const { entries } = enterprisesData as { entries: Enterprise[] };

/** Fades the track out at both edges instead of clipping it hard. */
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)";

function EnterpriseCard({
  name,
  snap,
}: {
  name: string;
  snap: boolean;
}) {
  return (
    <li
      className={cn(
        "mx-3 flex h-40 w-60 shrink-0 flex-col items-center justify-center gap-3 border border-sand bg-white transition-[transform,border-color] duration-[250ms] ease-out hover:-translate-y-1 hover:border-brass dark:border-white/10 dark:bg-white/5",
        snap && "snap-start"
      )}
    >
      <Image
        src="/images/logo-placeholder.svg"
        alt=""
        width={120}
        height={50}
        placeholder="blur"
        blurDataURL={BLUR_MIST}
      />
      <span className="px-4 text-center font-body text-[13px] text-ink/70 dark:text-ivory/70">
        {name}
      </span>
    </li>
  );
}

/**
 * Associated enterprises.
 *
 * Deliberately NOT "group companies" or "subsidiaries", and deliberately
 * not links: the relationship between these entities and Buhari Holdings
 * is unconfirmed, so nothing here may imply ownership or hierarchy. See
 * the CLIENT-CONFIRM note in content/associated-enterprises.json before
 * changing the heading or making these clickable.
 *
 * The track holds the list twice and translates -50%, so the wrap lands on
 * an identical frame. The second copy is aria-hidden, so each name reaches
 * the accessibility tree once.
 */
export function GroupCompanies() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = React.useState(false);

  return (
    <section
      aria-label="Associated enterprises"
      className="bg-ivory py-20 dark:bg-ink"
    >
      <MastheadRule label="Associated enterprises" tone="surface" />

      <div
        className={cn(
          "no-scrollbar mt-12 w-full overflow-x-auto",
          // With no animation the band becomes an ordinary scroller, so
          // give it snap points to land on.
          reduced && "snap-x snap-mandatory"
        )}
        style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={cn("flex w-max", !reduced && "animate-marquee")}
          style={
            reduced
              ? undefined
              : { animationPlayState: paused ? "paused" : "running" }
          }
        >
          <ul className="flex shrink-0">
            {entries.map((entry) => (
              <EnterpriseCard
                key={entry.name}
                name={entry.name}
                snap={reduced}
              />
            ))}
          </ul>
          <ul className="flex shrink-0" aria-hidden="true">
            {entries.map((entry) => (
              <EnterpriseCard
                key={entry.name}
                name={entry.name}
                snap={reduced}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
