export type Market = {
  name: string;
  /** Percentage coordinates over the world map's viewBox. */
  x: number;
  y: number;
};

/**
 * The six stated markets — the single source of truth for both the
 * decorative map and the text list beside it.
 *
 * Deliberately a plain module rather than living in the client map
 * component: a value exported from a `"use client"` file reaches a server
 * component as a client-reference proxy, not the array itself.
 *
 * Positions are eyeballed against the hand-drawn outline in
 * components/site/world-map.tsx. It is a diagram, not a projection — the
 * dots are indicative rather than surveyed.
 */
export const MARKETS: Market[] = [
  { name: "India", x: 69.5, y: 55 },
  { name: "UAE", x: 62.5, y: 51 },
  { name: "Far East", x: 80, y: 52 },
  { name: "Europe", x: 50, y: 33 },
  { name: "America", x: 22, y: 42 },
  { name: "Australia", x: 85, y: 76 },
];
