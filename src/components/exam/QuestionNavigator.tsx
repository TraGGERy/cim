'use client';

import React from 'react';
import { Flag } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, string>;
  flaggedQuestions: number[];
  onSelectQuestion: (index: number) => void;
  onToggleFlag: (questionId: number) => void;
}

export default function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answers,
  flaggedQuestions,
  onSelectQuestion,
  onToggleFlag
}: QuestionNavigatorProps) {
  const currentQuestionId = currentIndex + 1;
  const isCurrentFlagged = flaggedQuestions.includes(currentQuestionId);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Exam Question Matrix</h4>
          <p className="text-xs text-white font-semibold mt-0.5">
            {answeredCount} of {totalQuestions} Answered
          </p>
        </div>
        <button
          onClick={() => onToggleFlag(currentQuestionId)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isCurrentFlagged
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
          }`}
        >
          <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>{isCurrentFlagged ? 'Flagged' : 'Flag for Review'}</span>
        </button>
      </div>

      {/* Grid of Question Numbers */}
      <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-5 gap-1.5 overflow-y-auto max-h-60 sm:max-h-72 p-1">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const qId = i + 1;
          const isAnswered = !!answers[qId];
          const isFlagged = flaggedQuestions.includes(qId);
          const isCurrent = i === currentIndex;

          return (
            <button
              key={qId}
              onClick={() => onSelectQuestion(i)}
              className={`relative h-9 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center border ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30 ring-2 ring-blue-400/40'
                  : isAnswered
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80 hover:bg-emerald-900/60'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{qId}</span>
              {isFlagged && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-slate-900 shadow" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-3 border-t border-slate-800 mt-auto flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-600 border border-blue-400" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-700" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800 relative">
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </span>
          <span>Flagged</span>
        </div>
      </div>
    </div>
  );
}
