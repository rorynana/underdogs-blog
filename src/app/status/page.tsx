import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status — The Underdogs",
  description: "실시간 시스템 운영 현황",
};

const SYSTEMS = [
  {
    name: "ONE STOCK",
    desc: "이카운트 ERP + MCP 생산 인텔리전스",
    status: "OPERATIONAL" as const,
    uptime: "99.2%",
    lastSync: "2h ago",
    color: "#5B8CFF",
    link: "/ai-systems/onestock-ai-production-intelligence",
  },
  {
    name: "SIGNAL",
    desc: "49채널 6개국 마케팅 인텔리전스 대시보드",
    status: "OPERATIONAL" as const,
    uptime: "98.7%",
    lastSync: "30m ago",
    color: "#8B5CF6",
    link: "/ai-systems/marketing-intelligence-dashboard",
  },
  {
    name: "TUBESCOUT",
    desc: "유튜브 채널 스코어링 크롬 확장",
    status: "OPERATIONAL" as const,
    uptime: "100%",
    lastSync: "1d ago",
    color: "#06B6D4",
    link: "/ai-systems/tubescout-youtube-creator-scoring",
  },
  {
    name: "OY MONITOR",
    desc: "올리브영 경쟁사 모니터링 자동화",
    status: "OPERATIONAL" as const,
    uptime: "97.4%",
    lastSync: "6h ago",
    color: "#34D399",
    link: "/ai-systems/market-monitoring-automation",
  },
];

const STATUS_COLOR = {
  OPERATIONAL: "#34D399",
  DEGRADED:    "#F59E0B",
  DOWN:        "#EF4444",
} as const;

export default function StatusPage() {
  const allOk = SYSTEMS.every((s) => s.status === "OPERATIONAL");

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
      {/* Header */}
      <div className="mb-10">
        <span className="section-label">System Status</span>
        <div
          className="mt-4 flex items-center gap-3 rounded-lg border px-4 py-3 font-mono text-sm"
          style={{
            borderColor: (allOk ? "#34D399" : "#F59E0B") + "33",
            background:  allOk ? "rgba(52,211,153,0.05)" : "rgba(245,158,11,0.05)",
            color:       allOk ? "#34D399" : "#F59E0B",
          }}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ background: allOk ? "#34D399" : "#F59E0B" }}
          />
          {allOk ? "ALL SYSTEMS OPERATIONAL" : "SOME SYSTEMS DEGRADED"}
        </div>
      </div>

      {/* Systems */}
      <div className="space-y-4">
        {SYSTEMS.map((sys) => {
          const sc = STATUS_COLOR[sys.status];
          return (
            <Link
              key={sys.name}
              href={sys.link}
              className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-surface/30 p-5 transition-all hover:border-white/20 hover:bg-surface/50"
            >
              {/* 상단 호버 라인 */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${sys.color}, transparent)` }}
              />

              <div className="flex items-center gap-4">
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: sc, boxShadow: `0 0 8px ${sc}` }}
                />
                <div>
                  <p className="font-mono text-sm font-bold tracking-wider" style={{ color: sys.color }}>
                    {sys.name}
                  </p>
                  <p className="mt-0.5 text-xs text-secondary">{sys.desc}</p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-5 text-right">
                <div className="hidden sm:block">
                  <p className="font-mono text-[10px] tracking-wider text-white/30">UPTIME</p>
                  <p className="font-mono text-sm font-bold text-white/70">{sys.uptime}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-wider text-white/30">LAST SYNC</p>
                  <p className="font-mono text-xs text-white/50">{sys.lastSync}</p>
                </div>
                <span
                  className="rounded border px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.15em]"
                  style={{ borderColor: sc + "55", color: sc }}
                >
                  {sys.status}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-10 text-center font-mono text-xs text-white/20">
        — 실제 운영 데이터 기반. 수동으로 업데이트됩니다. —
      </p>

      <div className="mt-8 text-center">
        <Link
          href="/about"
          className="font-mono text-xs tracking-wider text-white/30 transition-colors hover:text-accent"
        >
          ← BACK TO ABOUT
        </Link>
      </div>
    </div>
  );
}
