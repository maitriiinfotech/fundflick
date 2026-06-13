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
      className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 flex flex-col justify-center relative overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif" }}
    >
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-secondaryColor/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      {/* Main Content Grid */}
      <div className="max-w-6xl w-full mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Heading & Contact Info (Grid 5/12) */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondaryColor hover:underline w-fit mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
          >
            Let's build the future of <span className="text-secondaryColor">lending</span> together.
          </h1>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light max-w-md">
            Have questions about our lending automation suite, pricing plans, custom integrations, or compliance? Our team is here to help you scale safely.
          </p>

          {/* Contact Details List */}
          <div className="flex flex-col gap-5 mt-6">
            {/* Email */}
            <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm hover:border-secondaryColor/30 transition-all">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-secondaryColor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Us</span>
                <a href="mailto:support@fundflick.in" className="text-sm font-semibold text-slate-800 hover:underline">
                  support@fundflick.in
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-4 rounded-2xl shadow-sm hover:border-secondaryColor/30 transition-all">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Our HQ</span>
                <span className="text-sm font-semibold text-slate-800">Bangalore, India</span>
              </div>
            </div>
          </div>

          {/* Quick response card */}
          <div className="mt-4 p-4 rounded-2xl bg-secondaryColor/5 border border-secondaryColor/10 flex items-center gap-3 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-secondaryColor">
              Integrations team active: Replies in Under 15 Minutes.
            </span>
          </div>
        </div>

        {/* Right Column: Lead Contact Form (Grid 7/12) */}
        <div ref={rightColRef} className="lg:col-span-7 flex flex-col justify-center">
          
          <div className="w-full bg-white border border-slate-200/80 rounded-[32px] p-6 sm:p-10 shadow-2xl relative">
            
            {isSubmitted ? (
              // Success Thank You Panel
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-6 shadow-lg shadow-emerald-500/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Message Received!</h3>
                <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
                  Thank you for reaching out. A Fundflick integrations specialist will call or email you within 15 minutes.
                </p>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-6 py-2.5 text-xs uppercase tracking-wider"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              // Main Interactive Contact Form
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="border-b border-slate-100 pb-4 mb-2">
                  <h2
                    className="text-2xl font-extrabold text-slate-900 tracking-tight"
                    style={{ fontFamily: "var(--font-outfit), sans-serif" }}
                  >
                    Request a Demo & Callback
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">Fill out the details to initialize your sandbox setup.</p>
                </div>

                {/* Name & Email in parallel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Business Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. rahul@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Company / NBFC Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="e.g. FinGrow Capital"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Monthly Volume Select dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="volume" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Monthly Loan Disbursement Volume
                  </label>
                  <select
                    id="volume"
                    value={formState.volume}
                    onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm"
                  >
                    <option>Under ₹10 Lakhs</option>
                    <option>₹10 Lakhs - ₹50 Lakhs</option>
                    <option>₹50 Lakhs - ₹2 Crores</option>
                    <option>₹2 Crores - ₹10 Crores</option>
                    <option>Above ₹10 Crores</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Message / Special Integration Needs
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your lending operations, workflows, or custom integration needs..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-secondaryColor focus:outline-none transition-all text-sm bg-slate-50/50 resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="brand"
                  className="w-full mt-2 py-4 rounded-xl text-xs uppercase tracking-wider gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4.5 w-4.5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Request & Get Callback"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
