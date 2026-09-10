import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { NewsroomFilter } from "@/components/site/newsroom-filter";
import { SectionHeader } from "@/components/site/section-header";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "The Chronicle — notes on how the group works, alongside press entries and milestones.",
};

export default function NewsroomPage() {
  const articles = getArticles();

  return (
    <>
      <section className="bg-ivory pt-32 pb-16 dark:bg-ink">
        <div className="container">
          <SectionHeader
            size="page"
            kicker="Newsroom"
            heading="The Chronicle."
            lead="Notes on how the group approaches its work, alongside the entries and milestones worth keeping a record of."
          />
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32 dark:bg-ink">
        <div className="container">
          <NewsroomFilter articles={articles} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
