"use client";

import React, { useRef, useState, useEffect } from "react";
import { ORBS } from "@/lib/universeData";
import { OrbId } from "@/types/universe";
import MobilePlanetPanel from "./MobilePlanetPanel";
import PlanetOrb from "./PlanetOrb";
import { useRouter } from "next/navigation";
import WarpOverlay from "./WarpOverlay";

// --- CONFIGURATION ---
const DRAG_SENSITIVITY = 0.005;
const SNAP_SPEED = 0.1;
const RADIUS_X = 130;
const RADIUS_Y = 40;
const SCALE_MIN = 0.4;
const SCALE_MAX = 1.6;

export default function MobileInfiniteUniverse() {
  const [rotation, setRotation] = useState(0);
  const [time, setTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openPage, setOpenPage] = useState<OrbId | null>(null);

  const [isWarping, setIsWarping] = useState(false);
  const [warpLines, setWarpLines] = useState<WarpLine[]>([]);
  const [targetOrb, setTargetOrb] = useState<Orb | null>(null);

  const dragRef = useRef({ startX: 0, startRotation: 0 });
  const animationFrameRef = useRef<number>();

  const n = ORBS.length;
  const sectorAngle = (Math.PI * 2) / n;
  const router = useRouter();

  const generateWarpLines = (count = 20): WarpLine[] => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      angle: Math.random() * Math.PI * 2,
      length: 100 + Math.random() * 200,
      offset: Math.random() * 50,
    }));
  };

  useEffect(() => {
    const animate = () => {
      setTime((t) => t + 0.02);

      if (!isDragging) {
        setRotation((prev) => {
          const snapPoint = Math.round(prev / sectorAngle) * sectorAngle;
          const dist = snapPoint - prev;
          if (Math.abs(dist) < 0.001) return prev;
          return prev + dist * SNAP_SPEED;
        });
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current!);
  }, [isDragging, sectorAngle]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragRef.current.startX = e.clientX;
    dragRef.current.startRotation = rotation;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    setRotation(dragRef.current.startRotation + dx * DRAG_SENSITIVITY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handlePlanetSelect = (id: OrbId) => {
    const selectedOrb = ORBS.find((o) => o.id === id);
    if (!selectedOrb || !selectedOrb.url) return;

    // Prevent double clicking while already warping
    if (isWarping) return;

    // 1. Setup Warp State
    setTargetOrb(selectedOrb);
    setWarpLines(generateWarpLines(24)); // Generate 24 random lines
    setIsWarping(true);

    // 2. Wait for animation (800ms) then navigate
    setTimeout(() => {
      router.push(selectedOrb.url);
      // Optional: Reset state after nav (though component unmounts usually)
    }, 800);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0d1a2d]">
      <WarpOverlay
        warping={isWarping}
        currentOrb={targetOrb}
        warpLines={warpLines}
      />
      {openPage ? (
        <MobilePlanetPanel
          orb={ORBS.find((o) => o.id === openPage)!}
          onClose={() => setOpenPage(null)}
          time={time}
        />
      ) : (
        <>
          <div className="absolute top-[12%] text-xs font-mono uppercase tracking-[0.3em] text-white/40 transition-opacity duration-500 select-none">
            {isDragging ? "RELEASE TO SNAP" : "DRAG TO ROTATE"}
          </div>

          <div
            className="relative flex h-[450px] w-full touch-none items-center justify-center perspective-[1000px]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Orbit Guide */}
            <div
              className={`absolute rounded-[100%] border border-white/5 transition-opacity duration-300 ${
                isWarping ? "opacity-0" : "opacity-100"
              }`}
              style={{
                width: RADIUS_X * 2.8,
                height: RADIUS_Y * 2.8,
                transform: "rotateX(10deg)",
              }}
            />

            {ORBS.map((orb, i) => {
              const theta = i * sectorAngle + rotation;

              // --- 3D POSITIONING MATH ---
              const x = Math.cos(theta) * RADIUS_X;
              const y = Math.sin(theta) * RADIUS_Y;

              // normalizedY: -1 (Back) to 1 (Front)
              const normalizedY = Math.sin(theta);
              const pFactor = (normalizedY + 1) / 2;

              // --- DYNAMIC VISUALS ---
              const scale =
                SCALE_MIN + Math.pow(pFactor, 1.5) * (SCALE_MAX - SCALE_MIN);
              const opacity = 0.3 + Math.pow(pFactor, 2) * 0.7;
              const zIndex = Math.floor(pFactor * 100);

              // Visual States
              const isFront = pFactor > 0.9;
              const saturation = pFactor * 100;
              const brightness = 50 + pFactor * 50;

              return (
                <PlanetOrb
                  key={orb.id}
                  orb={orb}
                  time={time}
                  x={x}
                  y={y}
                  scale={scale}
                  opacity={opacity}
                  zIndex={zIndex}
                  isFront={isFront}
                  isDragging={isDragging}
                  isWarping={isWarping}
                  saturation={saturation}
                  brightness={brightness}
                  onSelect={handlePlanetSelect}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
