'use client';

import React from 'react';
import { CheckCircle2, XCircle, Sparkles, ArrowRight } from 'lucide-react';

interface FeedbackCardProps {
  isCorrect: boolean;
  explanation: string;
  loReference: string;
  onNext: () => void;
}

export default function FeedbackCard({
  isCorrect,
  explanation,
  loReference,
  onNext
}: FeedbackCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200 ${
        isCorrect
          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
          : 'bg-rose-950/40 border-rose-500/50 text-rose-100'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {isCorrect ? (
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <XCircle className="w-5 h-5" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-white">
              {isCorrect ? 'Active Recall Verified!' : 'Retrieval Correction Required'}
            </h4>
            <span className="text-[11px] font-mono text-slate-400">{loReference}</span>
          </div>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${
            isCorrect
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
          }`}
        >
          {isCorrect ? '+10 Knowledge XP' : 'Review Gap'}
        </span>
      </div>

      <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
        <div className="font-semibold text-blue-400 mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Examiner Explanatory Note:
        </div>
        <p className="text-slate-300">{explanation}</p>
      </div>

      <div className="flex justify-end pt-1">
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
        >
          <span>Continue Session</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
