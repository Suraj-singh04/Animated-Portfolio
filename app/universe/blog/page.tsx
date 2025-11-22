import BackButton from "@/components/mobile/ui/BackButton";
import { CONTENT } from "@/lib/universeData";
import type { OrbId } from "@/types/universe";

export default function AboutPage() {
  const data = CONTENT["blog" as OrbId];
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-white">
      <BackButton />
      <h1 className="text-4xl font-light tracking-[0.25em]">{data.t}</h1>
      <p className="mt-6 max-w-lg text-center text-white/70">{data.p}</p>

      <div className="mt-10 grid gap-4 w-full max-w-md">
        {data.items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/20 bg-white/5 p-4 text-center text-lg backdrop-blur-md"
          >
            {item}
          </div>
        ))}
      </div>
    </main>
  );
}
