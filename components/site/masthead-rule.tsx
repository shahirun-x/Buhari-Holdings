import { cn } from "@/lib/utils";

/**
 * The masthead motif — a brass hairline, the wordmark band, a second
 * hairline. Used at the top of the footer and again above the stats band so
 * the two dark sections rhyme. Assumes a dark ground (ink or midnight).
 */
export function MastheadRule({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-brass/40", className)}>
      <p className="container py-4 text-center font-body text-[10px] uppercase tracking-[0.3em] text-ivory/70">
        Buhari · Since 1989
      </p>
    </div>
  );
}
