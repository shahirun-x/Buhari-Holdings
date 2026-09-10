import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CtaBand } from "@/components/site/cta-band";
import { SectionHeader } from "@/components/site/section-header";
import { getRoles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work across eight sectors in a group that measures its decisions in decades.",
};

const PILLARS = [
  {
    title: "Legacy",
    body: "The group has traded since 1989, and most of what it has built is still standing and still in use. Work here is judged on how it holds up, which is a slower and more demanding measure than how it looks on completion.",
  },
  {
    title: "Breadth",
    body: "Eight sectors under one roof means the work is genuinely varied — construction and shipping and retail ask for different instincts. People who are curious beyond their own discipline tend to do well.",
  },
  {
    title: "Impact",
    body: "Much of what the group does is civic: buildings held in public use, and the services that keep them working. The people who benefit are usually not the people who commissioned the work, which changes how you think about doing it properly.",
  },
];

export default function CareersPage() {
  const roles = getRoles();

  return (
    <>
      <section className="bg-ivory pt-32 pb-16 dark:bg-ink">
        <div className="container">
          <SectionHeader
            size="page"
            kicker="Careers"
            heading="Build the next chapter."
            lead="The group is made up of people who stayed — which is both the reason it works and the reason there are rarely many openings at once."
          />
        </div>
      </section>

      <section className="bg-ivory pb-24 dark:bg-ink">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
            {PILLARS.map((pillar) => (
              <div key={pillar.title}>
                <h2 className="font-display text-xl leading-tight text-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-4 font-body text-sm leading-relaxed text-ink/70 dark:text-ivory/70">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 dark:bg-midnight">
        <div className="container">
          <SectionHeader kicker="Opportunities" heading="Open roles." />

          {/* Renders from content/careers/roles.json. Adding a role there
              needs no change here — including going from none to some. */}
          {roles.length === 0 ? (
            <div className="mt-12 max-w-xl">
              <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-snug text-foreground">
                No open roles at present.
              </p>
              <p className="mt-5 font-body text-base leading-relaxed text-ink/70 dark:text-ivory/70">
                That changes without much notice. If your work would suit the
                group, write to us anyway — speculative approaches are read.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-sm font-body text-sm tracking-wide text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-sand dark:focus-visible:ring-offset-midnight"
              >
                <span className="border-b border-brass pb-1">Get in touch</span>
                <ArrowRight
                  className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          ) : (
            <ul className="mt-12 divide-y divide-ink/10 dark:divide-ivory/10">
              {roles.map((role) => (
                <li key={role.id} className="py-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <h3 className="font-display text-2xl leading-tight text-foreground">
                      {role.title}
                    </h3>
                    <p className="font-body text-[11px] uppercase tracking-[0.2em] text-brass">
                      {[role.department, role.location, role.type]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ink/70 dark:text-ivory/70">
                    {role.summary}
                  </p>
                  <Link
                    href={role.applyHref}
                    className="group mt-5 inline-flex items-center gap-2 rounded-sm font-body text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-sand dark:focus-visible:ring-offset-midnight"
                  >
                    <span className="border-b border-brass pb-1">Apply</span>
                    <ArrowRight
                      className="size-4 shrink-0 text-brass transition-transform duration-200 ease-out group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
