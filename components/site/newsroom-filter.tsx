"use client";

import * as React from "react";

import { ArticleCard } from "@/components/site/article-card";
import { NEWS_CATEGORIES, type Article } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const FILTERS = ["All", ...NEWS_CATEGORIES] as const;
type Filter = (typeof FILTERS)[number];

/**
 * Filters the grid in place — no route change, so the reader keeps their
 * scroll position and the page stays static.
 *
 * The articles are passed in from the server component rather than fetched
 * here; this boundary exists only for the selected-filter state.
 */
export function NewsroomFilter({ articles }: { articles: Article[] }) {
  const [active, setActive] = React.useState<Filter>("All");

  const visible =
    active === "All"
      ? articles
      : articles.filter((article) => article.category === active);

  return (
    <>
      <div className="flex flex-wrap gap-x-8 gap-y-3" role="group" aria-label="Filter by category">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              "relative rounded-sm py-1 font-body text-sm tracking-wide outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "after:absolute after:bottom-0 after:left-0 after:h-px after:bg-brass after:transition-[width] after:duration-200 after:ease-out",
              active === filter
                ? "text-foreground after:w-full"
                : "text-ink/60 after:w-0 hover:text-foreground hover:after:w-full dark:text-ivory/60"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-14 font-body text-base text-ink/70 dark:text-ivory/70">
          Nothing filed under {active} yet.
        </p>
      ) : (
        <div
          // Keyed on the filter so the grid remounts and screen readers
          // announce a fresh list rather than a mutated one.
          key={active}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {visible.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              category={article.category}
              date={article.date}
              excerpt={article.excerpt}
              image={article.image}
              alt={article.alt}
            />
          ))}
        </div>
      )}
    </>
  );
}
