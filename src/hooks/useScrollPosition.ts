"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;      // true after crossing threshold
  isScrollingUp: boolean;   // useful for hide-on-scroll-down patterns
  isAtTop: boolean;
}

/**
 * Tracks vertical scroll position and derived states.
 * @param threshold  px from top before `isScrolled` becomes true (default 80)
 */
export function useScrollPosition(threshold = 80): ScrollPosition {
  const [scrollY, setScrollY] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsScrollingUp(currentY < prevScrollY);
    setPrevScrollY(currentY);
    setScrollY(currentY);
  }, [prevScrollY]);

  useEffect(() => {
    // Initialise with current value (handles page refresh mid-scroll)
    setScrollY(window.scrollY);
    setPrevScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    scrollY,
    isScrolled: scrollY > threshold,
    isScrollingUp,
    isAtTop: scrollY === 0,
  };
}
