"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function VideoCard({
  title,
  description,
  poster,
  src,
  webmSrc,
}: {
  title: string;
  description: string;
  poster: string;
  src: string;
  webmSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [errored, setErrored] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    // Always restart from the beginning — re-hovering after the clip
    // finished should replay it, not resume a paused end-frame.
    v.currentTime = 0;
    v.play().catch(() => setErrored(true));
    setPlaying(true);
  };

  const handlePause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setPlaying(false);
  };

  // Real mouse hover (pointerType "mouse") still plays on enter / pauses on
  // leave. Touch devices don't fire a reliable, matching enter/leave pair —
  // mobile browsers send a synthetic pointerenter on first tap but no
  // pointerleave until the user taps elsewhere, which used to leave the
  // video stuck playing with no way to pause it. Reading e.pointerType lets
  // one set of handlers serve both input types correctly without any
  // client-only device detection (no state, no effect, no hydration risk).
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") handlePlay();
  };
  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse") handlePause();
  };
  const handleClick = () => {
    if (playing) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <div
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-hc-gold/15 bg-hc-surface"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {!errored && (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          poster={poster}
          onError={() => setErrored(true)}
          onEnded={() => setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* WebM (VP9) first — smaller and works even where H.264 licensing
             is unavailable; MP4 (H.264) as the universally-supported fallback. */}
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}
      <Image
        src={poster}
        alt={title}
        fill
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
          playing && !errored ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-hc-bg via-hc-bg/30 to-transparent" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full border border-hc-gold-light/60 bg-hc-bg/50 backdrop-blur-sm transition-all duration-500 group-hover:scale-90 group-hover:opacity-0">
        <span className="ml-1 text-hc-gold-light text-xl">▶</span>
      </div>

      <motion.div layout className="absolute inset-x-0 bottom-0 p-5">
        <motion.h4 layout="position" className="text-lg font-semibold text-hc-ivory">
          {title}
        </motion.h4>
        <AnimatePresence initial={false}>
          {!playing && (
            <motion.div
              key="meta"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-1 text-sm text-hc-concrete leading-relaxed">
                {description}
              </p>
              <span className="mt-2 inline-block text-[11px] uppercase tracking-[0.2em] text-hc-gold-light">
                Hover or tap to preview
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
