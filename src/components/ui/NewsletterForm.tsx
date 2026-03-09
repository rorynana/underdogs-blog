"use client";

import { useState } from "react";

const USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!USERNAME) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${USERNAME}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `email=${encodeURIComponent(email)}&embed=1`,
        }
      );
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-accent/5 px-6 py-8 sm:px-10 sm:py-10">
        <div className="cyber-corner cyber-corner-tl" style={{ borderColor: "#5B8CFF" }} />
        <div className="cyber-corner cyber-corner-br" style={{ borderColor: "#5B8CFF" }} />
        <span className="section-label">Newsletter</span>
        <p className="mt-3 text-lg font-bold">시스템이 업데이트되면 먼저 알려드립니다</p>
        <p className="mt-1 text-sm text-secondary">
          새 포스트, 시스템 론칭, 실무 인사이트를 이메일로 받아보세요.
        </p>
        {status === "success" ? (
          <p className="mt-6 font-mono text-sm text-green-400">
            {">"} 구독이 완료됐습니다. 확인 이메일을 보내드렸습니다.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 rounded-lg border border-border bg-surface/30 px-4 py-2.5 font-mono text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-accent/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-bold text-white transition-all hover:bg-accent/80 disabled:opacity-50"
            >
              {status === "loading" ? "..." : "SUBSCRIBE"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 font-mono text-xs text-red-400">
            {">"} ERROR: 잠시 후 다시 시도해주세요.
          </p>
        )}
      </div>
    </section>
  );
}
