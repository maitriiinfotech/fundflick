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
    question: "How quickly can I process loan applications with Fundflick?",
    answer: "With our AI-powered automation, most loan applications can be processed within minutes. Simple applications may take as little as 4-5 minutes, while more complex cases typically complete within 25-30 minutes, compared to traditional methods that can take days.",
  },
  {
    num: "02.",
    question: "Can Fundflick integrate with my existing banking systems?",
    answer: "Yes, Fundflick offers seamless integration with existing systems and third-party integrations through our robust API infrastructure. Our technical team provides full support during the integration process.",
  },
  {
    num: "03.",
    question: "What types of loans can I manage with Fundflick?",
    answer: "Fundflick supports all major loan types including Mortgage loans, Home loans, vehicle loans, business loans, MSME loans, and gold loans. The platform is flexible and can be customized for specialized loan products as well.",
  },
  {
    num: "04.",
    question: "Is there a free trial available?",
    answer: "Yes, we offer a 30-day free trial with access to all Professional plan features. Just a click away to start, and you can upgrade or downgrade at any time based on your needs.",
  },
  {
    num: "05.",
    question: "What kind of support do you provide?",
    answer: "We provide 24/7 technical support for Professional and Enterprise plans, with dedicated account managers for Enterprise customers. Our support includes phone, email, live chat, and comprehensive documentation and training resources.",
  },
  {
    num: "06.",
    question: "How does the AI-powered verification work?",
    answer: "Our AI system automatically verifies documents, performs KYC checks, assesses creditworthiness, and detects fraud patterns on basis of business logics provided by you. It uses machine learning algorithms trained on millions of loan applications to make accurate decisions while reducing manual intervention by up to 90%.",
  },
  {
    num: "07.",
    question: "Can I customize the platform for my brand?",
    answer: "Absolutely! Our Enterprise plan includes white-label options where you can customize the platform with your branding, colors, logos, and even custom domain names. The interface can be tailored to match your organization's look and feel.",
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
      id="faq"
      ref={containerRef}
      className="relative w-full py-12 md:py-28 px-6 sm:px-12 lg:px-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100 font-sans"
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
