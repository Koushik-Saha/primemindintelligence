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

const arrowVariants: Variants = {
  rest:  { x: 0, opacity: 0.7 },
  hover: { x: 5, opacity: 1,  transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── External link icon ───────────────────────────────────────────────────────

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L7 10"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── GitHub icon ──────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
      className="group relative rounded-2xl overflow-hidden"
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
        style={{ boxShadow: `0 0 50px ${accent.glow}` }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 p-7 flex flex-col h-full min-h-[460px]">

        {/* Top row: icon + category pill */}
        <div className="flex items-start justify-between mb-5">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.iconBg} border border-white/[0.1]`}>
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
        <p className="text-sm text-white/50 leading-relaxed mb-5 flex-grow">
          {study.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {study.techStack.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-white/45 border border-white/[0.08]"
            >
              {t}
            </span>
          ))}
          {study.techStack.length > 5 && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30 border border-white/[0.06]">
              +{study.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {study.services.map((s) => (
            <span
              key={s}
              className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.06]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
          <span className="text-[11px] text-white/25">
            {study.duration} · {study.year}
          </span>

          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${study.client}`}
              onClick={(e) => e.stopPropagation()}
              className={`${accent.iconColor} opacity-60 hover:opacity-100 transition-opacity duration-150`}
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            {/* Live demo */}
            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 text-[11px] font-semibold ${accent.iconColor} opacity-75 hover:opacity-100 transition-opacity duration-150`}
            >
              <motion.span variants={arrowVariants}>Live Demo</motion.span>
              <ExternalLinkIcon className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
