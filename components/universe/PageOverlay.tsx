"use client";

import { CONTENT } from "@/lib/universeData";
import type { Orb, Particle } from "@/types/universe";

interface Props {
  page: keyof typeof CONTENT | null;
  time: number;
  currentOrb: Orb;
  particles: Particle[];
  pageShow: boolean;
  zoomOut: boolean;
  onBack: () => void;
}

export default function PageOverlay({
  page,
  time,
  currentOrb,
  particles,
  pageShow,
  zoomOut,
  onBack,
}: Props) {
  if (!page) return null;

  const content = CONTENT[page];

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{
        background: `linear-gradient(135deg, #0a0a12 0%, ${currentOrb.c2}18 50%, ${currentOrb.c1}18 100%)`,
        opacity: pageShow && !zoomOut ? 1 : 0,
      }}
    >
      {particles.slice(0, 10).map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x + Math.sin(time * p.sp + p.id) * 4}%`,
            top: `${p.y + Math.cos(time * p.sp + p.id) * 4}%`,
            width: p.s * 2,
            height: p.s * 2,
            background: `radial-gradient(circle, ${currentOrb.c1}35 0%, transparent 70%)`,
          }}
        />
      ))}

      <button
        onClick={onBack}
        className="absolute left-7 top-7 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.75rem] tracking-[0.15em] text-white backdrop-blur-md transition hover:bg-white/20"
      >
        ← BACK TO UNIVERSE
      </button>

      <div
        className="max-w-xl px-5 text-center transition-transform duration-700"
        style={{
          transform:
            pageShow && !zoomOut ? "translateY(0)" : "translateY(30px)",
        }}
      >
        <div
          className="mx-auto mb-8 rounded-full shadow-lg"
          style={{
            width: 80,
            height: 80,
            background: `radial-gradient(circle at 30% 30%, ${currentOrb.c1}, ${currentOrb.c2})`,
            boxShadow: `0 0 60px ${currentOrb.c1}60`,
            transform: `scale(${1 + Math.sin(time) * 0.05})`,
          }}
        />
        <h2
          className="mb-5 text-[2rem] font-extralight tracking-[0.2em] text-white"
          style={{ textShadow: `0 0 30px ${currentOrb.c1}` }}
        >
          {content.t}
        </h2>
        <p className="mb-10 text-base leading-relaxed text-white/80">
          {content.p}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {content.items.map((item, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-all"
              style={{
                transform:
                  pageShow && !zoomOut ? "translateY(0)" : "translateY(20px)",
                opacity: pageShow && !zoomOut ? 1 : 0,
                transitionDelay: `${0.3 + i * 0.1}s`,
              }}
            >
              <span className="text-[0.85rem] tracking-[0.05em] text-white">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute right-5 top-5 h-10 w-10 border-r border-t"
        style={{ borderColor: `${currentOrb.c1}40` }}
      />
      <div
        className="absolute bottom-5 left-5 h-10 w-10 border-b border-l"
        style={{ borderColor: `${currentOrb.c2}40` }}
      />
    </div>
  );
}
