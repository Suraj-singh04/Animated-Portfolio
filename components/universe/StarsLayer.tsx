"use client";

import type { StaticStar } from "@/types/universe";

interface Props {
  time: number;
  offX: number;
  offY: number;
  stars: StaticStar[];
  hidden?: boolean;
}

export default function StarsLayer({ time, offX, offY, stars, hidden }: Props) {
  if (hidden) return null;

  return (
    <>
      {stars.map((s) => {
        const px = ((((s.x + offX * 0.02) % 120) + 120) % 120) - 10;
        const py = ((((s.y + offY * 0.02) % 120) + 120) % 120) - 10;
        return (
          <div
            key={`s${s.id}`}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              left: `${px}%`,
              top: `${py}%`,
              width: s.s,
              height: s.s,
              opacity: 0.1 + Math.sin(time * s.tw + s.id) * 0.1,
            }}
          />
        );
      })}
    </>
  );
}
