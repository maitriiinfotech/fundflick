"use client";

import React from "react";
import Link from "next/link";
import Button from "../ui/Button";

const PRODUCT_LINKS = [
  { label: "HRMS", href: "/features/hrms" },
  { label: "Collection Management", href: "/features/collection" },
  { label: "Task Management", href: "/features/task-management" },
  { label: "Loan Origination", href: "/features/loan-origination" },
  { label: "Loan Management", href: "/features/loan-management" },
  { label: "Smart Reports", href: "/features/smart-reports" },
  { label: "Bookkeeping & Accounts", href: "/features/bookkeeping" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contactus" },
  { label: "Careers", href: "/contactus" },
  { label: "Blog", href: "/contactus" },
];

const RESOURCE_LINKS = [
  { label: "Guides", href: "/guides" },
 
  { label: "FAQ", href: "/#faq" },

];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security", href: "/security" },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#131c33] text-white overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top section — CTA banner */}
        <div className="py-12 sm:py-16 border-b border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
                style={{ fontFamily: "var(--font-outfit), sans-serif" }}
              >
                Ready to transform your business?
              </h3>
              <p className="text-slate-200 text-sm font-light max-w-md">
                Start your free trial today. No credit card required.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                href="/contactus"
                variant="brand"
                className="px-6 py-3 text-sm whitespace-nowrap"
              >
                Start Free Trial
              </Button>
              <Button
                href="/contactus"
                variant="outline"
                className="px-6 py-3 text-sm border-white/20 text-white hover:bg-white/5 bg-transparent whitespace-nowrap"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-8">
          {/* Products */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-100 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-100 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-100 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-100 hover:text-white transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-4">
            <Link href="/">
              {/* Old PNG logo — kept for reference */}
              {/* <img
                src="/logo.png"
                alt="Fundflick Logo"
                className="h-8 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              /> */}
              <img
                src="/logo/fundflick-logo.svg"
                alt="Fundflick Logo"
                className="h-8 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <span className="text-[11px] text-slate-300 font-light">
              © {new Date().getFullYear()} Fundflick. All rights reserved.
            </span>
          </div>

          {/* App store badges */}
          <div className="flex items-center gap-3">
            {/* App Store — coming soon */}
            <div
              aria-label="App Store — coming soon"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3.5 py-2 opacity-70 cursor-default"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[8px] font-bold text-yellow-400 uppercase tracking-wide">
                  Coming soon
                </span>
                <span className="text-sm font-semibold text-white">App Store</span>
              </span>
            </div>
            {/* Google Play */}
            <a
              href="#"
              aria-label="Get it on Google Play"
              className="flex items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.06] px-3.5 py-2 hover:bg-white/[0.12] transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z" fill="#00A0FF" />
                <path d="M13.544 10.989l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z" fill="#00E676" />
                <path d="M13.544 13.056l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" fill="#FF3D00" />
                <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" fill="#FFC400" />
              </svg>
              <span className="flex flex-col leading-none">
                <span className="text-[8px] text-slate-300 uppercase tracking-wide">
                  Get it on
                </span>
                <span className="text-sm font-semibold text-white">Google Play</span>
              </span>
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/maitrii-infotech-solutions-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maitrii Infotech on LinkedIn"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/maitrii_infotech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maitrii Infotech on Instagram"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            {/* X */}
            <a
              href="https://x.com/maitriiinfotech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Maitrii Infotech on X"
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0f1419] hover:border-[#0f1419] transition-all duration-200"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
