import React from 'react';
import { Link } from 'react-router-dom';
import { meta, totalQuestions, summaryCount, detailedCount, ROUNDS, analysis } from '../utils/data-core.js';

export default function HomePage() {
  const topKeywords = (analysis.keywordFrequency || []).slice(0, 30);
  const topLaws = (analysis.lawFrequency || []).slice(0, 6);

  return (
    <>
      <h1 className="page-title">도시계획기술사 기출문제 플랫폼</h1>
      <p className="page-subtitle">130 ~ 138회 기출문제 {totalQuestions}개 · 핵심요약·심화 답안 · 출제경향 분석을 한 곳에서</p>

      {/* 2026 모의고사 프로모 배너 */}
      <Link to="/mock-exam" className="mock-promo-banner">
        <div className="mock-promo-icon">🎯</div>
        <div className="mock-promo-body">
          <div className="mock-promo-title">2026 모의고사 제1회 — 예상문제 풀어보기</div>
          <div className="mock-promo-sub">최신 법령 개정·정책 이슈 기반 31문제 · 1~4교시 전체 · 심화답안 포함</div>
        </div>
        <div className="mock-promo-arrow">→</div>
      </Link>

      <div className="grid grid-stats" style={{marginBottom: 24}}>
        <StatCard label="총 기출문제" value={totalQuestions} sub="130~138회 1~4교시 전체" />
        <StatCard label="수록 회차" value="9회차" sub={`${ROUNDS[0]}회 ~ ${ROUNDS[ROUNDS.length-1]}회`} />
        <StatCard label="요약 답안" value={summaryCount} sub={`/ 총 ${totalQuestions}문제`} />
        <StatCard label="심화 에세이" value={detailedCount} sub="회차 단위로 점진 확장" />
      </div>

      <div className="two-col">
        <section>
          <h2>회차 바로가기</h2>
          <div className="grid grid-rounds">
            {ROUNDS.map((r) => (
              <Link key={r} to={`/rounds/${r}`} className="round-card">
                <span className="round-label">제</span>
                <span className="round-no">{r}회</span>
                <span className="round-count">31문제 (1~4교시)</span>
              </Link>
            ))}
          </div>

          <h2>핵심 법령 (출제빈도 상위)</h2>
          <p className="page-subtitle" style={{marginBottom:10}}>시험에서 반복적으로 인용되는 상위 법령 · 지침.</p>
          <ul>
            {topLaws.map((l, i) => (
              <li key={i}><strong>{l.label}</strong> — 등장 {l.count}회</li>
            ))}
          </ul>

          <h2>이용 가이드</h2>
          <ul>
            <li><Link to="/rounds">회차별</Link> 페이지에서 원하는 회차·교시를 선택해 전체 문제 목록 열람</li>
            <li>문제 클릭 시 <strong>요약 답안</strong>과 <strong>심화 에세이 답안</strong>을 탭으로 비교</li>
            <li><Link to="/trends">출제경향</Link> 페이지에서 키워드·법령·주제 빈도 그래프 확인</li>
            <li><Link to="/search">검색</Link> 페이지에서 키워드/문제 본문으로 직접 검색</li>
          </ul>
        </section>
        <aside>
          <div className="card sidebar-card">
            <h4>빈도 TOP 키워드</h4>
            <div className="keyword-cloud">
              {topKeywords.map((k, i) => (
                <span key={i} className={`kw-chip ${i < 5 ? 'kw-lg' : i < 12 ? 'kw-md' : ''}`}>
                  {k.label} <small style={{opacity:0.6}}>×{k.count}</small>
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}
