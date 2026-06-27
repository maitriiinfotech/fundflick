"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import ReusableShowcase from "../../components/ui/ReusableShowcase";
import Button from "../../components/ui/Button";

const LMS_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <line x1="8" y1="8" x2="16" y2="8" />
        <line x1="8" y1="12" x2="16" y2="12" />
        <line x1="8" y1="16" x2="12" y2="16" />
      </svg>
    ),
    title: "Lager Balance Ledger",
    description:
      "Every payment auto-updates the Lager Balance on the loan. EMI Logs track opening stock, amount received, and narration for every transaction. The balance cascades down the EMI schedule and marks instalments PAID in sequence — no manual reconciliation needed.",
    color: "bg-blue-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Reducing Balance EMI Schedule",
    description:
      "On loan approval, a full amortization schedule is auto-generated using the monthly reducing-balance method. Every EMI row shows principal component, interest component, cumulative amounts paid, and outstanding principal — all stored to the paisa.",
    color: "bg-emerald-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Auto Penalty on Overdue EMIs",
    description:
      "When an EMI crosses its due date unpaid, the system auto-marks it OVERDUE and calculates penalty at 2% per month. Late days are tracked per EMI and the penalty amount is shown separately in the schedule so borrowers see the exact amount owed.",
    color: "bg-red-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    title: "Rescheduling with Fresh Amortization",
    description:
      "The Rescheduling page accepts part payment, rebate, other charges, EMI due, accrued interest, new tenure and interest rate. Net principal is auto-calculated and a fresh amortization schedule is generated on screen before confirming — so teams see the new EMI before committing.",
    color: "bg-amber-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Principal Prepayment — Reduce Tenure or EMI",
    description:
      "Record a principal prepayment and choose the outcome: Reduce Tenure (keep EMI the same, close loan earlier) or Reduce EMI (same tenure, lower monthly payment). The schedule is recalculated and saved instantly. Prepayment count is tracked on the loan's repayment analytics.",
    color: "bg-violet-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <line x1="15" y1="10" x2="9" y2="10" />
      </svg>
    ),
    title: "Payment Reversal & Balance Restore",
    description:
      "Any recorded payment can be reversed: the original entry is marked REVERSED, a reversal payment is created with a negative amount, the outstanding balance is fully restored, and the EMI is reverted to pending. Full audit trail — the reversal reason is stored alongside both transactions.",
    color: "bg-sky-50",
  },
];

const LMS_FAQ = [
  {
    question: "How is the EMI schedule generated?",
    answer:
      "On loan approval, a full amortization schedule is auto-generated using the monthly reducing-balance method. Each row shows the principal and interest components, cumulative amounts paid, and outstanding principal, stored to the paisa.",
  },
  {
    question: "What happens when an EMI becomes overdue?",
    answer:
      "When an EMI crosses its due date unpaid, the system auto-marks it overdue and calculates a penalty at 2% per month. Late days and the penalty amount are tracked per EMI and shown separately in the schedule.",
  },
  {
    question: "How does rescheduling a loan work?",
    answer:
      "Rescheduling accepts part payment, rebate, other charges, EMI due, accrued interest, and a new tenure and interest rate. Net principal is auto-calculated and a fresh amortization schedule is generated on screen for review before you confirm.",
  },
  {
    question: "Can a borrower make a principal prepayment?",
    answer:
      "Yes. You record the prepayment and choose to either reduce the tenure while keeping the EMI the same, or reduce the EMI while keeping the tenure. The schedule is recalculated and saved instantly.",
  },
  {
    question: "Can a recorded payment be reversed?",
    answer:
      "Any payment can be reversed: the original entry is marked reversed, a negative reversal payment is created, the outstanding balance is restored, and the EMI reverts to pending. The reversal reason is stored alongside both transactions for a full audit trail.",
  },
  {
    question: "How is the outstanding balance kept accurate?",
    answer:
      "Every payment auto-updates the running balance on the loan, and EMI logs record the opening balance, amount received, and narration for each transaction. The balance cascades down the schedule and marks instalments paid in sequence without manual reconciliation.",
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
            Service every loan from one ledger — auto-generated reducing-balance
            EMI schedules, automatic overdue penalties, rescheduling,
            prepayments, and fully reversible payments, all tracked to the
            paisa.
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

      {/* Product Showcase — tabbed, hover to enlarge */}
      <ReusableShowcase
        heading="Loan disbursed?"
        headingHighlight="Every rupee tracked after."
        subtitle="Complete loan servicing — EMI schedules, payments, PDC and NACH all in one place"
        theme="neutral"
        ctaText="Book a Demo"
        tabs={[
          {
            label: "LMS Dashboard",
            title: "Your Entire Loan Portfolio, Live and in Full Detail",
            description:
              "The LMS Dashboard gives you an instant read on your entire loan book — total disbursed, outstanding balance, active loans, and monthly collections — with filters by loan type and status across your whole portfolio.",
            img: "/lending_overview_minimal.png",
          },
          {
            label: "Loan Lifecycle",
            title: "From Approved File to Active Loan in Minutes",
            description:
              "Once a customer file is approved in the LOS, create the loan with repayment mode, processing fee, and start date. Approve with a disbursement date and the EMI schedule is auto-generated instantly.",
            img: "/lending_system_isometric.png",
          },
          {
            label: "EMI Schedule",
            title: "A Complete Amortization Schedule with Live Status Tracking",
            description:
              "Every loan gets a fully generated EMI schedule from day one — with per-instalment status, penalty tracking for overdue EMIs, and instant recalculation when a prepayment is made.",
            img: "/pipeline_overview.png",
          },
          {
            label: "Payment Recording",
            title: "Record Every Repayment — Any Type, Any Method",
            description:
              "Record EMI payments, bulk advance payments, penalty settlements, and principal prepayments across all payment channels. Full payment history per loan with daily and monthly collection reports.",
            img: "/reports.png",
          },
          {
            label: "PDC & NACH",
            title: "Automate Repayments with PDC Cheques and NACH Mandates",
            description:
              "Set up post-dated cheques or NACH mandates linked directly to EMI instalments. Track every cheque from pending to cleared or bounced, and process bulk NACH payments via CSV upload.",
            img: "/lms_hrms.png",
          },
        ]}
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
