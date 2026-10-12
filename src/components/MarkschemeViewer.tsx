'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Award, Info } from 'lucide-react';
import { QuestionPart } from '../types/question';
import MathRenderer from './MathRenderer';

interface MarkschemeViewerProps {
  parts: QuestionPart[];
  totalMarks: number;
}

export default function MarkschemeViewer({ parts, totalMarks }: MarkschemeViewerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activePartTab, setActivePartTab] = useState<number>(0);

  const getMarkBadgeColor = (code: string) => {
    if (code.startsWith('M')) return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/60 dark:text-blue-300';
    if (code.startsWith('A')) return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300';
    if (code.startsWith('R')) return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/60 dark:text-purple-300';
    if (code.startsWith('AG')) return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/60 dark:text-amber-300';
    return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300';
  };

  const getMarkTypeDescription = (code: string) => {
    if (code.startsWith('M')) return 'Method (풀이 방법)';
    if (code.startsWith('A')) return 'Accuracy (정확도/수치)';
    if (code.startsWith('R')) return 'Reasoning (논리/추론)';
    if (code.startsWith('AG')) return 'Answer Given (결과 도출)';
    return 'Mark';
  };

  return (
    <div className="mt-4 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900/90 shadow-sm transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              공식 채점 기준표 (Markscheme & Solution)
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              총 {totalMarks}점 배점 기준 및 단계별 정답 가이드
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-xs font-medium hidden sm:inline">
            {isOpen ? '닫기' : '정답 및 풀이 확인'}
          </span>
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4">
          {/* Part Selection Tabs if multi-part */}
          {parts.length > 1 && (
            <div className="flex gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              {parts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePartTab(idx)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activePartTab === idx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  Part {p.partLabel} ({p.marks} marks)
                </button>
              ))}
            </div>
          )}

          {/* Active Part Content */}
          {parts[activePartTab] && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Part {parts[activePartTab].partLabel} Step-by-Step Scoring Guide
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {parts[activePartTab].marks} Marks Available
                </span>
              </div>

              <div className="space-y-2.5">
                {parts[activePartTab].markscheme.steps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80"
                  >
                    <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                      <span
                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md border ${getMarkBadgeColor(
                          step.code
                        )}`}
                        title={getMarkTypeDescription(step.code)}
                      >
                        {step.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">+{step.marks}점</span>
                    </div>

                    <div className="flex-1 text-sm pt-0.5">
                      <MathRenderer content={step.description} />
                    </div>
                  </div>
                ))}
              </div>

              {parts[activePartTab].markscheme.notes && (
                <div className="flex items-start gap-2 p-3 text-xs bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 rounded-xl border border-amber-200/60 dark:border-amber-900/50">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">IB Examiner Note: </span>
                    {parts[activePartTab].markscheme.notes}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
