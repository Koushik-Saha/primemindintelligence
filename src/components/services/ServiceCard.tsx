"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ACCENT_STYLES, type ServiceItem } from "./servicesData";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ServiceCardProps {
  service: ServiceItem;
  /** True when a sibling card is being hovered — dims this card. */
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// ─── Animation variants ───────────────────────────────────────────────────────

// Inherited from the parent stagger container
export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const iconVariants: Variants = {
  idle:  { scale: 1, rotate: 0 },
  hover: {
    scale: 1.15,
    rotate: [0, -8, 8, -4, 0],
    transition: {
      scale:  { duration: 0.25, ease: "easeOut" },
      rotate: { duration: 0.5,  ease: "easeInOut" },
    },
  },
};

const arrowVariants: Variants = {
  idle:  { x: 0, opacity: 0.7 },
  hover: { x: 4, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ServiceCard({
  service,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: ServiceCardProps) {
  const accent = ACCENT_STYLES[service.accentColor];

  return (
    // Outer — handles scroll-in stagger (driven by parent variants)
    <motion.div
      variants={cardRevealVariants}
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        opacity: isDimmed ? 0.42 : 1,
        transition: "opacity 220ms ease, transform 220ms ease",
      }}
    >
      {/* Inner — handles hover lift + glow */}
      <motion.div
        whileHover="hover"
        initial="idle"
        animate="idle"
        className={`
          relative h-full overflow-hidden rounded-2xl
          bg-gradient-to-b from-[#0D1631] to-[#090D20]
          border border-white/[0.07] ${accent.cardBorderHover}
          p-6 cursor-default
          transition-[border-color] duration-250
        `}
        style={{ transformOrigin: "center bottom" }}
        variants={{
          idle:  { y: 0,  boxShadow: "0 4px 24px rgba(0,0,0,0.3)" },
          hover: { y: -8, boxShadow: accent.glowShadow },
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Decorative index number (background ghost) ── */}
        <span
          className="
            absolute -bottom-4 -right-2
            text-[88px] font-black leading-none select-none pointer-events-none
            text-white/[0.028] tabular-nums
          "
          aria-hidden="true"
        >
          {String(service.index).padStart(2, "0")}
        </span>

        {/* ── Top-edge gradient accent line ── */}
        <span
          className="
            absolute top-0 left-6 right-6 h-[1px] rounded-full
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          style={{
            background: `linear-gradient(90deg, transparent, var(--accent-color, rgba(37,99,235,0.6)), transparent)`,
          }}
          aria-hidden="true"
        />

        {/* ── Icon ── */}
        <div className="mb-5">
          <motion.div
            variants={iconVariants}
            className={`
              inline-flex items-center justify-center
              w-12 h-12 rounded-xl
              ${accent.iconBg} border ${accent.iconBorder}
              transition-[background,border-color,box-shadow] duration-250
              group-hover:shadow-[0_0_20px_rgba(var(--icon-glow),0.3)]
            `}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.65}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 ${accent.iconColor}`}
              aria-hidden="true"
            >
              <path d={service.iconPath} />
              {service.iconPath2 && <path d={service.iconPath2} />}
            </svg>
          </motion.div>
        </div>

        {/* ── Tag overline ── */}
        <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] mb-2 ${accent.tagColor}`}>
          {service.tag}
        </p>

        {/* ── Title ── */}
        <h3 className="
          text-[17px] font-bold text-white leading-snug mb-3
          group-hover:text-white transition-colors duration-150
        ">
          {service.title}
        </h3>

        {/* ── Description ── */}
        <p className="
          text-[13.5px] text-white/55 leading-[1.65]
          line-clamp-3 mb-5
          group-hover:text-white/70 transition-colors duration-200
        ">
          {service.description}
        </p>

        {/* ── Learn More link ── */}
        <div className="mt-auto">
          <Link
            href={service.href}
            className={`
              inline-flex items-center gap-1.5
              text-[13px] font-semibold
              ${accent.linkColor}
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
            `}
            aria-label={`Learn more about ${service.title}`}
          >
            Learn More
            <motion.svg
              variants={arrowVariants}
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
