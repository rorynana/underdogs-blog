"use client";

import { useEffect, useState } from "react";

const CATEGORY_COLOR: Record<string, string> = {
  "ai-systems": "#5B8CFF",
  "marketing":  "#F59E0B",
  "insights":   "#34D399",
};

export default function ReadingProgress({ category }: { category: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const color = CATEGORY_COLOR[category] ?? "#5B8CFF";

  return (
    <div className="fixed top-16 left-0 z-[60] h-[2px] w-full bg-white/5">
      <div
        className="h-full transition-[width] duration-75"
        style={{ width: `${progress}%`, background: color, boxShadow: `0 0 8px ${color}88` }}
      />
    </div>
  );
}
