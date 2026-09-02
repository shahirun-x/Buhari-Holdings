"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { MegaMenu } from "@/components/site/mega-menu";
import { NAV_ITEMS } from "@/components/site/nav-config";
import { cn } from "@/lib/utils";

/**
 * Shared look for every top-level nav item: a brass underline that grows
 * from the left on hover (200ms ease-out), via an `after:` pseudo-element.
 * `active && "after:w-full"` makes the underline static for the current route.
 */
const navLinkClasses =
  "relative inline-flex items-center py-2 font-body text-sm font-medium tracking-wide text-foreground/85 outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-brass after:transition-all after:duration-200 after:ease-out hover:after:w-full";

function isPathActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();
  // Controlled so the mega-menu backdrop (rendered outside Radix's portal)
  // knows exactly when the "Businesses" content is open.
  const [openItem, setOpenItem] = React.useState("");

  return (
    <div className="relative hidden justify-center lg:flex">
      <NavigationMenu
        viewport={false}
        delayDuration={100}
        value={openItem}
        onValueChange={setOpenItem}
      >
        <NavigationMenuList className="gap-6">
          {NAV_ITEMS.map((item) => {
            const active = isPathActive(pathname, item.href);

            if (item.label === "Businesses") {
              return (
                <NavigationMenuItem key={item.href} value={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      navLinkClasses,
                      "h-auto rounded-none bg-transparent px-0 py-2 hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-popup-open:bg-transparent",
                      active && "after:w-full"
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  {/* The primitive's default md:absolute md:w-auto shrink-wraps
                      Content to its intrinsic width — override to fill the
                      full-width viewport the mega-menu needs. */}
                  <NavigationMenuContent className="static w-full p-0 md:static md:w-full">
                    <MegaMenu />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  active={active}
                  className={cn(
                    navLinkClasses,
                    "rounded-none px-0 py-2 hover:bg-transparent focus:bg-transparent data-active:bg-transparent",
                    active && "after:w-full"
                  )}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>

        <NavigationMenuViewport />
      </NavigationMenu>

      {/* Backdrop — blurs the page behind the open mega-menu. Lives outside
          Radix's content tree so its opacity tracks `openItem` directly,
          independent of z-index/stacking quirks inside the portal. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-x-0 top-16 bottom-0 z-40 bg-ink/20 backdrop-blur-sm transition-opacity duration-200 dark:bg-ink/60 lg:top-22",
          openItem === "/businesses" ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
