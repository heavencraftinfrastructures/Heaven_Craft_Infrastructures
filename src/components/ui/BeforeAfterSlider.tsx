"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Concept Render",
  afterLabel = "Completed Space",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-hc-gold/15 cursor-ew-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      <Image src={after} alt={afterLabel} fill className="object-cover" />
      <span className="absolute bottom-4 right-4 rounded-full bg-hc-bg/70 backdrop-blur-sm px-3 py-1 text-xs tracking-wide text-hc-ivory border border-hc-gold/20">
        {afterLabel}
      </span>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt={beforeLabel} fill className="object-cover" />
        <span className="absolute bottom-4 left-4 rounded-full bg-hc-bg/70 backdrop-blur-sm px-3 py-1 text-xs tracking-wide text-hc-ivory border border-hc-gold/20">
          {beforeLabel}
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-hc-gold-light"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-hc-gold-light text-hc-bg shadow-lg">
          <span className="text-xs">↔</span>
        </div>
      </div>
    </div>
  );
}
