"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import ReusableShowcase from "../../components/ui/ReusableShowcase";
import Button from "../../components/ui/Button";
import {
  FEATURE_ICON_SET,
  FEATURE_COLOR_SET,
} from "../../components/ui/featureIconSet";

const BOOKS_FEATURES = [
  {
    title: "Accurate Transaction Logging",
    description:
      "Every disbursal, repayment, and fee is captured with a complete record so your books reflect exactly what moved and when.",
  },
  {
    title: "Automated Ledger Entries",
    description:
      "Postings flow into the right accounts the moment a transaction clears, removing manual data entry and the errors that come with it.",
  },
  {
    title: "Double-Entry Compliance",
    description:
      "Built-in double-entry tracking keeps debits and credits balanced on every entry so your accounts hold up to scrutiny.",
  },
  {
    title: "GST & TDS Worksheets",
    description:
      "Pre-built GST and TDS worksheets compute and tie out your tax positions, keeping filings aligned with the underlying ledger.",
  },
  {
    title: "One-Click Trial Balance",
    description:
      "Export a clean, balanced trial balance in a single click whenever auditors, finance, or the board need the numbers.",
  },
  {
    title: "Bank Reconciliation",
    description:
      "Match bank statements against your journals to surface breaks early and keep every account reconciled through the period.",
  },
].map((f, i) => ({
  ...f,
  icon: FEATURE_ICON_SET[i],
  color: FEATURE_COLOR_SET[i],
}));

const BOOKS_FAQ = [
  {
    question: "What gets captured in transaction logging?",
    answer:
      "Every disbursal, repayment, and fee is recorded in full, so your books show exactly what moved and when.",
  },
  {
    question: "Do I have to enter ledger postings manually?",
    answer:
      "No. Postings flow into the correct accounts automatically the moment a transaction clears, removing manual data entry and the errors that come with it.",
  },
  {
    question: "Does Fundflick enforce double-entry accounting?",
    answer:
      "Yes. Built-in double-entry tracking keeps debits and credits balanced on every entry, so your accounts stay internally consistent.",
  },
  {
    question: "How are GST and TDS handled?",
    answer:
      "Pre-built GST and TDS worksheets compute your tax positions and tie back to the ledger, keeping filing inputs aligned with the underlying books.",
  },
  {
    question: "Can I export a trial balance?",
    answer:
      "You can export a clean, balanced trial balance in a single click whenever auditors, finance, or the board need the numbers.",
  },
  {
    question: "How does bank reconciliation work?",
    answer:
      "Bank statements are matched against your journals to surface breaks early and keep every account reconciled through the period.",
  },
];

export default function BookkeepingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 pb-20 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Hero Section — cinematic image-reveal */}
      <RevealHero
        images={[
          "/reveal/1.jpg",
          "/reveal/2.jpg",
          "/reveal/9.jpg",
          "/reveal/4.jpg",
          "/reveal/5.jpg",
        ]}
        heroIndex={2}
        heading={
          <>
            Auto-post double-entry ledgers and tie out GST, TDS, trial balance
            and bank reconciliation in one set of books.
          </>
        }
        loaderLabel="Books"
        socialLabel="Get started"
        links={[
          { label: "Request a demo", href: "/contactus" },
          { label: "Talk to sales", href: "/contactus" },
        ]}
      />

      {/* Feature Grid */}
      <ReusableFeatures
        items={BOOKS_FEATURES}
        eyebrow="Bookkeeping & Accounts"
        heading={
          <>
            Everything your finance team needs to{" "}
            <span className="text-secondaryColor">close the books faster</span>
          </>
        }
        className="mt-20 mb-24"
      />

      {/* Product Showcase — tabbed, hover to enlarge */}
      <ReusableShowcase
        heading="Close the books"
        headingHighlight="faster"
        subtitle="Double-entry accounting built for NBFC and RBI compliance."
        theme="warm"
        ctaText="Request a Demo"
        tabs={[
          {
            label: "Ledgers",
            title: "Auto-Posted Double-Entry Ledgers",
            description:
              "Every transaction posts to the right ledger automatically, keeping your books balanced and audit-ready by default.",
            img: "/svg/book-ledgers.svg",
          },
          {
            label: "Reconciliation",
            title: "Reconcile Without the Spreadsheets",
            description:
              "Match bank statements to entries in bulk and resolve breaks fast, so month-end stops eating your week.",
            img: "/svg/book-reconciliation.svg",
          },
          {
            label: "Reports",
            title: "Financials Ready When You Are",
            description:
              "Generate P&L, balance sheet, and trial balance on demand, exportable for boards, auditors, and regulators.",
            img: "/svg/book-reports.svg",
          },
          {
            label: "Compliance",
            title: "Stay RBI and NBFC Compliant",
            description:
              "Built-in compliance structures keep classification, provisioning, and reporting aligned from day one.",
            img: "/svg/book-compliance.svg",
          },
        ]}
      />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about Fundflick Bookkeeping & Accounts."
        items={BOOKS_FAQ}
      />

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-3xl mx-auto px-6 mt-24 relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-secondaryColor/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Books that audit themselves
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            See how Fundflick automates your ledger, taxes, and reconciliation
            so your finance team closes faster and stays compliant.
          </p>
          <Button
            href="/contactus"
            variant="brand"
            className="px-8 py-3.5 text-sm relative z-10"
          >
            Request a demo
          </Button>
        </div>
      </div>
    </div>
  );
}
