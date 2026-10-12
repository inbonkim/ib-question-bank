'use client';

import React, { useState } from 'react';
import { Sparkles, Calculator, BookOpen, Clock, Check, PenTool } from 'lucide-react';
import { Question } from '../types/question';
import MathRenderer from './MathRenderer';
import MarkschemeViewer from './MarkschemeViewer';
import ExamTimer from './ExamTimer';

interface QuestionCardProps {
  question: Question;
  showTimer?: boolean;
}

export default function QuestionCard({ question, showTimer = true }: QuestionCardProps) {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleAnswerChange = (partLabel: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [partLabel]: val }));
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          {question.isAiRecommended && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> AI 최신 추천
            </span>
          )}
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {question.code}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
            {question.subject} {question.level} • {question.paper}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Calculator className={`w-3.5 h-3.5 ${question.calculatorAllowed ? 'text-blue-500' : 'text-slate-400'}`} />
            {question.calculatorAllowed ? '계산기 허용' : '계산기 금지 (No Calc)'}
          </span>
          <span>•</span>
          <span className="font-bold text-slate-700 dark:text-slate-200">
            배점: {question.totalMarks}점
          </span>
        </div>
      </div>

      {/* AI Recommendation Reason */}
      {question.recommendationReason && (
        <div className="mt-3 px-3 py-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 flex items-center gap-2 text-xs text-blue-900 dark:text-blue-200">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong className="font-semibold">추천 사유:</strong> {question.recommendationReason}
          </span>
        </div>
      )}

      {/* Timer Bar */}
      {showTimer && (
        <div className="my-4">
          <ExamTimer totalMarks={question.totalMarks} />
        </div>
      )}

      {/* Question Context & Parts */}
      <div className="mt-4 space-y-5">
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          {question.topic} &gt; {question.subtopic}
        </div>

        {question.context && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-sm font-medium">
            <MathRenderer content={question.context} />
          </div>
        )}

        <div className="space-y-6">
          {question.parts.map((part, pIdx) => (
            <div key={pIdx} className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2 text-sm font-medium">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{part.partLabel}</span>
                  <MathRenderer content={part.prompt} />
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                  [{part.marks} marks]
                </span>
              </div>

              {/* Student Practice Input Box */}
              <div className="mt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>내 풀이 및 최종 정답 메모 (LaTeX 수식 기입 가능)</span>
                </div>
                <textarea
                  value={userAnswers[part.partLabel] || ''}
                  onChange={(e) => handleAnswerChange(part.partLabel, e.target.value)}
                  placeholder="예: x = 3/2, f'(x) = 2x*cos(2x)..."
                  rows={2}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100 resize-y"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setIsCompleted(!isCompleted)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Check className="w-3.5 h-3.5" />
          {isCompleted ? '풀이 완료됨 (Saved)' : '풀이 완료 체크'}
        </button>

        {question.variantFrom && (
          <span className="text-[11px] text-slate-400">
            기반 기출: {question.variantFrom}
          </span>
        )}
      </div>

      {/* Markscheme Dropdown */}
      <MarkschemeViewer parts={question.parts} totalMarks={question.totalMarks} />
    </div>
  );
}
