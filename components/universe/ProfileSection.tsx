"use client";

const ORBIT_COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b"];

export default function ProfileSection({ time }: { time: number }) {
  return (
    <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
      <div className="relative w-[90px] h-[90px] mx-auto mb-3">
        <div
          className="absolute inset-[-12px] rounded-full border border-transparent opacity-50"
          style={{
            borderTopColor: "#6366f1",
            borderRightColor: "#ec4899",
            borderBottomColor: "#14b8a6",
            transform: `rotate(${time * 35}deg)`,
          }}
        />
        <div
          className="absolute inset-[-20px] rounded-full border border-dashed border-white/15"
          style={{ transform: `rotate(${-time * 20}deg)` }}
        />
        <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-indigo-500 via-pink-500 to-orange-400 p-[2px] shadow-glow">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center text-[2.2rem]">
            👨‍💻
          </div>
        </div>
        {ORBIT_COLORS.map((c, i) => (
          <div
            key={i}
            className="absolute w-[6px] h-[6px] rounded-full"
            style={{
              backgroundColor: c,
              top: 45 + Math.sin(time * 1.3 + i * 1.57) * 52,
              left: 45 + Math.cos(time * 1.3 + i * 1.57) * 52,
              boxShadow: `0 0 8px ${c}`,
              transform: "translate(-50%,-50%)",
            }}
          />
        ))}
      </div>
      <h1 className="text-white text-2xl font-extralight tracking-[0.25em] drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
        JOHN DOE
      </h1>
      <p className="mt-1 text-[0.65rem] text-white/45 tracking-[0.35em]">
        FULL STACK DEVELOPER
      </p>
      <div className="mt-2 inline-block rounded-2xl border border-white/10 bg-white/5 px-3 py-1">
        <span className="font-mono text-[0.55rem] text-teal-400">
          {">"} Building the future
          {Math.sin(time * 4) > 0 ? "|" : ""}
        </span>
      </div>
    </div>
  );
}
