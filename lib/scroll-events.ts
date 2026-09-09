/**
 * Dispatched on `window` every frame that Lenis scrolls.
 *
 * Lenis animates `window.scrollY` across many frames, but the browser only
 * emits a handful of coalesced native `scroll` events for the whole
 * animation — and those events lag the real position. A listener that
 * samples `window.scrollY` on a native scroll event can therefore latch to
 * a stale value and never be corrected once Lenis settles.
 *
 * A dedicated event rather than a re-dispatched native `scroll`: Lenis
 * listens for native scroll itself, and at rest that handler emits, which
 * would re-enter this callback and recurse without end.
 */
export const LENIS_SCROLL_EVENT = "lenis-scroll";
