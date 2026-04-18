// Single data access layer - works for both local dev (with backend) and static build (pure JSON import)
// Vite resolves '@data/*.json' via alias to the /platform/data directory, bundling JSON into the build.

import questionsRaw from '@data/questions.json';
import summariesRaw from '@data/answers-summary.json';
import detailsRaw from '@data/answers-detailed.json';
import analysisRaw from '@data/analysis.json';

export const meta = questionsRaw.meta;
export const questions = questionsRaw.questions;
export const summaries = summariesRaw.answers || {};
export const details = detailsRaw.answers || {};
export const analysis = analysisRaw;

export const ROUNDS = meta.rounds;

export function getQuestion(id) {
  const q = questions.find((x) => x.id === id);
  if (!q) return null;
  return { ...q, summary: summaries[id] || null, detailed: details[id] || null };
}

export function getQuestionsByRound(round) {
  return questions.filter((q) => q.round === Number(round));
}

export function getQuestionsBySession(round, session) {
  return questions.filter((q) => q.round === Number(round) && q.session === Number(session));
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

export function searchQuestions(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  return questions.filter((x) =>
    x.text.toLowerCase().includes(q) ||
    (x.keywords || []).some((k) => k.toLowerCase().includes(q))
  );
}

export const totalQuestions = questions.length;
export const summaryCount = Object.keys(summaries).length;
export const detailedCount = Object.keys(details).length;

export const sessionLabel = (s) => `${s}교시`;
export const formatBySession = (s) =>
  s === 1 ? '단답형 (13문제 중 10선택 · 각 10점)' : '서술형 (6문제 중 4선택 · 각 25점)';
