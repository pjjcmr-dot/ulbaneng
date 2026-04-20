import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { questions, ROUNDS } from '../utils/data-core.js';

export default function SearchPage() {
  // URL 쿼리 파라미터와 양방향 동기화 — 상세페이지에서 뒤로가기 시 검색 상태 유지
  const [searchParams, setSearchParams] = useSearchParams();

  // 입력 중 버퍼(inputQuery)와 실제 적용된 검색어(query)를 분리
  //  - inputQuery : 사용자 타이핑에 따라 매번 업데이트 (화면에 표시만, 필터 미적용)
  //  - query      : 검색 버튼 또는 Enter 키로 제출된 검색어 (필터에 실제 사용)
  const initialQ = searchParams.get('q') || '';
  const [inputQuery, setInputQuery] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);

  const [round, setRound] = useState(searchParams.get('round') || 'all');
  const [session, setSession] = useState(searchParams.get('session') || 'all');
  const [type, setType] = useState(searchParams.get('type') || 'all');

  // URL 동기화 — 제출된 query와 필터 변경 시에만 URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (round !== 'all') params.set('round', round);
    if (session !== 'all') params.set('session', session);
    if (type !== 'all') params.set('type', type);
    setSearchParams(params, { replace: true, preventScrollReset: true });
  }, [query, round, session, type, setSearchParams]);

  // 검색 제출 — Enter 키 또는 검색 버튼
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setQuery(inputQuery.trim());
  };

  // 검색 초기화 — X 버튼
  const handleClear = () => {
    setInputQuery('');
    setQuery('');
  };

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

  // 입력 중이나 아직 제출하지 않은 상태 감지 (사용자 안내용)
  const hasPendingInput = inputQuery.trim() !== query.trim();

  return (
    <>
      <h1 className="page-title">기출문제 검색</h1>
      <p className="page-subtitle">
        키워드·문제본문·문제ID(예: 138-2-3)로 검색하거나 회차/교시/유형별로 필터링.
        <br />
        <span style={{color:'#6b7280', fontSize:13}}>
          검색어 입력 후 <strong style={{color:'#1f4fbb'}}>검색 버튼</strong> 또는 <strong style={{color:'#1f4fbb'}}>Enter</strong> 키를 눌러주세요.
        </span>
      </p>

      <form onSubmit={handleSubmit} className="search-form" role="search">
        <input
          type="text"
          className="search-bar"
          placeholder="예) 지구단위계획, 도시재생, 노후계획도시, 용도지역, Kevin Lynch …"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          aria-label="검색어 입력"
        />
        {inputQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={handleClear}
            aria-label="검색어 지우기"
            title="검색어 지우기"
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-submit-btn">
          🔍 검색
        </button>
      </form>

      {hasPendingInput && (
        <div className="search-pending-hint">
          💡 입력한 키워드는 아직 적용되지 않았습니다. <strong>Enter 또는 검색 버튼</strong>을 눌러 결과를 확인하세요.
        </div>
      )}

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

      <div style={{margin:'14px 0', color:'#6b7280', fontSize:13, fontVariantNumeric:'tabular-nums'}}>
        총 <strong style={{display:'inline-block', minWidth:32, textAlign:'right'}}>{results.length}</strong>개 검색결과
        {query && <span style={{marginLeft:10, color:'#9ca3af'}}>· 검색어: <strong style={{color:'#1f4fbb'}}>&ldquo;{query}&rdquo;</strong></span>}
      </div>

      <ul className="question-list" style={{minHeight:'60vh'}}>
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
