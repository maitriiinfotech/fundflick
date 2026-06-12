"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface LoanProduct {
  id: string;
  num: string;
  title: string;
  desc: string;
  image: string;
}

const PRODUCTS: LoanProduct[] = [
  {
    id: "morgage",
    num: "01",
    title: "Morgage Loan",
    desc: "Get quick approval on your morgage loan with competitive interest rates",
    image: "/loan_origination.png",
  },
  {
    id: "msme",
    num: "02",
    title: "MSME Loan",
    desc: "Get quick approval on your msme loan with competitive interest rates",
    image: "/task_management.png",
  },
  {
    id: "home",
    num: "03",
    title: "Home Loan",
    desc: "Get quick approval on your home loan with competitive interest rates",
    image: "/lms_hrms.png",
  },
  {
    id: "vehicle",
    num: "04",
    title: "Vehicle Loan",
    desc: "Get quick approval on your vehicle loan with competitive interest rates",
    image: "/collection.png",
  },
  {
    id: "personal",
    num: "05",
    title: "Personal Loan",
    desc: "Get quick approval on your personal loan with competitive interest rates",
    image: "/reports.png",
  },
];

export default function AnimatedPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      // Reset card initial states
      gsap.set(cards, { opacity: 0, y: 30 });

      // Stagger reveal of cards initially
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftColumnRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Track active index based on scroll position of each card
      cards.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIdx(idx);
            }
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 px-6 sm:px-12 lg:px-20 bg-slate-950 text-white overflow-hidden border-t border-slate-900 font-sans"
    >
      {/* Decorative fine-line grid overlay to match Awwwards styling */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header matching screenshot structure */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter font-display leading-[0.95] uppercase max-w-xl">
            <span className="text-[#a3e635]">Tailored Services</span> <br />
            for Specialized <br />
            Loan Products
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light max-w-sm">
            Our platform adapts to your specific needs and can be customized to suit your preferences.
          </p>
        </div>

        {/* 2 Column Split Layout: Left vertical cards list, Right sticky image preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column - Card List */}
          <div ref={leftColumnRef} className="lg:col-span-5 flex flex-col gap-6 w-full">
            {PRODUCTS.map((product, index) => {
              const isActive = index === activeIdx;
              return (
                <div
                  key={product.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  onClick={() => setActiveIdx(index)}
                  className={`w-full rounded-[28px] p-8 transition-all duration-500 cursor-pointer border select-none ${
                    isActive
                      ? "bg-[#fdfbf7] border-[#fdfbf7] text-slate-900 shadow-xl scale-[1.02]"
                      : "bg-[#131c33]/40 border-slate-900 text-white hover:border-slate-800 hover:bg-[#131c33]/60"
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight mb-3">
                    {product.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed font-light transition-colors duration-500 ${
                      isActive ? "text-slate-700" : "text-slate-400"
                    }`}
                  >
                    {product.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column - Sticky Visual Preview */}
          <div className="lg:col-span-7 w-full lg:sticky lg:top-28">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-900/60 shadow-2xl">
              
              {/* Overlay shadow wrapper inside the image container */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10 pointer-events-none" />

              {/* Stack of absolute images corresponding to products */}
              {PRODUCTS.map((product, index) => {
                const isActive = index === activeIdx;
                return (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-[1500ms]"
                    />
                  </div>
                );
              })}
              
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
