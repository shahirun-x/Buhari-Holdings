/**
 * Content shapes and constants, safe on either side of the boundary.
 *
 * Kept apart from lib/content.ts because that module is `server-only` — it
 * statically imports every JSON file and has no business in a client
 * bundle. Client components (the newsroom filter, the gallery lightbox)
 * still need the types and the category list, so those live here.
 */

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

export const NEWS_CATEGORIES = ["Chronicle", "Press", "Milestones"] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type Article = {
  slug: string;
  title: string;
  category: string;
  /** ISO date, or null for undated editorial pieces. */
  date: string | null;
  excerpt: string;
  image: string;
  alt: string;
  body: string[];
  _note: string;
};

export type Role = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  applyHref: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  width: number;
  height: number;
};
