"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

export default function HRMSAIShowcard() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, []);

  return (
    <div className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 -mt-32">
      <div
        ref={cardRef}
        className="relative rounded-[20px] overflow-hidden grid grid-cols-1 md:grid-cols-[55%_45%] md:h-[400px]"
      >
        {/* LEFT HALF — starry sky bg + text overlay */}
        <div className="relative overflow-hidden">
          <img
            src="/lefttextblackksky.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Text content on top of left image */}
          <div className="relative z-10 flex flex-col gap-5 px-8 md:px-12 py-12 md:py-16 justify-center h-full">
            <h2
              className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-white leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              AI that powers <br />
              every part of HR
            </h2>

            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed max-w-md font-light">
              Zia brings intelligent, privacy-focused support to every part of
              Fundflick HRMS. It answers, acts, and analyzes, helping HR teams
              move faster with less effort. From automating tasks to guiding
              decisions, Zia ensures HR runs smoothly and efficiently at every
              step.
            </p>

            <div className="mt-2">
              <Button
                href="/contactus"
                variant="outline"
                className="px-6 py-3 text-xs sm:text-sm border-white/30 text-white hover:bg-white/10 bg-transparent whitespace-nowrap"
              >
                Explore Zia
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
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

        {/* RIGHT HALF — phone/Zia chat image covers full right side */}
        <div className="relative overflow-hidden min-h-[280px] md:min-h-0">
          <img
            src="/rightextblackksky.jpg"
            alt="AI HR Assistant — Zia"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
