"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { IMG } from "@/lib/data";
import MagneticButton from "./ui/MagneticButton";
import BlueprintReveal from "./ui/BlueprintReveal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-hc-bg grain"
    >
      {/* Background layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src={IMG.heroBg}
          alt="Heaven Craft — cinematic architecture and construction"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-hc-bg/70 via-hc-bg/50 to-hc-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-hc-bg via-transparent to-hc-bg/60" />
      </motion.div>

      {/* Mid layer — blueprint grid */}
      <motion.div
        style={{ y: midY }}
        className="absolute inset-0 bp-grid opacity-40 mix-blend-overlay"
      />

      {/* Blueprint-to-building scroll reveal — constructs itself as you scroll */}
      <BlueprintReveal
        progress={scrollYProgress}
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[70vh] w-[70vh] -translate-y-1/2 opacity-70 sm:right-[2%] sm:h-[80vh] sm:w-[80vh]"
      />

      {/* Floating architectural line accents */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-[8%] top-[22%] h-px w-32 origin-left bg-hc-gold/60"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[12%] top-[18%] h-40 w-px origin-top bg-hc-gold/40"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute right-[10%] bottom-[24%] h-24 w-24 rounded-full border border-hc-gold/30"
        />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-serif-label italic text-hc-gold-light text-lg tracking-[0.2em] uppercase mb-6"
        >
          Interior · Exterior · Construction · Planning
        </motion.span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="block text-hc-ivory"
          >
            Crafting Spaces.
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="block text-gradient-gold"
          >
            Building Futures.
          </motion.span>
          <span className="sr-only">
            {" "}
            — Heaven Craft Infrastructure &amp; Interiors, a civil
            construction, interior design, and exterior architecture company
            in Hassan, Karnataka.
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-8 max-w-2xl text-base sm:text-lg text-hc-concrete leading-relaxed"
        >
          Heaven Craft Infrastructure &amp; Interiors delivers refined
          interiors, striking exteriors, structural excellence, and
          intelligent planning for residential, commercial, and government
          projects across Hassan, Karnataka.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work" variant="solid">
            Explore Our Work
          </MagneticButton>
          <MagneticButton href="#planning" variant="outline">
            View Planning Process
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] tracking-[0.3em] uppercase text-hc-concrete">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-9 w-[1.5px] bg-gradient-to-b from-hc-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
