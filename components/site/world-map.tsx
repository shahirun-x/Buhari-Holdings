"use client";

import * as React from "react";

import { MARKETS } from "@/lib/markets";
import { cn } from "@/lib/utils";

/**
 * A heavily simplified continental outline, drawn by hand. Stroke only, in
 * currentColor at low opacity — deliberately low-detail, because at this
 * size accuracy would read as clutter and it carries no data.
 *
 * The SVG is aria-hidden and hidden below md; the text list beside it is
 * what actually conveys the six markets, at every width.
 */
export function WorldMap({ className }: { className?: string }) {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 100 60"
        className="w-full text-ink/25 dark:text-ivory/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.28"
        strokeLinejoin="round"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        {/* North America */}
        <path d="M10 16 L24 13 L31 17 L28 23 L24 24 L22 30 L18 33 L15 28 L12 27 L9 22 Z" />
        {/* Central strip */}
        <path d="M22 30 L26 33 L28 36" />
        {/* South America */}
        <path d="M28 36 L32 38 L33 45 L30 53 L27 51 L25 44 L26 38 Z" />
        {/* Europe */}
        <path d="M46 17 L54 16 L57 20 L54 24 L49 25 L46 22 Z" />
        {/* Africa */}
        <path d="M46 26 L56 26 L59 32 L56 42 L51 46 L47 40 L45 32 Z" />
        {/* Western and central Asia */}
        <path d="M57 18 L70 15 L78 18 L76 24 L68 27 L60 26 L57 22 Z" />
        {/* South Asia */}
        <path d="M66 27 L72 27 L70 35 L67 32 Z" />
        {/* East Asia */}
        <path d="M76 22 L86 21 L88 27 L82 31 L76 29 Z" />
        {/* South-east Asia */}
        <path d="M78 32 L84 33 L83 37 L79 36 Z" />
        {/* Australia */}
        <path d="M80 42 L89 41 L91 47 L86 50 L81 47 Z" />
      </svg>

      {/* Market markers. Each is a 44px touch target around a 10px dot. */}
      {MARKETS.map((market) => (
        <button
          key={market.name}
          type="button"
          className="group absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-sand dark:focus-visible:ring-offset-midnight"
          style={{ left: `${market.x}%`, top: `${market.y}%` }}
          onMouseEnter={() => setActive(market.name)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(market.name)}
          onBlur={() => setActive(null)}
          aria-label={market.name}
        >
          <span className="size-[10px] rounded-full bg-brass transition-transform duration-200 ease-out group-hover:scale-125 group-focus-visible:scale-125" />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-sm bg-ink px-2 py-1 font-body text-[11px] tracking-wide text-ivory transition-opacity duration-150",
              active === market.name ? "opacity-100" : "opacity-0"
            )}
          >
            {market.name}
          </span>
        </button>
      ))}
    </div>
  );
}
