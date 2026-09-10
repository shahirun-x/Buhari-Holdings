import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { SectionHeader } from "@/components/site/section-header";
import { HEAD_OFFICE } from "@/components/site/nav-config";
import { MARKETS } from "@/lib/markets";
import contact from "@/content/contact.json";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquiries across any of the group's sectors. Head office in Nungambakkam, Chennai.",
};

const INFO_HEADING =
  "font-body text-[10px] uppercase tracking-widest text-brass";

export default function ContactPage() {
  return (
    <>
      <section className="bg-ivory pt-32 pb-16 dark:bg-ink">
        <div className="container">
          <SectionHeader
            size="page"
            kicker={contact.kicker}
            heading={contact.heading}
            lead={contact.lead}
          />
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32 dark:bg-ink">
        {/* Form first in the DOM, so it is what a reader on a phone meets
            rather than three screens of address details. */}
        <div className="container grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="lg:col-span-5">
            <div>
              <h2 className={INFO_HEADING}>Head office</h2>
              <address className="mt-4 font-body text-base not-italic leading-relaxed text-ink/75 dark:text-ivory/75">
                {HEAD_OFFICE.lines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < HEAD_OFFICE.lines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </address>

              <div className="mt-5 space-y-1 font-body text-base">
                <p>
                  <a
                    href={`tel:${HEAD_OFFICE.phone.replace(/\s/g, "")}`}
                    className="rounded-sm text-ink/75 outline-none transition-colors hover:text-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-ivory/75"
                  >
                    {HEAD_OFFICE.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${HEAD_OFFICE.email}`}
                    className="rounded-sm text-ink/75 outline-none transition-colors hover:text-brass focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-ivory/75"
                  >
                    {HEAD_OFFICE.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className={INFO_HEADING}>Where we operate</h2>
              <ul className="mt-4 space-y-1">
                {MARKETS.map((market) => (
                  <li
                    key={market.name}
                    className="font-body text-base text-ink/75 dark:text-ivory/75"
                  >
                    {market.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* OpenStreetMap rather than the Google Maps JS API, which
                needs a billable key. Fixed aspect ratio reserves the box
                so the embed cannot shift the page as it loads. */}
            <div className="mt-12">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-ink/15 dark:border-ivory/15">
                <iframe
                  src={contact.map.embedSrc}
                  title={contact.map.title}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full"
                />
              </div>
              <a
                href={contact.map.linkHref}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded-sm font-body text-xs text-ink/60 underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-ivory/60"
              >
                View a larger map
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
