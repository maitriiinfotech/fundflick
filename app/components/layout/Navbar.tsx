import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 md:py-6 z-[9999] bg-white/80 backdrop-blur-md border-b border-slate-100/60">
      <div className="flex items-center gap-2">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Fundflick Logo"
            className="h-8 md:h-10 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>
      <div className="hidden md:flex gap-8 lg:gap-12 text-slate-800 font-semibold tracking-tight">
        <Link href="#work" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          Work
        </Link>
        <Link href="#studio" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          Studio
        </Link>
        <Link href="#news" className="text-sm hover:text-secondaryColor transition-colors cursor-pointer">
          News
        </Link>
      </div>
      <div className="pointer-events-auto">
        <Link
          href="/contactus"
          className="px-5 py-2.5 rounded-full bg-secondaryColor hover:opacity-90 text-white text-xs md:text-sm font-semibold tracking-tight transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondaryColor/25"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
