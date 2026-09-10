import Image from "next/image";
import Link from "next/link";

import { BLUR_SAND } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";

/** Formats an ISO date for display. Undated pieces render no date at all. */
export function formatArticleDate(date: string | null): string | null {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * One article, as a card. Used by the homepage Chronicle preview and the
 * newsroom grid — one treatment rather than two that drift.
 */
export function ArticleCard({
  slug,
  title,
  category,
  date,
  excerpt,
  image,
  alt,
  className,
}: {
  slug: string;
  title: string;
  category: string;
  date?: string | null;
  excerpt: string;
  image: string;
  alt: string;
  className?: string;
}) {
  const formatted = formatArticleDate(date ?? null);

  return (
    <Link
      href={`/newsroom/${slug}`}
      className={cn(
        "group block rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={BLUR_SAND}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="pt-6">
        <p className="font-body text-[10px] uppercase tracking-[0.25em] text-brass">
          {formatted ? `${category} · ${formatted}` : category}
        </p>

        <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
          {/* Brass underline wipes in left-to-right on card hover. */}
          <span className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-[width] after:duration-[400ms] after:ease-out group-hover:after:w-full">
            {title}
          </span>
        </h3>

        <p className="mt-3 line-clamp-2 font-body text-sm text-ink/70 dark:text-ivory/70">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
