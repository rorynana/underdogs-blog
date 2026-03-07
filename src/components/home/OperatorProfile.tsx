"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SPECS = [
  { label: "Role", value: "AI Marketing Operator" },
  { label: "Focus", value: "Systems Design & Automation" },
  { label: "Stack", value: "Python / Data / AI / Automation" },
  { label: "Mission", value: "Replace repetition with intelligence" },
];

export default function OperatorProfile() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24">
      <div className="gradient-line mb-16" />

      <div className="animate-on-scroll overflow-hidden rounded-2xl border border-border bg-surface/30 p-8 sm:p-12">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
              About
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Operator Profile
            </h2>
            <p className="mt-6 leading-relaxed text-secondary">
              AI 기반 마케팅 시스템을 설계하고 구축합니다.
              감이 아닌 데이터, 반복이 아닌 자동화,
              시스템으로 확장 가능한 마케팅을 만듭니다.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent transition-all hover:gap-3"
            >
              <span>Full Profile</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="space-y-6">
            {SPECS.map((spec, i) => (
              <div key={spec.label} className={`animate-on-scroll stagger-${i + 1}`}>
                <p className="font-mono text-xs tracking-wider text-accent/60 uppercase">
                  {spec.label}
                </p>
                <p className="mt-1 text-lg font-medium">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
