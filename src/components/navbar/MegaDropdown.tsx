"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "./navConfig";

interface MegaDropdownProps {
  item: NavItem;
  isOpen: boolean;
  onClose: () => void;
}

import type { Variants } from "framer-motion";

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.04,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export function MegaDropdown({ item, isOpen, onClose }: MegaDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  if (!item.dropdown) return null;

  const cols = item.dropdown.length <= 4 ? 2 : 3;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="menu"
          aria-label={`${item.label} submenu`}
          className={`
            absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
            bg-[#0A0F2C]/95 backdrop-blur-xl
            border border-white/[0.08]
            rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6),0_0_0_1px_rgba(37,99,235,0.12)]
            p-6 min-w-[520px]
            before:absolute before:inset-x-0 before:-top-2 before:h-2
          `}
        >
          {/* Section heading */}
          {item.megaLabel && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-400 mb-4 px-1">
              {item.megaLabel}
            </p>
          )}

          {/* Grid */}
          <div
            className={`grid gap-1`}
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {item.dropdown.map((sub) => (
              <motion.div key={sub.href} variants={itemVariants}>
                <Link
                  href={sub.href}
                  role="menuitem"
                  onClick={onClose}
                  className="
                    group flex items-start gap-3 p-3 rounded-xl
                    hover:bg-white/[0.06] active:bg-white/[0.09]
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                  "
                >
                  {/* Icon container */}
                  <span className="
                    flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg
                    bg-blue-600/20 border border-blue-500/20
                    flex items-center justify-center
                    group-hover:bg-blue-600/30 group-hover:border-blue-500/40
                    transition-all duration-200
                  ">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-blue-400 group-hover:text-cyan-400 transition-colors duration-200"
                      aria-hidden="true"
                    >
                      <path d={sub.icon} />
                    </svg>
                  </span>

                  {/* Text */}
                  <span className="flex flex-col min-w-0">
                    <span className="
                      text-[13.5px] font-semibold text-white/90
                      group-hover:text-white transition-colors duration-150
                      leading-snug
                    ">
                      {sub.label}
                    </span>
                    <span className="
                      text-[11.5px] text-white/45 group-hover:text-white/60
                      transition-colors duration-150 leading-snug mt-0.5
                      line-clamp-2
                    ">
                      {sub.description}
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA strip */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <p className="text-[11px] text-white/40">
              Need help choosing?
            </p>
            <Link
              href="/contact"
              onClick={onClose}
              className="
                text-[11px] font-semibold text-cyan-400 hover:text-cyan-300
                flex items-center gap-1 transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded
              "
            >
              Talk to an expert
              <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
