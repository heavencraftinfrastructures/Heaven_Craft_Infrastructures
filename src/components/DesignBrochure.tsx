"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { brochureGallery, brochurePdfUrl } from "@/lib/data";
import GalleryLightbox from "./ui/GalleryLightbox";

const INITIAL_COUNT = 16;

export default function DesignBrochure() {
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = expanded
    ? brochureGallery
    : brochureGallery.slice(0, INITIAL_COUNT);

  // Expanding to all 54 photos adds several screens of height in one go.
  // Tell the desktop smooth-scroll (Lenis) to recalculate its scroll range
  // right away — otherwise it can get stuck at the old, shorter page
  // height if the user is scrolling at the moment this expands, making
  // everything below (including the Featured Visual Showcase section)
  // temporarily unreachable. Fires once after layout settles, plus a
  // follow-up shortly after in case images still reflow anything.
  useEffect(() => {
    if (!expanded) return;
    const raf = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("lenis-resize"));
    });
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("lenis-resize"));
    }, 400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [expanded]);

  return (
    <section id="brochure" className="relative bg-hc-bg py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bp-grid opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
        >
          <div className="max-w-2xl">
            <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
              Design Portfolio
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
              The Brochure Gallery
            </h2>
            <p className="mt-4 text-hc-concrete leading-relaxed">
              A curated walk through completed interiors — kitchens, living
              rooms, bedrooms, and dining spaces — pulled straight from our
              printed company brochure. Browse the full collection here, or
              take it with you.
            </p>
            <div className="divider-line w-24 mt-6" />
          </div>

          <a
            href={brochurePdfUrl}
            download="Heaven-Craft-Design-Brochure.pdf"
            className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-hc-gold-light to-hc-copper px-7 py-3.5 text-sm font-medium text-hc-bg transition-transform duration-300 hover:scale-[1.03]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download Full Brochure
          </a>
        </motion.div>

        {/* Masonry-style gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8 }}
          className="columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]"
        >
          {visible.map((photo, i) => (
            <button
              key={photo.full}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Open design photo ${i + 1}`}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl border border-hc-gold/10 break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-hc-gold-light"
              suppressHydrationWarning
            >
              <Image
                src={photo.thumb}
                alt={`Heaven Craft interior design ${i + 1}`}
                width={640}
                height={480}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end justify-end bg-hc-bg/0 opacity-0 transition-all duration-300 group-hover:bg-hc-bg/30 group-hover:opacity-100">
                <span className="m-3 flex h-8 w-8 items-center justify-center rounded-full border border-hc-gold-light/50 bg-hc-bg/70 text-hc-gold-light backdrop-blur-sm">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M9 21H3v-6" />
                    <path d="M21 3 14 10" />
                    <path d="M3 21l7-7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </motion.div>

        {!expanded && brochureGallery.length > INITIAL_COUNT && (
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-full border border-hc-gold/30 px-7 py-3 text-sm tracking-wide text-hc-gold-light transition-all duration-300 hover:border-hc-gold hover:bg-hc-gold/10"
              suppressHydrationWarning
            >
              View All {brochureGallery.length} Designs
              <span aria-hidden>↓</span>
            </button>
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          title="Design Brochure"
          images={brochureGallery.map((p) => p.full)}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  );
}
