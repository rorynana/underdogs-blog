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
    const stars: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
    }

    function initStars() {
      stars.length = 0;
      const count = Math.floor((canvas!.width * canvas!.height) / 10000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          r: Math.random() * 1.2 + 0.3,
          speed: Math.random() * 0.3 + 0.05,
          opacity: Math.random() * 0.6 + 0.2,
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
        ctx!.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
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
        <div className="rounded-2xl border border-border bg-surface/40 px-8 py-10 backdrop-blur-sm sm:px-12 sm:py-14">
          <p className="font-mono text-sm tracking-[0.3em] text-accent uppercase">
            AI-Driven Marketing
          </p>
          <h1 className="gradient-text mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
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
