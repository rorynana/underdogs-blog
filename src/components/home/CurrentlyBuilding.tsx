"use client";

const BUILDING = {
  name: "Blog v2",
  desc: "검색, 이스터에그, 시스템 스테이터스 구현 중",
  status: "WIP" as "WIP" | "TESTING" | "SHIPPED",
  since: "2026-03",
};

const STATUS_COLOR = {
  WIP:     "#F59E0B",
  TESTING: "#06B6D4",
  SHIPPED: "#34D399",
};

export default function CurrentlyBuilding() {
  const color = STATUS_COLOR[BUILDING.status];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        className="flex items-center gap-3 rounded-lg border border-white/5 px-4 py-2.5 font-mono text-xs sm:text-[13px]"
        style={{ background: "rgba(91,140,255,0.03)" }}
      >
        <span className="text-white/25 shrink-0">{">"}</span>
        <span className="text-white/35 shrink-0">BUILDING:</span>
        <span className="font-bold shrink-0" style={{ color }}>
          {BUILDING.name}
        </span>
        <span className="text-white/20 hidden sm:inline">—</span>
        <span className="text-white/35 truncate hidden sm:inline">{BUILDING.desc}</span>
        <span
          className="ml-auto shrink-0 rounded border px-1.5 py-0.5 text-[9px] tracking-[0.15em]"
          style={{ borderColor: color + "55", color }}
        >
          {BUILDING.status}
        </span>
        <span
          className="inline-block h-[10px] w-[5px] shrink-0"
          style={{ background: "#5B8CFF", animation: "blink 1s step-end infinite" }}
        />
      </div>
    </div>
  );
}
