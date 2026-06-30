"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface OverviewItem {
  id: number;
  text: string;
}

const OVERVIEW_ITEMS: OverviewItem[] = [
  { id: 1, text: "Efficient end-to-end loan management platform" },
  { id: 2, text: "Secure document collection and management system" },
  { id: 3, text: "Compliance with regulatory and audit standards" },
  { id: 4, text: "Detailed reporting for insights and analysis" },
  {
    id: 5,
    text: "Automates application, approval, and disbursement processes",
  },
  { id: 6, text: "Seamless integration with banking and APIs" },
  { id: 7, text: "Customizable approval workflows and decision rules" },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = leftColumnRef.current?.querySelectorAll(
        ".overview-item-card",
      );
      const title = leftColumnRef.current?.querySelector(".overview-title");
      const rightCol = rightColumnRef.current;

      if (!items || !rightCol || !title) return;

      // Reset states for staggered entry
      gsap.set(title, { opacity: 0, y: 20 });
      gsap.set(items, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(rightCol, { opacity: 0, x: 40, scale: 0.95 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.2)",
          },
          "-=0.4",
        )
        .to(
          rightCol,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative w-full  py-12 md:py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans"
    >
      {/* Background visuals */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column: Comprehensive Loan System Overview */}
        <div ref={leftColumnRef} className="lg:col-span-7 flex flex-col">
          <h2 className="overview-title text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight mb-8">
            Comprehensive Loan System Overview
          </h2>

          {/* Grid of 7 Items (Cards with right chevron) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OVERVIEW_ITEMS.map((item) => (
              <div
                key={item.id}
                className="overview-item-card bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-[#2b7fff]/40 shadow-sm rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 select-none group"
              >
                {/* Right Arrow/Chevron */}
                <div className="text-[#2b7fff] text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                {/* Text Content */}
                <span className="text-slate-800 text-xs sm:text-sm font-light leading-snug">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Clean & Simple Image mockup showing the newly generated minimal illustration */}
        <div
          ref={rightColumnRef}
          className="lg:col-span-5 w-full flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-[32px] p-4 shadow-xl flex flex-col items-center justify-center relative group transition-transform duration-500 hover:scale-[1.02] overflow-hidden">
            <img
              src="/lending_overview_minimal.png"
              alt="Lending System Overview Illustration"
              className="w-full h-auto object-contain rounded-2xl select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
