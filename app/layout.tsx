import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { site } from "@/lib/site";
import { personSchema, websiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    site.alias,
    "software engineer",
    "AI engineer",
    "Singapore",
    "NUS Computer Science",
    "AI agents",
    "Crystara",
    "Kavela",
    "True North",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    title: `${site.name} · ${site.role}`,
    description: site.description,
    siteName: site.name,
    locale: "en_SG",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tyhho0",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0C0D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="min-h-dvh antialiased">
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <Providers>
          <a
            href="#main"
            className="focus-ring sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
