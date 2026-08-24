"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { planningSteps } from "@/lib/data";
import BlueprintReveal from "./BlueprintReveal";

/**
 * The 7-step planning process, with the connecting line and each step
 * number tied directly to scroll position — the line grows and each circle
 * "lights up" in sequence as you scroll past it (1 -> 2 -> 3 ...), rather
 * than firing a fixed-duration animation once the section appears.
 *
 * A faint building sketch is pinned (sticky) behind the steps and
 * constructs itself in sync with the same scroll progress, so the building
 * is literally "built" as you read through the planning process.
 */
export default function PlanningTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.25"],
  });

  const total = planningSteps.length;

  return (
    <div className="mb-28">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-2xl font-semibold text-hc-ivory mb-4"
      >
        The Planning Process
      </motion.h3>

      <div ref={containerRef} className="relative">
        {/* Background building sketch — constructs itself as you scroll the list */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="sticky top-24 flex h-[60vh] items-center justify-end pr-4 lg:pr-10">
            <BlueprintReveal
              progress={scrollYProgress}
              className="h-full w-full max-w-md opacity-[0.16]"
            />
          </div>
        </div>

        {/* Track + animated progress line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-hc-surface-2 hidden md:block" />
        <motion.div
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
          className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-hc-gold-light to-hc-copper hidden md:block"
        />

        <div className="relative space-y-10 md:space-y-14">
          {planningSteps.map((step, i) => (
            <TimelineStep
              key={step.number}
              index={i}
              total={total}
              step={step}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineStep({
  index,
  total,
  step,
  progress,
}: {
  index: number;
  total: number;
  step: { number: string; title: string; description: string };
  progress: MotionValue<number>;
}) {
  const threshold = (index + 0.5) / total;
  const fill = useTransform(
    progress,
    [Math.max(0, threshold - 0.06), threshold],
    [0, 1]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative flex gap-6 md:pl-14"
    >
      <div className="absolute left-0 top-0 hidden md:flex h-8 w-8 items-center justify-center rounded-full border-2 border-hc-gold-light/40 bg-hc-bg text-hc-gold-light text-xs font-semibold overflow-hidden">
        <motion.div
          style={{ opacity: fill }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-hc-gold-light to-hc-copper"
        />
        <span className="relative z-10">{index + 1}</span>
      </div>
      <div className="flex-1 rounded-xl border border-hc-gold/10 bg-hc-surface/60 backdrop-blur-sm p-6 hover:border-hc-gold/30 transition-colors duration-300">
        <div className="flex items-baseline gap-3">
          <span className="text-hc-gold font-serif-label italic text-2xl">
            {step.number}
          </span>
          <h4 className="text-lg font-semibold text-hc-ivory">{step.title}</h4>
        </div>
        <p className="mt-2 text-sm text-hc-concrete leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
