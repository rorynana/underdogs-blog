# Skill: Explore Solution

## Task
솔루션 프로젝트를 탐색하여 블로그 포스트용 분석 리포트를 생성한다.
solution-explorer 에이전트가 이 스킬을 참조하여 실행한다.

## Input
- 솔루션명 또는 별칭 (예: "원스톡", "SIGNAL")
- `skills/solution-registry.md`의 경로 정보

## Steps

### Step 1: 솔루션 식별
- `solution-registry.md`에서 별칭으로 대상 솔루션 매칭
- 프로젝트 루트, CLAUDE.md, MEMORY.md 경로 확인

### Step 2: 핵심 문서 분석
1. **CLAUDE.md** 전문 읽기
   - 프로젝트 개요, 아키텍처, 기술 스택
   - 현재 진행 중인 작업, 상태
   - 재시작 프로세스 등에서 맥락 파악

2. **MEMORY.md** 전문 읽기
   - Completed Tasks: 개발 히스토리
   - Key Learnings: 겪은 문제와 해결
   - 아키텍처 결정 기록
   - 디버깅에서 배운 교훈

3. **README.md** (있는 경우)
   - 공식 문서 관점의 프로젝트 설명

### Step 3: 프로젝트 구조 파악
- `ls` 로 1단계 디렉토리 구조 확인
- `package.json` 또는 `requirements.txt`로 의존성/기술 스택 확인
- 설정 파일 (`tsconfig.json`, `vite.config.ts` 등) 확인

### Step 4: 개발 히스토리 추출
- `git log --oneline -30` 으로 최근 커밋 이력 확인
- 주요 마일스톤 식별 (feat:, fix:, refactor: 등)

### Step 5: 핵심 소스 분석
- 엔트리 포인트 파일 2-3개 읽기
- 아키텍처 패턴 파악 (모듈 구조, 데이터 흐름, API 구조)

### Step 6: 분석 리포트 작성
7개 섹션의 구조화된 리포트 작성 (solution-explorer 에이전트의 출력 형식 준수)

## Output
7개 섹션의 분석 리포트:
1. 프로젝트 개요
2. 기술 스택
3. 아키텍처
4. 개발 히스토리
5. 핵심 기능 (3-5개)
6. 겪은 문제와 해결
7. 현재 상태 및 향후 계획

## Checkpoint
**★ 체크포인트 1**: 분석 리포트 요약을 사용자에게 제시.
- "이런 방향으로 포스트를 작성하려 합니다. 특별히 강조할 부분이나 빼야 할 부분이 있나요?"
- 사용자 컨펌 후 다음 스킬(draft-post)로 진행

## Exception Handling
- CLAUDE.md 없음: README.md + package.json + 코드 구조만으로 분석
- MEMORY.md 없음: CLAUDE.md만으로 분석, 히스토리는 git log에 의존
- git 이력 없음: 파일 수정 타임스탬프 기반 추정
- 프로젝트 경로 접근 불가: 사용자에게 경로 확인 요청
