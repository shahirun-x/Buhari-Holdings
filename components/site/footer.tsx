import Link from "next/link";

import {
  BUSINESS_VERTICALS,
  FOOTER_ABOUT_LINKS,
  FOOTER_COMPANY_LINKS,
  SOCIAL_LINKS,
} from "@/components/site/nav-config";
import { MastheadRule } from "@/components/site/masthead-rule";
import { NewsletterForm } from "@/components/site/newsletter-form";

const linkClasses =
  "block py-1.5 font-body text-sm text-ivory/80 outline-none transition-colors hover:text-ivory focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

const headingClasses =
  "mb-4 font-body text-xs uppercase tracking-widest text-brass";

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-ivory lg:py-20">
      <MastheadRule />

      <div className="container mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
        {/* Identity column */}
        <div className="md:col-span-2 lg:col-span-1">
          <p className="font-display text-3xl font-medium leading-none">
            BUHARI
          </p>
          <p className="mt-0.5 font-body text-[10px] uppercase leading-none tracking-[0.2em] text-brass">
            Since 1989
          </p>

          <address className="mt-6 font-body text-sm not-italic text-ivory/80">
            No. 4, Moores Road
            <br />
            Nungambakkam, Chennai 600006
            <br />
            Tamil Nadu, India
          </address>

          <div className="mt-4 font-body text-sm text-ivory/80">
            <p>+91 44 XXXX XXXX</p>
            <p>hello@buhariholding.com</p>
          </div>
        </div>

        {/* Businesses */}
        <div>
          <p className={headingClasses}>Businesses</p>
          {BUSINESS_VERTICALS.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/businesses/${vertical.slug}`}
              className={linkClasses}
            >
              {vertical.name}
            </Link>
          ))}
        </div>

        {/* About */}
        <div>
          <p className={headingClasses}>About</p>
          {FOOTER_ABOUT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <p className={headingClasses}>Company</p>
          {FOOTER_COMPANY_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social + newsletter */}
        <div>
          <p className={headingClasses}>Stay in touch</p>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 outline-none transition-colors hover:border-brass hover:text-ivory focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <Icon className="size-4" aria-hidden />
                </Link>
              );
            })}
          </div>

          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-ivory/60">
          © 2026 Buhari Holdings Pvt Ltd. All rights reserved.
        </p>
        <div className="flex items-center gap-2 font-body text-xs text-ivory/60">
          <Link
            href="/privacy"
            className="rounded-sm outline-none transition-colors hover:text-ivory focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Privacy
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/terms"
            className="rounded-sm outline-none transition-colors hover:text-ivory focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Terms
          </Link>
          <span aria-hidden>·</span>
          <Link
            href="/sitemap"
            className="rounded-sm outline-none transition-colors hover:text-ivory focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
