"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LendingFocus() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section) return;

    // Reset initial states for entry animations
    gsap.set(title, { opacity: 0, y: 40 });
    gsap.set(subtitle, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.9 });

    // ScrollTrigger timeline for reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        subtitle,
        {
          opacity: 0.85,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
        },
        "-=0.5"
      );

    // Hover interactions for cards
    cards.forEach((card) => {
      const overlay = card.querySelector(".card-glow-overlay");
      const text = card.querySelector(".card-text");

      const onMouseEnter = () => {
        // Dim sibling cards
        cards.forEach((sibling) => {
          if (sibling !== card) {
            gsap.to(sibling, { opacity: 0.35, scale: 0.96, duration: 0.4, ease: "power2.out" });
          }
        });

        // Highlight active card
        gsap.to(card, {
          scale: 1.04,
          borderColor: "#2b7fff", // Accent Electric Blue from AGENTS.md
          backgroundColor: "rgba(43, 127, 255, 0.15)", // Translucent accent blue
          boxShadow: "0 10px 30px -5px rgba(43, 127, 255, 0.3)",
          duration: 0.4,
          ease: "power2.out",
        });

        if (overlay) {
          gsap.to(overlay, {
            opacity: 1,
            scale: 1.2,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (text) {
          gsap.to(text, {
            scale: 1.02,
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      const onMouseLeave = () => {
        // Restore all cards to default state
        cards.forEach((sibling) => {
          gsap.to(sibling, {
            opacity: 1,
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.15)",
            backgroundColor: "rgba(19, 28, 51, 0.5)", // Primary Deep Navy background with opacity
            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.2)",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        if (overlay) {
          gsap.to(overlay, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (text) {
          gsap.to(text, {
            scale: 1,
            color: "rgba(255, 255, 255, 0.9)",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mouseleave", onMouseLeave);

      // Save event listeners for cleanup
      (card as any)._cleanupMouseEnter = onMouseEnter;
      (card as any)._cleanupMouseLeave = onMouseLeave;
    });

    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Clean up event listeners
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", (card as any)._cleanupMouseEnter);
        card.removeEventListener("mouseleave", (card as any)._cleanupMouseLeave);
      });
    };
  }, []);

  const cardData = [
    { label: "Simplify Lending" },
    { label: "Standardize Workflows" },
    { label: "Scale Volume" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 px-6 sm:px-12 lg:px-20 text-white overflow-hidden select-none font-sans bg-gradient-to-r from-[#131c33] to-[#1e3a75]"
    >
      {/* Visual background details to match rich aesthetics and screenshot feel */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2b7fff]/15 blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 text-center">
        {/* Title Tag */}
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display mb-4 text-white leading-tight"
        >
          Transforming Lending - Empowering Growth
        </h2>

        {/* Subheading */}
        <p
          ref={subtitleRef}
          className="text-slate-200/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-16 font-light"
        >
          Experience seamless financial solutions that accelerate your business success
        </p>

        {/* 3 Interactive Cards */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
        >
          {cardData.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="relative overflow-hidden cursor-pointer rounded-2xl border border-white/15 px-8 py-10 flex items-center justify-center min-h-[140px] text-center transition-all duration-300 backdrop-blur-md bg-[#131c33]/50"
            >
              {/* Internal glow dot element for premium hover highlight */}
              <div className="card-glow-overlay absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#2b7fff]/20 blur-xl opacity-0 scale-75 transition-all pointer-events-none" />
              
              {/* Label */}
              <span className="card-text text-lg sm:text-xl font-bold tracking-wide font-display text-white/90 transform transition-transform pointer-events-none">
                {card.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
