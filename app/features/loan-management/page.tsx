"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import Button from "../../components/ui/Button";
import {
  FEATURE_ICON_SET,
  FEATURE_COLOR_SET,
} from "../../components/ui/featureIconSet";

const LMS_FEATURES = [
  {
    title: "Loan Book & Ledgers",
    description:
      "Maintain every active, closed and written-off loan with a real-time ledger that tracks principal, interest, charges and balances down to the rupee.",
  },
  {
    title: "Custom EMI Schedules",
    description:
      "Generate flat, reducing, bullet or fully custom repayment schedules with configurable tenures, moratoriums, step-ups and irregular due dates.",
  },
  {
    title: "Flexible Interest Engine",
    description:
      "Compute simple, reducing-balance or custom interest models with day-count conventions and accrual logic that match your product policy exactly.",
  },
  {
    title: "Instant NOC & SOA",
    description:
      "Issue No Objection Certificates and Statements of Account on demand, generated straight from the ledger so figures always reconcile.",
  },
  {
    title: "Pre-Closure & Foreclosure",
    description:
      "Auto-calculate outstanding principal, accrued interest, foreclosure charges and rebates so borrowers get an accurate settlement figure instantly.",
  },
  {
    title: "Restructure & Accounting",
    description:
      "Handle part-payments, charge waivers, reschedules and restructuring while postings flow automatically into your accounting and reporting.",
  },
].map((f, i) => ({
  ...f,
  icon: FEATURE_ICON_SET[i],
  color: FEATURE_COLOR_SET[i],
}));

const LMS_FAQ = [
  {
    question: "Which interest models does the LMS support?",
    answer:
      "It supports simple, reducing-balance and fully custom interest models, with configurable day-count conventions and accrual rules to match each loan product.",
  },
  {
    question: "Can I create non-standard EMI schedules?",
    answer:
      "Yes. You can build step-up, step-down, bullet, moratorium and irregular schedules, then adjust individual installments without breaking the underlying ledger.",
  },
  {
    question: "How are NOC and SOA statements generated?",
    answer:
      "Both are produced directly from the loan ledger in real time, so balances, charges and dues always reconcile and can be issued the moment they are requested.",
  },
  {
    question: "How does foreclosure calculation work?",
    answer:
      "The system computes outstanding principal, accrued interest, applicable foreclosure charges and any rebates automatically, giving borrowers an accurate settlement quote on demand.",
  },
  {
    question: "Can I restructure or part-pay an active loan?",
    answer:
      "You can apply part-payments, reschedule tenures, waive or add charges and run full restructuring, with every change posted to the ledger and accounting trail.",
  },
  {
    question: "Does the LMS integrate with our accounting and reporting?",
    answer:
      "Yes. Charges, accruals and repayments post automatically into accounting, so your books, GL and reporting stay aligned without manual reconciliation.",
  },
];

export default function LoanManagementPage() {
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
          "/reveal/7.jpg",
          "/reveal/4.jpg",
          "/reveal/5.jpg",
        ]}
        heroIndex={2}
        heading={
          <>
            Run the full loan lifecycle from one ledger — EMI schedules,
            interest accrual, restructuring, NOC and SOA — without spreadsheets
            or manual reconciliation.
          </>
        }
        socialLabel="Get started"
        links={[
          { label: "Request a demo", href: "/contactus" },
          { label: "Talk to sales", href: "/contactus" },
        ]}
      />

      {/* Feature Grid */}
      <ReusableFeatures
        items={LMS_FEATURES}
        eyebrow="Servicing Suite"
        heading={
          <>
            Everything you need to{" "}
            <span className="text-secondaryColor">service loans cleanly</span>
          </>
        }
        className="mt-20 mb-24"
      />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about the Fundflick Loan Management System."
        items={LMS_FAQ}
      />

      {/* CTA Section */}
      <div ref={ctaRef} className="max-w-3xl mx-auto px-6 mt-24 relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-secondaryColor/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Service every loan with confidence
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            See how Fundflick LMS keeps your loan book, ledgers and statements
            accurate from disbursal to closure.
          </p>
          <Button
            href="/contactus"
            variant="brand"
            className="px-8 py-3.5 text-sm relative z-10"
          >
            Book a walkthrough
          </Button>
        </div>
      </div>
    </div>
  );
}
