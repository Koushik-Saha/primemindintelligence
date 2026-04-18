"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

import {
  LOGOS_ROW_1,
  LOGOS_ROW_2,
  LOGO_COLOR_CLASSES,
  type CompanyLogo,
} from "./socialProofData";

// ─── Variants ─────────────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headerVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};

const rowVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  }),
};

// ─── Single logo chip ─────────────────────────────────────────────────────────

function LogoChip({ logo }: { logo: CompanyLogo }) {
  const c = LOGO_COLOR_CLASSES[logo.color];

  return (
    <div
      className={`
        group/chip flex-shrink-0
        inline-flex items-center gap-2.5
        px-4 py-2.5 rounded-xl mx-3
        border border-white/[0.07]
        bg-white/[0.03]
        grayscale hover:grayscale-0
        opacity-40 hover:opacity-100
        cursor-default select-none
        transition-all duration-300
      `}
      aria-label={logo.name}
      title={logo.name}
    >
      {/* Abbr badge */}
      <span
        className={`
          inline-flex items-center justify-center
          w-6 h-6 rounded-md text-[9px] font-black tracking-wide
          ${c.bg} ${c.border} ${c.text} border
        `}
        aria-hidden="true"
      >
        {logo.abbr}
      </span>

      {/* Company name */}
      <span className="text-[13px] font-semibold text-white/80 whitespace-nowrap tracking-tight">
        {logo.name}
      </span>
    </div>
  );
}

// ─── Scrolling ticker row ──────────────────────────────────────────────────────
// The inner track is duplicated so the CSS animation loops seamlessly.
// animation-play-state is handled by the `ticker-wrap` class in globals.css

interface TickerRowProps {
  logos: CompanyLogo[];
  direction: "left" | "right";
  duration?: number;
}

function TickerRow({ logos, direction, duration = 35 }: TickerRowProps) {
  // Duplicate logos twice for seamless loop
  const doubled = [...logos, ...logos, ...logos];
  const animClass = direction === "left" ? "ticker-scroll-left" : "ticker-scroll-right";

  return (
    <div
      className="ticker-wrap relative overflow-hidden"
      /* Edge fade masks */
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex w-max ${animClass}`}
        style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
        aria-hidden="true"
      >
        {doubled.map((logo, i) => (
          <LogoChip key={`${logo.id}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

// ─── TrustedBy section ────────────────────────────────────────────────────────

export function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trusted-heading"
      className="relative bg-[#0A0F24] py-20 overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-12 px-6"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35 mb-3">
            Our Clients & Partners
          </p>
          <h2
            id="trusted-heading"
            className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          >
            Trusted by{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#3B82F6,#06B6D4)" }}
            >
              innovative companies
            </span>{" "}
            worldwide
          </h2>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <motion.div
          variants={rowVariants}
          custom={0.1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-4"
        >
          <TickerRow logos={LOGOS_ROW_1} direction="left" duration={38} />
        </motion.div>

        {/* Row 2 — scrolls right (desktop only) */}
        <motion.div
          variants={rowVariants}
          custom={0.3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="hidden sm:block"
        >
          <TickerRow logos={LOGOS_ROW_2} direction="right" duration={45} />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-10 text-[11px] text-white/25 px-6"
        >
          50+ companies trust Prime Mind Intelligence to power their technology operations
        </motion.p>
      </div>
    </section>
  );
}
