"use client";

import { ReactNode, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

interface ReusableFeaturesProps {
  items: FeatureItem[];
  eyebrow?: string;
  heading?: ReactNode;
  /** Wrap in a full <section> with dot-grid background + padding */
  withSection?: boolean;
  className?: string;
}

export default function ReusableFeatures({
  items,
  eyebrow,
  heading,
  withSection = false,
  className = "",
}: ReusableFeaturesProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const title = rootRef.current?.querySelector(".rf-title");
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: title,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const grid = rootRef.current?.querySelector(".rf-grid");
      const cards = grid?.querySelectorAll(".feature-card");
      if (grid && cards && cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const inner = (
    <div
      ref={rootRef}
      className={`max-w-6xl mx-auto relative z-10 ${withSection ? "" : "px-6"} ${className}`}
    >
      {(eyebrow || heading) && (
        <div className="rf-title mb-12 text-center">
          {eyebrow && (
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondaryColor mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {heading}
            </h2>
          )}
        </div>
      )}

      <div className="rf-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card bg-white border border-slate-200/80 rounded-[24px] p-7 flex flex-col gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-secondaryColor/30 hover:shadow-[0_12px_40px_rgba(43,127,255,0.06)] group"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
            >
              {feature.icon}
            </div>
            <h3
              className="text-lg font-extrabold text-slate-900 tracking-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {feature.title}
            </h3>
            <p className="text-slate-500 text-[13px] leading-relaxed font-light">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  if (withSection) {
    return (
      <section className="relative w-full py-20 sm:py-28 px-6 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none" />
        {inner}
      </section>
    );
  }

  return inner;
}
