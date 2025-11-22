"use client";

export default function HUDOverlay({ time }: { time: number }) {
  return (
    <>
      {/* Code snippets */}
      <div
        className="pointer-events-none absolute bottom-[10%] right-[6%] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[0.6rem] font-mono text-indigo-200 backdrop-blur-md"
        style={{
          transform: `translateY(${Math.sin(time * 0.6) * 6}px) rotate(${
            Math.sin(time * 0.2) * 2
          }deg)`,
        }}
      >
        <span className="text-purple-300">const</span> passion <span>=</span>{" "}
        <span className="text-emerald-300">&apos;code&apos;</span>;
      </div>

      <div
        className="pointer-events-none absolute bottom-[22%] left-[4%] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-[0.6rem] font-mono text-indigo-200 backdrop-blur-md"
        style={{
          transform: `translateY(${Math.cos(time * 0.5) * 5}px) rotate(${
            Math.cos(time * 0.3) * -2
          }deg)`,
        }}
      >
        <span className="text-pink-300">&lt;</span>
        <span className="text-sky-300">Create</span>
        <span className="text-pink-300">&gt;</span>
        <span className="text-amber-300">Amazing</span>
        <span className="text-pink-300">&lt;/</span>
        <span className="text-sky-300">Create</span>
        <span className="text-pink-300">&gt;</span>
      </div>

      {/* Hint */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center opacity-40">
        <span className="mb-1 text-[0.5rem] tracking-[0.15em] text-white">
          EXPLORE SOLAR SYSTEM • CLICK PLANETS
        </span>
        <div className="flex h-5 w-9 items-center justify-center rounded-full border border-white/30">
          <div
            className="h-[5px] w-[5px] rounded-full bg-white opacity-50"
            style={{
              transform: `translateX(${Math.sin(time * 2) * 10}px)`,
            }}
          />
        </div>
      </div>

      {/* Corners */}
      <div className="pointer-events-none absolute left-4 top-4 h-9 w-9 border-l border-t border-white/20" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-9 w-9 border-b border-r border-white/20" />
    </>
  );
}
