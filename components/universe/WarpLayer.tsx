"use client";

import type { Orb, WarpLine } from "@/types/universe";

interface Props {
  warping: boolean;
  currentOrb: Orb;
  warpLines: WarpLine[];
}

export default function WarpOverlay({ warping, currentOrb, warpLines }: Props) {
  if (!warping) return null;

  return (
    <div className="absolute inset-0 z-[100] overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2 rounded-full animate-flash"
        style={{
          transform: "translate(-50%,-50%)",
          width: 10,
          height: 10,
          background: `radial-gradient(circle, white 0%, ${currentOrb.c1} 50%, transparent 70%)`,
        }}
      />
      {warpLines.map((l) => (
        <div
          key={l.id}
          className="absolute animate-warp"
          style={{
            left: `${50 + Math.cos(l.angle) * 5}%`,
            top: `${50 + Math.sin(l.angle) * 5}%`,
            width: l.length,
            height: 2,
            background: `linear-gradient(90deg, white, ${currentOrb.c1}, transparent)`,
            transform: `rotate(${l.angle}rad)`,
            transformOrigin: "0 50%",
            animationDelay: `${l.offset * 0.005}s`,
          }}
        />
      ))}
    </div>
  );
}
