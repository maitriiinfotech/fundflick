"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Button from "../ui/Button";

export default function TaskHero() {
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
      {/* Background Hero Image */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        <img
          src="/task-hero-bg.png"
          alt="Task Management Background"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="max-w-4xl mx-auto px-6 pt-28 pb-20 relative z-10 text-center flex flex-col items-center justify-center flex-1"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondaryColor hover:underline w-fit mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/60 mb-8">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">
            Smart Task Suite
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          Task & Workflow <br />
          Management
        </h1>

        <p className="text-[#131c33] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-10 font-normal">
          Organize, assign, and track every task across your operations.
          Create daily tasks, bulk assignments, automated reports, and
          real-time notifications — all in one powerful platform.
        </p>

        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            href="/contactus"
            variant="primary"
            className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Start Free Trial
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
