'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import RecommendationBanner from '../components/RecommendationBanner';
import QuestionCard from '../components/QuestionCard';
import { MOCK_QUESTIONS } from '../data/mockQuestions';
import { Subject, Level, Difficulty } from '../types/question';
import { Filter, Layers, CheckCircle, Crown, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('Math AA');
  const [selectedLevel, setSelectedLevel] = useState<'HL' | 'SL' | 'ALL'>('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');
  const [filterOnlyRecommended, setFilterOnlyRecommended] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');

  // Filter topics available in mock questions
  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    MOCK_QUESTIONS.forEach((q) => set.add(q.topic));
    return Array.from(set);
  }, []);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return MOCK_QUESTIONS.filter((q) => {
      if (selectedSubject !== 'ALL' && q.subject !== selectedSubject) return false;
      if (selectedLevel !== 'ALL' && q.level !== selectedLevel) return false;
      if (filterDifficulty !== 'ALL' && q.difficulty !== filterDifficulty) return false;
      if (filterOnlyRecommended && !q.isAiRecommended) return false;
      if (selectedTopic !== 'ALL' && q.topic !== selectedTopic) return false;
      return true;
    });
  }, [selectedSubject, selectedLevel, filterDifficulty, filterOnlyRecommended, selectedTopic]);

  const recommendedCount = useMemo(() => {
    return MOCK_QUESTIONS.filter((q) => q.isAiRecommended).length;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950">
      {/* Top Navbar */}
      <Navbar
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        selectedLevel={selectedLevel}
        onSelectLevel={setSelectedLevel}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recommendation Engine Banner */}
        <RecommendationBanner
          filterOnlyRecommended={filterOnlyRecommended}
          onToggleRecommended={() => setFilterOnlyRecommended(!filterOnlyRecommended)}
          recommendedCount={recommendedCount}
          totalCount={MOCK_QUESTIONS.length}
        />

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 mb-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-bold text-slate-500 mr-2">
              <Filter className="w-3.5 h-3.5" /> 필터:
            </span>

            {/* Topic Filter */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">전체 토픽 (All Topics)</option>
              {availableTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              {['ALL', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterDifficulty === diff
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {diff === 'ALL' ? '난이도 전체' : diff}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            검색 결과: <strong className="text-slate-900 dark:text-slate-100">{filteredQuestions.length}</strong>개 문항
          </div>
        </div>

        {/* Questions Grid / List */}
        <div className="space-y-6 mb-16">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
              <p className="text-slate-500 text-sm">해당 조건에 일치하는 문제가 없습니다.</p>
              <button
                onClick={() => {
                  setSelectedSubject('Math AA');
                  setSelectedLevel('ALL');
                  setFilterDifficulty('ALL');
                  setFilterOnlyRecommended(false);
                  setSelectedTopic('ALL');
                }}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>

        {/* Pro Membership / Monetization Showcase Section */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-4">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              RevisionDojo 스타일 유료 멤버십 모델
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
              왜 학생들은 이 유료 Q-Bank를 구독할까요?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              단순히 기출문제를 다운받아 보는 것은 무료 사이트에서도 가능합니다. 학생들이 지갑을 여는 이유는
              <strong> &apos;시간 절약&apos;</strong>과 <strong>&apos;적중 예측&apos;</strong>입니다.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-8 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <Zap className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-sm text-white">AI 취약점 실시간 분석</h4>
                <p className="text-slate-400">
                  틀린 문항을 기반으로 학생의 약점 토픽을 도출하고 유사 변형 문제를 무제한 생성합니다.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h4 className="font-bold text-sm text-white">저작권 100% 안전 보장</h4>
                <p className="text-slate-400">
                  공식 기출을 무단 복제하지 않고, 동일한 수식 메커니즘을 가진 자체 변형 문제로 영구 서비스 보장.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-sm text-white">Prediction Exam 모의고사</h4>
                <p className="text-slate-400">
                  시험 1개월 전 출제 확률이 가장 높은 모의고사 세트와 예상 등급 커트라인을 제공합니다.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all">
                <span>Stripe 연동 유료 구독 플랜 시작하기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-500">
                월 \$19 구독 / 연간 \$149 (RevisionDojo/Revision Village 벤치마크 기준)
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© 2026 IB PrepDojo. Independent educational resource. Not officially affiliated with IBO.</p>
      </footer>
    </div>
  );
}
