"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { simulationTabs, videoShowcase, IMG, REAL } from "@/lib/data";
import BeforeAfterSlider from "./ui/BeforeAfterSlider";
import VideoCard from "./ui/VideoCard";
import WireframeImage from "./ui/WireframeImage";
import PlanningTimeline from "./ui/PlanningTimeline";

export default function Planning() {
  const [activeTab, setActiveTab] = useState(simulationTabs[0].key);
  const activeGallery = simulationTabs.find((t) => t.key === activeTab)!;

  return (
    <section id="planning" className="relative bg-hc-bg py-28 lg:py-36">
      {/* Blueprint layer */}
      <div className="absolute inset-0 bp-grid opacity-[0.07]" />
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-hc-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
            How We Build
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
            Planning
          </h2>
          <p className="mt-4 text-hc-concrete leading-relaxed">
            Advanced simulation-led planning that turns ideas into build-ready
            execution.
          </p>
          <p className="mt-4 text-lg font-serif-label italic text-hc-gold-light">
            &ldquo;We simulate the space before we build it.&rdquo;
          </p>
          <div className="divider-line w-24 mt-6" />
        </motion.div>

        {/* Planning story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24 items-center"
        >
          <div className="space-y-5">
            <p className="text-hc-ivory/90 leading-relaxed">
              Heaven Craft uses a structured planning system that carries every
              project from first conversation to finished build: requirement
              discovery, layout drafting, 3D visualization, material and
              lighting simulation, structural coordination, phased construction
              planning, and on-site execution tracking.
            </p>
            <p className="text-hc-concrete leading-relaxed">
              Every layout is tested for flow, light, structure, and finish
              before it becomes concrete, steel, or timber. From blueprint to
              site execution, planning stays visible and measurable — you see
              the plan, not just the promise.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-hc-gold/15">
            <Image
              src={IMG.blueprint2}
              alt="Architectural planning blueprint"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bp-grid-fine opacity-30 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/70 to-transparent" />
          </div>
        </motion.div>

        {/* Step-by-step timeline */}
        <PlanningTimeline />

        {/* Before / After slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-28"
        >
          <h3 className="text-2xl font-semibold text-hc-ivory mb-2">
            Concept vs. Completed
          </h3>
          <p className="text-hc-concrete mb-6 text-sm">
            Drag the divider to compare the simulated concept render with the
            finished, built space.
          </p>
          <BeforeAfterSlider before={REAL.before} after={REAL.after} />
        </motion.div>

        {/* Simulation gallery tabs */}
        <div className="mb-28">
          <h3 className="text-2xl font-semibold text-hc-ivory mb-6">
            Simulation Gallery
          </h3>
          <div className="flex flex-wrap gap-3 mb-8">
            {simulationTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-5 py-2 text-sm tracking-wide transition-all duration-300 border ${
                  activeTab === tab.key
                    ? "bg-hc-gold text-hc-bg border-hc-gold font-medium"
                    : "border-hc-gold/20 text-hc-ivory/70 hover:border-hc-gold/50 hover:text-hc-ivory"
                }`}
                suppressHydrationWarning
              >
                {tab.label}
              </button>
            ))}
          </div>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {activeGallery.images.map((img, i) => (
              <div
                key={img + i}
                className="relative aspect-[3/4] overflow-hidden rounded-xl border border-hc-gold/10 group"
              >
                <WireframeImage
                  src={img}
                  alt={activeGallery.label}
                  className="absolute inset-0"
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  delay={i * 0.08}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/60 to-transparent" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Video showcase */}
        <div>
          <h3 className="text-2xl font-semibold text-hc-ivory mb-2">
            Simulation & Progress Media
          </h3>
          <p className="text-hc-concrete mb-8 text-sm">
            Every layout is tested for flow, light, structure, and finish —
            previewed here before it reaches site.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {videoShowcase.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <VideoCard {...v} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
