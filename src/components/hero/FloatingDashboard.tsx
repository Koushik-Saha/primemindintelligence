"use client";

import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect } from "react";
import { useCountUp } from "@/hooks/useCountUp";

// ─── Chart data ────────────────────────────────────────────────────────────────

const CHART_W = 300;
const CHART_H = 108;
const PAD_X   = 8;
const PAD_Y   = 8;

const rawValues = [72, 58, 68, 38, 52, 28, 44, 18, 32, 14, 22, 10];

const chartPoints = rawValues.map((v, i) => ({
  x: PAD_X + (i / (rawValues.length - 1)) * (CHART_W - PAD_X * 2),
  // v is 0-100; higher = better. Invert for SVG (0 = top)
  y: PAD_Y + ((100 - v) / 100) * (CHART_H - PAD_Y * 2),
}));

/** Generates a smooth cubic-bezier path through the given points. */
function smoothLinePath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpX  = (prev.x + curr.x) / 2;
    d += ` C ${cpX.toFixed(1)},${prev.y.toFixed(1)} ${cpX.toFixed(1)},${curr.y.toFixed(1)} ${curr.x.toFixed(1)},${curr.y.toFixed(1)}`;
  }
  return d;
}

/** Generates the closed area path (line + down to baseline + back). */
function areaPath(pts: { x: number; y: number }[]): string {
  const line   = smoothLinePath(pts);
  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  return `${line} L ${lastPt.x},${CHART_H} L ${firstPt.x},${CHART_H} Z`;
}

const LINE_PATH = smoothLinePath(chartPoints);
const AREA_PATH = areaPath(chartPoints);

// ─── Animation variants ─────────────────────────────────────────────────────────

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT, delay: 0.5 },
  },
};

const statContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } },
};

const statItemVariants: Variants = {
  hidden:  { opacity: 0, y: 16, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const floatVariants = {
  float: {
    y: [-6, 6, -6],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const miniCardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.85, x: 20 },
  visible: (d: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { delay: d, duration: 0.55, ease: EASE_OUT },
  }),
};

// ─── Sub-components ──────────────────────────────────────────────────────────────

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}) {
  const count = useCountUp(value, 1800, true, decimals);
  return (
    <motion.div
      variants={statItemVariants}
      className="
        flex flex-col items-center justify-center
        rounded-xl px-3 py-2.5 flex-1 min-w-0
        bg-white/[0.06] border border-white/[0.08]
        hover:bg-white/[0.09] hover:border-blue-500/30
        transition-colors duration-200 cursor-default
      "
    >
      <span className="text-[17px] font-extrabold text-white leading-none tracking-tight tabular-nums">
        {count}
        {suffix && <span className="text-cyan-400">{suffix}</span>}
      </span>
      <span className="text-[10px] font-medium text-white/45 mt-1 text-center leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Bar sparkline ────────────────────────────────────────────────────────────
const barData = [40, 55, 35, 70, 48, 82, 60, 90, 72, 95];

function SparkBars() {
  return (
    <div className="flex items-end gap-[3px] h-6">
      {barData.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-blue-500/50"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.9 + i * 0.04, duration: 0.4, ease: EASE_OUT }}
          style={{ height: `${(v / 100) * 100}%` }}
        />
      ))}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────────

export function FloatingDashboard() {
  const chartCtrl = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      chartCtrl.start({ pathLength: 1, opacity: 1, transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } });
    }, 700);
    return () => clearTimeout(timer);
  }, [chartCtrl]);

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">

      {/* ── Ambient glow behind card ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-600/20 blur-[70px]" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-cyan-500/15 blur-[50px]" />
      </div>

      {/* ── Floating outer wrapper ── */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[390px]"
      >
        <motion.div animate="float" variants={floatVariants}>

          {/* ── Mini card — top right ── */}
          <motion.div
            custom={1.4}
            variants={miniCardVariants}
            initial="hidden"
            animate="visible"
            className="
              absolute -top-5 -right-4 z-10
              flex items-center gap-2
              bg-[#0E1535]/90 border border-white/[0.12]
              backdrop-blur-md rounded-xl px-3 py-2
              shadow-[0_8px_24px_rgba(0,0,0,0.4)]
            "
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true">
                <path d="M8 2v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25"/>
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold text-white leading-none">94.7%</p>
              <p className="text-[9px] text-white/50 mt-0.5">Model Accuracy</p>
            </div>
          </motion.div>

          {/* ── Mini card — bottom left ── */}
          <motion.div
            custom={1.6}
            variants={miniCardVariants}
            initial="hidden"
            animate="visible"
            className="
              absolute -bottom-4 -left-5 z-10
              flex items-center gap-2
              bg-[#0E1535]/90 border border-white/[0.12]
              backdrop-blur-md rounded-xl px-3 py-2
              shadow-[0_8px_24px_rgba(0,0,0,0.4)]
            "
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true">
                <path d="M3 9l4-4 3 3 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-bold text-emerald-400 leading-none">↑ 23%</p>
              <p className="text-[9px] text-white/50 mt-0.5">Deployment speed</p>
            </div>
          </motion.div>

          {/* ── Main dashboard card ── */}
          <div
            className="
              relative overflow-hidden rounded-2xl
              bg-[#080D24]/80 border border-white/[0.10]
              backdrop-blur-xl
              shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(37,99,235,0.12)]
            "
          >
            {/* Gradient top edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" aria-hidden="true" />

            {/* Card header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
                  AI Performance
                </p>
                <p className="text-[15px] font-bold text-white mt-0.5">Model Analytics</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20">
                <LiveDot />
                <span className="text-[10px] font-semibold text-emerald-400">Live</span>
              </div>
            </div>

            {/* Chart area */}
            <div className="px-4 pb-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-white/30">Last 12 cycles</span>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-4 h-0.5 bg-blue-400 rounded" />
                  <span className="text-[10px] text-white/30">Accuracy</span>
                </div>
              </div>

              <svg
                viewBox={`0 0 ${CHART_W} ${CHART_H}`}
                className="w-full"
                aria-label="AI performance line chart"
                role="img"
              >
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#2563EB" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>

                {/* Area fill — no stroke animation needed */}
                <motion.path
                  d={AREA_PATH}
                  fill="url(#areaGrad)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                />

                {/* Animated line */}
                <motion.path
                  d={LINE_PATH}
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={chartCtrl}
                />

                {/* Data point dots */}
                {chartPoints.map((pt, i) => (
                  <motion.circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={2.8}
                    fill="#06B6D4"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.4 + i * 0.04, duration: 0.3, ease: EASE_OUT }}
                  />
                ))}

                {/* X-axis labels */}
                {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map((label, i) => (
                  <text
                    key={label}
                    x={PAD_X + (i * 2 / (rawValues.length - 1)) * (CHART_W - PAD_X * 2)}
                    y={CHART_H - 1}
                    fontSize={7}
                    fill="rgba(255,255,255,0.25)"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                ))}
              </svg>
            </div>

            {/* Sparkbars row */}
            <div className="px-5 pt-1 pb-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-white/30">Throughput</span>
                <span className="text-[10px] font-semibold text-cyan-400">+18.4%</span>
              </div>
              <SparkBars />
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-white/[0.06]" aria-hidden="true" />

            {/* Stat tiles */}
            <motion.div
              variants={statContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-2 p-4"
            >
              <StatCard value={99.9} suffix="%" label="Uptime" decimals={1} />
              <StatCard value={10}   suffix="M+" label="API Calls" />
              <StatCard value={50}   suffix="+"  label="Projects" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
