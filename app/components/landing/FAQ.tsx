"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface FAQItem {
  num: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    num: "01.",
    question: "Do you guarantee automated loan disbursals?",
    answer: "No. Disbursals are subject to final approval by your partner banks or NBFC integration rules. Fundflick provides the speed and workflow automation; you control the risk policy.",
  },
  {
    num: "02.",
    question: "How secure is the bank transaction data logged?",
    answer: "We use enterprise-grade AES-256 encryption for data at rest and TLS 1.3 for data in transit, combined with bank-level sandbox tokens to isolate databases.",
  },
  {
    num: "03.",
    question: "Can we customize the approval workflows later?",
    answer: "Yes. Workflows are fully customizable. You can add stages, change checklist constraints, and adjust escalation rules in real-time through the settings panel.",
  },
  {
    num: "04.",
    question: "Who manages the direct payment integration?",
    answer: "We integrate directly with major secure payment gateways (like Razorpay, Stripe, or standard bank host-to-host APIs) to ensure instant EMI auto-debit recovery.",
  },
  {
    num: "05.",
    question: "Is real-time ledger accounting audit-compliant?",
    answer: "Yes. Every log, ledger entry, and disbursal record is double-booked and generates an unalterable audit trail that complies with standard financial regulations.",
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // 1. Initial entry animations on scroll
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const title = titleRef.current;
      const list = listRef.current;
      const rows = rowsRef.current.filter(Boolean) as HTMLDivElement[];

      if (!title || !list) return;

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
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  // 2. Animate accordion open/close using GSAP
  const toggleRow = (idx: number) => {
    const row = rowsRef.current[idx];
    if (!row) return;

    const answer = row.querySelector(".faq-answer-container") as HTMLDivElement;
    const icon = row.querySelector(".faq-icon") as HTMLDivElement;

    if (openIdx === idx) {
      // Collapse active row
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
      gsap.to(icon, {
        rotation: 0,
        color: "#2b7fff", // electric blue
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenIdx(null);
    } else {
      // Collapse previously open row if any
      if (openIdx !== null) {
        const prevRow = rowsRef.current[openIdx];
        if (prevRow) {
          const prevAnswer = prevRow.querySelector(".faq-answer-container") as HTMLDivElement;
          const prevIcon = prevRow.querySelector(".faq-icon") as HTMLDivElement;
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

      // Expand clicked row
      gsap.fromTo(
        answer,
        { height: 0, opacity: 0, marginTop: 0 },
        {
          height: "auto",
          opacity: 1,
          marginTop: 16,
          duration: 0.4,
          ease: "power2.inOut",
        }
      );
      gsap.to(icon, {
        rotation: 45, // rotate plus (+) 45deg to look like a cross (x)
        color: "#ef4444", // change to soft red for cross icon
        duration: 0.3,
        ease: "power2.out",
      });
      setOpenIdx(idx);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans"
    >
      {/* Light Theme Background matching VantaHero */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none -z-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-6xl font-extrabold tracking-tighter font-display text-slate-900 mb-16"
        >
          Got A Question?
        </h2>

        {/* FAQ Accordion List */}
        <div ref={listRef} className="border-t border-slate-200">
          {FAQ_DATA.map((item, index) => {
            return (
              <div
                key={index}
                ref={(el) => {
                  rowsRef.current[index] = el;
                }}
                onClick={() => toggleRow(index)}
                className="py-6 sm:py-8 border-b border-slate-200 cursor-pointer select-none group relative"
              >
                {/* Horizontal row flex layout */}
                <div className="flex items-center justify-between gap-6">
                  
                  {/* Left content: Number + Question */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[#2b7fff] text-purple-600 font-bold font-mono tracking-wide text-sm sm:text-base shrink-0">
                      {item.num}
                    </span>
                    <span className="text-slate-900 text-lg sm:text-xl font-bold font-display tracking-tight hover:text-[#2b7fff] transition-colors duration-300">
                      {item.question}
                    </span>
                  </div>

                  {/* Right: Plus/Cross Icon */}
                  <div className="faq-icon text-[#2b7fff] text-2xl font-light shrink-0 transition-colors w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>

                </div>

                {/* Collapsible Answer container */}
                <div className="faq-answer-container h-0 opacity-0 overflow-hidden pl-10 sm:pl-12">
                  <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-3xl">
                    {item.answer}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
