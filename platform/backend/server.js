import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');

const loadJSON = (name) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf-8'));

const questions = loadJSON('questions.json');
const summaries = loadJSON('answers-summary.json');
const details = loadJSON('answers-detailed.json');
const analysis = loadJSON('analysis.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, totalQuestions: questions.questions.length }));

app.get('/api/meta', (_req, res) => res.json(questions.meta));

app.get('/api/questions', (req, res) => {
  const { round, session, keyword } = req.query;
  let list = questions.questions;
  if (round) list = list.filter(q => String(q.round) === String(round));
  if (session) list = list.filter(q => String(q.session) === String(session));
  if (keyword) {
    const kw = String(keyword).toLowerCase();
    list = list.filter(q => q.text.toLowerCase().includes(kw) || (q.keywords || []).some(k => k.toLowerCase().includes(kw)));
  }
  res.json(list);
});

app.get('/api/questions/:id', (req, res) => {
  const q = questions.questions.find(x => x.id === req.params.id);
  if (!q) return res.status(404).json({ error: 'question not found' });
  const summary = summaries.answers[req.params.id] || null;
  const detailed = details.answers[req.params.id] || null;
  res.json({ ...q, summary, detailed });
});

app.get('/api/answers/summary', (_req, res) => res.json(summaries));
app.get('/api/answers/summary/:id', (req, res) => {
  const a = summaries.answers[req.params.id];
  if (!a) return res.status(404).json({ error: 'summary not found' });
  res.json({ id: req.params.id, summary: a });
});

app.get('/api/answers/detailed', (_req, res) => res.json(details));
app.get('/api/answers/detailed/:id', (req, res) => {
  const a = details.answers[req.params.id];
  if (!a) return res.status(404).json({ error: 'detailed answer not found (아직 미작성 — 이후 세션에서 확장 예정)' });
  res.json({ id: req.params.id, detailed: a });
});

app.get('/api/analysis', (_req, res) => res.json(analysis));
app.get('/api/analysis/keywords', (_req, res) => res.json(analysis.keywordFrequency));
app.get('/api/analysis/topics', (_req, res) => res.json(analysis.topicFrequency));
app.get('/api/analysis/laws', (_req, res) => res.json(analysis.lawFrequency));
app.get('/api/analysis/trends', (_req, res) => res.json(analysis.trendsByRound));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[backend] 도시계획기술사 API 서버 실행 중 → http://localhost:${PORT}`);
  console.log(`[backend] 문제 ${questions.questions.length}개 / 요약답안 ${Object.keys(summaries.answers).length}개 / 심화답안 ${Object.keys(details.answers).length}개`);
});
