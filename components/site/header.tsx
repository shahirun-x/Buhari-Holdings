import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { DesktopNav } from "@/components/site/desktop-nav";
import { HeaderSearch } from "@/components/site/header-search";
import { MobileNav } from "@/components/site/mobile-nav";
import { HeaderScrollWrapper } from "@/components/site/header-scroll-wrapper";

export function Header() {
  return (
    <HeaderScrollWrapper>
      {/* Grid, not flex — guarantees the nav is truly centered regardless
          of how wide the wordmark vs. the utility cluster end up. */}
      <div className="container grid h-full grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link
          href="/"
          className="flex flex-col rounded-sm leading-none outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-display text-xl font-medium tracking-wide text-foreground md:text-2xl">
            BUHARI
          </span>
          <span className="mt-0.5 font-body text-[10px] leading-none uppercase tracking-[0.2em] text-brass">
            Since 1989
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center justify-end gap-1">
          <HeaderSearch />
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-brass text-brass hover:bg-brass hover:text-ivory dark:border-brass dark:bg-transparent dark:text-brass dark:hover:bg-brass dark:hover:text-ink lg:ml-1 lg:inline-flex"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </HeaderScrollWrapper>
  );
}
