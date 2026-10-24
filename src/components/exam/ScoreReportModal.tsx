'use client';

import React from 'react';
import { Award, CheckCircle, XCircle, RotateCcw, Home, BookOpen, BarChart3, Sparkles } from 'lucide-react';
import { UserExamAttempt, ExamQuestion } from '../../types/cim';
import Link from 'next/link';
import TashaAvatar from '../avatars/TashaAvatar';
import ShumbaAvatar from '../avatars/ShumbaAvatar';

interface ScoreReportModalProps {
  attempt: UserExamAttempt;
  questions: ExamQuestion[];
  onRetake: () => void;
}

export default function ScoreReportModal({ attempt, questions, onRetake }: ScoreReportModalProps) {
  const score = attempt.score;
  if (!score) return null;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'Distinction':
        return 'text-purple-400 bg-purple-950/80 border-purple-800 shadow-purple-500/20';
      case 'Merit':
        return 'text-blue-400 bg-blue-950/80 border-blue-800 shadow-blue-500/20';
      case 'Pass':
        return 'text-emerald-400 bg-emerald-950/80 border-emerald-800 shadow-emerald-500/20';
      default:
        return 'text-rose-400 bg-rose-950/80 border-rose-800 shadow-rose-500/20';
    }
  };

  const getShumbaFeedback = (grade: string) => {
    switch (grade) {
      case 'Distinction':
        return {
          title: 'Distinction Achieved! Outstanding Execution, Tasha.',
          badge: 'Distinction Standard (80%+)',
          comment:
            'Tasha, this is an extraordinary performance! You demonstrated complete command across financial metrics and the strategic trade-offs of the Nyika.app case study. Maintain this momentum into the official examination window.',
        };
      case 'Merit':
        return {
          title: 'Merit Grade Confirmed. Strong Acuity, Tasha.',
          badge: 'Merit Standard (70-79%)',
          comment:
            'Very commendable work, Tasha. You have a solid grasp of core syllabus competencies. To elevate this to a Distinction (80%+), review the multi-step variance and resource reallocation distractor rationales below.',
        };
      case 'Pass':
        return {
          title: 'Pass Standard Attained. Good Foundation, Tasha.',
          badge: 'Pass Standard (60-69%)',
          comment:
            'Congratulations on securing a passing mark, Tasha. You have met the CIM 60% standard. Review your lowest Learning Outcome below and run a 10-Question Quick Exam drill to shore up weaker areas.',
        };
      default:
        return {
          title: 'Diagnostic Stepping Stone, Tasha.',
          badge: 'Review & Retake Recommended',
          comment:
            'Do not be discouraged, Tasha—diagnostic mocks are designed to reveal gaps before the real exam. Examine the distractor rationale for each question below, check the Formula Sheet, and retake the test!',
        };
    }
  };

  const shumbaReview = getShumbaFeedback(score.grade);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl space-y-8">
      {/* Candidate & Mentor Banner */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TashaAvatar size="lg" showBadge showOnline />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">Tasha Aka</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                CIM Level 6 Candidate
              </span>
            </div>
            <p className="text-xs text-slate-400">
              CIM Diploma in Professional & Sustainable Marketing (Ofqual Regulated)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
          <ShumbaAvatar size="md" showBadge showMentorShield />
          <div className="text-left">
            <div className="text-xs font-bold text-amber-300">Tutor Shumba, FCIM</div>
            <div className="text-[10px] text-slate-400">Chief Examiner & Mentor</div>
          </div>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mb-2">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">CIM Level 6 Examination Report</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Official diagnostic results mapped against CIM 2024 V1.1 Qualification Standards
        </p>

        <div className="pt-2">
          <span
            className={`inline-block px-5 py-2 rounded-2xl text-base font-extrabold border shadow-lg uppercase tracking-wider ${getGradeColor(
              score.grade
            )}`}
          >
            {score.grade} ({score.percentage.toFixed(1)}%)
          </span>
        </div>
      </div>

      {/* Tutor Shumba Personalized Examiner Verdict */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-950 to-slate-950 border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShumbaAvatar size="xs" showMentorShield />
            <span className="text-xs font-bold text-amber-300">Tutor Shumba's Examiner Verdict for Tasha</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {shumbaReview.badge}
          </span>
        </div>
        <h4 className="text-sm font-bold text-white">{shumbaReview.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "{shumbaReview.comment}"
        </p>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 mb-1">Score</div>
          <div className="text-xl font-mono font-bold text-white">
            {score.correctCount} / {score.totalQuestions}
          </div>
        </div>
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 mb-1">Percentage</div>
          <div className="text-xl font-mono font-bold text-emerald-400">{score.percentage.toFixed(1)}%</div>
        </div>
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 mb-1">Pass Mark</div>
          <div className="text-xl font-mono font-bold text-slate-300">60.0%</div>
        </div>
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
          <div className="text-xs text-slate-400 mb-1">Time Elapsed</div>
          <div className="text-xl font-mono font-bold text-blue-400">
            {Math.floor(attempt.timeSpentSeconds / 60)}m {attempt.timeSpentSeconds % 60}s
          </div>
        </div>
      </div>

      {/* Learning Outcome Diagnostic Breakdown */}
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          Syllabus Learning Outcome (LO) Competency
        </h4>

        <div className="space-y-3">
          {Object.entries(score.loBreakdown).map(([loKey, data]) => {
            const loTitle =
              loKey === 'LO1'
                ? 'LO1: Metrics & Financial Performance'
                : loKey === 'LO2'
                ? 'LO2: Resource Management & 5Ms'
                : loKey === 'LO3'
                ? 'LO3: Forecasting & Budgeting Methods'
                : loKey === 'LO4'
                ? 'LO4: Brand Equity, Positioning & Objectives'
                : loKey === 'LO5'
                ? 'LO5: Tactical Mix (7Ps) & Implementation'
                : loKey === 'LO6'
                ? 'LO6: Control, Dashboards & Governance'
                : `${loKey}: Syllabus Learning Area`;

            const isPassed = data.percentage >= 60;

            return (
              <div key={loKey} className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-white">{loTitle}</span>
                  <span className={`font-mono font-bold ${isPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {data.correct}/{data.total} ({data.percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      data.percentage >= 80 ? 'bg-purple-500' : data.percentage >= 60 ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Question Review List */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-400" />
          Full Question Review & Distractor Rationale
        </h4>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {questions.map((q) => {
            const selectedOptId = attempt.answers[q.id];
            const isCorrect = selectedOptId === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-900/60'
                    : 'bg-rose-950/20 border-rose-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                    <span className="text-xs font-bold text-white">Question {q.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {q.loId} ({q.criterionId})
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isCorrect ? 'Correct (+1 Mark)' : 'Incorrect (0 Marks)'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium mb-3">{q.question}</p>

                {/* Options Review */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;
                    const isRightOption = opt.id === q.correctAnswer;

                    return (
                      <div
                        key={opt.id}
                        className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border ${
                          isRightOption
                            ? 'bg-emerald-900/40 border-emerald-500/60 text-emerald-200 font-semibold'
                            : isSelected
                            ? 'bg-rose-900/40 border-rose-500/60 text-rose-200 line-through'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full flex items-center justify-center bg-slate-800 text-[10px] font-bold">
                          {opt.id}
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-blue-400">Examiner Rationale:</div>
                  <p className="text-slate-300 leading-relaxed">{q.explanation.rationale}</p>
                  {q.explanation.calculationSteps && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1 font-mono text-[11px] text-emerald-300">
                      {q.explanation.calculationSteps.map((step, idx) => (
                        <div key={idx}>• {step}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <button
          onClick={onRetake}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          <RotateCcw className="w-4 h-4" />
          Retake 45-Q Exam Simulation
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
        >
          <Home className="w-4 h-4" />
          Return to Learning Hub
        </Link>
      </div>
    </div>
  );
}
