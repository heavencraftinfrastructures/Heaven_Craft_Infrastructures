"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

/**
 * An isometric (3-face) line drawing of a building that constructs itself
 * in 7 stages — footprint, corner framing, right wall, left wall, roof,
 * floor divider, then door/window detailing — tied to the same scroll
 * progress driving the Planning Process timeline, so it rises in step with
 * the 7 planning stages. Drawn as flat SVG (no WebGL), so it's exactly as
 * cheap on mobile as the hero's blueprint reveal, just projected in
 * isometric perspective so it reads as dimensional rather than a flat
 * elevation.
 */
export default function IsometricBuilding({
  progress,
  className = "",
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  const useStage = (k: number) =>
    useTransform(progress, [(k - 1) / 7, k / 7], [0, 1]);

  const p1 = useStage(1); // footprint
  const p2 = useStage(2); // corner framing
  const p3 = useStage(3); // right wall
  const p4 = useStage(4); // left wall
  const p5 = useStage(5); // roof
  const p6 = useStage(6); // floor divider
  const p7 = useStage(7); // door + window detail

  const strokeMain = "#e8c887";
  const strokeSoft = "#c9a24d";

  return (
    <svg
      viewBox="0 0 260 330"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Ground shadow line */}
      <motion.path
        d="M30 300 H230"
        stroke={strokeSoft}
        strokeWidth="1"
        strokeOpacity="0.4"
        style={{ pathLength: p1 }}
      />

      {/* Stage 1 — footprint (site marking) */}
      <motion.path
        d="M130 225 L195 262.5 L130 300 L65 262.5 Z"
        stroke={strokeSoft}
        strokeWidth="1.2"
        style={{ pathLength: p1 }}
      />

      {/* Stage 2 — corner framing (verticals) */}
      <motion.path
        d="M195 262.5 L195 167.5 M130 300 L130 205 M65 262.5 L65 167.5"
        stroke={strokeMain}
        strokeWidth="1.4"
        style={{ pathLength: p2 }}
      />

      {/* Stage 3 — right wall face */}
      <motion.path
        d="M195 167.5 L130 205"
        stroke={strokeMain}
        strokeWidth="1.4"
        style={{ pathLength: p3 }}
      />

      {/* Stage 4 — left wall face */}
      <motion.path
        d="M65 167.5 L130 205"
        stroke={strokeMain}
        strokeWidth="1.4"
        style={{ pathLength: p4 }}
      />

      {/* Stage 5 — roof */}
      <motion.path
        d="M130 130 L195 167.5 M130 130 L65 167.5"
        stroke={strokeMain}
        strokeWidth="1.5"
        style={{ pathLength: p5 }}
      />

      {/* Stage 6 — floor divider */}
      <motion.path
        d="M195 215 L130 252.5 L65 215"
        stroke={strokeSoft}
        strokeWidth="1"
        strokeOpacity="0.7"
        style={{ pathLength: p6 }}
      />

      {/* Stage 7 — door + window detailing */}
      <motion.path
        d="M130 300 L143 292.5 L143 257.5 L130 265 Z M156 285 L136.5 296.25 L136.5 266.25 L156 255 Z"
        stroke={strokeMain}
        strokeWidth="1"
        strokeOpacity="0.85"
        style={{ pathLength: p7 }}
      />
    </svg>
  );
}
