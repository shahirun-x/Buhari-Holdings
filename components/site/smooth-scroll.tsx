"use client";

import * as React from "react";
import Lenis from "lenis";
// Sets `html.lenis, html.lenis body { height: auto }` and the
// data-lenis-prevent escape hatches. Lenis only adds those classes once it
// initialises, so importing this is inert under reduced motion.
import "lenis/dist/lenis.css";

import { useReducedMotion } from "@/lib/use-reduced-motion";
import { LENIS_SCROLL_EVENT } from "@/lib/scroll-events";

/**
 * Smooth scroll, mounted once at the root. Renders nothing.
 *
 * Lenis still drives the real window scroll (it intercepts wheel input and
 * applies the result with window.scrollTo), so `window.scrollY`, native
 * `scroll` events and IntersectionObserver all keep working — the header's
 * scroll state, the reveals and the count-up need no changes.
 *
 * Touch is deliberately left native: `syncTouch` is off, which is the
 * default. Momentum scrolling on mobile is better than anything we'd
 * synthesise, and overriding it makes the page feel laggy.
 */
export function SmoothScroll() {
  const reduced = useReducedMotion();

  React.useEffect(() => {
    // Reduced motion gets native scrolling — Lenis is never constructed,
    // so it cannot intercept input or add its classes.
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      // We drive the loop ourselves so the frame can be cancelled on unmount.
      autoRaf: false,
    });

    // Native scroll events under Lenis are sparse and lag the animated
    // position, so anything sampling window.scrollY needs a per-frame
    // signal. See lib/scroll-events.ts.
    const stopRelay = lenis.on("scroll", () => {
      window.dispatchEvent(new Event(LENIS_SCROLL_EVENT));
    });

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      stopRelay();
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
