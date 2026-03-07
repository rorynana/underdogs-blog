# Skill: Review Post

## Task
생성된 MDX 포스트의 기술적 품질을 검증한다.
사용자 컨펌은 체크포인트 2에서 완료되었으므로, 여기서는 기술 검수만 수행한다.

## Input
- 미디어 삽입이 완료된 MDX 파일 경로 (`content/ai-systems/{slug}.mdx`)

## Checklist

### 1. Frontmatter 검증
- [ ] `title` 존재 및 비어있지 않음
- [ ] `description` 존재 및 비어있지 않음
- [ ] `category` 값이 유효함 ("marketing" | "ai-systems" | "insights")
- [ ] `date` 형식이 "YYYY-MM-DD"
- [ ] `techStack` 배열이 비어있지 않음 (최소 3개)
- [ ] `featured` boolean 값

### 2. MDX 문법 검증
- [ ] `<` 문자가 JSX로 해석되지 않도록 escape 처리 (`&lt;` 또는 코드 블록 내)
- [ ] 코드 블록에 언어 지정 (```typescript, ```python 등)
- [ ] HTML 태그 사용 시 닫는 태그 존재
- [ ] 이모티콘에 `<` 포함 여부 확인 (예: `>_<` → `&gt;\_&lt;`)

### 3. 이미지 경로 검증
- [ ] 로컬 이미지 경로가 `public/` 하위에 실제 존재
- [ ] 이미지 파일 확장자 유효 (png, jpg, jpeg, gif, webp, svg)
- [ ] 외부 GIF URL 접근 가능 여부 (Giphy URL 형식 확인)
- [ ] 모든 이미지에 alt 텍스트 존재

### 4. 콘텐츠 품질
- [ ] 최소 분량 1500자 (코드 블록 제외)
- [ ] 5개 섹션 구조 (Problem, System, Implementation, Result, Insight)
- [ ] 코드 블록 최소 1개 포함
- [ ] 미디어 최소 4개 포함
- [ ] `<!-- MEDIA: -->` 플레이스홀더 잔존 없음

### 5. 빌드 테스트
- [ ] `pnpm build` 실행 → 에러 없이 완료
- [ ] 해당 slug 페이지가 SSG 목록에 포함됨

## Output
- **PASS**: 모든 체크리스트 통과 → `sot/content-generation-log.md`에 DONE 기록
- **FAIL**: 실패 항목 + 구체적 사유 목록 → 해당 스킬 재실행 지시

## Exception Handling
- frontmatter 필드 누락: 자동 보정 시도 (기본값 삽입)
- 빌드 실패: 에러 메시지 분석 후 MDX 수정
- 이미지 경로 오류: 경로 수정 또는 해당 이미지 제거
- `<` 문자 escape 누락: 자동 escape 처리
