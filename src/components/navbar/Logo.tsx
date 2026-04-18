"use client";

import Link from "next/link";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Prime Mind Intelligence — Home"
      className={`flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md ${className}`}
    >
      {/* Circuit-brain SVG icon */}
      <span className="relative flex-shrink-0 w-8 h-8">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          aria-hidden="true"
        >
          {/* Outer glow ring */}
          <circle
            cx="16"
            cy="16"
            r="14"
            stroke="#2563EB"
            strokeWidth="1"
            strokeDasharray="3 2"
            className="opacity-40"
          />
          {/* Brain lobes */}
          <path
            d="M16 8C13 8 10 10.5 10 13.5C10 15.5 11 17 12.5 18L12 22H20L19.5 18C21 17 22 15.5 22 13.5C22 10.5 19 8 16 8Z"
            fill="#2563EB"
            fillOpacity="0.15"
            stroke="#2563EB"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* Center divider */}
          <line
            x1="16"
            y1="8.5"
            x2="16"
            y2="22"
            stroke="#06B6D4"
            strokeWidth="0.75"
            strokeDasharray="2 1.5"
          />
          {/* Circuit nodes */}
          <circle cx="12" cy="13" r="1.25" fill="#06B6D4" />
          <circle cx="20" cy="13" r="1.25" fill="#06B6D4" />
          <circle cx="14" cy="17" r="1"   fill="#2563EB" />
          <circle cx="18" cy="17" r="1"   fill="#2563EB" />
          <circle cx="16" cy="22" r="1.5" fill="#2563EB" />
          {/* Circuit traces */}
          <polyline
            points="10,16 8,16 8,24 12,24"
            stroke="#2563EB"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-60"
          />
          <polyline
            points="22,16 24,16 24,24 20,24"
            stroke="#2563EB"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="opacity-60"
          />
          {/* Pin dots on traces */}
          <circle cx="8"  cy="24" r="1" fill="#06B6D4" className="opacity-70" />
          <circle cx="24" cy="24" r="1" fill="#06B6D4" className="opacity-70" />
        </svg>
        {/* Subtle pulse ring on hover */}
        <span className="absolute inset-0 rounded-full bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none select-none">
        <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-blue-100 transition-colors duration-200">
          Prime Mind
        </span>
        <span className="text-cyan-400 font-semibold text-[11px] tracking-[0.12em] uppercase">
          Intelligence
        </span>
      </span>
    </Link>
  );
}
