"use client";

import { useParams } from "next/navigation";
import About from "@/components/routes/About";
import Work from "@/components/routes/Work";
import Skills from "@/components/routes/Skills";
import Contact from "@/components/routes/Contact";
import Blog from "@/components/routes/Blog";

const MAP: Record<string, JSX.Element> = {
  about: <About />,
  work: <Work />,
  skills: <Skills />,
  contact: <Contact />,
  blog: <Blog />,
};

export default function UniverseSectionPage() {
  const { section } = useParams();
  const Component = MAP[section];

  return (
    Component ?? (
      <div className="text-white text-center py-20 text-xl">
        404 — Page not found
      </div>
    )
  );
}
