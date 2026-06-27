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

const LOS_FEATURES = [
  {
    title: "Digital Application Capture",
    description:
      "Collect borrower details, documents, and consent through configurable digital forms built for SME and retail journeys across web and mobile.",
  },
  {
    title: "Instant eKYC & Bureau",
    description:
      "Run eKYC verification and fetch CIBIL, Experian, and other bureau reports in real time before an application moves forward.",
  },
  {
    title: "Credit Scoring Engine",
    description:
      "Evaluate applicants against your own scorecards and bureau data to produce consistent, auditable credit decisions on every file.",
  },
  {
    title: "Underwriting Rules",
    description:
      "Configure policy checks, eligibility criteria, and exposure limits as rules so underwriting stays uniform across every loan product.",
  },
  {
    title: "Approval Routing",
    description:
      "Route applications to the right approver by amount, risk, or product, with clear queues and a full decision audit trail.",
  },
  {
    title: "Instant Disbursals",
    description:
      "Trigger instant bank transfers to approved borrowers and reconcile every disbursal automatically once final approval clears.",
  },
].map((f, i) => ({
  ...f,
  icon: FEATURE_ICON_SET[i],
  color: FEATURE_COLOR_SET[i],
}));

const LOS_FAQ = [
  {
    question: "Which borrower segments does the LOS support?",
    answer:
      "The platform is built for SME and retail lending, with application journeys, scoring, and underwriting that you can configure per product and segment.",
  },
  {
    question: "How does eKYC and bureau fetch work?",
    answer:
      "eKYC verification and bureau pulls from CIBIL and other agencies run in real time during the application, so decisions use current borrower data.",
  },
  {
    question: "Can we configure our own credit and underwriting policies?",
    answer:
      "Yes. You define scorecards, eligibility rules, exposure limits, and approval logic, and the engine applies them consistently to every application.",
  },
  {
    question: "How are disbursals handled?",
    answer:
      "Approved loans trigger instant bank transfers to the borrower account, and each disbursal is tracked and reconciled within the platform.",
  },
  {
    question: "Does the LOS integrate with our existing systems?",
    answer:
      "REST APIs and webhooks let you connect your core banking, CRM, and collection systems and receive real-time events at each stage of origination.",
  },
  {
    question: "Is the platform suitable for RBI-regulated NBFCs and banks?",
    answer:
      "Yes. Workflows, consent capture, and decision audit trails are designed to support the compliance and reporting needs of RBI-regulated lenders.",
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
            Capture, score, underwrite, and disburse loans on one platform —
            from digital application to instant bank transfer, with eKYC and
            bureau pulls built in.
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
            img: "/loan_origination.png",
          },
          {
            label: "Application Journey",
            title: "8-Step Application Form That Captures Everything",
            description:
              "Walk loan applicants through a structured 8-step journey — from basic KYC to bank details and photo documentation. Each step saves independently so nothing is lost mid-way.",
            img: "/lending_system_isometric.png",
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
