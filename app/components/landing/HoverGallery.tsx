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
      if (index === 0) return; // Keep Card 0 at base

      // Set initial offscreen/stacked position for cards
      gsap.set(card, { yPercent: 100, scale: 0.95 });

      // Animate card sliding up
      tl.to(
        card,
        {
          yPercent: 0,
          scale: 1,
          duration: 1,
          ease: "none",
        },
        `card-${index}`
      );

      // Simultaneously animate scaling/dimming/offsetting of all previous cards
      for (let i = 0; i < index; i++) {
        const prevCard = cards[i];
        const scaleVal = 0.96 - (index - i - 1) * 0.03;
        const opacityVal = 0.8 - (index - i - 1) * 0.15;
        const yOffset = -20 * (index - i);

        tl.to(
          prevCard,
          {
            scale: scaleVal,
            opacity: opacityVal,
            y: yOffset,
            transformOrigin: "top center",
            duration: 1,
            ease: "none",
          },
          `card-${index}`
        );
      }
    });

    // Create ScrollTrigger to scrub the timeline over the native sticky section
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80px",
      end: "bottom bottom",
      scrub: 1,
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
      className="relative w-full h-[420vh] bg-slate-50 border-t border-slate-100"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* Native Sticky Wrapper container for pinning effect */}
      <div className="sticky top-[80px] w-full h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden py-10">
        
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
            Manage your entire loan operations lifecycle. From origination and underwriting to automated collections, servicing, and ledger accounting.
          </p>
        </div>

        {/* Absolute Stacking Cards Container */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 relative z-10 flex-grow flex items-center justify-center">
          <div className="relative w-full h-[480px] sm:h-[420px] md:h-[460px] lg:h-[380px] mx-auto">
            {STACK_CARDS.map((card, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                  zIndex: (index + 1) * 10,
                }}
              >
                <div
                  className="w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                    border:
                      card.bgColor === "#ffffff"
                        ? "1px solid rgba(0, 0, 0, 0.08)"
                        : "1px solid rgba(19, 28, 51, 0.06)",
                    boxShadow:
                      card.bgColor === "#ffffff"
                        ? "0 20px 40px -15px rgba(0,0,0,0.06), 0 4px 12px -5px rgba(0,0,0,0.03)"
                        : "0 25px 50px -12px rgba(19,28,51,0.15), 0 8px 20px -8px rgba(19,28,51,0.1)",
                  }}
                >
                  {/* Card Padding */}
                  <div className="p-5 md:p-8 lg:p-10 h-full flex flex-col justify-between">
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[9px] md:text-xs font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor:
                            card.textColor === "#ffffff"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.05)",
                          color:
                            card.textColor === "#ffffff"
                              ? "rgba(255, 255, 255, 0.6)"
                              : "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor:
                              card.bgColor === "#131c33"
                                ? "#38bdf8"
                                : "#2b7fff",
                          }}
                        />
                        0{index + 1} / 0{STACK_CARDS.length}
                      </div>

                      {card.badge ? (
                        <span
                          className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.15)"
                               : "rgba(0, 0, 0, 0.06)",
                            borderColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.2)"
                               : "rgba(0, 0, 0, 0.12)",
                            color: card.textColor,
                          }}
                        >
                          {card.badge}
                        </span>
                      ) : card.comingSoon ? (
                        <span
                          className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.05)"
                               : "rgba(0, 0, 0, 0.03)",
                            borderColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.1)"
                               : "rgba(0, 0, 0, 0.08)",
                            color: card.textColor,
                          }}
                        >
                          Coming Soon
                        </span>
                      ) : (
                        <span
                          className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                          style={{
                            backgroundColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.1)"
                               : "rgba(0, 0, 0, 0.06)",
                            borderColor:
                              card.textColor === "#ffffff"
                               ? "rgba(255, 255, 255, 0.15)"
                               : "rgba(0, 0, 0, 0.12)",
                            color: card.textColor,
                          }}
                        >
                          Active Feature
                        </span>
                      )}
                    </div>

                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center flex-grow">
                      {/* Left Column: Text & Features Info */}
                      <div className="lg:col-span-7 flex flex-col justify-center">
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight mb-1 md:mb-2 leading-tight">
                          {card.title}
                        </h3>
                        <p
                          className="text-[11px] md:text-xs lg:text-sm mb-3 md:mb-4 leading-relaxed max-w-xl"
                          style={{
                            color:
                              card.textColor === "#ffffff"
                                ? "rgba(255, 255, 255, 0.8)"
                                : "rgba(15, 23, 42, 0.8)",
                          }}
                        >
                          {card.subtitle}
                        </p>

                        {/* Features Detail Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                          {card.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex flex-col gap-0.5">
                              <span
                                className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider"
                                style={{
                                  color:
                                    card.textColor === "#ffffff"
                                      ? "rgba(255, 255, 255, 0.45)"
                                      : "rgba(15, 23, 42, 0.5)",
                                }}
                              >
                                {detail.label}
                              </span>
                              <span className="text-[10px] md:text-xs font-semibold leading-tight">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA Link */}
                        <div>
                          <Link
                            href="/contactus"
                            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider hover:underline group/btn"
                            style={{ color: card.textColor }}
                          >
                            {card.comingSoon ? "Request Early Access" : "Learn More"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-3 h-3 transition-transform group-hover/btn:translate-x-1"
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

                      {/* Right Column: Visual Mockup Box */}
                      <div className="lg:col-span-5 flex justify-center hidden sm:flex">
                        <div
                          className={`w-full max-w-[280px] lg:max-w-none h-[120px] md:h-[150px] lg:h-[180px] rounded-xl overflow-hidden border relative shadow-sm transition-transform duration-500 hover:scale-[1.02] flex items-center justify-center`}
                          style={{
                            backgroundColor:
                              card.img === "/logo.png"
                                ? "#ffffff"
                                : card.textColor === "#ffffff"
                                ? "rgba(255, 255, 255, 0.08)"
                                : "rgba(0, 0, 0, 0.03)",
                            borderColor:
                              card.textColor === "#ffffff"
                                ? "rgba(255, 255, 255, 0.15)"
                                : "rgba(0, 0, 0, 0.08)",
                          }}
                        >
                          <img
                            src={card.img}
                            alt={card.title}
                            className={`select-none pointer-events-none ${
                              card.img === "/logo.png"
                                ? "max-h-[80%] max-w-[80%] object-contain p-4"
                                : "w-full h-full object-cover"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer spacer/info for styling */}
        <div className="max-w-6xl mx-auto px-6 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest relative z-10 animate-pulse">
          Scroll to view capabilities ↓
        </div>
      </div>
    </section>
  );
}
