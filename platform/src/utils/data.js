// 전체 데이터 모듈 (코어 + 답안).
// 답안이 필요한 페이지(RoundDetailPage·QuestionPage)만 이 모듈을 import합니다.
// 그 외 페이지는 `./data-core.js`만 import하여 번들에서 answers 청크가 제외됩니다.

import summariesRaw from '@data/answers-summary.json';
import detailsRaw from '@data/answers-detailed.json';
// 기술사 답안지 표준(v2) — 기존 심화답안을 회차별로 override
import detailsV2_130 from '@data/answers-detailed-v2-130.json';
import detailsV2_136 from '@data/answers-detailed-v2-136.json';
import detailsV2_137 from '@data/answers-detailed-v2-137.json';
import detailsV2_138 from '@data/answers-detailed-v2-138.json';
import { questions } from './data-core.js';

// 코어 export 전부 패스스루 (기존 import 호환)
export * from './data-core.js';

export const summaries = summariesRaw.answers || {};
// 기본 심화답안 + v2 override (130·136·137·138회 표준 답안 우선 적용)
export const details = {
  ...(detailsRaw.answers || {}),
  ...(detailsV2_130.answers || {}),
  ...(detailsV2_136.answers || {}),
  ...(detailsV2_137.answers || {}),
  ...(detailsV2_138.answers || {})
};

export function getQuestion(id) {
  const q = questions.find((x) => x.id === id);
  if (!q) return null;
  return { ...q, summary: summaries[id] || null, detailed: details[id] || null };
}

export function groupByRoundSession(list) {
  const map = new Map();
  for (const q of list) {
    const key = `${q.round}-${q.session}`;
    if (!map.has(key)) map.set(key, { round: q.round, session: q.session, questions: [] });
    map.get(key).questions.push(q);
  }
  return Array.from(map.values()).sort((a, b) => a.round - b.round || a.session - b.session);
}
