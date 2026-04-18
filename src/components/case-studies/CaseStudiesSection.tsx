"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CASE_STUDIES,
  CATEGORY_META,
  type CaseStudyCategory,
} from "./caseStudiesData";
import { CaseStudyCard } from "./CaseStudyCard";

// ─── Types ────────────────────────────────────────────────────────────────────

const ALL = "all" as const;
type Filter = CaseStudyCategory | typeof ALL;

const FILTERS: { key: Filter; label: string }[] = [
  { key: ALL,          label: "All Work"   },
  { key: "fintech",    label: "Fintech"    },
  { key: "healthtech", label: "HealthTech" },
  { key: "logistics",  label: "Logistics"  },
  { key: "ecommerce",  label: "E-Commerce" },
  { key: "saas",       label: "SaaS"       },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT } },
};

const gridVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE_OUT } },
  exit:    { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
};

// ─── CaseStudiesSection ───────────────────────────────────────────────────────

export function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-60px" });

  const filtered =
    activeFilter === ALL
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeFilter);

  return (
    <section
      aria-labelledby="case-studies-heading"
      className="relative bg-[#080D22] py-28 overflow-hidden"
    >
      {/* ── Background decorations ───────────────────────────────────────── */}

      {/* Radial glow top-right */}
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Radial glow bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top separator line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">
            Our Work
          </p>
          <h2
            id="case-studies-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5"
          >
            Case Studies That{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)",
              }}
            >
              Prove the Point
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Real challenges, measurable outcomes. Every engagement starts with understanding
            the business problem — the technology comes second.
          </p>
        </motion.div>

        {/* ── Filter bar ──────────────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filter case studies by industry"
        >
          {FILTERS.map(({ key, label }) => {
            const isActive = activeFilter === key;
            const meta     = key !== ALL ? CATEGORY_META[key as CaseStudyCategory] : null;

            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(key)}
                className={`
                  relative inline-flex items-center gap-1.5
                  px-4 py-1.5 rounded-lg
                  text-[12px] font-semibold tracking-wide
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${
                    isActive
                      ? "bg-blue-600/20 border border-blue-500/40 text-blue-300"
                      : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                  }
                `}
              >
                {meta && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isActive ? meta.dot : "bg-white/25"
                    }`}
                    aria-hidden="true"
                  />
                )}
                {label}

                {/* Sliding active underline */}
                {isActive && (
                  <motion.span
                    layoutId="cs-filter-indicator"
                    className="absolute inset-0 rounded-lg bg-blue-600/10"
                    style={{ zIndex: -1 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ── Card grid ───────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((study, i) => (
                <motion.div key={study.id} variants={cardVariants}>
                  <CaseStudyCard study={study} index={i} animate={false} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center"
              >
                <p className="text-white/30 text-lg">
                  No case studies in this category yet — check back soon.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
          <p className="text-white/35 text-sm mb-5">
            Want to see what we can build for you?
          </p>
          <a
            href="/contact"
            className="
              inline-flex items-center gap-2
              px-7 py-3 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold text-sm tracking-wide
              shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)]
              transition-all duration-200
            "
          >
            Start Your Project
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
