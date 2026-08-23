"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { IMG, stats, advantageCards } from "@/lib/data";
import Counter from "./ui/Counter";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative bg-hc-bg py-28 lg:py-36">
      <div className="absolute inset-0 bp-grid opacity-[0.06]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="mb-16 max-w-2xl"
        >
          <span className="font-serif-label italic text-hc-gold-light text-sm tracking-[0.25em] uppercase">
            Who We Are
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-hc-ivory">
            About Heaven Craft
          </h2>
          <p className="mt-4 font-serif-label italic text-lg text-hc-concrete">
            We build the way we&apos;d want someone to build for us.
          </p>
          <div className="divider-line w-24 mt-6" />
        </motion.div>

        {/* Story + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl"
          >
            <Image
              src={IMG.officeInterior}
              alt="Heaven Craft studio interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hc-bg/60 via-transparent to-transparent" />
            <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-hc-gold to-transparent" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="space-y-6"
          >
            <p className="text-lg text-hc-ivory/90 leading-relaxed">
              Heaven Craft started with a simple belief — the people building
              your home or workplace should care about it as much as you do.
              We bring together designers who love beautiful spaces and
              builders who take pride in getting the details right, so nothing
              gets lost between the idea and the finished walls.
            </p>
            <p className="text-hc-concrete leading-relaxed">
              A home is where your family grows up. An office is where your
              team does their best work. A public space is where a community
              gathers for years to come. We sit with you first, understand
              what that space needs to hold, and show you exactly what you&apos;re
              getting — because the best buildings are the ones that quietly
              shape the life happening inside them.
            </p>

            <div className="pt-4 rounded-xl border border-hc-gold/15 bg-hc-surface/40 p-6">
              <h4 className="text-hc-gold-light font-semibold mb-2 text-sm tracking-wide uppercase">
                Our Mission
              </h4>
              <p className="text-hc-ivory/80 text-sm leading-relaxed">
                To build spaces our clients are genuinely proud of — designed
                with care, built to last, and delivered the way we promised,
                every single time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient-gold">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-hc-concrete tracking-wide">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Roles + Advantages cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {advantageCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, rotateX: 2 }}
              style={{ transformStyle: "preserve-3d" }}
              className="group relative rounded-2xl border border-hc-gold/15 bg-hc-surface/50 p-8 transition-all duration-500 hover:border-hc-gold/40 hover:shadow-[0_0_40px_-10px_rgba(201,162,77,0.35)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-hc-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <span className="text-hc-gold text-3xl font-serif-label italic">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-hc-ivory">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-hc-concrete leading-relaxed">
                  {card.body}
                </p>
                <ul className="mt-5 space-y-2">
                  {card.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-sm text-hc-ivory/80"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-hc-gold" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
