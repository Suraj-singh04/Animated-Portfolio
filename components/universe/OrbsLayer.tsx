"use client";

import { ORBS } from "@/lib/universeData";
import type { Orb } from "@/types/universe";

interface Props {
  time: number;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  drag: boolean;
  mPos: { x: number; y: number };
  onClickOrb: (o: Orb) => void;
}

export default function OrbsLayer({
  time,
  hovered,
  setHovered,
  drag,
  mPos,
  onClickOrb,
}: Props) {
  return (
    <>
      {ORBS.map((o) => {
        const fx = Math.sin(time * 0.4 + o.d) * 6;
        const fy = Math.cos(time * 0.3 + o.d) * 8;
        const isHovered = hovered === o.id;
        const tiltX = isHovered ? (mPos.y - 50) * 0.1 : 0;
        const tiltY = isHovered ? -(mPos.x - 50) * 0.1 : 0;

        return (
          <div
            key={o.id}
            className="absolute z-[5]"
            style={{
              left: `${o.x + fx * 0.3}%`,
              top: `${o.y + fy * 0.3}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
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
                }}
              />
            ))}

            <div
              onMouseEnter={() => !drag && setHovered(o.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onClickOrb(o)}
              className="relative flex items-center justify-center rounded-full transition-transform duration-300 cursor-pointer"
              style={{
                width: o.size,
                height: o.size,
                background: `radial-gradient(circle at 30% 30%, ${o.c1}, ${o.c2})`,
                boxShadow: isHovered
                  ? `0 0 50px ${o.c1}80, 0 0 80px ${o.c2}40, inset 0 0 25px rgba(255,255,255,0.15)`
                  : `0 0 25px ${o.c1}45, 0 0 50px ${o.c2}20`,
                transform: `scale(${
                  isHovered ? 1.12 : 1
                }) perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: "55%",
                  height: "55%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
                  top: "16%",
                  left: "16%",
                }}
              />
              <span
                className="z-[2] font-medium text-white"
                style={{
                  fontSize: o.size > 75 ? "0.7rem" : "0.55rem",
                  letterSpacing: "0.12em",
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {o.label}
              </span>
            </div>

            <div
              className="absolute rounded-full border border-transparent pointer-events-none"
              style={{
                width: o.size * 1.25,
                height: o.size * 1.25,
                top: -o.size * 0.125,
                left: -o.size * 0.125,
                borderColor: `${o.c1}25`,
                transform: `rotate(${time * 25 + o.d * 90}deg)`,
              }}
            >
              <div
                className="absolute w-[6px] h-[6px] rounded-full bg-white"
                style={{
                  top: -3,
                  left: "50%",
                  transform: "translateX(-50%)",
                  boxShadow: `0 0 8px ${o.c1}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
