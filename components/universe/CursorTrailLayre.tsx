"use client";

import { TRAIL_COLORS } from "@/lib/universeData";
import type { TrailPoint } from "@/types/universe";

export default function CursorTrailLayer({ trail }: { trail: TrailPoint[] }) {
  return (
    <>
      {trail.map((r, i) => (
        <div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            width: Math.max(2, 6 - i * 0.6),
            height: Math.max(2, 6 - i * 0.6),
            backgroundColor: TRAIL_COLORS[i % 4],
            opacity: 0.5 - i * 0.05,
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </>
  );
}
