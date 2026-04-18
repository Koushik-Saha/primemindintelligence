"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { ParticleNetwork }   from "./ParticleNetwork";
import { AnimatedHeadline }  from "./AnimatedHeadline";
import { FloatingDashboard } from "./FloatingDashboard";

// ─── Animation config ────────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: EASE_OUT },
  },
});

// ─── Trust logos ─────────────────────────────────────────────────────────────
// Abstract SVG lettermarks for placeholder company logos
const TRUST_LOGOS = [
  {
    name: "NeuraLabs",
    svg: (
      <svg viewBox="0 0 60 24" fill="currentColor" aria-hidden="true">
        <text x="0" y="18" fontSize="15" fontWeight="800" fontFamily="sans-serif" letterSpacing="-0.5">N.</text>
        <text x="16" y="18" fontSize="13" fontWeight="400" fontFamily="sans-serif" letterSpacing="0.5">Labs</text>
      </svg>
    ),
  },
  {
    name: "Axiom Cloud",
    svg: (
      <svg viewBox="0 0 68 24" fill="currentColor" aria-hidden="true">
        <polygon points="6,3 12,3 15,9 12,15 6,15 3,9" opacity="0.9"/>
        <text x="19" y="15" fontSize="12" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.3">AXIOM</text>
      </svg>
    ),
  },
  {
    name: "Syntex",
    svg: (
      <svg viewBox="0 0 56 24" fill="currentColor" aria-hidden="true">
        <rect x="0" y="5" width="10" height="10" rx="2" opacity="0.9"/>
        <rect x="12" y="8" width="10" height="10" rx="2" opacity="0.7"/>
        <rect x="6" y="11" width="10" height="10" rx="2" opacity="0.5"/>
        <text x="24" y="17" fontSize="12" fontWeight="700" fontFamily="sans-serif">syntex</text>
      </svg>
    ),
  },
  {
    name: "Velocity AI",
    svg: (
      <svg viewBox="0 0 70 24" fill="currentColor" aria-hidden="true">
        <path d="M3 3h7l-4 9h5l-7 12 2-8H2z" opacity="0.9"/>
        <text x="16" y="17" fontSize="12" fontWeight="700" fontFamily="sans-serif">Velocity</text>
      </svg>
    ),
  },
  {
    name: "Orbix",
    svg: (
      <svg viewBox="0 0 50 24" fill="currentColor" aria-hidden="true">
        <circle cx="9" cy="12" r="7" strokeWidth="2" stroke="currentColor" fill="none" opacity="0.8"/>
        <circle cx="9" cy="12" r="3" opacity="0.9"/>
        <text x="20" y="17" fontSize="13" fontWeight="800" fontFamily="sans-serif">orbix</text>
      </svg>
    ),
  },
];

// ─── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-default"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.8 }}
      aria-hidden="true"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
        Scroll
      </span>
      {/* Mouse outline */}
      <motion.div
        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(37,99,235,0.6)", "rgba(255,255,255,0.15)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-1 h-1.5 rounded-full bg-white/60"
          animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero — Prime Mind Intelligence"
    >
      {/* ── Layered background ─────────────────────────────────────────── */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C] via-[#0D1640] to-[#1E3A8A]" />

        {/* Radial orbs */}
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-800/20 blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-900/15 blur-[110px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-950/30 blur-[100px]" />

        {/* Circuit grid */}
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line x1="0" y1="30%" x2="40%" y2="0%" stroke="rgba(37,99,235,0.07)" strokeWidth="1"/>
          <line x1="60%" y1="100%" x2="100%" y2="60%" stroke="rgba(37,99,235,0.07)" strokeWidth="1"/>
          <line x1="100%" y1="20%" x2="70%" y2="0%" stroke="rgba(6,182,212,0.05)" strokeWidth="1"/>
        </svg>
      </div>

      {/* ── Particle network ───────────────────────────────────────────── */}
      <ParticleNetwork />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8 pt-24 pb-16 lg:pt-28">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 xl:gap-16 items-center">

            {/* ──────────────────────── LEFT COLUMN ──────────────────── */}
            <div className="max-w-2xl">

              {/* Badge pill */}
              <motion.div
                variants={fadeUp(0)}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 mb-7"
              >
                <span className="
                  inline-flex items-center gap-2
                  rounded-full px-3.5 py-1.5
                  bg-cyan-950/60 border border-cyan-500/30
                  text-cyan-300 text-[12.5px] font-semibold tracking-wide
                ">
                  {/* Animated pulse dot */}
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  🚀&nbsp; AI-Powered IT Solutions
                </span>
              </motion.div>

              {/* Main headline */}
              <AnimatedHeadline
                text="We Build Intelligent Software That Scales Your Business"
                startDelay={0.12}
                stagger={0.068}
                className="
                  text-[42px] sm:text-[52px] lg:text-[58px] xl:text-[64px]
                  font-extrabold leading-[1.1] tracking-tight text-white
                  mb-6
                "
              />

              {/* Sub-headline */}
              <motion.p
                variants={fadeUp(0.78)}
                initial="hidden"
                animate="visible"
                className="text-[17px] sm:text-lg text-gray-300/85 leading-relaxed mb-9 max-w-xl"
              >
                Prime Mind Intelligence delivers AI-integrated applications,
                cloud architecture, and digital transformation solutions for
                companies that refuse to stay ordinary.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={fadeUp(0.95)}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4 mb-12"
              >
                {/* Primary CTA */}
                <Link
                  href="/contact"
                  className="
                    group relative inline-flex items-center gap-2.5
                    h-12 px-7 rounded-xl
                    bg-blue-600 text-white
                    font-semibold text-[14.5px] tracking-wide
                    shadow-[0_0_24px_rgba(37,99,235,0.45)]
                    hover:bg-blue-500
                    hover:shadow-[0_0_40px_rgba(37,99,235,0.75)]
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F2C]
                    overflow-hidden
                  "
                >
                  {/* Shimmer sweep on hover */}
                  <span
                    className="
                      absolute inset-0 -translate-x-full group-hover:translate-x-full
                      bg-gradient-to-r from-transparent via-white/15 to-transparent
                      transition-transform duration-700 pointer-events-none
                    "
                    aria-hidden="true"
                  />
                  Start Your Project
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>

                {/* Secondary CTA */}
                <Link
                  href="/case-studies"
                  className="
                    group inline-flex items-center gap-2.5
                    h-12 px-7 rounded-xl
                    bg-transparent text-white
                    font-semibold text-[14.5px] tracking-wide
                    border border-white/25
                    hover:bg-white/[0.08] hover:border-white/45
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F2C]
                  "
                >
                  View Our Work
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.div>

              {/* Trust bar */}
              <motion.div
                variants={fadeUp(1.15)}
                initial="hidden"
                animate="visible"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-white/35 mb-4">
                  Trusted by 50+ companies worldwide
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {TRUST_LOGOS.map((logo, i) => (
                    <motion.span
                      key={logo.name}
                      aria-label={logo.name}
                      title={logo.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.25 + i * 0.08, duration: 0.4 }}
                      className="
                        text-white/25 hover:text-white/70
                        transition-colors duration-300 cursor-default
                        h-5 flex items-center
                      "
                    >
                      {logo.svg}
                    </motion.span>
                  ))}

                  {/* Divider + extra text */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.4 }}
                    className="text-[11px] text-white/20 border-l border-white/10 pl-5 hidden sm:inline"
                  >
                    & 45 more →
                  </motion.span>
                </div>

                {/* Star rating strip */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.5, ease: EASE_OUT }}
                  className="flex items-center gap-3 mt-5"
                >
                  <div className="flex items-center gap-0.5" aria-label="5 star rating">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 12 12" className="w-3.5 h-3.5 text-amber-400 fill-current" aria-hidden="true">
                        <path d="M6 1l1.39 2.82L10.5 4.28l-2.25 2.19.53 3.09L6 7.9 3.22 9.56l.53-3.09L1.5 4.28l3.11-.46z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-white/40">
                    <span className="text-white/65 font-semibold">4.9/5</span> from 120+ client reviews
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* ──────────────────────── RIGHT COLUMN ─────────────────── */}
            <div className="hidden lg:flex items-center justify-center w-[400px] xl:w-[440px] 2xl:w-[480px]">
              <FloatingDashboard />
            </div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bottom fade ────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#070B1F] to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
