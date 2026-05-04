import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import guidelinesIndex from '@data/guidelines-index.json';

// 모든 지침 데이터를 정적으로 import (Vite가 각각 별도 청크로 분리)
import districtUnit from '@data/guideline-district-unit-plan.json';
import cityGunBasic from '@data/guideline-city-gun-basic-plan.json';
import cityGunMgmt from '@data/guideline-city-gun-management-plan.json';
import landscape from '@data/guideline-landscape-plan.json';
import urbanRegen from '@data/guideline-urban-regeneration.json';
import publicContrib from '@data/guideline-public-contribution.json';
import lawSystem from '@data/guideline-law-system.json';
import LawSystemMasterVisual from '../components/LawSystemMasterVisual';

const GUIDELINE_MAP = {
  'district-unit-plan': districtUnit,
  'city-gun-basic-plan': cityGunBasic,
  'city-gun-management-plan': cityGunMgmt,
  'landscape-plan': landscape,
  'urban-regeneration': urbanRegen,
  'public-contribution': publicContrib,
  'law-system': lawSystem
};

export default function GuidelineDetailPage() {
  const { slug } = useParams();
  const guideline = GUIDELINE_MAP[slug];
  const indexEntry = guidelinesIndex.guidelines.find(g => g.slug === slug);

  const [activeId, setActiveId] = useState(null);
  const [tocOpen, setTocOpen] = useState(false);

  // 입력 중 버퍼(inputQuery)와 실제 적용된 검색어(query) 분리
  //  - inputQuery : 사용자 타이핑에 따라 매번 업데이트 (필터 미적용)
  //  - query      : 검색 버튼 또는 Enter 키로 제출된 검색어 (필터에 실제 사용)
  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');

  const sectionRefs = useRef({});

  const chapters = guideline?.chapters || [];
  const meta = guideline?.meta;

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

  // 입력 중이나 아직 제출하지 않은 상태 감지 (안내용)
  const hasPendingInput = inputQuery.trim() !== query.trim();

  // 초기 active 섹션 설정
  useEffect(() => {
    if (chapters.length > 0 && !activeId) {
      setActiveId(chapters[0].sections[0]?.id || null);
    }
  }, [chapters, activeId]);

  const filteredChapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters;
    return chapters
      .map(ch => ({
        ...ch,
        sections: ch.sections.filter(s =>
          s.title.toLowerCase().includes(q) ||
          (s.body || '').toLowerCase().includes(q) ||
          (s.points || []).some(p => p.toLowerCase().includes(q)) ||
          (s.laws || []).some(l => l.toLowerCase().includes(q))
        )
      }))
      .filter(ch => ch.sections.length > 0);
  }, [query, chapters]);

  // 스크롤 → 목차 활성화
  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      const allIds = chapters.flatMap(ch => ch.sections.map(s => s.id));
      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[allIds[i]];
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveId(allIds[i]);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      setTocOpen(false);
    }
  };

  const renderMarkdown = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (!guideline || !meta) {
    return <Navigate to="/guidelines" replace />;
  }

  return (
    <>
      <div style={{marginBottom: 12, fontSize: 13}}>
        <Link to="/guidelines" className="back-link">← 지침 목록으로</Link>
      </div>
      <h1 className="page-title" style={{marginBottom: 4}}>
        <span style={{marginRight: 8}}>{indexEntry?.icon}</span>
        {meta.title}
      </h1>
      <p className="page-subtitle">{meta.description}</p>

      <div className="guideline-meta-card">
        <div><strong>법적 근거:</strong> {meta.basedOn}</div>
        <div><strong>출처:</strong> {meta.source}</div>
        <div><strong>최종 업데이트:</strong> {meta.updatedAt}</div>
      </div>

      <form onSubmit={handleSubmit} className="search-form" role="search" style={{marginBottom: 16}}>
        <input
          type="text"
          className="search-bar"
          placeholder="조문·키워드 검색 (예: 용적률 완화, 특별계획구역, 공공기여)"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          aria-label="지침 내 검색어 입력"
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

      <button
        className="toc-mobile-toggle"
        onClick={() => setTocOpen(!tocOpen)}
      >
        {tocOpen ? '✕ 목차 닫기' : '☰ 목차 열기'}
      </button>

      <div className="guideline-layout">
        <aside className={`guideline-toc ${tocOpen ? 'open' : ''}`}>
          <div className="toc-title">목차</div>
          <ul>
            {filteredChapters.map(ch => (
              <li key={ch.id}>
                <div className="toc-chapter">{ch.title}</div>
                <ul>
                  {ch.sections.map(sec => (
                    <li key={sec.id}>
                      <button
                        className={`toc-link ${activeId === sec.id ? 'active' : ''}`}
                        onClick={() => scrollToSection(sec.id)}
                      >
                        {sec.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </aside>

        <article className="guideline-content">
          {filteredChapters.length === 0 ? (
            <div className="guideline-empty">
              검색 결과가 없습니다. 다른 키워드를 시도해보세요.
            </div>
          ) : (
            filteredChapters.map(ch => (
              <section key={ch.id} className="chapter">
                <h2 className="chapter-title">{ch.title}</h2>
                {ch.sections.map(sec => (
                  <div
                    key={sec.id}
                    id={sec.id}
                    ref={el => (sectionRefs.current[sec.id] = el)}
                    className="section"
                  >
                    <h3 className="section-title">{sec.title}</h3>
                    {sec.laws && sec.laws.length > 0 && (
                      <div className="section-laws">
                        {sec.laws.map((l, i) => (
                          <span key={i} className="law-badge">{l}</span>
                        ))}
                      </div>
                    )}
                    {sec.body && (
                      <p className="section-body">{renderMarkdown(sec.body)}</p>
                    )}
                    {sec.visual === 'law-system-master' && <LawSystemMasterVisual />}
                    {sec.diagrams && sec.diagrams.length > 0 && sec.diagrams.map((d, di) => (
                      <React.Fragment key={di}>
                        {d.title && <div className="section-diagram-title">{d.title}</div>}
                        <pre className="section-diagram">{d.ascii}</pre>
                      </React.Fragment>
                    ))}
                    {sec.points && sec.points.length > 0 && (
                      <ul className="section-points">
                        {sec.points.map((p, i) => (
                          <li key={i}>{renderMarkdown(p)}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ))
          )}
        </article>
      </div>

      <div className="guideline-footer-note">
        <strong>📌 학습 안내</strong>
        <br />본 자료는 국토부 지침·가이드라인을 수험·실무 학습용으로 요약·체계화한 것입니다.
        정확한 법령은 국가법령정보센터(law.go.kr)에서 최신 조문을 확인하시기 바랍니다.
      </div>
    </>
  );
}
