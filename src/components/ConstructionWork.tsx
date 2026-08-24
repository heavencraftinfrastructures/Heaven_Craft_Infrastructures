"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, serviceCategories, ServiceCategory } from "@/lib/data";
import TiltCard from "./ui/TiltCard";
import WireframeImage from "./ui/WireframeImage";
import GalleryLightbox from "./ui/GalleryLightbox";

export default function ConstructionWork() {
  const [filter, setFilter] = useState<ServiceCategory | "All">("All");
  const [active, setActive] = useState<{
    title: string;
    images: string[];
    photoIndex: number;
  } | null>(null);

  const filtered =
    filter === "All" ? services : services.filter((s) => s.category === filter);

  return (
    <section id="work" className="relative bg-hc-bg-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-10"
        >
          <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
            Our Expertise
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
            Construction Work
          </h2>
          <p className="mt-4 text-hc-concrete leading-relaxed">
            Structured expertise across design, building, infrastructure, and
            public projects.
          </p>
          <div className="divider-line w-24 mt-6" />
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(["All", ...serviceCategories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm tracking-wide transition-all duration-300 border ${
                filter === cat
                  ? "bg-hc-gold text-hc-bg border-hc-gold font-medium"
                  : "border-hc-gold/20 text-hc-ivory/70 hover:border-hc-gold/50 hover:text-hc-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                layout
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-hc-gold/10">
                  <button
                    type="button"
                    onClick={() =>
                      setActive({
                        title: service.title,
                        images: service.gallery,
                        photoIndex: 0,
                      })
                    }
                    aria-label={`View ${service.title} gallery`}
                    className="absolute inset-0 z-10 h-full w-full text-left"
                    suppressHydrationWarning
                  >
                    <WireframeImage
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0"
                      imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      delay={(i % 3) * 0.1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-hc-bg via-hc-bg/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/95 via-hc-bg/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <span className="absolute top-5 left-5 rounded-full bg-hc-bg/60 backdrop-blur-sm border border-hc-gold/30 px-3 py-1 text-[11px] tracking-wide uppercase text-hc-gold-light">
                      {service.category}
                    </span>

                    {service.gallery.length > 1 && (
                      <span className="absolute top-5 right-5 rounded-full bg-hc-bg/60 backdrop-blur-sm border border-hc-gold/30 px-2.5 py-1 text-[11px] text-hc-ivory">
                        {service.gallery.length} photos
                      </span>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="text-xs uppercase tracking-[0.2em] text-hc-gold-light">
                        {service.tag}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-hc-ivory">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-hc-concrete leading-relaxed max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                        {service.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm text-hc-gold-light opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        View Gallery
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <GalleryLightbox
            title={active.title}
            images={active.images}
            index={active.photoIndex}
            onClose={() => setActive(null)}
            onNavigate={(nextIndex) =>
              setActive((prev) => (prev ? { ...prev, photoIndex: nextIndex } : prev))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}
