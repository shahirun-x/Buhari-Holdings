"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { BUSINESS_VERTICALS, NAV_ITEMS } from "@/components/site/nav-config";
import { cn } from "@/lib/utils";

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [businessesExpanded, setBusinessesExpanded] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="lg:hidden"
        >
          <Menu className="size-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="gap-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetHeader className="border-b border-sand/40 p-4 dark:border-white/10">
          <SheetTitle asChild>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex flex-col leading-none"
            >
              <span className="font-display text-xl font-medium tracking-wide">
                BUHARI
              </span>
              <span className="mt-0.5 font-body text-[10px] leading-none uppercase tracking-[0.2em] text-brass">
                Since 1989
              </span>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-4">
          {NAV_ITEMS.map((item) => {
            const active = isPathActive(pathname, item.href);

            if (item.label === "Businesses") {
              return (
                <div
                  key={item.href}
                  className="border-b border-sand/40 dark:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setBusinessesExpanded((prev) => !prev)}
                    aria-expanded={businessesExpanded}
                    className={cn(
                      "flex w-full items-center justify-between py-3 text-left font-display text-3xl outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active && "text-brass"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-5 text-muted-foreground transition-transform duration-200",
                        businessesExpanded && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-200 ease-out"
                    style={{
                      gridTemplateRows: businessesExpanded ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden pb-3">
                      {BUSINESS_VERTICALS.map((vertical) => (
                        <Link
                          key={vertical.slug}
                          href={`/businesses/${vertical.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-md py-2 pl-6 font-body text-lg text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          {vertical.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block border-b border-sand/40 py-3 font-display text-3xl outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/10",
                  active && "text-brass"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <SheetFooter className="flex-row items-center justify-between border-t border-sand/40 dark:border-white/10">
          <ThemeToggle />
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-brass text-brass hover:bg-brass hover:text-ivory dark:border-brass dark:bg-transparent dark:text-brass dark:hover:bg-brass dark:hover:text-ink"
          >
            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
