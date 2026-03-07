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

// ── Pixel Robot (13 × 16, pixel size = 10) ─────────────────────────────────
const P = 10;
const ART: string[] = [
  "    bbbbb    ",
  "   bbbbbbb   ",
  "  bbb   bbb  ",
  "  b p   p b  ",
  "  bbb   bbb  ",
  "  b ccccc b  ",
  "  bbbbbbbbb  ",
  "   bb   bb   ",
  "  bbbbbbbbb  ",
  "  b       b  ",
  "  b  www  b  ",
  "  b  www  b  ",
  "  b       b  ",
  "  bbbbbbbbb  ",
  "   bb   bb   ",
  "   bb   bb   ",
];
const PIXEL_COLORS: Record<string, string> = {
  b: "#5B8CFF",
  p: "#8B5CF6",
  c: "#06B6D4",
  w: "#FFFFFF",
};

function PixelRobot() {
  const cols = ART[0].length;
  const rows = ART.length;
  return (
    <svg
      width={cols * P}
      height={rows * P}
      className="pixel-robot"
      style={{
        imageRendering: "pixelated",
        filter: "drop-shadow(0 0 10px rgba(91,140,255,0.5))",
      }}
    >
      {ART.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const fill = PIXEL_COLORS[ch];
          if (!fill) return null;
          const isEye = ch === "p";
          return (
            <rect
              key={`${x}-${y}`}
              x={x * P}
              y={y * P}
              width={P}
              height={P}
              fill={fill}
              opacity={0.85}
              className={isEye ? "pixel-eye" : undefined}
            />
          );
        })
      )}
    </svg>
  );
}

// ── Title phase state machine ────────────────────────────────────────────────
type TitlePhase = 'typing' | 'matrix' | 'final';
const FEYNMAN = "What I cannot create, I do not understand.";
const TARGET  = "What I can understand, I can build.";

// ── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState<{ text: string; type: string }[]>([]);
  const [typingDone, setTypingDone] = useState(false);
  const [stats, setStats] = useState({ mem: 4128, cpu: 8 });

  // Title animation state
  const [titlePhase, setTitlePhase] = useState<TitlePhase>('typing');
  const [typedTitle, setTypedTitle] = useState('');

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

  // Title animation: typing → matrix
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    let i = 0;

    function type() {
      if (i <= FEYNMAN.length) {
        setTypedTitle(FEYNMAN.slice(0, i));
        i++;
        t1 = setTimeout(type, 45);
      } else {
        t2 = setTimeout(() => setTitlePhase('matrix'), 800);
      }
    }

    t1 = setTimeout(type, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Matrix rain canvas (h1 영역 위에서 실행)
  useEffect(() => {
    if (titlePhase !== 'matrix') return;
    const canvas = titleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const c = ctx;

    const W = canvas.offsetWidth || 480;
    const H = canvas.offsetHeight || 140;
    const cv = canvas;
    cv.width  = W;
    cv.height = H;
    cv.style.opacity = '1';

    const FS    = 15;
    const COLS  = Math.floor(W / FS);
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>|/?:;';
    const drops = Array.from({ length: COLS }, () => Math.floor(Math.random() * -12));

    let frame = 0;
    const RAIN   = 100;
    const FADE   = 35;
    const TOTAL  = RAIN + FADE;
    let animId: number;

    function draw() {
      // 잔상 (어두운 배경 누적 → Matrix 트레일)
      c.fillStyle = 'rgba(10, 11, 15, 0.12)';
      c.fillRect(0, 0, W, H);

      c.font = `bold ${FS}px "JetBrains Mono", monospace`;

      drops.forEach((y, col) => {
        const x = col * FS;
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];

        // 선두: 밝은 흰-초록 (눈에 확 들어오는 leading char)
        c.fillStyle = '#CCFFCC';
        c.shadowBlur = 6;
        c.shadowColor = '#00FF41';
        c.fillText(ch, x, y * FS);

        // 2번째: 밝은 초록
        c.fillStyle = '#00FF41';
        c.shadowBlur = 4;
        c.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 1) * FS);

        // 3~4번째: 어두운 초록 (꼬리)
        c.fillStyle = '#009922';
        c.shadowBlur = 0;
        c.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 2) * FS);
        c.fillStyle = '#004410';
        c.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, (y - 3) * FS);

        if (drops[col] * FS > H && Math.random() > 0.975) drops[col] = 0;
        drops[col]++;
      });

      c.shadowBlur = 0;
      frame++;

      // 마지막 FADE 프레임에서 캔버스 자체를 페이드 아웃
      if (frame >= RAIN) {
        const t = (frame - RAIN) / FADE;
        cv.style.opacity = String(Math.max(0, 1 - t));
      }

      if (frame < TOTAL) {
        animId = requestAnimationFrame(draw);
      } else {
        cv.style.opacity = '0';
        setTitlePhase('final');
      }
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
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
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <span className="section-label">AI-Driven Marketing</span>

              {/* Phase 1: 타이핑 */}
              {titlePhase === 'typing' && (
                <div className="mt-4">
                  <h1
                    className="text-3xl font-bold leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
                    style={{ textShadow: '0 0 20px rgba(91,140,255,0.3)' }}
                  >
                    {typedTitle}
                    <span
                      className="ml-1 inline-block h-[0.85em] w-[3px] align-middle bg-accent"
                      style={{ animation: 'blink 1s step-end infinite' }}
                    />
                  </h1>
                  <p className="mt-2 font-mono text-sm text-secondary/50">— Richard Feynman</p>
                </div>
              )}

              {/* Phase 2: 매트릭스 비 (h1 영역 캔버스) */}
              {titlePhase === 'matrix' && (
                <div
                  className="mt-4 relative rounded-lg overflow-hidden"
                  style={{ minHeight: '9rem' }}
                >
                  <canvas
                    ref={titleCanvasRef}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              )}

              {/* Phase 3: 최종 정착 */}
              {titlePhase === 'final' && (
                <div className="mt-4">
                  <h1
                    className="gradient-text text-3xl font-bold leading-snug tracking-tight sm:text-4xl lg:text-5xl"
                    style={{ textShadow: '0 0 40px rgba(91,140,255,0.4), 0 0 80px rgba(139,92,246,0.2)' }}
                  >
                    What I can understand,
                    <br />I can build.
                  </h1>
                  <p className="mt-2 font-mono text-sm text-accent/60">— The Underdogs</p>
                </div>
              )}

              <p className="mt-5 max-w-md text-base leading-relaxed text-secondary sm:text-lg">
                Building intelligent marketing systems
                that automate decisions, not just tasks.
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

            {/* Right: pixel art + terminal */}
            <div className="flex flex-col border-t border-white/5 sm:border-t-0 sm:border-l">
              {/* Pixel robot */}
              <div className="flex items-center justify-center border-b border-white/5 py-7">
                <PixelRobot />
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
        </div>
      </div>
    </section>
  );
}
