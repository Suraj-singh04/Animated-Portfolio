import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "John Doe – Cosmic Portfolio",
  description:
    "Interactive universe-themed portfolio built with Next.js & Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black flex items-center justify-center p-4 sm:p-8">
        {children}
      </body>
    </html>
  );
}
