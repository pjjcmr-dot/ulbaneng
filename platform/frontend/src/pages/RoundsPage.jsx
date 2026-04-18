import React from 'react';
import { Link } from 'react-router-dom';
import { ROUNDS, getQuestionsByRound, analysis } from '../utils/data.js';

export default function RoundsPage() {
  const trendByRound = analysis.trendsByRound || {};
  return (
    <>
      <h1 className="page-title">회차별 기출문제</h1>
      <p className="page-subtitle">제130회(2023.05) ~ 제138회(2025.09). 회차를 선택하면 1~4교시 전체 문제와 답안을 볼 수 있습니다.</p>
      <div className="grid grid-rounds">
        {ROUNDS.map((r) => {
          const qs = getQuestionsByRound(r);
          const essays = qs.filter(q => q.type === '서술형').length;
          const shortAns = qs.filter(q => q.type === '단답형').length;
          const topics = trendByRound[r]?.topTopics || [];
          return (
            <Link key={r} to={`/rounds/${r}`} className="round-card">
              <span className="round-label">제</span>
              <span className="round-no">{r}회</span>
              <span className="round-count">단답 {shortAns} · 서술 {essays} (총 {qs.length}문제)</span>
              {topics.length > 0 && (
                <div style={{marginTop:10, fontSize:12, color:'#6b7280'}}>
                  대표 주제: {topics.slice(0,3).join(' · ')}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
