"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

type Caption = { label: string; range: [number, number] };

/**
 * Pins a video full-screen while the user scrolls through a tall wrapper,
 * scrubbing the video's playback position directly to scroll progress —
 * scrolling "builds" the structure. Falls back to a static poster image if
 * the video source is unavailable (e.g. the dummy placeholder path hasn't
 * been replaced with a real render yet) or on reduced-motion preference.
 */
export default function ScrollScrubVideo({
  src,
  poster,
  captions,
}: {
  src: string;
  poster: string;
  captions: Caption[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;
    return scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !ready || errored) return;
      const duration = video.duration || 0;
      if (duration) {
        video.currentTime = Math.min(duration, Math.max(0, v * duration));
      }
    });
  }, [scrollYProgress, ready, errored]);

  return (
    <div ref={containerRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {!errored && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            poster={poster}
            src={src}
            onLoadedMetadata={() => setReady(true)}
            onError={() => setErrored(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <Image
          src={poster}
          alt="Construction progress"
          fill
          className={`object-cover transition-opacity duration-700 ${
            ready && !errored ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hc-bg via-hc-bg/30 to-hc-bg/50" />
        <div className="absolute inset-0 bp-grid opacity-[0.08]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="relative h-6 w-full max-w-md">
            {captions.map((c) => (
              <Caption key={c.label} caption={c} progress={scrollYProgress} />
            ))}
          </div>

          <div className="mt-6 h-[2px] w-full max-w-md overflow-hidden rounded-full bg-hc-surface-2">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full w-full bg-gradient-to-r from-hc-gold-light to-hc-copper"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Caption({
  caption,
  progress,
}: {
  caption: Caption;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [start, end] = caption.range;
  const mid = (start + end) / 2;
  const fadeIn = Math.max(start, mid - 0.03);
  const fadeOut = Math.min(end, mid + 0.03);
  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );

  return (
    <motion.p
      style={{ opacity }}
      className="absolute inset-0 text-sm sm:text-base tracking-wide text-hc-concrete"
    >
      {caption.label}
    </motion.p>
  );
}
