"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { NAV_ITEMS, NavItem } from "./navConfig";
import { Logo } from "./Logo";
import { MegaDropdown } from "./MegaDropdown";
import { MobileDrawer } from "./MobileDrawer";

// ─── Hamburger Icon ─────────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute left-0 h-[1.5px] bg-white rounded-full origin-center"
          animate={
            isOpen
              ? {
                  top: i === 0 ? "50%" : i === 2 ? "50%" : "50%",
                  width: i === 1 ? 0 : "100%",
                  rotate: i === 0 ? 45 : i === 2 ? -45 : 0,
                  y: i === 0 ? "-50%" : i === 2 ? "-50%" : 0,
                  opacity: i === 1 ? 0 : 1,
                }
              : {
                  top: i === 0 ? "0%" : i === 1 ? "50%" : "100%",
                  width: i === 1 ? "75%" : "100%",
                  rotate: 0,
                  y: i === 0 ? "0%" : i === 1 ? "-50%" : "-100%",
                  opacity: 1,
                }
          }
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: i === 1 ? "75%" : "100%" }}
        />
      ))}
    </span>
  );
}

// ─── Desktop Nav Item ───────────────────────────────────────────────────────────

function DesktopNavItem({
  item,
  isActive,
  openDropdown,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isActive: boolean;
  openDropdown: string | null;
  onOpen: (label: string) => void;
  onClose: () => void;
}) {
  const isOpen = openDropdown === item.label;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (item.dropdown) onOpen(item.label);
  }, [item, onOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => onClose(), 120);
  }, [onClose]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const baseClass = `
    relative flex items-center gap-1 py-1 px-1
    text-[13.5px] font-medium tracking-tight
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded
    whitespace-nowrap
  `;

  const colorClass = isActive
    ? "text-white"
    : "text-white/65 hover:text-white";

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.dropdown ? (
        <>
          <button
            aria-expanded={isOpen}
            aria-haspopup="true"
            className={`${baseClass} ${colorClass}`}
          >
            {item.label}
            <motion.svg
              viewBox="0 0 12 12"
              fill="none"
              className="w-3 h-3 text-current opacity-60 flex-shrink-0"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>

            {/* Active underline */}
            <span className={`
              absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full
              bg-cyan-400 transition-all duration-200
              ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
            `}/>
          </button>

          {/* Relay hover zone to dropdown */}
          <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <MegaDropdown
              item={item}
              isOpen={isOpen}
              onClose={onClose}
            />
          </div>
        </>
      ) : (
        <Link
          href={item.href!}
          className={`${baseClass} ${colorClass}`}
        >
          {item.label}
          {/* Active underline */}
          <span className={`
            absolute -bottom-[18px] left-0 right-0 h-[2px] rounded-full
            bg-cyan-400 transition-all duration-200
            ${isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
          `}/>
        </Link>
      )}
    </li>
  );
}

// ─── Main Navbar ────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled } = useScrollPosition(80);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpen = useCallback((label: string) => setOpenDropdown(label), []);
  const handleClose = useCallback(() => setOpenDropdown(null), []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // Determine active item based on current pathname
  function isNavItemActive(item: NavItem): boolean {
    if (item.href) return pathname === item.href || pathname.startsWith(item.href + "/");
    return item.dropdown?.some((s) => pathname.startsWith(s.href)) ?? false;
  }

  return (
    <>
      <motion.header
        role="banner"
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(7, 11, 31, 0.88)"
            : "rgba(7, 11, 31, 0)",
          borderBottomColor: isScrolled
            ? "rgba(255, 255, 255, 0.07)"
            : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`
          fixed top-0 inset-x-0 z-30
          border-b
          will-change-[background-color,border-color,backdrop-filter]
          ${isScrolled ? "[--webkit-backdrop-filter:blur(20px)_saturate(180%)]" : ""}
        `}
        style={{ WebkitBackdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "blur(0px)" }}
      >
        {/* Top accent line — subtle gradient stripe */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600/50 to-transparent pointer-events-none" aria-hidden="true" />

        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Logo />

            {/* ── Desktop Nav ───────────────────────────────────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex items-center"
            >
              {/* Underline track */}
              <div className="relative flex items-center gap-1">
                {/* Divider line that nav items sit on */}
                <ul
                  className="flex items-center gap-1"
                  role="list"
                >
                  {NAV_ITEMS.map((item) => (
                    <DesktopNavItem
                      key={item.label}
                      item={item}
                      isActive={isNavItemActive(item)}
                      openDropdown={openDropdown}
                      onOpen={handleOpen}
                      onClose={handleClose}
                    />
                  ))}
                </ul>
              </div>
            </nav>

            {/* ── Right Side ────────────────────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* CTA — desktop */}
              <Link
                href="/contact"
                className="
                  hidden lg:inline-flex items-center gap-2
                  h-9 px-5 rounded-xl
                  bg-blue-600 hover:bg-blue-500
                  text-white text-[13px] font-semibold tracking-wide
                  shadow-[0_0_16px_rgba(37,99,235,0.35)]
                  hover:shadow-[0_0_28px_rgba(37,99,235,0.65)]
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                  whitespace-nowrap
                "
              >
                Get a Free Consultation
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>

              {/* Hamburger — mobile */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                className="
                  lg:hidden
                  flex items-center justify-center
                  w-9 h-9 rounded-lg
                  text-white hover:bg-white/[0.08]
                  transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                "
              >
                <HamburgerIcon isOpen={mobileOpen} />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeHref={pathname}
      />
    </>
  );
}
