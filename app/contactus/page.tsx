"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Button from "../components/ui/Button";

export default function ContactUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    volume: "Under ₹10 Lakhs",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Staggered entrance animation for page elements
    const leftChildren = leftColRef.current?.children;
    const rightChildren = rightColRef.current?.children;

    const tl = gsap.timeline();

    if (leftChildren && rightChildren) {
      tl.fromTo(
        Array.from(leftChildren),
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      ).fromTo(
        Array.from(rightChildren),
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.6"
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      company: "",
      volume: "Under ₹10 Lakhs",
      message: "",
    });
    setIsSubmitted(false);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white text-slate-900 pt-28 pb-24 relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Awwwards-level premium background — clean white with refined dot grid + subtle navy/blue glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:26px_26px] opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[620px] h-[620px] bg-[#131c33]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-[-80px] w-[520px] h-[520px] bg-[#2b7fff]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Content — generous Awwwards spacing */}
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start pt-8">
          
          {/* Left Column — Strong, confident copy + refined contact details */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[1.5px] text-[#131c33] hover:text-[#2b7fff] transition-colors w-fit group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              BACK TO HOME
            </Link>

            <div>
              <h1
                className="text-[42px] sm:text-[52px] lg:text-[56px] font-extrabold tracking-[-1.8px] leading-[0.96] text-[#131c33] mb-6"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Let&apos;s build the<br /> future of lending<br /> together.
              </h1>
              <p className="text-lg text-slate-600 font-light max-w-[420px] leading-snug">
                Questions about integrations, pricing, or custom workflows? 
                Our team replies in under 15 minutes.
              </p>
            </div>

            {/* Updated contact details matching live site + new info */}
            <div className="flex flex-col gap-4">
              {/* Customer Care */}
              <div className="group bg-white border border-slate-200/70 hover:border-[#131c33]/30 p-5 rounded-3xl transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-2xl bg-[#131c33] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.9">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-mono uppercase tracking-[1px] text-slate-400 mb-1">CUSTOMER CARE</div>
                    <a href="tel:+917792077777" className="text-[#131c33] font-semibold hover:text-[#2b7fff] transition-colors block">+91 7792077777</a>
              
                    <div className="mt-2 text-xs text-slate-500 leading-tight">
                      Hours: 10:30 am - 7:00 pm<br />
                      Monday to Saturday<br />
                      (excluding public holidays)
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Us */}
              <a 
                href="mailto:utkarsh@maitriiinfotech.com"
                className="group flex items-center gap-5 bg-white border border-slate-200/70 hover:border-[#131c33]/30 p-5 rounded-3xl transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#131c33] flex items-center justify-center text-white shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[1px] text-slate-400 mb-px">EMAIL US</div>
                  <div className="text-[#131c33] font-semibold group-hover:text-[#2b7fff] transition-colors">utkarsh@maitriiinfotech.com</div>
                </div>
              </a>

              {/* Visit Us */}
              <div className="flex items-start gap-5 bg-white border border-slate-200/70 p-5 rounded-3xl">
                <div className="w-11 h-11 rounded-2xl bg-[#131c33] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[1px] text-slate-400 mb-px">VISIT US</div>
                  <div className="text-[#131c33] font-semibold leading-tight">
                    11/70 Madhyam Marg,<br />
                    Mansarovar, Jaipur - 302021
                  </div>
                </div>
              </div>
            </div>

            {/* Trust bar — updated to match live hours style */}
            
          </div>

          {/* Right Column — The simple, beautiful form */}
          <div ref={rightColRef} className="lg:col-span-7">
            <div className="bg-white border border-slate-200/80 rounded-[28px] p-8 sm:p-12 shadow-[0_25px_70px_-15px_rgb(15,23,42,0.12)] relative overflow-hidden">
              
              {/* Subtle inner glow for premium feel */}
              <div className="absolute inset-0 bg-[radial-gradient(#f8fafc_1px,transparent_1px)] [background-size:4px_4px] opacity-40 pointer-events-none" />

              {isSubmitted ? (
                // Success state — elegant & confident
                <div className="py-14 flex flex-col items-center justify-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-[#131c33] flex items-center justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 
                    className="text-3xl font-extrabold tracking-tight text-[#131c33] mb-3"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    Request received.
                  </h3>
                  <p className="text-slate-600 max-w-[320px] leading-relaxed mb-10 text-[15px]">
                    Our team will get back to you within 24 hours (Monday Saturday, 10:30am–7pm).
                  </p>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-8 py-3 text-xs uppercase tracking-[1px]"
                  >
                    Send another request
                  </Button>
                </div>
              ) : (
                // The simple, premium form
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                  <div className="mb-1">
                    <div className="inline-block text-[10px] font-bold uppercase tracking-[2px] text-[#131c33]/60 mb-3">15-MINUTE CALLBACK</div>
                    <h2 
                      className="text-[28px] sm:text-[32px] font-extrabold tracking-[-0.6px] leading-none text-[#131c33]"
                      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                    >
                      Request a Demo
                    </h2>
                  </div>

                  {/* Clean two-column fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Rahul Sharma"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-5 py-[17px] rounded-2xl border border-slate-200 bg-white text-[15px] placeholder:text-slate-400 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Business Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="you@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-[17px] rounded-2xl border border-slate-200 bg-white text-[15px] placeholder:text-slate-400 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-5 py-[17px] rounded-2xl border border-slate-200 bg-white text-[15px] placeholder:text-slate-400 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Company / NBFC</label>
                      <input
                        type="text"
                        id="company"
                        required
                        placeholder="FinGrow Capital"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-5 py-[17px] rounded-2xl border border-slate-200 bg-white text-[15px] placeholder:text-slate-400 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="volume" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">Monthly Disbursement Volume</label>
                    <select
                      id="volume"
                      value={formState.volume}
                      onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                      className="w-full px-5 py-[17px] rounded-2xl border border-slate-200 bg-white text-[15px] text-slate-700 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all"
                    >
                      <option>Under ₹10 Lakhs</option>
                      <option>₹10 Lakhs - ₹50 Lakhs</option>
                      <option>₹50 Lakhs - ₹2 Crores</option>
                      <option>₹2 Crores - ₹10 Crores</option>
                      <option>Above ₹10 Crores</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-2">How can we help?</label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your current challenges or what you're looking to achieve..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white text-[15px] placeholder:text-slate-400 focus:border-[#131c33] focus:ring-1 focus:ring-[#131c33]/10 outline-none transition-all resize-y min-h-[108px]"
                      required
                    />
                  </div>

                  {/* The button — exact same theme & color as Navbar "Get Started" */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="w-full mt-2 py-[19px] text-sm tracking-[0.75px] rounded-2xl"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-3">
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        PROCESSING...
                      </span>
                    ) : (
                      "GET STARTED"
                    )}
                  </Button>

                  <p className="text-center text-[10px] text-slate-400 tracking-wider mt-1">Your information is secure and never shared.</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
