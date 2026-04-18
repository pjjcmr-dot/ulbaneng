# 도시계획기술사 기출문제 플랫폼 (130~138회)

기술사 130~138회 전 기출문제·답안·출제경향 분석을 제공하는 **React + Node.js 기반 웹 플랫폼**입니다.

## 📊 프로젝트 현황

| 항목 | 수량 | 상태 |
|---|---|---|
| 수록 회차 | 130~138회 (9회) | ✅ |
| 총 기출문제 | **279문제** | ✅ 100% |
| 핵심요약형 답안 | **279개** | ✅ 100% |
| 심화 에세이 답안 | **279개** | ✅ 100% |
| 출제경향 분석 (키워드·법령·주제·추이) | — | ✅ |

## 🏗️ 프로젝트 구조

```
platform/
├── README.md                      # 본 문서
├── backend/                       # Express API 서버 (포트 4000)
│   ├── package.json
│   ├── server.js                  # API 라우트
│   └── .gitignore
└── frontend/                      # React + Vite (포트 5173)
    ├── package.json
    ├── vite.config.js             # @data alias → ./src/data
    ├── index.html
    ├── .gitignore
    └── src/
        ├── main.jsx               # 진입점
        ├── App.jsx                # 라우팅·네비게이션
        ├── styles.css             # 전역 스타일
        ├── data/                  # ⭐ 핵심 데이터
        │   ├── questions.json     # 279문제 메타·키워드
        │   ├── answers-summary.json   # 279문제 요약답안
        │   ├── answers-detailed.json  # 279문제 심화답안
        │   └── analysis.json      # 출제경향 분석
        ├── utils/
        │   └── data.js            # 데이터 loader
        ├── components/
        │   └── AnswerView.jsx     # 답안 탭 뷰어
        └── pages/
            ├── HomePage.jsx       # 홈 (통계·TOP 키워드)
            ├── RoundsPage.jsx     # 회차 목록
            ├── RoundDetailPage.jsx # 회차별 4교시 문제
            ├── QuestionPage.jsx   # 문제별 답안 (요약/심화 탭)
            ├── TrendPage.jsx      # 출제경향 차트
            └── SearchPage.jsx     # 검색·필터
```

## 🚀 로컬 실행

### 1. 의존성 설치 (처음 한 번)

```bash
# 프로젝트 루트에서
cd platform/backend
npm install

cd ../frontend
npm install
```

### 2. 개발 서버 실행

**두 개의 터미널을 열어 각각 실행합니다.**

```bash
# 터미널 1 — Backend (포트 4000)
cd platform/backend
npm run dev

# 터미널 2 — Frontend (포트 5173)
cd platform/frontend
npm run dev
```

### 3. 브라우저 접속

**http://localhost:5173** 으로 접속하면 플랫폼이 열립니다.

- Frontend `vite.config.js`에 proxy 설정이 있어 `/api/*` 요청은 자동으로 `http://localhost:4000`(backend)으로 전달됩니다.
- Backend는 로드 시 `279문제 / 요약 279 / 심화 279` 메시지를 출력하면 정상 기동입니다.

## 🏭 정적 빌드 (배포용)

Frontend는 데이터를 `src/data/`에서 정적 import하므로 **백엔드 없이도 완전히 동작**하는 정적 사이트 빌드가 가능합니다.

### 빌드 명령

```bash
cd platform/frontend
npm run build
```

결과물: `platform/frontend/dist/` 폴더

### 빌드 결과 미리보기

```bash
cd platform/frontend
npm run preview        # 포트 4173
```

### 배포 방법

`dist/` 폴더의 내용을 아래 서비스에 그대로 업로드하면 됩니다:

| 서비스 | 방법 |
|---|---|
| **GitHub Pages** | `dist/` → `gh-pages` 브랜치에 푸시 |
| **Netlify** | `dist/` 폴더 드래그 앤 드롭 |
| **Vercel** | 프로젝트 연결 후 build command: `npm run build`, output: `dist` |
| **S3 + CloudFront** | `aws s3 sync dist/ s3://your-bucket/ --delete` |
| **자체 서버(nginx)** | `dist/` 내용을 web root에 복사 |

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

## 🌐 API 엔드포인트 (Backend)

Backend 서버는 다음 REST API를 제공합니다:

| Method | Endpoint | 설명 |
|---|---|---|
| GET | `/api/health` | 서버 상태 확인 |
| GET | `/api/meta` | 메타정보 (회차·총 문제 수) |
| GET | `/api/questions` | 전 문제 목록 (round/session/keyword 필터 가능) |
| GET | `/api/questions/:id` | 특정 문제 (요약+심화 답안 포함) |
| GET | `/api/answers/summary` | 전 요약답안 |
| GET | `/api/answers/summary/:id` | 특정 문제 요약답안 |
| GET | `/api/answers/detailed` | 전 심화답안 |
| GET | `/api/answers/detailed/:id` | 특정 문제 심화답안 |
| GET | `/api/analysis` | 출제경향 분석 전체 |
| GET | `/api/analysis/keywords` | 키워드 빈도 |
| GET | `/api/analysis/laws` | 법령 빈도 |
| GET | `/api/analysis/topics` | 주제 분포 |
| GET | `/api/analysis/trends` | 회차별 추이 |

## 📱 주요 페이지

| 경로 | 화면 |
|---|---|
| `/` | 홈 — 총 문제 수·요약/심화 답안 수·회차 바로가기·TOP 키워드·핵심 법령 |
| `/rounds` | 9개 회차 그리드·회차별 주제 요약 |
| `/rounds/:round` | 회차 내 4교시별 문제 목록·답안 작성 상태 표시 |
| `/questions/:id` | 문제 본문·답안 (요약/심화 탭)·같은 교시 다른 문제 링크 |
| `/trends` | 출제경향 분석 차트 (Recharts) — 키워드·법령·주제·회차별 추이·교시별 분포 |
| `/search` | 키워드·본문·ID 검색 + 회차·교시·유형 필터 |

## 🛠️ 기술 스택

- **Frontend**: React 18, React Router 6, Vite 5, Recharts 2 (차트)
- **Backend**: Node.js 22, Express 4, CORS
- **Data**: 정적 JSON (총 ~2MB, 정적 빌드 시 번들에 포함)
- **스타일**: 순수 CSS (Pretendard/Noto Sans KR 폰트)

## 📝 데이터 출처

- **한국산업인력공단** 공식 공개 기출문제 130~138회.
- 답안은 관련 법령·지침·판례·학술자료·실무 가이드라인 기반의 **수험 참고용 해설**입니다.
- **공식 정답이 아니며**, 법령 개정에 따라 내용이 달라질 수 있으므로 최신 법령을 함께 확인하시기 바랍니다.

## 🤝 기여 방법

1. `platform/frontend/src/data/answers-summary.json` 또는 `answers-detailed.json`에 답안 보완.
2. `platform/frontend/src/data/analysis.json`에 새로운 분석 축 추가.
3. `platform/frontend/src/components/`에 새 차트·뷰 컴포넌트 추가.
4. 실행 확인 후 커밋.

## 🐛 트러블슈팅

### Backend가 "Error: ENOENT: no such file or directory"로 실패

→ `backend/server.js`의 `DATA_DIR`이 `../frontend/src/data`를 가리키는지 확인하세요. 데이터 파일이 이 경로에 존재해야 합니다.

### Frontend가 5173이 아닌 5174로 뜸

→ 5173 포트를 이미 사용 중인 프로세스가 있습니다. 해당 프로세스를 종료 후 다시 `npm run dev`를 실행하거나, 5174로 그대로 사용하셔도 됩니다 (proxy는 port와 무관).

### 정적 빌드 후 페이지 새로고침 시 404

→ SPA 라우팅 때문입니다. 배포 서버에서 **fallback을 `index.html`로 설정**해야 합니다 (위 nginx 예시 참조).

## 📄 라이선스

개인 학습·수험 목적 사용. 상업적 재배포는 데이터 출처 고지 의무가 있습니다.

---

**제작:** 도시계획기술사 수험 준비 프로젝트  
**기간:** 2026.04.18 ~ 2026.04.19  
**답안 규모:** 279문제 × 2형식 = **558개 답안**
