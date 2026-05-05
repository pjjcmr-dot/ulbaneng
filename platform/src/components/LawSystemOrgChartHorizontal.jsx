import React, { useState, useEffect } from 'react';
import LAW_SUMMARIES from '@data/law-summaries.json';

const TIER0 = { name: '대한민국 헌법', meta: '제23·35·120·122조' };

const TIER123 = {
  name: '법률 (Acts)',
  meta: '국회 의결 · ~60개',
  branches: [
    {
      name: '기본법', meta: '정책 방향 · 7개',
      leaves: [
        '국토기본법', '건축기본법', '주거기본법', '탄소중립기본법',
        'AI기본법(2026.1)', '국가공간정보 기본법', '지방분권균형발전법'
      ]
    },
    {
      name: '핵심법', meta: '일반 규제 · 4개',
      leaves: ['★ 국토계획법', '건축법', '주택법', '수도권정비계획법']
    },
    {
      name: '분야별 특별법', meta: '11 카테고리 · 114개 (전수)',
      leaves: [
        '① 도시개발·재생 (13)', '② 산업·물류 (11)', '③ 주택·주거 (10)',
        '④ 토지·보상 (11)', '⑤ 시설·기반 (17)', '⑥ 환경·녹지 (21)',
        '⑦ 농어촌·균형 (7)', '⑧ 경관·문화 (9)', '⑨ 안전·방재 (8)',
        '⑩ 신산업·특별 (5)', '⑪ 공간정보·측량 (2)'
      ]
    }
  ]
};

const TIER4 = {
  name: '시행령 (대통령령)',
  meta: '정부 국무회의',
  leaves: [
    '★ 국토계획법 시행령 — 용도지역 21종·건폐율·용적률',
    '건축법 시행령 — 공개공지 5천㎡',
    '도정법 시행령 — 입안대상·노후건축물',
    '노후계획도시법 시행령 — 100만㎡',
    '빈집법 시행령 — 자율주택 1만㎡',
    '환경영향평가법 시행령 — 18종',
    '도시개발법 시행령 — 시행자 11종',
    '도시공원녹지법 시행령',
    '산업입지법 시행령',
    '공공주택법 시행령'
  ]
};

const TIER5 = {
  name: '시행규칙 (부령)',
  meta: '부처 장관 발령',
  leaves: [
    '국토계획법 시행규칙',
    '★ 도시·군계획시설 결정·구조 규칙 (53종)',
    '도정법 시행규칙',
    '도시공원녹지법 시행규칙',
    '건축법 시행규칙',
    '건축물 구조기준·설비·피난방화 규칙',
    '농지법 시행규칙',
    '환경영향평가법 시행규칙',
    '녹색건축 인증 규칙 (2025.10~)'
  ]
};

const TIER6 = {
  name: '행정규칙·지침',
  meta: '훈령·고시·예규',
  branches: [
    {
      name: '① 수립지침', meta: '국토부훈령 · 8종',
      leaves: [
        '광역도시계획수립지침',
        '도시·군기본계획수립지침 (1694)',
        '도시·군관리계획수립지침 (1901)',
        '지구단위계획수립지침 (1768)',
        '공간재구조화계획수립지침',
        '경관계획수립지침',
        '도시재생전략·활성화계획수립지침',
        '정비기본계획수립지침'
      ]
    },
    {
      name: '② 가이드라인', meta: '고시 · 9종',
      leaves: [
        '★ 공공기여 가이드라인 (2025.3.26)',
        '도시·주거환경정비 기본방침',
        '노후계획도시 정비 기본방침',
        'LID(저영향개발) 가이드라인',
        '스마트시티 추진전략',
        '경관심의 운영 가이드라인 (2024)',
        '뉴:빌리지 사업 가이드라인',
        '도시재생 인정사업 가이드라인',
        '통합공공임대주택 운영기준'
      ]
    },
    {
      name: '③ 평가·심의 고시', meta: '5종',
      leaves: [
        '전략환경영향평가 작성규정',
        '환경영향평가 협의업무 처리규정',
        '교통영향평가 지침',
        '재해영향평가 운영지침',
        '도시·군계획평가 운영지침 (2026.10~)'
      ]
    }
  ]
};

const TIER7 = {
  name: '자치법규',
  meta: '조례·규칙 · 지방의회',
  leaves: [
    '시·도 도시계획조례 (광역)',
    '시·군·구 도시계획조례 (기초)',
    '건축조례',
    '도시 및 주거환경정비조례',
    '경관조례',
    '공원녹지조례',
    '주차장조례',
    '도시계획위원회 조례',
    '빈집정비조례',
    '도시재생 활성화 지원 조례'
  ]
};

const NEW_LAWS_BY_YEAR = [
  {
    year: '2023',
    items: [
      { name: '지방분권균형발전법', meta: '7월 통합 신설', lookup: '지방분권균형발전법' },
      { name: '도시·군기본계획수립지침 개정', meta: '훈령 1694호 (12.28)', lookup: '도시·군기본계획수립지침' }
    ]
  },
  {
    year: '2024',
    items: [
      { name: '노후계획도시법', meta: '4월 시행 — 1기 신도시', star: true, lookup: '노후계획도시법' },
      { name: '농촌공간재구조화법', meta: '3월 시행', lookup: '농촌공간재구조화법' },
      { name: '공간혁신구역 (국계법 개정)', meta: '8월 시행', star: true, lookup: '국토계획법' },
      { name: '지구단위계획수립지침 개정', meta: '훈령 1768호 (5.20)', lookup: '지구단위계획수립지침' },
      { name: '경관심의 운영 가이드라인', meta: '국토부 (2024)', lookup: '경관심의 운영 가이드라인 (2024)' }
    ]
  },
  {
    year: '2025',
    items: [
      { name: '철도지하화통합개발법', meta: '1.31 시행', star: true, lookup: '철도지하화통합개발법' },
      { name: '공공기여 가이드라인', meta: '3.26 확정·전국 배포', star: true, lookup: '공공기여 가이드라인' },
      { name: '도심복합개발법', meta: '10.1 시행', star: true, lookup: '도심복합개발법' },
      { name: '환경부 → 기후에너지환경부', meta: '10.1 명칭 변경', lookup: '환경부 → 기후에너지환경부' },
      { name: '녹색건축 인증 규칙', meta: '10.1 기후환경부령으로 변경', lookup: '녹색건축법' }
    ]
  },
  {
    year: '2026',
    items: [
      { name: '재건축진단 (도정법 개정)', meta: '1.2 시행 — 구 안전진단', lookup: '도정법' },
      { name: 'AI기본법', meta: '1.22 시행 — 고영향 AI 8영역', star: true, lookup: 'AI기본법' },
      { name: '도시·군관리계획수립지침 개정', meta: '훈령 1901호 (10.2)', lookup: '도시·군관리계획수립지침' },
      { name: '도시·군계획평가 운영지침', meta: '10.2 신설 시행', star: true, lookup: '도시·군계획평가 운영지침' }
    ]
  }
];

const EXEC = {
  name: '집행·인허가',
  meta: '실무 흐름 — 계획·허가·시공',
  branches: [
    {
      name: '① 계획 단계',
      meta: '4단계 순차',
      leaves: [
        '도시·군기본계획',
        '도시·군관리계획',
        '지구단위계획',
        '사업시행계획'
      ]
    },
    {
      name: '② 허가 단계',
      meta: '사업유형별 ~9종',
      leaves: [
        '★ 개발행위허가 (국계법 제56조)',
        '건축허가·신고 (건축법 제11조·제14조)',
        '사업시행인가 (도정법 제50조) — 재개발·재건축',
        '사업계획승인 (주택법 제15조) — 주택건설',
        '실시계획 인가 (도시개발법 제17조)',
        '공장설립승인 (산집법)',
        '농지전용허가 (농지법 제34조)',
        '산지전용허가 (산지관리법 제14조)',
        '개발제한구역 행위허가 (GB법 제12조)'
      ]
    },
    {
      name: '③ 시공·완료',
      meta: '2단계',
      leaves: ['착공·시공', '준공·사용승인']
    }
  ]
};

// 요약 lookup — alias 자동 해석 + prefix(★, ①~⑪) 제거 폴백
function lookupSummary(rawName) {
  if (!rawName) return null;
  const tryKey = (k) => {
    let e = LAW_SUMMARIES[k];
    if (e && e.alias) {
      k = e.alias;
      e = LAW_SUMMARIES[k];
    }
    return e ? { key: k, ...e } : null;
  };
  // 1) 정확 매칭
  const direct = tryKey(rawName);
  if (direct) return direct;
  // 2) prefix 제거 후 매칭 (★, ①~⑪ 등)
  const stripped = rawName
    .replace(/^[★①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮]\s*/, '')
    .replace(/\s*\(\d+\)\s*$/, '')
    .trim();
  if (stripped !== rawName) {
    const fb = tryKey(stripped);
    if (fb) return fb;
  }
  return null;
}

// 카테고리 여부 판별 (분야별 특별법 카테고리)
function isCategory(summary) {
  return summary && summary.type && summary.type.includes('카테고리');
}

function HRoot({ variant, tier, name, meta }) {
  return (
    <div className={`hb hb--root ${variant}`}>
      <div className="hb-tier">{tier}</div>
      <div className="hb-name">{name}</div>
      {meta && <div className="hb-meta">{meta}</div>}
    </div>
  );
}

function HBranch({ variant, name, meta }) {
  return (
    <div className={`hb hb--branch ${variant}`}>
      <div className="hb-name">{name}</div>
      {meta && <div className="hb-meta">{meta}</div>}
    </div>
  );
}

function HLeaf({ variant, name, onClick }) {
  const star = name.startsWith('★ ');
  const display = star ? name.substring(2) : name;
  return (
    <div
      className={`hb hb--leaf ${variant} ${star ? 'hb--star' : ''} hb--clickable`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    >
      <div className="hb-name">{display}</div>
    </div>
  );
}

function HArrow() {
  return (
    <div className="h-arrow">
      <span className="h-arrow-shaft" />
      <span className="h-arrow-head">▶</span>
    </div>
  );
}

function ColumnLeavesOnly({ leaves, variant, onLeafClick }) {
  return (
    <div className="h-leaves">
      {leaves.map((l, i) => (
        <HLeaf key={i} variant={variant} name={l} onClick={() => onLeafClick(l)} />
      ))}
    </div>
  );
}

function ColumnBranches({ branches, branchVariant, leafVariant, onLeafClick }) {
  return (
    <div className="h-branches">
      {branches.map((b, i) => (
        <div key={i} className="h-branch-group">
          <HBranch variant={branchVariant} name={b.name} meta={b.meta} />
          <div className="h-leaves h-leaves--small">
            {b.leaves.map((l, j) => (
              <HLeaf key={j} variant={leafVariant} name={l} onClick={() => onLeafClick(l)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SummaryModal({ leafName, onClose, onSelectLaw, onBack }) {
  const summary = lookupSummary(leafName);
  const display = leafName.startsWith('★ ') ? leafName.substring(2) : leafName;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lsmodal-backdrop" onClick={onClose}>
      <div className="lsmodal" onClick={(e) => e.stopPropagation()}>
        <div className="lsmodal-head">
          <div className="lsmodal-head-text">
            {onBack && (
              <button onClick={onBack} className="lsmodal-back-btn" aria-label="뒤로">← 이전</button>
            )}
            {summary?.type && <div className="lsmodal-tier">{summary.type}</div>}
            <div className="lsmodal-title">{summary?.key || display}</div>
            {summary?.formal && summary.formal !== summary.key && (
              <div className="lsmodal-formal">정식: {summary.formal}</div>
            )}
            {summary?.enacted && <div className="lsmodal-enacted">📅 제정/시행 — {summary.enacted}</div>}
          </div>
          <button onClick={onClose} className="lsmodal-close" aria-label="닫기">✕</button>
        </div>
        <div className="lsmodal-body">
          {!summary && (
            <div className="lsmodal-section">
              <p className="lsmodal-empty">⏳ 이 항목의 요약 정보는 아직 준비되지 않았습니다.</p>
            </div>
          )}
          {summary && (
            <>
              {summary.summary && (
                <div className="lsmodal-section">
                  <h4>📝 요약</h4>
                  <p className="lsmodal-summary-text">{summary.summary}</p>
                </div>
              )}
              {summary.composition && summary.composition.length > 0 && (
                <div className="lsmodal-section">
                  <h4>{isCategory(summary) ? '📋 포함 법령' : '📚 구성'}</h4>
                  {isCategory(summary) ? (
                    <div className="lsmodal-laws">
                      {summary.composition.map((c, i) => {
                        const m = c.match(/^([^—\-]+?)\s*[—\-]\s*(.+)$/);
                        const lawName = m ? m[1].trim() : c;
                        const desc = m ? m[2].trim() : '';
                        const hasDetail = !!lookupSummary(lawName);
                        return (
                          <div
                            key={i}
                            className={`lsmodal-law-item${hasDetail ? ' lsmodal-law-item--clickable' : ''}`}
                            onClick={hasDetail ? () => onSelectLaw(lawName) : undefined}
                            role={hasDetail ? 'button' : undefined}
                            tabIndex={hasDetail ? 0 : undefined}
                          >
                            <span className="lsmodal-law-num">{i + 1}</span>
                            <div className="lsmodal-law-text">
                              <div className="lsmodal-law-name">
                                {lawName}
                                {hasDetail && <span className="lsmodal-law-arrow">→</span>}
                              </div>
                              {desc && <div className="lsmodal-law-desc">{desc}</div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ul className="lsmodal-list">
                      {summary.composition.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  )}
                </div>
              )}
              {summary.keys && summary.keys.length > 0 && (
                <div className="lsmodal-section">
                  <h4>★ 핵심 내용</h4>
                  <ul className="lsmodal-list lsmodal-list--keys">
                    {summary.keys.map((k, i) => <li key={i}>{k}</li>)}
                  </ul>
                </div>
              )}
              {summary.related && summary.related.length > 0 && (
                <div className="lsmodal-section">
                  <h4>🔗 관련 법령</h4>
                  <div className="lsmodal-tags">
                    {summary.related.map((r, i) => <span key={i} className="lsmodal-tag">{r}</span>)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <div className="lsmodal-foot">
          <button onClick={onClose} className="lsmodal-foot-btn">닫기</button>
        </div>
      </div>
    </div>
  );
}

export default function LawSystemOrgChartHorizontal() {
  const [history, setHistory] = useState([]);
  const currentLeaf = history.length > 0 ? history[history.length - 1] : null;
  const canGoBack = history.length > 1;

  const openLeaf = (name) => setHistory(prev => [...prev, name]);
  const setSelectedLeaf = (name) => setHistory(name ? [name] : []);
  const closeAll = () => setHistory([]);
  const goBack = () => setHistory(prev => prev.slice(0, -1));

  return (
    <div className="orgh">
      <div className="orgh-row">
        {/* Tier 0 */}
        <div className="orgh-col">
          <HRoot variant="hb--t0" tier="Tier 0" name={TIER0.name} meta={TIER0.meta} />
        </div>
        <HArrow />

        {/* Tier 1~3 */}
        <div className="orgh-col orgh-col--wide">
          <HRoot variant="hb--t123" tier="Tier 1~3" name={TIER123.name} meta={TIER123.meta} />
          <ColumnBranches
            branches={TIER123.branches}
            branchVariant="hb--branch-law"
            leafVariant="hb--leaf-law"
            onLeafClick={setSelectedLeaf}
          />
        </div>
        <HArrow />

        {/* Tier 4 */}
        <div className="orgh-col">
          <HRoot variant="hb--t4" tier="Tier 4" name={TIER4.name} meta={TIER4.meta} />
          <ColumnLeavesOnly leaves={TIER4.leaves} variant="hb--leaf-decree" onLeafClick={setSelectedLeaf} />
        </div>
        <HArrow />

        {/* Tier 5 */}
        <div className="orgh-col">
          <HRoot variant="hb--t5" tier="Tier 5" name={TIER5.name} meta={TIER5.meta} />
          <ColumnLeavesOnly leaves={TIER5.leaves} variant="hb--leaf-rule" onLeafClick={setSelectedLeaf} />
        </div>
        <HArrow />

        {/* Tier 6 */}
        <div className="orgh-col orgh-col--wide">
          <HRoot variant="hb--t6" tier="Tier 6" name={TIER6.name} meta={TIER6.meta} />
          <ColumnBranches
            branches={TIER6.branches}
            branchVariant="hb--branch-admin"
            leafVariant="hb--leaf-admin"
            onLeafClick={setSelectedLeaf}
          />
        </div>
        <HArrow />

        {/* Tier 7 */}
        <div className="orgh-col">
          <HRoot variant="hb--t7" tier="Tier 7" name={TIER7.name} meta={TIER7.meta} />
          <ColumnLeavesOnly leaves={TIER7.leaves} variant="hb--leaf-ord" onLeafClick={setSelectedLeaf} />
        </div>
        <HArrow />

        {/* 집행 */}
        <div className="orgh-col orgh-col--wide">
          <HRoot variant="hb--exec" tier="집행" name={EXEC.name} meta={EXEC.meta} />
          <ColumnBranches
            branches={EXEC.branches}
            branchVariant="hb--branch-exec"
            leafVariant="hb--leaf-exec"
            onLeafClick={setSelectedLeaf}
          />
        </div>
      </div>

      {/* 2023~2026 신규 법령·지침 타임라인 (우측 하단) */}
      <div className="orgh-news-panel">
        <div className="orgh-news-header">
          <span className="orgh-news-tier">2023 → 현재</span>
          <span className="orgh-news-title">📅 국토 분야 신규 제정·개정 법령·지침</span>
          <span className="orgh-news-sub">시험·실무 출제 빈도 ★★★</span>
        </div>
        <div className="orgh-news-grid">
          {NEW_LAWS_BY_YEAR.map((y) => (
            <div key={y.year} className="orgh-news-year-block">
              <div className="orgh-news-year-badge">{y.year}</div>
              <ul className="orgh-news-list">
                {y.items.map((it, i) => {
                  const hasDetail = it.lookup && lookupSummary(it.lookup);
                  const cls = `orgh-news-item${it.star ? ' orgh-news-item--star' : ''}${hasDetail ? ' orgh-news-item--clickable' : ''}`;
                  return (
                    <li
                      key={i}
                      className={cls}
                      onClick={hasDetail ? () => setSelectedLeaf(it.lookup) : undefined}
                      role={hasDetail ? 'button' : undefined}
                      tabIndex={hasDetail ? 0 : undefined}
                      onKeyDown={hasDetail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLeaf(it.lookup); } } : undefined}
                    >
                      <div className="orgh-news-item-name">
                        {it.star ? '★ ' : ''}{it.name}
                        {hasDetail && <span className="orgh-news-item-arrow">→</span>}
                      </div>
                      {it.meta && <div className="orgh-news-item-meta">{it.meta}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {currentLeaf && (
        <SummaryModal
          leafName={currentLeaf}
          onClose={closeAll}
          onSelectLaw={openLeaf}
          onBack={canGoBack ? goBack : null}
        />
      )}
    </div>
  );
}
