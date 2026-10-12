'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, AlertTriangle } from 'lucide-react';

interface ExamTimerProps {
  recommendedMinutes?: number;
  totalMarks?: number;
}

export default function ExamTimer({ recommendedMinutes, totalMarks }: ExamTimerProps) {
  // IB standard: approximately 1.2 minutes per mark
  const defaultMinutes = recommendedMinutes || (totalMarks ? Math.ceil(totalMarks * 1.2) : 10);
  const initialSeconds = defaultMinutes * 60;

  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCountUp, setIsCountUp] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setElapsed(0);
    setIsRunning(false);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (!isCountUp) {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              return 0;
            }
            return prev - 1;
          });
        }
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isCountUp]);

  const toggleRunning = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
    setElapsed(0);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const isLowTime = !isCountUp && timeLeft <= 60 && timeLeft > 0;
  const isTimeUp = !isCountUp && timeLeft === 0;

  return (
    <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-sm border border-slate-700">
      <div className="flex items-center gap-2">
        <Clock className={`w-4 h-4 ${isLowTime ? 'text-amber-400 animate-pulse' : isTimeUp ? 'text-red-400' : 'text-blue-400'}`} />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {isCountUp ? '경과 시간' : '시험 타이머'}
        </span>
      </div>

      <div className="flex items-baseline gap-1 font-mono text-lg font-bold">
        <span className={`${isTimeUp ? 'text-red-400' : isLowTime ? 'text-amber-300' : 'text-emerald-400'}`}>
          {isCountUp ? formatTime(elapsed) : formatTime(timeLeft)}
        </span>
        {!isCountUp && (
          <span className="text-xs text-slate-500 font-normal">/ {defaultMinutes}m</span>
        )}
      </div>

      {isTimeUp && (
        <span className="flex items-center text-xs text-red-400 font-medium animate-pulse">
          <AlertTriangle className="w-3 h-3 mr-1" /> 시간 초과
        </span>
      )}

      <div className="flex items-center gap-1 ml-auto">
        <button
          onClick={toggleRunning}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-200 transition-colors"
          title={isRunning ? '일시 정지' : '시작'}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="초기화"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsCountUp(!isCountUp)}
          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          title="타이머 / 스톱워치 전환"
        >
          {isCountUp ? '카운트다운' : '스톱워치'}
        </button>
      </div>
    </div>
  );
}
