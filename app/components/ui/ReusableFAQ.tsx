"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface FAQItem {
  question: string;
  answer: string;
}

interface ReusableFAQProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function ReusableFAQ({
  title = "Frequently Asked Questions",
  subtitle,
  items,
}: ReusableFAQProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title = titleRef.current;
    const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!title) return;

    gsap.set(title, { opacity: 0, y: 35 });
    gsap.set(rows, { opacity: 0, y: 25 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      rows,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4",
    );
  }, []);

  const toggleRow = (idx: number) => {
    const row = rowsRef.current[idx];
    if (!row) return;

    const answer = row.querySelector(".faq-answer-container") as HTMLDivElement;
    const icon = row.querySelector(".faq-icon") as HTMLDivElement;

    if (openIdx === idx) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(icon, {
        rotation: 0,
        color: "#2b7fff",
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenIdx(null);
    } else {
      // Collapse previously open
      if (openIdx !== null) {
        const prevRow = rowsRef.current[openIdx];
        if (prevRow) {
          const prevAnswer = prevRow.querySelector(
            ".faq-answer-container",
          ) as HTMLDivElement;
          const prevIcon = prevRow.querySelector(
            ".faq-icon",
          ) as HTMLDivElement;
          gsap.to(prevAnswer, {
            height: 0,
            opacity: 0,
            marginTop: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
          gsap.to(prevIcon, {
            rotation: 0,
            color: "#2b7fff",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }

      // Expand clicked
      gsap.fromTo(
        answer,
        { height: 0, opacity: 0, marginTop: 0 },
        {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          duration: 0.4,
          ease: "power2.inOut",
        },
      );
      gsap.to(icon, {
        rotation: 45,
        color: "#ef4444",
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenIdx(idx);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-50 pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="mb-14">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion */}
        <div className="border-t border-slate-200">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
              onClick={() => toggleRow(index)}
              className="py-6 sm:py-7 border-b border-slate-200 cursor-pointer select-none group"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 sm:gap-5">
                  <span className="text-secondaryColor font-bold font-mono tracking-wide text-sm shrink-0">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-slate-900 text-base sm:text-lg font-bold tracking-tight hover:text-secondaryColor transition-colors duration-300"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {item.question}
                  </span>
                </div>

                <div className="faq-icon text-[#2b7fff] text-2xl font-light shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
              </div>

              <div className="faq-answer-container h-0 opacity-0 overflow-hidden pl-10 sm:pl-12">
                <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-3xl font-light">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
