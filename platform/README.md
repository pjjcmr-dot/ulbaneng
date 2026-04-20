# 도시계획기술사 기출문제 플랫폼 (130~138회)

기술사 130~138회 전 기출문제·답안·출제경향 분석을 제공하는 **React 기반 정적 SPA**입니다.

## 📊 프로젝트 현황

| 항목 | 수량 | 상태 |
|---|---|---|
| 수록 회차 | 130~138회 (9회) | ✅ |
| 총 기출문제 | **279문제** | ✅ 100% |
| 핵심요약형 답안 | **279개** | ✅ 100% |
| 심화 에세이 답안 (v1) | **279개** | ✅ 100% |
| 심화 에세이 답안 (v2 — 기술사 답안지 표준) | **136·137·138회 93개** | 🟢 진행 중 |
| 출제경향 분석 (키워드·법령·주제·추이) | — | ✅ |

## 🏗️ 프로젝트 구조

```
platform/                               # ⭐ 프로젝트 루트 (바로 여기서 npm run dev)
├── README.md                           # 본 문서
├── package.json
├── package-lock.json
├── vite.config.js                      # @data alias → ./src/data
├── index.html
├── .gitignore
├── public/
└── src/
    ├── main.jsx                        # 진입점
    ├── App.jsx                         # 라우팅·네비게이션
    ├── styles.css                      # 전역 스타일
    ├── data/                           # ⭐ 핵심 데이터 (정적 JSON)
    │   ├── questions.json              # 279문제 메타·키워드
    │   ├── answers-summary.json        # 279문제 요약답안
    │   ├── answers-detailed.json       # 279문제 심화답안 (v1)
    │   ├── answers-detailed-v2-136.json   # 136회 기술사 표준 답안
    │   ├── answers-detailed-v2-137.json   # 137회 기술사 표준 답안
    │   ├── answers-detailed-v2-138.json   # 138회 기술사 표준 답안
    │   └── analysis.json               # 출제경향 분석
    ├── utils/
    │   ├── data-core.js                # 코어 데이터 (answers 제외)
    │   └── data.js                     # 전체 데이터 로더 + v2 override
    ├── components/
    │   └── AnswerView.jsx              # 답안 탭 뷰어
    └── pages/
        ├── HomePage.jsx                # 홈 (통계·TOP 키워드)
        ├── RoundsPage.jsx              # 회차 목록
        ├── RoundDetailPage.jsx         # 회차별 4교시 문제
        ├── QuestionPage.jsx            # 문제별 답안 (요약/심화 탭)
        ├── TrendPage.jsx               # 출제경향 차트
        └── SearchPage.jsx              # 검색·필터 (URL 상태 유지)
```

### 아키텍처 특징
- **백엔드 없음** — 모든 데이터가 JSON으로 빌드 번들에 포함되는 **순수 정적 SPA**
- **단일 프로젝트 루트** — `platform/`에서 바로 `npm run dev`·`npm run build`
- **데이터 용량** — 약 2MB (JSON 전체), 빌드 시 코드 스플리팅으로 청크 분리
- **회원가입·인증·유저 데이터 없음** — 지식 공유·시험 공부 전용

## 🚀 로컬 실행

### 1. 의존성 설치 (처음 한 번)
```bash
cd platform
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저 접속
**http://localhost:5173** 으로 접속하면 플랫폼이 열립니다.

## 🏭 정적 빌드 (배포용)

### 빌드 명령
```bash
cd platform
npm run build
```
결과물: `platform/dist/` 폴더

### 빌드 결과 미리보기
```bash
npm run preview        # 포트 4173
```

### 배포 방법 — 무료 CDN 호스팅 추천

`dist/` 폴더의 내용을 그대로 업로드하면 됩니다:

| 서비스 | 방법 | 비용 |
|---|---|---|
| **GitHub Pages** | `dist/` → `gh-pages` 브랜치 푸시 | 무료 |
| **Netlify** | `dist/` 폴더 드래그 앤 드롭 또는 Git 연동 | 무료 |
| **Vercel** | 프로젝트 연결 / build command: `npm run build`, output: `dist` | 무료 |
| **Cloudflare Pages** | Git 연동 / build command: `npm run build`, output: `dist` | 무료·무제한 대역폭 |
| **S3 + CloudFront** | `aws s3 sync dist/ s3://your-bucket/ --delete` | 종량제 |
| **자체 서버(nginx)** | `dist/` 내용을 web root에 복사 | — |

### nginx 배포 예시
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/ulbaneng-platform;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # SPA fallback
    }
}
```

## 📱 주요 페이지

| 경로 | 화면 |
|---|---|
| `/` | 홈 — 총 문제 수·요약/심화 답안 수·회차 바로가기·TOP 키워드·핵심 법령 |
| `/rounds` | 9개 회차 그리드·회차별 주제 요약 |
| `/rounds/:round` | 회차 내 4교시별 문제 목록·답안 작성 상태 표시 |
| `/questions/:id` | 문제 본문·답안 (요약/심화 탭)·같은 교시 다른 문제 링크 |
| `/trends` | 출제경향 분석 차트 (Recharts) — 키워드·법령·주제·회차별 추이·교시별 분포 |
| `/search` | 키워드·본문·ID 검색 + 회차·교시·유형 필터 (URL 상태 유지) |

## 🛠️ 기술 스택

- **Frontend**: React 18, React Router 6, Vite 5, Recharts 2 (차트)
- **Data**: 정적 JSON (총 ~2MB, 정적 빌드 시 번들에 포함)
- **스타일**: 순수 CSS (Pretendard/Noto Sans KR 폰트)
- **반응형**: 1024px / 768px / 480px 브레이크포인트
- **코드 스플리팅**: vendor-react·vendor-charts·data-* 청크 분리

## 📝 데이터 출처

- **한국산업인력공단** 공식 공개 기출문제 130~138회.
- 답안은 관련 법령·지침·판례·학술자료·실무 가이드라인 기반의 **수험 참고용 해설**입니다.
- **공식 정답이 아니며**, 법령 개정에 따라 내용이 달라질 수 있으므로 최신 법령을 함께 확인하시기 바랍니다.

## 🤝 기여 방법

1. `src/data/answers-summary.json` 또는 `answers-detailed.json`에 답안 보완.
2. `src/data/answers-detailed-v2-*.json`에 기술사 표준 답안지 형식으로 회차별 심화 답안 추가.
3. `src/data/analysis.json`에 새로운 분석 축 추가.
4. `src/components/`·`pages/`에 새 UI 컴포넌트 추가.
5. 실행 확인 후 커밋.

## 🐛 트러블슈팅

### Frontend가 5173이 아닌 5174로 뜸
→ 5173 포트를 이미 사용 중인 프로세스가 있습니다. 해당 프로세스를 종료 후 다시 `npm run dev`를 실행하거나, 5174로 그대로 사용하셔도 무방합니다.

### 정적 빌드 후 페이지 새로고침 시 404
→ SPA 라우팅 때문입니다. 배포 서버에서 **fallback을 `index.html`로 설정**해야 합니다 (위 nginx 예시 참조).

## 📄 라이선스

개인 학습·수험 목적 사용. 상업적 재배포는 데이터 출처 고지 의무가 있습니다.

---

**제작:** 도시계획기술사 수험 준비 프로젝트
**답안 규모:** 279문제 × 요약/심화 2형식 + v2 기술사 표준 답안 93개 추가
