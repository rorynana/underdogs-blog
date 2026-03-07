export const metadata = {
  title: "About — The Underdogs",
  description: "AI Driven Marketing Operator",
};

const SKILLS = [
  "AI Marketing Systems Design",
  "Marketing Data Analysis & Automation",
  "Influencer Marketing Strategy",
  "Growth Marketing & Performance Optimization",
];

const TIMELINE = [
  { label: "Systems Built", value: "3+" },
  { label: "Focus Area", value: "AI & Data" },
  { label: "Approach", value: "Systems-first" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">About</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Operator Profile</h1>

      <div className="gradient-line mt-10 mb-12" />

      <div className="grid gap-16 lg:grid-cols-5">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-8">
          <p className="text-2xl font-semibold leading-snug">
            AI Driven Marketing Operator
          </p>
          <p className="leading-relaxed text-secondary">
            AI 기반 마케팅 시스템을 설계하고 구축하는 마케터입니다.
            데이터와 자동화를 활용해 마케팅 운영의 효율을 극대화하는 것을 목표로 합니다.
          </p>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Philosophy
            </h2>
            <p className="mt-3 leading-relaxed text-secondary">
              마케팅은 감이 아닌 시스템이다.
              반복적인 작업은 자동화하고, 의사결정은 데이터에 기반하며,
              시스템으로 확장 가능한 마케팅을 구축한다.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Core Skills
            </h2>
            <ul className="mt-4 space-y-3">
              {SKILLS.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-secondary">
                  <span className="h-px w-4 bg-accent" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats sidebar */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface/30 p-8 space-y-8">
            {TIMELINE.map((item) => (
              <div key={item.label}>
                <p className="font-mono text-xs tracking-wider text-accent/60 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
