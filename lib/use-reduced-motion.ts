"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Whether the user has asked for reduced motion.
 *
 * Deliberately not framer-motion's `useReducedMotion`: that reads the media
 * query during the first client render, so a user with the preference set
 * hydrates different markup than the server produced, and React throws a
 * hydration mismatch. `useSyncExternalStore` renders the server snapshot
 * (false) through hydration and re-renders with the real value immediately
 * after, which is exactly the guarantee we need here.
 *
 * Callers must gate *behaviour* on this, not just visual animation:
 * autoplay, count-ups, and scroll reveals all read it.
 */
export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * The same preference, read synchronously, for the rare caller that cannot
 * wait for the hook to settle.
 *
 * `useReducedMotion` deliberately reports `false` through hydration so the
 * server and client render the same markup. That costs a render, which is
 * fine for anything that reacts to the preference but not for a layout
 * effect that has to decide something before the first paint. Client only —
 * it touches `window`.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia(QUERY).matches;
}
