"use client";
import { useEffect, useState } from "react";

export default function WarpGate({ trigger }: { trigger: boolean }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      setTimeout(() => setActive(false), 900); // animation duration
    }
  }, [trigger]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute w-[10px] h-[10px] rounded-full animate-[flashPulse_0.9s_ease-out_forwards] bg-white" />
      {Array.from({ length: 40 }).map((_, i) => {
        const angle = (i * 9 * Math.PI) / 180;
        const length = 50 + Math.random() * 150;
        const offset = Math.random() * 100;
        return (
          <div
            key={i}
            className="absolute h-[2px] animate-[warpLine_0.9s_ease-out_forwards]"
            style={{
              width: `${length}px`,
              background: "linear-gradient(90deg, white, cyan, transparent)",
              transform: `rotate(${angle}rad)`,
              left: "50%",
              top: "50%",
              transformOrigin: "0 50%",
              animationDelay: `${offset * 0.005}s`,
            }}
          />
        );
      })}
    </div>
  );
}
