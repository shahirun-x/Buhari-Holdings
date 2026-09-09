"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { LENIS_SCROLL_EVENT } from "@/lib/scroll-events";

const SCROLL_THRESHOLD = 40;

/**
 * Fixed header shell whose background/border/blur react to scroll
 * position. The scroll listener is rAF-throttled, so state updates at
 * most once per frame. Both the initial check (in case the page loads
 * already scrolled) and every subsequent update happen inside a
 * requestAnimationFrame callback — never synchronously in the effect
 * body — so this stays a plain "subscribe to an external system" effect.
 *
 * Listens for Lenis's per-frame scroll signal as well as the native event.
 * Under smooth scroll the native events are sparse and lag the animated
 * position, so on their own they can leave this latched to a stale state.
 * Both feed the same rAF throttle, and the Lenis event simply never fires
 * when smooth scroll is off.
 */
export function HeaderScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    function measure() {
      setScrolled(window.scrollY >= SCROLL_THRESHOLD);
      frameRef.current = null;
    }
    function onScroll() {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(measure);
    }

    const initialFrame = requestAnimationFrame(measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(LENIS_SCROLL_EVENT, onScroll);

    return () => {
      cancelAnimationFrame(initialFrame);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(LENIS_SCROLL_EVENT, onScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-[background-color,border-color,backdrop-filter] duration-300 lg:h-22",
        scrolled
          ? "border-b border-sand/40 bg-ivory/85 backdrop-blur-md dark:border-ink/40 dark:bg-ink/85"
          : "border-b border-transparent bg-transparent"
      )}
    >
      {children}
    </header>
  );
}
