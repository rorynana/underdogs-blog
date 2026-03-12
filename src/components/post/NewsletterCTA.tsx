"use client";

import { useEffect, useRef, useState } from "react";

const STIBEE_URL = "https://page.stibee.com/subscriptions/478178";
const STIBEE_API = "https://stibee.com/api/v1.0/lists/3bJhw21WLIDqW91dXBNjwGYp12uQ8Q==/public/subscribers";

// ── 3x5 픽셀 폰트 (N E S W 0-9) ──────────────────────────────────────────
const FONT: Record<string, number[]> = {
  N: [1,0,1, 1,1,1, 1,0,1, 1,0,1, 1,0,1],
  E: [1,1,1, 1,0,0, 1,1,0, 1,0,0, 1,1,1],
  S: [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
  W: [1,0,1, 1,0,1, 1,0,1, 1,1,1, 1,0,1],
  "0": [1,1,1, 1,0,1, 1,0,1, 1,0,1, 1,1,1],
  "1": [0,1,0, 1,1,0, 0,1,0, 0,1,0, 1,1,1],
  "2": [1,1,1, 0,0,1, 1,1,1, 1,0,0, 1,1,1],
  "3": [1,1,1, 0,0,1, 1,1,1, 0,0,1, 1,1,1],
  "4": [1,0,1, 1,0,1, 1,1,1, 0,0,1, 0,0,1],
  "5": [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
};

// ── Pixel Art Radar (High Detail) ───────────────────────────────────────────
function PixelRadar({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const G = 96;   // 96x96 논리 픽셀 (고해상도)
    const PX = 2;    // 각 논리 픽셀 = 2x2
    const SIZE = G * PX;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    const cx = G / 2;
    const cy = G / 2;
    const R = 38;
    let sweep = 0;
    let animId: number;
    let frame = 0;

    // 블립 — 각각 고유 색상 인덱스
    const blips = [
      { a: 0.5, r: 0.45, age: 0, ci: 0 },
      { a: 1.8, r: 0.72, age: 0, ci: 1 },
      { a: 2.7, r: 0.35, age: 0, ci: 2 },
      { a: 3.9, r: 0.60, age: 0, ci: 3 },
      { a: 5.1, r: 0.82, age: 0, ci: 4 },
      { a: 0.2, r: 0.90, age: 0, ci: 0 },
    ];

    // 궤도 위성 (외곽 링 따라 도는 작은 점)
    const sats = [
      { speed: 0.008, offset: 0, color: "rgba(0,220,255,0.6)" },
      { speed: -0.005, offset: Math.PI, color: "rgba(139,92,246,0.5)" },
      { speed: 0.012, offset: Math.PI * 0.7, color: "rgba(245,158,11,0.5)" },
    ];

    // 리플 (중심에서 퍼지는 원)
    const ripples: { r: number; alpha: number }[] = [];
    let rippleTimer = 0;

    // 블립 색상 팔레트
    const palette = [
      { g: [52,211,153], h: [150,255,200] },   // 에메랄드
      { g: [245,158,11], h: [255,220,100] },    // 앰버
      { g: [244,63,94],  h: [255,150,170] },    // 로즈
      { g: [139,92,246], h: [200,170,255] },    // 퍼플
      { g: [14,165,233], h: [130,220,255] },    // 스카이
    ];

    function px(x: number, y: number, c: string) {
      ctx!.fillStyle = c;
      ctx!.fillRect(Math.floor(x) * PX, Math.floor(y) * PX, PX, PX);
    }

    // Bresenham 원
    function bCircle(ox: number, oy: number, r: number, c: string, dashed = false) {
      let x = r, y = 0, d = 1 - r, i = 0;
      while (x >= y) {
        if (!dashed || (i % 3 !== 2)) {
          px(ox+x,oy+y,c); px(ox-x,oy+y,c); px(ox+x,oy-y,c); px(ox-x,oy-y,c);
          px(ox+y,oy+x,c); px(ox-y,oy+x,c); px(ox+y,oy-x,c); px(ox-y,oy-x,c);
        }
        y++; i++;
        if (d < 0) { d += 2*y+1; } else { x--; d += 2*(y-x)+1; }
      }
    }

    // Bresenham 라인
    function bLine(x0: number, y0: number, x1: number, y1: number, c: string) {
      let dx=Math.abs(x1-x0), dy=Math.abs(y1-y0);
      let sx=x0<x1?1:-1, sy=y0<y1?1:-1;
      let e=dx-dy, lx=x0, ly=y0;
      while(true) {
        px(lx,ly,c);
        if(lx===x1&&ly===y1) break;
        const e2=2*e;
        if(e2>-dy){e-=dy;lx+=sx;}
        if(e2<dx){e+=dx;ly+=sy;}
      }
    }

    // 3x5 글자 렌더
    function drawChar(ch: string, sx: number, sy: number, c: string) {
      const d = FONT[ch];
      if (!d) return;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (d[row * 3 + col]) px(sx + col, sy + row, c);
        }
      }
    }

    // ── 배경 그리드 ──
    function drawBg() {
      // 미세 도트 그리드
      for (let x = 2; x < G; x += 3) {
        for (let y = 2; y < G; y += 3) {
          px(x, y, "rgba(0,180,255,0.025)");
        }
      }
      // 레이더 영역 내부 더 밝은 그리드
      for (let x = cx-R; x <= cx+R; x += 4) {
        for (let y = cy-R; y <= cy+R; y += 4) {
          const d = Math.sqrt((x-cx)**2+(y-cy)**2);
          if (d <= R) px(x, y, "rgba(0,200,255,0.04)");
        }
      }
    }

    // ── 코너 브래킷 (더 정교) ──
    function drawCorners() {
      const o = 1, len = 8;
      const colors = [
        "rgba(0,220,255,0.35)",  // TL 시안
        "rgba(139,92,246,0.3)",  // TR 퍼플
        "rgba(52,211,153,0.3)",  // BL 에메랄드
        "rgba(245,158,11,0.3)",  // BR 앰버
      ];
      // TL
      for(let i=0;i<len;i++){px(o+i,o,colors[0]);px(o,o+i,colors[0]);}
      px(o+1,o+1,colors[0]);
      // TR
      for(let i=0;i<len;i++){px(G-o-1-i,o,colors[1]);px(G-o-1,o+i,colors[1]);}
      px(G-o-2,o+1,colors[1]);
      // BL
      for(let i=0;i<len;i++){px(o+i,G-o-1,colors[2]);px(o,G-o-1-i,colors[2]);}
      px(o+1,G-o-2,colors[2]);
      // BR
      for(let i=0;i<len;i++){px(G-o-1-i,G-o-1,colors[3]);px(G-o-1,G-o-1-i,colors[3]);}
      px(G-o-2,G-o-2,colors[3]);
    }

    // ── N/E/S/W 라벨 ──
    function drawLabels() {
      drawChar("N", cx - 1, cy - R - 8, "rgba(0,220,255,0.5)");
      drawChar("S", cx - 1, cy + R + 3, "rgba(245,158,11,0.4)");
      drawChar("E", cx + R + 3, cy - 2, "rgba(139,92,246,0.4)");
      drawChar("W", cx - R - 5, cy - 2, "rgba(52,211,153,0.4)");
    }

    // ── 거리 숫자 ──
    function drawDistanceMarks() {
      drawChar("1", cx + Math.round(R*0.33) + 1, cy + 1, "rgba(255,255,255,0.08)");
      drawChar("2", cx + Math.round(R*0.66) + 1, cy + 1, "rgba(255,255,255,0.08)");
      drawChar("3", cx + R + 1, cy + 1, "rgba(255,255,255,0.08)");
    }

    // ── 십자선 (대시) ──
    function drawCross() {
      for (let i = cx-R; i <= cx+R; i+=2) {
        if(Math.abs(i-cx)<=R) px(i, cy, "rgba(0,200,255,0.08)");
      }
      for (let j = cy-R; j <= cy+R; j+=2) {
        if(Math.abs(j-cy)<=R) px(cx, j, "rgba(0,200,255,0.08)");
      }
      // 대각선 (더 미세)
      for (let i = 1; i <= R; i+=3) {
        const d = Math.round(i * 0.707);
        if (d <= R) {
          px(cx+d, cy+d, "rgba(0,200,255,0.04)");
          px(cx-d, cy+d, "rgba(0,200,255,0.04)");
          px(cx+d, cy-d, "rgba(0,200,255,0.04)");
          px(cx-d, cy-d, "rgba(0,200,255,0.04)");
        }
      }
    }

    // ── 스윕 (퍼플→시안 부채꼴, 더 넓고 화려하게) ──
    function drawSweep(a: number) {
      const w = 1.2;
      for (let gx = cx-R; gx <= cx+R; gx++) {
        for (let gy = cy-R; gy <= cy+R; gy++) {
          const dx = gx-cx, dy = gy-cy;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist > R || dist < 2) continue;
          let pa = Math.atan2(dy,dx); if(pa<0)pa+=Math.PI*2;
          let diff = a-pa; if(diff<0)diff+=Math.PI*2; if(diff>Math.PI*2)diff-=Math.PI*2;
          if (diff >= 0 && diff < w) {
            const t = diff/w;
            const intensity = (1-t) * 0.35;
            // 퍼플(전방) → 시안(후방)
            const r = Math.round(160*(1-t) + 0*t);
            const g = Math.round(80*(1-t) + 200*t);
            const b = Math.round(255*(1-t) + 255*t);
            px(gx, gy, `rgba(${r},${g},${b},${intensity})`);
          }
        }
      }
    }

    // ── 스캔라인 + 팁 글로우 ──
    function drawScan(a: number) {
      const ex = Math.round(cx+Math.cos(a)*R);
      const ey = Math.round(cy+Math.sin(a)*R);
      bLine(Math.round(cx),Math.round(cy),ex,ey,"rgba(120,200,255,0.7)");
      // 팁 3x3 글로우
      for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++) {
        px(ex+ox,ey+oy,"rgba(200,230,255,0.4)");
      }
      px(ex,ey,"rgba(220,240,255,0.95)");
    }

    // ── 리플 (중심에서 퍼지는 원) ──
    function updateRipples() {
      rippleTimer++;
      if (rippleTimer % 120 === 0) {
        ripples.push({ r: 2, alpha: 0.3 });
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 0.3;
        rp.alpha -= 0.003;
        if (rp.alpha <= 0 || rp.r > R) {
          ripples.splice(i, 1);
          continue;
        }
        bCircle(cx, cy, Math.round(rp.r), `rgba(0,220,255,${rp.alpha})`, true);
      }
    }

    // ── 궤도 위성 ──
    function drawSatellites(f: number) {
      sats.forEach(s => {
        const a = s.offset + f * s.speed;
        const sx = Math.round(cx + Math.cos(a) * (R + 3));
        const sy = Math.round(cy + Math.sin(a) * (R + 3));
        px(sx, sy, s.color);
        // 트레일 (2픽셀 뒤)
        const ta = a - s.speed * 8;
        const tx = Math.round(cx + Math.cos(ta) * (R + 3));
        const ty = Math.round(cy + Math.sin(ta) * (R + 3));
        px(tx, ty, s.color.replace(/[\d.]+\)$/, "0.2)"));
      });
    }

    // ── 블립 (다색 + 트레일) ──
    function drawBlips(a: number) {
      blips.forEach(b => {
        let diff = ((a-b.a)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
        if(diff<0.3) b.age=1;
        if(b.age<=0) return;
        const bx = Math.round(cx+Math.cos(b.a)*(R*b.r));
        const by = Math.round(cy+Math.sin(b.a)*(R*b.r));
        const col = palette[b.ci % palette.length];

        // 7x7 외곽 글로우
        const oA = b.age*0.07;
        for(let ox=-3;ox<=3;ox++) for(let oy=-3;oy<=3;oy++) {
          if(Math.abs(ox)>=2||Math.abs(oy)>=2) {
            px(bx+ox,by+oy,`rgba(${col.g[0]},${col.g[1]},${col.g[2]},${oA})`);
          }
        }
        // 5x5 미드
        const mA = b.age*0.18;
        for(let ox=-2;ox<=2;ox++) for(let oy=-2;oy<=2;oy++) {
          if(Math.abs(ox)===2||Math.abs(oy)===2)
            px(bx+ox,by+oy,`rgba(${col.g[0]},${col.g[1]},${col.g[2]},${mA})`);
        }
        // 3x3 코어
        const cA = b.age*0.7;
        for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++) {
          px(bx+ox,by+oy,`rgba(${col.g[0]},${col.g[1]},${col.g[2]},${cA})`);
        }
        // 1x1 핫
        px(bx,by,`rgba(${col.h[0]},${col.h[1]},${col.h[2]},${b.age})`);
        // 십자 하이라이트 (밝은 순간만)
        if (b.age > 0.7) {
          const xA = (b.age-0.7)*1.5;
          px(bx-2,by,`rgba(${col.h[0]},${col.h[1]},${col.h[2]},${xA*0.3})`);
          px(bx+2,by,`rgba(${col.h[0]},${col.h[1]},${col.h[2]},${xA*0.3})`);
          px(bx,by-2,`rgba(${col.h[0]},${col.h[1]},${col.h[2]},${xA*0.3})`);
          px(bx,by+2,`rgba(${col.h[0]},${col.h[1]},${col.h[2]},${xA*0.3})`);
        }
        b.age = Math.max(0, b.age - 0.004);
      });
    }

    // ── 중심점 (다중 레이어 + 펄스) ──
    function drawCenter(f: number) {
      const pulse = 0.7 + Math.sin(f*0.04)*0.3;
      // 7x7 퍼플 외곽
      for(let ox=-3;ox<=3;ox++) for(let oy=-3;oy<=3;oy++) {
        if(Math.abs(ox)===3||Math.abs(oy)===3)
          px(cx+ox,cy+oy,`rgba(139,92,246,${0.08*pulse})`);
      }
      // 5x5 시안 미드
      for(let ox=-2;ox<=2;ox++) for(let oy=-2;oy<=2;oy++) {
        if(Math.abs(ox)===2||Math.abs(oy)===2)
          px(cx+ox,cy+oy,`rgba(0,200,255,${0.15*pulse})`);
      }
      // 3x3 밝은 블루
      for(let ox=-1;ox<=1;ox++) for(let oy=-1;oy<=1;oy++) {
        px(cx+ox,cy+oy,`rgba(91,160,255,${0.5*pulse})`);
      }
      // 1x1 화이트 코어
      px(cx,cy,`rgba(220,240,255,${0.9*pulse})`);
    }

    // ── 사이드 미니 바 차트 ──
    function drawMiniBars(f: number) {
      const barH = [3,5,4,6,2,5,3,4];
      const colors = [
        "rgba(0,220,255,0.25)","rgba(52,211,153,0.25)",
        "rgba(139,92,246,0.25)","rgba(245,158,11,0.25)",
        "rgba(0,220,255,0.2)","rgba(244,63,94,0.2)",
        "rgba(52,211,153,0.2)","rgba(139,92,246,0.2)",
      ];
      // 좌측 하단
      barH.forEach((h, i) => {
        const animated = Math.max(1, h + Math.round(Math.sin(f*0.02 + i)*2));
        for (let j = 0; j < animated; j++) {
          px(4 + i * 2, G - 8 - j, colors[i]);
        }
      });
      // 우측 상단 (가로 바)
      for (let i = 0; i < 5; i++) {
        const w = Math.max(1, 3 + Math.round(Math.sin(f*0.025 + i*1.5)*2));
        for (let j = 0; j < w; j++) {
          px(G - 6 - j, 5 + i * 2, colors[i]);
        }
      }
    }

    // ── 워닝 인디케이터 ──
    function drawWarnings(f: number) {
      const blink1 = Math.sin(f*0.06) > 0.3;
      const blink2 = Math.sin(f*0.045 + 1) > 0.2;
      if (blink1) {
        px(3, 3, "rgba(245,158,11,0.5)");
        px(4, 3, "rgba(245,158,11,0.3)");
      }
      if (blink2) {
        px(G-4, G-4, "rgba(244,63,94,0.5)");
        px(G-5, G-4, "rgba(244,63,94,0.3)");
      }
      // 상단 중앙 스캐닝 도트
      const dotX = cx - 10 + Math.round((f % 80) / 80 * 20);
      px(dotX, 2, "rgba(0,220,255,0.4)");
      px(dotX - 1, 2, "rgba(0,220,255,0.15)");
    }

    // ── 틱마크 (더 정교) ──
    function drawTicks() {
      // N (시안, 3px)
      for(let i=1;i<=3;i++) px(cx, cy-R-i, `rgba(0,220,255,${0.2+i*0.1})`);
      // S (앰버)
      for(let i=1;i<=3;i++) px(cx, cy+R+i, `rgba(245,158,11,${0.2+i*0.1})`);
      // E (퍼플)
      for(let i=1;i<=3;i++) px(cx+R+i, cy, `rgba(139,92,246,${0.2+i*0.1})`);
      // W (에메랄드)
      for(let i=1;i<=3;i++) px(cx-R-i, cy, `rgba(52,211,153,${0.2+i*0.1})`);
      // 중간 틱 (8방향)
      const diag = Math.round(R * 0.707);
      px(cx+diag, cy+diag, "rgba(255,255,255,0.06)");
      px(cx-diag, cy+diag, "rgba(255,255,255,0.06)");
      px(cx+diag, cy-diag, "rgba(255,255,255,0.06)");
      px(cx-diag, cy-diag, "rgba(255,255,255,0.06)");
    }

    function draw() {
      ctx!.clearRect(0, 0, SIZE, SIZE);
      frame++;

      drawBg();
      drawCorners();
      drawWarnings(frame);
      drawMiniBars(frame);
      drawLabels();
      drawDistanceMarks();

      // 동심원 (3개, 각각 다른 스타일)
      bCircle(cx, cy, Math.round(R*0.33), "rgba(0,200,255,0.1)", true);
      bCircle(cx, cy, Math.round(R*0.66), "rgba(60,140,255,0.12)", false);
      bCircle(cx, cy, R, "rgba(91,140,255,0.25)", false);

      drawCross();
      drawTicks();
      drawSweep(sweep);
      drawScan(sweep);
      updateRipples();
      drawSatellites(frame);
      drawBlips(sweep);
      drawCenter(frame);

      sweep += 0.018;
      if (sweep > Math.PI * 2) sweep -= Math.PI * 2;
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, [active]);

  return <canvas ref={canvasRef} style={{ imageRendering: "pixelated" }} />;
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function NewsletterCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [typeDone, setTypeDone] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const msg = "> SIGNAL DETECTED";
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    function tick() {
      if (i <= msg.length) {
        setTyped(msg.slice(0, i));
        i++;
        t = setTimeout(tick, 45);
      } else {
        setTypeDone(true);
      }
    }
    t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="my-12 flex justify-center sm:my-16">
      <div
        ref={ref}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-[rgba(91,140,255,0.15)] bg-[#080b10]/95 backdrop-blur-sm"
        style={{
          boxShadow:
            "0 0 60px rgba(91,140,255,0.07), 0 0 120px rgba(139,92,246,0.04), inset 0 1px 0 rgba(0,220,255,0.06)",
        }}
      >
        {/* CRT scanline */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
          }}
        />

        {/* ── title bar ── */}
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2 sm:px-5">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
            <span className="ml-3 font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase">
              RADAR.SYS
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="hidden text-white/20 sm:inline">FREQ 2.4GHz</span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                style={{ animation: "nlPulse 2s ease-in-out infinite" }}
              />
              <span className="text-emerald-400/60">ACTIVE</span>
            </span>
          </div>
        </div>

        {/* ── body ── */}
        <div className="relative flex items-center gap-5 px-5 py-5 sm:gap-7 sm:px-7 sm:py-6">
          {/* background glows */}
          <div className="absolute -left-10 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-cyan-500/[0.03] blur-3xl" />
          <div className="absolute -right-6 top-0 h-28 w-28 rounded-full bg-purple-500/[0.03] blur-2xl" />

          {/* 픽셀아트 레이더 */}
          <div
            className={`relative z-10 shrink-0 transition-all duration-1000 ${
              visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <PixelRadar active={visible} />
          </div>

          {/* 텍스트 영역 */}
          <div className="relative z-10 min-w-0 flex-1">
            {/* 타이핑 라인 */}
            <div
              className={`h-5 font-mono text-[11px] transition-opacity duration-500 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className={typeDone ? "text-emerald-400" : "text-cyan-400"}>
                {typed}
              </span>
              {!typeDone && visible && (
                <span
                  className="ml-0.5 inline-block h-[12px] w-[5px] align-middle bg-cyan-400"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              )}
            </div>

            {/* 도트아트 헤드라인 */}
            <h3
              className={`pixel-headline mt-2 text-[32px] leading-[1.25] font-bold transition-all duration-700 delay-200 sm:text-[44px] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="pixel-text-inner">
                새로운 신호를
                <br />
                감지합니다
              </span>
            </h3>
            <p
              className={`pixel-sub mt-2 text-[11px] text-white/40 transition-all duration-700 delay-[350ms] sm:text-[13px] ${
                visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              놓치기 전에, 수신하세요.
            </p>
          </div>
        </div>

        {/* ── footer: 인라인 구독 폼 ── */}
        <div
          className={`border-t border-white/5 px-4 py-3.5 transition-all duration-700 delay-500 sm:px-5 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          {status === "done" ? (
            <div className="flex items-center justify-center gap-2 py-1 font-mono text-sm text-emerald-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              수신 등록 완료
            </div>
          ) : (
            <form
              aria-label="뉴스레터 구독"
              className="flex items-center gap-2"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email || status === "loading") return;
                setStatus("loading");
                try {
                  const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  });
                  if (res.ok) {
                    setStatus("done");
                  } else {
                    setStatus("error");
                    setTimeout(() => setStatus("idle"), 3000);
                  }
                } catch {
                  setStatus("error");
                  setTimeout(() => setStatus("idle"), 3000);
                }
              }}
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-mono text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-cyan-400/40 focus:bg-white/[0.05] sm:py-3 sm:text-base"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex shrink-0 items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 py-2.5 font-mono text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/60 hover:bg-cyan-400/20 hover:text-white hover:shadow-[0_0_24px_rgba(0,220,255,0.18)] disabled:opacity-50 sm:px-6 sm:py-3 sm:text-base"
              >
                {status === "loading" ? "..." : status === "error" ? "재시도" : "뉴스레터 받기"}
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          )}
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[9px] text-white/15 tracking-wider">
              6 SIGNALS TRACKED
            </span>
            {status === "error" && (
              <span className="font-mono text-[10px] text-red-400/60">연결 실패</span>
            )}
          </div>
        </div>

        <style>{`
          @font-face {
            font-family: 'Galmuri11';
            src: url('https://cdn.jsdelivr.net/npm/galmuri/dist/Galmuri11-Bold.woff2') format('woff2');
            font-weight: 700;
            font-display: swap;
          }
          @font-face {
            font-family: 'Galmuri11';
            src: url('https://cdn.jsdelivr.net/npm/galmuri/dist/Galmuri11.woff2') format('woff2');
            font-weight: 400;
            font-display: swap;
          }
          .pixel-headline {
            font-family: 'Galmuri11', 'DungGeunMo', monospace;
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: unset;
            text-rendering: optimizeSpeed;
            letter-spacing: 0.04em;
          }
          .pixel-text-inner {
            background: linear-gradient(180deg, rgba(0,220,255,0.95) 0%, rgba(91,140,255,0.85) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 0 8px rgba(0,220,255,0.3));
          }
          .pixel-sub {
            font-family: 'Galmuri11', 'DungGeunMo', monospace;
            -webkit-font-smoothing: none;
            -moz-osx-font-smoothing: unset;
            text-rendering: optimizeSpeed;
            letter-spacing: 0.06em;
          }
          @keyframes nlPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
        `}</style>
      </div>
    </div>
  );
}
