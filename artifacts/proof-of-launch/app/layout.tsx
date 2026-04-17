import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import content from "@/content/content.json";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://proofoflaunch.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${content.brand.name} — ${content.brand.tagline}`,
    template: `%s · ${content.brand.name}`,
  },
  description: content.brand.oneLiner,
  applicationName: content.brand.name,
  keywords: [
    "AI product studio",
    "healthtech",
    "fintech",
    "retail",
    "QA",
    "real device lab",
    "App Store compliance",
    "HIPAA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${content.brand.name} — ${content.brand.tagline}`,
    description: content.brand.oneLiner,
    siteName: content.brand.name,
    images: [{ url: "/opengraph.jpg", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.brand.name} — ${content.brand.tagline}`,
    description: content.brand.oneLiner,
    images: ["/opengraph.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05080F",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: content.brand.legalName,
  alternateName: content.brand.name,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  description: content.brand.oneLiner,
  email: content.brand.contactEmail,
  foundingDate: String(content.brand.foundedYear),
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-navy-900 font-body text-ink">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
