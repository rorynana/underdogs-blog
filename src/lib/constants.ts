export const SITE = {
  name: "The Underdogs",
  title: "The Underdogs — AI Driven Marketing Systems",
  description: "Building intelligent marketing systems that automate decisions, not just tasks.",
  author: "Seongyun Jang",
} as const;

export const NAV_ITEMS = [
  { label: "Marketing", href: "/marketing" },
  { label: "AI & Systems", href: "/ai-systems" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const CATEGORIES = [
  {
    label: "Marketing",
    abbr: "MKT",
    slug: "marketing",
    href: "/marketing",
    description: "퍼포먼스 마케팅, 전략, 광고 운영 실무",
  },
  {
    label: "AI & Systems",
    abbr: "AI",
    slug: "ai-systems",
    href: "/ai-systems",
    description: "AI 에이전트, 자동화 시스템 구축기",
  },
  {
    label: "Insights",
    abbr: "INS",
    slug: "insights",
    href: "/insights",
    description: "시장분석, 업계 뉴스와 아티클 해석",
  },
] as const;
