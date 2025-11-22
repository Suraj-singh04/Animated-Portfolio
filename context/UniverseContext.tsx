"use client";
import { createContext, useContext, useState } from "react";
import type { OrbId } from "../types/universe";

interface UniverseState {
  hovered: OrbId | null;
  setHovered: (id: OrbId | null) => void;

  page: OrbId | null;
  setPage: (id: OrbId | null) => void;

  warping: boolean;
  setWarping: (b: boolean) => void;

  drag: boolean;
  setDrag: (b: boolean) => void;

  mPos: { x: number; y: number };
  setMPos: (p: { x: number; y: number }) => void;

  off: { x: number; y: number };
  setOff: (p: { x: number; y: number }) => void;

  vel: { x: number; y: number };
  setVel: (v: { x: number; y: number }) => void;
}

const UniverseContext = createContext<UniverseState | null>(null);
export const useUniverse = () => useContext(UniverseContext)!;

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [hovered, setHovered] = useState<OrbId | null>(null);
  const [page, setPage] = useState<OrbId | null>(null);
  const [warping, setWarping] = useState(false);
  const [drag, setDrag] = useState(false);
  const [mPos, setMPos] = useState({ x: 50, y: 50 });
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [vel, setVel] = useState({ x: 0, y: 0 });

  return (
    <UniverseContext.Provider
      value={{
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
