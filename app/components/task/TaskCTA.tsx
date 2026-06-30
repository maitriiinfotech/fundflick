"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

export default function TaskCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
  }, []);

  return (
    <section className="relative w-full py-16 sm:py-20 px-6">
      <div ref={ctaRef} className="max-w-3xl mx-auto relative z-10">
        <div className="bg-gradient-to-r from-[#131c33] to-[#1e3a75] rounded-[28px] px-8 py-14 md:px-16 md:py-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 relative z-10"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Streamline your team workflows
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8 relative z-10 font-light">
            Eliminate task chaos and missed deadlines. Let Fundflick&apos;s task
            management keep your operations running like clockwork.
          </p>
          <Button
            href="/contactus"
            variant="brand"
            className="px-8 py-3.5 text-sm relative z-10"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
}
