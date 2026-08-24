import Image from "next/image";
import { teamContacts, brand, studioAddress } from "@/lib/data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Construction Work", href: "#work" },
  { label: "Planning", href: "#planning" },
  { label: "Contact", href: "#contact" },
];

const serviceList = [
  "Interior Design & Execution",
  "Construction & Site Execution",
  "Architecture & Design Concepts",
];

export default function Footer() {
  return (
    <footer className="relative bg-hc-bg-soft border-t border-hc-gold/10">
      <div className="absolute inset-0 bp-grid opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src={brand.logo}
                alt={`${brand.name}${brand.nameAccent} logo`}
                width={32}
                height={32}
                className="h-7 w-7 object-contain"
              />
              <span className="text-xl font-bold text-hc-ivory">
                {brand.name}
                <span className="text-gradient-gold">{brand.nameAccent}</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-hc-concrete leading-relaxed max-w-xs">
              A multidisciplinary design and construction studio delivering
              interiors, exteriors, structures, and planning — end to end.
            </p>
          </div>

          <div>
            <h5 className="text-sm uppercase tracking-[0.2em] text-hc-gold-light mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-hc-ivory/75 hover:text-hc-gold-light transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm uppercase tracking-[0.2em] text-hc-gold-light mb-4">
              Services
            </h5>
            <ul className="space-y-2.5">
              {serviceList.map((s) => (
                <li key={s} className="text-sm text-hc-ivory/75">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-sm uppercase tracking-[0.2em] text-hc-gold-light mb-4">
              Contact
            </h5>
            <ul className="space-y-2.5 text-sm text-hc-ivory/75">
              <li>{studioAddress}</li>
              <li>heavencraftinfrastructures@gmail.com</li>
            </ul>
            <ul className="mt-4 space-y-3 text-xs text-hc-concrete">
              {teamContacts.map((c) => (
                <li key={c.name} className="flex flex-col gap-0.5">
                  <span className="text-hc-ivory/85 font-medium">{c.name}</span>
                  <span>{c.role}</span>
                  <span>{c.phone}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 divider-line" />

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-hc-concrete">
          <span>© 2026 Heaven Craft. All rights reserved.</span>
          <span>Crafting Spaces. Building Futures.</span>
        </div>
      </div>
    </footer>
  );
}
