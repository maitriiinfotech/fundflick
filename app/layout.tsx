import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, LEGAL_NAME, TWITTER_HANDLE } from "@/lib/seo-config";
import {
  organizationLd,
  websiteLd,
  softwareApplicationLd,
  jsonLdScript,
} from "@/lib/structured-data";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fundflick | Complete Loan Origination & Lending Platform",
    template: "%s | Fundflick",
  },
  description:
    "Streamline your lending with Fundflick's powerful loan origination software, digital lending platform, and automated loan processing. Manage applications, collections, and reporting efficiently.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "loan origination software",
    "loan management system",
    "lending platform",
    "loan processing software",
    "digital lending platform",
    "NBFC software",
    "collection management software",
    "loan servicing software",
    "fast loan approvals software",
    "lending automation",
  ],
  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  creator: LEGAL_NAME,
  publisher: SITE_NAME,
  referrer: "origin-when-cross-origin",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Fundflick | Digital Lending & Loan Origination Software",
    description:
      "Automate and optimize your entire loan lifecycle with Fundflick – the leading platform for loan management, underwriting, and collections.",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Fundflick" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundflick | Digital Lending & Loan Origination Software",
    description:
      "Automate and optimize your entire loan lifecycle with Fundflick – the leading platform for loan management, underwriting, and collections.",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#131c33" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import WebVitals from "./components/analytics/WebVitals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site-wide JSON-LD — inline so JS-less crawlers & AI bots index it */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteLd)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(softwareApplicationLd)}
        />
        <WebVitals />
        <Navbar />
        <SmoothScrollProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
