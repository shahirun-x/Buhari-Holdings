"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

/**
 * Wraps next-themes. Persists the choice to localStorage and follows the
 * OS setting by default. next-themes injects a blocking inline script, so
 * the correct theme is applied before paint — no flash of the wrong theme.
 * `suppressHydrationWarning` on <html> (in layout.tsx) covers the class swap.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
