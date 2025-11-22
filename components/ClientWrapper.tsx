"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MobileInfiniteUniverse from "@/components/mobile/ui/MobileInfiniteUniverse";

const UniverseCanvas = dynamic(
  () => import("@/components/universe/UniverseCanvas"),
  { ssr: false }
);

export default function ClientWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <MobileInfiniteUniverse /> : <UniverseCanvas />;
}
