import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MastheadRule } from "@/components/site/masthead-rule";

/**
 * Closing band. Reused at the foot of nearly every page, so the wording is
 * a prop rather than baked in — the destination almost always is not.
 */
export function CtaBand({
  heading = "Start a conversation.",
  lead = "For enquiries across any of the group's sectors, or anything else.",
  label = "Contact us",
  href = "/contact",
}: {
  heading?: string;
  lead?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="bg-midnight py-20 text-ivory lg:py-24">
      <MastheadRule className="mb-16" />

      <div className="container text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-normal leading-tight tracking-[-0.02em]">
          {heading}
        </h2>
        <p className="mx-auto mt-5 max-w-md font-body text-base leading-relaxed text-ivory/75">
          {lead}
        </p>

        <Link
          href={href}
          className="group mt-9 inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-ivory outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
        >
          <span className="border-b border-brass pb-1">{label}</span>
          <ArrowRight
            className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
