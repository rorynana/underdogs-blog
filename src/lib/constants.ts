export const SITE = {
  name: "The Underdogs",
  title: "The Underdogs — AI Driven Marketing Systems",
  description: "Building AI systems for marketing operators",
  author: "Seongyun Jang",
} as const;

export const NAV_ITEMS = [
  { label: "Systems", href: "/systems" },
  { label: "Experiments", href: "/experiments" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
] as const;

export const FEATURED_SYSTEMS = [
  {
    title: "Marketing Intelligence Dashboard",
    description: "Ad data, sales data, channel data를 통합한 실시간 마케팅 대시보드",
    techStack: ["Python", "Google Sheets", "Automation"],
    slug: "marketing-intelligence-dashboard",
  },
  {
    title: "Creator Scoring Algorithm",
    description: "유튜버 분석 알고리즘 기반 인플루언서 선별 자동화 시스템",
    techStack: ["Python", "Data Analysis", "API"],
    slug: "creator-scoring-algorithm",
  },
  {
    title: "Market Monitoring Automation",
    description: "경쟁 제품 모니터링 및 크롤링 기반 마케팅 인텔리전스 시스템",
    techStack: ["Python", "Crawling", "Automation"],
    slug: "market-monitoring-automation",
  },
] as const;
