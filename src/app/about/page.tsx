import Link from "next/link";

export const metadata = {
  title: "About — The Underdogs",
  description: "AI Driven Marketing Operator — 장성윤",
};

const SYSTEMS = [
  {
    name: "ONE STOCK",
    desc: "ERP 위에 AI를 얹었다",
    detail: "이카운트 ERP + MCP로 만든 생산 인텔리전스",
    tech: ["React", "Express", "SQLite", "Gemini"],
    link: "/ai-systems/onestock-ai-production-intelligence",
  },
  {
    name: "SIGNAL",
    desc: "매출 리포트, 14일 만에 자동화했다",
    detail: "49개 채널 6개국 데이터를 한 화면에",
    tech: ["React", "Vite", "Playwright", "Gemini"],
    link: "/ai-systems/marketing-intelligence-dashboard",
  },
  {
    name: "TubeScout",
    desc: "인플루언서, 감이 아닌 점수로",
    detail: "유튜브 채널 스코어링 크롬 확장",
    tech: ["TypeScript", "YouTube API", "Chrome MV3"],
    link: "/ai-systems/tubescout-youtube-creator-scoring",
  },
  {
    name: "OY Monitor",
    desc: "올리브영 경쟁사 모니터링, 자동화한 이야기",
    detail: "매일 아침 9시, 경쟁사 동향이 Teams로",
    tech: ["Python", "Selenium", "GitHub Actions"],
    link: "/ai-systems/market-monitoring-automation",
  },
];

const TOOLS = [
  { name: "Claude Code", role: "백엔드 담당", color: "text-accent" },
  { name: "Gemini", role: "프론트엔드 담당", color: "text-[#4ADE80]" },
  { name: "Python", role: "데이터 파이프라인", color: "text-[#3776AB]" },
  { name: "React / Next.js", role: "UI 시스템", color: "text-[#61DAFB]" },
  { name: "Playwright", role: "크롤링 & 테스트", color: "text-[#D45349]" },
  { name: "Google Sheets", role: "경량 DB 대체", color: "text-[#34A853]" },
];

const BELIEFS = [
  {
    title: "시스템이 감을 이긴다",
    desc: "반복적인 판단은 시스템에 맡기고, 사람은 시스템이 못하는 판단에 집중한다.",
  },
  {
    title: "병목을 발견하면 참지 못한다",
    desc: "누가 시키지 않아도, 비효율을 보면 진단하고 설계하고 구현한다.",
  },
  {
    title: "설계가 코드보다 중요하다",
    desc: "AI가 코드를 대신 짜주는 시대. 뭘 만들지 정의하는 게 진짜 역량이다.",
  },
];

const CONTACT = {
  email: "your@email.com",
  kakao: "https://open.kakao.com/o/your-link",
  github: "https://github.com/rorynana",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-24">
      {/* Hero */}
      <section>
        <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
          About
        </p>
        <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
          마케터가 왜<br />시스템을 만드는가?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-secondary max-w-2xl">
          매일 반복되는 엑셀 작업, 채널별로 흩어진 데이터, 감에 의존하는 의사결정.
          이게 마케팅의 현실이라면, 바꿀 수 있는 건 시스템뿐이라고 생각했다.
        </p>
      </section>

      <div className="gradient-line mt-12 mb-16" />

      {/* Who I Am */}
      <section>
        <div className="flex items-baseline gap-4">
          <h2 className="text-2xl font-bold">장성윤</h2>
          <span className="text-sm text-secondary">AI Driven Marketing Operator</span>
        </div>
        <p className="mt-4 leading-relaxed text-secondary">
          비개발자 마케터입니다. 코드를 한 줄 한 줄 직접 짜는 사람은 아닙니다.
          대신, 실무에서 병목을 발견하면 PRD를 쓰고, 아키텍처를 설계하고,
          AI 에이전트에게 구현을 시킵니다. 그렇게 만든 시스템이 4개.
          현재 8개 MCN과 협업하며 인플루언서 마케팅과 퍼포먼스 마케팅을 운영하고 있습니다.
        </p>
      </section>

      {/* Beliefs */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          What I Believe
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BELIEFS.map((b) => (
            <div
              key={b.title}
              className="rounded-xl border border-border bg-surface/30 p-6 transition-all hover:border-accent/20 hover:-translate-y-1"
            >
              <p className="font-bold">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Tools I Use
        </h2>
        <p className="mt-3 text-sm text-secondary">
          AI 에이전트를 동료 개발자처럼 씁니다.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="rounded-lg border border-border bg-surface/20 px-4 py-3 transition-all hover:border-accent/20"
            >
              <p className={`font-mono text-sm font-semibold ${tool.color}`}>
                {tool.name}
              </p>
              <p className="mt-1 text-xs text-secondary">{tool.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Systems */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Systems I Built
        </h2>
        <p className="mt-3 text-sm text-secondary">
          전부 실무에서 직접 설계하고 운영 중인 시스템입니다.
        </p>
        <div className="mt-6 space-y-4">
          {SYSTEMS.map((sys) => (
            <Link
              key={sys.name}
              href={sys.link}
              className="group flex items-start justify-between rounded-xl border border-border bg-surface/30 p-6 transition-all hover:border-accent/30 hover:bg-surface/50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold group-hover:text-accent transition-colors">
                    {sys.name}
                  </p>
                </div>
                <p className="mt-1 text-sm text-secondary">{sys.desc}</p>
                <p className="mt-1 text-xs text-secondary/60">{sys.detail}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sys.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[10px] text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <svg
                className="mt-1 h-5 w-5 flex-shrink-0 text-secondary/30 transition-all group-hover:text-accent group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-16">
        <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          Contact
        </h2>
        <p className="mt-3 text-sm text-secondary">
          프로젝트 협업, 시스템 구축 문의, 커피챗 모두 환영합니다.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <a
            href={`mailto:${CONTACT.email}`}
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 transition-all hover:border-accent/30 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold group-hover:text-accent transition-colors">Email</p>
              <p className="text-xs text-secondary">{CONTACT.email}</p>
            </div>
          </a>

          <a
            href={CONTACT.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 transition-all hover:border-[#FEE500]/30 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FEE500]/10">
              <svg className="h-5 w-5 text-[#FEE500]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.724 1.8 5.113 4.508 6.459-.199.735-.72 2.666-.826 3.078-.13.506.186.499.39.363.16-.107 2.554-1.737 3.592-2.442.757.112 1.538.171 2.336.171 5.523 0 10-3.463 10-7.691S17.523 3 12 3z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold group-hover:text-[#FEE500] transition-colors">카카오톡 문의</p>
              <p className="text-xs text-secondary">오픈채팅으로 연락주세요</p>
            </div>
          </a>

          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-xl border border-border bg-surface/30 px-5 py-4 transition-all hover:border-white/20 hover:bg-surface/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/5">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold group-hover:text-white transition-colors">GitHub</p>
              <p className="text-xs text-secondary">rorynana</p>
            </div>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
        <p className="text-lg font-bold">더 자세한 이야기가 궁금하다면</p>
        <p className="mt-2 text-sm text-secondary">
          각 시스템의 설계 과정, 기술적 결정, 실무 결과를 포스트로 정리했습니다.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/ai-systems"
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent/80"
          >
            AI & Systems 보기
          </Link>
          <Link
            href="/marketing"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-secondary transition-all hover:border-accent/30 hover:text-white"
          >
            Marketing 보기
          </Link>
          <Link
            href="/insights"
            className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold text-secondary transition-all hover:border-accent/30 hover:text-white"
          >
            Insights 보기
          </Link>
        </div>
      </section>

      {/* Footer note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-secondary/60">
          이 블로그의 모든 포스트는 실제 업무에서 구축한 시스템을 기반으로 작성되었습니다.
        </p>
      </div>
    </div>
  );
}
