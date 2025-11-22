"use client";
import React, { useRef, useState, useEffect } from "react";
import { ORBS, CONTENT } from "@/lib/universeData";
import type { Orb, OrbId } from "@/types/universe";

// --- CONFIGURATION ---
const DRAG_SENSITIVITY = 0.005;
const SNAP_SPEED = 0.1;
const RADIUS_X = 130; // Width of the orbit
const RADIUS_Y = 40; // Tilt/Height of the orbit
const SCALE_MIN = 0.4; // Size of planets at the very back
const SCALE_MAX = 1.6; // Size of the planet at the front (Center)

export default function MobileInfiniteUniverse() {
  const [rotation, setRotation] = useState(0);
  const [time, setTime] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openPage, setOpenPage] = useState<OrbId | null>(null);

  const dragRef = useRef({ startX: 0, startRotation: 0 });
  const animationFrameRef = useRef<number>();

  const n = ORBS.length;
  const sectorAngle = (Math.PI * 2) / n;

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

  return (
    <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a12] via-[#12121f] to-[#0d1a2d]">
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
            {/* Orbit Guide (Optional, made fainter) */}
            <div
              className="absolute rounded-[100%] border border-white/5"
              style={{
                width: RADIUS_X * 2.8,
                height: RADIUS_Y * 2.8,
                transform: "rotateX(10deg)",
              }}
            />

            {ORBS.map((o, i) => {
              const theta = i * sectorAngle + rotation;

              // --- 3D POSITIONING MATH ---
              const x = Math.cos(theta) * RADIUS_X;
              const y = Math.sin(theta) * RADIUS_Y;

              // normalizedY: -1 (Back/Smallest) to 1 (Front/Biggest)
              const normalizedY = Math.sin(theta);

              // Position Factor: 0 (back) -> 1 (front)
              const pFactor = (normalizedY + 1) / 2;

              // --- DYNAMIC SIZING ---
              // We use a power curve (pFactor^1.5) so the size jumps up quickly
              // only when it gets close to the front.
              const scale =
                SCALE_MIN + Math.pow(pFactor, 1.5) * (SCALE_MAX - SCALE_MIN);

              // --- DYNAMIC COLOR/VISIBILITY ---
              const opacity = 0.3 + Math.pow(pFactor, 2) * 0.7; // Back is 0.3, Front is 1.0
              const zIndex = Math.floor(pFactor * 100);

              // If it's very close to front (>0.9), it's fully colored.
              // Otherwise, it gets desaturated and dimmed.
              const isFront = pFactor > 0.9;
              const saturation = pFactor * 100; // 0% sat at back, 100% at front
              const brightness = 50 + pFactor * 50; // 50% brightness back, 100% front

              return (
                <div
                  key={o.id}
                  className="absolute flex items-center justify-center will-change-transform"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: o.size,
                    height: o.size,
                    zIndex: zIndex,
                    opacity: opacity,
                    // Smooth scaling transition based on drag position
                    transform: `translate3d(${x - o.size / 2}px, ${
                      y - o.size / 2
                    }px, 0) scale(${scale})`,
                    // Dynamic color filter
                    filter: `grayscale(${
                      100 - saturation
                    }%) brightness(${brightness}%)`,
                  }}
                >
                  {/* === MOONS === */}
                  {Array.from({ length: o.mn }).map((_, m) => (
                    <div
                      key={m}
                      className="absolute w-[6px] h-[6px] rounded-full bg-gradient-to-br from-neutral-200 to-neutral-600 shadow"
                      style={{
                        top:
                          o.size / 2 +
                          Math.sin(time * (1.2 - m * 0.2) + m * 2) *
                            (o.size * 0.5 + m * 8),
                        left:
                          o.size / 2 +
                          Math.cos(time * (1.2 - m * 0.2) + m * 2) *
                            (o.size * 0.5 + m * 8),
                        transform: "translate(-50%,-50%)",
                        boxShadow: "0 0 4px rgba(255,255,255,0.3)",
                        // Moons fade out if planet is not active
                        opacity: isFront ? 1 : 0.2,
                      }}
                    />
                  ))}

                  {/* === OUTER RING === */}
                  <div
                    className="absolute rounded-full border border-transparent pointer-events-none"
                    style={{
                      width: o.size * 1.35,
                      height: o.size * 1.35,
                      top: -o.size * 0.175,
                      left: -o.size * 0.175,
                      borderColor: isFront ? `${o.c1}40` : "transparent", // Hide ring if not front
                      transform: `rotate(${time * 25 + o.d * 90}deg)`,
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <div
                      className="absolute w-[6px] h-[6px] rounded-full bg-white"
                      style={{
                        top: -3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        boxShadow: `0 0 8px ${o.c1}`,
                        opacity: isFront ? 1 : 0, // Hide ring orb if not front
                      }}
                    />
                  </div>

                  {/* === PLANET BODY === */}
                  <div
                    onClick={() => {
                      if (isFront && !isDragging) setOpenPage(o.id as OrbId);
                    }}
                    className="relative flex items-center justify-center rounded-full transition-shadow duration-300"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `radial-gradient(circle at 30% 30%, ${o.c1}, ${o.c2})`,
                      boxShadow: isFront
                        ? `0 0 60px ${o.c1}80, 0 0 100px ${o.c2}40, inset 0 0 30px rgba(255,255,255,0.2)`
                        : "inset 0 0 10px rgba(0,0,0,0.8)", // Darker look when not chosen
                      cursor: isFront ? "pointer" : "grab",
                    }}
                  >
                    {/* Specular Highlight */}
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

                    {/* Label */}
                    <span
                      className={`z-[2] font-medium text-white transition-all duration-300 ${
                        isFront
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                      style={{
                        fontSize: o.size > 75 ? "0.7rem" : "0.55rem",
                        letterSpacing: "0.12em",
                        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      {o.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function MobilePlanetPanel({
  orb,
  onClose,
  time,
}: {
  orb: Orb;
  onClose: () => void;
  time: number;
}) {
  const content = CONTENT[orb.id as OrbId];
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center px-5 py-6 animate-in fade-in zoom-in-95 duration-300"
      style={{
        background: `radial-gradient(circle at top, ${orb.c1}33, #05050a 90%)`,
        backdropFilter: "blur(20px)",
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] tracking-[0.18em] text-white backdrop-blur-md"
      >
        ← BACK
      </button>

      {/* Planet Header */}
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
