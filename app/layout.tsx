import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://www.fundflick.in"),
  title: {
    default: "Fundflick | Complete Loan Origination Platform",
    template: "%s | Fundflick",
  },
  description:
    "Streamline your lending with Fundflick's powerful loan origination software, digital lending platform, and automated loan processing. Manage applications, collections, and reporting efficiently.",
  keywords: [
    "loan origination software",
    "loan management system",
    "lending platform",
    "loan processing software",
    "digital lending platform",
    "streamline loan process",
    "fast loan approvals software",
    "reduce loan processing time",
    "improve loan efficiency",
    "enhance borrower experience",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.fundflick.in",
    siteName: "Fundflick",
    title: "Fundflick | Digital Lending & Loan Origination Software",
    description:
      "Automate and optimize your entire loan lifecycle with Fundflick – the leading platform for loan management, underwriting, and collections.",
    images: [{ url: "/logo.png", alt: "Fundflick" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundflick | Digital Lending & Loan Origination Software",
    description:
      "Automate and optimize your entire loan lifecycle with Fundflick – the leading platform for loan management, underwriting, and collections.",
    images: ["/logo.png"],
  },
};

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";

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
        <Navbar />
        <SmoothScrollProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
