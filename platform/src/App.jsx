import React, { Suspense, lazy } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';

// 코드 스플리팅: 각 페이지를 lazy load하여 초기 번들 크기 축소
// - TrendPage는 Recharts를 포함하므로 반드시 분리
// - QuestionPage는 심화답안 데이터를 사용하므로 분리
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RoundsPage = lazy(() => import('./pages/RoundsPage.jsx'));
const RoundDetailPage = lazy(() => import('./pages/RoundDetailPage.jsx'));
const QuestionPage = lazy(() => import('./pages/QuestionPage.jsx'));
const TrendPage = lazy(() => import('./pages/TrendPage.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));
const GuidelinesPage = lazy(() => import('./pages/GuidelinesPage.jsx'));
const GuidelineDetailPage = lazy(() => import('./pages/GuidelineDetailPage.jsx'));

const PageLoading = () => (
  <div className="loading">페이지 로딩 중...</div>
);

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-kor">도시계획기술사</span>
            <span className="brand-sub">기출문제·답안·경향 플랫폼 · 130~138회</span>
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>홈</NavLink>
            <NavLink to="/rounds" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>회차별</NavLink>
            <NavLink to="/trends" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>출제경향</NavLink>
            <NavLink to="/guidelines" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>이론학습</NavLink>
            <NavLink to="/search" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>검색</NavLink>
          </nav>
        </div>
      </header>
      <main className="container main">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rounds" element={<RoundsPage />} />
            <Route path="/rounds/:round" element={<RoundDetailPage />} />
            <Route path="/questions/:id" element={<QuestionPage />} />
            <Route path="/trends" element={<TrendPage />} />
            <Route path="/guidelines" element={<GuidelinesPage />} />
            <Route path="/guidelines/:slug" element={<GuidelineDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>도시계획기술사 기출문제 분석 플랫폼 · 데이터 출처: 한국산업인력공단 공개 기출문제 130~138회</p>
          <p className="small">답안은 공식 정답이 아닌 수험 참고용 해설입니다. 법령 개정에 따라 내용이 달라질 수 있으므로 최신 법령을 함께 확인하시기 바랍니다.</p>
        </div>
      </footer>
    </div>
  );
}
