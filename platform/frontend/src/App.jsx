import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RoundsPage from './pages/RoundsPage.jsx';
import RoundDetailPage from './pages/RoundDetailPage.jsx';
import QuestionPage from './pages/QuestionPage.jsx';
import TrendPage from './pages/TrendPage.jsx';
import SearchPage from './pages/SearchPage.jsx';

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
            <NavLink to="/search" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>검색</NavLink>
          </nav>
        </div>
      </header>
      <main className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rounds" element={<RoundsPage />} />
          <Route path="/rounds/:round" element={<RoundDetailPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
          <Route path="/trends" element={<TrendPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
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
