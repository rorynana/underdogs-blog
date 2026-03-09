"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const SYSTEMS_STATUS = [
  { name: "ONE STOCK",  status: "OPERATIONAL", uptime: "99.2%" },
  { name: "SIGNAL",     status: "OPERATIONAL", uptime: "98.7%" },
  { name: "TUBESCOUT",  status: "OPERATIONAL", uptime: "100%"  },
  { name: "OY MONITOR", status: "OPERATIONAL", uptime: "97.4%" },
];

const PAGES: Record<string, string> = {
  "ai-systems": "/ai-systems",
  "ai":         "/ai-systems",
  "marketing":  "/marketing",
  "insights":   "/insights",
  "about":      "/about",
  "status":     "/status",
  "home":       "/",
};

type Line = { text: string; color?: string };

const BOOT_LINES: Line[] = [
  { text: "THE UNDERDOGS v1.0.0 — TERMINAL ACCESS", color: "#5B8CFF" },
  { text: "─────────────────────────────────────────────" },
  { text: "> ACCESS GRANTED", color: "#34D399" },
  { text: "> type 'help' for available commands", color: "#6B7280" },
  { text: "" },
];

function processCommand(
  cmd: string,
  router: ReturnType<typeof useRouter>
): { lines: Line[]; close?: boolean; clear?: boolean } {
  const parts = cmd.trim().split(/\s+/);
  const base = parts[0].toLowerCase();

  if (base === "help") {
    return {
      lines: [
        { text: "" },
        { text: "AVAILABLE COMMANDS:", color: "#5B8CFF" },
        { text: "  help              — 이 도움말" },
        { text: "  whoami            — 오퍼레이터 프로필" },
        { text: "  status            — 시스템 상태" },
        { text: "  ls                — 카테고리 목록" },
        { text: "  goto [page]       — 페이지 이동" },
        { text: "  clear             — 터미널 초기화" },
        { text: "  exit / q          — 종료" },
        { text: "" },
        { text: "  goto targets: ai-systems, marketing, insights, about, status, home", color: "#6B7280" },
        { text: "" },
      ],
    };
  }

  if (base === "whoami") {
    return {
      lines: [
        { text: "" },
        { text: "CODENAME  : JSY",                      color: "#5B8CFF" },
        { text: "ROLE      : AI Driven Marketing Operator" },
        { text: "STATUS    : ● ACTIVE",                 color: "#34D399" },
        { text: "SYSTEMS   : 4 deployed" },
        { text: "STACK     : AI-Augmented" },
        { text: "" },
      ],
    };
  }

  if (base === "status") {
    return {
      lines: [
        { text: "" },
        { text: "SYSTEM STATUS:", color: "#5B8CFF" },
        ...SYSTEMS_STATUS.map((s) => ({
          text: `  ${s.name.padEnd(12)} [${s.status}]  uptime: ${s.uptime}`,
          color: "#34D399",
        })),
        { text: "" },
      ],
    };
  }

  if (base === "goto") {
    const dest = parts[1]?.toLowerCase();
    const path = dest ? PAGES[dest] : undefined;
    if (path) {
      router.push(path);
      return {
        lines: [{ text: `> navigating to ${path}...`, color: "#34D399" }],
        close: true,
      };
    }
    return {
      lines: [{
        text: `> unknown: '${dest ?? ""}'. targets: ${Object.keys(PAGES).join(", ")}`,
        color: "#F59E0B",
      }],
    };
  }

  if (base === "ls") {
    return {
      lines: [
        { text: "" },
        { text: "CATEGORIES:", color: "#5B8CFF" },
        { text: "  /ai-systems   — AI Driven" },
        { text: "  /marketing    — Digital Marketing" },
        { text: "  /insights     — Field Notes" },
        { text: "" },
        { text: "  use 'goto [category]' to navigate.", color: "#6B7280" },
        { text: "" },
      ],
    };
  }

  if (base === "clear") return { lines: [], clear: true };
  if (base === "exit" || base === "q") return { lines: [], close: true };
  if (!cmd.trim()) return { lines: [] };

  return {
    lines: [{
      text: `> command not found: ${base}. type 'help'.`,
      color: "#F59E0B",
    }],
  };
}

export default function TerminalEgg() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // 백틱 트리거
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "`") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ESC 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // 오픈 시 부팅 애니메이션
  useEffect(() => {
    if (!open) return;
    setBooted(false);
    setInput("");
    let current: Line[] = [];
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_LINES.length) {
        current = [...current, BOOT_LINES[i]];
        setLines([...current]);
        i++;
      } else {
        setBooted(true);
        clearInterval(timer);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }, 110);
    return () => clearInterval(timer);
  }, [open]);

  // 자동 스크롤
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = input;
      const result = processCommand(cmd, router);

      if (result.clear) {
        setLines([]);
        setInput("");
        return;
      }

      setLines((prev) => [
        ...prev,
        { text: `$ ${cmd}`, color: "#FFFFFF" },
        ...result.lines,
      ]);
      setInput("");

      if (result.close) setTimeout(() => setOpen(false), 400);
    },
    [input, router]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[400] flex flex-col bg-black/96"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      {/* CRT 스캔라인 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.012) 2px, rgba(0,255,65,0.012) 4px)",
        }}
      />

      {/* 상단 바 */}
      <div className="relative flex items-center justify-between border-b border-green-500/20 px-5 py-3">
        <span className="text-[11px] tracking-[0.3em] text-green-500/50">
          THE_UNDERDOGS // TERMINAL v1.0
        </span>
        <button
          onClick={() => setOpen(false)}
          className="text-[11px] tracking-widest text-green-500/40 transition-colors hover:text-green-400"
        >
          [ ESC ]
        </button>
      </div>

      {/* 출력 영역 */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-5 py-4 text-[13px] leading-relaxed"
      >
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.color ?? "#22C55E" }}>
            {line.text || "\u00A0"}
          </div>
        ))}
      </div>

      {/* 인풋 */}
      {booted && (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center border-t border-green-500/20 px-5 py-3"
        >
          <span className="mr-2 text-[13px] text-green-500">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-green-400 outline-none caret-green-400"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      )}
    </div>
  );
}
