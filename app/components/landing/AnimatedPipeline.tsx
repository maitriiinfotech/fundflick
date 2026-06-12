"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate, stagger, svg, createTimeline } from "animejs";

/* ─── Step Data ─── */
const STEPS = [
  {
    id: "apply",
    label: "Application",
    desc: "Borrower submits loan request digitally with docs & KYC",
    icon: (
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    iconExtra: (
      <>
        <polyline
          points="14 2 14 8 20 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="9"
          y1="13"
          x2="15"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="17"
          x2="13"
          y2="17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
    color: "#3b82f6",
  },
  {
    id: "verify",
    label: "Verification",
    desc: "Automated credit scoring, bureau checks & risk engine",
    icon: (
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    iconExtra: (
      <polyline
        points="9 12 11 14 15 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    color: "#8b5cf6",
  },
  {
    id: "approve",
    label: "Approval",
    desc: "AI-powered underwriting decision in minutes, not days",
    icon: (
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ),
    iconExtra: (
      <polyline
        points="9 12 11 14 15 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    color: "#10b981",
  },
  {
    id: "disburse",
    label: "Disbursal",
    desc: "Instant fund transfer directly into borrower's account",
    icon: (
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    ),
    iconExtra: (
      <>
        <line
          x1="2"
          y1="10"
          x2="22"
          y2="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 15h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
    color: "#f59e0b",
  },
  {
    id: "collect",
    label: "Collection",
    desc: "Smart EMI tracking, automated reminders & recovery workflows",
    icon: (
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    iconExtra: null,
    color: "#ef4444",
  },
];

/* ─── Animated Particle along SVG path ─── */
function FlowParticle({
  pathId,
  color,
  delay,
}: {
  pathId: string;
  color: string;
  delay: number;
}) {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const pathEl = document.querySelector(`#${pathId}`) as SVGPathElement | null;
    if (!dotRef.current || !pathEl) return;

    const motionPath = svg.createMotionPath(pathId);
    const anim = animate(dotRef.current, {
      ...motionPath,
      duration: 3000,
      delay,
      ease: "inOutQuad",
      loop: true,
    });

    return () => {
      anim.pause();
    };
  }, [pathId, delay]);

  return (
    <circle
      ref={dotRef}
      r="4"
      fill={color}
      opacity="0.9"
      filter="url(#glow)"
    />
  );
}

/* ─── Stat counter ─── */
function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          animate(obj, {
            val: end,
            duration,
            ease: "outExpo",
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
            },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, suffix, prefix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/* ─── Main Component ─── */
export default function AnimatedPipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          runAnimation();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  function runAnimation() {
    /* Draw connector paths */
    const connectorPaths = document.querySelectorAll(".connector-path");
    if (connectorPaths.length > 0) {
      const drawables = svg.createDrawable(connectorPaths);
      animate(drawables, {
        draw: ["0 0", "0 1"],
        duration: 1200,
        delay: stagger(300),
        ease: "inOutQuad",
      });
    }

    /* Staggered step card reveal */
    animate(".pipeline-step", {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.85, 1],
      delay: stagger(200, { start: 400 }),
      duration: 800,
      ease: "outExpo",
    });

    /* Icon pulsing ring */
    animate(".icon-ring", {
      scale: [0, 1.2, 1],
      opacity: [0, 0.6, 1],
      delay: stagger(200, { start: 600 }),
      duration: 1000,
      ease: "outElastic(1, .6)",
    });

    /* Central SVG orbit pulse */
    animate(".orbit-ring", {
      scale: [0, 1],
      opacity: [0, 0.15],
      delay: stagger(150, { start: 200 }),
      duration: 2000,
      ease: "outExpo",
    });

    /* Stat numbers rise */
    animate(".stat-card", {
      opacity: [0, 1],
      translateY: [40, 0],
      delay: stagger(150, { start: 1600 }),
      duration: 700,
      ease: "outQuint",
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white via-slate-50 to-white py-28 overflow-hidden"
    >
      {/* ── Background decorative orbits ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[280, 400, 520].map((size, i) => (
          <div
            key={i}
            className="orbit-ring absolute rounded-full border border-secondaryColor/5"
            style={{
              width: size,
              height: size,
              opacity: 0,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      {/* ── Ambient glow blobs ── */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-secondaryColor/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-secondaryColor/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-20">
          <p className="text-secondaryColor font-bold uppercase tracking-widest text-xs mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            From Application to Collection
          </h2>
          <p className="text-slate-500 mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our end-to-end pipeline automates every stage of the lending
            lifecycle — powered by AI, secured by design.
          </p>
        </div>

        {/* ── SVG Connector Paths (Desktop) ── */}
        <svg
          ref={svgRef}
          className="absolute top-[52%] left-0 w-full h-32 pointer-events-none hidden lg:block"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {STEPS.slice(0, -1).map((step, i) => {
            const x1 = 120 + i * 240 + 60;
            const x2 = x1 + 120;
            const midX = (x1 + x2) / 2;
            const pathD = `M${x1},50 C${midX},10 ${midX},90 ${x2},50`;
            const id = `conn-${i}`;
            return (
              <g key={i}>
                <path
                  id={id}
                  d={pathD}
                  className="connector-path"
                  stroke={`url(#grad-${i})`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                 />
                <defs>
                  <linearGradient id={`grad-${i}`}>
                    <stop offset="0%" stopColor={step.color} />
                    <stop
                      offset="100%"
                      stopColor={STEPS[i + 1].color}
                    />
                  </linearGradient>
                </defs>
                <FlowParticle
                  pathId={id}
                  color={step.color}
                  delay={i * 600}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Pipeline Steps ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="pipeline-step flex flex-col items-center text-center group"
              style={{ opacity: 0 }}
            >
              {/* Icon circle */}
              <div className="relative mb-6">
                <div
                  className="icon-ring absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${step.color}22, transparent 70%)`,
                    transform: "scale(2.2)",
                    opacity: 0,
                  }}
                />
                <div
                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
                    borderColor: `${step.color}30`,
                    boxShadow: `0 8px 30px ${step.color}05, inset 0 1px 0 ${step.color}15`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 md:w-8 md:h-8 transition-colors duration-300"
                    style={{ color: step.color }}
                  >
                    {step.icon}
                    {step.iconExtra}
                  </svg>
                </div>
                {/* Step number badge */}
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-lg"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Label */}
              <h3
                className="font-bold text-base md:text-lg tracking-tight mb-2 transition-colors duration-300"
                style={{ color: step.color }}
              >
                {step.label}
              </h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Animated Stats Bar ── */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { end: 98, suffix: "%", label: "Approval Rate", color: "#3b82f6" },
            {
              end: 45,
              suffix: "s",
              label: "Avg. Decision Time",
              color: "#8b5cf6",
            },
            {
              end: 5,
              suffix: "L+",
              prefix: "₹",
              label: "Disbursed Monthly",
              color: "#10b981",
            },
            {
              end: 99,
              suffix: "%",
              label: "Collection Efficiency",
              color: "#f59e0b",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-card relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm text-center overflow-hidden group hover:border-slate-300/80 transition-all duration-300"
              style={{ opacity: 0 }}
            >
              {/* Glow stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  opacity: 0.6,
                }}
              />
              <div
                className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1"
                style={{ color: stat.color }}
              >
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix || ""}
                  duration={2500}
                />
              </div>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
