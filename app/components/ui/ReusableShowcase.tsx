"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import HoverZoomImage from "./HoverZoomImage";

export interface ShowcaseTab {
  label: string;
  title: string;
  description: string;
  img: string;
  /** Disabled tab — not clickable, shows a yellow "coming soon" dot */
  disabled?: boolean;
}

interface ReusableShowcaseProps {
  heading: string;
  headingHighlight?: string;
  subtitle?: string;
  tabs: ShowcaseTab[];
  /** Background gradient preset */
  theme?: "warm" | "cool" | "neutral";
  /** CTA button text */
  ctaText?: string;
  ctaHref?: string;
}

const THEME_MAP = {
  warm: {
    bg: "bg-gradient-to-b from-[#fff5f0] to-[#fef7f4]",
    dots: "bg-[radial-gradient(#f0d5c5_1px,transparent_1px)]",
    cardBorder: "border-rose-100/80",
    cardShadow: "shadow-[0_20px_60px_rgba(200,100,80,0.08)]",
    cardGlow: "from-rose-50/40 via-transparent to-orange-50/30",
  },
  cool: {
    bg: "bg-gradient-to-b from-[#f0f4ff] to-[#f5f7ff]",
    dots: "bg-[radial-gradient(#c5d0f0_1px,transparent_1px)]",
    cardBorder: "border-indigo-100/80",
    cardShadow: "shadow-[0_20px_60px_rgba(80,100,200,0.08)]",
    cardGlow: "from-indigo-50/40 via-transparent to-blue-50/30",
  },
  neutral: {
    bg: "bg-gradient-to-b from-slate-50 to-white",
    dots: "bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]",
    cardBorder: "border-slate-200/80",
    cardShadow: "shadow-[0_20px_60px_rgba(0,0,0,0.04)]",
    cardGlow: "from-slate-50/40 via-transparent to-slate-50/30",
  },
};

export default function ReusableShowcase({
  heading,
  headingHighlight,
  subtitle,
  tabs,
  theme = "warm",
  ctaText = "Book a Demo",
  ctaHref = "/contactus",
}: ReusableShowcaseProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const t = THEME_MAP[theme];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  // Animate content on tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" },
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 20, scale: 0.97 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" },
      );
    }
  }, [activeTab]);

  const currentTab = tabs[activeTab];

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 md:py-28 ${t.bg} relative overflow-hidden`}
    >
      {/* Subtle background pattern */}
      <div
        className={`absolute inset-0 ${t.dots} [background-size:28px_28px] opacity-30 pointer-events-none`}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {heading}{" "}
            {headingHighlight && (
              <span className="text-secondaryColor">{headingHighlight}</span>
            )}
          </h2>
          {subtitle && (
            <p className="text-slate-500 text-sm md:text-base font-light max-w-lg mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14 md:mb-16">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => !tab.disabled && setActiveTab(idx)}
              disabled={tab.disabled}
              aria-disabled={tab.disabled}
              title={tab.disabled ? "Coming soon" : undefined}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 select-none inline-flex items-center gap-2 ${
                tab.disabled
                  ? "bg-white text-slate-400 border-slate-200 opacity-70 cursor-not-allowed"
                  : activeTab === idx
                    ? "bg-[#131c33] text-white border-[#131c33] shadow-lg shadow-slate-900/10 cursor-pointer"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              }`}
            >
              {tab.label}
              {tab.disabled && (
                <span className="h-2 w-2 rounded-full bg-amber-400" />
              )}
            </button>
          ))}
        </div>

        {/* Content: Left text + Right image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div ref={contentRef} className="flex flex-col gap-5">
            <h3
              className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {currentTab.title}
            </h3>
            <p className="text-slate-500 text-sm md:text-[15px] leading-relaxed font-light max-w-md">
              {currentTab.description}
            </p>
            <div className="mt-2">
              <Button
                href={ctaHref}
                variant="primary"
                className="px-6 py-3 text-xs rounded-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
                {ctaText}
              </Button>
            </div>
          </div>

          {/* Right: Image Mockup */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div
              className={`w-full max-w-[520px] bg-white border ${t.cardBorder} rounded-[28px] p-3 ${t.cardShadow} relative overflow-hidden`}
            >
              {/* Glow behind image */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${t.cardGlow} pointer-events-none rounded-[28px]`}
              />
              <HoverZoomImage
                src={currentTab.img}
                alt={currentTab.title}
                className="relative z-10"
                imgClassName="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
