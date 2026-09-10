"use client";

import * as React from "react";
import { useInView } from "framer-motion";

import {
  prefersReducedMotion,
  useReducedMotion,
} from "@/lib/use-reduced-motion";

const DURATION_MS = 1600;

/**
 * Fixed locale, not the visitor's. Grouping separators differ by locale
 * (1,000 vs 1.000), so reading the ambient locale would render different
 * text on the server and the client and trip a hydration mismatch.
 */
const GROUPED_FORMAT = new Intl.NumberFormat("en-US");

/**
 * Layout effects run before the browser paints; plain effects run after.
 * The rewind below has to happen before the first paint, and useLayoutEffect
 * warns if it runs during SSR — so pick per environment.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * Counts up to `value` once, when the number scrolls into view.
 *
 * Renders the *final* value on the server. The markup a crawler or a social
 * scraper reads is the static HTML, and a stat band that ships "1900 / 0+ /
 * 0 / 0" tells them the company was founded in 1900 and has no people. The
 * count is decoration; the figure is the content, so the figure is what gets
 * server-rendered.
 *
 * The rewind to `from` therefore happens on the client, in a layout effect —
 * before the first paint, so motion users never see the final value flash on
 * screen and then jump backwards. Reduced-motion users are never rewound at
 * all and simply keep the server's value.
 *
 * `once: true` means scrolling back up never restarts it. The tick runs in a
 * requestAnimationFrame loop rather than an interval so it tracks real
 * elapsed time and lands exactly on the target.
 *
 * `from` exists because not every figure should start at zero — a year
 * counting up from 0 reads as a bug, so 1989 starts near the century.
 *
 * `grouped` is opt-in rather than automatic: a headcount wants thousands
 * separators (1,000+) but a year must never have them (1989, not 1,989).
 * The digits are tabular either way, so the separator appearing partway
 * through the count doesn't make the number jitter.
 */
export function CountUp({
  value,
  from = 0,
  suffix = "",
  grouped = false,
}: {
  value: number;
  from?: number;
  suffix?: string;
  grouped?: boolean;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Seeded with the answer, so the server-rendered HTML carries it.
  const [display, setDisplay] = React.useState(value);

  // Reads the media query directly rather than via the hook: the hook
  // reports false through hydration by design, which would rewind a
  // reduced-motion user for one frame.
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    setDisplay(from);
  }, [from]);

  React.useEffect(() => {
    if (reduced || !inView) return;

    let frame = 0;
    const start = performance.now();

    function tick(now: number) {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, from, value]);

  const shown = reduced ? value : display;

  return (
    <span ref={ref} className="tabular-nums">
      {grouped ? GROUPED_FORMAT.format(shown) : shown}
      {suffix}
    </span>
  );
}
