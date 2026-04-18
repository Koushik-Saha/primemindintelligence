"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

import { SERVICES }                        from "./servicesData";
import { ServiceCard, cardRevealVariants } from "./ServiceCard";

// ─── Animation variants ────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

const gridContainerVariants: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.15,
    },
  },
};

const ctaVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.3 } },
};

// ─── Dot-grid background ──────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette mask so dots fade at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,#0F172A_100%)]" />

      {/* Ambient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-blue-800/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-cyan-900/10 blur-[90px]" />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Header InView trigger
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  // Grid InView trigger
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  // CTA InView trigger
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[#0F172A] py-24 sm:py-32 overflow-hidden"
    >
      <DotGrid />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Section header ────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          {/* Label */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 flex items-center justify-center gap-2">
            <span className="inline-block w-6 h-px bg-cyan-400/50" aria-hidden="true" />
            What We Do
            <span className="inline-block w-6 h-px bg-cyan-400/50" aria-hidden="true" />
          </p>

          {/* Heading */}
          <h2
            id="services-heading"
            className="text-4xl sm:text-[42px] font-extrabold text-white leading-tight tracking-tight mb-5"
          >
            End-to-End{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#2563EB,#06B6D4)" }}
            >
              Technology
            </span>{" "}
            Services
          </h2>

          {/* Sub-text */}
          <p className="text-[16px] text-white/55 leading-relaxed">
            From ideation to deployment — we deliver software solutions that
            drive real business outcomes.
          </p>
        </motion.div>

        {/* ── Service cards grid ────────────────────────────────────── */}
        <motion.div
          ref={gridRef}
          variants={gridContainerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6"
          role="list"
          aria-label="Our services"
        >
          {SERVICES.map((service) => (
            <div key={service.id} role="listitem">
              <ServiceCard
                service={service}
                isDimmed={hoveredId !== null && hoveredId !== service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            </div>
          ))}
        </motion.div>

        {/* ── Stats strip ───────────────────────────────────────────── */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          ref={ctaRef}
          className="mt-16 mb-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { value: "6+",    label: "Service Areas" },
            { value: "50+",   label: "Projects Delivered" },
            { value: "99.9%", label: "Avg Uptime SLA" },
            { value: "24 hr", label: "Response Guarantee" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
                {value}
              </p>
              <p className="text-[11px] text-white/40 font-medium mt-1 uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── CTA row ───────────────────────────────────────────────── */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="
              group inline-flex items-center gap-2.5
              h-12 px-8 rounded-xl
              border border-white/20 hover:border-blue-500/60
              text-white/80 hover:text-white
              text-[14px] font-semibold tracking-wide
              hover:bg-blue-600/10
              transition-all duration-250
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]
            "
          >
            View All Services
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="/contact"
            className="
              inline-flex items-center gap-2.5
              h-12 px-8 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white text-[14px] font-semibold tracking-wide
              shadow-[0_0_20px_rgba(37,99,235,0.35)]
              hover:shadow-[0_0_36px_rgba(37,99,235,0.65)]
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]
            "
          >
            Start a Project
          </Link>
        </motion.div>

      </div>

      {/* ── Bottom edge fade ──────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0A0F2C] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
