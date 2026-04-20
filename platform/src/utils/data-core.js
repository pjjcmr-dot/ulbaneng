// 코어 데이터 모듈 — 답안(summaries/details) 의존 없음.
// HomePage·RoundsPage·SearchPage·TrendPage가 이 모듈만 import하여
// 초기 번들에서 answers-summary / answers-detailed 청크가 제외됩니다.

import questionsRaw from '@data/questions.json';
import analysisRaw from '@data/analysis.json';

export const meta = questionsRaw.meta;
export const questions = questionsRaw.questions;
export const analysis = analysisRaw;

export const ROUNDS = meta.rounds;
export const totalQuestions = questions.length;
export const summaryCount = analysis.coverage?.summaryCount ?? 0;
export const detailedCount = analysis.coverage?.detailedCount ?? 0;

export function getQuestionsByRound(round) {
  return questions.filter((q) => q.round === Number(round));
}

export function getQuestionsBySession(round, session) {
  return questions.filter((q) => q.round === Number(round) && q.session === Number(session));
}

export function searchQuestions(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  return questions.filter((x) =>
    x.text.toLowerCase().includes(q) ||
    (x.keywords || []).some((k) => k.toLowerCase().includes(q))
  );
}

export const sessionLabel = (s) => `${s}교시`;
export const formatBySession = (s) =>
  s === 1 ? '단답형 (13문제 중 10선택 · 각 10점)' : '서술형 (6문제 중 4선택 · 각 25점)';
