"use client";

import { Input } from "@/components/ui/input";

/**
 * Presentational only — no submit wiring yet. Isolated as its own client
 * boundary (the `onSubmit` handler) so the rest of Footer stays a server
 * component.
 */
export function NewsletterForm() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="mt-6 flex items-end gap-3 border-b border-ivory/30 pb-2 transition-colors focus-within:border-brass"
    >
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Newsletter
        </label>
        <Input
          id="newsletter-email"
          type="email"
          placeholder="your@email.com"
          className="h-auto rounded-none border-0 bg-transparent px-0 py-1 text-ivory placeholder:text-ivory/40 focus-visible:border-0 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-sm pb-1 font-body text-sm font-medium text-brass outline-none transition-colors hover:text-brass/80 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        Subscribe →
      </button>
    </form>
  );
}
