'use client';

import React from 'react';
import { Sparkles, TrendingUp, Target, Zap, Filter } from 'lucide-react';

interface RecommendationBannerProps {
  filterOnlyRecommended: boolean;
  onToggleRecommended: () => void;
  recommendedCount: number;
  totalCount: number;
}

export default function RecommendationBanner({
  filterOnlyRecommended,
  onToggleRecommended,
  recommendedCount,
  totalCount,
}: RecommendationBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800/50 mb-8">
      {/* Background Decorative glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            2024-2025 최신 IB 시험 출제 트렌드 분석 엔진 가동 중
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            IB Past Papers 빅데이터 기반 <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              맞춤형 최신 적중 & 취약점 문제 추천
            </span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            최근 5개년 IBO 기출 패턴과 고난도 킬러 문항을 분석하여, 이번 시험에 출제 확률이 가장 높은
            핵심 변형 문제를 선별했습니다.
          </p>

          {/* Key Stats Bar */}
          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>적중 예상 문항: <strong>{recommendedCount}개 엄선</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <Target className="w-4 h-4 text-amber-400" />
              <span>IB Grade 7 커트라인 맞춤 공략</span>
            </div>
          </div>
        </div>

        {/* Action Toggle Button */}
        <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onToggleRecommended}
            className={`px-5 py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              filterOnlyRecommended
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-amber-400/20 scale-[1.02]'
                : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${filterOnlyRecommended ? 'text-slate-900' : 'text-amber-300'}`} />
            {filterOnlyRecommended ? '전체 문제 보기로 복귀' : '✨ AI 추천 문제만 보기'}
          </button>
        </div>
      </div>
    </div>
  );
}
