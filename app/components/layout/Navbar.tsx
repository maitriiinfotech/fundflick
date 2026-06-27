"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Button from "../ui/Button";

const FEATURE_LINKS = [
  { label: "HRMS", href: "/features/hrms" },
  { label: "Collection", href: "/features/collection" },
  { label: "Task Management", href: "/features/task-management" },
  { label: "Loan Origination System", href: "/features/loan-origination" },
  { label: "Loan Management System", href: "/features/loan-management" },
  { label: "Smart Reports", href: "/features/smart-reports" },
  { label: "Bookkeeping", href: "/features/bookkeeping" },
];

const HOME_LINK = { label: "Home", href: "/" };

const MOBILE_LINKS = [
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contactus" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileFeaturesOpen, setMobileFeaturesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileFeaturesOpen(false);
  };

  const toggleMobileMenu = () => {
    if (open) setMobileFeaturesOpen(false);
    setOpen((value) => !value);
  };

  // Open / close animation + body scroll lock
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      if (reduce) {
        gsap.set(menu, { clipPath: "inset(0 0 0% 0)" });
        gsap.set(".mnav-item", { y: 0, opacity: 1 });
        return;
      }
      gsap
        .timeline()
        .fromTo(
          menu,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" },
        )
        .fromTo(
          ".mnav-item",
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.2",
        );
    } else {
      document.body.style.overflow = "";
      if (reduce) {
        gsap.set(menu, { display: "none" });
        return;
      }
      gsap.to(menu, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [open]);

  // Close the menu if the viewport grows to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
        setMobileFeaturesOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 md:py-6 z-[9999] bg-white/80 backdrop-blur-md border-b border-slate-100/60">
      <div className="flex items-center gap-2">
        <Link href="/" onClick={closeMobileMenu}>
          <img
            src="/logo.png"
            alt="Fundflick Logo"
            className="h-8 md:h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* ===== Desktop links ===== */}
      <div className="hidden md:flex gap-8 lg:gap-12 text-slate-800 font-semibold tracking-tight items-center">
        <Link href="/" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          Home
        </Link>

        {/* Features Dropdown */}
        <div className="relative group">
          <button
            type="button"
            aria-haspopup="menu"
            className="text-sm hover:text-secondaryColor transition-colors cursor-pointer flex items-center gap-1 font-semibold"
          >
            Features
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:rotate-180">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="grid grid-flow-col grid-rows-3 auto-cols-[minmax(220px,1fr)] gap-x-1 bg-white border border-slate-200/80 rounded-2xl shadow-xl py-2 px-1">
              <Link
                href="/features/hrms"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">HRMS</span>
                  <span className="text-[10px] text-slate-400 font-medium">Attendance, Payroll & more</span>
                </div>
              </Link>
              <Link
                href="/features/collection"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Collection</span>
                  <span className="text-[10px] text-slate-400 font-medium">EMI recovery & tracking</span>
                </div>
              </Link>
              <Link
                href="/features/task-management"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Task Management</span>
                  <span className="text-[10px] text-slate-400 font-medium">Kanban boards & workflows</span>
                </div>
              </Link>
              <Link
                href="/features/loan-origination"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center text-lime-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Loan Origination System</span>
                  <span className="text-[10px] text-slate-400 font-medium">Apply, score & disburse</span>
                </div>
              </Link>
              <Link
                href="/features/loan-management"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Loan Management System</span>
                  <span className="text-[10px] text-slate-400 font-medium">Ledgers, EMI & servicing</span>
                </div>
              </Link>
              <Link
                href="/features/smart-reports"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Smart Reports</span>
                  <span className="text-[10px] text-slate-400 font-medium">Live NPA, yield & exports</span>
                </div>
              </Link>
              <Link
                href="/features/bookkeeping"
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group/item"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 group-hover/item:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900">Bookkeeping</span>
                  <span className="text-[10px] text-slate-400 font-medium">Ledger, GST & audits</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Link href="/#faq" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          FAQ
        </Link>
        <Link href="/about" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          About
        </Link>
        <Link href="/contactus" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          Contact
        </Link>
      </div>

      {/* ===== Right: desktop CTA + mobile hamburger ===== */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block pointer-events-auto">
          <Button href="/contactus" variant="primary">
            Get Started
          </Button>
        </div>

        {/* hamburger / X (mobile) */}
        <button
          onClick={toggleMobileMenu}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden relative z-[10000] flex h-10 w-10 items-center justify-center text-slate-900"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </div>
    </nav>

      {/* ===== Mobile full-screen menu — sibling of <nav> so it escapes the
           navbar's backdrop-blur containing block (else fixed = nav bar only) ===== */}
      <div
        ref={menuRef}
        className="mnav fixed inset-0 z-[9990] hidden flex-col bg-[#0f1729] md:!hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        {/* texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(rgba(148,163,184,0.16) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative flex-1 flex flex-col justify-center overflow-y-auto px-8 pt-24 pb-6">
          <Link
            href={HOME_LINK.href}
            onClick={closeMobileMenu}
            className="mnav-item group flex items-baseline gap-5 border-b border-white/5 py-3.5"
          >
            <span className="font-mono text-xs text-secondaryColor">01</span>
            <span
              className="text-3xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-secondaryColor"
              style={{ fontFamily: "var(--font-outfit), sans-serif" }}
            >
              {HOME_LINK.label}
            </span>
          </Link>

          <div className="mnav-item border-b border-white/5 py-3.5">
            <button
              type="button"
              aria-expanded={mobileFeaturesOpen}
              aria-controls="mobile-features-menu"
              onClick={() => setMobileFeaturesOpen((value) => !value)}
              className="group flex w-full items-baseline justify-between gap-5 text-left"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-xs text-secondaryColor">02</span>
                <span
                  className="text-3xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-secondaryColor"
                  style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                >
                  Features
                </span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className={`mt-2 h-5 w-5 shrink-0 text-secondaryColor transition-transform duration-300 ${
                  mobileFeaturesOpen ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {mobileFeaturesOpen && (
              <div id="mobile-features-menu" className="mt-4 ml-12 flex flex-col gap-3">
                {FEATURE_LINKS.map((feature) => (
                  <Link
                    key={feature.href}
                    href={feature.href}
                    onClick={closeMobileMenu}
                    className="text-base font-semibold text-slate-300 transition-colors hover:text-secondaryColor"
                  >
                    {feature.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {MOBILE_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMobileMenu}
              className="mnav-item group flex items-baseline gap-5 border-b border-white/5 py-3.5"
            >
              <span className="font-mono text-xs text-secondaryColor">
                0{i + 3}
              </span>
              <span
                className="text-3xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-secondaryColor"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                {l.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mnav-item relative px-8 pb-12">
          <Button
            href="/contactus"
            variant="brand"
            className="w-full justify-center py-4 text-base"
          >
            Get Started
          </Button>
          <p className="mt-5 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Fundflick · Lending Operations Suite
          </p>
        </div>
      </div>
    </>
  );
}
