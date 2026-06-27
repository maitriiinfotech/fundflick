"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHero from "../../components/ui/RevealHero";
import ReusableFAQ from "../../components/ui/ReusableFAQ";
import ReusableFeatures from "../../components/ui/ReusableFeatures";
import ReusableShowcase from "../../components/ui/ReusableShowcase";
import Button from "../../components/ui/Button";

const LOS_FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: "8-Step Application Form",
    description:
      "Capture borrower details through a structured 8-step journey — Customer KYC, Address, Associates, Income, Liability, Collateral, Bank Details, and Photos. Every step saves independently so no data is lost mid-way.",
    color: "bg-blue-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Aadhaar & PAN Capture with OCR",
    description:
      "Collect Aadhaar (front & back) and PAN card for every applicant and co-applicant. OCR auto-extracts Aadhaar number and date of birth from uploaded ID images so field agents save time on manual entry.",
    color: "bg-emerald-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 8 10 11 14 7 17 10" />
      </svg>
    ),
    title: "CIBIL Score & Report Verification",
    description:
      "Upload the CIBIL report PDF and enter the score for the primary applicant and every co-applicant. Progress is tracked per member so Back Office teams know exactly who is pending verification.",
    color: "bg-violet-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M8.46 8.46a5 5 0 0 0 0 7.07" />
      </svg>
    ),
    title: "Tele-Verification",
    description:
      "Back Office agents conduct tele-verification calls and log a structured review with description before any file is moved to approval. Progress is tracked and the step must be 100% complete before the file advances.",
    color: "bg-amber-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Salesman to Manager Approval Flow",
    description:
      "The Salesman submits a report with recommended principal, interest rate, tenure and EMI. The manager reviews, can modify amounts, and either approves or rejects with remarks. Real-time notifications go to the file creator on every status change.",
    color: "bg-red-50",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Login Fee Collection on Approval",
    description:
      "Once a file is approved, agents collect Login Charges, File Charges and Other Charges directly through the platform. Fee collection is gated — a file cannot proceed to LMS loan creation until payment is recorded.",
    color: "bg-sky-50",
  },
];

const LOS_FAQ = [
  {
    question: "What does the 8-step application form capture?",
    answer:
      "The application walks through eight steps — Customer KYC, Address, Associates, Income, Liability, Collateral, Bank Details, and Photos. Each step saves independently, so no data is lost mid-way.",
  },
  {
    question: "How are Aadhaar and PAN handled during KYC?",
    answer:
      "You collect Aadhaar (front and back) and PAN for every applicant and co-applicant, and OCR auto-extracts the Aadhaar number and date of birth from the uploaded images to cut down manual entry.",
  },
  {
    question: "How is CIBIL verification done?",
    answer:
      "For the primary applicant and each co-applicant, you upload the CIBIL report PDF and enter the score. Progress is tracked per member so Back Office teams can see exactly who is still pending.",
  },
  {
    question: "What happens during tele-verification?",
    answer:
      "Back Office agents place tele-verification calls and log a structured review with a description before a file moves to approval. The step must be fully complete before the file can advance.",
  },
  {
    question: "How does the salesman-to-manager approval flow work?",
    answer:
      "The salesman submits a report with recommended principal, interest rate, tenure, and EMI. The manager reviews, can modify the amounts, and approves or rejects with remarks, while the file creator gets real-time notifications on every status change.",
  },
  {
    question: "When are login fees collected?",
    answer:
      "After a file is approved, agents record Login Charges, File Charges, and Other Charges through the platform. Fee collection is gated, so a file cannot proceed to LMS loan creation until payment is recorded.",
  },
];

export default function LoanOriginationPage() {
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
          "/reveal/6.jpg",
          "/reveal/4.jpg",
          "/reveal/5.jpg",
        ]}
        heroIndex={2}
        heading={
          <>
            Capture, verify, and approve loans on one platform — an 8-step
            digital application with OCR-driven Aadhaar &amp; PAN KYC, CIBIL
            checks, tele-verification, and a clean salesman-to-manager approval
            flow with login-fee collection.
          </>
        }
        loaderLabel="Loan Origination System"
        socialLabel="Get started"
        links={[
          { label: "Request a demo", href: "/contactus" },
          { label: "Talk to sales", href: "/contactus" },
        ]}
      />

      {/* Feature Grid */}
      <ReusableFeatures
        items={LOS_FEATURES}
        eyebrow="Origination Suite"
        heading={
          <>
            Everything you need to{" "}
            <span className="text-secondaryColor">disburse faster</span>
          </>
        }
        className="mt-20 mb-24"
      />

      {/* Product Showcase — tabbed, hover to enlarge */}
      <ReusableShowcase
        heading="Application to sanction?"
        headingHighlight="Handled end-to-end."
        subtitle="A complete Loan Origination System — from first form to final approval"
        theme="cool"
        ctaText="Book a Demo"
        tabs={[
          {
            label: "LOS Dashboard",
            title: "Your Entire Loan Portfolio Tracked in One View",
            description:
              "The LOS Dashboard gives managers and admins a live pulse on every dimension of the lending operation — from active files and employee performance to branch-wise disbursements and due case alerts.",
            img: "/los/dashbord.png",
          },
          {
            label: "Application Journey",
            title: "8-Step Application Form That Captures Everything",
            description:
              "Walk loan applicants through a structured 8-step journey — from basic KYC to bank details and photo documentation. Each step saves independently so nothing is lost mid-way.",
            img: "/los/8stuep-applocation%20journy.png",
          },
          {
            label: "Back Office",
            title: "Multi-Stage Verification Before Any File Moves Forward",
            description:
              "Back Office is the internal review pipeline — a structured checklist of 5 verification stages each with its own progress tracker. Every file must clear all stages before approval.",
            img: "/pipeline_overview.png",
          },
          {
            label: "File Status & Approval",
            title: "Structured Approval Flow from Sales to Sanction",
            description:
              "Every file follows a clearly defined status journey — Pending, Review, Approved or Rejected, with an optional Task Pending state. Salesman reports, final approval amounts, and remarks are captured at every stage.",
            img: "/lending_overview_minimal.png",
          },
          {
            label: "Credit & Liability",
            title: "Deep-Dive Credit Profiling Before Every Decision",
            description:
              "The Credit module captures a borrower's full financial picture — income sources, existing liabilities, family expenses, and collateral details — giving underwriters everything needed to make informed credit decisions.",
            img: "/bank_loan_handshake.png",
          },
        ]}
      />

      {/* FAQ Section */}
      <ReusableFAQ
        title="Got a Question?"
        subtitle="Everything you need to know about the Fundflick Loan Origination System."
        items={LOS_FAQ}
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
            Originate loans faster
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            See how Fundflick LOS takes an application from capture to disbursal
            without the manual handoffs.
          </p>
          <Button
            href="/contactus"
            variant="brand"
            className="px-8 py-3.5 text-sm relative z-10"
          >
            Start originating
          </Button>
        </div>
      </div>
    </div>
  );
}
