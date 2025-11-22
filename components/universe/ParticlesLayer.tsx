"use client";

import type { Particle } from "@/types/universe";

interface Props {
  time: number;
  offX: number;
  offY: number;
  particles: Particle[];
  hidden?: boolean;
}

export default function ParticlesLayer({
  time,
  offX,
  offY,
  particles,
  hidden,
}: Props) {
  if (hidden) return null;

  return (
    <>
      {particles.map((p) => {
        const px =
          ((((p.x + Math.sin(time * p.sp + p.id) * 2 + offX * 0.04) % 110) +
            110) %
            110) -
          5;
        const py =
          ((((p.y + Math.cos(time * p.sp + p.id) * 2 + offY * 0.04) % 110) +
            110) %
            110) -
          5;
        return (
          <div
            key={`p${p.id}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${px}%`,
              top: `${py}%`,
              width: p.s,
              height: p.s,
              background:
                "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
            }}
          />
        );
      })}
    </>
  );
}
