"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SHOWCASE_TABS = [
  {
    id: "dashboard",
    label: "Task Dashboard",
    image: "/task-dashboard.png",
    description:
      "Kanban boards with drag-and-drop task cards. Visualize all tasks across stages — To Do, In Progress, Review, and Done.",
  },
  {
    id: "bulk",
    label: "Bulk Operations",
    image: "/task-bulk-assign.png",
    description:
      "Create and assign hundreds of tasks in bulk. Upload CSV, select team members, and distribute workloads in seconds.",
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    image: "/task-reports.png",
    description:
      "Monthly and yearly dashboards with task completion rates, team performance, bottleneck analysis, and exportable reports.",
  },
  {
    id: "notifications",
    label: "Notifications & Email",
    image: "/task-notifications.png",
    description:
      "Real-time push notifications and configurable email alerts on every task action — assignments, updates, deadlines, and completions.",
  },
];

export default function TaskShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, []);

  const handleTabChange = (idx: number) => {
    if (idx === activeTab) return;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(idx);
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          );
        },
      });
    } else {
      setActiveTab(idx);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-6 bg-slate-50/50 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-secondaryColor mb-4">
            Product Tour
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            See it in action
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {SHOWCASE_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(idx)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeTab === idx
                  ? "bg-[#131c33] text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[24px] border border-slate-200/80 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          {/* Description */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl mx-auto text-center font-light">
            {SHOWCASE_TABS[activeTab].description}
          </p>

          {/* Screenshot */}
          <div
            ref={imageRef}
            className="rounded-[16px] overflow-hidden border border-slate-100"
          >
            <img
              src={SHOWCASE_TABS[activeTab].image}
              alt={SHOWCASE_TABS[activeTab].label}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
