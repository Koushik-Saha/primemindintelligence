"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  TECH_STACK,
  CATEGORY_META,
  type TechItem,
  type TechCategory,
} from "./socialProofData";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
};

const badgeVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85, y: 12 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45, ease: EASE_OUT } },
};

const tooltipVariants: Variants = {
  hidden:  { opacity: 0, y: 6,  scale: 0.92 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.18, ease: "easeOut" } },
  exit:    { opacity: 0, y: 4,  scale: 0.94, transition: { duration: 0.12, ease: "easeIn"  } },
};

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT } },
};

// ─── Category filter pill ────────────────────────────────────────────────────

const ALL = "all" as const;
type Filter = TechCategory | typeof ALL;

const FILTERS: { key: Filter; label: string }[] = [
  { key: ALL,        label: "All"      },
  { key: "frontend", label: "Frontend" },
  { key: "backend",  label: "Backend"  },
  { key: "database", label: "Database" },
  { key: "ai-ml",    label: "AI / ML"  },
  { key: "devops",   label: "DevOps"   },
];

// ─── Single tech badge ────────────────────────────────────────────────────────

function TechBadge({ tech }: { tech: TechItem }) {
  const [hovered, setHovered] = useState(false);
  const meta = CATEGORY_META[tech.category];

  return (
    <motion.div
      variants={badgeVariants}
      className="relative inline-flex"
      onHoverStart={() => setHovered(true)}
      onHoverEnd ={() => setHovered(false)}
      onFocus    ={() => setHovered(true)}
      onBlur     ={() => setHovered(false)}
    >
      {/* Badge pill */}
      <motion.button
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`
          group inline-flex items-center gap-2
          px-3.5 py-2 rounded-xl
          ${meta.bg} border ${meta.border}
          cursor-default
          transition-[background,border-color,box-shadow] duration-200
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        `}
        aria-label={`${tech.name} — ${meta.label}`}
        type="button"
      >
        {/* Colored dot indicator */}
        <span
          className={`flex-shrink-0 w-1.5 h-1.5 rounded-full ${meta.dot}`}
          aria-hidden="true"
        />

        {/* Abbr icon (monospace) */}
        <span
          className={`
            flex-shrink-0 text-[9px] font-black tracking-wide
            font-mono leading-none ${meta.text} opacity-70
          `}
          aria-hidden="true"
        >
          {tech.abbr.length > 2 ? tech.abbr : tech.abbr}
        </span>

        {/* Tech name */}
        <span className={`text-[13px] font-semibold ${meta.text} whitespace-nowrap`}>
          {tech.name}
        </span>
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="tooltip"
            role="tooltip"
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5
              pointer-events-none z-50 whitespace-nowrap
            "
          >
            {/* Tooltip body */}
            <div
              className={`
                flex items-center gap-1.5
                px-2.5 py-1.5 rounded-lg
                bg-[#0D1631] border border-white/[0.12]
                shadow-[0_8px_24px_rgba(0,0,0,0.5)]
              `}
            >
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${meta.dot}`} aria-hidden="true" />
              <span className={`text-[11px] font-semibold ${meta.text}`}>{meta.label}</span>
            </div>
            {/* Arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-0 h-0"
              style={{
                borderLeft:  "5px solid transparent",
                borderRight: "5px solid transparent",
                borderTop:   "5px solid rgba(13,22,49,1)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── TechStack section ────────────────────────────────────────────────────────

export function TechStack() {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  const filtered = activeFilter === ALL
    ? TECH_STACK
    : TECH_STACK.filter((t) => t.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="tech-heading"
      className="relative bg-[#0F172A] py-20 overflow-hidden"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(96,165,250,1) 1px,transparent 1px), linear-gradient(90deg,rgba(96,165,250,1) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Top edge line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-3">
            Technology Arsenal
          </p>
          <h2
            id="tech-heading"
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4"
          >
            Tools &amp; Platforms We{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              Master
            </span>
          </h2>
          <p className="text-[14px] text-white/45 max-w-md mx-auto">
            Battle-tested technologies selected for performance, scalability, and long-term support.
          </p>
        </motion.div>

        {/* Category filter bar */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter by category"
        >
          {FILTERS.map(({ key, label }) => {
            const isActive = activeFilter === key;
            const meta = key !== ALL ? CATEGORY_META[key] : null;

            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(key)}
                className={`
                  relative inline-flex items-center gap-1.5
                  px-3.5 py-1.5 rounded-lg
                  text-[12px] font-semibold tracking-wide
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  ${isActive
                    ? "bg-blue-600/20 border border-blue-500/40 text-blue-300"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.07]"
                  }
                `}
              >
                {meta && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? meta.dot : "bg-white/25"}`}
                    aria-hidden="true"
                  />
                )}
                {label}
                {/* Active indicator */}
                {isActive && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute inset-0 rounded-lg bg-blue-600/10"
                    style={{ zIndex: -1 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Badge grid with AnimatePresence for filter transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="flex flex-wrap justify-center gap-3"
            role="list"
            aria-label={`${activeFilter === ALL ? "All" : CATEGORY_META[activeFilter as TechCategory].label} technologies`}
          >
            {filtered.map((tech) => (
              <div key={tech.id} role="listitem">
                <TechBadge tech={tech} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
          aria-label="Category legend"
        >
          {(Object.entries(CATEGORY_META) as [TechCategory, typeof CATEGORY_META[TechCategory]][]).map(
            ([key, meta]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className="
                  flex items-center gap-1.5 group
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
                "
                aria-label={`Filter by ${meta.label}`}
              >
                <span className={`w-2 h-2 rounded-full ${meta.dot} flex-shrink-0`} aria-hidden="true" />
                <span className="text-[11px] text-white/35 group-hover:text-white/60 transition-colors duration-150">
                  {meta.label}
                </span>
              </button>
            )
          )}
        </motion.div>

      </div>
    </section>
  );
}
