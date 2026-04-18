"use client";

import { useState, useEffect } from "react";

/**
 * Counts from 0 to `end` over `duration` ms using an ease-out-expo curve.
 * @param end      Target number
 * @param duration Animation duration in ms (default 1800)
 * @param trigger  Start the animation when true (default true)
 * @param decimals Decimal places to keep in the returned string (default 0)
 */
export function useCountUp(
  end: number,
  duration = 1800,
  trigger = true,
  decimals = 0
): string {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime: number | null = null;
    let frameId: number;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(eased * end);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    // Small breath before starting
    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(tick);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [end, duration, trigger]);

  return value.toFixed(decimals);
}
