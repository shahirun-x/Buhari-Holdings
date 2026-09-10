import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";
import { TERMS_SECTIONS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Buhari Holdings Pvt Ltd.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Terms"
      heading="Terms of use"
      sections={TERMS_SECTIONS}
    />
  );
}
