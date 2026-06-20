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
    title: "Loan Origination",
    subtitle: "Automate loan application processing, credit check evaluation, and disbursals.",
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
    title: "Task Management",
    subtitle: "Streamline daily operations, assign tasks to agents, and monitor lead pipelines.",
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
    title: "Collection System",
    subtitle: "Automated payment tracking, auto-debits, and instant EMI reminders.",
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
    title: "Smart Reports",
    subtitle: "In-depth business performance metrics, collection trends, and live analytics dashboards.",
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
    title: "Loan Management",
    subtitle: "Comprehensive loan books, custom EMI schedules, ledgers, and servicing tools.",
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
    title: "Bookkeeping & Accounts",
    subtitle: "Accurate transaction logging, automated ledger entries, and audit compliance.",
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
    subtitle: "All 6 capabilities are integrated modules of one single, seamless ecosystem built to power your operations.",
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

export default function HoverGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const section = sectionRef.current;

    if (!section || cards.length === 0) return;

    // Create GSAP ScrollTrigger timeline that scrubs along the scroll height of the parent section
    const tl = gsap.timeline();

    cards.forEach((card, index) => {
      // 1. Initial setup
      gsap.set(card, {
        rotateY: 0,
        z: 0,
        zIndex: (cards.length - index) * 10,
        transformOrigin: "left center"
      });

      // Target the shadows
      const frontShadow = card.querySelector(".front-shadow");
      const backShadow = card.querySelector(".back-shadow");

      // Setup initial shadow opacities
      gsap.set(frontShadow, { opacity: 0 });
      gsap.set(backShadow, { opacity: 0.6 });

      // Create page flip sub-timeline
      const pageTl = gsap.timeline();

      // First half of flip (0 to -90 deg): Lift page and fade front shadow
      pageTl.to(card, {
        rotateY: -90,
        z: 200,
        ease: "power2.out",
        duration: 0.5
      }, 0)
      .to(frontShadow, {
        opacity: 0.6,
        ease: "power2.out",
        duration: 0.5
      }, 0)
      
      // Midpoint: Swap z-index to place page on left-hand stack
      .set(card, { zIndex: index * 10 })

      // Second half of flip (-90 to -180 deg): Settle page and fade out back shadow
      .to(card, {
        rotateY: -180,
        z: 0,
        ease: "power2.in",
        duration: 0.5
      }, 0.5)
      .to(backShadow, {
        opacity: 0,
        ease: "power2.in",
        duration: 0.5
      }, 0.5);

      // Add page flip sequence to the main timeline with overlap/delay configuration
      tl.add(pageTl, index * 1.2);
    });

    // Create ScrollTrigger to scrub the timeline over the native sticky section
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
      id="features-mobile"
      ref={sectionRef}
      className="relative w-full h-[450vh] bg-slate-50 border-t border-slate-100 lg:hidden"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* Native Sticky Wrapper container for pinning effect */}
      <div className="sticky top-[80px] w-full h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden py-8">
        
        {/* Background visual graphics */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-secondaryColor/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondaryColor font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-1">
            Core Capabilities
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            End-to-End <span className="text-secondaryColor">Lending Suite</span>
          </h2>
          <p className="text-slate-500 mt-2 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
            Manage your entire loan operations lifecycle. Turn the pages of our playbook to explore our origination, task management, automated collections, servicing, and ledger modules.
          </p>
        </div>

        {/* 3D Book Container */}
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex-grow flex items-center justify-center overflow-visible">
          {/* Proportional scaling wrapper for mobile, tablet, and desktop */}
          <div className="relative w-[960px] h-[480px] max-w-full origin-center transition-transform duration-300 scale-[0.4] min-[390px]:scale-[0.43] min-[440px]:scale-[0.48] min-[520px]:scale-[0.58] sm:scale-[0.72] md:scale-[0.88] lg:scale-100 flex items-center justify-center">
            
            {/* Static Book Base/Cover (Behind pages) */}
            <div 
              className="absolute inset-0 w-full h-full rounded-[32px] bg-[#1a2238] border-2 border-slate-700 shadow-2xl flex overflow-hidden"
              style={{ transform: "translateZ(-10px)" }}
            >
              {/* Left Cover Lining */}
              <div className="w-1/2 h-full rounded-l-[30px] bg-[#111726] opacity-65 border-r border-slate-900/50" />
              {/* Right Cover Lining */}
              <div className="w-1/2 h-full rounded-r-[30px] bg-[#111726] opacity-65" />
              {/* Center Spine Binder Shadow */}
              <div className="absolute inset-y-0 left-1/2 w-[12px] -translate-x-1/2 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-slate-950/80 shadow-[0_0_15px_rgba(0,0,0,0.6)] border-x border-slate-950/20" />
            </div>

            {/* Interactive Double-Sided Pages */}
            {STACK_CARDS.map((card, index) => (
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
                {/* FRONT FACE (Shown on the right side of the book) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-r-[24px] overflow-hidden border border-l-0 border-slate-200/10 shadow-lg flex flex-col justify-between p-7 md:p-9"
                  style={{
                    backfaceVisibility: "hidden",
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                  }}
                >
                  {/* Front Shadow Overlay for 3D Lighting */}
                  <div className="front-shadow absolute inset-0 bg-black pointer-events-none opacity-0 transition-opacity duration-75" />

                  {/* Header Row */}
                  <div className="flex justify-between items-center z-10">
                    <div
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-black/5"
                      style={{
                        backgroundColor: card.textColor === "#ffffff" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                        color: card.textColor === "#ffffff" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      0{index + 1} / 0{STACK_CARDS.length}
                    </div>

                    <span
                      className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-current/10 bg-current/5"
                    >
                      {card.badge || (card.comingSoon ? "Coming Soon" : "Active Feature")}
                    </span>
                  </div>

                  {/* Title and Subtitle */}
                  <div className="my-auto z-10">
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 leading-tight">
                      {card.title}
                    </h3>
                    <p
                      className="text-xs md:text-sm leading-relaxed opacity-85"
                    >
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Visual Mockup Frame */}
                  <div 
                    className="h-[160px] rounded-xl border border-current/10 bg-current/5 p-4 flex items-center justify-center relative overflow-hidden shadow-inner z-10"
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className={`select-none pointer-events-none transition-transform duration-500 hover:scale-[1.03] ${
                        card.img === "/logo.png"
                          ? "max-h-[85%] max-w-[85%] object-contain"
                          : "w-full h-full object-cover rounded-lg"
                      }`}
                    />
                  </div>
                </div>

                {/* BACK FACE (Shown on the left side of the book when turned over) */}
                <div
                  className="absolute inset-0 w-full h-full rounded-l-[24px] overflow-hidden border border-r-0 border-slate-200/10 shadow-lg flex flex-col justify-between p-7 md:p-9"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                  }}
                >
                  {/* Back Shadow Overlay for 3D Lighting */}
                  <div className="back-shadow absolute inset-0 bg-black pointer-events-none opacity-50 transition-opacity duration-75" />

                  {/* Header Row */}
                  <div className="flex justify-between items-center z-10 border-b border-current/10 pb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">
                      Technical Specs
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider">
                      Module 0{index + 1}
                    </span>
                  </div>

                  {/* Specifications Details Grid */}
                  <div className="flex-grow flex flex-col justify-center gap-3 z-10 my-4">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      {card.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex flex-col gap-1 border-l-2 border-current/25 pl-3">
                          <span
                            className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider opacity-65"
                          >
                            {detail.label}
                          </span>
                          <span className="text-xs md:text-[13px] font-semibold leading-tight">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="mt-auto pt-3 border-t border-current/10 flex justify-between items-center z-10">
                    <span className="text-[9px] uppercase tracking-wider font-semibold opacity-50">
                      Fundflick Playbook
                    </span>
                    <Link
                      href="/contactus"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline group/btn"
                      style={{ color: card.textColor }}
                    >
                      {card.comingSoon ? "Request Early Access" : "Explore Module"}
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
            ))}
          </div>
        </div>

        {/* Footer spacer/info for styling */}
        <div className="max-w-6xl mx-auto px-6 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest relative z-10 animate-pulse">
          Scroll down to turn pages and close playbook ↓
        </div>
      </div>
    </section>
  );
}
