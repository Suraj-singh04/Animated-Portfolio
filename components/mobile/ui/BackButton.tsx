"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <button
      onClick={handleBack}
      className="absolute left-4 top-4 z-50 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.75rem] tracking-[0.18em] text-white backdrop-blur-lg transition hover:bg-white/20"
    >
      ← BACK
    </button>
  );
}
