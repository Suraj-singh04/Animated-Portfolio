"use client";

import InfiniteMenu from "../InfiniteMenu";
import { useRouter } from "next/navigation";
import { textToTexture } from "@/lib/textToTexture";

const menu = [
  { label: "ABOUT", path: "/about" },
  { label: "WORK", path: "/work" },
  { label: "SKILLS", path: "/skills" },
  { label: "CONTACT", path: "/contact" },
  { label: "BLOG", path: "/blog" },
];

export default function MobileInfiniteMenu() {
  const router = useRouter();

  return (
    <InfiniteMenu
      items={menu.map((m) => textToTexture(m.label))}
      onSelect={(_, index) => router.push(menu[index].path)}
      className="h-[100dvh] w-full bg-black"
    />
  );
}
