import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";
import { PRIVACY_SECTIONS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for Buhari Holdings Pvt Ltd.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Privacy"
      heading="Privacy policy"
      sections={PRIVACY_SECTIONS}
    />
  );
}
