'use client';

import React from 'react';
import { BookOpen, Sparkles, Crown, Search, BarChart3, CheckSquare } from 'lucide-react';

interface NavbarProps {
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
  selectedLevel: 'HL' | 'SL' | 'ALL';
  onSelectLevel: (lvl: 'HL' | 'SL' | 'ALL') => void;
}

export default function Navbar({
  selectedSubject,
  onSelectSubject,
  selectedLevel,
  onSelectLevel,
}: NavbarProps) {
  const subjects = ['Math AA', 'Math AI', 'Physics', 'Chemistry'];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              IB
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrepDojo
              </span>
              <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold uppercase">
                AI Q-Bank
              </span>
            </div>
          </div>

          {/* Subject & Level Filter */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => onSelectSubject(subj)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSubject === subj
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {subj}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-1" />

            {(['ALL', 'HL', 'SL'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onSelectLevel(lvl)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedLevel === lvl
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              학습 리포트
            </button>
            
            <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]">
              <Crown className="w-4 h-4 text-amber-200" />
              <span>Pro 멤버십 (유료)</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
