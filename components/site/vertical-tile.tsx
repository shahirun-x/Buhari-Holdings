import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BLUR_INK } from "@/lib/image-placeholders";
import { cn } from "@/lib/utils";

export type VerticalTileSize = "default" | "large" | "compact";

/**
 * One vertical, as an image tile linking to its page. The homepage grid,
 * the businesses overview grid and the other-sectors scroller are three
 * sizes of this one component rather than three near-copies.
 *
 * The gradient is deliberately light: at from-ink/75 via-ink/20 the top
 * of the frame stays clear, so the photograph is legible as a photograph
 * and only the lower band is darkened enough to carry type.
 */
export function VerticalTile({
  slug,
  name,
  tagline,
  size = "default",
  className,
}: {
  slug: string;
  name: string;
  tagline: string;
  size?: VerticalTileSize;
  className?: string;
}) {
  const compact = size === "compact";

  return (
    <Link
      href={`/businesses/${slug}`}
      className={cn(
        "group relative block overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        compact ? "aspect-[200/260]" : "aspect-[4/5]",
        className
      )}
    >
      <Image
        src={`/images/vertical-${slug}.svg`}
        alt=""
        fill
        sizes={
          size === "large"
            ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            : compact
              ? "200px"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        }
        placeholder="blur"
        blurDataURL={BLUR_INK}
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent" />

      <ArrowUpRight
        className={cn(
          "absolute text-brass opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100",
          compact
            ? "top-4 right-4 size-4 translate-y-1"
            : "top-6 right-6 size-[18px] translate-y-1"
        )}
        aria-hidden
      />

      <div
        className={cn("absolute inset-x-0 bottom-0", compact ? "p-4" : "p-6")}
      >
        <p
          className={cn(
            "font-display leading-tight text-ivory",
            compact
              ? "text-lg"
              : size === "large"
                ? "text-[2rem]"
                : "text-[1.75rem]"
          )}
        >
          {name}
        </p>
        {!compact ? (
          <p className="mt-2 font-body text-sm text-ivory/75">{tagline}</p>
        ) : null}
      </div>
    </Link>
  );
}
