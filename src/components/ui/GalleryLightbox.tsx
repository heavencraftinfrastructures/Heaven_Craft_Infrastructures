"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

/**
 * Full-screen photo carousel opened from a Construction Work card. Supports
 * click/tap arrows, keyboard arrows + Escape on desktop, and touch swipe on
 * mobile. Body scroll is locked while open.
 */
export default function GalleryLightbox({
  title,
  images,
  index,
  onClose,
  onNavigate,
}: {
  title: string;
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goPrev = () => onNavigate((index - 1 + images.length) % images.length);
  const goNext = () => onNavigate((index + 1) % images.length);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-hc-bg/97 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="flex items-center justify-between px-5 py-4 sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-hc-ivory">
            {title}
          </h4>
          <span className="text-xs text-hc-concrete">
            {index + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hc-gold/30 text-hc-ivory transition-colors hover:border-hc-gold hover:text-hc-gold-light"
          suppressHydrationWarning
        >
          ✕
        </button>
      </div>

      <div
        className="relative flex-1 px-2 pb-6 sm:px-8"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStartX === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX;
          if (delta > 50) goPrev();
          if (delta < -50) goNext();
          setTouchStartX(null);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto h-full max-w-5xl"
          >
            <Image
              src={images[index]}
              alt={`${title} photo ${index + 1}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-hc-gold/30 bg-hc-bg/60 text-hc-ivory backdrop-blur-sm transition-colors hover:border-hc-gold hover:text-hc-gold-light sm:flex"
              suppressHydrationWarning
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-hc-gold/30 bg-hc-bg/60 text-hc-ivory backdrop-blur-sm transition-colors hover:border-hc-gold hover:text-hc-gold-light sm:flex"
              suppressHydrationWarning
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex justify-center gap-2 pb-6"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => onNavigate(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-hc-gold-light" : "w-1.5 bg-hc-surface-2"
              }`}
              suppressHydrationWarning
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
