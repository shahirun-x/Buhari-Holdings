import { CtaBand } from "@/components/site/cta-band";
import { SectionHeader } from "@/components/site/section-header";
import type { LegalSection } from "@/content/legal";

/**
 * Shared shell for the privacy and terms stubs.
 *
 * Renders the section structure a real policy needs and says plainly that
 * the text is not written yet. Placeholder legal prose would be worse than
 * an honest notice: a wrong policy is enforceable against the client in a
 * way that a missing one is not.
 */
export function LegalPage({
  kicker,
  heading,
  sections,
}: {
  kicker: string;
  heading: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="bg-ivory pt-32 pb-16 dark:bg-ink">
        <div className="container">
          <SectionHeader size="page" kicker={kicker} heading={heading} />
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32 dark:bg-ink">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <p
              role="note"
              className="border-l-2 border-brass py-3 pl-5 font-body text-base leading-relaxed text-ink/75 dark:text-ivory/75"
            >
              <strong className="font-medium text-foreground">
                This policy is being finalised.
              </strong>{" "}
              The structure below sets out what it will cover. The wording
              itself is being prepared with the group&rsquo;s legal advisers
              and will replace this notice before launch.
            </p>

            <div className="mt-14 space-y-12">
              {sections.map((section, i) => (
                <section key={section.heading}>
                  <h2 className="font-display text-xl leading-tight text-foreground">
                    <span className="mr-3 font-body text-[11px] tracking-[0.2em] text-brass tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </h2>
                  <p className="mt-3 font-body text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
                    {section.covers}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
