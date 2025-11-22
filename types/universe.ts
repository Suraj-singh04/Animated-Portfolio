export type OrbId = "about" | "work" | "skills" | "contact" | "blog";

export interface Orb {
  id: OrbId;
  label: string;
  x: number;
  y: number;
  size: number;
  c1: string;
  c2: string;
  d: number;
  mn: number;
}

export interface PageContent {
  t: string;
  p: string;
  items: string[];
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface TrailPoint extends Vec2 {
  id: number;
}

export interface Star {
  x: number;
  y: number;
  a: number;
}

export interface StaticStar {
  id: number;
  x: number;
  y: number;
  s: number;
  tw: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  s: number;
  sp: number;
}

export interface WarpLine {
  id: number;
  angle: number;
  length: number;
  offset: number;
}
