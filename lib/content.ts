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

import coastalEnergen from "@/content/news/coastal-energen-work-order.json";
import hidcoKolkata from "@/content/news/hidco-kolkata-flyover.json";
import onKeepingRecords from "@/content/news/on-keeping-records.json";
import steadyPassage from "@/content/news/steady-passage.json";
import theLongView from "@/content/news/the-long-view-in-construction.json";
import whatOutlasts from "@/content/news/what-outlasts-the-ledger.json";

import careerRoles from "@/content/careers/roles.json";
import galleryData from "@/content/gallery.json";

import type {
  Article,
  GalleryItem,
  Role,
  VerticalContent,
} from "@/lib/content-types";

// Re-exported so server components have one import for content and its
// shapes; client components import the types from lib/content-types.
export type {
  Article,
  Capability,
  GalleryItem,
  NewsCategory,
  Role,
  VerticalContent,
} from "@/lib/content-types";
export { NEWS_CATEGORIES } from "@/lib/content-types";

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

const ARTICLES: Article[] = [
  theLongView,
  steadyPassage,
  whatOutlasts,
  hidcoKolkata,
  coastalEnergen,
  onKeepingRecords,
];

/**
 * Newest first, with undated editorial pieces ahead of everything —
 * they are not news and shouldn't sink below an old dated item.
 */
export function getArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return -1;
    if (!b.date) return 1;
    return b.date.localeCompare(a.date);
  });
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getArticleSlugs(): string[] {
  return ARTICLES.map((article) => article.slug);
}

/** Up to `count` other articles, for the "more from" rail. */
export function getRelatedArticles(slug: string, count = 3): Article[] {
  return getArticles()
    .filter((article) => article.slug !== slug)
    .slice(0, count);
}

/** Deliberately may be empty — the page renders an honest empty state. */
export function getRoles(): Role[] {
  return (careerRoles as { roles: Role[] }).roles;
}

export function getGalleryItems(): GalleryItem[] {
  return (galleryData as { items: GalleryItem[] }).items;
}
