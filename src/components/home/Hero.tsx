"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Terminal lines ──────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { text: "> init marketing.ai", type: "cmd" },
  { text: "✓ agents loaded  [3/3]", type: "ok" },
  { text: "> scan.campaigns()", type: "cmd" },
  { text: "✓ 12 signals detected", type: "ok" },
  { text: "> optimize.budget()", type: "cmd" },
  { text: "✓ 4 systems active", type: "ok" },
  { text: "> uptime: 847d 14h 22m", type: "info" },
];

const LINE_STYLE: Record<string, string> = {
  cmd: "#5B8CFF",
  ok: "#34D399",
  info: "#8B5CF6",
};

// ── Cyberpunk Chalkboard — "The Operator's Field Notes" ─────────────────────
const FLOW_NODES = [
  { id: "raw",     label: "RAW DATA", color: "#8A8F98", delay: "0.6s" },
  { id: "agent",   label: "AGENT",    color: "#5B8CFF", delay: "0.9s", pulse: true },
  { id: "insight", label: "INSIGHT",  color: "#8B5CF6", delay: "1.2s" },
  { id: "action",  label: "ACTION",   color: "#34D399", delay: "1.5s" },
];

const ANNOTATIONS = [
  { prefix: "✓", text: "3 agents running",  color: "#34D399", delay: "1.8s" },
  { prefix: "✓", text: "12 signals live",   color: "#34D399", delay: "2.2s" },
  { prefix: "?", text: "next: scale",       color: "#8B5CF6", delay: "2.6s" },
];

function CyberpunkChalkboard() {
  return (
    <div className="chalkboard-frame">
      <span className="chalk-corner chalk-corner-tl" />
      <span className="chalk-corner chalk-corner-tr" />
      <span className="chalk-corner chalk-corner-bl" />
      <span className="chalk-corner chalk-corner-br" />

      {/* Header */}
      <div className="chalk-board-label">
        <span>FIELD_NOTES.md</span>
        <span className="chalk-board-status">● LIVE</span>
      </div>

      {/* Region A: Equation */}
      <div className="chalk-region chalk-equation-row">
        <span className="chalk-formula">
          SIGNAL<sub>(t)</sub> = data × context / noise
        </span>
      </div>

      {/* Divider */}
      <div className="chalk-divider" />

      {/* Region B: Flow diagram */}
      <div className="chalk-region chalk-flow-row">
        {FLOW_NODES.map((node, i) => (
          <div key={node.id} className="chalk-flow-item">
            <span
              className={`chalk-node${node.pulse ? " chalk-node-pulse" : ""}`}
              style={{
                borderColor: node.color,
                color: node.color,
                animationDelay: node.delay,
              }}
            >
              {node.label}
            </span>
            {i < FLOW_NODES.length - 1 && (
              <span
                className="chalk-arrow"
                style={{ animationDelay: `calc(${node.delay} + 0.25s)` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Region C: Annotations */}
      <div className="chalk-region chalk-annotations">
        {ANNOTATIONS.map((note, i) => (
          <div
            key={i}
            className="chalk-annotation-line"
            style={{ animationDelay: note.delay }}
          >
            <span className="chalk-prefix" style={{ color: note.color }}>
              {note.prefix}
            </span>
            <span className="chalk-annotation-text">{note.text}</span>
          </div>
        ))}
      </div>

      <div className="chalk-watermark">— Feynman Method</div>
    </div>
  );
}

// ── Title phase state machine ────────────────────────────────────────────────
type TitlePhase = 'typing' | 'scan' | 'final';
const FEYNMAN = "What I cannot create,\nI do not understand.";

// ── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: string }[]>([]);
  const [typingDone, setTypingDone] = useState(false);
  const [stats, setStats] = useState({ mem: 4128, cpu: 8 });

  // Title animation state
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const [titlePhase, setTitlePhase] = useState<TitlePhase>(isMobile ? 'final' : 'typing');
  const [typedTitle, setTypedTitle] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(isMobile);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const STAR_COLORS = ["#5B8CFF", "#8B5CF6", "#06B6D4", "#FFFFFF"];
    const stars: { x: number; y: number; r: number; speed: number; opacity: number; color: string }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }
    function initStars() {
      stars.length = 0;
      const count = Math.min(Math.floor((canvas!.width * canvas!.height) / 10000), 120);
      for (let i = 0; i < count; i++) {
        const bright = Math.random() < 0.1;
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: bright ? Math.random() * 1.8 + 1.0 : Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
          opacity: bright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.6 + 0.2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
    }
    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach((s) => {
        s.opacity += Math.sin(Date.now() * s.speed * 0.002) * 0.003;
        s.opacity = Math.max(0.1, Math.min(0.8, s.opacity));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle =
          s.color === "#FFFFFF"
            ? `rgba(255, 255, 255, ${s.opacity})`
            : s.color + Math.round(s.opacity * 255).toString(16).padStart(2, "0");
        ctx!.fill();
      });
      animationId = requestAnimationFrame(draw);
    }
    resize();
    initStars();
    draw();
    const onResize = () => { resize(); initStars(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Terminal typing animation (closure-based setTimeout chain)
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let lineIdx = 0;
    let charIdx = 0;

    function typeNext() {
      if (lineIdx >= TERMINAL_LINES.length) {
        setTypingDone(true);
        return;
      }
      const line = TERMINAL_LINES[lineIdx];
      setVisibleLines((prev) => {
        const next = [...prev];
        while (next.length <= lineIdx) next.push({ text: "", type: "" });
        next[lineIdx] = { text: line.text.slice(0, charIdx), type: line.type };
        return next;
      });
      if (charIdx < line.text.length) {
        charIdx++;
        timeout = setTimeout(typeNext, line.type === "ok" ? 22 : 55);
      } else {
        lineIdx++;
        charIdx = 0;
        timeout = setTimeout(typeNext, line.type === "cmd" ? 350 : 180);
      }
    }

    timeout = setTimeout(typeNext, 700);
    return () => clearTimeout(timeout);
  }, []);

  // Phase 1: Feynman 원문 타이핑
  useEffect(() => {
    if (titlePhase !== 'typing') return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let i = 0;

    function type() {
      if (i <= FEYNMAN.length) {
        setTypedTitle(FEYNMAN.slice(0, i));
        i++;
        t1 = setTimeout(type, 45);
      } else {
        t2 = setTimeout(() => setTitlePhase('scan'), 800);
      }
    }

    t1 = setTimeout(type, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [titlePhase]);

  // Phase 2: 청록 스캔라인 sweep
  useEffect(() => {
    if (titlePhase !== 'scan') return;
    const START = performance.now();
    const DURATION = 1400;
    let animId: number;

    function step(now: number) {
      const p = Math.min((now - START) / DURATION, 1);
      setScanProgress(p);
      if (p < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setTimeout(() => setTitlePhase('final'), 150);
      }
    }
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [titlePhase]);

  // Tagline 등장: titlePhase가 final 되면 트리거
  useEffect(() => {
    if (titlePhase === 'final') setShowTagline(true);
  }, [titlePhase]);

  // Live stats fluctuation
  useEffect(() => {
    const iv = setInterval(() => {
      setStats((prev) => ({
        mem: Math.max(3500, Math.min(6000, prev.mem + Math.floor(Math.random() * 80 - 40))),
        cpu: Math.max(2, Math.min(28, prev.cpu + Math.floor(Math.random() * 6 - 3))),
      }));
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  const activeLineIdx = visibleLines.length - 1;

  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-0 sm:px-6 sm:pt-12">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.5 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-glow)_0%,_transparent_60%)] opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Terminal window */}
        <div
          className="overflow-hidden rounded-2xl border border-[rgba(139,92,246,0.25)] bg-surface/50 backdrop-blur-sm"
          style={{ boxShadow: "0 0 40px rgba(139,92,246,0.12), 0 0 80px rgba(6,182,212,0.05)" }}
        >
          {/* ── Title bar ── */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 sm:px-5">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <div className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 font-mono text-[10px] tracking-[0.2em] text-white/25 uppercase">
                UNDERDOGS.SYS
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] sm:gap-5">
              <span>
                <span className="text-accent-cyan">MEM:</span>{" "}
                <span className="text-white/50">{(stats.mem / 1000).toFixed(1)}GB</span>
              </span>
              <span className="hidden sm:inline">
                <span className="text-accent-purple">CPU:</span>{" "}
                <span className="text-white/50">{stats.cpu}%</span>
              </span>
              <span>
                <span className="text-emerald-400">STATUS:</span>{" "}
                <span className="text-white/50">ACTIVE</span>
              </span>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="grid sm:grid-cols-2">
            {/* Left: text */}
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-14">
              <span className="section-label">AI-Driven Marketing</span>

              {/* Phase 1: Feynman 원문 타이핑 */}
              {titlePhase === 'typing' && (
                <div className="mt-4">
                  <h1
                    className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
                    style={{ textShadow: '0 0 20px rgba(91,140,255,0.25)', whiteSpace: 'pre-line' }}
                  >
                    {typedTitle}
                    <span
                      className="ml-1 inline-block h-[0.85em] w-[3px] align-middle bg-accent"
                      style={{ animation: 'blink 1s step-end infinite' }}
                    />
                  </h1>
                  <p className="mt-2 font-mono text-sm text-white/55 tracking-widest">
                    — Richard Feynman
                  </p>
                </div>
              )}

              {/* Phase 2: 청록 스캔라인 sweep — 파인만→내 해석 crossfade */}
              {titlePhase === 'scan' && (
                <div className="mt-4">
                  {/* 스캔 존: h1 영역만 relative로 감쌈 */}
                  <div className="relative">
                    {/* invisible spacer: 새 텍스트 기준으로 높이 유지 */}
                    <h1
                      className="invisible text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl"
                      aria-hidden="true"
                    >
                      What I can understand,
                      <br />I can build.
                    </h1>

                    {/* 구 텍스트 (파인만): 스캔 진행에 따라 fade out */}
                    <h1
                      className="absolute inset-0 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
                      style={{
                        opacity: Math.max(0, 1 - scanProgress * 1.8),
                        textShadow: '0 0 20px rgba(91,140,255,0.25)',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {`What I cannot create,\nI do not understand.`}
                    </h1>

                    {/* 신 텍스트 (내 해석): 39%부터 fade in */}
                    <h1
                      className="absolute inset-0 gradient-text text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl"
                      style={{
                        opacity: Math.max(0, scanProgress * 1.8 - 0.7),
                        textShadow: '0 0 40px rgba(91,140,255,0.4), 0 0 80px rgba(139,92,246,0.2)',
                      }}
                    >
                      What I can understand,
                      <br />I can build.
                    </h1>

                    {/* 스캔라인: h1 wrapper 기준 0→100% */}
                    <div
                      className="absolute left-[-6%] right-[-6%] pointer-events-none"
                      style={{
                        top: `${scanProgress * 100}%`,
                        height: '2px',
                        background:
                          'linear-gradient(90deg, transparent 0%, #06B6D4 20%, #5B8CFF 50%, #06B6D4 80%, transparent 100%)',
                        boxShadow: '0 0 8px #06B6D4, 0 0 24px rgba(6,182,212,0.5)',
                        opacity:
                          scanProgress < 0.92 ? 1 : Math.max(0, 1 - (scanProgress - 0.92) / 0.08),
                      }}
                    />
                  </div>

                  {/* Attribution: 스캔 초반에 fade out */}
                  <p
                    className="mt-2 font-mono text-xs tracking-widest"
                    style={{
                      color: '#06B6D4',
                      opacity: Math.max(0, (1 - scanProgress * 3) * 0.7),
                    }}
                  >
                    — Richard Feynman
                  </p>
                </div>
              )}

              {/* Phase 3: 내 해석 fadeInUp */}
              {titlePhase === 'final' && (
                <div className="mt-4" style={{ animation: 'fadeInUp 0.4s ease forwards' }}>
                  <h1
                    className="gradient-text text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl"
                    style={{ textShadow: '0 0 40px rgba(91,140,255,0.4), 0 0 80px rgba(139,92,246,0.2)' }}
                  >
                    What I can understand,
                    <br />I can build.
                  </h1>
                  <p className="mt-2 font-mono text-sm text-white/55 tracking-widest">
                    — The Underdogs
                  </p>
                </div>
              )}

              <p className="mt-5 text-lg font-semibold leading-snug text-white/80 sm:text-xl">
                {"I build systems that work while I sleep.".split(" ").map((word, i) => (
                  <span
                    key={i}
                    className="inline-block mr-[0.28em]"
                    style={showTagline ? {
                      opacity: 0,
                      animation: 'fadeInUp 0.4s ease forwards',
                      animationDelay: `${0.2 + i * 0.07}s`,
                    } : { opacity: 0 }}
                  >
                    {word}
                  </span>
                ))}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/ai-systems"
                  className="group inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 font-mono text-sm text-accent transition-all hover:border-accent/60 hover:bg-accent/20"
                >
                  <span className="transition-all group-hover:mr-0.5">&gt;</span>
                  <span>AI Systems</span>
                </Link>
                <Link
                  href="/marketing"
                  className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-secondary transition-all hover:border-white/20 hover:text-white"
                >
                  <span className="transition-all group-hover:mr-0.5">&gt;</span>
                  <span>Marketing</span>
                </Link>
              </div>
            </div>

            {/* Right: chalkboard + terminal — 데스크탑만 */}
            <div className="hidden sm:flex flex-col sm:border-l border-white/5">
              {/* Cyberpunk chalkboard */}
              <div className="border-b border-white/5 py-5 px-3">
                <CyberpunkChalkboard />
              </div>

              {/* Terminal output */}
              <div className="flex-1 p-5 sm:p-6">
                <div className="space-y-0.5 font-mono text-[12px] leading-[1.7] sm:text-[13px]">
                  {visibleLines.map((line, i) => (
                    <div key={i} style={{ color: LINE_STYLE[line.type] || "#8A8F98" }}>
                      {line.text}
                      {i === activeLineIdx && !typingDone && (
                        <span
                          className="ml-0.5 inline-block h-[13px] w-[7px] align-middle"
                          style={{
                            background: LINE_STYLE[line.type] || "#8A8F98",
                            animation: "blink 1s step-end infinite",
                          }}
                        />
                      )}
                    </div>
                  ))}
                  {typingDone && (
                    <div style={{ color: "#8B5CF6" }}>
                      {">"}{" "}
                      <span
                        className="ml-0.5 inline-block h-[13px] w-[7px] align-middle"
                        style={{ background: "#8B5CF6", animation: "blink 1s step-end infinite" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 모바일 전용 compact 뷰 */}
          <div className="sm:hidden border-t border-white/5 px-5 py-4 space-y-3">
            {/* Flow 1줄 */}
            <div className="flex items-center justify-between">
              {FLOW_NODES.map((node, i) => (
                <div key={node.id} className="flex items-center gap-1.5">
                  <span
                    className="font-mono text-[9px] tracking-[0.1em] px-1.5 py-0.5 rounded border"
                    style={{ borderColor: node.color + "55", color: node.color }}
                  >
                    {node.label}
                  </span>
                  {i < FLOW_NODES.length - 1 && (
                    <span className="text-white/20 text-[10px]">›</span>
                  )}
                </div>
              ))}
            </div>
            {/* 터미널 stats 요약 */}
            <div className="font-mono text-[11px] space-y-0.5">
              {ANNOTATIONS.map((note, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span style={{ color: note.color }}>{note.prefix}</span>
                  <span className="text-white/40">{note.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
