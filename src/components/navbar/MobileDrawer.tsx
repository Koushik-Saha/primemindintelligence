"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { NAV_ITEMS, NavItem } from "./navConfig";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeHref: string;
}

// ─── Animation Variants ────────────────────────────────────────────────────────

const drawerVariants: Variants = {
  closed: {
    x: "100%",
    transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] as [number,number,number,number] },
  },
  open: {
    x: 0,
    transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

const listVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
};

const listItemVariants: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

const accordionVariants: Variants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.22, ease: "easeInOut" as const } },
  open:   { height: "auto", opacity: 1, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};

// ─── Accordion Item ─────────────────────────────────────────────────────────────

function AccordionItem({
  item,
  activeHref,
  onClose,
}: {
  item: NavItem;
  activeHref: string;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = item.dropdown?.some((s) => s.href === activeHref) ?? false;

  return (
    <motion.li variants={listItemVariants} className="border-b border-white/[0.06]">
      {/* Trigger */}
      <button
        onClick={() => setIsExpanded((v) => !v)}
        aria-expanded={isExpanded}
        className="
          w-full flex items-center justify-between
          py-4 px-1 text-left
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
        "
      >
        <span className={`text-[15px] font-semibold tracking-tight transition-colors duration-150
          ${isActive ? "text-cyan-400" : "text-white/90"}`}>
          {item.label}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 ml-2"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-white/40" aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.span>
      </button>

      {/* Sub-items */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.ul
            key="content"
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden pl-2 pb-2"
            role="list"
          >
            {item.dropdown!.map((sub) => (
              <li key={sub.href}>
                <Link
                  href={sub.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 py-3 px-2 rounded-xl
                    hover:bg-white/[0.05] active:bg-white/[0.08]
                    transition-colors duration-150
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                    ${sub.href === activeHref ? "text-cyan-400" : "text-white/65 hover:text-white/90"}
                  `}
                >
                  {/* Icon */}
                  <span className="
                    flex-shrink-0 w-7 h-7 rounded-lg
                    bg-blue-600/15 border border-blue-500/20
                    flex items-center justify-center
                  ">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.75}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 text-blue-400"
                      aria-hidden="true"
                    >
                      <path d={sub.icon} />
                    </svg>
                  </span>
                  <span className="text-[13.5px] font-medium leading-snug">{sub.label}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

// ─── Mobile Drawer ──────────────────────────────────────────────────────────────

export function MobileDrawer({ isOpen, onClose, activeHref }: MobileDrawerProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="
              fixed top-0 right-0 bottom-0 z-50
              w-[min(340px,100vw)]
              bg-[#070B1F]
              border-l border-white/[0.07]
              flex flex-col
              md:hidden
              overflow-hidden
            "
          >
            {/* Ambient gradients */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
              <div className="absolute bottom-0 -left-16 w-48 h-48 rounded-full bg-cyan-500/8 blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.12em]">
                Navigation
              </span>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="
                  w-8 h-8 rounded-lg flex items-center justify-center
                  text-white/50 hover:text-white hover:bg-white/[0.08]
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                "
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" aria-hidden="true">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav list */}
            <nav className="relative flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-6">
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="visible"
                role="list"
                className="space-y-0"
              >
                {NAV_ITEMS.map((item) =>
                  item.dropdown ? (
                    <AccordionItem
                      key={item.label}
                      item={item}
                      activeHref={activeHref}
                      onClose={onClose}
                    />
                  ) : (
                    <motion.li
                      key={item.label}
                      variants={listItemVariants}
                      className="border-b border-white/[0.06]"
                    >
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className={`
                          block py-4 px-1 text-[15px] font-semibold tracking-tight
                          transition-colors duration-150
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
                          ${item.href === activeHref
                            ? "text-cyan-400"
                            : "text-white/90 hover:text-white"}
                        `}
                      >
                        {item.label}
                        {item.href === activeHref && (
                          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 align-middle" />
                        )}
                      </Link>
                    </motion.li>
                  )
                )}
              </motion.ul>
            </nav>

            {/* Bottom CTA */}
            <div className="relative px-5 py-5 border-t border-white/[0.06] space-y-3">
              <Link
                href="/contact"
                onClick={onClose}
                className="
                  flex items-center justify-center w-full
                  h-12 rounded-xl px-6
                  bg-blue-600 hover:bg-blue-500
                  text-white text-[14px] font-semibold tracking-wide
                  shadow-[0_0_20px_rgba(37,99,235,0.4)]
                  hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1F]
                "
              >
                Get a Free Consultation
              </Link>
              <p className="text-center text-[11px] text-white/30">
                No commitment · Respond within 24 hrs
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
