"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const COLORS = ['#5B8CFF', '#8B5CF6', '#06B6D4', '#FFFFFF'];
  const stars: { x: number; y: number; r: number; speed: number; opacity: number; color: string }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function initStars() {
      stars.length = 0;
      const area = canvas!.width * canvas!.height;
      const count = Math.min(Math.floor(area / 10000), 120);
      for (let i = 0; i < count; i++) {
        const isBright = Math.random() < 0.1;
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: isBright ? Math.random() * 1.8 + 1.0 : Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
          opacity: isBright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.6 + 0.2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
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
        ctx!.fillStyle = s.color === '#FFFFFF'
          ? `rgba(255, 255, 255, ${s.opacity})`
          : s.color + Math.round(s.opacity * 255).toString(16).padStart(2, '0');
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

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-0">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.5 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent-glow)_0%,_transparent_60%)] opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="rounded-2xl border border-[rgba(139,92,246,0.2)] bg-surface/40 px-5 py-8 backdrop-blur-sm sm:px-12 sm:py-14" style={{boxShadow:'0 0 40px rgba(139,92,246,0.1), 0 0 80px rgba(6,182,212,0.05)'}}>
          <span className="section-label">AI-Driven Marketing</span>
          <h1 className="gradient-text mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl" style={{textShadow:'0 0 40px rgba(91,140,255,0.4), 0 0 80px rgba(139,92,246,0.2)'}}>
            Systems that
            <br />
            think ahead.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
            Building intelligent marketing systems
            that automate decisions, not just tasks.
          </p>
        </div>
      </div>
    </section>
  );
}
