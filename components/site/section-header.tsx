import { cn } from "@/lib/utils";

/**
 * Kicker, display heading, optional lead. Repeated in nearly every band on
 * the site, so it lives here rather than being retyped with slightly
 * different tracking each time.
 *
 * `size` scales the heading only — a page-level header wants more presence
 * than a band inside one.
 */
export function SectionHeader({
  kicker,
  heading,
  lead,
  size = "section",
  className,
}: {
  kicker: string;
  heading: string;
  lead?: string;
  size?: "section" | "page";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="font-body text-[11px] uppercase tracking-[0.25em] text-brass">
        {kicker}
      </p>
      <h2
        className={cn(
          "mt-5 font-display font-normal leading-tight tracking-[-0.02em] text-foreground",
          size === "page"
            ? "text-[clamp(2.5rem,6vw,4.5rem)]"
            : "text-[clamp(2rem,4vw,3.25rem)]"
        )}
      >
        {heading}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 font-body leading-relaxed text-ink/70 dark:text-ivory/70",
            size === "page" ? "text-lg" : "text-base"
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
