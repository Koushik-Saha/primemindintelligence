"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Phase {
  step: number;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  duration: string;
  iconPath: string;
}

const PHASES: Phase[] = [
  {
    step: 1,
    title: "Discovery",
    tagline: "Understand before we build",
    description:
      "We start with structured discovery workshops — business goals, user journeys, technical constraints, and success metrics. No assumptions, no templates. Everything is mapped to your specific context.",
    deliverables: ["Problem statement doc", "Stakeholder map", "Success KPIs", "Scope & risk register"],
    duration: "1–2 weeks",
    iconPath:
      "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    step: 2,
    title: "Strategy",
    tagline: "Align on the right approach",
    description:
      "Architecture decisions, technology selection, and a phased delivery roadmap. We present options with trade-offs — not a single prescribed path — so you make informed choices backed by data.",
    deliverables: ["Technical architecture", "Tech stack rationale", "Delivery roadmap", "Cost/risk analysis"],
    duration: "1 week",
    iconPath:
      "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    step: 3,
    title: "Design",
    tagline: "Make it real before writing a line",
    description:
      "High-fidelity UI/UX prototypes validated with real users. System design diagrams, API contracts, and data models are locked before development begins — reducing costly changes later.",
    deliverables: ["Interactive prototypes", "Design system tokens", "API contracts", "Data model diagrams"],
    duration: "2–3 weeks",
    iconPath:
      "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    step: 4,
    title: "Build",
    tagline: "Ship in measurable increments",
    description:
      "Two-week sprints with a demo at the end of every cycle. You see working software, not status reports. Automated CI/CD, code review gates, and test coverage thresholds are non-negotiable.",
    deliverables: ["Sprint demos", "CI/CD pipeline", "Test suite (>80% coverage)", "Changelog"],
    duration: "4–16 weeks",
    iconPath:
      "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    step: 5,
    title: "Launch",
    tagline: "Go live with confidence",
    description:
      "Staged rollout with feature flags, load testing, and a monitored production release. We stay on-call for 72 hours post-launch to catch anything that only surfaces at scale.",
    deliverables: ["Production deployment", "Load test report", "Runbook", "72h on-call"],
    duration: "1 week",
    iconPath:
      "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    step: 6,
    title: "Optimise",
    tagline: "Measure, learn, iterate",
    description:
      "Post-launch analytics review, performance tuning, and a prioritised backlog of improvements based on real user data. The relationship continues — we treat every launch as iteration one.",
    deliverables: ["Analytics report", "Performance audit", "Prioritised backlog", "Retro document"],
    duration: "Ongoing",
    iconPath:
      "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT } },
};

const panelVariants: Variants = {
  hidden:  { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.38, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

// ─── Desktop phase item ───────────────────────────────────────────────────────

function DesktopPhase({
  phase,
  isActive,
  onClick,
  index,
  inView,
}: {
  phase: Phase;
  isActive: boolean;
  onClick: () => void;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE_OUT }}
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-3 px-2 pb-2
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl
        transition-all duration-200
      `}
      aria-expanded={isActive}
      type="button"
    >
      {/* Connector line (all but last) */}
      {index < PHASES.length - 1 && (
        <span
          className="absolute top-6 left-[calc(50%+28px)] right-0 h-px pointer-events-none"
          style={{
            background: isActive
              ? "linear-gradient(90deg,rgba(37,99,235,0.7),rgba(37,99,235,0.15))"
              : "rgba(255,255,255,0.07)",
            transition: "background 0.3s",
          }}
          aria-hidden="true"
        />
      )}

      {/* Step circle */}
      <div
        className={`
          relative z-10 w-12 h-12 rounded-full flex items-center justify-center
          border transition-all duration-200 flex-shrink-0
          ${isActive
            ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.6)]"
            : "bg-white/[0.04] border-white/[0.12] group-hover:border-blue-500/40 group-hover:bg-white/[0.07]"
          }
        `}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={isActive ? 2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"} transition-colors duration-200`}
          aria-hidden="true"
        >
          <path d={phase.iconPath} />
        </svg>

        {/* Step number badge */}
        <span
          className={`
            absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full
            text-[8px] font-black flex items-center justify-center
            ${isActive ? "bg-cyan-400 text-[#0A0F2C]" : "bg-white/[0.12] text-white/40"}
            transition-all duration-200
          `}
        >
          {phase.step}
        </span>
      </div>

      {/* Label */}
      <span
        className={`
          text-[12px] font-bold tracking-wide whitespace-nowrap transition-colors duration-200
          ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"}
        `}
      >
        {phase.title}
      </span>

      {/* Duration tag */}
      <span
        className={`
          text-[10px] font-medium transition-colors duration-200
          ${isActive ? "text-cyan-400" : "text-white/20"}
        `}
      >
        {phase.duration}
      </span>
    </motion.button>
  );
}

// ─── Mobile accordion item ────────────────────────────────────────────────────

function MobileAccordion({
  phase,
  isOpen,
  onToggle,
}: {
  phase: Phase;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`
        rounded-2xl border overflow-hidden transition-colors duration-200
        ${isOpen
          ? "bg-white/[0.05] border-blue-500/30"
          : "bg-white/[0.02] border-white/[0.07] hover:border-white/[0.12]"
        }
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl"
      >
        {/* Number circle */}
        <div
          className={`
            flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm
            ${isOpen
              ? "bg-blue-600 text-white shadow-[0_0_16px_rgba(37,99,235,0.5)]"
              : "bg-white/[0.06] text-white/40"
            }
            transition-all duration-200
          `}
        >
          {phase.step}
        </div>

        <div className="flex-1 text-left">
          <div className={`text-sm font-bold ${isOpen ? "text-white" : "text-white/70"} transition-colors duration-200`}>
            {phase.title}
          </div>
          <div className={`text-[11px] ${isOpen ? "text-cyan-400" : "text-white/30"} transition-colors duration-200`}>
            {phase.duration} · {phase.tagline}
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="flex-shrink-0"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/30" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm text-white/55 leading-relaxed mb-4">
                {phase.description}
              </p>
              <ul className="space-y-2">
                {phase.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-[12px] text-white/45">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ProcessSection ───────────────────────────────────────────────────────────

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  const active = PHASES[activeStep];

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-[#070B1F] py-28 overflow-hidden"
    >
      {/* Top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        aria-hidden="true"
      />

      {/* Ambient glow centre */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-400/80 mb-4">
            How We Work
          </p>
          <h2
            id="process-heading"
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-5"
          >
            Six Phases to{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              Confident Delivery
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            A structured process doesn&apos;t slow you down — it prevents the rework that does.
            Every phase has a defined output and a clear owner.
          </p>
        </motion.div>

        {/* ── Desktop: horizontal timeline + detail panel ──────────────── */}
        <div className="hidden lg:block">
          {/* Timeline row */}
          <div className="grid grid-cols-6 gap-4 mb-12 relative">
            {PHASES.map((phase, i) => (
              <DesktopPhase
                key={phase.step}
                phase={phase}
                isActive={activeStep === i}
                onClick={() => setActiveStep(i)}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="relative rounded-2xl border border-white/[0.07] bg-white/[0.03] overflow-hidden"
            >
              {/* Glow accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.6),rgba(6,182,212,0.4),transparent)" }}
                aria-hidden="true"
              />

              <div className="p-10 grid lg:grid-cols-[1fr_auto] gap-12 items-start">
                {/* Left: description */}
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    {/* Step badge */}
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-sm font-black text-white shadow-[0_0_16px_rgba(37,99,235,0.5)]">
                      {active.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{active.title}</h3>
                      <p className="text-[12px] text-cyan-400">{active.tagline}</p>
                    </div>
                    <span className="ml-auto text-[11px] font-semibold text-white/30 bg-white/[0.04] border border-white/[0.07] rounded-lg px-2.5 py-1">
                      {active.duration}
                    </span>
                  </div>
                  <p className="text-white/60 leading-relaxed text-[15px] max-w-2xl">
                    {active.description}
                  </p>
                </div>

                {/* Right: deliverables */}
                <div className="lg:min-w-[260px]">
                  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 mb-4">
                    Deliverables
                  </p>
                  <ul className="space-y-3">
                    {active.deliverables.map((d, i) => (
                      <motion.li
                        key={d}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3, ease: EASE_OUT }}
                        className="flex items-center gap-2.5 text-sm text-white/55"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true">
                          <path
                            d="M3 8l3.5 3.5L13 4"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Prev / Next navigation */}
              <div className="px-10 pb-6 flex items-center gap-3">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/35 hover:text-white/70 disabled:opacity-20 disabled:pointer-events-none transition-colors duration-150"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 rotate-180" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Previous phase
                </button>
                <span className="flex-1" />
                <button
                  type="button"
                  disabled={activeStep === PHASES.length - 1}
                  onClick={() => setActiveStep((s) => Math.min(PHASES.length - 1, s + 1))}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/35 hover:text-white/70 disabled:opacity-20 disabled:pointer-events-none transition-colors duration-150"
                >
                  Next phase
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile: vertical accordion ───────────────────────────────── */}
        <div className="lg:hidden space-y-3">
          {PHASES.map((phase, i) => (
            <MobileAccordion
              key={phase.step}
              phase={phase}
              isOpen={activeStep === i}
              onToggle={() => setActiveStep(activeStep === i ? -1 : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
