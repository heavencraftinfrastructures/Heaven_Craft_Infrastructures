"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { showcaseItems } from "@/lib/data";

/**
 * Desktop/tablet: a horizontal filmstrip that glides sideways as the user
 * scrolls down through a tall sticky wrapper (Apple-product-page style).
 * Width is measured at runtime so the scroll distance always matches the
 * actual track length, instead of a hand-tuned guess.
 */
export default function HorizontalShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [wrapperVh, setWrapperVh] = useState(200);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const viewport = window.innerWidth;
      const scrollNeeded = Math.max(0, track.scrollWidth - viewport);
      setMaxScroll(scrollNeeded);
      // 100vh to hold the sticky panel + however much extra scroll the
      // horizontal distance requires, expressed as viewport-height units.
      setWrapperVh(100 + (scrollNeeded / window.innerHeight) * 100);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  return (
    <div
      ref={wrapperRef}
      className="relative hidden md:block"
      style={{ height: `${wrapperVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex gap-6 pl-6 lg:pl-10">
          {showcaseItems.map((item, i) => (
            <div
              key={item.caption}
              className="group relative h-[60vh] w-[340px] shrink-0 overflow-hidden rounded-2xl border border-hc-gold/10 lg:w-[420px]"
            >
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="420px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/90 via-hc-bg/10 to-transparent" />
              <span className="absolute bottom-6 left-6 right-6 text-lg font-medium text-hc-ivory">
                {item.caption}
              </span>
            </div>
          ))}
          {/* trailing spacer so the last card can reach center */}
          <div className="w-[10vw] shrink-0" />
        </motion.div>
      </div>
    </div>
  );
}
