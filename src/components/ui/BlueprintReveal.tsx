"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

/**
 * A line-drawn architectural elevation that "constructs" itself as the user
 * scrolls — each stroke's pathLength is tied to scroll progress with a
 * slight stagger so the building appears to be built stroke by stroke.
 * Purely SVG + CSS, no WebGL, so it's cheap on mobile.
 */
export default function BlueprintReveal({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  // Stagger each stroke group across the 0 -> 0.55 scroll window.
  const p1 = useTransform(progress, [0, 0.22], [0, 1]);
  const p2 = useTransform(progress, [0.08, 0.32], [0, 1]);
  const p3 = useTransform(progress, [0.16, 0.42], [0, 1]);
  const p4 = useTransform(progress, [0.24, 0.55], [0, 1]);
  const fade = useTransform(progress, [0, 0.1, 0.6, 0.75], [0, 1, 1, 0]);

  return (
    <motion.svg
      style={{ opacity: fade }}
      viewBox="0 0 600 600"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Ground line */}
      <motion.path
        d="M40 520 H560"
        stroke="#c9a24d"
        strokeWidth="1"
        strokeOpacity="0.5"
        style={{ pathLength: p1 }}
      />
      {/* Main structure outline */}
      <motion.path
        d="M120 520 V260 L300 140 L480 260 V520"
        stroke="#e8c887"
        strokeWidth="1.5"
        style={{ pathLength: p2 }}
      />
      {/* Roofline accent */}
      <motion.path
        d="M90 268 L300 120 L510 268"
        stroke="#c9a24d"
        strokeWidth="1.5"
        style={{ pathLength: p3 }}
      />
      {/* Floor divider + window grid */}
      <motion.path
        d="M120 360 H480 M120 440 H480 M220 520 V260 M380 520 V260"
        stroke="#c9a24d"
        strokeWidth="1"
        strokeOpacity="0.6"
        style={{ pathLength: p4 }}
      />
      {/* Entry door */}
      <motion.path
        d="M280 520 V450 H320 V520"
        stroke="#e8c887"
        strokeWidth="1.5"
        style={{ pathLength: p4 }}
      />
    </motion.svg>
  );
}
