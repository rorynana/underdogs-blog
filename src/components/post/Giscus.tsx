"use client";

import { useEffect, useRef } from "react";

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "rorynana/underdogs-blog");
    script.setAttribute("data-repo-id", "R_kgDORgQUbw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDORgQUb84C34BS");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "dark_dimmed");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="mt-10 pt-10 sm:mt-16 sm:pt-16 border-t border-white/10" />;
}
