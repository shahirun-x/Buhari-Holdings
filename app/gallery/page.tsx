import type { Metadata } from "next";

import { CtaBand } from "@/components/site/cta-band";
import { GalleryGrid } from "@/components/site/gallery-grid";
import { SectionHeader } from "@/components/site/section-header";
import { getGalleryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Images from across the group's sectors.",
};

export default function GalleryPage() {
  const items = getGalleryItems();

  return (
    <>
      <section className="bg-ivory pt-32 pb-16 dark:bg-ink">
        <div className="container">
          <SectionHeader
            size="page"
            kicker="Gallery"
            heading="The work, in pictures."
            lead="Images from across the group's sectors. Every frame here is a placeholder until the real photography is commissioned."
          />
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32 dark:bg-ink">
        <div className="container">
          <GalleryGrid items={items} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
