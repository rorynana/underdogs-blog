# Skill: Curate Media

## Task
블로그 포스트에 삽입할 스크린샷을 수집하고 Giphy GIF를 검색하여 글에 배치한다.
media-curator 에이전트가 이 스킬을 참조하여 실행한다.

## Input
- 확정된 MDX 파일 경로 (`content/ai-systems/{slug}.mdx`)
- 솔루션 프로젝트 루트 경로 (solution-registry.md 참조)
- MDX 내 `<!-- MEDIA: ... -->` 플레이스홀더 목록

## Step 1: 이미지 디렉토리 준비

```bash
mkdir -p public/images/posts/{slug}/
```

## Step 2: 스크린샷 수집

### 2-1. 프로젝트 내 기존 이미지 검색
솔루션 프로젝트 루트에서 이미지 파일 검색:
- `screenshots/`, `docs/`, `public/`, `assets/`, `images/` 디렉토리
- 확장자: `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.svg`

### 2-2. 이미지 선별
MDX의 플레이스홀더와 매칭되는 이미지 선별:
- `<!-- MEDIA: 서비스 메인 화면 -->` → 메인 대시보드/홈 화면
- `<!-- MEDIA: 기능 동작 화면 -->` → 핵심 기능 캡처
- `<!-- MEDIA: 아키텍처 구조도 -->` → 다이어그램, 플로우차트
- `<!-- MEDIA: 운영 데이터 -->` → 차트, 통계 화면

### 2-3. 파일 정리
- 선별된 이미지를 `public/images/posts/{slug}/`로 복사
- 순번 + 설명으로 파일명 정리: `01-dashboard.png`, `02-architecture.png`

### 2-4. 스크린샷 부족 시
- 사용자에게 라이브 서비스 스크린샷 제공 요청
- 프로젝트 README의 이미지가 있으면 활용
- 최소한 1-2개의 스크린샷은 확보

## Step 3: Giphy GIF 검색

### 3-1. 플레이스홀더에서 키워드 추출
MDX에서 `<!-- MEDIA: 리액션 GIF - {감정} -->` 패턴을 파싱하여 검색 키워드 결정.

### 3-2. GIF 검색
WebSearch로 Giphy에서 적합한 GIF 검색:
```
검색 쿼리: "site:giphy.com {keyword} gif"
```

감정별 추천 키워드:
| 감정/상황 | 영문 키워드 | 대안 키워드 |
|----------|-----------|-----------|
| 좌절/절망 | frustrated developer | facepalm, why god |
| 혼란/당황 | confused gif | what is happening |
| 성공/해냄 | celebration gif | nailed it, victory |
| 복잡한 기술 | mind blown | matrix, hackerman |
| 반복 작업 | typing fast | robot working |
| 기대/설렘 | excited gif | lets go, ready |
| 뿌듯함 | proud moment | satisfied, chef kiss |
| 고양이 타이핑 | cat typing | cat computer |

### 3-3. GIF 선택 기준
- 밈으로서 유머 포인트가 있는 것
- 개발자/마케터가 공감할 수 있는 리액션
- 짧은 길이 (3-5초)
- Giphy 공식 URL 사용 (media.giphy.com)

## Step 4: 플레이스홀더 교체

MDX 파일에서 각 `<!-- MEDIA: ... -->` 를 실제 이미지/GIF로 교체:

### 스크린샷 교체
```markdown
<!-- 이전 -->
<!-- MEDIA: 서비스 메인 화면 스크린샷 -->

<!-- 이후 -->
![ONE STOCK 메인 대시보드](/images/posts/{slug}/01-dashboard.png)
```

### GIF 교체
```markdown
<!-- 이전 -->
<!-- MEDIA: 리액션 GIF - 좌절 -->

<!-- 이후 -->
![좌절하는 개발자](https://media.giphy.com/media/xxxxx/giphy.gif)
```

## 배치 규칙

### 수량 가이드
- 스크린샷: 3-5개
- GIF: 2-3개
- 전체: 최소 4개, 최대 8개

### 배치 원칙
- 텍스트만 3문단 이상 연속되면 중간에 미디어 배치
- 스크린샷과 GIF를 교차 배치 (스크린샷-텍스트-GIF-텍스트-스크린샷)
- 코드 블록 바로 위/아래에는 미디어 넣지 않음
- 섹션 시작 직후보다는 내용 중간에 배치

## Output
- `public/images/posts/{slug}/` 디렉토리에 스크린샷 정리 완료
- MDX 파일의 모든 `<!-- MEDIA: ... -->` 플레이스홀더가 실제 이미지/GIF로 교체됨
- 각 이미지에 한글 alt 텍스트 작성 완료

## Exception Handling
- 프로젝트에 스크린샷이 전혀 없는 경우: 사용자에게 요청, GIF 비율 높이기
- Giphy 검색 결과 부적합: 키워드 변경하여 재검색
- 이미지 URL 깨짐: WebFetch로 접근 가능 여부 확인
