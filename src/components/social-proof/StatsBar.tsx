"use client";

import { useRef, Fragment } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

import { useCountUp }   from "@/hooks/useCountUp";
import { STATS, type StatItem } from "./socialProofData";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

// ─── Single stat ──────────────────────────────────────────────────────────────

function StatItem({ stat, trigger }: { stat: StatItem; trigger: boolean }) {
  const count = useCountUp(stat.value, 2200, trigger, stat.decimals ?? 0);

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center px-6 py-8 lg:py-10"
    >
      {/* Number */}
      <div className="flex items-end gap-1 mb-2">
        <span
          className="
            text-5xl lg:text-6xl font-extrabold tabular-nums leading-none
            bg-clip-text text-transparent
          "
          style={{ backgroundImage: "linear-gradient(135deg, #3B82F6, #06B6D4)" }}
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </span>
        <span
          className="text-2xl lg:text-3xl font-extrabold text-cyan-400 leading-none mb-1"
          aria-hidden="true"
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-[15px] font-bold text-white mb-1 tracking-tight">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-[12px] text-white/40 leading-snug max-w-[160px]">
        {stat.description}
      </p>
    </motion.div>
  );
}

// ─── Vertical divider ─────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="hidden lg:block self-stretch w-px flex-shrink-0 my-6"
      style={{
        background:
          "linear-gradient(180deg, transparent, rgba(6,182,212,0.25), transparent)",
      }}
      aria-hidden="true"
    />
  );
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────

export function StatsBar() {
  const sectionRef  = useRef<HTMLElement>(null);
  const inView      = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      aria-label="Key statistics"
      className="relative overflow-hidden bg-[#070C1D]"
    >
      {/* Top + bottom gradient edges */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.4),rgba(6,182,212,0.4),transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.25),transparent)" }}
        aria-hidden="true"
      />

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid container */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]"
          role="list"
        >
          {STATS.map((stat, i) => (
            <Fragment key={stat.id}>
              <div role="listitem">
                <StatItem stat={stat} trigger={inView} />
              </div>
              {/* Divider after every item except last */}
              {i < STATS.length - 1 && <Divider />}
            </Fragment>
          ))}
        </motion.div>
      </div>

      {/* Mobile horizontal divider between rows */}
      <div
        className="lg:hidden absolute top-1/2 inset-x-8 h-px -translate-y-1/2"
        style={{ background: "linear-gradient(90deg,transparent,rgba(6,182,212,0.2),transparent)" }}
        aria-hidden="true"
      />
    </section>
  );
}
