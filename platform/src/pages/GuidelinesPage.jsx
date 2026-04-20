import React from 'react';
import { Link } from 'react-router-dom';
import guidelinesIndex from '@data/guidelines-index.json';

export default function GuidelinesPage() {
  const { guidelines } = guidelinesIndex;

  return (
    <>
      <h1 className="page-title">이론학습 · 지침 라이브러리</h1>
      <p className="page-subtitle">
        도시계획 실무와 기술사 수험에 필수적인 국토부 고시·지침·가이드라인을 체계적으로 수록한 이론 학습 자료입니다.
        각 지침의 카드를 클릭하면 장·절 목차와 함께 법령 근거·핵심 포인트를 상세히 확인할 수 있습니다.
      </p>

      <div className="guidelines-grid">
        {guidelines.map(g => (
          <Link
            to={`/guidelines/${g.slug}`}
            key={g.slug}
            className="guideline-card"
            style={{ '--card-accent': g.color }}
          >
            <div className="guideline-card-header">
              <span className="guideline-card-icon">{g.icon}</span>
              <span className="guideline-card-law">{g.lawBase}</span>
            </div>
            <h2 className="guideline-card-title">{g.title}</h2>
            <p className="guideline-card-desc">{g.description}</p>
            <div className="guideline-card-keywords">
              {g.keywords.map((k, i) => (
                <span key={i} className="badge badge-muted">{k}</span>
              ))}
            </div>
            <div className="guideline-card-cta">
              학습 시작 →
            </div>
          </Link>
        ))}
      </div>

      <div className="guideline-footer-note">
        <strong>📌 학습 안내</strong>
        <br />본 자료는 국토부 관련 지침·가이드라인을 수험·실무 학습용으로 요약·체계화한 것입니다.
        정확한 법령·지침은 국가법령정보센터(law.go.kr) 및 국토부 고시를 통해 최신 원문을 확인하시기 바랍니다.
      </div>
    </>
  );
}
