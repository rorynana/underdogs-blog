# Decisions Log

## 2026-03-07: 기술 스택 확정
- **결정**: Next.js 14 (App Router) + MDX + Tailwind CSS + pnpm
- **이유**: 기술 블로그 포지셔닝에 최적, SSG 성능, Vercel 무료 배포
- **대안 검토**: Astro (블로그 특화지만 인터랙티브 제한), WordPress (PRD 명시지만 기술 블로그 이미지 부적합)

## 2026-03-07: 패키지 매니저
- **결정**: pnpm
- **이유**: 빠른 설치, 디스크 효율적

## 2026-03-07: 오케스트레이션 구조
- **결정**: orchestrators/ -> skills/ -> sot/ 구조 적용
- **이유**: 체계적 Task 관리, 리서치-실행-리뷰 사이클
