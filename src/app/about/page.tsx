export const metadata = {
  title: "About — The Underdogs",
  description: "AI Driven Marketing Operator",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-4xl font-bold">About</h1>
      <div className="mt-10 space-y-6 text-secondary leading-relaxed">
        <p className="text-xl text-white">
          AI Driven Marketing Operator
        </p>
        <p>
          AI 기반 마케팅 시스템을 설계하고 구축하는 마케터입니다.
          데이터와 자동화를 활용해 마케팅 운영의 효율을 극대화하는 것을 목표로 합니다.
        </p>
        <h2 className="pt-4 text-2xl font-semibold text-white">Core Skills</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>AI Marketing Systems Design</li>
          <li>Marketing Data Analysis & Automation</li>
          <li>Influencer Marketing Strategy</li>
          <li>Growth Marketing & Performance Optimization</li>
        </ul>
        <h2 className="pt-4 text-2xl font-semibold text-white">Philosophy</h2>
        <p>
          마케팅은 감이 아닌 시스템이다.
          반복적인 작업은 자동화하고, 의사결정은 데이터에 기반하며,
          시스템으로 확장 가능한 마케팅을 구축한다.
        </p>
      </div>
    </div>
  );
}
