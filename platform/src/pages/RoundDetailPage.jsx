import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuestionsByRound, formatBySession, summaries, details } from '../utils/data.js';

export default function RoundDetailPage() {
  const { round } = useParams();
  const qs = getQuestionsByRound(round);
  if (qs.length === 0) return <div className="notice">해당 회차의 문제를 찾을 수 없습니다.</div>;

  const sessions = [1, 2, 3, 4].map((s) => ({
    session: s,
    questions: qs.filter(q => q.session === s).sort((a,b) => a.no - b.no)
  }));

  return (
    <>
      <Link to="/rounds" className="back-link">← 회차 목록</Link>
      <h1 className="page-title">제{round}회 도시계획기술사</h1>
      <p className="page-subtitle">4개 교시 · 각 교시 100분 · 총 {qs.length}문제</p>

      {sessions.map(({ session, questions }) => (
        <div key={session} className="session-block">
          <h3>
            <span className="badge">{session}교시</span>
            <span>{formatBySession(session)}</span>
            <span style={{marginLeft:'auto', fontSize:13, color:'#6b7280', fontWeight:400}}>{questions.length}문제</span>
          </h3>
          <ul className="question-list">
            {questions.map((q) => {
              const hasSum = Boolean(summaries[q.id]);
              const hasDet = Boolean(details[q.id]);
              return (
                <li key={q.id} className="question-item">
                  <span className="question-no">{q.no}.</span>
                  <span className="question-text">
                    <Link to={`/questions/${q.id}`}>{q.text}</Link>
                    <div className="question-meta">
                      {q.keywords && q.keywords.slice(0,4).map((k, i) => (
                        <span key={i} className="badge badge-muted">{k}</span>
                      ))}
                      {q.hasDiagram && <span className="badge badge-diagram">도면</span>}
                      <span style={{marginLeft:'auto', fontSize:11, opacity:0.7}}>
                        {hasSum ? '요약✓' : '요약·'} / {hasDet ? '심화✓' : '심화·'}
                      </span>
                    </div>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
