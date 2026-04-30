import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import mockExam from '@data/mock-exam-2026-1.json';
import mockAnswers from '@data/mock-exam-2026-1-answers.json';

// 간단한 답안 마크다운 렌더러 (AnswerView와 같은 로직 단순화)
function renderAnswer(text) {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // 빈 줄
    if (!line.trim()) return <br key={i} />;
    // 굵은 글씨 인라인 변환
    const withBold = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // 서론·결론 제목 강조
    if (/^[ⅠⅡⅢⅣⅤⅥ]\.\s/.test(line)) {
      return <div key={i} className="mock-answer-heading" dangerouslySetInnerHTML={{ __html: withBold }} />;
    }
    if (line.startsWith('이상')) {
      return <div key={i} className="mock-answer-end">{line}</div>;
    }
    return <div key={i} className="mock-answer-line" dangerouslySetInnerHTML={{ __html: withBold }} />;
  });
}

export default function MockExamPage() {
  const meta = mockExam.meta;
  const questions = mockExam.questions;
  const answers = mockAnswers.answers;

  const [expandAll, setExpandAll] = useState(false);
  const [expandVersion, setExpandVersion] = useState(0);

  const sessions = useMemo(() => (
    [1, 2, 3, 4].map((s) => ({
      session: s,
      questions: questions.filter(q => q.session === s).sort((a, b) => a.no - b.no)
    }))
  ), [questions]);

  // 전체 펼침/접음 토글 — expandVersion을 키로 사용해 하위 QuestionCard 리마운트
  const handleToggleAll = () => {
    setExpandAll(v => !v);
    setExpandVersion(v => v + 1);
  };

  return (
    <>
      <Link to="/" className="back-link">← 홈</Link>
      <h1 className="page-title">{meta.title}</h1>
      <p className="page-subtitle">{meta.subtitle}</p>

      <div className="mock-meta-card">
        <div><strong>출제 기준:</strong> {meta.basedOn}</div>
        <div><strong>총 문제 수:</strong> {meta.totalQuestions}문제 (1교시 13 + 2·3·4교시 각 6)</div>
        <div><strong>최종 업데이트:</strong> {meta.updatedAt}</div>
        <div className="mock-meta-note">
          💡 <strong>학습법:</strong> 먼저 문제만 읽고 스스로 답안을 구상한 뒤 <em>답안 보기</em>를 클릭해 비교해 보세요.
        </div>
      </div>

      {/* 2026년 법령 개정 업데이트 요약 */}
      <details className="mock-law-updates">
        <summary>📜 2026년 4월 기준 주요 법령·정책 업데이트 (법제처 직접 검증 ✓)</summary>
        <div className="mock-law-updates-body">
          <p style={{margin: '0 0 10px 0', fontSize: '12.5px', color: '#15803d', fontWeight: 600}}>
            ※ 본 정리는 <a href="https://www.law.go.kr" target="_blank" rel="noreferrer">국가법령정보센터(law.go.kr)</a>의 현행 법령 본문을 직접 조회·검증한 결과입니다.
          </p>
          <ul>
            <li><strong>AI 기본법</strong>: 2024.12.26 제정 → <strong>2026.1.22 시행</strong> (EU AI Act 이어 세계 2번째 포괄 규제 / 국가인공지능위원회 대통령 직속)</li>
            <li><strong>공공기여 가이드라인</strong>: 국토부 <strong>2025.3.26 확정·배포</strong> (부담 한도 <strong>지가 상승분의 70% 이내</strong> / 평가시점 표준화)</li>
            <li><strong>노후계획도시 특별법</strong>: 본법 <strong>2026.2.3 일부개정 시행</strong>(법률 제21322호) + 시행령 <strong>2026.1.2 시행</strong>(선도지구 지정 4대 고려사항 명시)</li>
            <li><strong>도정법 재건축진단</strong>: <strong>2026.1.2 시행</strong>(법률 제21065호) — 안전진단 → <strong>재건축진단</strong> 명칭 변경, 사업시행계획인가 전까지 실시 (도정법 제12조 직접 확인)</li>
            <li><strong>국토계획법 공간혁신 3구역(법제처 직접 확인)</strong>: <strong>제40조의3 도시혁신구역</strong> · <strong>제40조의4 복합용도구역</strong> · <strong>제40조의5 입체복합구역</strong> (시행 2026.1.2 법률 제21065호)</li>
            <li><strong>경관법(법제처 직접 확인)</strong>: <strong>제16조 = 경관사업</strong>, <strong>제19조 = 경관협정</strong> (시행 2025.10.1 법률 제21065호)</li>
            <li><strong>1기 신도시 선도지구</strong>: <strong>2024.11.27 15곳 3.6만호 지정</strong> (분당 3곳 10,948 / 일산 3곳 8,912 / 평촌·산본·중동 9곳)</li>
            <li><strong>철도지하화 통합개발 특별법</strong>: 2024.1.30 제정 → <strong>2025.1.31 시행</strong> (시행령 제35233호, 시행규칙 국토부령 제1445호)</li>
            <li><strong>도심복합개발 지원법 시행령</strong>: <strong>2025.2.7 시행</strong> (성장거점형·주거중심형 / 준주거 용적률 140%까지)</li>
            <li><strong>모빌리티 혁신법</strong>: 2023.4 제정, <strong>2023.10.19 시행</strong>, 제8·9조 2024.10 시행 / 2030 로드맵 / 스마트+빌딩법 2026 제정 예정</li>
            <li><strong>농촌공간 재구조화법</strong>: 법 2024.3.29 시행 / 시행령 <strong>2025.11.4 시행</strong> → 특화지구 <strong>7종→8종</strong>(특성화농업지구 추가)</li>
            <li><strong>도시정비법(도정법) 개정</strong>: <strong>2025.6.4 시행</strong> 안전진단→<strong>재건축진단</strong> 명칭 변경, 사업시행계획인가 전 실시 / 조합설립 동의율 재개발 75%→70%</li>
            <li><strong>재건축초과이익환수제</strong>: 2024.3 개정 면제 기준 3천만→<strong>8천만원</strong>, 부과구간 2천만→<strong>5천만원</strong> 상향, 1주택 장기보유 감면·고령자 납부유예</li>
            <li><strong>빈집 및 소규모주택 정비 특례법</strong>: 2025.8.26 개정(법률 제21040호), <strong>2026.2.27 시행</strong></li>
            <li><strong>기회발전특구</strong>: 2024.6 1차 8개 시·도 → 2024.11 2차 6개 시·도 = 총 <strong>14개 비수도권 시·도, 74.3조원 투자</strong></li>
            <li><strong>교육발전특구</strong>(舊 교육자유특구): 2024.2 1차 → <strong>2024.7 2차 광역 1·기초 40 (선도 13·관리 12·예비 9)</strong>, 3년 시범 / 특별법 제정 추진 중</li>
            <li><strong>공간혁신구역 선도사업</strong>: <strong>16곳 후보지 선정</strong> (양재역·김포공항역·청량리역·양주 덕정역·광명 KTX역·의정부 역전근린공원 등)</li>
            <li><strong>부동산 PF 제도개선</strong>: 자기자본비율 <strong>20% 목표</strong>, 2027 단계 시행 / 토지 현물출자 양도차익 과세이연 2026.1 / PF 마중물 앵커리츠 8천억 2026 상반기</li>
            <li><strong>GTX</strong>: A선 서울역~수서역 2026 개통(삼성역 2028.4·창릉역 2030) / B선 2025.8 착수계 2031 개통 예상 / C선 2026.4 중재 완료 2031 이후 완공</li>
            <li><strong>제5차 국토종합계획 수정계획(2026~2040)</strong>: <strong>2025.12 발표 예정</strong> (인구감소·초광역권·다층 공간형성)</li>
            <li><strong>2026 지방세법 개정</strong>: 재산세 도시지역분 비과세 개선, 인구감소지역 창업·이전 취득세·재산세 감면 확대·연장</li>
          </ul>
          <p className="mock-law-updates-footer">
            ⚠️ 본 요약은 2026년 4월 기준 국가법령정보센터·국토교통부 보도자료·법제처 입법예고 등을 기반으로 웹 검증한 내용입니다. 개별 조문·수치·시행일은 <a href="https://www.law.go.kr" target="_blank" rel="noreferrer">국가법령정보센터(law.go.kr)</a>에서 최신본을 반드시 재확인하세요.
          </p>
        </div>
      </details>

      <div className="mock-toolbar">
        <button className="mock-btn" onClick={handleToggleAll}>
          {expandAll ? '📕 답안 모두 접기' : '📖 답안 모두 펼치기'}
        </button>
      </div>

      {sessions.map(({ session, questions: qs }) => {
        const label = session === 1
          ? '단답형 (13문제 중 10선택 · 각 10점)'
          : '서술형 (6문제 중 4선택 · 각 25점)';
        return (
          <section key={session} className="mock-session-block">
            <h3>
              <span className="badge">{session}교시</span>
              <span>{label}</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: '#6b7280', fontWeight: 400 }}>
                {qs.length}문제 · 100분
              </span>
            </h3>
            <ul className="mock-q-list" key={`s${session}-${expandVersion}`}>
              {qs.map(q => (
                <QuestionCardInitial
                  key={q.id}
                  q={q}
                  answer={answers[q.id]}
                  initialOpen={expandAll}
                />
              ))}
            </ul>
          </section>
        );
      })}

      <div className="guideline-footer-note">
        <strong>📌 학습 안내</strong>
        <br />본 모의고사는 2025~2026년 최신 법령 개정(공간혁신 3구역·공공기여 가이드라인·노후계획도시 특별법·철도지하화 특별법·모빌리티혁신법·농촌공간 재구조화법 등)과 도시계획 이슈를 바탕으로 예상되는 출제 포인트를 자체 검토·작성한 것입니다. 실제 출제 여부를 보장하지 않으며 학습 참고용입니다.
      </div>
    </>
  );
}

// 초기 open 상태를 받는 카드 — 전체 펼침/접기 토글 시 리마운트로 일괄 적용
function QuestionCardInitial({ q, answer, initialOpen }) {
  const [open, setOpen] = useState(initialOpen);
  return (
    <li className="mock-q-item">
      <div className="mock-q-head">
        <span className="mock-q-no">{q.no}.</span>
        <span className="mock-q-text">{q.text}</span>
      </div>
      <div className="mock-q-meta">
        <span className="badge badge-accent">{q.points}점</span>
        <span className="badge">{q.type}</span>
        {(q.keywords || []).slice(0, 5).map((k, i) => (
          <span key={i} className="badge badge-muted">{k}</span>
        ))}
      </div>
      <button
        className={`mock-answer-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {open ? '▲ 답안 숨기기' : '▼ 답안 보기 (클릭)'}
      </button>
      {open && (
        <div className="mock-answer-panel">
          {answer ? renderAnswer(answer) : <em>답안 준비 중</em>}
        </div>
      )}
    </li>
  );
}
