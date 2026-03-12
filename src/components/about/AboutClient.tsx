"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import NewsletterCTA from "@/components/post/NewsletterCTA";

// ── Pixel sizes ─────────────────────────────────────────────────────────────
const P = 10;        // Hero 오퍼레이터용
const P_AGENT = 10;  // 에이전트 스테이지 전용 (도트아트 사이즈)

// ── PixelOperator — Hero 아바타 (6×10, P=10) ────────────────────────────────
const OPERATOR_ART: string[] = [
  "hhhhhh", // 0 머리
  "hssssh", // 1 얼굴
  "heeeeh", // 2 눈
  "hssssh", // 3 얼굴
  " cccc ", // 4 어깨
  "ccbccc", // 5 훈장
  " cccc ", // 6 허리
  "cc  cc", // 7 다리
  "cc  cc", // 8 다리
  "pp  pp", // 9 발
];
const OPERATOR_COLORS: Record<string, string> = {
  h: "#2C1810",
  s: "#FBBF24",
  e: "#111827",
  c: "#5B8CFF",
  b: "#8B5CF6",
  p: "#374151",
};

// ── 에이전트 픽셀 아트 데이터 (10×16, P_AGENT=18) — Web3/SCI-FI EXTREME ──
const AGENT_ART_DATA: Record<
  string,
  { art: string[]; colors: Record<string, string> }
> = {
  // ── COMMANDER: 보라 사령관 — 크라운 3스파이크 + 망토 + 좌측 지휘스태프 ──
  COMMANDER: {
    art: [
      "f  g g g  ", // 0 스태프 + 크라운 3스파이크
      "f ghhhhhg ", // 1 스태프 + 크라운링 + 헬멧
      "f hhehehh ", // 2 스태프 + 헬멧 + 두 눈
      "f hhhhhh  ", // 3 스태프 + 헬멧
      "f mcccccm ", // 4 스태프 + 골드 파울드론 + 흉갑
      "fgmcgccmg ", // 5 스태프글로우 + 넓은파울드론 + 금배지
      "f  ccccc  ", // 6 스태프 + 몸통
      "f  ccccc  ", // 7 스태프 + 몸통
      "   vcccv  ", // 8 다리 전환
      "   vv vv  ", // 9 다리
      "   vv vv  ", // A 다리
      "   vv vv  ", // B 다리
      "   gv vg  ", // C 금 부츠 트림
      "  gvvvvg  ", // D 부츠 넓게
      "          ", // E
      "          ", // F
    ],
    colors: {
      h: "#C4B5FD",
      e: "#EDE9FE",
      c: "#7C3AED",
      g: "#FFD700",
      f: "#E2E8F0",
      v: "#4C1D95",
      m: "#6D28D9",
    },
  },
  // ── BUILDER: 사이버 엔지니어 — 드론 + 오른쪽 거대 기계팔 + 파란 작업복 ──
  BUILDER: {
    art: [
      "   ddd    ", // 0 드론 프로펠러
      "  ddddd   ", // 1 드론 본체
      "  oooooo  ", // 2 노란 헬멧
      " ooooooo  ", // 3 헬멧
      " ooeoeo   ", // 4 헬멧 + 두 눈
      "  ssssss  ", // 5 얼굴/턱
      "  cccccct ", // 6 작업복 + 기계팔 시작(우)
      " tcccccttt", // 7 좌팔미니 + 바디 + 우기계팔 거대
      "tttcc cct ", // 8 양팔 확장 + 다리
      "ttt c c t ", // 9 양팔끝 + 다리
      "    c c   ", // A 다리
      "    c c   ", // B 다리
      "    b b   ", // C 부츠
      "   bbb b  ", // D 부츠 바닥
      "          ", // E
      "          ", // F
    ],
    colors: {
      o: "#FCD34D",
      s: "#FBBF24",
      e: "#111827",
      c: "#1D4ED8",
      t: "#F59E0B",
      d: "#60A5FA",
      b: "#1E3A5F",
    },
  },
  // ── ANALYST: 다크 후드 해커 — 과장된 후드 + 넓은 바이저 + 거대 데이터패드 ──
  ANALYST: {
    art: [
      " hhhhhhhh ", // 0 후드 상단
      " hhhhhhhh ", // 1 후드
      " hhhhhhhh ", // 2 후드 넓게
      " hggggghh ", // 3 바이저 시작
      " hgeeeghh ", // 4 바이저 + 눈
      "rrhgeeeghh", // 5 레이저빔 좌 + 바이저 + 눈 (10자)
      " hggggghh ", // 6 바이저 하단
      " hhhhhhh  ", // 7 턱/목
      " ccccccpp ", // 8 바디 + 데이터패드
      " ccccpppp ", // 9 바디 + 거대 패드
      "  cc pppp ", // A 다리 + 패드
      "  cc pppp ", // B 다리 + 패드
      "  cc      ", // C 다리
      "  cccc    ", // D 발
      "          ", // E
      "          ", // F
    ],
    colors: {
      h: "#0F172A",
      g: "#06B6D4",
      e: "#ECFEFF",
      r: "#67E8F9",
      c: "#0E7490",
      p: "#BAE6FD",
    },
  },
  // ── CONNECTOR: 네트워크 마법사 — 안테나 3개 + 케이블 사방 + 가장 알록달록 ──
  CONNECTOR: {
    art: [
      " a  n  a  ", // 0 핑크-초록-핑크 안테나 끝
      " a  n  a  ", // 1 안테나 줄기
      "aaa nna   ", // 2 안테나 베이스 + 머리 시작
      "khhhhhhhkk", // 3 케이블 + 머리(넓게) + 우측 케이블
      " heeeehh  ", // 4 머리 + 4개 눈
      " hhhhhhh  ", // 5 머리 하단
      "kkccccckkk", // 6 케이블 사방 확장 + 바디
      "kkcccccck ", // 7 케이블 + 바디
      "  cc  cc  ", // 8 다리 (분리)
      "  cc  cc  ", // 9 다리
      "  cc  cc  ", // A 다리
      "  qq  qq  ", // B 부츠
      "  qq  qq  ", // C 부츠
      " qqqqqqq  ", // D 부츠 바닥
      "          ", // E
      "          ", // F
    ],
    colors: {
      a: "#F472B6",
      n: "#4ADE80",
      h: "#86EFAC",
      e: "#F0FDF4",
      c: "#16A34A",
      k: "#FCA5A5",
      q: "#14532D",
    },
  },
};

// ── 공용 픽셀 렌더러 ───────────────────────────────────────────────────────
function PixelFigure({
  art,
  colors,
  glowColor,
  animClass,
  pixelSize = P,
}: {
  art: string[];
  colors: Record<string, string>;
  glowColor: string;
  animClass: string;
  pixelSize?: number;
}) {
  const cols = art[0].length;
  const rows = art.length;
  const pixels: React.ReactElement[] = [];

  art.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      const fill = colors[ch];
      if (!fill) return;
      pixels.push(
        <rect
          key={`${x}-${y}`}
          x={x * pixelSize}
          y={y * pixelSize}
          width={pixelSize}
          height={pixelSize}
          fill={fill}
        />
      );
    });
  });

  return (
    <svg
      width={cols * pixelSize}
      height={rows * pixelSize}
      className={animClass}
      style={{
        imageRendering: "pixelated",
        filter: `drop-shadow(0 0 5px ${glowColor}99) drop-shadow(0 0 18px ${glowColor}55)`,
      }}
    >
      {pixels}
    </svg>
  );
}

// ── 에이전트 데이터 ────────────────────────────────────────────────────────
const AGENTS = [
  {
    codename: "COMMANDER",
    role: "팀 리더",
    desc: "워크플로우 전체를 지휘한다. 에이전트들의 순서를 정하고, 체크포인트를 관리한다.",
    color: "#8B5CF6",
    colorRgb: "139,92,246",
    animClass: "agent-float-1",
    stats: [
      { key: "PWR", label: "지휘력",   value: 95 },
      { key: "SPD", label: "실행속도", value: 55 },
      { key: "INT", label: "지능",     value: 88 },
      { key: "NET", label: "연결망",   value: 50 },
      { key: "STA", label: "지속성",   value: 90 },
    ],
  },
  {
    codename: "BUILDER",
    role: "자동화 제작",
    desc: "파이프라인을 만들고, 반복 작업을 시스템으로 바꾼다. 설계서가 있으면 뭐든 만든다.",
    color: "#5B8CFF",
    colorRgb: "91,140,255",
    animClass: "agent-float-2",
    stats: [
      { key: "PWR", label: "지휘력",   value: 72 },
      { key: "SPD", label: "실행속도", value: 99 },
      { key: "INT", label: "지능",     value: 60 },
      { key: "NET", label: "연결망",   value: 62 },
      { key: "STA", label: "지속성",   value: 80 },
    ],
  },
  {
    codename: "ANALYST",
    role: "추론 · 분석",
    desc: "데이터를 읽고, 패턴을 찾고, 다음 행동을 제안한다. 판단의 첫 번째 단계.",
    color: "#06B6D4",
    colorRgb: "6,182,212",
    animClass: "agent-float-3",
    stats: [
      { key: "PWR", label: "지휘력",   value: 48 },
      { key: "SPD", label: "실행속도", value: 70 },
      { key: "INT", label: "지능",     value: 99 },
      { key: "NET", label: "연결망",   value: 55 },
      { key: "STA", label: "지속성",   value: 78 },
    ],
  },
  {
    codename: "CONNECTOR",
    role: "시스템 연결",
    desc: "MCP, API, 외부 서비스를 연결한다. 에이전트가 바깥 세계와 소통하는 방식.",
    color: "#4ADE80",
    colorRgb: "74,222,128",
    animClass: "agent-float-4",
    stats: [
      { key: "PWR", label: "지휘력",   value: 60 },
      { key: "SPD", label: "실행속도", value: 88 },
      { key: "INT", label: "지능",     value: 65 },
      { key: "NET", label: "연결망",   value: 99 },
      { key: "STA", label: "지속성",   value: 72 },
    ],
  },
];

// ── 시스템 상태 데이터 ─────────────────────────────────────────────────────
const STATUS_SYSTEMS = [
  { name: "ONE STOCK",  desc: "이카운트 ERP + MCP 생산 인텔리전스",     status: "OPERATIONAL" as const, uptime: "99.2%", lastSync: "2h ago",  color: "#5B8CFF", link: "/ai-systems/onestock-ai-production-intelligence" },
  { name: "SIGNAL",     desc: "49채널 6개국 마케팅 인텔리전스 대시보드", status: "OPERATIONAL" as const, uptime: "98.7%", lastSync: "30m ago", color: "#8B5CF6", link: "/ai-systems/marketing-intelligence-dashboard" },
  { name: "TUBESCOUT",  desc: "유튜브 채널 스코어링 크롬 확장",          status: "OPERATIONAL" as const, uptime: "100%",  lastSync: "1d ago",  color: "#06B6D4", link: "/ai-systems/tubescout-youtube-creator-scoring" },
  { name: "OY MONITOR", desc: "올리브영 경쟁사 모니터링 자동화",         status: "OPERATIONAL" as const, uptime: "97.4%", lastSync: "6h ago",  color: "#34D399", link: "/ai-systems/market-monitoring-automation" },
];
const SYS_STATUS_COLOR = { OPERATIONAL: "#34D399", DEGRADED: "#F59E0B", DOWN: "#EF4444" } as const;

// ── What I Believe ─────────────────────────────────────────────────────────
const BELIEFS = [
  {
    title: "비효율을 발견하면, 먼저 정의한다",
    desc: "고치기 전에 왜 반복되는지를 이해하려 한다. 그 구조를 바꾸는 게 더 오래간다.",
  },
  {
    title: "결과보다 시스템을 개선한다",
    desc: "한 번 잘 되는 것보다, 반복 가능한 구조를 만드는 게 더 가치있다고 생각한다.",
  },
  {
    title: "코드보다 판단력이 오래간다",
    desc: "AI가 코드를 짤 수 있다면, 남는 건 뭘 만들지 결정하는 역량이다.",
  },
];

const TERMINAL_LINES = [
  { label: "CODENAME", value: "JSY", color: "#5B8CFF" },
  { label: "ROLE    ", value: "Marketing Operator", color: "#FFFFFF" },
  { label: "STATUS  ", value: "● ACTIVE", color: "#4ADE80" },
  { label: "SYSTEMS ", value: "4 deployed", color: "#8A8F98" },
  { label: "STACK   ", value: "AI-Augmented", color: "#8A8F98" },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function AboutClient() {
  const [showGithubMsg, setShowGithubMsg] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setMobileActiveIndex((prev) => (prev + 1) % AGENTS.length);
    }, 1500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile]);

  const handleGithubClick = () => {
    setShowGithubMsg(true);
    setTimeout(() => setShowGithubMsg(false), 3000);
  };

  const activeAgent = isMobile
    ? AGENTS[mobileActiveIndex]
    : (AGENTS.find((a) => a.codename === hoveredAgent) ?? null);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">

      {/* ── Hero — 터미널 OPERATOR CARD ─────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-6 sm:p-10">
        <div className="cyber-corner cyber-corner-tl" style={{ borderColor: "#5B8CFF" }} />
        <div className="cyber-corner cyber-corner-tr" style={{ borderColor: "#5B8CFF" }} />
        <div className="cyber-corner cyber-corner-bl" style={{ borderColor: "#5B8CFF" }} />
        <div className="cyber-corner cyber-corner-br" style={{ borderColor: "#5B8CFF" }} />

        {/* 터미널 상단 바 */}
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs tracking-widest text-white/40">
            OPERATOR.PROFILE
          </span>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-12">
          {/* 픽셀 오퍼레이터 */}
          <div className="flex-shrink-0">
            <PixelFigure
              art={OPERATOR_ART}
              colors={OPERATOR_COLORS}
              glowColor="#5B8CFF"
              animClass="pixel-cat"
            />
          </div>

          {/* 터미널 라인 */}
          <div className="space-y-2 font-mono text-sm">
            {TERMINAL_LINES.map((line, i) => (
              <p key={i} className="flex gap-2">
                <span className="text-white/30">&gt;</span>
                <span className="text-white/50">{line.label}</span>
                <span className="text-white/30">:</span>
                <span style={{ color: line.color }}>{line.value}</span>
              </p>
            ))}
          </div>
        </div>

        {/* 구분선 + 줄글 소개 */}
        <div className="mt-8 border-t border-white/[0.07] pt-8">
          <div className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold">장성윤</h2>
            <span className="text-sm text-secondary">AI Driven Marketing Operator</span>
          </div>
          <div className="mt-5 max-w-2xl space-y-3 leading-relaxed text-secondary">
            <p>마케팅 실무에서 자연스럽게 시스템을 만들게 됐습니다.</p>
            <p>
              반복되는 작업이 보이면 자동화를 시도하고,
              흩어진 데이터가 보이면 한 화면에 모으고,
              감으로 처리하던 의사결정이 보이면 구조를 만들었습니다.
            </p>
            <p>
              코드를 직접 짜진 않습니다.
              무엇을 만들어야 하는지 정의하고, AI 에이전트들이 구현합니다.
              그 과정을 여기에 기록하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      <div className="gradient-line mt-12 mb-14" />

      {/* ── My Agent Team — HANGAR-7 SCI-FI Stage ───────────────────── */}
      <section className="mt-16">
        <div className="mb-6">
          <span className="section-label">My Agent Team</span>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl"
          style={{
            border: "1px solid rgba(139,92,246,0.3)",
            background: "#060810",
          }}
        >
          {/* ── 배경 레이어 1: 서킷 그리드 (가시적으로) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: [
                "repeating-linear-gradient(0deg,  rgba(139,92,246,0.1) 0px, rgba(139,92,246,0.1) 1px, transparent 1px, transparent 32px)",
                "repeating-linear-gradient(90deg, rgba(139,92,246,0.1) 0px, rgba(139,92,246,0.1) 1px, transparent 1px, transparent 32px)",
              ].join(","),
            }}
          />
          {/* ── 배경 레이어 2: 상단 어둠 */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 32%)",
            }}
          />
          {/* ── 배경 레이어 3: 바닥 전체 조명 (보라) */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 120%, rgba(120,60,220,0.35) 0%, transparent 58%)",
            }}
          />
          {/* ── 배경 레이어 4: 캐릭터별 컬럼 스포트라이트 — 각자 색상 */}
          {AGENTS.map((agent, i) => (
            <div
              key={agent.codename}
              className="pointer-events-none absolute inset-y-0"
              style={{
                left: `${i * 25}%`,
                width: "25%",
                background: `linear-gradient(180deg, ${agent.color}20 0%, ${agent.color}0A 35%, transparent 65%)`,
                clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              }}
            />
          ))}
          {/* ── 배경 레이어 5: 수평 패널 시임 */}
          {[33, 66].map((pct) => (
            <div
              key={pct}
              className="pointer-events-none absolute inset-x-0"
              style={{
                top: `${pct}%`,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          ))}
          {/* ── 배경 레이어 6: 바닥 해저드 스트라이프 */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: 6,
              backgroundImage:
                "repeating-linear-gradient(-45deg, rgba(255,200,0,0.28) 0px, rgba(255,200,0,0.28) 3px, transparent 3px, transparent 9px)",
            }}
          />

          {/* cyber 코너 */}
          <div className="cyber-corner cyber-corner-tl" style={{ borderColor: "#8B5CF6" }} />
          <div className="cyber-corner cyber-corner-tr" style={{ borderColor: "#8B5CF6" }} />
          <div className="cyber-corner cyber-corner-bl" style={{ borderColor: "#8B5CF6" }} />
          <div className="cyber-corner cyber-corner-br" style={{ borderColor: "#8B5CF6" }} />

          {/* ── 헤더 바 — HANGAR-7 */}
          <div className="relative flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="warning-blink h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
              <span className="font-mono text-xs tracking-[0.3em] text-white/35">
                HANGAR-7 // AGENT DEPLOYMENT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-white/20">SYS:ONLINE</span>
              <div
                className="warning-blink h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                style={{ animationDelay: "1.25s" }}
              />
            </div>
          </div>

          {/* ── 4열 그리드 */}
          <div
            className="relative grid grid-cols-2 sm:grid-cols-4"
            style={{ minHeight: 300 }}
          >
            {AGENTS.map((agent, index) => {
              const artData = AGENT_ART_DATA[agent.codename];
              const isHovered = isMobile
                ? mobileActiveIndex === index
                : hoveredAgent === agent.codename;
              const isAnyHovered = isMobile ? true : hoveredAgent !== null;

              return (
                <div
                  key={agent.codename}
                  className="relative flex cursor-pointer flex-col items-center justify-end overflow-hidden pb-6 pt-10"
                  role="button"
                  tabIndex={0}
                  style={{
                    borderRight:
                      index % 2 === 0
                        ? "1px solid rgba(255,255,255,0.06)"
                        : undefined,
                    borderBottom:
                      index < 2
                        ? "1px solid rgba(255,255,255,0.06)"
                        : undefined,
                    background: isHovered
                      ? `rgba(${agent.colorRgb},0.12)`
                      : "transparent",
                    filter:
                      isAnyHovered && !isHovered
                        ? "brightness(0.3) grayscale(0.65)"
                        : "brightness(1)",
                    transition: "background 0.25s ease, filter 0.25s ease",
                  }}
                  onMouseEnter={() => setHoveredAgent(agent.codename)}
                  onMouseLeave={() => setHoveredAgent(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setHoveredAgent(agent.codename);
                  }}
                >
                  {/* 컬럼 상단 빛 빔 (트라페조이드 스포트라이트) */}
                  <div
                    className="pointer-events-none absolute top-0 left-0 right-0"
                    style={{
                      height: isHovered ? "65%" : "45%",
                      background: `linear-gradient(180deg, ${agent.color}${isHovered ? "40" : "22"} 0%, transparent 100%)`,
                      clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
                      transition: "height 0.35s ease, background 0.35s ease",
                    }}
                  />
                  {/* 중앙 수직 세선 빔 */}
                  <div
                    className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: 1,
                      height: isHovered ? 160 : 100,
                      background: `linear-gradient(180deg, ${agent.color} 0%, transparent 100%)`,
                      opacity: isHovered ? 0.9 : 0.5,
                      transition: "height 0.35s ease, opacity 0.35s ease",
                    }}
                  />

                  {/* 스캔라인 sweep */}
                  {isHovered && (
                    <div
                      className="scan-sweep pointer-events-none absolute left-0 right-0"
                      style={{
                        background: `rgba(${agent.colorRgb},0.4)`,
                        zIndex: 10,
                      }}
                    />
                  )}

                  {/* 캐릭터 */}
                  <div
                    style={{
                      transform: isHovered
                        ? "scale(1.14) translateY(-12px)"
                        : "scale(1) translateY(0)",
                      transition: "transform 0.25s ease",
                      filter: isHovered
                        ? `drop-shadow(0 0 24px ${agent.color}AA) drop-shadow(0 0 60px ${agent.color}44)`
                        : `drop-shadow(0 0 6px ${agent.color}44)`,
                    }}
                  >
                    <PixelFigure
                      art={artData.art}
                      colors={artData.colors}
                      glowColor={agent.color}
                      animClass={agent.animClass}
                      pixelSize={P_AGENT}
                    />
                  </div>

                  {/* 홀로그램 발판 */}
                  <div style={{ position: "relative", width: 100, height: 16, marginTop: 8 }}>
                    {/* 외부 펄스 링 */}
                    <div
                      className="holo-ring-1"
                      style={{
                        position: "absolute",
                        inset: -6,
                        border: `1px solid ${agent.color}44`,
                        borderRadius: "50%",
                      }}
                    />
                    {/* 내부 링 */}
                    <div
                      className="holo-ring-2"
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: `1px solid ${agent.color}77`,
                        borderRadius: "50%",
                      }}
                    />
                    {/* 내부 glow */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 2,
                        background: `radial-gradient(ellipse, ${agent.color}${isHovered ? "CC" : "66"} 0%, transparent 70%)`,
                        borderRadius: "50%",
                        transition: "background 0.25s ease",
                      }}
                    />
                  </div>

                  {/* 코드네임 */}
                  <p
                    className="mt-4 font-mono text-sm font-black tracking-[0.22em]"
                    style={{
                      color: agent.color,
                      textShadow: isHovered
                        ? `0 0 18px ${agent.color}CC, 0 0 40px ${agent.color}66`
                        : `0 0 8px ${agent.color}55`,
                      transition: "text-shadow 0.25s ease",
                    }}
                  >
                    {agent.codename}
                  </p>
                  {/* 역할 */}
                  <p className="mt-1.5 font-mono text-[11px] tracking-wider text-white/45">
                    {agent.role}
                  </p>
                </div>
              );
            })}
          </div>

          {/* sm 이상 세로 열 구분선 */}
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {[25, 50, 75].map((pct) => (
              <div
                key={pct}
                className="absolute inset-y-0"
                style={{
                  left: `${pct}%`,
                  width: 1,
                  background: "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          {/* ── Zone B: AGENT STAT PANEL */}
          <div
            className="relative"
            style={{
              borderTop: activeAgent
                ? `1px solid rgba(${activeAgent.colorRgb},0.3)`
                : "1px solid rgba(139,92,246,0.18)",
              background: activeAgent
                ? `rgba(${activeAgent.colorRgb},0.06)`
                : "transparent",
              transition: "border-color 0.25s ease, background 0.25s ease",
            }}
          >
            {/* 상단 빛 라인 */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background: activeAgent
                  ? `linear-gradient(90deg, transparent, ${activeAgent.color}88, transparent)`
                  : "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)",
                transition: "background 0.25s ease",
              }}
            />

            {activeAgent ? (
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
                {/* 왼쪽: 에이전트 정보 */}
                <div className="flex flex-col justify-center">
                  <p
                    className="font-mono text-xl font-black tracking-[0.18em]"
                    style={{
                      color: activeAgent.color,
                      textShadow: `0 0 22px ${activeAgent.color}AA`,
                    }}
                  >
                    {activeAgent.codename}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-[0.2em] text-white/45">
                    {activeAgent.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-secondary/80">
                    {activeAgent.desc}
                  </p>
                </div>

                {/* 오른쪽: 스탯 바 */}
                <div className="space-y-3">
                  {activeAgent.stats.map((stat, si) => {
                    const isMax = stat.value >= 95;
                    return (
                      <div key={`${activeAgent.codename}-${stat.key}`}>
                        {/* 라벨 + 수치 */}
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-8 font-mono text-xs font-bold"
                              style={{ color: activeAgent.color }}
                            >
                              {stat.key}
                            </span>
                            <span className="font-mono text-[10px] tracking-wide text-white/35">
                              {stat.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {isMax && (
                              <span
                                className="font-mono text-[9px] font-black tracking-[0.15em]"
                                style={{
                                  color: activeAgent.color,
                                  textShadow: `0 0 8px ${activeAgent.color}`,
                                }}
                              >
                                MAX
                              </span>
                            )}
                            <span className="font-mono text-xs tabular-nums text-white/55">
                              {stat.value}
                            </span>
                          </div>
                        </div>

                        {/* 바 트랙 */}
                        <div
                          style={{
                            height: 6,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          {/* 바 필 — scaleX 애니메이션 (key 변경 시 재시작) */}
                          <div
                            style={{
                              width: `${stat.value}%`,
                              height: "100%",
                              borderRadius: 3,
                              transformOrigin: "left center",
                              background: isMax
                                ? `linear-gradient(90deg, ${activeAgent.color}88, ${activeAgent.color}, rgba(255,255,255,0.6))`
                                : `linear-gradient(90deg, ${activeAgent.color}66, ${activeAgent.color})`,
                              boxShadow: isMax
                                ? `0 0 10px ${activeAgent.color}BB, 0 0 20px ${activeAgent.color}55`
                                : undefined,
                              animation: `statBarFill 0.45s ease-out ${si * 70}ms both`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              !isMobile && (
                <div className="flex min-h-[130px] items-center justify-center">
                  <p className="font-mono text-xs tracking-[0.4em] text-white/18">
                    ── SELECT AGENT TO VIEW STATS ──
                  </p>
                </div>
              )
            )}

            {/* 모바일 전용 점 인디케이터 */}
            {isMobile && (
              <div className="flex items-center justify-center gap-2 pb-4">
                {AGENTS.map((agent, i) => (
                  <button
                    key={agent.codename}
                    onClick={() => setMobileActiveIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: mobileActiveIndex === i ? 20 : 6,
                      background:
                        mobileActiveIndex === i
                          ? AGENTS[mobileActiveIndex].color
                          : "rgba(255,255,255,0.2)",
                      boxShadow:
                        mobileActiveIndex === i
                          ? `0 0 6px ${AGENTS[mobileActiveIndex].color}AA`
                          : "none",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── What I Believe ──────────────────────────────────────────── */}
      <section className="mt-16">
        <span className="section-label">What I Believe</span>
        <div className="mt-6 space-y-3">
          {BELIEFS.map((b, i) => (
            <div
              key={b.title}
              className="group relative overflow-hidden border border-border bg-surface/30 p-6 transition-all hover:border-accent/40 hover:bg-surface/50"
              style={{ borderLeft: "3px solid rgba(91,140,255,0.5)" }}
            >
              {/* 도트 패턴 배경 */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(91,140,255,0.15) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* hover 좌→우 그라디언트 */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(90deg, rgba(91,140,255,0.07) 0%, transparent 55%)" }}
              />
              {/* 번호 뱃지 */}
              <span className="absolute top-4 right-4 border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] text-white/25">
                [ 0{i + 1} ]
              </span>
              <p className="relative text-lg font-bold leading-snug">{b.title}</p>
              <p className="relative mt-3 text-sm leading-relaxed text-secondary">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── System Status 드롭다운 ────────────────────────────────────── */}
      <section className="mt-16">
        <div className="overflow-hidden rounded-xl border border-border bg-surface/30 transition-colors hover:border-green-500/20">
          {/* 트리거 버튼 */}
          <button
            onClick={() => setStatusOpen((p) => !p)}
            className="relative flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{ background: statusOpen ? "linear-gradient(90deg, transparent, #34D399, transparent)" : undefined }}
            />
            <div className="flex items-center gap-4">
              <div
                className="h-2 w-2 shrink-0 rounded-full animate-pulse"
                style={{ background: "#34D399", boxShadow: "0 0 6px #34D399" }}
              />
              <div>
                <p className="font-mono text-sm font-bold tracking-wider text-green-400">SYSTEM STATUS</p>
                <p className="mt-0.5 text-xs text-secondary">
                  {statusOpen ? "ALL SYSTEMS OPERATIONAL" : "4개 시스템 운영 현황 확인"}
                </p>
              </div>
            </div>
            <svg
              className="h-4 w-4 shrink-0 text-secondary/40 transition-transform duration-300"
              style={{ transform: statusOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* 드롭다운 패널 */}
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: statusOpen ? 400 : 0, opacity: statusOpen ? 1 : 0 }}
          >
            <div className="space-y-px border-t border-white/5 px-3 pb-3 pt-1">
              {STATUS_SYSTEMS.map((sys) => {
                const sc = SYS_STATUS_COLOR[sys.status];
                return (
                  <Link
                    key={sys.name}
                    href={sys.link}
                    className="group flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: sc }} />
                      <div>
                        <p className="font-mono text-xs font-bold tracking-wider" style={{ color: sys.color }}>
                          {sys.name}
                        </p>
                        <p className="text-[11px] text-secondary/60">{sys.desc}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-4 text-right">
                      <div className="hidden sm:block">
                        <p className="font-mono text-[10px] text-white/25">UPTIME</p>
                        <p className="font-mono text-xs font-bold text-white/55">{sys.uptime}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] text-white/25">SYNC</p>
                        <p className="font-mono text-[11px] text-white/40">{sys.lastSync}</p>
                      </div>
                      <span
                        className="rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-[0.15em]"
                        style={{ borderColor: sc + "55", color: sc }}
                      >
                        {sys.status}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────── */}
      <section className="mt-16">
        <span className="section-label">Contact</span>
        <p className="mt-3 text-sm text-secondary">
          프로젝트 협업, 시스템 구축 문의, 커피챗 모두 환영합니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {/* Email */}
          <a
            href="mailto:jsy1379@gmail.com"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 transition-all hover:border-accent/30 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold transition-colors group-hover:text-accent">Email</p>
              <p className="text-xs text-secondary">jsy1379@gmail.com</p>
            </div>
          </a>

          {/* 카카오톡 */}
          <a
            href="https://open.kakao.com/o/sXW8uvki"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 transition-all hover:border-[#FEE500]/30 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FEE500]/10">
              <svg className="h-5 w-5 text-[#FEE500]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.199.735-.72 2.666-.826 3.078-.13.506.186.499.39.363.16-.107 2.554-1.737 3.592-2.442.757.112 1.538.171 2.336.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold transition-colors group-hover:text-[#FEE500]">카카오톡 문의</p>
              <p className="text-xs text-secondary">오픈채팅으로 연락주세요</p>
            </div>
          </a>

          {/* GitHub — 준비중 */}
          <button
            onClick={handleGithubClick}
            className="group flex w-full items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 text-left transition-all hover:border-white/20 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
              <svg className="h-5 w-5 text-white/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div>
              {showGithubMsg ? (
                <p className="text-sm font-semibold text-yellow-400">준비중입니다</p>
              ) : (
                <p className="text-sm font-semibold text-white/50 transition-colors group-hover:text-white">
                  GitHub
                </p>
              )}
              <p className="text-xs text-secondary">rorynana</p>
            </div>
          </button>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────── */}
      <NewsletterCTA />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="mt-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
        <p className="text-lg font-bold">더 자세한 이야기가 궁금하다면</p>
        <p className="mt-2 text-sm text-secondary">
          각 시스템의 설계 과정, 기술적 결정, 실무 결과를 포스트로 정리했습니다.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/ai-systems"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent/80"
          >
            AI &amp; Systems 보기
          </Link>
          <Link
            href="/marketing"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-secondary transition-all hover:border-accent/30 hover:text-white"
          >
            Marketing 보기
          </Link>
          <Link
            href="/insights"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-secondary transition-all hover:border-accent/30 hover:text-white"
          >
            Insights 보기
          </Link>
        </div>
      </section>

      <div className="mt-12 text-center">
        <p className="text-xs text-secondary/50">
          이 블로그의 모든 포스트는 실제 업무에서 구축한 시스템을 기반으로 작성되었습니다.
        </p>
      </div>
    </div>
  );
}
