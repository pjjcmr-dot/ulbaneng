import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { questions, ROUNDS } from '../utils/data.js';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [round, setRound] = useState('all');
  const [session, setSession] = useState('all');
  const [type, setType] = useState('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = questions;
    if (round !== 'all') list = list.filter(x => String(x.round) === round);
    if (session !== 'all') list = list.filter(x => String(x.session) === session);
    if (type !== 'all') list = list.filter(x => x.type === type);
    if (q) {
      list = list.filter(x =>
        x.text.toLowerCase().includes(q) ||
        (x.keywords || []).some(k => k.toLowerCase().includes(q)) ||
        x.id.includes(q)
      );
    }
    return list;
  }, [query, round, session, type]);

  return (
    <>
      <h1 className="page-title">기출문제 검색</h1>
      <p className="page-subtitle">키워드·문제본문·문제ID(예: 138-2-3)로 검색하거나 회차/교시/유형별로 필터링.</p>

      <input
        type="text"
        className="search-bar"
        placeholder="예) 지구단위계획, 도시재생, 노후계획도시, 용도지역, Kevin Lynch …"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="filter-row">
        <strong style={{alignSelf:'center', marginRight:4, fontSize:13, color:'#6b7280'}}>회차:</strong>
        <button className={`filter-chip ${round==='all'?'active':''}`} onClick={()=>setRound('all')}>전체</button>
        {ROUNDS.map(r => (
          <button key={r} className={`filter-chip ${round===String(r)?'active':''}`} onClick={()=>setRound(String(r))}>{r}</button>
        ))}
      </div>
      <div className="filter-row">
        <strong style={{alignSelf:'center', marginRight:4, fontSize:13, color:'#6b7280'}}>교시:</strong>
        <button className={`filter-chip ${session==='all'?'active':''}`} onClick={()=>setSession('all')}>전체</button>
        {[1,2,3,4].map(s => (
          <button key={s} className={`filter-chip ${session===String(s)?'active':''}`} onClick={()=>setSession(String(s))}>{s}교시</button>
        ))}
        <strong style={{alignSelf:'center', marginLeft:20, marginRight:4, fontSize:13, color:'#6b7280'}}>유형:</strong>
        <button className={`filter-chip ${type==='all'?'active':''}`} onClick={()=>setType('all')}>전체</button>
        <button className={`filter-chip ${type==='단답형'?'active':''}`} onClick={()=>setType('단답형')}>단답형</button>
        <button className={`filter-chip ${type==='서술형'?'active':''}`} onClick={()=>setType('서술형')}>서술형</button>
      </div>

      <div style={{margin:'14px 0', color:'#6b7280', fontSize:13}}>총 <strong>{results.length}</strong>개 검색결과</div>

      <ul className="question-list">
        {results.map((q) => (
          <li key={q.id} className="question-item">
            <span style={{width: 60, flexShrink:0, fontSize:12, color:'#6b7280'}}>{q.round}회·{q.session}교시·{q.no}</span>
            <span className="question-text">
              <Link to={`/questions/${q.id}`}>{q.text}</Link>
              <div className="question-meta">
                {(q.keywords || []).slice(0,6).map((k,i) => <span key={i} className="badge badge-muted">{k}</span>)}
              </div>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
