"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Button from "../ui/Button";

export default function HRMSHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroChildren = heroRef.current?.children;
    if (heroChildren) {
      gsap.fromTo(
        Array.from(heroChildren),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      );
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden min-h-screen flex flex-col">
      {/* Background Hero Image — golden landscape illustration */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        <img
          src="/hero-hrmsai.jpg"
          alt="HRMS Background"
          className="w-full h-full object-cover object-bottom"
        />
        {/* Soft fade to white at the very bottom so it blends into the next section */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Hero Section Content */}
      <div
        ref={heroRef}
        className="max-w-4xl mx-auto px-6 pt-28 pb-20 relative z-10 text-center flex flex-col items-center justify-center flex-1"
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          AI-first HR software <br />
          for every business
        </h1>

        <p className="text-[#131c33] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-10 font-normal">
          Streamline all your HR processes and deliver exceptional employee
          experiences with Fundflick HRMS—cloud-based AI HR software that's
          intuitive, agile, mobile-friendly.
        </p>

        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            href="/contactus"
            variant="primary"
            className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Sign up for free trial
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
          <Button
            href="/contactus"
            variant="outline"
            className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 border-slate-300 text-slate-800 hover:bg-slate-50 bg-white whitespace-nowrap"
          >
            Request Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
