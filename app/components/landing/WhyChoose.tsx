"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Feature {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    id: 1,
    title: "Lightning Fast",
    desc: "Deploy instantly and run operations with sub-second computation latency and real-time state updates.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
  },
  {
    id: 2,
    title: "Secure & Compliant",
    desc: "Bank-grade data isolation, encrypted channels, and built-in audit trails that satisfy enterprise compliance.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
  },
  {
    id: 3,
    title: "Smart Analytics",
    desc: "Make decisions with accurate business performance metrics, data trends, and clear interactive dashboards.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
  {
    id: 4,
    title: "Collaborative",
    desc: "Work seamlessly across resources, assign tasks directly, and streamline standard team pipelines.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
];

export default function WhyChoose() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!container) return;

    // Reset styles for ScrollTrigger animation
    gsap.set(header, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 40, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 78%",
        toggleActions: "play none none none",
      },
    });

    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
    }).to(
      cards,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.2)",
      },
      "-=0.4"
    );

    // Hover mouse movement interactions using standard JS & GSAP
    cards.forEach((card) => {
      const iconWrap = card.querySelector(".icon-wrapper");
      
      const onMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          borderColor: "rgba(43, 127, 255, 0.4)", // Light accent border
          boxShadow: "0 20px 40px -15px rgba(19, 28, 51, 0.08)",
          duration: 0.35,
          ease: "power2.out",
        });
        if (iconWrap) {
          gsap.to(iconWrap, {
            scale: 1.1,
            rotate: 8,
            backgroundColor: "#2b7fff", // Electric Blue accent color
            color: "#ffffff",
            duration: 0.3,
            ease: "back.out(1.5)",
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          borderColor: "rgba(226, 232, 240, 0.8)", // restore border-slate-200
          boxShadow: "0 4px 15px -3px rgba(0, 0, 0, 0.02)",
          duration: 0.35,
          ease: "power2.out",
        });
        if (iconWrap) {
          gsap.to(iconWrap, {
            scale: 1,
            rotate: 0,
            backgroundColor: "rgba(43, 127, 255, 0.08)", // original transparent blue
            color: "#2b7fff", // original electric blue accent
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      // Save listeners for cleanup
      (card as any)._cleanupMouseEnter = onMouseEnter;
      (card as any)._cleanupMouseLeave = onMouseLeave;
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", (card as any)._cleanupMouseEnter);
        card.removeEventListener("mouseleave", (card as any)._cleanupMouseLeave);
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 bg-white text-slate-800 font-sans overflow-hidden border-t border-slate-100"
    >
      {/* Light Theme Background Grid & Gradients matching Hero Section theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header (Why Choose Us) */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2b7fff] mb-3 font-display">
            Platform Strengths
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]">
            Why Choose Fundflick
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base leading-relaxed font-normal max-w-xl mx-auto">
            Experience modern lending architecture built for speed, compliance, and growth.
          </p>
        </div>

        {/* 4 Feature Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative flex flex-col p-8 rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 select-none shadow-sm cursor-pointer"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#2b7fff] to-indigo-400 rounded-t-2xl opacity-0 transition-opacity duration-300 hover:opacity-100" />

              {/* Icon Container */}
              <div className="icon-wrapper w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 text-[#2b7fff] bg-[#2b7fff]/8">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {feature.icon}
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 font-display mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
