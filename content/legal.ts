/**
 * Section headings only — deliberately no legal text.
 *
 * CLIENT-CONFIRM REQUIRED. Both of these pages are structural stubs. The
 * actual wording of a privacy policy and terms of use must be drafted or
 * approved by the client's counsel; text written here would be worse than
 * useless, because a wrong policy is enforceable against the client in a
 * way that a missing one is not. Indian law applies (the group is
 * incorporated in Chennai), and the privacy policy in particular needs to
 * address the Digital Personal Data Protection Act as well as whatever the
 * contact form and any future analytics actually collect. Do not publish
 * either page without that text. See LAUNCH_CHECKLIST.md.
 */

export type LegalSection = {
  heading: string;
  /** What counsel needs to cover — not the wording itself. */
  covers: string;
};

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "What we collect",
    covers:
      "The data the contact form gathers, anything analytics records once it is added, and whatever the hosting provider logs.",
  },
  {
    heading: "How we use it",
    covers:
      "The purposes each category of data is put to, and the lawful basis for each.",
  },
  {
    heading: "Who we share it with",
    covers:
      "Processors — hosting, email delivery, analytics — and any transfer of data outside India.",
  },
  {
    heading: "How long we keep it",
    covers: "Retention periods per category, and what triggers deletion.",
  },
  {
    heading: "Your rights",
    covers:
      "Access, correction, erasure and grievance redressal, including the contact point for exercising them.",
  },
  {
    heading: "Cookies",
    covers:
      "Any cookies set, their purpose, and how consent is obtained where it is required.",
  },
  {
    heading: "Contact",
    covers:
      "The named person or office responsible for data protection enquiries.",
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Use of this site",
    covers: "What visitors may and may not do with the site.",
  },
  {
    heading: "Intellectual property",
    covers:
      "Ownership of the site's content, marks and photography, and any permitted use.",
  },
  {
    heading: "Accuracy of information",
    covers:
      "The status of the information published here and the limits of any reliance placed on it.",
  },
  {
    heading: "Third-party links",
    covers: "Responsibility for sites linked from this one.",
  },
  {
    heading: "Limitation of liability",
    covers: "The extent of liability, within what Indian law permits.",
  },
  {
    heading: "Governing law",
    covers: "The governing law and the forum for disputes.",
  },
  {
    heading: "Changes to these terms",
    covers: "How changes are made and communicated.",
  },
];
