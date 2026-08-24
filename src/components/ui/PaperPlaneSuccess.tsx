"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A brief, luxury-styled full-screen moment shown right after a contact
 * enquiry is successfully sent — a paper plane rises from the bottom of
 * the screen to the top and fades, leaving a soft gold trail. Purely
 * decorative; calls onComplete once the sequence has finished so the
 * caller can dismiss it.
 */
export default function PaperPlaneSuccess({
  show,
  onComplete,
}: {
  show: boolean;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onComplete, 2000);
    return () => clearTimeout(t);
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-hc-bg/70 backdrop-blur-sm"
        >
          {/* Rising trail glow */}
          <motion.div
            initial={{ opacity: 0, y: 220, scaleY: 0.4 }}
            animate={{ opacity: [0, 0.5, 0], y: -260 }}
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-64 w-px bg-gradient-to-t from-hc-gold-light via-hc-gold/60 to-transparent"
          />

          {/* Plane */}
          <motion.div
            initial={{ opacity: 0, y: 220, x: -20, rotate: -8, scale: 0.85 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [220, 60, -260],
              x: [-20, 12, -10],
              rotate: [-8, -14, -18],
              scale: [0.85, 1, 0.9],
            }}
            transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1], times: [0, 0.15, 0.55, 1] }}
            className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-hc-gold-light/50 bg-hc-bg/60 shadow-[0_0_30px_rgba(201,162,77,0.35)]"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-hc-gold-light"
            >
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
            </svg>
          </motion.div>

          {/* Success text, settles in after the plane departs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center text-center"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-hc-gold-light">
              Enquiry Sent
            </span>
            <h3 className="mt-2 text-2xl font-semibold text-hc-ivory">
              On its way to our team
            </h3>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
