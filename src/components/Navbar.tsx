"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { brand } from "@/lib/data";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Construction Work", href: "#work" },
  { label: "Brochure", href: "#brochure" },
  { label: "Planning", href: "#planning" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // The mobile menu's own close animation (height auto -> 0, ~0.35s) fires
  // in the same tick as the link click. Left to the browser's native
  // href="#id" jump, that in-flight layout animation reliably swallows the
  // scroll — the URL hash updates but the page never actually moves. Doing
  // the scroll ourselves via scrollIntoView (which still respects the
  // global scroll-padding-top offset for the fixed header) sidesteps that
  // entirely and is what desktop's plain <a> links don't need but mobile
  // does.
  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    requestAnimationFrame(() => {
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-hc-bg/80 backdrop-blur-md border-b border-hc-gold/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#home" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src={brand.logo}
            alt={`${brand.name}${brand.nameAccent} logo`}
            width={40}
            height={40}
            priority
            className="h-8 w-8 md:h-9 md:w-9 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="text-xl md:text-2xl font-bold tracking-wide text-hc-ivory">
              {brand.name}
              <span className="text-gradient-gold">{brand.nameAccent}</span>
            </span>
            <span
              className="mt-1 text-[9px] md:text-[10px] font-medium uppercase tracking-[0.15em] text-hc-concrete"
              style={{ paddingLeft: "0.62em" }}
            >
              {brand.subheading}
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-sm tracking-wide transition-colors duration-300 ${
                active === link.href
                  ? "text-hc-gold-light"
                  : "text-hc-ivory/80 hover:text-hc-ivory"
              }`}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-gradient-to-r from-hc-gold-light to-hc-copper"
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center rounded-full border border-hc-gold/50 px-5 py-2.5 text-sm font-medium text-hc-ivory transition-all duration-300 hover:bg-hc-gold hover:text-hc-bg hover:border-hc-gold"
        >
          Start Your Project
        </a>

        <button
          aria-label="Toggle menu"
          className="lg:hidden relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
          suppressHydrationWarning
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-[1.5px] w-6 bg-hc-ivory"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="h-[1.5px] w-6 bg-hc-ivory"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-[1.5px] w-6 bg-hc-ivory"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-hc-bg/95 backdrop-blur-md border-t border-hc-gold/10"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNavClick(e, link.href)}
                  className="py-3 text-base text-hc-ivory/90 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleMobileNavClick(e, "#contact")}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-hc-gold-light to-hc-copper px-5 py-3 text-sm font-medium text-hc-bg"
              >
                Start Your Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
