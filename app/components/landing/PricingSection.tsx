"use client";

import React, { useEffect, useRef } from "react";
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
  { id: 5, text: "Automates application, approval, and disbursement processes" },
  { id: 6, text: "Seamless integration with banking and APIs" },
  { id: 7, text: "Customizable approval workflows and decision rules" },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = leftColumnRef.current?.querySelectorAll(".overview-item-card");
      const title = leftColumnRef.current?.querySelector(".overview-title");
      const rightCard = rightCardRef.current;

      if (!items || !rightCard || !title) return;

      // Reset states
      gsap.set(title, { opacity: 0, y: 20 });
      gsap.set(items, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(rightCard, { opacity: 0, x: 40, scale: 0.95 });

      // Staggered reveal timeline
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
        "-=0.4"
      )
      .to(
        rightCard,
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        "-=0.6"
      );

      // Button hover animation
      const button = rightCard.querySelector(".pricing-cta-button");
      if (button) {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.03,
            backgroundColor: "#131c33", // deep navy
            color: "#ffffff",
            boxShadow: "0 10px 25px -5px rgba(19, 28, 51, 0.25)",
            duration: 0.3,
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            backgroundColor: "#2b7fff", // electric blue
            color: "#ffffff",
            boxShadow: "none",
            duration: 0.3,
          });
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans"
    >
      {/* Radial grid dot background following project guidelines */}
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
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
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

        {/* Right Column: Pricing Rounded Card (Updated Content) */}
        <div ref={rightCardRef} className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] bg-white border border-slate-200/80 rounded-[36px] p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            
            {/* Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight mb-8">
                Pricing & Enrollment
              </h3>

              {/* Information list based exactly on screenshot content */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light font-sans mb-10">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Status</span>
                  <span className="font-bold text-slate-900">Application Based.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Capacity</span>
                  <span className="font-bold text-slate-900">Limited To 2,000 Students Per Year.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>One-Time Investment</span>
                  <span className="font-bold text-[#2b7fff]">£699 (VAT Included)</span>
                </div>
                <div className="pt-2 text-slate-500 italic">
                  Includes Full 90-Day Program, Live Mentor Access.
                </div>
              </div>
            </div>

            {/* CTA Button styled with electric blue accent #2b7fff */}
            <button className="pricing-cta-button w-full py-4 rounded-2xl bg-[#2b7fff] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 font-display cursor-pointer">
              Join Waiting List
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
