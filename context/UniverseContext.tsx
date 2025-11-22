"use client";

import { createContext, useContext, useState } from "react";
import type { OrbId, Vec2 } from "@/types/universe";

interface UniverseContextType {
  time: number;
  setTime: (n: number) => void;

  hovered: OrbId | null;
  setHovered: (id: OrbId | null) => void;

  page: OrbId | null;
  setPage: (id: OrbId | null) => void;

  warping: boolean;
  setWarping: (b: boolean) => void;

  drag: boolean;
  setDrag: (b: boolean) => void;

  mPos: Vec2;
  setMPos: (p: Vec2) => void;

  off: Vec2;
  setOff: (p: Vec2) => void;

  vel: Vec2;
  setVel: (v: Vec2) => void;
}

const UniverseContext = createContext<UniverseContextType | null>(null);
export const useUniverse = () => useContext(UniverseContext)!;

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState<OrbId | null>(null);
  const [page, setPage] = useState<OrbId | null>(null);
  const [warping, setWarping] = useState(false);
  const [drag, setDrag] = useState(false);
  const [mPos, setMPos] = useState<Vec2>({ x: 50, y: 50 });
  const [off, setOff] = useState<Vec2>({ x: 0, y: 0 });
  const [vel, setVel] = useState<Vec2>({ x: 0, y: 0 });

  return (
    <UniverseContext.Provider
      value={{
        time,
        setTime,
        hovered,
        setHovered,
        page,
        setPage,
        warping,
        setWarping,
        drag,
        setDrag,
        mPos,
        setMPos,
        off,
        setOff,
        vel,
        setVel,
      }}
    >
      {children}
    </UniverseContext.Provider>
  );
}
