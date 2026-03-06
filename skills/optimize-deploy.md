# Skill: Optimize & Deploy

## Task
SEO 최적화 및 Vercel 배포

## SEO
- next-sitemap 설정
- 각 페이지 metadata (title, description, og:image)
- 핵심 키워드: AI marketing, marketing automation, marketing intelligence, data driven marketing

## Performance
- 목표: Page load < 2 seconds, Lighthouse > 90
- 이미지: next/image + WebP 자동 변환
- SSG: 정적 생성으로 최대 성능

## Deploy
1. Vercel 프로젝트 연결
2. 환경변수 설정 (필요 시)
3. 빌드 검증: pnpm build
4. 커스텀 도메인 연결 (선택)

## Exception Handling
- sitemap 생성 실패: next-sitemap.config.js 검증
- og:image 경로 오류: 절대 경로 확인
- 빌드 실패: TypeScript 에러, 의존성 누락 체크
