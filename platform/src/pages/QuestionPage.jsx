import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getQuestion, getQuestionsByRound, formatBySession } from '../utils/data.js';
import AnswerView from '../components/AnswerView.jsx';

export default function QuestionPage() {
  const { id } = useParams();
  const q = getQuestion(id);

  if (!q) return <div className="notice">문제를 찾을 수 없습니다 (id: {id}).</div>;

  const peers = getQuestionsByRound(q.round).filter(x => x.session === q.session).sort((a,b) => a.no - b.no);

  return (
    <>
      <Link to={`/rounds/${q.round}`} className="back-link">← 제{q.round}회 전체 문제</Link>

      <div className="question-header">
        <div className="q-path">제{q.round}회 · {q.session}교시 · {q.no}번 · {formatBySession(q.session)}</div>
        <div className="q-text">{q.text}</div>
        <div className="q-meta">
          <span className="badge badge-accent">{q.points}점</span>
          <span className="badge">{q.type}</span>
          {q.hasDiagram && <span className="badge badge-diagram">도면 포함</span>}
          {(q.keywords || []).map((k,i) => <span key={i} className="badge badge-muted">{k}</span>)}
        </div>
      </div>

      <div className="two-col">
        <section>
          <AnswerView summary={q.summary} detailed={q.detailed} />
        </section>
        <aside>
          <div className="card sidebar-card">
            <h4>같은 교시 다른 문제</h4>
            <ul>
              {peers.map(p => (
                <li key={p.id}>
                  <Link to={`/questions/${p.id}`} style={{fontWeight: p.id === q.id ? 700 : 400, color: p.id === q.id ? '#1f4fbb' : undefined}}>
                    {p.no}. {p.text.length > 40 ? p.text.slice(0,40) + '…' : p.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
