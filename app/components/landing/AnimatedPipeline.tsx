"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface LoanProduct {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const PRODUCTS: LoanProduct[] = [
  {
    id: "morgage",
    num: "01",
    title: "Morgage Loan",
    desc: "Get quick approval on your morgage loan with competitive interest rates",
    icon: (
      <>
        {/* Hand holding house / document */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M9 21h6M12 10v11"
        />
      </>
    ),
  },
  {
    id: "msme",
    num: "02",
    title: "MSME Loan",
    desc: "Get quick approval on your msme loan with competitive interest rates",
    icon: (
      <>
        {/* Business person at desk */}
        <circle cx="12" cy="7" r="3" strokeWidth="1.6" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M5 21a7 7 0 0114 0M19 12h2M19 15h2M19 18h2"
        />
      </>
    ),
  },
  {
    id: "home",
    num: "03",
    title: "Home Loan",
    desc: "Get quick approval on your home loan with competitive interest rates",
    icon: (
      <>
        {/* House with currency bag */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0V12a2 2 0 012-2h2a2 2 0 012 2v9"
        />
      </>
    ),
  },
  {
    id: "vehicle",
    num: "04",
    title: "Vehicle Loan",
    desc: "Get quick approval on your vehicle loan with competitive interest rates",
    icon: (
      <>
        {/* Car outline */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M5 18h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
        />
        <circle cx="7.5" cy="18" r="2.5" strokeWidth="1.6" />
        <circle cx="16.5" cy="18" r="2.5" strokeWidth="1.6" />
      </>
    ),
  },
  {
    id: "personal",
    num: "05",
    title: "Personal Loan",
    desc: "Get quick approval on your personal loan with competitive interest rates",
    icon: (
      <>
        {/* Person with Rupee symbol */}
        <circle cx="9" cy="7" r="3" strokeWidth="1.6" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
          d="M3 21a6 6 0 0112 0M17 6h5M17 10h5M19.5 6v7c0 .5-.5 1-1 1"
        />
      </>
    ),
  },
];

export default function AnimatedPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const sticky = stickyRef.current;
      const container = containerRef.current;

      if (!track || !sticky || !container) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      // 1. Horizontal Pin Scrolling Timeline
      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      // 2. Laser connector line drawing animation linked to scroll progress
      const laser = laserRef.current;
      if (laser) {
        const pathLength = laser.getTotalLength();
        gsap.set(laser, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.to(laser, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1.2,
          },
        });
      }

      // 3. Stagger-reveal step cards when scrolling through them
      const cards = gsap.utils.toArray(".product-card");
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { scale: 0.9, opacity: 0.6, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: pinTimeline,
              start: "left 90%",
              end: "left 50%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full flex flex-col justify-between py-16 overflow-hidden">
        
        {/* Light Theme Background matching VantaHero */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60 pointer-events-none -z-20" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/10 via-white to-indigo-50/10 pointer-events-none -z-20" />

        {/* Section Header */}
        <div className="px-6 sm:px-12 lg:px-20 max-w-4xl shrink-0 text-center md:text-left">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1] mb-4">
            Tailored Services for Specialized <br />Loan Products
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            Our platform adapts to your specific needs and can be customized to suit your preferences.
          </p>
        </div>

        {/* Horizontal Track Container */}
        <div className="relative flex-grow flex items-center h-full my-auto z-10">
          
          {/* Connecting Laser Line SVG */}
          <div className="absolute left-0 right-0 w-full overflow-visible pointer-events-none -z-10">
            <svg className="w-full h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
              <path
                ref={laserRef}
                d="M 0 0.5 L 3000 0.5"
                stroke="rgba(43, 127, 255, 0.15)"
                strokeWidth="0.8"
                fill="none"
              />
              <path
                ref={laserRef}
                d="M 0 0.5 L 3000 0.5"
                stroke="#2b7fff"
                strokeWidth="1.2"
                fill="none"
              />
            </svg>
          </div>

          <div
            ref={trackRef}
            className="flex flex-row items-center gap-14 md:gap-20 pl-6 sm:pl-12 lg:pl-20 pr-[40vw] h-[360px] md:h-[400px] will-change-transform"
          >
            {/* Cards Map */}
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="product-card w-[280px] md:w-[340px] shrink-0 h-full relative flex flex-col justify-between p-8 bg-white border border-slate-200/80 rounded-3xl shadow-sm hover:shadow-xl hover:border-[#2b7fff]/40 transition-all duration-500 group cursor-pointer"
              >
                {/* Outlined Watermark Number */}
                <div className="text-[9vw] font-extrabold text-slate-100/50 font-display select-none pointer-events-none -z-10 absolute -top-9 -left-5 tracking-tighter">
                  {product.num}
                </div>

                {/* Card Header: Icon wrapper using brand colors */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-[#2b7fff]/8 text-[#2b7fff]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {product.icon}
                    </svg>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#2b7fff] transition-colors duration-300">
                    {product.num}
                  </span>
                </div>

                {/* Card Description */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold font-display tracking-tight text-slate-900 mb-2 group-hover:text-[#2b7fff] transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-light">
                    {product.desc}
                  </p>
                </div>

                {/* Learn More Button matching screenshot outline style */}
                <div className="mt-6">
                  <button className="px-5 py-2 border border-[#2b7fff] text-[#2b7fff] text-xs font-semibold rounded-xl hover:bg-[#2b7fff] hover:text-white transition-all duration-300 font-display">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer text guide */}
        <div className="px-6 sm:px-12 lg:px-20 shrink-0 flex items-center justify-between text-slate-400 text-xs">
          <span>Scroll to explore specialized products</span>
          <span className="animate-pulse flex items-center gap-2">
            Scroll down to advance timeline <span>→</span>
          </span>
        </div>

      </div>
    </div>
  );
}
