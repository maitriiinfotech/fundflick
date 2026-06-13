"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "brand";
}

export default function Button({
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 select-none cursor-pointer hover:scale-[1.015]";

  const hasRounded = className.includes("rounded-");
  const hasBg = className.includes("bg-");
  const hasPx = className.includes("px-") || className.includes("p-");
  const hasPy = className.includes("py-") || className.includes("p-");
  const hasTextSize =
    className.includes("text-xs") ||
    className.includes("text-sm") ||
    className.includes("text-base") ||
    className.includes("text-lg");

  const variants = {
    primary: `${!hasBg ? "bg-[#131c33] hover:bg-[#1e2a4a] text-white" : ""} ${!hasRounded ? "rounded-full" : ""} ${!hasTextSize ? "text-xs md:text-sm" : ""} ${!hasPx && !hasPy ? "px-6 py-2.5" : ""} shadow-md hover:shadow-lg hover:shadow-slate-900/20`,
    secondary: `border border-secondaryColor ${!hasBg ? "bg-transparent text-secondaryColor hover:bg-secondaryColor hover:text-white" : ""} ${!hasRounded ? "rounded-full" : ""} ${!hasTextSize ? "text-xs md:text-sm" : ""} ${!hasPx && !hasPy ? "px-8 py-3.5" : ""} hover:shadow-lg hover:shadow-secondaryColor/20`,
    outline: `border border-slate-300 hover:border-slate-400 bg-transparent text-slate-700 hover:bg-slate-50 ${!hasRounded ? "rounded-full" : ""} ${!hasTextSize ? "text-xs md:text-sm" : ""} ${!hasPx && !hasPy ? "px-5 py-2.5" : ""}`,
    brand: `${!hasBg ? "bg-secondaryColor hover:bg-blue-600 text-white" : ""} ${!hasRounded ? "rounded-full" : ""} ${!hasTextSize ? "text-xs md:text-sm" : ""} ${!hasPx && !hasPy ? "px-6 py-2.5" : ""} shadow-md hover:shadow-lg hover:shadow-secondaryColor/20`,
  };

  const combinedClass = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClass} onClick={onClick as any}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

