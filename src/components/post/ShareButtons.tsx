"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/content";

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (params: Record<string, unknown>) => void;
      };
    };
  }
}

export default function ShareButtons({ meta }: { meta: PostMeta }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  };

  const getOgImageUrl = () => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin;
    return `${base}/api/og?title=${encodeURIComponent(meta.title)}&subtitle=${encodeURIComponent(meta.subtitle || "")}&category=${encodeURIComponent(meta.category)}`;
  };

  const shareKakao = () => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!window.Kakao || !kakaoKey) return;

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: meta.title,
        description: meta.subtitle || meta.description,
        imageUrl: getOgImageUrl(),
        link: {
          mobileWebUrl: getUrl(),
          webUrl: getUrl(),
        },
      },
      buttons: [
        {
          title: "Read",
          link: {
            mobileWebUrl: getUrl(),
            webUrl: getUrl(),
          },
        },
      ],
    });
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const shareTwitter = () => {
    const text = `${meta.title}${meta.subtitle ? ` - ${meta.subtitle}` : ""}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getUrl())}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  return (
    <div className="mt-16 mb-12 flex items-center gap-3 border-t border-border pt-8">
      <span className="text-sm text-secondary mr-2">Share</span>

      {kakaoKey && (
        <button
          onClick={shareKakao}
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
          aria-label="Share on KakaoTalk"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.726 1.8 5.117 4.506 6.47-.157.578-.57 2.093-.652 2.418-.1.399.146.394.307.287.126-.084 2.005-1.362 2.816-1.922.648.096 1.315.147 1.997.147h.053C16.497 18.091 22 14.918 22 10.691 22 6.463 17.523 3 12 3z" />
          </svg>
          KakaoTalk
        </button>
      )}

      <button
        onClick={shareLinkedIn}
        className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </button>

      <button
        onClick={shareTwitter}
        className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on X"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>

      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-accent"
        aria-label="Copy link"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        {copied ? "Copied!" : "Link"}
      </button>
    </div>
  );
}
