import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend, PieChart, Pie, Cell
} from 'recharts';
import { analysis, ROUNDS, meta } from '../utils/data.js';

const PIE_COLORS = ['#1f4fbb', '#d97706', '#0f766e', '#a21caf', '#059669', '#dc2626', '#6366f1', '#0891b2', '#ca8a04', '#be185d'];

export default function TrendPage() {
  const [top, setTop] = useState(20);
  const keywordData = (analysis.keywordFrequency || []).slice(0, top).map(k => ({ name: k.label, value: k.count }));
  const lawData = (analysis.lawFrequency || []).slice(0, 10).map(l => ({ name: l.label, value: l.count }));
  const topicData = (analysis.topicFrequency || []).map(t => ({ name: t.label, value: t.count }));
  const roundTrend = ROUNDS.map(r => ({
    round: `${r}회`,
    ...((analysis.trendsByRound && analysis.trendsByRound[r] && analysis.trendsByRound[r].topicCounts) || {})
  }));
  const topicKeys = topicData.map(t => t.name);

  const sessionData = Object.entries(analysis.sessionTypeDistribution || {}).map(([k,v]) => ({ name: `${k}교시`, value: v }));

  return (
    <>
      <h1 className="page-title">출제 경향 분석</h1>
      <p className="page-subtitle">130~138회 총 {meta.totalQuestions}문제를 대상으로 한 키워드·법령·주제·교시별 빈도 분석.</p>

      <div className="chart-card">
        <h3>키워드 빈도 (상위 {top}개)</h3>
        <div className="chart-hint">문제 본문에 명시된 태그 키워드 기준. 상위 키워드가 곧 출제 1순위 테마입니다.</div>
        <div className="filter-row">
          {[10, 20, 30, 50].map(n => (
            <button key={n} className={`filter-chip ${top===n?'active':''}`} onClick={() => setTop(n)}>상위 {n}개</button>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={Math.max(300, top*26)}>
          <BarChart data={keywordData} layout="vertical" margin={{left: 60, right: 20, top: 10, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={130} tick={{fontSize: 12}} />
            <Tooltip />
            <Bar dataKey="value" fill="#1f4fbb" name="등장 횟수" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>법령 출제 빈도 (상위 10)</h3>
        <div className="chart-hint">문제에 명시적으로 인용된 법령·지침 기준. 법령별 학습 우선순위를 확인하세요.</div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={lawData} layout="vertical" margin={{left: 120, right: 20, top: 10, bottom: 10}}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={200} tick={{fontSize: 12}} />
            <Tooltip />
            <Bar dataKey="value" fill="#d97706" name="등장 횟수" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>주제 대분류 분포</h3>
        <div className="chart-hint">모든 문제를 주제 대분류로 묶어 집계. 계획체계·도시재생·용도지역·신사조 등 분포.</div>
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={topicData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={130} label={(e)=>`${e.name} ${e.value}`}>
              {topicData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>회차별 주제 추이</h3>
        <div className="chart-hint">각 회차에서 주제별 출제 문제 수. 최근 회차일수록 신사조·공간재구조화·탄소중립 비중 증가.</div>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={roundTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="round" />
            <YAxis />
            <Tooltip />
            <Legend />
            {topicKeys.slice(0, 6).map((key, i) => (
              <Line key={key} type="monotone" dataKey={key} stroke={PIE_COLORS[i]} strokeWidth={2} dot={{r:3}} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>교시별 문제 수 (누적)</h3>
        <div className="chart-hint">1교시는 단답형(13문제), 2~4교시는 서술형(6문제)으로 구성됩니다.</div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={sessionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0f766e" name="문제 수" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {analysis.insights && (
        <div className="card">
          <h2 style={{marginTop:0}}>주요 관찰 포인트</h2>
          <ul>
            {analysis.insights.map((ins, i) => <li key={i}>{ins}</li>)}
          </ul>
        </div>
      )}
    </>
  );
}
