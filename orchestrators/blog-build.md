# Blog Build Orchestrator

## Role
전체 블로그 프로젝트 빌드를 관리하는 메인 오케스트레이터.
리서치 -> 실행 -> 리뷰 사이클을 반복하며 Task를 순차 실행한다.

## Cycle

### 1. Research
- PRD(guide.md) 분석
- 기술 스택 결정: Next.js 14 + MDX + Tailwind CSS + pnpm
- 폴더 구조 확정

### 2. Execute
Task 순서대로 스킬을 호출한다.

| Task | Skill | 설명 |
|------|-------|------|
| Task 1 | skills/setup-project.md | 프로젝트 초기 세팅 |
| Task 2 | skills/build-layout.md | 레이아웃 & 네비게이션 |
| Task 3 | skills/build-pages.md | HOME 페이지 |
| Task 4 | skills/build-components.md | MDX 콘텐츠 시스템 |
| Task 5 | skills/build-pages.md | 카테고리 페이지 |
| Task 6 | skills/build-pages.md | About 페이지 |
| Task 7 | skills/optimize-deploy.md | SEO & 성능 최적화 |
| Task 8 | skills/optimize-deploy.md | 배포 |

### 3. Review
각 Task 완료 시:
- sot/progress.md 상태 업데이트
- sot/review-log.md에 리뷰 결과 기록
- 이슈 발견 시 해당 스킬 재실행
- 통과 시 다음 Task 진행

## Completion Criteria
- 모든 Task DONE 상태
- pnpm dev로 로컬 서버 정상 실행
- Lighthouse Performance > 90
- 모든 페이지 네비게이션 정상
