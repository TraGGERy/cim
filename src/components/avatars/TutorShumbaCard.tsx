'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Award,
  ChevronRight,
  BookOpen,
  Zap,
  CheckCircle,
  Lightbulb,
  GraduationCap,
  MessageSquare
} from 'lucide-react';
import ShumbaAvatar from './ShumbaAvatar';
import TashaAvatar from './TashaAvatar';

interface Tip {
  topic: string;
  badge: string;
  advice: string;
  loRef: string;
}

const SHUMBA_TIPS: Tip[] = [
  {
    topic: 'Financial Metrics & ROMI Calculation',
    badge: 'LO 1.1 • Formula Precision',
    advice:
      'Hello Tasha! When computing ROMI in Section A, always calculate Net Incremental Revenue first: [(Incremental Revenue × Gross Margin) - Marketing Expenditure] ÷ Marketing Expenditure × 100. Always state your units clearly in ZAR or USD!',
    loRef: 'CI-L6 Syllabus LO 1 (Financial Performance)',
  },
  {
    topic: 'Command Verbs: The Difference Between Pass and Distinction',
    badge: 'Examiner Marking Rule',
    advice:
      'Pay close attention to command verbs, Tasha. If the prompt states "Critically Evaluate", do not merely describe the 7Ps. You must weigh the commercial upside against risks, cost-to-serve, and conclude with an actionable decision.',
    loRef: 'CIM Level 6 Command Verb Assessment Standard',
  },
  {
    topic: 'Nyika.app Case Study Strategy',
    badge: 'SP-L6 • Strategic Appraisal',
    advice:
      'For Nyika.app, remember that B2B express courier achieves a 32% gross margin, whereas B2C motorcycle rides yield 14%. In your resource allocation answers, reallocating capital toward B2B corporate merchants yields significantly faster payback and CLV.',
    loRef: 'Strategy & Planning: Nyika.app Unit Economics',
  },
  {
    topic: 'Exam Pacing & 2-Minute Rule',
    badge: 'Time Management',
    advice:
      'In the 45-Question Commercial Intelligence test, you have exactly 2 minutes per question. If a 4-step regression or CLV problem slows you down, flag it immediately and bank the conceptual marks first. You will return with clear eyes!',
    loRef: '90-Minute Onscreen Exam Strategy',
  },
  {
    topic: 'Daily Active Recall Habit',
    badge: 'Mentorship Note',
    advice:
      'Distinction is built daily, Tasha. Even on busy days, completing one 5-Question or 10-Question Quick Exam keeps formula derivations and syllabus criteria fresh in your active recall memory.',
    loRef: '21-Day Accelerated Distinction Plan',
  },
];

export default function TutorShumbaCard() {
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const currentTip = SHUMBA_TIPS[activeTipIndex];

  const handleNextTip = () => {
    setActiveTipIndex((prev) => (prev + 1) % SHUMBA_TIPS.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 p-6 sm:p-8 shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        {/* Mentor & Student Header */}
        <div className="flex items-center gap-4">
          <ShumbaAvatar size="lg" showBadge showMentorShield />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white tracking-tight">Tutor Shumba</h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                FCIM • CHIEF EXAMINER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Senior CIM Chartered Marketer & Personal Mentor for <strong className="text-slate-200">Tasha Aka</strong>
            </p>
          </div>
        </div>

        {/* Personalized Candidate Status Chip */}
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-950/80 border border-emerald-500/30 shadow-inner">
          <TashaAvatar size="sm" showBadge showOnline />
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">Tasha Aka</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Candidate
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Goal: Level 6 Distinction (80%+)</div>
          </div>
        </div>
      </div>

      {/* Dynamic Advice Bubble */}
      <div className="relative z-10 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Tutor Shumba's Examiner Guidance</span>
            <span className="text-[10px] font-mono opacity-75">• Tip {activeTipIndex + 1} of {SHUMBA_TIPS.length}</span>
          </div>

          <button
            onClick={handleNextTip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <span>Next Tip</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tip Content Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/90 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {currentTip.topic}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
              {currentTip.badge}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            "{currentTip.advice}"
          </p>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-900">
            <span className="font-mono text-amber-400/90">{currentTip.loRef}</span>
            <span className="text-slate-500">Tutor Shumba • Verified CIM Guidance</span>
          </div>
        </div>

        {/* Quick Action Navigation for Tasha */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Link
            href="/quick-exam?count=10"
            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 text-left transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Tasha's 10-Q Daily Checkpoint
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">20 mins • Quick active recall</div>
            </div>
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          </Link>

          <Link
            href="/exam/commercial-intelligence"
            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 text-left transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-blue-300">
                Full 45-Q Mock Exam
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">90 mins • LO1, LO2 & LO3 standard</div>
            </div>
            <Award className="w-4 h-4 text-blue-400 shrink-0" />
          </Link>

          <Link
            href="/reference#formulas"
            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/40 text-left transition-all group flex items-center justify-between"
          >
            <div>
              <div className="text-xs font-bold text-white group-hover:text-purple-300">
                Formula Master Reference
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">ROMI, CLV, CAC, Break-even</div>
            </div>
            <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
