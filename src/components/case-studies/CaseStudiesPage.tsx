"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { CASE_STUDIES, CATEGORY_META, type CaseStudyCategory } from "./caseStudiesData";
import { CaseStudyCard } from "./CaseStudyCard";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ALL = "all" as const;
type Filter = CaseStudyCategory | typeof ALL;

const FILTERS: { key: Filter; label: string }[] = [
  { key: ALL,          label: "All Projects" },
  { key: "saas",       label: "SaaS"         },
  { key: "logistics",  label: "Logistics"    },
  { key: "ecommerce",  label: "E-Commerce"   },
  { key: "web",        label: "Web & Mobile" },
  { key: "publishing", label: "Publishing"   },
  { key: "admin",      label: "Admin Tools"  },
];

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: EASE_OUT } }),
};

export function CaseStudiesPage() {
  const [active, setActive] = useState<Filter>(ALL);
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" } as Parameters<typeof useInView>[1]);

  const filtered = active === ALL ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === active);

  return (
    <div className="bg-[#070B1F] min-h-screen">
      <section className="relative pt-36 pb-20 px-4 sm:px-6 xl:px-8">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.07) 0%, transparent 60%)" }}
          aria-hidden="true"
        />

        <div ref={ref} className="relative max-w-[1360px] mx-auto">

          {/* ── Header ── */}
          <motion.p
            custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4 text-center"
          >
            Real Projects · Live & Deployed
          </motion.p>
          <motion.h1
            custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5 text-center"
          >
            Projects We&apos;ve{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              Built &amp; Shipped
            </span>
          </motion.h1>
          <motion.p
            custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed text-center mb-12"
          >
            9 real products — all live on Vercel. From SaaS scheduling platforms and logistics dashboards
            to e-commerce stores, academic publishing suites, and admin tools.
          </motion.p>

          {/* ── Stats strip ── */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap items-center justify-center gap-6 mb-14"
          >
            {[
              { value: "9",       label: "Projects Shipped"  },
              { value: "100%",    label: "Live on Vercel"    },
              { value: "6",       label: "Industries Served" },
              { value: "Next.js", label: "Primary Stack"     },
            ].map(({ value, label }) => (
              <div key={label} className="text-center px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-[11px] text-white/35 font-medium mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── Filter bar ── */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="flex flex-wrap justify-center gap-2 mb-12"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {FILTERS.map(({ key, label }) => {
              const isActive = active === key;
              const meta = key !== ALL ? CATEGORY_META[key as CaseStudyCategory] : null;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(key)}
                  className={`relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-blue-600/20 border border-blue-500/40 text-blue-300"
                      : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                  }`}
                >
                  {meta && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? meta.dot : "bg-white/25"}`}
                      aria-hidden="true"
                    />
                  )}
                  {label}
                </button>
              );
            })}
          </motion.div>

          {/* ── Grid ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((study, i) => (
              <CaseStudyCard key={study.id} study={study} index={i} animate />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-20 text-center text-white/30 text-lg">
                No projects in this category yet.
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className="mt-16 text-center">
            <p className="text-white/35 text-sm mb-5">
              Impressed? Let&apos;s build your next product together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-all duration-200"
            >
              Start a Project
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
