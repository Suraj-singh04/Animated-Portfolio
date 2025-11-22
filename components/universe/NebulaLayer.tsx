"use client";

export default function NebulaLayer({ time }: { time: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <div
        className="absolute w-[300px] h-[300px] left-[5%] top-[15%] rounded-full blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 65%)",
          transform: `translate(${Math.sin(time * 0.1) * 12}px, ${
            Math.cos(time * 0.08) * 10
          }px)`,
        }}
      />
      <div
        className="absolute w-[260px] h-[260px] right-[10%] top-[45%] rounded-full blur-[55px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(236,72,153,0.15) 0%, transparent 65%)",
          transform: `translate(${Math.cos(time * 0.09) * 15}px, ${
            Math.sin(time * 0.12) * 12
          }px)`,
        }}
      />
      <div
        className="absolute w-[220px] h-[220px] left-[45%] bottom-[5%] rounded-full blur-[50px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(20,184,166,0.12) 0%, transparent 65%)",
          transform: `translate(${Math.sin(time * 0.12) * 10}px, ${
            Math.cos(time * 0.1) * 8
          }px)`,
        }}
      />
    </div>
  );
}
