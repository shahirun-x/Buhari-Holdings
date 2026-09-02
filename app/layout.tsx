import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import "./globals.css";

/* Display serif — Fraunces variable font, self-hosted by next/font. */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

/* Body sans — Inter variable font, self-hosted by next/font. */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const title = "Buhari Holdings — Leadership Through Legacy";
const description =
  "A Chennai-based conglomerate since 1989. Eight sectors, one legacy — from construction and shipping to institutions and civic care.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s | Buhari Holdings",
  },
  description,
  openGraph: {
    title,
    description,
    siteName: "Buhari Holdings",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-medium focus:text-ivory focus:no-underline focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2 focus:ring-offset-ivory dark:focus:bg-ivory dark:focus:text-ink dark:focus:ring-offset-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="min-h-screen pt-16 lg:pt-22">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
