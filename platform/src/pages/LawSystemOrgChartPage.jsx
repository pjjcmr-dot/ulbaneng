import React from 'react';
import { Link } from 'react-router-dom';
import LawSystemOrgChartHorizontal from '../components/LawSystemOrgChartHorizontal';

export default function LawSystemOrgChartPage() {
  return (
    <div className="orgh-fullpage">
      <div className="orgh-fullpage-bar">
        <Link to="/guidelines" className="orgh-back-link">← 이론학습 목록</Link>
        <div className="orgh-fullpage-title">
          🗂 국토 법령 체계 조직도 — 가로 대형 화면
        </div>
        <div className="orgh-hint">화면이 좁으면 좌·우로 스크롤하세요</div>
      </div>
      <div className="orgh-canvas">
        <LawSystemOrgChartHorizontal />
      </div>
    </div>
  );
}
