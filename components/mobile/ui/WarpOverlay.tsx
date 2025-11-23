"use client";

import React from "react";
import type { Orb, WarpLine } from "@/types/universe";

interface Props {
  warping: boolean;
  currentOrb: Orb | null; // Allow null initially
  warpLines: WarpLine[];
}

export default function WarpOverlay({ warping, currentOrb, warpLines }: Props) {
  if (!warping || !currentOrb) return null;

  return (
    <div className="absolute inset-0 z-[100] overflow-hidden pointer-events-none">
      {/* Flash pulse orb */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full animate-[flashPulse_0.8s_ease-out_forwards]"
        style={{
          transform: "translate(-50%, -50%)",
          width: "10px",
          height: "10px",
          background: `radial-gradient(circle, white 0%, ${currentOrb.c1} 50%, transparent 70%)`,
        }}
      />

      {/* Warp trails */}
      {warpLines.map((line) => (
        <div
          key={line.id}
          className="absolute animate-[warpLine_0.8s_ease-out_forwards]"
          style={{
            left: `${50 + Math.cos(line.angle) * 5}%`,
            top: `${50 + Math.sin(line.angle) * 5}%`,
            width: `${line.length}px`,
            height: "2px",
            background: `linear-gradient(90deg, white, ${currentOrb.c1}, transparent)`,
            transform: `rotate(${line.angle}rad)`,
            transformOrigin: "0 50%",
            animationDelay: `${line.offset * 0.005}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Inject keyframes */}
      <style>{`
        @keyframes warpLine {
          0% { opacity: 0; transform: scaleX(0) }
          30% { opacity: 1 }
          100% { opacity: 0; transform: scaleX(3) }
        }
        @keyframes flashPulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1 }
          100% { transform: translate(-50%, -50%) scale(100); opacity: 0 }
        }
      `}</style>
    </div>
  );
}
