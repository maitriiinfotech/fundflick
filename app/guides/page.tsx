"use client";

import { useMemo, useState } from "react";

interface Resource {
  category: string;
  title: string;
  desc: string;
  meta: string;
  accent: string; // gradient classes for the card header
}

const TABS = ["Blogs", "Guides", "Templates", "Reports & Insights", "Ebooks"];

const ACCENT: Record<string, string> = {
  Blogs: "from-emerald-500 to-teal-600",
  Guides: "from-[#2b7fff] to-[#1e3a75]",
  Templates: "from-amber-500 to-orange-600",
  "Reports & Insights": "from-violet-500 to-purple-700",
  Ebooks: "from-rose-500 to-pink-600",
};

const RESOURCES: Resource[] = [
  {
    category: "Guides",
    title: "A Guide to Digital Lending",
    desc: "Everything you need to know about running an end-to-end digital lending operation — from application to disbursal.",
    meta: "12 min read",
    accent: ACCENT.Guides,
  },
  {
    category: "Guides",
    title: "Setting up your Loan Origination workflow",
    desc: "Step-by-step on configuring eKYC, bureau pulls, scorecards, and approval routing inside Fundflick LOS.",
    meta: "9 min read",
    accent: ACCENT.Guides,
  },
  {
    category: "Guides",
    title: "HRMS onboarding playbook",
    desc: "Get your team live on attendance, payroll, and leave in a week with this practical rollout checklist.",
    meta: "8 min read",
    accent: ACCENT.Guides,
  },
  {
    category: "Blogs",
    title: "5 ways AI cuts your NPA",
    desc: "How predictive collections, smart reminders, and field-agent tracking move recovery rates in the right direction.",
    meta: "5 min read",
    accent: ACCENT.Blogs,
  },
  {
    category: "Blogs",
    title: "Why collections quietly leak revenue",
    desc: "The hidden costs of manual follow-ups and reconciliation — and what a unified collection engine fixes.",
    meta: "6 min read",
    accent: ACCENT.Blogs,
  },
  {
    category: "Templates",
    title: "Loan application form template",
    desc: "A ready-to-use digital application schema covering KYC, income, and consent fields for SME and retail loans.",
    meta: "Template",
    accent: ACCENT.Templates,
  },
  {
    category: "Templates",
    title: "EMI schedule worksheet",
    desc: "Flat, reducing, and custom EMI schedule calculators you can adapt to any product policy.",
    meta: "Spreadsheet",
    accent: ACCENT.Templates,
  },
  {
    category: "Reports & Insights",
    title: "State of NBFC lending 2026",
    desc: "Benchmark data on disbursal velocity, NPA buckets, and yield across India's digital lending landscape.",
    meta: "Report",
    accent: ACCENT["Reports & Insights"],
  },
  {
    category: "Reports & Insights",
    title: "Collection efficiency benchmark",
    desc: "How top-performing lenders structure dunning, auto-debit, and field recovery to hit 95%+ collection rates.",
    meta: "Insight",
    accent: ACCENT["Reports & Insights"],
  },
  {
    category: "Ebooks",
    title: "The complete lending automation handbook",
    desc: "A deep dive into automating origination, servicing, collections, and accounting on one platform.",
    meta: "Ebook",
    accent: ACCENT.Ebooks,
  },
  {
    category: "Ebooks",
    title: "From spreadsheets to systems",
    desc: "The operator's guide to replacing scattered tools with a single, intelligent lending workflow.",
    meta: "Ebook",
    accent: ACCENT.Ebooks,
  },
];

const CategoryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.4}
    stroke="currentColor"
    className="w-12 h-12 text-white/90"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

export default function GuidesPage() {
  const [active, setActive] = useState("Guides");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter(
      (r) =>
        r.category === active &&
        (q === "" ||
          r.title.toLowerCase().includes(q) ||
          r.desc.toLowerCase().includes(q)),
    );
  }, [active, query]);

  return (
    <div
      className="min-h-screen bg-white text-slate-900 pt-28 pb-24 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* dot-grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ===== Hero card ===== */}
        <div className="relative rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          {/* theme blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#2b7fff]/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-10 w-80 h-80 bg-[#131c33]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-[300px_1fr] items-center gap-8 p-8 sm:p-12">
            {/* illustration */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-[#2b7fff] to-[#1e3a75] flex items-center justify-center shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.3}
                  stroke="currentColor"
                  className="w-24 h-24 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  />
                </svg>
                <span className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center text-secondaryColor font-black">
                  F
                </span>
              </div>
            </div>

            {/* heading + search */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-secondaryColor font-bold mb-3">
                Fundflick Library
              </p>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Resource Library
              </h1>
              <div className="relative max-w-xl">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search guides, blogs, templates…"
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3.5 pr-12 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2b7fff] focus:ring-2 focus:ring-[#2b7fff]/20 transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                active === tab
                  ? "bg-secondaryColor text-white shadow-lg shadow-[#2b7fff]/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ===== Cards ===== */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <article
                key={r.title}
                className="group rounded-[24px] border border-slate-200 bg-white overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* header */}
                <div
                  className={`relative h-40 bg-gradient-to-br ${r.accent} flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
                  <CategoryIcon />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full">
                    {r.category}
                  </span>
                </div>
                {/* body */}
                <div className="p-6">
                  <h3
                    className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug mb-2 group-hover:text-[#2b7fff] transition-colors"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light mb-5">
                    {r.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      {r.meta}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-secondaryColor">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">
              No {active.toLowerCase()} found
              {query ? ` for “${query}”` : ""}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
