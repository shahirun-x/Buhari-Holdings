import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BUSINESS_VERTICALS } from "@/components/site/nav-config";

/**
 * The "Businesses" mega-menu panel. Purely presentational — no hooks — so
 * it stays a server component even though its parent (DesktopNav) is a
 * client boundary. Rendered by Radix into the viewport positioned in
 * components/ui/navigation-menu.tsx.
 */
export function MegaMenu() {
  return (
    <div className="border-b border-sand/40 bg-ivory/95 backdrop-blur-lg dark:border-ink/40 dark:bg-ink/95">
      <div className="container grid grid-cols-4 gap-8 py-10">
        {BUSINESS_VERTICALS.map((vertical) => {
          const Icon = vertical.icon;
          return (
            <Link
              key={vertical.slug}
              href={`/businesses/${vertical.slug}`}
              className="group flex flex-col gap-3 rounded-lg p-3 outline-none transition-colors hover:bg-sand/40 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:bg-white/5"
            >
              <Icon className="size-6 text-brass" aria-hidden />
              <span className="font-display text-lg text-foreground">
                {vertical.name}
              </span>
              <span className="font-body text-sm text-muted-foreground">
                {vertical.description}
              </span>
            </Link>
          );
        })}
      </div>

      {/* The trigger above opens this panel rather than navigating, so
          without this the overview page has no route in from the nav. */}
      <div className="container pb-10">
        <Link
          href="/businesses"
          className="group inline-flex items-center gap-2 rounded-sm font-body text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="border-b border-brass pb-1">All businesses</span>
          <ArrowRight
            className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
