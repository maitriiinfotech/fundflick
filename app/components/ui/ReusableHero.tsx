"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface ReusableHeroProps {
  bgImage: string;
  bgAlt: string;
  title: ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

const ArrowIcon = () => (
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
);

export default function ReusableHero({
  bgImage,
  bgAlt,
  title,
  description,
  primaryLabel,
  primaryHref = "/contactus",
  secondaryLabel = "Request Demo",
  secondaryHref = "/contactus",
}: ReusableHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // content entrance stagger
      const heroChildren = heroRef.current?.children;
      if (heroChildren) {
        gsap.fromTo(
          Array.from(heroChildren),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        );
      }

      const paths = gsap.utils.toArray<SVGPathElement>(".hero-path");

      // reduced motion: draw lines + nodes static, hide comet, skip scroll work
      if (reduce) {
        gsap.set(paths, { strokeDashoffset: 0 });
        gsap.set(".hero-node", { attr: { r: 5 }, autoAlpha: 1 });
        gsap.set([".hero-comet", ".hero-pulse"], { autoAlpha: 0 });
        return;
      }

      gsap.set(paths, { strokeDashoffset: 1 });
      gsap.set(".hero-node", { attr: { r: 0 }, autoAlpha: 0 });
      gsap.set(".hero-comet", { autoAlpha: 1 });
      gsap.set(".hero-pulse", { attr: { r: 6 }, autoAlpha: 0.5 });

      // ---- continuous life (independent of scroll) ----
      // comet halo ring keeps pulsing outward
      gsap.to(".hero-pulse", {
        attr: { r: 22 },
        autoAlpha: 0,
        duration: 1.8,
        ease: "power1.out",
        repeat: -1,
      });
      // particles drift gently up/down
      gsap.to(".hero-particle", {
        y: -16,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.5, from: "random" },
      });

      // ---- scroll-driven SVG draw ----
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl
        // lines draw in
        .to(".hero-path", { strokeDashoffset: 0, stagger: 0.12 }, 0)
        // comet rides the main line's leading edge
        .to(
          ".hero-comet",
          {
            motionPath: {
              path: ".hero-path-main",
              align: ".hero-path-main",
              alignOrigin: [0.5, 0.5],
            },
          },
          0,
        )
        // waypoint nodes pop in as the draw passes them
        .to(
          ".hero-node",
          {
            attr: { r: 5 },
            autoAlpha: 1,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.18,
          },
          0.2,
        );
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-screen flex flex-col"
    >
      {/* Background Hero Image */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
        <img
          src={"/hero_bg_pattern.png"}
          alt={bgAlt}
          className="w-full h-full object-cover object-bottom"
        />
        {/* Soft fade to white at bottom so it blends into next section */}
        <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* SVG Path-on-Scroll layer (award-tier draw + comet) */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 760"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="heroLineGrad"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2b7fff" stopOpacity="0" />
              <stop offset="0.22" stopColor="#2b7fff" stopOpacity="0.55" />
              <stop offset="0.7" stopColor="#60a5fa" stopOpacity="0.75" />
              <stop offset="1" stopColor="#2b7fff" stopOpacity="0" />
            </linearGradient>
            <filter
              id="heroCometGlow"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* depth line — faint, sits furthest back */}
          <path
            className="hero-path"
            d="M-50 200 C 240 220 420 470 720 430 S 1140 150 1360 360"
            pathLength={1}
            stroke="url(#heroLineGrad)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeOpacity={0.28}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          {/* main flowing line — comet + nodes ride this one */}
          <path
            className="hero-path hero-path-main"
            d="M-60 545 C 230 520 320 250 580 285 S 980 560 1190 320 S 1470 165 1530 270"
            pathLength={1}
            stroke="url(#heroLineGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          {/* secondary, lighter line */}
          <path
            className="hero-path"
            d="M-40 350 C 270 375 380 110 660 155 S 1090 430 1340 195"
            pathLength={1}
            stroke="url(#heroLineGrad)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeOpacity={0.5}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />

          {/* floating particles — gentle continuous drift */}
          {[
            [180, 170],
            [470, 95],
            [760, 130],
            [1030, 610],
            [1280, 515],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              className="hero-particle"
              cx={cx}
              cy={cy}
              r={2.5}
              fill="#2b7fff"
              opacity={0.35}
            />
          ))}

          {/* waypoint nodes — pop in as the main line draws past them */}
          {[
            [300, 360],
            [580, 285],
            [900, 470],
            [1190, 320],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              className="hero-node"
              cx={cx}
              cy={cy}
              r={0}
              fill="#2b7fff"
              style={{ opacity: 0 }}
            />
          ))}

          {/* leading comet — pulsing halo + glowing core */}
          <g className="hero-comet" style={{ opacity: 0 }}>
            <circle
              className="hero-pulse"
              r={6}
              fill="none"
              stroke="#2b7fff"
              strokeWidth={1.5}
            />
            <circle r={5} fill="#2b7fff" filter="url(#heroCometGlow)" />
          </g>
        </svg>
      </div>

      {/* Hero Content */}
      <div
        ref={heroRef}
        className="max-w-4xl mx-auto px-6 pt-28 pb-20 relative z-10 text-center flex flex-col items-center justify-center flex-1"
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
        >
          {title}
        </h1>

        <p className="text-[#131c33] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mb-10 font-normal">
          {description}
        </p>

        <div className="flex flex-row items-center justify-center gap-4">
          <Button
            href={primaryHref}
            variant="primary"
            className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {primaryLabel}
            <ArrowIcon />
          </Button>
          <Button
            href={secondaryHref}
            variant="outline"
            className="px-6 sm:px-8 py-3.5 text-xs sm:text-sm flex items-center justify-center gap-2 border-slate-300 text-slate-800 hover:bg-slate-50 bg-white whitespace-nowrap"
          >
            {secondaryLabel}
            <ArrowIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
