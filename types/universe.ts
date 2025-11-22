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
