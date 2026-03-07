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
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      <div className="gradient-line mb-16" />

      <div className="animate-on-scroll">
        <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
          Browse
        </p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Categories</h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.href}
            href={cat.href}
            className={`animate-on-scroll stagger-${i + 1} group relative overflow-hidden rounded-2xl border border-border bg-surface/30 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30`}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-4xl font-bold text-white/10 transition-colors group-hover:text-accent/20">
                {String(cat.count).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs tracking-wider text-accent/60">
                {cat.abbr}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold transition-colors group-hover:text-accent">
              {cat.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {cat.description}
            </p>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}
