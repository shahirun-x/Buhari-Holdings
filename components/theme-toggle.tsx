"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Manual light/dark toggle. The icons are swapped purely with CSS off the
 * `.dark` class (which next-themes sets before paint), so there is no
 * hydration mismatch and no client-only mount state. `resolvedTheme` is
 * always defined by the time a user can click, so the handler reads it safely.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
