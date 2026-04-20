import React, { useState } from 'react';

function AnswerMarkdown({ text }) {
  if (!text) return null;
  // Very small markdown-ish renderer for our answer format
  const lines = text.split('\n');
  const nodes = [];
  let listBuffer = [];
  let ordListBuffer = [];
  const flushList = () => {
    if (listBuffer.length) {
      nodes.push(<ul key={`ul-${nodes.length}`}>{listBuffer.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(l) }} />)}</ul>);
      listBuffer = [];
    }
    if (ordListBuffer.length) {
      nodes.push(<ol key={`ol-${nodes.length}`}>{ordListBuffer.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(l) }} />)}</ol>);
      ordListBuffer = [];
    }
  };
  const inlineFmt = (s) =>
    s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/「([^」]+)」/g, '<span class="law-ref">「$1」</span>');

  lines.forEach((raw, idx) => {
    const line = raw.replace(/\s+$/, '');
    if (!line.trim()) { flushList(); return; }
    if (line.startsWith('### ')) { flushList(); nodes.push(<h4 key={idx}>{line.slice(4)}</h4>); return; }
    if (line.startsWith('## ')) { flushList(); nodes.push(<h3 key={idx}>{line.slice(3)}</h3>); return; }
    if (line.startsWith('# ')) { flushList(); nodes.push(<h3 key={idx}>{line.slice(2)}</h3>); return; }
    const um = line.match(/^\s*[-•]\s+(.+)$/);
    if (um) { if (ordListBuffer.length) { nodes.push(<ol key={`ol-${nodes.length}`}>{ordListBuffer.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(l) }} />)}</ol>); ordListBuffer = []; } listBuffer.push(um[1]); return; }
    const om = line.match(/^\s*(\d+)\.\s+(.+)$/);
    if (om) { if (listBuffer.length) { nodes.push(<ul key={`ul-${nodes.length}`}>{listBuffer.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inlineFmt(l) }} />)}</ul>); listBuffer = []; } ordListBuffer.push(om[2]); return; }
    flushList();
    nodes.push(<p key={idx} dangerouslySetInnerHTML={{ __html: inlineFmt(line) }} />);
  });
  flushList();
  return <div>{nodes}</div>;
}

export default function AnswerView({ summary, detailed }) {
  const hasDetailed = Boolean(detailed);
  const hasSummary = Boolean(summary);
  const [tab, setTab] = useState(hasSummary ? 'summary' : (hasDetailed ? 'detailed' : 'summary'));

  return (
    <div>
      <div className="answer-tabs">
        <button className={`answer-tab ${tab === 'summary' ? 'active' : ''}`} onClick={() => setTab('summary')}>
          ① 핵심 요약 {!hasSummary && <small style={{opacity:0.6, marginLeft:4}}>(미작성)</small>}
        </button>
        <button className={`answer-tab ${tab === 'detailed' ? 'active' : ''}`} onClick={() => setTab('detailed')}>
          ② 심화 에세이 {!hasDetailed && <small style={{opacity:0.6, marginLeft:4}}>(미작성)</small>}
        </button>
      </div>
      <div className="answer-body">
        {tab === 'summary' && (hasSummary ? <AnswerMarkdown text={summary} /> : <PendingBlock type="요약" />)}
        {tab === 'detailed' && (hasDetailed ? <AnswerMarkdown text={detailed} /> : <PendingBlock type="심화 에세이" />)}
      </div>
    </div>
  );
}

function PendingBlock({ type }) {
  return (
    <div className="notice">
      <strong>답안 준비 중</strong> — 이 문제의 {type} 답안은 다음 작업 세션에서 작성될 예정입니다.<br />
      전 279문제에 대한 {type}형 답안은 점진적으로 채워지며, 최신 회차(138회)부터 우선 완성됩니다.
    </div>
  );
}
