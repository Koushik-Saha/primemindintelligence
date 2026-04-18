"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { ACCENT_STYLES, type CaseStudy } from "./caseStudiesData";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const cardRevealVariants: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
  }),
};

const overlayVariants: Variants = {
  rest:  { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

const arrowVariants: Variants = {
  rest:  { x: 0, opacity: 0.7 },
  hover: { x: 5, opacity: 1,  transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── CaseStudyCard ────────────────────────────────────────────────────────────

interface Props {
  study: CaseStudy;
  index: number;
  animate?: boolean;
}

export function CaseStudyCard({ study, index, animate = true }: Props) {
  const accent = ACCENT_STYLES[study.accentColor];
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={animate ? cardRevealVariants : undefined}
      initial={animate ? "hidden" : undefined}
      animate={animate && inView ? "visible" : animate ? "hidden" : undefined}
      whileHover="hover"
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* ── Card background ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, ${study.gradientFrom}55 0%, ${study.gradientTo} 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px,transparent 1px), linear-gradient(90deg,rgba(148,163,184,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card border */}
      <div
        className={`absolute inset-0 rounded-2xl border border-white/[0.07] group-hover:${accent.border} transition-colors duration-300`}
        aria-hidden="true"
      />

      {/* Glow on hover */}
      <motion.div
        variants={{
          rest:  { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } },
        }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `0 0 50px ${accent.glow}`,
        }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-7 flex flex-col h-full min-h-[400px]">

        {/* Top row: icon + category pill */}
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.iconBg} border border-white/[0.1]`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-5 h-5 ${accent.iconColor}`}
              aria-hidden="true"
            >
              <path d={study.iconPath} />
            </svg>
          </div>

          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${accent.pill}`}>
            {study.categoryLabel}
          </span>
        </div>

        {/* Client + tagline */}
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/35 mb-1.5">
          {study.tagline}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-snug mb-3 tracking-tight">
          {study.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed mb-6 flex-grow">
          {study.description}
        </p>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5"
            >
              <div className={`text-lg font-black ${accent.metric} leading-none mb-0.5`}>
                {m.value}
              </div>
              <div className="text-[10px] text-white/35 leading-tight font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {study.services.map((s) => (
            <span
              key={s}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.05] text-white/40 border border-white/[0.07]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/25">
            {study.duration} · {study.year}
          </span>

          <motion.div
            className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${accent.iconColor}`}
            variants={arrowVariants}
          >
            View Case Study
            {/* Arrow icon */}
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ── Hover overlay ─────────────────────────────────────────────────── */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl"
        style={{
          background: `linear-gradient(145deg, ${study.gradientFrom}EE 0%, ${study.gradientTo}F0 100%)`,
          backdropFilter: "blur(2px)",
        }}
        aria-hidden="true"
      >
        {/* Client name big */}
        <div className="text-center px-8 pointer-events-none select-none">
          <p className={`text-[11px] font-bold tracking-[0.2em] uppercase ${accent.iconColor} mb-2`}>
            {study.client}
          </p>
          <h4 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">
            {study.title}
          </h4>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
            {study.description}
          </p>
        </div>

        {/* CTA button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className={`
            mt-8 pointer-events-auto inline-flex items-center gap-2
            px-6 py-2.5 rounded-xl border
            ${accent.pill}
            text-[13px] font-semibold tracking-wide
            hover:brightness-110 transition-[filter] duration-150
          `}
          type="button"
        >
          View Case Study
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
