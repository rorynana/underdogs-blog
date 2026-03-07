"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SPECS = [
  { label: "Role", value: "AI Marketing Operator", color: "#8B5CF6" },
  { label: "Focus", value: "Systems Design & Automation", color: "#5B8CFF" },
  { label: "Stack", value: "Python / Data / AI / Automation", color: "#06B6D4" },
  { label: "Mission", value: "Replace repetition with intelligence", color: "#8B5CF6" },
];

export default function OperatorProfile() {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-12 sm:py-24">
      <div className="gradient-line mb-8 sm:mb-16" />

      <div className="animate-on-scroll overflow-hidden rounded-2xl border border-border p-5 sm:p-12" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.05) 0%, rgba(18,20,26,0.3) 60%, rgba(6,182,212,0.03) 100%)'}}>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <span className="section-label">About</span>
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
                <p className="font-mono text-xs tracking-wider uppercase" style={{color: spec.color + '99'}}>
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
