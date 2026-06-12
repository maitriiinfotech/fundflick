"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftItemsRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const leftItems = leftItemsRef.current?.querySelectorAll(".pricing-bullet-item");
      const rightCard = rightCardRef.current;

      if (!leftItems || !rightCard) return;

      // Reset states
      gsap.set(leftItems, { opacity: 0, x: -30 });
      gsap.set(rightCard, { opacity: 0, x: 40, scale: 0.95 });

      // Staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.to(leftItems, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      }).to(
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

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: List of bullet statements */}
        <div ref={leftItemsRef} className="lg:col-span-6 flex flex-col gap-10">
          
          <div className="pricing-bullet-item flex items-start gap-4">
            <span className="w-2 h-2 rounded-full bg-[#2b7fff] mt-2.5 shrink-0" />
            <p className="text-slate-800 text-lg sm:text-xl font-light leading-relaxed">
              We provide 100% digital-first operations automation with RBI-compliant pipelines.
            </p>
          </div>

          <div className="pricing-bullet-item flex items-start gap-4">
            <span className="w-2 h-2 rounded-full bg-[#2b7fff] mt-2.5 shrink-0" />
            <p className="text-slate-800 text-lg sm:text-xl font-light leading-relaxed">
              We set up your lending portal in 15 days and supervise transition support via a dedicated success team.
            </p>
          </div>

          <div className="pricing-bullet-item flex items-start gap-4">
            <span className="w-2 h-2 rounded-full bg-[#2b7fff] mt-2.5 shrink-0" />
            <p className="text-slate-800 text-lg sm:text-xl font-light leading-relaxed">
              Accountable partnership built to turn manual processes into scalable volume.
            </p>
          </div>

        </div>

        {/* Right Column: Pricing Rounded Card */}
        <div ref={rightCardRef} className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-[480px] bg-white border border-slate-200/80 rounded-[36px] p-8 sm:p-10 shadow-2xl flex flex-col justify-between">
            
            {/* Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight mb-8">
                Pricing & Integration
              </h3>

              {/* Information list */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 font-light font-sans mb-10">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Status</span>
                  <span className="font-bold text-slate-900">Scheduled Demo Required</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Capacity</span>
                  <span className="font-bold text-slate-900">Tailored to NBFC & Enterprise Scale</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Setup Investment</span>
                  <span className="font-bold text-[#2b7fff]">Custom Quote (Volume Based)</span>
                </div>
                <div className="pt-2 text-slate-500 italic">
                  Includes 24/7 API integration and custom compliance hooks.
                </div>
              </div>
            </div>

            {/* CTA Button styled with electric blue accent #2b7fff */}
            <button className="pricing-cta-button w-full py-4 rounded-2xl bg-[#2b7fff] text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 font-display cursor-pointer">
              Request Early Access
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
