"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const line: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1 },
};

/**
 * A photo with a thin gold line-sketch that draws itself on top as it
 * scrolls into view — echoes the hero's blueprint-reveal motif without
 * repeating the exact same drawing. The photo itself is always rendered at
 * full opacity underneath (never gated behind an animation), so even if the
 * scroll-trigger never fires — reduced motion, a slow connection, an
 * off-screen grid item — the image is still visible. Only the decorative
 * line overlay is animated.
 */
export default function WireframeImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes,
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  delay?: number;
  priority?: boolean;
}) {
  const drawDuration = 0.6;

  // No hardcoded "relative" here — callers always pass positioning classes
  // (e.g. "absolute inset-0" to fill an already-relative parent card).
  // Combining "relative" and "absolute" on the same element is contradictory
  // CSS and can collapse this wrapper to zero height, hiding the image.
  return (
    <div className={`overflow-hidden ${className}`}>
      {/* Photo layer — always visible, never depends on the animation firing */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imgClassName}
      />

      {/* Wireframe overlay — purely decorative, draws in then fades to nothing */}
      <motion.svg
        viewBox="0 0 100 125"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.4,
          delay: delay + drawDuration,
          ease: "easeOut",
        }}
      >
        <motion.rect
          x="3"
          y="3"
          width="94"
          height="119"
          fill="none"
          stroke="#c9a24d"
          strokeWidth="0.6"
          strokeOpacity="0.8"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: drawDuration, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M3 3 L97 122 M97 3 L3 122"
          stroke="#e8c887"
          strokeWidth="0.35"
          strokeOpacity="0.6"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: drawDuration,
            delay: delay + 0.08,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M3 62.5 H97 M50 3 V122"
          stroke="#c9a24d"
          strokeWidth="0.35"
          strokeOpacity="0.5"
          variants={line}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: drawDuration,
            delay: delay + 0.15,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
