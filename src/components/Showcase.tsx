"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { showcaseItems } from "@/lib/data";
import HorizontalShowcase from "./ui/HorizontalShowcase";

export default function Showcase() {
  return (
    <section className="relative bg-hc-bg-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
            Portfolio
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
            Featured Visual Showcase
          </h2>
          <p className="mt-4 text-hc-concrete text-sm md:hidden">
            Swipe to explore.
          </p>
          <p className="mt-4 text-hc-concrete text-sm hidden md:block">
            Keep scrolling — the gallery moves with you.
          </p>
          <div className="divider-line w-24 mt-6" />
        </motion.div>
      </div>

      {/* Desktop / tablet: scroll-driven horizontal filmstrip */}
      <HorizontalShowcase />

      {/* Mobile: native swipeable strip, touch-first, no scroll-jacking */}
      <div className="md:hidden overflow-x-auto snap-x snap-mandatory scroll-px-6 [-webkit-overflow-scrolling:touch]">
        <div className="flex gap-4 px-6 pb-2">
          {showcaseItems.map((item) => (
            <div
              key={item.caption}
              className="group relative h-[65vw] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-hc-gold/10"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/90 via-hc-bg/10 to-transparent" />
              <span className="absolute bottom-5 left-5 right-5 text-base font-medium text-hc-ivory">
                {item.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
