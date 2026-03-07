"use client";

import { usePathname } from "next/navigation";

export default function GlowOrbs() {
  const pathname = usePathname();
  const isPost = /^\/(marketing|ai-systems|insights)\/.+/.test(pathname);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className={isPost ? "glow-orb-purple glow-orb-dim" : "glow-orb-purple"} />
      <div className={isPost ? "glow-orb-cyan glow-orb-dim" : "glow-orb-cyan"} />
    </div>
  );
}
