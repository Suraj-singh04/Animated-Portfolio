"use client";

import React from "react";
import { Orb, OrbId } from "@/types/universe";
import { CONTENT } from "@/lib/universeData";
import BackButton from "./BackButton";

interface MobilePlanetPanelProps {
  orb: Orb;
  onClose: () => void;
  time: number;
}

export default function MobilePlanetPanel({
  orb,
  onClose,
  time,
}: MobilePlanetPanelProps) {
  const content = CONTENT[orb.id as OrbId];

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-5 py-6 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: `radial-gradient(circle at top, ${orb.c1}33, #05050a 90%)`,
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="absolute left-5 top-5">
        <BackButton onClick={onClose} />
      </div>

      {/* Planet Header (Scaled up version of the orb) */}
      <div className="mb-6 mt-8 flex flex-col items-center relative scale-125">
        <div className="relative" style={{ width: 80, height: 80 }}>
          {/* Ring */}
          <div
            className="absolute rounded-full border border-transparent pointer-events-none"
            style={{
              width: 80 * 1.35,
              height: 80 * 1.35,
              top: -80 * 0.175,
              left: -80 * 0.175,
              borderColor: `${orb.c1}40`,
              transform: `rotate(${time * 25}deg)`,
            }}
          >
            <div
              className="absolute w-[6px] h-[6px] rounded-full bg-white top-[-3px] left-1/2 -translate-x-1/2 shadow-[0_0_8px_currentColor]"
              style={{ color: orb.c1 }}
            />
          </div>
          {/* Body */}
          <div
            className="rounded-full shadow-xl relative"
            style={{
              width: 80,
              height: 80,
              background: `radial-gradient(circle at 30% 30%, ${orb.c1}, ${orb.c2})`,
              boxShadow: `0 0 50px ${orb.c1}80, inset 0 0 25px rgba(255,255,255,0.15)`,
            }}
          >
            <div className="absolute rounded-full w-[55%] h-[55%] top-[16%] left-[16%] bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_70%)]" />
          </div>
        </div>

        <h2 className="mt-8 text-center text-[1.4rem] font-extralight tracking-[0.25em] text-white">
          {content.t}
        </h2>
        <p className="max-w-md text-center text-xs leading-relaxed text-white/80 px-4 mt-2">
          {content.p}
        </p>
      </div>

      {/* Content List */}
      <div className="mt-4 grid w-full max-w-md grid-cols-1 gap-3">
        {content.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/15 bg-white/5 p-4 text-center text-[0.9rem] tracking-[0.08em] text-white backdrop-blur-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
