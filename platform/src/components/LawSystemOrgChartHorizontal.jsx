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
        '★ 지구단위계획수립지침 (1768)',
        '공간재구조화계획수립지침',
        '★ 경관계획수립지침',
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

const FREQ_TIERS = [
  {
    level: '★★★★',
    label: '필수 암기 · 매회 출제',
    variant: 'top',
    items: [
      { name: '국토계획법 + 시행령', detail: '용도지역·건폐율·용적률·도시계획시설', lookup: '국토계획법' },
      { name: '지구단위계획수립지침', detail: '특별계획구역·공공기여·공간혁신구역', lookup: '지구단위계획수립지침' },
      { name: '공공기여 가이드라인', detail: '2025.3.26 신규·지가상승 70% 한도', lookup: '공공기여 가이드라인' }
    ]
  },
  {
    level: '★★★',
    label: '자주 출제',
    variant: 'mid',
    items: [
      { name: '도정법', detail: '재개발·재건축', lookup: '도정법' },
      { name: '노후계획도시법', detail: '1기 신도시 (2024 신규)', lookup: '노후계획도시법' },
      { name: '경관법 + 경관계획수립지침', detail: '경관기본원칙 6원칙', lookup: '경관법' },
      { name: '환경영향평가법', detail: '18종 사업 평가', lookup: '환경영향평가법' },
      { name: '도시재생법', detail: '활성화지역·인정사업', lookup: '도시재생법' }
    ]
  },
  {
    level: '★★',
    label: '가끔 출제',
    variant: 'low',
    items: [
      { name: '토지보상법·GB법', detail: '공익사업 8종·그린벨트', lookup: '토지보상법' },
      { name: '도시개발법·빈집법', detail: '도시개발사업·소규모정비', lookup: '도시개발법' },
      { name: '도시·주거환경정비 기본방침', detail: '도정법 제3조 (10년)', lookup: '도시·주거환경정비 기본방침' }
    ]
  }
];

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

// 법제처 (law.go.kr) 바로가기 URL 생성
function getLawGoKrUrl(summary) {
  if (!summary) return null;
  const type = summary.type || '';
  const name = summary.formal || summary.key;
  if (!name) return null;

  // 카테고리·정부조직 개편·계획 단계 — 직접 법령 페이지 없음
  if (type.includes('카테고리') || type.includes('정부조직') || type.includes('계획 단계')) {
    return null;
  }

  // 허가·집행 단계 — formal에서 부모 법명 추출
  if (type.includes('허가') || type.includes('집행 단계')) {
    const m = name.match(/\(([^)]+?(?:법|법률))\s/);
    if (m) {
      return `https://www.law.go.kr/법령/${encodeURIComponent(m[1].trim())}`;
    }
    return null;
  }

  // 행정규칙 (수립지침·가이드라인·평가고시·기본방침)
  if (type.includes('행정규칙') || type.includes('수립지침') ||
      type.includes('가이드라인') || type.includes('평가고시')) {
    return `https://www.law.go.kr/행정규칙/${encodeURIComponent(name)}`;
  }

  // 자치법규 (조례·규칙)
  if (type.includes('자치법규') || type.includes('조례')) {
    return `https://www.law.go.kr/자치법규/${encodeURIComponent(name)}`;
  }

  // 기본: 법률·시행령·시행규칙 모두 /법령/
  return `https://www.law.go.kr/법령/${encodeURIComponent(name)}`;
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

function HBranch({ variant, name, meta, onClick, collapsed }) {
  const isToggle = onClick !== undefined;
  return (
    <div
      className={`hb hb--branch ${variant}${isToggle ? ' hb--toggle' : ''}`}
      onClick={onClick}
      role={isToggle ? 'button' : undefined}
      tabIndex={isToggle ? 0 : undefined}
      onKeyDown={isToggle ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      <div className="hb-name">
        {isToggle && <span className="hb-toggle-icon">{collapsed ? '▶' : '▼'}</span>}
        {name}
      </div>
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

function ColumnBranches({ branches, branchVariant, leafVariant, onLeafClick, expandedBranchIndex }) {
  const [branchCollapsed, setBranchCollapsed] = useState(() => {
    // 분야별 특별법(expandedBranchIndex)은 기본 접힘 상태로 시작
    return expandedBranchIndex !== undefined ? { [expandedBranchIndex]: true } : {};
  });
  const toggleBranch = (i) => setBranchCollapsed(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="h-branches">
      {branches.map((b, i) => {
        const isExpanded = i === expandedBranchIndex;
        const collapsed = !!branchCollapsed[i];
        const canToggle = isExpanded;

        return (
          <div key={i} className="h-branch-group">
            <HBranch
              variant={branchVariant}
              name={b.name}
              meta={b.meta}
              onClick={canToggle ? () => toggleBranch(i) : undefined}
              collapsed={collapsed}
            />
            {!collapsed && (
              isExpanded ? (
                <ExpandedCategoryList categories={b.leaves} onLawClick={onLeafClick} />
              ) : (
                <div className="h-leaves h-leaves--small">
                  {b.leaves.map((l, j) => (
                    <HLeaf key={j} variant={leafVariant} name={l} onClick={() => onLeafClick(l)} />
                  ))}
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExpandedCategoryList({ categories, onLawClick }) {
  // 11개 카테고리 모두 기본 접힘 상태로 시작
  const [catCollapsed, setCatCollapsed] = useState(() => {
    const init = {};
    categories.forEach((_, i) => { init[i] = true; });
    return init;
  });
  const toggleCat = (i) => setCatCollapsed(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="h-cat-list">
      {categories.map((catName, i) => {
        const entry = lookupSummary(catName);
        const laws = entry?.composition || [];
        const collapsed = !!catCollapsed[i];
        return (
          <div key={i} className={`h-cat-card${collapsed ? ' h-cat-card--collapsed' : ''}`}>
            <div className="h-cat-card-title" onClick={() => toggleCat(i)} role="button" tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCat(i); } }}>
              <span className="h-cat-card-arrow">{collapsed ? '▶' : '▼'}</span>
              <span className="h-cat-card-name">{catName}</span>
              <button
                type="button"
                className="h-cat-card-detail"
                onClick={(e) => { e.stopPropagation(); onLawClick(catName); }}
                title="카테고리 상세 보기"
              >ℹ︎</button>
            </div>
            {!collapsed && (
              <div className="h-cat-card-laws">
                {laws.map((c, j) => {
                  const m = c.match(/^([^—\-]+?)\s*[—\-]\s*(.+)$/);
                  const lawName = m ? m[1].trim() : c;
                  const desc = m ? m[2].trim() : '';
                  const hasDetail = !!lookupSummary(lawName);
                  return (
                    <div
                      key={j}
                      className={`h-cat-law${hasDetail ? ' h-cat-law--clickable' : ''}`}
                      onClick={hasDetail ? () => onLawClick(lawName) : undefined}
                      role={hasDetail ? 'button' : undefined}
                      tabIndex={hasDetail ? 0 : undefined}
                      onKeyDown={hasDetail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLawClick(lawName); } } : undefined}
                    >
                      <span className="h-cat-law-name">{lawName}</span>
                      {desc && <span className="h-cat-law-desc"> — {desc}</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const DOJUNG_PHASES = [
  {
    phase: '정책', icon: '🏛', color: 'red',
    steps: [
      { num: 1, name: '도시·주거환경정비 기본방침', actor: '국토교통부장관', meta: '10년 단위 / 5년 검토 (제3조)', unique: true }
    ]
  },
  {
    phase: '계획', icon: '📋', color: 'blue',
    steps: [
      { num: 2, name: '도시·주거환경정비 기본계획', actor: '시·도지사', meta: '10년 / 5년 재검토 (제4조)' },
      { num: 3, name: '정비계획 + 정비구역 지정', actor: '시·군·구청장', meta: '구역 지정·고시 (제8조)' }
    ]
  },
  {
    phase: '사업·인가', icon: '⚙️', color: 'purple',
    steps: [
      { num: 4, name: '조합 설립인가', actor: '조합', meta: '토지등소유자 3/4 동의 (제35조)' },
      { num: 5, name: '사업시행계획 인가', actor: '조합 → 시·군·구청장', meta: '제50조 ★ 핵심', star: true },
      { num: 6, name: '관리처분계획 인가', actor: '조합 → 시·군·구청장', meta: '제74조 ★ 핵심', star: true }
    ]
  },
  {
    phase: '시공·준공', icon: '🏗️', color: 'green',
    steps: [
      { num: 7, name: '시공·준공·이전등기', actor: '조합·시공자', meta: '제83조 등' }
    ]
  }
];

const KOOKTO_PHASES = [
  {
    phase: '계획', icon: '📋', color: 'blue',
    steps: [
      { num: 1, name: '광역도시계획', actor: '광역단체', meta: '20년 / 5년' },
      { num: 2, name: '도시·군기본계획', actor: '시·군·구', meta: '20년 (제18조)' },
      { num: 3, name: '도시·군관리계획', actor: '시·군·구', meta: '5년 재정비 (제24조)' },
      { num: 4, name: '지구단위계획', actor: '시·군·구', meta: '제49조' }
    ]
  },
  {
    phase: '집행', icon: '🏗️', color: 'orange',
    steps: [
      { num: 5, name: '개발행위·건축허가', actor: '시·군·구청장', meta: '제56조 / 건축법' },
      { num: 6, name: '준공검사·사용승인', actor: '시·군·구청장', meta: '' }
    ]
  }
];

function DoJungPhaseTimeline({ phases, totalSteps }) {
  return (
    <div className="djp-timeline">
      {phases.map((p, pi) => (
        <div key={pi} className={`djp-phase djp-phase--${p.color}`}>
          <div className="djp-phase-head">
            <span className="djp-phase-icon">{p.icon}</span>
            <span className="djp-phase-label">{p.phase}</span>
          </div>
          <div className="djp-steps">
            {p.steps.map((s, si) => (
              <div key={si} className={`djp-step${s.unique ? ' djp-step--unique' : ''}${s.star ? ' djp-step--star' : ''}`}>
                {s.unique && <div className="djp-step-badge">★ 도정법 고유 ★</div>}
                <div className="djp-step-num">{s.num}</div>
                <div className="djp-step-content">
                  <div className="djp-step-actor">{s.actor}</div>
                  <div className="djp-step-name">{s.name}</div>
                  {s.meta && <div className="djp-step-meta">{s.meta}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DoJungHierarchyDiagram() {
  return (
    <div className="dojung-diagram">
      <div className="dojung-diff-note">
        <strong>💡 도정법 vs 국토계획법 핵심 차이:</strong> 도정법에는 <span className="dojung-key">「기본방침」</span> (국토부장관 · 제3조)이 별도로 존재 —
        정비사업의 <strong>국가 차원 정책 우산</strong>. 국토계획법은 광역도시계획부터 시작 (해당 단계 없음).
      </div>

      <div className="dojung-comparison">
        <div className="dojung-side dojung-side--main">
          <div className="dojung-side-head">
            <span className="dojung-side-tag">📍 도정법</span>
            <span className="dojung-side-title">정비사업 — 7단계 / 4 Phase</span>
          </div>
          <DoJungPhaseTimeline phases={DOJUNG_PHASES} />
        </div>
        <div className="dojung-side dojung-side--ref">
          <div className="dojung-side-head">
            <span className="dojung-side-tag dojung-side-tag--ref">📋 국토계획법</span>
            <span className="dojung-side-title">참고 — 6단계 / 2 Phase</span>
          </div>
          <DoJungPhaseTimeline phases={KOOKTO_PHASES} />
        </div>
      </div>

      <div className="dojung-summary-grid">
        <div className="dojung-summary-card dojung-summary-card--key">
          <div className="dojung-summary-card-head">🔑 도정법 고유</div>
          <div className="dojung-summary-card-body">
            <strong>기본방침</strong> (국토부장관, 10년 / 5년 검토)<br />
            정비사업의 국가 정책 방향 제시
          </div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--plan">
          <div className="dojung-summary-card-head">📊 3단계 계획 위계</div>
          <div className="dojung-summary-card-body">
            기본방침(국토부) → 기본계획(시·도) → 정비계획(기초)
          </div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--biz">
          <div className="dojung-summary-card-head">⚙️ 4단계 사업 절차</div>
          <div className="dojung-summary-card-body">
            조합 설립 → <strong>사업시행인가</strong>(제50조) → <strong>관리처분</strong>(제74조) → 준공
          </div>
        </div>
      </div>
    </div>
  );
}

function KooktoYongdoDiagram() {
  return (
    <div className="dojung-diagram">
      <div className="dojung-diff-note">
        <strong>💡 용도지역(21종) + 용도지구 + 용도구역 — 3중 구조:</strong>
        용도지역은 <strong>1개만 지정</strong>(기본 골격), 용도지구·용도구역은 <strong>중복 지정 가능</strong>(보완·강화).
      </div>
      <div className="dojung-comparison" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div className="dojung-side dojung-side--main">
          <div className="dojung-side-head">
            <span className="dojung-side-tag">🏘 용도지역</span>
            <span className="dojung-side-title">21종 / 1개만</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--blue">
              <div className="djp-phase-head"><span className="djp-phase-icon">🏠</span><span className="djp-phase-label">도시지역 16</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">6</div><div className="djp-step-content"><div className="djp-step-actor">주거</div><div className="djp-step-name">전용 1·2 / 일반 1·2·3 / 준</div></div></div>
                <div className="djp-step"><div className="djp-step-num">4</div><div className="djp-step-content"><div className="djp-step-actor">상업</div><div className="djp-step-name">중심·일반·근린·유통</div></div></div>
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">공업</div><div className="djp-step-name">전용·일반·준</div></div></div>
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">녹지</div><div className="djp-step-name">보전·생산·자연</div></div></div>
              </div>
            </div>
            <div className="djp-phase djp-phase--green">
              <div className="djp-phase-head"><span className="djp-phase-icon">🌳</span><span className="djp-phase-label">비도시 5</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">관리</div><div className="djp-step-name">보전·생산·계획</div></div></div>
                <div className="djp-step"><div className="djp-step-num">1</div><div className="djp-step-content"><div className="djp-step-actor">농림</div><div className="djp-step-name">농림지역</div></div></div>
                <div className="djp-step"><div className="djp-step-num">1</div><div className="djp-step-content"><div className="djp-step-actor">자연</div><div className="djp-step-name">자연환경보전지역</div></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dojung-side">
          <div className="dojung-side-head">
            <span className="dojung-side-tag dojung-side-tag--ref">📌 용도지구</span>
            <span className="dojung-side-title">보완 · 중복</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--purple">
              <div className="djp-phase-head"><span className="djp-phase-label">보완</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">경관지구</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">고도지구</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">방화지구·방재지구</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">보호지구</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">취락지구·개발진흥지구</div></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dojung-side">
          <div className="dojung-side-head">
            <span className="dojung-side-tag dojung-side-tag--ref">⛔ 용도구역</span>
            <span className="dojung-side-title">강화·완화</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--red">
              <div className="djp-phase-head"><span className="djp-phase-label">특별 규제</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">개발제한구역 (GB)</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">시가화조정구역</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">도시자연공원구역</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">수산자원보호구역</div></div></div>
                <div className="djp-step"><div className="djp-step-num">·</div><div className="djp-step-content"><div className="djp-step-name">공간혁신구역 (2024.8~)</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dojung-summary-grid">
        <div className="dojung-summary-card dojung-summary-card--key">
          <div className="dojung-summary-card-head">📐 적용 원칙</div>
          <div className="dojung-summary-card-body"><strong>용도지역</strong>은 1개만 / <strong>지구·구역</strong>은 중복 가능</div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--plan">
          <div className="dojung-summary-card-head">📊 효력</div>
          <div className="dojung-summary-card-body">건폐율·용적률·용도 규제 (시행령 별표)</div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--biz">
          <div className="dojung-summary-card-head">⚖️ 출제 빈도</div>
          <div className="dojung-summary-card-body">★★★★ — <strong>매회 출제</strong></div>
        </div>
      </div>
    </div>
  );
}

function GonggiEvaluationDiagram() {
  return (
    <div className="dojung-diagram">
      <div className="dojung-diff-note">
        <strong>💡 공공기여 가이드라인(2025.3.26) 핵심:</strong>
        <span className="dojung-key">「부담 한도 = 지가상승분 × 70% 이내」</span>
        + 평가시점 표준화로 자의적 적용 방지.
      </div>
      <div className="dojung-comparison" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="dojung-side dojung-side--main">
          <div className="dojung-side-head">
            <span className="dojung-side-tag">📍 종전 평가시점</span>
            <span className="dojung-side-title">기준일 통일</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--blue">
              <div className="djp-phase-head"><span className="djp-phase-icon">📅</span><span className="djp-phase-label">기준</span></div>
              <div className="djp-steps">
                <div className="djp-step djp-step--star"><div className="djp-step-num">★</div><div className="djp-step-content"><div className="djp-step-actor">기준일</div><div className="djp-step-name">계획안 최초 열람·공고 전날</div><div className="djp-step-meta">사업자 자의 적용 방지</div></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dojung-side dojung-side--main">
          <div className="dojung-side-head">
            <span className="dojung-side-tag">📍 종후 평가시점</span>
            <span className="dojung-side-title">기준일 통일</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--green">
              <div className="djp-phase-head"><span className="djp-phase-icon">📅</span><span className="djp-phase-label">기준</span></div>
              <div className="djp-steps">
                <div className="djp-step djp-step--star"><div className="djp-step-num">★</div><div className="djp-step-content"><div className="djp-step-actor">기준일</div><div className="djp-step-name">공공기여 계획 포함 결정·고시일</div><div className="djp-step-meta">투명한 종후 평가</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dojung-summary-grid">
        <div className="dojung-summary-card dojung-summary-card--key">
          <div className="dojung-summary-card-head">💰 부담 한도</div>
          <div className="dojung-summary-card-body"><strong>지가상승분 × 70%</strong> 이내 (이전: 자의)</div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--plan">
          <div className="dojung-summary-card-head">📋 표준 비율</div>
          <div className="dojung-summary-card-body">사업유형별 <strong>15~25%</strong> (지구단위 10~20%, 공간혁신 20~25%)</div>
        </div>
        <div className="dojung-summary-card dojung-summary-card--biz">
          <div className="dojung-summary-card-head">🎯 4유형</div>
          <div className="dojung-summary-card-body">토지·시설·임대주택·현금</div>
        </div>
      </div>
    </div>
  );
}

function EiaFlowDiagram() {
  return (
    <div className="dojung-diagram">
      <div className="dojung-diff-note">
        <strong>💡 환경영향평가 3단계 체계:</strong> <span className="dojung-key">전략환경(계획)</span> → 환경영향(사업) → 소규모환경(소규모).
        단계별 평가로 환경 보호 + 사업 효율 균형.
      </div>
      <div className="dojung-comparison" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div className="dojung-side dojung-side--main">
          <div className="dojung-side-head">
            <span className="dojung-side-tag">🌍 전략환경</span>
            <span className="dojung-side-title">정책·계획</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--blue">
              <div className="djp-phase-head"><span className="djp-phase-label">상위</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">1</div><div className="djp-step-content"><div className="djp-step-actor">대상</div><div className="djp-step-name">도시·군기본·관리계획·산업단지계획</div></div></div>
                <div className="djp-step"><div className="djp-step-num">2</div><div className="djp-step-content"><div className="djp-step-actor">특징</div><div className="djp-step-name">대안 비교 의무</div></div></div>
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">협의</div><div className="djp-step-name">30~60일</div></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dojung-side">
          <div className="dojung-side-head">
            <span className="dojung-side-tag dojung-side-tag--ref">🏗 환경영향</span>
            <span className="dojung-side-title">사업 단계</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--orange">
              <div className="djp-phase-head"><span className="djp-phase-label">대규모</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">1</div><div className="djp-step-content"><div className="djp-step-actor">대상</div><div className="djp-step-name">18종 사업 (도시·산단·도로 등)</div></div></div>
                <div className="djp-step"><div className="djp-step-num">2</div><div className="djp-step-content"><div className="djp-step-actor">규모</div><div className="djp-step-name">도시 25만㎡·도로 4km 이상</div></div></div>
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">사후관리</div><div className="djp-step-name">5년</div></div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="dojung-side">
          <div className="dojung-side-head">
            <span className="dojung-side-tag dojung-side-tag--ref">🌱 소규모환경</span>
            <span className="dojung-side-title">소규모</span>
          </div>
          <div className="djp-timeline">
            <div className="djp-phase djp-phase--green">
              <div className="djp-phase-head"><span className="djp-phase-label">소규모</span></div>
              <div className="djp-steps">
                <div className="djp-step"><div className="djp-step-num">1</div><div className="djp-step-content"><div className="djp-step-actor">대상</div><div className="djp-step-name">도시지역·관리지역 소규모</div></div></div>
                <div className="djp-step"><div className="djp-step-num">2</div><div className="djp-step-content"><div className="djp-step-actor">규모</div><div className="djp-step-name">도시 1만㎡·관리 5천~3만㎡</div></div></div>
                <div className="djp-step"><div className="djp-step-num">3</div><div className="djp-step-content"><div className="djp-step-actor">협의</div><div className="djp-step-name">30일</div></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomDiagram({ name }) {
  if (name === 'dojung-hierarchy') return <DoJungHierarchyDiagram />;
  if (name === 'kookto-yongdo') return <KooktoYongdoDiagram />;
  if (name === 'gonggi-evaluation') return <GonggiEvaluationDiagram />;
  if (name === 'eia-flow') return <EiaFlowDiagram />;
  return null;
}

function KeyDetailRenderer({ detail }) {
  if (!detail) return null;
  const { type } = detail;

  if (type === 'article') {
    return (
      <div className="kd kd--article">
        {detail.title && <div className="kd-title">📜 {detail.title}</div>}
        <blockquote className="kd-article-text">{detail.text}</blockquote>
        {detail.commentary && <div className="kd-commentary">💡 {detail.commentary}</div>}
      </div>
    );
  }

  if (type === 'comparison') {
    return (
      <div className="kd kd--comparison">
        {detail.title && <div className="kd-title">📊 {detail.title}</div>}
        <div className="kd-table-wrap">
          <table className="kd-table">
            <thead>
              <tr>
                {detail.columns.map((c, i) => <th key={i}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {detail.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => <td key={j} dangerouslySetInnerHTML={{ __html: cell }} />)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {detail.note && <div className="kd-note">📌 {detail.note}</div>}
      </div>
    );
  }

  if (type === 'process') {
    return (
      <div className="kd kd--process">
        {detail.title && <div className="kd-title">🔄 {detail.title}</div>}
        <ol className="kd-steps">
          {detail.steps.map((s, i) => (
            <li key={i} className="kd-step">
              <strong>{s.label}</strong>
              {s.desc && <div className="kd-step-desc">{s.desc}</div>}
            </li>
          ))}
        </ol>
        {detail.note && <div className="kd-note">📌 {detail.note}</div>}
      </div>
    );
  }

  // type: 'explanation' or default
  return (
    <div className="kd kd--explanation">
      {detail.title && <div className="kd-title">💬 {detail.title}</div>}
      {detail.text && <div className="kd-text">{detail.text}</div>}
      {detail.points && (
        <ul className="kd-points">
          {detail.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
      {detail.article && (
        <blockquote className="kd-article-text">{detail.article}</blockquote>
      )}
      {detail.note && <div className="kd-note">📌 {detail.note}</div>}
    </div>
  );
}

function SummaryModal({ leafName, onClose, onSelectLaw, onBack }) {
  const [openKey, setOpenKey] = useState(null);
  const summary = lookupSummary(leafName);
  const display = leafName.startsWith('★ ') ? leafName.substring(2) : leafName;

  // 다른 법령으로 전환 시 펼친 핵심내용 리셋
  useEffect(() => { setOpenKey(null); }, [leafName]);

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
          <div className="lsmodal-head-actions">
            {getLawGoKrUrl(summary) && (
              <a
                href={getLawGoKrUrl(summary)}
                target="_blank"
                rel="noopener noreferrer"
                className="lsmodal-lawgokr"
                title="법제처(law.go.kr)에서 원문 보기"
              >
                ⚖️ 법제처 <span className="lsmodal-lawgokr-arr">↗</span>
              </a>
            )}
            <button onClick={onClose} className="lsmodal-close" aria-label="닫기">✕</button>
          </div>
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
              {summary.customDiagram && (
                <div className="lsmodal-section">
                  <h4>📊 위계 도식</h4>
                  <CustomDiagram name={summary.customDiagram} />
                </div>
              )}
              {summary.keys && summary.keys.length > 0 && (
                <div className="lsmodal-section">
                  <h4>★ 핵심 내용 <span className="lsmodal-hint">(클릭 시 상세 해설)</span></h4>
                  <ul className="lsmodal-list lsmodal-list--keys">
                    {summary.keys.map((k, i) => {
                      const detail = summary.keyDetails && summary.keyDetails[k];
                      const isOpen = openKey === i;
                      return (
                        <li key={i} className={detail ? 'lsmodal-key-item lsmodal-key-item--clickable' : 'lsmodal-key-item'}>
                          <div
                            className="lsmodal-key-label"
                            onClick={detail ? () => setOpenKey(isOpen ? null : i) : undefined}
                            role={detail ? 'button' : undefined}
                            tabIndex={detail ? 0 : undefined}
                            onKeyDown={detail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenKey(isOpen ? null : i); } } : undefined}
                          >
                            <span>{k}</span>
                            {detail && <span className="lsmodal-key-arr">{isOpen ? '▼' : '▶'}</span>}
                          </div>
                          {isOpen && detail && (
                            <div className="lsmodal-key-detail">
                              <KeyDetailRenderer detail={detail} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {summary.related && summary.related.length > 0 && (
                <div className="lsmodal-section">
                  <h4>🔗 관련 법령</h4>
                  <div className="lsmodal-tags">
                    {summary.related.map((r, i) => {
                      const hasDetail = !!lookupSummary(r);
                      return (
                        <span
                          key={i}
                          className={`lsmodal-tag${hasDetail ? ' lsmodal-tag--clickable' : ''}`}
                          onClick={hasDetail ? () => onSelectLaw(r) : undefined}
                          role={hasDetail ? 'button' : undefined}
                          tabIndex={hasDetail ? 0 : undefined}
                          onKeyDown={hasDetail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectLaw(r); } } : undefined}
                          title={hasDetail ? `${r} 상세 보기` : r}
                        >
                          {r}
                          {hasDetail && <span className="lsmodal-tag-arr">→</span>}
                        </span>
                      );
                    })}
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
        <div className="orgh-col orgh-col--xwide">
          <HRoot variant="hb--t123" tier="Tier 1~3" name={TIER123.name} meta={TIER123.meta} />
          <ColumnBranches
            branches={TIER123.branches}
            branchVariant="hb--branch-law"
            leafVariant="hb--leaf-law"
            onLeafClick={setSelectedLeaf}
            expandedBranchIndex={2}
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

      {/* 하단 좌우 패널: 출제 빈도 참조 + 신규 법령 타임라인 */}
      <div className="orgh-bottom-row">

      {/* 출제 빈도 참조 (좌측) */}
      <div className="orgh-freq-panel">
        <div className="orgh-freq-header">
          <span className="orgh-freq-tag">시험 빈도</span>
          <span className="orgh-freq-title">📊 도시계획기술사 출제 빈도</span>
          <span className="orgh-freq-sub">130~138회 기준</span>
        </div>
        <div className="orgh-freq-grid">
          {FREQ_TIERS.map((t, i) => (
            <div key={i} className={`orgh-freq-tier-block orgh-freq-tier-block--${t.variant}`}>
              <div className="orgh-freq-tier-head">
                <span className="orgh-freq-tier-level">{t.level}</span>
                <span className="orgh-freq-tier-label">{t.label}</span>
              </div>
              <ul className="orgh-freq-list">
                {t.items.map((it, j) => {
                  const hasDetail = !!lookupSummary(it.lookup);
                  return (
                    <li
                      key={j}
                      className={`orgh-freq-item${hasDetail ? ' orgh-freq-item--clickable' : ''}`}
                      onClick={hasDetail ? () => setSelectedLeaf(it.lookup) : undefined}
                      role={hasDetail ? 'button' : undefined}
                      tabIndex={hasDetail ? 0 : undefined}
                      onKeyDown={hasDetail ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedLeaf(it.lookup); } } : undefined}
                    >
                      <div className="orgh-freq-item-name">
                        {it.name}
                        {hasDetail && <span className="orgh-freq-item-arrow">→</span>}
                      </div>
                      {it.detail && <div className="orgh-freq-item-detail">{it.detail}</div>}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 2023~2026 신규 법령·지침 타임라인 (우측) */}
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

      </div>{/* /orgh-bottom-row */}

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
