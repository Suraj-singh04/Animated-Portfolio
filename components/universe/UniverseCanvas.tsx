"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import NebulaLayer from "./NebulaLayer";
import StarsLayer from "./StarsLayer";
import ParticlesLayer from "./ParticlesLayer";
import CursorTrailLayer from "./CursorTrailLayer";
import ProfileSection from "./ProfileSection";
import OrbsLayer from "./OrbsLayer";
import WarpOverlay from "./WarpOverlay";
import PageOverlay from "./PageOverlay";
import HUDOverlay from "./HUDOverlay";
import { ORBS } from "@/lib/universeData";
import type {
  Orb,
  Particle,
  StaticStar,
  TrailPoint,
  Vec2,
  WarpLine,
  Star,
} from "@/types/universe";

export default function UniverseCanvas() {
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [warping, setWarping] = useState(false);
  const [warpOrb, setWarpOrb] = useState<Orb | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const [pageShow, setPageShow] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [off, setOff] = useState<Vec2>({ x: 0, y: 0 });
  const [vel, setVel] = useState<Vec2>({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const [lastM, setLastM] = useState<Vec2>({ x: 0, y: 0 });
  const [moved, setMoved] = useState(false);
  const [mPos, setMPos] = useState<Vec2>({ x: 50, y: 50 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [star, setStar] = useState<Star | null>(null);
  const [ready, setReady] = useState(false);

  const anim = useRef<number | null>(null);

  // Time + ready
  useEffect(() => {
    const i = setInterval(() => setTime((t) => t + 0.02), 16);
    const t = setTimeout(() => setReady(true), 100);
    return () => {
      clearInterval(i);
      clearTimeout(t);
    };
  }, []);

  // Shooting star
  useEffect(() => {
    const i = setInterval(() => {
      if (Math.random() > 0.6 && !page && !warping) {
        setStar({
          x: Math.random() * 50 + 5,
          y: Math.random() * 35 + 5,
          a: 25 + Math.random() * 20,
        });
        setTimeout(() => setStar(null), 600);
      }
    }, 4000);
    return () => clearInterval(i);
  }, [page, warping]);

  // Inertia
  useEffect(() => {
    if (!drag && (Math.abs(vel.x) > 0.1 || Math.abs(vel.y) > 0.1)) {
      anim.current = window.requestAnimationFrame(() => {
        setOff((o) => ({ x: o.x + vel.x, y: o.y + vel.y }));
        setVel((v) => ({ x: v.x * 0.94, y: v.y * 0.94 }));
      });
    }
    return () => {
      if (anim.current !== null) cancelAnimationFrame(anim.current);
    };
  }, [drag, vel]);

  // Trail
  useEffect(() => {
    if (drag) {
      setTrail((r) => [
        ...r.slice(-8),
        { x: mPos.x, y: mPos.y, id: Date.now() },
      ]);
    } else if (trail.length) {
      const t = setTimeout(() => setTrail([]), 300);
      return () => clearTimeout(t);
    }
  }, [drag, mPos, trail.length]);

  // Precomputed arrays
  const particles: Particle[] = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: (i * 37) % 100,
        y: (i * 23) % 100,
        s: 3 + (i % 4) * 2,
        sp: 0.5 + (i % 3) * 0.3,
      })),
    []
  );

  const staticStars: StaticStar[] = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 250 - 75,
        y: Math.random() * 250 - 75,
        s: 1 + Math.random() * 1.5,
        tw: 0.4 + Math.random(),
      })),
    []
  );

  const warpLines: WarpLine[] = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        angle: (i * 9 * Math.PI) / 180,
        length: 50 + Math.random() * 150,
        offset: Math.random() * 100,
      })),
    []
  );

  const conns: [number, number][] = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [1, 4],
  ];

  const curOrb: Orb = warpOrb || ORBS[0];
  const transformOrigin = warpOrb ? `${warpOrb.x}% ${warpOrb.y}%` : "center";

  // Handlers
  const handleOrbClick = (o: Orb) => {
    if (warping || page || moved) return;
    setWarpOrb(o);
    setWarping(true);
    setTimeout(() => {
      setPage(o.id);
      setTimeout(() => {
        setPageShow(true);
        setWarping(false);
      }, 100);
    }, 800);
  };

  const handleBack = () => {
    setPageShow(false);
    setZoomOut(true);
    setTimeout(() => {
      setPage(null);
      setTimeout(() => setZoomOut(false), 600);
    }, 100);
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (page) return;
    setDrag(true);
    setMoved(false);
    setLastM({ x: e.clientX || 0, y: e.clientY || 0 });
    setVel({ x: 0, y: 0 });
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMPos({
      x: (((e.clientX || 0) - rect.left) / rect.width) * 100,
      y: (((e.clientY || 0) - rect.top) / rect.height) * 100,
    });

    if (!drag || page) return;

    const dx = (e.clientX || 0) - lastM.x;
    const dy = (e.clientY || 0) - lastM.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) setMoved(true);
    setOff((o) => ({ x: o.x + dx, y: o.y + dy }));
    setVel({ x: dx * 0.5, y: dy * 0.5 });
    setLastM({ x: e.clientX || 0, y: e.clientY || 0 });
  };

  const handleMouseUp = () => {
    setDrag(false);
    setTimeout(() => setMoved(false), 50);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full rounded-2xl overflow-hidden font-sans select-none touch-none"
        style={{
          height: "clamp(360px, 60vh, 650px)",
          background:
            "linear-gradient(135deg, #0a0a12 0%, #12121f 50%, #0d1a2d 100%)",
          cursor: drag ? "grabbing" : page ? "default" : "grab",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.7s",
        }}
      >
        {/* Background */}
        <NebulaLayer time={time} />
        <StarsLayer
          time={time}
          offX={off.x}
          offY={off.y}
          stars={staticStars}
          hidden={!!page}
        />
        <ParticlesLayer
          time={time}
          offX={off.x}
          offY={off.y}
          particles={particles}
          hidden={!!page}
        />

        {/* Shooting star */}
        {star && (
          <div
            className="pointer-events-none absolute h-[2px] w-[80px] animate-shoot"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              background:
                "linear-gradient(90deg, transparent, white 40%, white 60%, transparent)",
              transform: `rotate(${star.a}deg)`,
            }}
          />
        )}

        {/* Cursor trail */}
        {!page && <CursorTrailLayer trail={trail} />}

        {/* Main scene */}
        <div
          className="absolute inset-0"
          style={{
            transition: warping
              ? "transform 0.8s cubic-bezier(0.4,0,0.2,1), opacity 0.8s ease"
              : zoomOut
              ? "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease"
              : "transform 0.5s ease, opacity 0.5s ease",
            transform: warping
              ? "scale(15)"
              : page && !zoomOut
              ? "scale(15)"
              : "scale(1)",
            opacity: warping ? 0 : page && !zoomOut ? 0 : 1,
            transformOrigin,
          }}
        >
          {/* Flow lines */}
          <svg className="absolute inset-0 pointer-events-none opacity-25">
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M ${-50 + Math.sin(time + i) * 30} ${150 + i * 120} Q ${
                  200 + Math.cos(time * 0.7 + i) * 100
                } ${100 + Math.sin(time * 0.5 + i) * 80} ${
                  450 + Math.sin(time * 0.8 + i) * 50
                } ${200 + i * 100} T 900 ${250 + i * 80}`}
                stroke={`rgba(${100 + i * 40}, ${100 + i * 30}, 255, 0.15)`}
                strokeWidth={2}
                fill="none"
              />
            ))}
          </svg>

          {/* Profile */}
          <ProfileSection time={time} />

          {/* Constellations */}
          <svg className="absolute inset-0 z-[1] pointer-events-none">
            {conns.map((c, i) => {
              const a = ORBS[c[0]];
              const b = ORBS[c[1]];
              const h = hovered === a.id || hovered === b.id;
              const ax = a.x + Math.sin(time * 0.4 + a.d) * 6 * 0.3;
              const ay = a.y + Math.cos(time * 0.3 + a.d) * 8 * 0.3;
              const bx = b.x + Math.sin(time * 0.4 + b.d) * 6 * 0.3;
              const by = b.y + Math.cos(time * 0.3 + b.d) * 8 * 0.3;

              return (
                <line
                  key={i}
                  x1={`${ax}%`}
                  y1={`${ay}%`}
                  x2={`${bx}%`}
                  y2={`${by}%`}
                  stroke={
                    h ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"
                  }
                  strokeWidth={h ? 1.5 : 1}
                  strokeDasharray={h ? "0" : "5,5"}
                  style={{ transition: "all 0.3s" }}
                />
              );
            })}
          </svg>

          {/* Orbs */}
          <OrbsLayer
            time={time}
            hovered={hovered}
            setHovered={setHovered}
            drag={drag}
            mPos={mPos}
            onClickOrb={handleOrbClick}
          />

          {/* HUD (code snippets, hint, corners) */}
          <HUDOverlay time={time} />
        </div>

        {/* Warp */}
        <WarpOverlay
          warping={warping}
          currentOrb={curOrb}
          warpLines={warpLines}
        />

        {/* Page overlay */}
        <PageOverlay
          page={page as any}
          time={time}
          currentOrb={curOrb}
          particles={particles}
          pageShow={pageShow}
          zoomOut={zoomOut}
          onBack={handleBack}
        />
      </div>
    </div>
  );
}
