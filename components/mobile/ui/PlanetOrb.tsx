"use client";

import React from "react";
import { Orb, OrbId } from "@/types/universe";

interface PlanetOrbProps {
  orb: Orb;
  time: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isFront: boolean;
  isDragging: boolean;
  // --- ADD NEW PROP ---
  isWarping: boolean;
  saturation: number;
  brightness: number;
  onSelect: (id: OrbId) => void;
}

export default function PlanetOrb({
  orb,
  time,
  x,
  y,
  scale,
  opacity,
  zIndex,
  isFront,
  isDragging,
  // --- DESTRUCTURE NEW PROP ---
  isWarping,
  saturation,
  brightness,
  onSelect,
}: PlanetOrbProps) {
  // Calculate final opacity: if warping, force to 0, otherwise use calculated opacity
  const finalOpacity = isWarping ? 0 : opacity;

  return (
    <div
      // --- UPDATE CLASSNAME ---
      // Added "transition-opacity duration-300" for smooth disappearance
      className="absolute flex items-center justify-center will-change-transform transition-opacity duration-300"
      style={{
        left: "50%",
        top: "50%",
        width: orb.size,
        height: orb.size,
        zIndex: zIndex,
        // --- UPDATE OPACITY STYLE ---
        opacity: finalOpacity,
        transform: `translate3d(${x - orb.size / 2}px, ${
          y - orb.size / 2
        }px, 0) scale(${scale})`,
        filter: `grayscale(${100 - saturation}%) brightness(${brightness}%)`,
      }}
    >
      {/* ... rest of the component remains the same ... */}
      {/* === MOONS === */}
      {Array.from({ length: orb.mn }).map((_, m) => (
        <div
          key={m}
          className="absolute w-[6px] h-[6px] rounded-full bg-gradient-to-br from-neutral-200 to-neutral-600 shadow"
          style={{
            top:
              orb.size / 2 +
              Math.sin(time * (1.2 - m * 0.2) + m * 2) *
                (orb.size * 0.5 + m * 8),
            left:
              orb.size / 2 +
              Math.cos(time * (1.2 - m * 0.2) + m * 2) *
                (orb.size * 0.5 + m * 8),
            transform: "translate(-50%,-50%)",
            boxShadow: "0 0 4px rgba(255,255,255,0.3)",
            opacity: isFront ? 1 : 0.2,
          }}
        />
      ))}

      {/* === OUTER RING === */}
      <div
        className="absolute rounded-full border border-transparent pointer-events-none"
        style={{
          width: orb.size * 1.35,
          height: orb.size * 1.35,
          top: -orb.size * 0.175,
          left: -orb.size * 0.175,
          borderColor: isFront ? `${orb.c1}40` : "transparent",
          transform: `rotate(${time * 25 + orb.d * 90}deg)`,
          transition: "border-color 0.3s ease",
        }}
      >
        <div
          className="absolute w-[6px] h-[6px] rounded-full bg-white"
          style={{
            top: -3,
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: `0 0 8px ${orb.c1}`,
            opacity: isFront ? 1 : 0,
          }}
        />
      </div>

      {/* === PLANET BODY === */}
      <div
        onClick={() => {
          if (isFront && !isDragging) onSelect(orb.id as OrbId);
        }}
        className="relative flex items-center justify-center rounded-full transition-shadow duration-300"
        style={{
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at 30% 30%, ${orb.c1}, ${orb.c2})`,
          boxShadow: isFront
            ? `0 0 60px ${orb.c1}80, 0 0 100px ${orb.c2}40, inset 0 0 30px rgba(255,255,255,0.2)`
            : "inset 0 0 10px rgba(0,0,0,0.8)",
          cursor: isFront ? "pointer" : "grab",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
            top: "16%",
            left: "16%",
            opacity: isFront ? 1 : 0.3,
          }}
        />

        <span
          className={`z-[2] font-medium text-white transition-all duration-300 ${
            isFront ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{
            fontSize: orb.size > 75 ? "0.7rem" : "0.55rem",
            letterSpacing: "0.12em",
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          {orb.label}
        </span>
      </div>
    </div>
  );
}
