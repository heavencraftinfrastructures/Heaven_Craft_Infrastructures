"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Desktop-only smooth inertia scrolling.
 *
 * Root cause of the mobile "stuck" scroll: Lenis intercepts the scroll event
 * and re-drives it via requestAnimationFrame, which is meant to smooth out
 * discrete mouse-wheel ticks on desktop. Phones already have native
 * momentum scrolling built into the OS/browser — layering Lenis on top of
 * that, combined with the many scroll-linked Framer Motion transforms on
 * this page (hero parallax, isometric building, tilt cards, horizontal
 * showcase), means two systems fight over the same scroll position and
 * frames get dropped, which reads as scrolling "sticking" mid-gesture.
 *
 * Fix: only run Lenis for fine-pointer devices (mouse/trackpad). Touch
 * devices get untouched native scrolling, which is already smooth.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    if (prefersReducedMotion || isTouchDevice) return;

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t: number) => 1 - Math.pow(1 - t, 2),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis tracks its own scrollable "limit" separately from the real
    // document height, refreshed via a debounced ResizeObserver. When a
    // component expands a large block of content in one go (e.g. the
    // Brochure gallery's "View All" reveal) while the user is mid-scroll,
    // Lenis can clamp its scroll target to the pre-expansion limit and
    // never resume moving toward the new, larger one — the page reads as
    // "stuck" partway down, with everything below (including the
    // Featured Visual Showcase scroll-driven section) unreachable. Any
    // component that changes document height in one shot should dispatch
    // this event right after so Lenis recalculates immediately instead of
    // waiting on its own debounce.
    const onContentResize = () => lenis.resize();
    window.addEventListener("lenis-resize", onContentResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("lenis-resize", onContentResize);
      lenis.destroy();
    };
  }, []);

  return null;
}
