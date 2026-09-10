import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Tailwind v4 reads its theme primarily from CSS (`@theme`), but this
 * project exposes the design tokens here so brand utilities
 * (`bg-ink`, `text-brass`, `border-sand`, `font-display`, …) and a
 * bespoke `.container` live in one typed place. Bridged into the CSS
 * pipeline via `@config "../tailwind.config.ts"` in app/globals.css.
 *
 * Colours reference the CSS custom properties defined in globals.css,
 * so the same utility follows the active light/dark theme.
 */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        ink: "var(--ink)",
        midnight: "var(--midnight)",
        brass: "var(--brass)",
        ivory: "var(--ivory)",
        sand: "var(--sand)",
        seagrass: "var(--seagrass)",
        white: "var(--white)",

        // Semantic surfaces (theme-aware, consumed by shadcn/ui)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        error: "var(--error)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    // Editorial page container: capped at 1440px with padding that
    // scales 24 → 40 → 64px across the mobile-first breakpoints.
    plugin(({ addComponents }) => {
      addComponents({
        ".container": {
          width: "100%",
          marginInline: "auto",
          maxWidth: "1440px",
          paddingInline: "1.5rem",
          "@media (min-width: 768px)": {
            paddingInline: "2.5rem",
          },
          "@media (min-width: 1024px)": {
            paddingInline: "4rem",
          },
        },
      });
    }),
  ],
} satisfies Config;

export default config;
