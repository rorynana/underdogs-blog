"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface CategoryData {
  label: string;
  abbr: string;
  href: string;
  description: string;
  count: number;
}

export default function BrowseByCategory({ categories }: { categories: CategoryData[] }) {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <div className="gradient-line mb-8 sm:mb-16" />

      <div className="animate-on-scroll">
        <span className="section-label">Browse</span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Categories</h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {categories.map((cat, i) => {
          const glowColor = i === 0 ? '#8B5CF6' : i === 1 ? '#5B8CFF' : '#06B6D4';
          const neonCard = cat.href.includes('ai-systems') ? 'neon-card-ai' : cat.href.includes('insights') ? 'neon-card-insights' : 'neon-card-marketing';
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className={`animate-on-scroll stagger-${i + 1} ${neonCard} group relative overflow-hidden rounded-2xl border bg-surface/30 p-7 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-4xl font-bold text-white/10 transition-colors" style={{}} >
                  {String(cat.count).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs tracking-wider" style={{color: glowColor + '99'}}>
                  {cat.abbr}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-white">
                {cat.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {cat.description}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full" style={{background: glowColor}} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
