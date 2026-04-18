"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccentColor = "blue" | "cyan" | "violet" | "emerald";

interface InfoCard {
  id:          string;
  label:       string;
  value:       string;
  iconPath:    string;
  accent:      AccentColor;
}

interface ValuePillar {
  id:          string;
  emoji:       string;
  label:       string;
  description: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const INFO_CARDS: InfoCard[] = [
  {
    id:       "founded",
    label:    "Founded",
    value:    "Est. 2024",
    accent:   "blue",
    iconPath: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  },
  {
    id:       "hq",
    label:    "Headquarters",
    value:    "USA",
    accent:   "cyan",
    iconPath: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
  {
    id:       "team",
    label:    "Team Size",
    value:    "20+ Experts",
    accent:   "violet",
    iconPath: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  },
  {
    id:       "focus",
    label:    "Approach",
    value:    "AI-First",
    accent:   "emerald",
    iconPath: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
  },
];

const VALUE_PILLARS: ValuePillar[] = [
  {
    id:          "engineering",
    emoji:       "⚡",
    label:       "Engineering Excellence",
    description: "Clean, tested, and observable code — no shortcuts, ever.",
  },
  {
    id:          "transparency",
    emoji:       "🔍",
    label:       "Radical Transparency",
    description: "You see everything: progress, blockers, and budget — always.",
  },
  {
    id:          "impact",
    emoji:       "🌍",
    label:       "Impact-Driven Delivery",
    description: "We measure success by outcomes, not output or billable hours.",
  },
];

const ACCENT: Record<AccentColor, { icon: string; bg: string; border: string; ring: string }> = {
  blue:    { icon: "text-blue-400",    bg: "bg-blue-600/12",    border: "border-blue-500/25",    ring: "rgba(37,99,235,0.3)"  },
  cyan:    { icon: "text-cyan-400",    bg: "bg-cyan-500/12",    border: "border-cyan-500/25",    ring: "rgba(6,182,212,0.3)"  },
  violet:  { icon: "text-violet-400",  bg: "bg-violet-600/12",  border: "border-violet-500/25",  ring: "rgba(124,58,237,0.3)" },
  emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/12", border: "border-emerald-500/25", ring: "rgba(16,185,129,0.3)" },
};

// ─── Easing ───────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Circuit / Neural-net SVG background ─────────────────────────────────────

function CircuitBackground() {
  // All coordinates relative to viewBox="0 0 480 420"
  const traces = [
    // Horizontal runs
    "M 20 70 L 460 70",
    "M 40 175 L 440 175",
    "M 20 280 L 440 280",
    "M 60 380 L 420 380",
    // Vertical spines
    "M 120 70 L 120 175",
    "M 240 70 L 240 380",
    "M 360 175 L 360 280",
    "M 80 280 L 80 380",
    "M 400 70 L 400 175",
    // L-shaped branches
    "M 160 70 L 160 120 L 240 120",
    "M 320 175 L 320 230 L 400 230",
    "M 120 280 L 120 330 L 200 330",
    "M 360 280 L 440 280 L 440 380",
    "M 40 175 L 40 280",
  ];

  // [cx, cy, type] — type: 0=regular, 1=glow, 2=pulse
  const nodes: [number, number, 0 | 1 | 2][] = [
    [120, 70, 0], [240, 70, 1], [360, 70, 0], [400, 70, 0],
    [40, 175, 0], [120, 175, 0], [240, 175, 2], [320, 175, 0], [360, 175, 0], [400, 175, 0],
    [80, 280, 0], [120, 280, 0], [240, 280, 1], [360, 280, 0], [440, 280, 0],
    [80, 380, 0], [240, 380, 2], [420, 380, 0],
    [160, 120, 0], [320, 230, 0], [120, 330, 0], [200, 330, 0],
  ];

  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      {/* Trace lines */}
      {traces.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="rgba(37,99,235,0.14)"
          strokeWidth="0.75"
          strokeDasharray={i % 3 === 0 ? "5 4" : undefined}
        />
      ))}

      {/* Regular nodes */}
      {nodes.filter(([,, t]) => t === 0).map(([cx, cy], i) => (
        <circle key={`n${i}`} cx={cx} cy={cy} r="2.5" fill="rgba(96,165,250,0.35)" />
      ))}

      {/* Glow nodes */}
      {nodes.filter(([,, t]) => t === 1).map(([cx, cy], i) => (
        <g key={`g${i}`}>
          <circle cx={cx} cy={cy} r="6" fill="rgba(37,99,235,0.10)" stroke="rgba(37,99,235,0.35)" strokeWidth="0.75" />
          <circle cx={cx} cy={cy} r="2.8" fill="rgba(96,165,250,0.65)" />
        </g>
      ))}

      {/* Pulse nodes (cyan) */}
      {nodes.filter(([,, t]) => t === 2).map(([cx, cy], i) => (
        <g key={`p${i}`}>
          <circle cx={cx} cy={cy} r="8" fill="rgba(6,182,212,0.07)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.75" />
          <circle cx={cx} cy={cy} r="3" fill="rgba(6,182,212,0.7)" />
        </g>
      ))}

      {/* Corner decorative bracket marks */}
      <path d="M 10 10 L 10 30 M 10 10 L 30 10"      stroke="rgba(37,99,235,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 470 10 L 470 30 M 470 10 L 450 10"  stroke="rgba(37,99,235,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 10 410 L 10 390 M 10 410 L 30 410"  stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 470 410 L 470 390 M 470 410 L 450 410" stroke="rgba(6,182,212,0.2)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Mini info card ───────────────────────────────────────────────────────────

const miniCardVariants: Variants = {
  hidden:  { opacity: 0, x: -24, scale: 0.94 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

function MiniCard({ card }: { card: InfoCard }) {
  const a = ACCENT[card.accent];

  return (
    <motion.div
      variants={miniCardVariants}
      className={`
        relative flex flex-col gap-3 p-4 rounded-2xl
        bg-white/[0.04] border border-white/[0.07]
        hover:bg-white/[0.07] hover:border-white/[0.12]
        transition-colors duration-200 cursor-default group
        overflow-hidden
      `}
    >
      {/* Subtle corner glow on hover */}
      <span
        className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{ background: a.ring }}
        aria-hidden="true"
      />

      {/* Icon */}
      <span
        className={`
          inline-flex items-center justify-center
          w-9 h-9 rounded-xl flex-shrink-0
          ${a.bg} border ${a.border}
        `}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4.5 h-4.5 ${a.icon}`}
          aria-hidden="true"
          style={{ width: "18px", height: "18px" }}
        >
          <path d={card.iconPath} />
        </svg>
      </span>

      {/* Text */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 mb-0.5">
          {card.label}
        </p>
        <p className="text-[15px] font-bold text-white leading-tight">
          {card.value}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Left column — info card ──────────────────────────────────────────────────

const gridVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function AboutInfoCard({ inView }: { inView: boolean }) {
  return (
    <div className="relative">
      {/* Main card */}
      <div
        className="
          relative rounded-3xl overflow-hidden
          bg-[#07102B] border border-white/[0.07]
          p-6 sm:p-8
          shadow-[0_24px_64px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.05)]
        "
      >
        {/* Circuit SVG background */}
        <CircuitBackground />

        {/* Top label inside card */}
        <div className="relative z-10 mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/30">
            Company Profile
          </p>
        </div>

        {/* 2×2 grid of mini-cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-10 grid grid-cols-2 gap-3"
        >
          {INFO_CARDS.map((card) => (
            <MiniCard key={card.id} card={card} />
          ))}
        </motion.div>

        {/* Gradient vignette so SVG fades toward center */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(7,16,43,0.35) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Floating badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 16, scale: 0.9 }}
        transition={{ delay: 0.7, duration: 0.6, ease: EASE_OUT }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="
            flex items-center gap-2
            px-4 py-2 rounded-full
            bg-gradient-to-r from-[#0D1B3E] to-[#0A1428]
            border border-amber-400/30
            shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_0_1px_rgba(251,191,36,0.15)]
            whitespace-nowrap
          "
        >
          <span className="text-[13px]" aria-hidden="true">🏆</span>
          <span className="text-[11.5px] font-semibold text-amber-300 tracking-wide">
            Top AI Solutions Provider 2025
          </span>
          {/* Pulse dot */}
          <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
        </motion.div>
      </motion.div>

      {/* Ambient glow beneath card */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-3xl pointer-events-none"
        style={{ background: "rgba(37,99,235,0.2)" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Right column — text content ──────────────────────────────────────────────

const slideRightVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const textLineVariants: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const pillarVariants: Variants = {
  hidden:  { opacity: 0, x: 24, scale: 0.96 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

function AboutContent({ inView }: { inView: boolean }) {
  return (
    <motion.div
      variants={slideRightVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="flex flex-col gap-6"
    >
      {/* Label */}
      <motion.div variants={textLineVariants}>
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400">
          <span className="inline-block w-5 h-px bg-cyan-400/50" aria-hidden="true" />
          Who We Are
        </p>
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={textLineVariants}
        className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.15] tracking-tight"
      >
        We Are{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
        >
          AI Engineers,
        </span>{" "}
        Architects, and Problem Solvers
      </motion.h2>

      {/* Primary paragraph */}
      <motion.p variants={textLineVariants} className="text-[15.5px] text-white/60 leading-[1.75]">
        Prime Mind Intelligence was built on a simple belief: every company deserves
        software that&apos;s as smart as the people building it. We combine deep
        engineering talent with AI-first thinking to deliver solutions that are fast,
        scalable, and future-ready.
      </motion.p>

      {/* Secondary paragraph */}
      <motion.p variants={textLineVariants} className="text-[14.5px] text-white/45 leading-[1.7]">
        Our team brings cross-industry depth — from{" "}
        <span className="text-white/65 font-medium">fintech</span> and{" "}
        <span className="text-white/65 font-medium">healthtech</span> to{" "}
        <span className="text-white/65 font-medium">energy</span> and{" "}
        <span className="text-white/65 font-medium">e-commerce</span> — so we
        understand the real pressures your business faces, not just the technical ones.
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={textLineVariants}
        className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      {/* Value pillars */}
      <motion.div
        variants={slideRightVariants}
        className="flex flex-col sm:flex-row gap-3"
        role="list"
        aria-label="Our values"
      >
        {VALUE_PILLARS.map((pillar) => (
          <motion.div
            key={pillar.id}
            variants={pillarVariants}
            role="listitem"
            className="
              group flex-1 flex flex-col gap-2 p-4 rounded-2xl
              bg-white/[0.03] border border-white/[0.06]
              hover:bg-white/[0.06] hover:border-white/[0.12]
              transition-all duration-200 cursor-default
            "
          >
            <span className="text-xl leading-none" aria-hidden="true">{pillar.emoji}</span>
            <p className="text-[13px] font-bold text-white leading-snug">{pillar.label}</p>
            <p className="text-[11.5px] text-white/40 leading-snug group-hover:text-white/55 transition-colors duration-200">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div variants={textLineVariants}>
        <Link
          href="/about"
          className="
            group inline-flex items-center gap-2
            text-[14px] font-semibold text-blue-400
            hover:text-blue-300 transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
          "
        >
          Meet Our Team
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative bg-[#060A1C] py-28 sm:py-36 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_30%,#060A1C_100%)]" />
        {/* Left accent glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40%] h-[60%] bg-blue-900/15 blur-[100px] rounded-full" />
        {/* Right accent glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[50%] bg-cyan-900/10 blur-[80px] rounded-full" />
      </div>

      {/* Top / bottom edge lines */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(37,99,235,0.25),rgba(6,182,212,0.25),transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Left: info card (order-2 on mobile → appears below on small screens) */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, ease: EASE_OUT }}
            className="order-2 lg:order-1 pb-8 lg:pb-0"
          >
            <AboutInfoCard inView={inView} />
          </motion.div>

          {/* ── Right: text content (order-1 on mobile → appears first on small screens) */}
          <div className="order-1 lg:order-2">
            <AboutContent inView={inView} />
          </div>

        </div>
      </div>
    </section>
  );
}
