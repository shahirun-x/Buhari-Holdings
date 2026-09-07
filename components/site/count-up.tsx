"use client";

import * as React from "react";
import { useInView } from "framer-motion";

import { useReducedMotion } from "@/lib/use-reduced-motion";

const DURATION_MS = 1600;

/**
 * Counts from `from` to `value` once, when the number scrolls into view.
 *
 * `once: true` means scrolling back up never restarts it. The tick runs in a
 * requestAnimationFrame loop rather than an interval so it tracks real
 * elapsed time and lands exactly on the target.
 *
 * `from` exists because not every figure should start at zero — a year
 * counting up from 0 reads as a bug, so 1989 starts near the century.
 */
export function CountUp({
  value,
  from = 0,
  suffix = "",
}: {
  value: number;
  from?: number;
  suffix?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = React.useState(from);

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

  return (
    <span ref={ref} className="tabular-nums">
      {reduced ? value : display}
      {suffix}
    </span>
  );
}
