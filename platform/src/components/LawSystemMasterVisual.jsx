import React from 'react';

const TIER1_BASIC = [
  { name: '국토기본법', sub: '→ 국토종합계획(20년)' },
  { name: '건축기본법', sub: '→ 건축정책기본계획(5년)' },
  { name: '주거기본법', sub: '→ 주거종합계획·주거권' },
  { name: '탄소중립기본법', sub: '→ 2050 국가비전' },
  { name: 'AI기본법', sub: '→ 고영향 AI 8영역 (2026.1)' },
  { name: '국가공간정보 기본법', sub: '→ 국가공간정보정책 기본계획' },
  { name: '지방분권균형발전법', sub: '→ 지방시대위·기회발전특구' }
];

const TIER2_CORE = [
  { name: '국토계획법', star: true, sub: '용도지역(21종)·공간혁신구역·지구단위계획' },
  { name: '건축법', sub: '건폐·용적·공개공지·건축협정' },
  { name: '주택법', sub: '사업계획승인·국민주택규모 85㎡' },
  { name: '수도권정비계획법', sub: '3대 권역·총량규제' }
];

const TIER3_CATEGORIES = [
  { num: '①', name: '도시개발·재생', count: 8, laws: '도정법·도시개발법·도시재생법·노후계획도시법·빈집법·도시재정비법·도심복합개발법·택지개발촉진법' },
  { num: '②', name: '산업·물류', count: 5, laws: '산업입지법·산집법·도시공업지역법·경자법·기업도시법' },
  { num: '③', name: '주택·주거', count: 6, laws: '공공주택법·민간임대주택법·공동주택관리법·리츠법·자산유동화법·재초환법' },
  { num: '④', name: '토지·보상', count: 6, laws: '토지보상법·개발이익환수법·GB법·토지이용규제법·농지법·산지관리법' },
  { num: '⑤', name: '시설·기반', count: 8, laws: '도로법·사도법·항만법·공항시설법·도시철도법·민투법·철도지하화통합개발법·농어촌도로정비법' },
  { num: '⑥', name: '환경·녹지', count: 9, laws: '자연환경보전법·자연공원법·공원녹지법·습지보전법·백두대간법·환경영향평가법·녹색건축법·친수구역법·하천법' },
  { num: '⑦', name: '농어촌·균형', count: 4, laws: '농촌공간재구조화법·농어촌정비법·어촌·어항법·인구감소지역법' },
  { num: '⑧', name: '경관·문화', count: 4, laws: '경관법·한옥등건축자산법·관광진흥법·교육환경법' },
  { num: '⑨', name: '안전·방재', count: 4, laws: '자연재해대책법·군사기지법·보행안전법·자전거법' },
  { num: '⑩', name: '신산업·특별', count: 4, laws: '모빌리티혁신법·스마트도시법·도시농업법 (+AI기본법)' },
  { num: '⑪', name: '공간정보·측량', count: 2, laws: '공간정보관리법·산림기본법' }
];

const TIER4_DECREES = [
  { name: '국토계획법 시행령', star: true, key: '용도지역 21종(제30조)·건폐율(제84조)·용적률(제85조)·도시·군계획시설 53종(제2조)' },
  { name: '건축법 시행령', key: '공개공지 5천㎡(제27조의2)·대지조경' },
  { name: '도정법 시행령', key: '정비계획 입안대상지역(별표 1)·노후·불량건축물 기준' },
  { name: '노후계획도시법 시행령', key: '100만㎡·산단 50만㎡·25% 인접지역' },
  { name: '빈집법 시행령', key: '자율주택 1만㎡·소규모재건축 200세대' },
  { name: '환경영향평가법 시행령', key: '대상사업 18종 정확 규모' },
  { name: '도시개발법 시행령', key: '시행자 11종·개발계획 17개 항목' }
];

const TIER5_RULES = [
  '국토계획법 시행규칙 — 도시·군계획시설 세부분류',
  '도시·군계획시설의 결정·구조 및 설치기준에 관한 규칙 ★',
  '도정법 시행규칙·도시공원녹지법 시행규칙·건축법 시행규칙',
  '건축물의 구조기준·설비기준·피난방화구조 규칙',
  '녹색건축 인증에 관한 규칙 (2025.10.1 기후에너지환경부령)'
];

const TIER6_GUIDELINES = [
  {
    head: '① 수립지침 (8종)', sub: '국토교통부훈령',
    items: [
      '광역도시계획수립지침',
      '도시·군기본계획수립지침 (훈령1694, 2023.12.28)',
      '도시·군관리계획수립지침 (훈령1901, 2026.10.2)',
      '지구단위계획수립지침 (훈령1768, 2024.5.20)',
      '공간재구조화계획수립지침',
      '경관계획수립지침',
      '도시재생전략·활성화계획수립지침',
      '정비기본계획수립지침'
    ]
  },
  {
    head: '② 가이드라인 (9종)', sub: '국토부 고시·기후에너지환경부 등',
    items: [
      '★ 공공기여 가이드라인 (2025.3.26 확정, 70% 한도)',
      '도시·주거환경정비 기본방침 (10년/5년)',
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
    head: '③ 평가·심의 고시 (5종)', sub: '환경부·국토부·행안부',
    items: [
      '전략환경영향평가 작성규정',
      '환경영향평가 협의업무 처리규정',
      '교통영향평가 지침',
      '재해영향평가 운영지침',
      '도시·군계획평가 운영지침 (2026.10.2~)'
    ]
  }
];

const TIER7_ORDINANCES = [
  '시·도 도시계획조례 (광역) — 용도지역 건폐·용적률 세부 비율',
  '시·군·구 도시계획조례 (기초) — 지역 특성',
  '건축조례·정비조례·경관조례·공원녹지조례·주차장조례',
  '도시계획위원회 조례·빈집정비조례·도시재생 활성화 지원 조례'
];

const MINISTRIES = [
  { dept: '국토교통부 (~30개)', laws: '국토계획법·건축법·주택법·도정법·도시개발법·도시재생법·노후계획도시법·공공주택법·토지보상법·도로법·민투법·경관법·스마트도시법·공간정보관리법' },
  { dept: '기후에너지환경부 (구 환경부, 2025.10.1)', laws: '자연환경보전법·자연공원법·환경영향평가법·하천법·녹색건축법' },
  { dept: '행정안전부', laws: '자연재해대책법·지방분권균형발전법' },
  { dept: '농림축산식품부', laws: '농지법·산지관리법·농촌공간재구조화법·산림기본법' },
  { dept: '해양수산부', laws: '항만법·어촌·어항법' },
  { dept: '문체부 / 교육부 / 국방부 / 과기정통부', laws: '관광진흥법 / 교육환경법 / 군사기지법 / AI기본법' }
];

const MAPPING_TIPS = [
  ['"숫자"를 찾을 땐', '시행령 + 조례'],
  ['"절차"를 찾을 땐', '시행규칙 + 수립지침'],
  ['"권한·종류"를 찾을 땐', '법률'],
  ['"세부 운영"을 찾을 땐', '가이드라인 + 조례']
];

const NEW_LAWS = [
  '공간혁신구역 (2024.8)',
  '노후계획도시법 (2024.4)',
  '철도지하화통합개발법 (2025.1)',
  '공공기여 가이드라인 (2025.3.26)',
  '도심복합개발법 (2025.10.1)',
  '환경부→기후에너지환경부 (2025.10.1)',
  '재건축진단 (2026.1.2)',
  'AI기본법 (2026.1.22)'
];

function Arrow({ label }) {
  return (
    <div className="law-master-arrow">
      <span className="law-master-arrow-label">{label}</span>
    </div>
  );
}

function Tier({ variant, badge, icon, title, meta, children }) {
  return (
    <div className={`law-master-tier law-master-tier--${variant}`}>
      <div className="law-master-tier-head">
        <span className="law-master-tier-badge">{badge}</span>
        <span className="law-master-tier-icon">{icon}</span>
        <span className="law-master-tier-title">{title}</span>
        {meta && <span className="law-master-tier-meta">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export default function LawSystemMasterVisual() {
  return (
    <div className="law-master">
      <div className="law-master-header">
        ★ 국토 관련 법령 체계 — 통합 마스터 도식 ★
        <span className="sub">헌법부터 자치법규·인허가까지 7단계 위계 한 장에</span>
      </div>

      <Tier variant="t0" badge="Tier 0" icon="⚖️" title="헌법" meta="최상위 · 국민투표">
        <ul className="law-master-list">
          <li><strong>제23조</strong> 재산권 보장 (공공복리 적합성)</li>
          <li><strong>제35조</strong> 환경권 보장</li>
          <li><strong>제120조</strong> 자원·국토의 효율적 이용·개발·보전</li>
          <li><strong>제122조</strong> 국토의 균형발전·이용제한</li>
        </ul>
      </Tier>

      <Arrow label="↓ 헌법 제40조 입법권 위임" />

      <Tier variant="t123" badge="Tier 1~3" icon="📜" title="법률 (Acts)" meta="국회 의결 · 약 60여 개 · 모두 동일 효력">
        <div className="law-master-grid3">
          <div className="law-master-col law-master-col--t1">
            <div className="law-master-col-head">Tier 1 · 기본법</div>
            <div className="law-master-col-sub">정책 방향 · {TIER1_BASIC.length}개</div>
            <ul>
              {TIER1_BASIC.map((l, i) => (
                <li key={i}><b>{l.name}</b><br /><span style={{color:'#64748b', fontSize:'11.5px'}}>{l.sub}</span></li>
              ))}
            </ul>
          </div>
          <div className="law-master-col law-master-col--t2">
            <div className="law-master-col-head">Tier 2 · 핵심법</div>
            <div className="law-master-col-sub">일반 규제 · {TIER2_CORE.length}개</div>
            <ul>
              {TIER2_CORE.map((l, i) => (
                <li key={i}><b>{l.star ? '★ ' : ''}{l.name}</b><br /><span style={{color:'#64748b', fontSize:'11.5px'}}>{l.sub}</span></li>
              ))}
            </ul>
          </div>
          <div className="law-master-col law-master-col--t3">
            <div className="law-master-col-head">Tier 3 · 분야별 특별법</div>
            <div className="law-master-col-sub">약 50여 개 · 11 카테고리</div>
            <div className="law-master-categories">
              {TIER3_CATEGORIES.map((c, i) => (
                <div key={i} className="law-master-cat">
                  <span className="law-master-cat-num">{c.num}</span>
                  <span className="law-master-cat-name">{c.name} ({c.count})</span>
                  <span className="law-master-cat-laws">{c.laws}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="law-master-principles">
          <b>적용 4원칙:</b> ① 상위법 우선 (헌법&gt;법률&gt;시행령…) · ② 특별법 우선 (도정법&gt;국토계획법) ·
          ③ 신법 우선 (2024 노후계획도시법&gt;2002 국토계획법) · ④ 부당결부금지 (행정기본법 제13조)
        </div>
      </Tier>

      <Arrow label="↓ 법률 위임 ‘대통령령으로 정한다’" />

      <Tier variant="t4" badge="Tier 4" icon="📋" title="시행령 (대통령령)" meta="정부 국무회의 의결 · 대통령 공포">
        <ul className="law-master-list">
          {TIER4_DECREES.map((d, i) => (
            <li key={i}>{d.star ? '★ ' : ''}<strong>{d.name}</strong> — {d.key}</li>
          ))}
        </ul>
      </Tier>

      <Arrow label="↓ 시행령 위임 ‘부령으로 정한다’" />

      <Tier variant="t5" badge="Tier 5" icon="📑" title="시행규칙 (부령)" meta="부처 장관 발령">
        <ul className="law-master-list">
          {TIER5_RULES.map((r, i) => (<li key={i}>{r}</li>))}
        </ul>
      </Tier>

      <Arrow label="↓ 법령 운영의 내부 처리기준" />

      <Tier variant="t6" badge="Tier 6" icon="📘" title="행정규칙·지침 (훈령·고시·예규)" meta="법령 위임 한도 내에서만 효력">
        <div className="law-master-grid3" style={{gridTemplateColumns: '1fr 1fr 1fr'}}>
          {TIER6_GUIDELINES.map((g, i) => (
            <div key={i} className="law-master-col" style={{borderLeftColor:'#0891b2', background:'#ecfeff'}}>
              <div className="law-master-col-head">{g.head}</div>
              <div className="law-master-col-sub">{g.sub}</div>
              <ul>{g.items.map((it, j) => (<li key={j}>{it}</li>))}</ul>
            </div>
          ))}
        </div>
      </Tier>

      <Arrow label="↓ 적용·해석" />

      <Tier variant="t7" badge="Tier 7" icon="🏘" title="자치법규 (조례·규칙)" meta="지방의회 의결 / 단체장 발령 · 법령 위배 不可">
        <ul className="law-master-list">
          {TIER7_ORDINANCES.map((o, i) => (<li key={i}>{o}</li>))}
        </ul>
      </Tier>

      <Arrow label="↓ 종단 적용" />

      <Tier variant="exec" badge="집행" icon="🏗" title="인허가 단계" meta="실무 종단 흐름">
        <div className="law-master-exec-flow">
          <span className="step">도시·군기본계획</span>
          <span className="arr">▶</span>
          <span className="step">도시·군관리계획</span>
          <span className="arr">▶</span>
          <span className="step">지구단위계획</span>
          <span className="arr">▶</span>
          <span className="step">사업시행계획</span>
          <span className="arr">▶</span>
          <span className="step">건축허가</span>
          <span className="arr">▶</span>
          <span className="step">착공</span>
          <span className="arr">▶</span>
          <span className="step">준공</span>
        </div>
      </Tier>

      <div className="law-master-grid2">
        <div className="law-master-card law-master-card--ministry">
          <h4>🏛 부처별 소관 법령 분포</h4>
          <ul>
            {MINISTRIES.map((m, i) => (
              <li key={i}><b>{m.dept}</b> — {m.laws}</li>
            ))}
          </ul>
        </div>
        <div className="law-master-card law-master-card--mapping">
          <h4>🗺 단계별 핵심 위임 — 어디서 찾나?</h4>
          <ul>
            {MAPPING_TIPS.map((t, i) => (
              <li key={i}><b>{t[0]}</b> → {t[1]}</li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{marginTop: 14}}>
        <h4 style={{margin:'0 0 6px', fontSize:13, fontWeight:700, color:'#0f172a'}}>
          🆕 2024~2026 주요 신규 법령·변경 (시험·실무 출제 빈도 ★★★)
        </h4>
        <div className="law-master-tags">
          {NEW_LAWS.map((n, i) => (
            <span key={i} className="law-master-tag law-master-tag--new">{n}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
