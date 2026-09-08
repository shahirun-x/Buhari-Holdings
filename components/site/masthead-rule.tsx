import { cn } from "@/lib/utils";

/**
 * The masthead motif — a brass hairline, a centred band of letter-spaced
 * caps, a second hairline. Used at the top of the footer, above the stats
 * band, and again over the associated-enterprises marquee so the sections
 * rhyme.
 *
 * `tone` exists because the motif is used on two kinds of ground: the
 * always-dark footer and stats band, and the theme-following marquee band
 * where ivory text would vanish in light mode.
 */
export function MastheadRule({
  label = "Buhari · Since 1989",
  tone = "dark",
  className,
}: {
  label?: string;
  tone?: "dark" | "surface";
  className?: string;
}) {
  return (
    <div className={cn("border-y border-brass/40", className)}>
      <p
        className={cn(
          "container py-4 text-center font-body text-[10px] uppercase tracking-[0.3em]",
          tone === "dark" ? "text-ivory/70" : "text-ink/60 dark:text-ivory/70"
        )}
      >
        {label}
      </p>
    </div>
  );
}
