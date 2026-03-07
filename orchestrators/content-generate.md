# Content Generate Orchestrator

## Role
솔루션 프로젝트를 분석하여 블로그 포스트를 자동 생성하는 오케스트레이터.
Research → Draft → Media → Finalize 사이클을 관리하며, 핵심 단계에서 사용자 컨펌을 받는다.

## Trigger
사용자가 솔루션에 대한 블로그 포스트 작성을 요청할 때 실행.
- "원스톡에 대해 포스팅해줘"
- "시그널 글 써줘"
- "올리브영 모니터링 블로그 작성"
- "튜브스카우트 소개 글"

## 참조 문서
- `skills/solution-registry.md` — 솔루션 경로 레지스트리
- `skills/explore-solution.md` — 솔루션 탐색 스킬
- `skills/learn-writing-style.md` — 톤앤매너 학습 스킬
- `skills/draft-post.md` — MDX 초안 작성 스킬
- `skills/curate-media.md` — 미디어 큐레이션 스킬
- `skills/review-post.md` — 포스트 검수 스킬
- `.claude/agents/solution-explorer.md` — 탐색 에이전트
- `.claude/agents/post-writer.md` — 작성 에이전트
- `.claude/agents/media-curator.md` — 미디어 에이전트

## Cycle

### Phase 1: Research (탐색 + 톤앤매너)

1. **솔루션 식별**
   - `skills/solution-registry.md`에서 사용자 입력과 매칭되는 솔루션 찾기
   - 프로젝트 루트, CLAUDE.md, MEMORY.md 경로 확인

2. **솔루션 탐색**
   - solution-explorer 에이전트 실행
   - `skills/explore-solution.md` 프로세스에 따라 분석 리포트 생성

3. **톤앤매너 학습** (첫 실행시만)
   - `sot/writing-style-guide.md` 존재 여부 확인
   - 없으면: `skills/learn-writing-style.md` 실행 → 스타일 가이드 생성
   - 있으면: 기존 가이드 재사용

4. **★ 체크포인트 1: 방향 컨펌**
   - 분석 리포트 요약을 사용자에게 제시
   - 포스트 방향, 강조점, slug 확인
   - 기존 stub 파일 덮어쓰기 여부 확인 (해당되는 경우)
   - 사용자 컨펌 후 Phase 2로 진행

### Phase 2: Draft (초안 작성)

1. **MDX 초안 작성**
   - post-writer 에이전트 실행
   - `skills/draft-post.md` 프로세스에 따라 작성
   - 입력: 분석 리포트 + 스타일 가이드 + 사용자 방향
   - 미디어 플레이스홀더 (`<!-- MEDIA: ... -->`) 포함

2. **★ 체크포인트 2: 초안 컨펌**
   - 초안 전문을 사용자에게 제시
   - 수정 요청 반영 (톤, 내용, 구조 등)
   - 사용자 "확정" 후 Phase 3로 진행
   - 수정이 필요하면 반영 후 재제시 (최대 2회)

### Phase 3: Media (미디어 큐레이션)

1. **스크린샷 수집**
   - media-curator 에이전트 실행
   - 솔루션 프로젝트에서 기존 스크린샷 검색
   - `public/images/posts/{slug}/` 경로로 정리

2. **GIF 검색 및 삽입**
   - 플레이스홀더의 감정/상황 키워드로 Giphy GIF 검색
   - 적합한 GIF URL 수집

3. **플레이스홀더 교체**
   - 모든 `<!-- MEDIA: ... -->` → 실제 이미지/GIF 경로로 교체

### Phase 4: Finalize (검수 및 완료)

1. **기술 검수**
   - `skills/review-post.md` 체크리스트 실행
   - frontmatter, MDX 문법, 이미지 경로, 분량 검증

2. **빌드 테스트**
   - `pnpm build` 실행하여 에러 없음 확인

3. **SOT 업데이트**
   - `sot/content-generation-log.md`에 결과 기록

4. **완료 알림**
   - 생성된 파일 경로
   - `pnpm dev` 후 확인할 URL

## Completion Criteria
- MDX 파일이 `content/ai-systems/{slug}.mdx`에 존재
- frontmatter 필수 필드 모두 유효
- 이미지/GIF 최소 4개 삽입
- `pnpm build` 에러 없이 통과
- `sot/content-generation-log.md`에 DONE 기록

## Error Recovery
- Phase 2 실패 (글 품질 미달): 분석 리포트 보충 후 재작성
- Phase 3 실패 (스크린샷 없음): 사용자에게 스크린샷 제공 요청, GIF 비율 높이기
- Phase 4 실패 (빌드 에러): 에러 원인 분석 후 MDX 수정 (최대 2회)
