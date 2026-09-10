import "server-only";

import { BUSINESS_VERTICALS } from "@/components/site/nav-config";

import agency from "@/content/verticals/agency.json";
import construction from "@/content/verticals/construction.json";
import energy from "@/content/verticals/energy.json";
import engineering from "@/content/verticals/engineering.json";
import manufacturing from "@/content/verticals/manufacturing.json";
import properties from "@/content/verticals/properties.json";
import services from "@/content/verticals/services.json";
import shippingTrading from "@/content/verticals/shipping-trading.json";

export type Capability = {
  title: string;
  description: string;
};

export type VerticalContent = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  pullQuote: string;
  overview: string[];
  approach: {
    heading: string;
    body: string[];
  };
  capabilities: Capability[];
  /**
   * CLIENT-CONFIRM note. Present in every file and deliberately part of the
   * type, so it cannot be dropped when a file is rewritten.
   */
  _note: string;
};

/**
 * Statically imported rather than read from disk at request time: these are
 * build-time constants, and importing them lets the bundler tree-shake and
 * the type checker verify the shape of every file.
 */
const VERTICAL_CONTENT: Record<string, VerticalContent> = {
  agency,
  construction,
  energy,
  engineering,
  manufacturing,
  properties,
  services,
  "shipping-trading": shippingTrading,
};

/** Every vertical slug, in the canonical nav-config order. */
export function getVerticalSlugs(): string[] {
  return BUSINESS_VERTICALS.map((vertical) => vertical.slug);
}

/** Content for one vertical, or undefined for an unknown slug. */
export function getVertical(slug: string): VerticalContent | undefined {
  return VERTICAL_CONTENT[slug];
}

/** Every vertical's content, in the canonical nav-config order. */
export function getAllVerticals(): VerticalContent[] {
  return getVerticalSlugs()
    .map((slug) => VERTICAL_CONTENT[slug])
    .filter((entry): entry is VerticalContent => Boolean(entry));
}
