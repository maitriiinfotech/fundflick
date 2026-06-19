"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface CardData {
  title: string;
  subtitle: string;
  img: string;
  bgColor: string;
  textColor: string;
  comingSoon?: boolean;
  badge?: string;
  details: { label: string; value: string }[];
}

const STACK_CARDS: CardData[] = [
  {
    title: "Loan Origination System",
    subtitle:
      "Automate loan application processing, credit check evaluation, and disbursals.",
    img: "/loan_origination.png",
    bgColor: "#d4f73f", // Vibrant Lime Green
    textColor: "#131c33",
    details: [
      { label: "Verification", value: "Instant eKYC & Bureau Fetch" },
      { label: "Target Segment", value: "SMEs & Retail Borrowers" },
      { label: "Disbursals", value: "Instant bank transfers" },
      { label: "Integration", value: "REST APIs & Webhooks" },
    ],
  },
  {
    title: "Loan Management System",
    subtitle:
      "Comprehensive loan books, custom EMI schedules, ledgers, and servicing tools.",
    img: "/lms_hrms.png",
    bgColor: "#fb7185", // Rose Pink
    textColor: "#131c33",
    comingSoon: true,
    details: [
      { label: "Interest Engine", value: "Simple, Reducing & Custom models" },
      { label: "Statements", value: "Instant NOC & SOA generation" },
      { label: "Foreclosure", value: "Auto pre-closure calculations" },
      { label: "Status", value: "Beta testing with select partners" },
    ],
  },

  {
    title: "Collection System",
    subtitle:
      "Automated payment tracking, auto-debits, and instant EMI reminders.",
    img: "/collection.png",
    bgColor: "#131c33", // Deep Navy
    textColor: "#ffffff",
    details: [
      { label: "Gateway", value: "UPI, Netbanking & NACH" },
      { label: "Dunning", value: "WhatsApp & SMS auto-reminders" },
      { label: "Auto-Split", value: "Dynamic penalty calculations" },
      { label: "Recovery Rate", value: "Avg. 98% success rate" },
    ],
  },
  {
    title: "Task Management",
    subtitle:
      "Streamline daily operations, assign tasks to agents, and monitor lead pipelines.",
    img: "/task_management.png",
    bgColor: "#ffffff", // Pure White
    textColor: "#131c33",
    details: [
      { label: "Visual Boards", value: "Kanban & Lead Stages" },
      { label: "Assignment", value: "Auto-allocation rules" },
      { label: "SLA Tracker", value: "Turnaround Time (TAT) alerts" },
      { label: "Collaboration", value: "Shared comments & files" },
    ],
  },

  {
    title: "Smart Reports",
    subtitle:
      "In-depth business performance metrics, collection trends, and live analytics dashboards.",
    img: "/reports.png",
    bgColor: "#38bdf8", // Sky Blue
    textColor: "#131c33",
    details: [
      { label: "Analytics", value: "Real-time NPA & Yield charts" },
      { label: "Export formats", value: "Excel, PDF, CSV & JSON" },
      { label: "Schedules", value: "Daily automated email reports" },
      { label: "Security", value: "Role-based report access" },
    ],
  },

  {
    title: "Bookkeeping & Accounts",
    subtitle:
      "Accurate transaction logging, automated ledger entries, and audit compliance.",
    img: "/accounting.png",
    bgColor: "#c084fc", // Purple/Violet
    textColor: "#131c33",
    comingSoon: true,
    details: [
      { label: "Ledger", value: "Double-entry compliance tracking" },
      { label: "Taxation", value: "GST & TDS worksheets" },
      { label: "Audits", value: "One-click trial balance export" },
      { label: "Status", value: "In active development" },
    ],
  },
  {
    title: "Unified Operations Suite",
    subtitle:
      "All 6 capabilities are integrated modules of one single, seamless ecosystem built to power your operations.",
    img: "/logo.png",
    bgColor: "#0f172a", // Premium Dark Slate
    textColor: "#ffffff",
    badge: "Fundflick Suite",
    details: [
      { label: "Integration", value: "Unified Database & SSO" },
      { label: "Sync Speed", value: "Real-time, zero lag" },
      { label: "Data Flow", value: "Cross-module automation" },
      { label: "Setup", value: "Plug & play modules" },
    ],
  },
];

const COVER_CARD: CardData = {
  title: "Fundflick Playbook",
  subtitle:
    "Explore the core capabilities of the Fundflick digital lending ecosystem. Turn the pages to view our modules.",
  img: "/logo.png",
  bgColor: "#131c33", // Dark Navy cover
  textColor: "#ffffff",
  badge: "Product Catalog",
  details: [
    { label: "Edition", value: "2026 Release" },
    { label: "Architecture", value: "API-First & Secure" },
    { label: "Access", value: "Enterprise Ready" },
    { label: "Standard", value: "ISO 27001 Certified" },
  ],
};

const BACK_COVER_CARD: CardData = {
  title: "Empower Your Lending Operations",
  subtitle:
    "Transform your workflows, eliminate manual checks, and automate collections. Partner with Fundflick to elevate your productivity.",
  img: "/logo.png",
  bgColor: "#131c33", // Dark Navy back cover front-side
  textColor: "#ffffff",
  badge: "Get Started Today",
  details: [
    { label: "Deployment", value: "Cloud or On-Premise" },
    { label: "SLA", value: "99.9% Uptime Guarantee" },
    { label: "Support", value: "24/7 Dedicated Account Lead" },
    { label: "Compliance", value: "RBI & Auditing Compliant" },
  ],
};

const PLAYBOOK_CARDS = [COVER_CARD, ...STACK_CARDS, BACK_COVER_CARD];

export default function HoverGallery2() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftLiningRef = useRef<HTMLDivElement>(null);
  const rightLiningRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const section = sectionRef.current;

    if (!section || cards.length === 0) return;

    // The 3D book is desktop-only — skip all pinning/animation on mobile.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    // Create GSAP ScrollTrigger timeline
    const tl = gsap.timeline();

    // Initial state: closed book on the right side
    gsap.set(leftLiningRef.current, { opacity: 0 });
    gsap.set(rightLiningRef.current, { opacity: 1 });
    gsap.set(spineRef.current, { opacity: 0 });

    cards.forEach((card, index) => {
      // Set initial page state (closed stack on the right side)
      gsap.set(card, {
        rotateY: 0,
        z: 0,
        zIndex: (cards.length - index) * 10,
        transformOrigin: "left center",
      });

      const frontShadow = card.querySelector(".front-shadow");
      const backShadow = card.querySelector(".back-shadow");

      gsap.set(frontShadow, { opacity: 0 });
      gsap.set(backShadow, { opacity: 0.6 });

      const pageTl = gsap.timeline();

      // First half of flip (0 to -90 deg): Lift page & shadow fade in
      pageTl
        .to(
          card,
          {
            rotateY: -90,
            z: 220,
            ease: "power2.out",
            duration: 0.5,
          },
          0,
        )
        .to(
          frontShadow,
          {
            opacity: 0.6,
            ease: "power2.out",
            duration: 0.5,
          },
          0,
        );

      // Special handling for the very first page flip (index 0 - Book Cover Page)
      // As the cover page opens, we fade in the left lining & the spine
      if (index === 0) {
        pageTl
          .to(
            leftLiningRef.current,
            {
              opacity: 1,
              ease: "power2.out",
              duration: 0.5,
            },
            0,
          )
          .to(
            spineRef.current,
            {
              opacity: 1,
              ease: "power2.out",
              duration: 0.5,
            },
            0,
          );
      }

      // Special handling for the final page flip (Back Cover Page)
      // As the back cover closes on the left, we fade out the right lining & spine
      if (index === cards.length - 1) {
        pageTl
          .to(
            rightLiningRef.current,
            {
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.5,
            },
            0.5,
          )
          .to(
            spineRef.current,
            {
              opacity: 0,
              ease: "power2.inOut",
              duration: 0.5,
            },
            0.5,
          );
      }

      // Midpoint stack switch
      pageTl
        .set(card, { zIndex: index * 10 })

        // Second half of flip (-90 to -180 deg): Settle page & shadow fade out
        .to(
          card,
          {
            rotateY: -180,
            z: 0,
            ease: "power2.in",
            duration: 0.5,
          },
          0.5,
        )
        .to(
          backShadow,
          {
            opacity: 0,
            ease: "power2.in",
            duration: 0.5,
          },
          0.5,
        );

      tl.add(pageTl, index * 1.2);
    });

    // Create ScrollTrigger to scrub timeline over sticky section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80px",
      end: "bottom bottom",
      scrub: 1.2,
      animation: tl,
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full lg:h-[520vh] bg-slate-50 border-t border-slate-100"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* Sticky container for pinning */}
      <div className="lg:sticky lg:top-[80px] w-full lg:h-[calc(100vh-80px)] flex flex-col lg:justify-between lg:overflow-hidden py-12 lg:py-8">
        {/* Background visual graphics */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-secondaryColor/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondaryColor font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1">
            Core Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            End-to-End{" "}
            <span className="text-secondaryColor">Lending Suite</span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Manage your entire loan operations lifecycle. Turn the pages of our
            playbook to explore our modules.
          </p>
        </div>

        {/* 3D Book Container */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex-grow hidden lg:flex items-center justify-center overflow-visible">
          {/* Proportional scaling wrapper for responsiveness */}
          <div className="relative w-[960px] h-[480px] max-w-full origin-center transition-transform duration-300 scale-[0.4] min-[390px]:scale-[0.43] min-[440px]:scale-[0.48] min-[520px]:scale-[0.58] sm:scale-[0.72] md:scale-[0.88] lg:scale-100 flex items-center justify-center">
            {/* Book Base/Backing Cover - Split into Left and Right Wings to prevent left side visibility when closed */}
            <div
              className="absolute inset-0 w-full h-full flex overflow-visible pointer-events-none"
              style={{ transform: "translateZ(-12px)" }}
            >
              {/* Left Cover Backing Wing (Fades in as book opens) */}
              <div
                ref={leftLiningRef}
                className="w-1/2 h-full rounded-l-[32px] bg-[#1a2238] border-2 border-r-0 border-slate-700 shadow-2xl relative overflow-hidden will-change-opacity"
              >
                {/* Left Inner Cover lining background */}
                <div className="absolute inset-0 bg-[#111726] opacity-65" />
              </div>

              {/* Right Cover Backing Wing (Fades out when Back Cover flips) */}
              <div
                ref={rightLiningRef}
                className="w-1/2 h-full rounded-r-[32px] bg-[#1a2238] border-2 border-l-0 border-slate-700 shadow-2xl relative overflow-hidden will-change-opacity"
              >
                {/* Right Inner Cover lining background */}
                <div className="absolute inset-0 bg-[#111726] opacity-65" />
              </div>

              {/* Spine shadow/binder - Fades in as book opens */}
              <div
                ref={spineRef}
                className="absolute inset-y-0 left-1/2 w-[12px] -translate-x-1/2 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-slate-950/80 shadow-[0_0_15px_rgba(0,0,0,0.6)] border-x border-slate-950/20 will-change-opacity z-20"
              />
            </div>

            {/* Book Pages */}
            {PLAYBOOK_CARDS.map((card, index) => {
              const isFirst = index === 0;
              const isLast = index === PLAYBOOK_CARDS.length - 1;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute w-[50%] h-full top-0 right-0 will-change-transform"
                  style={{
                    left: "50%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* FRONT FACE (Right Side) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-r-[24px] overflow-hidden border border-l-0 border-slate-200/10 shadow-lg flex flex-col justify-between p-7 md:p-9"
                    style={{
                      backfaceVisibility: "hidden",
                      backgroundColor: card.bgColor,
                      color: card.textColor,
                    }}
                  >
                    <div className="front-shadow absolute inset-0 bg-black pointer-events-none opacity-0 transition-opacity duration-75" />

                    {/* Header Row */}
                    <div className="flex justify-between items-center z-10">
                      <div
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/5"
                        style={{
                          backgroundColor:
                            card.textColor === "#ffffff"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.05)",
                          color:
                            card.textColor === "#ffffff"
                              ? "rgba(255, 255, 255, 0.7)"
                              : "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {isFirst
                          ? "Cover Page"
                          : isLast
                            ? "Back Cover"
                            : `0${index} / 0${STACK_CARDS.length}`}
                      </div>

                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current/10 bg-current/5">
                        {card.badge ||
                          (card.comingSoon ? "Coming Soon" : "Active Feature")}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="my-auto z-10">
                      {isFirst ? (
                        <div className="text-center md:text-left">
                          <span className="text-[10px] tracking-[0.25em] font-extrabold uppercase opacity-55 block mb-1">
                            Operational Guide
                          </span>
                          <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs md:text-sm mt-2 opacity-80 leading-relaxed max-w-sm">
                            {card.subtitle}
                          </p>
                        </div>
                      ) : isLast ? (
                        <div>
                          <span className="text-[10px] tracking-[0.25em] font-extrabold uppercase opacity-55 block mb-1">
                            Next Steps
                          </span>
                          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs md:text-sm leading-relaxed opacity-85">
                            {card.subtitle}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs md:text-sm leading-relaxed opacity-85">
                            {card.subtitle}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Visual Mockup Container */}
                    <div
                      className={`h-[160px] rounded-xl border border-current/10 bg-current/5 p-4 flex items-center justify-center relative overflow-hidden shadow-inner z-10 ${
                        isFirst || isLast ? "bg-white/5 border-white/10" : ""
                      }`}
                    >
                      <img
                        src={card.img}
                        alt={card.title}
                        className={`select-none pointer-events-none transition-transform duration-500 hover:scale-[1.03] ${
                          card.img === "/logo.png"
                            ? "max-h-[75%] max-w-[75%] object-contain"
                            : "w-full h-full object-cover rounded-lg"
                        } ${
                          card.img === "/logo.png" && card.textColor === "#ffffff"
                            ? "brightness-0 invert"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* BACK FACE (Left Side when flipped) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-l-[24px] overflow-hidden border border-r-0 border-slate-200/10 shadow-lg flex flex-col justify-between p-7 md:p-9"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: card.bgColor,
                      color: card.textColor,
                    }}
                  >
                    <div className="back-shadow absolute inset-0 bg-black pointer-events-none opacity-50 transition-opacity duration-75" />

                    {/* Header Row */}
                    <div className="flex justify-between items-center z-10 border-b border-current/10 pb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                        {isFirst
                          ? "Introduction"
                          : isLast
                            ? "Official Handbook"
                            : "Technical Specs"}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">
                        {isFirst
                          ? "Overview"
                          : isLast
                            ? "Back Cover"
                            : `Module 0${index}`}
                      </span>
                    </div>

                    {/* Specifications Details Grid */}
                    <div className="flex-grow flex flex-col justify-center gap-3 z-10 my-4">
                      {isFirst ? (
                        <div className="flex flex-col gap-2">
                          <span className="text-xs md:text-sm leading-relaxed opacity-90">
                            Welcome to the official{" "}
                            <strong>Fundflick Operating Suite Playbook</strong>.
                          </span>
                          <p className="text-[11px] md:text-xs opacity-75 leading-relaxed">
                            This guide describes our double-entry ledger
                            databases, real-time credit decision systems, Dun &
                            Bradstreet API checks, automated collections
                            engines, and our unified operations modules.
                          </p>
                        </div>
                      ) : isLast ? (
                        /* Style the back face of the last card as the actual outside Back Cover of the book */
                        <div className="flex flex-col items-center justify-center text-center gap-3 py-6 select-none">
                          <img
                            src="/logo.png"
                            alt="Fundflick"
                            className="max-h-[60px] object-contain opacity-90 brightness-0 invert"
                          />
                          <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-75 mt-2">
                            FUNDFLICK SUITE
                          </span>
                          <span className="text-[9px] opacity-40 max-w-[200px] leading-relaxed">
                            Complete Lending Operations & Servicing Platform.
                            All rights reserved © 2026.
                          </span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                          {card.details.map((detail, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex flex-col gap-1 border-l-2 border-current/25 pl-3"
                            >
                              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider opacity-65">
                                {detail.label}
                              </span>
                              <span className="text-xs md:text-[13px] font-semibold leading-tight">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-auto pt-3 border-t border-current/10 flex justify-between items-center z-10">
                      <span className="text-[9px] uppercase tracking-wider font-semibold opacity-50">
                        {isLast ? "Close Playbook" : "Fundflick Suite"}
                      </span>
                      <Link
                        href="/contactus"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline group/btn"
                        style={{ color: card.textColor }}
                      >
                        {isLast
                          ? "Contact Sales Team"
                          : card.comingSoon
                            ? "Request Early Access"
                            : "Explore Module"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Mobile: readable stacked cards (book is desktop-only) ===== */}
        <div className="lg:hidden mt-10 space-y-5 relative z-10">
          {STACK_CARDS.map((card, i) => {
            const dark = card.textColor === "#ffffff";
            return (
              <div
                key={i}
                className="rounded-2xl border border-black/5 p-6 shadow-sm"
                style={{ backgroundColor: card.bgColor, color: card.textColor }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                    Module 0{i + 1} / 0{STACK_CARDS.length}
                  </span>
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: dark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.06)",
                    }}
                  >
                    {card.badge ||
                      (card.comingSoon ? "Coming Soon" : "Active Feature")}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold tracking-tight mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-85 mb-4">
                  {card.subtitle}
                </p>
                <div
                  className="h-[160px] rounded-xl overflow-hidden mb-4 flex items-center justify-center"
                  style={{
                    backgroundColor: dark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className={
                      card.img === "/logo.png"
                        ? `max-h-[70%] max-w-[70%] object-contain ${
                            dark ? "brightness-0 invert" : ""
                          }`
                        : "w-full h-full object-cover"
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {card.details.map((d, di) => (
                    <div
                      key={di}
                      className="border-l-2 pl-3"
                      style={{
                        borderColor: dark
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(0,0,0,0.15)",
                      }}
                    >
                      <span className="block text-[8px] font-bold uppercase tracking-wider opacity-60">
                        {d.label}
                      </span>
                      <span className="block text-xs font-semibold leading-tight">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contactus"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                  style={{ color: card.textColor }}
                >
                  {card.comingSoon ? "Request Early Access" : "Explore Module"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer spacer/info for styling — desktop only */}
        <div className="hidden lg:block max-w-6xl mx-auto px-6 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest relative z-10 animate-pulse">
          Scroll down to open playbook, turn pages & close playbook ↓
        </div>
      </div>
    </section>
  );
}
