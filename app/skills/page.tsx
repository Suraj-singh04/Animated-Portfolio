import BackButton from "@/components/mobile/ui/BackButton";

export default function About() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 text-white">
      <BackButton />
      <h1 className="text-3xl md:text-6xl tracking-[0.25em] font-light">
        ABOUT ME
      </h1>

      <p className="mt-6 max-w-xl text-center text-sm md:text-lg text-white/70">
        A passionate full-stack developer crafting digital experiences that
        blend creativity with clean code.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 w-full max-w-xl">
        {[
          "React & Next.js",
          "Node.js & Python",
          "Cloud Architecture",
          "UI/UX Design",
        ].map((item) => (
          <div
            key={item}
            className="bg-white/5 border border-white/10 px-6 py-4 rounded-lg text-sm md:text-lg text-center"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
