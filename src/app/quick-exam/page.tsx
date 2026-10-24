'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Zap,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Flag,
  RotateCcw,
  Sliders,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Home,
  BookOpen,
  ArrowRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  getQuickExamQuestions,
  QUICK_EXAM_PRESETS,
  QuickExamScope
} from '../../lib/examData/quickExam';
import { ExamQuestion, UserExamAttempt } from '../../types/cim';
import ExamTimer from '../../components/exam/ExamTimer';
import QuestionNavigator from '../../components/exam/QuestionNavigator';
import FormulaCalculator from '../../components/exam/FormulaCalculator';
import ScoreReportModal from '../../components/exam/ScoreReportModal';
import { saveExamAttempt } from '../../lib/storage';
import TashaAvatar from '../../components/avatars/TashaAvatar';
import ShumbaAvatar from '../../components/avatars/ShumbaAvatar';

function QuickExamContent() {
  const searchParams = useSearchParams();

  // Setup configuration state
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [scope, setScope] = useState<QuickExamScope>('all');
  const [loFilter, setLoFilter] = useState<string>('all');
  const [isTimed, setIsTimed] = useState<boolean>(true);
  const [customMinutes, setCustomMinutes] = useState<number>(20);

  // Active exam state
  const [isExamStarted, setIsExamStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [showCalculator, setShowCalculator] = useState<boolean>(false);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [completedAttempt, setCompletedAttempt] = useState<UserExamAttempt | null>(null);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);

  // Read URL query params on mount if present
  useEffect(() => {
    const qCountParam = searchParams.get('count');
    const scopeParam = searchParams.get('scope') as QuickExamScope | null;
    const loParam = searchParams.get('lo');
    const timedParam = searchParams.get('timed');

    if (qCountParam) {
      const parsed = parseInt(qCountParam, 10);
      if (!isNaN(parsed) && parsed >= 3 && parsed <= 45) {
        setQuestionCount(parsed);
        setCustomMinutes(parsed * 2);
      }
    }

    if (scopeParam && ['all', 'commercial-intelligence', 'strategy-planning'].includes(scopeParam)) {
      setScope(scopeParam);
    }

    if (loParam) {
      setLoFilter(loParam);
    }

    if (timedParam === 'false') {
      setIsTimed(false);
    }
  }, [searchParams]);

  // Adjust duration when question count changes
  const handleSelectCount = (count: number) => {
    setQuestionCount(count);
    setCustomMinutes(count * 2);
  };

  const handleStartExam = () => {
    const loadedQuestions = getQuickExamQuestions({
      questionCount,
      scope,
      loFilter,
      timed: isTimed,
      durationMinutes: customMinutes,
      shuffle: true
    });

    setQuestions(loadedQuestions);
    setAnswers({});
    setFlaggedQuestions([]);
    setCurrentIndex(0);
    setTimeSpentSeconds(0);
    setIsExamCompleted(false);
    setCompletedAttempt(null);
    setIsExamStarted(true);
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion || isExamCompleted) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
    );
  };

  const handleFinishExam = () => {
    if (isExamCompleted) return;

    let correctCount = 0;
    const loBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};

    questions.forEach((q) => {
      const selected = answers[q.id];
      const isRight = selected === q.correctAnswer;
      if (isRight) correctCount++;

      const lo = q.loId || 'LO1';
      if (!loBreakdown[lo]) {
        loBreakdown[lo] = { total: 0, correct: 0, percentage: 0 };
      }
      loBreakdown[lo].total += 1;
      if (isRight) loBreakdown[lo].correct += 1;
    });

    Object.keys(loBreakdown).forEach((key) => {
      const item = loBreakdown[key];
      item.percentage = item.total > 0 ? (item.correct / item.total) * 100 : 0;
    });

    const percentage = questions.length > 0 ? (correctCount / questions.length) * 100 : 0;
    const grade =
      percentage >= 80 ? 'Distinction' : percentage >= 70 ? 'Merit' : percentage >= 60 ? 'Pass' : 'Fail';

    const attempt: UserExamAttempt = {
      id: `attempt-quick-${Date.now()}`,
      moduleId: 'quick-exam',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      timeSpentSeconds,
      answers,
      flaggedQuestions,
      completed: true,
      score: {
        totalQuestions: questions.length,
        correctCount,
        percentage,
        grade,
        loBreakdown
      }
    };

    saveExamAttempt(attempt);
    setCompletedAttempt(attempt);
    setIsExamCompleted(true);
    setShowSubmitConfirm(false);
  };

  const handleRetakeWithSameSettings = () => {
    handleStartExam();
  };

  const handleReturnToSetup = () => {
    setIsExamStarted(false);
    setIsExamCompleted(false);
    setCompletedAttempt(null);
    setAnswers({});
    setFlaggedQuestions([]);
    setCurrentIndex(0);
  };

  // -------------------------------------------------------------
  // VIEW 1: SETUP SCREEN
  // -------------------------------------------------------------
  if (!isExamStarted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3.5 sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
              title="Return to Hub"
            >
              <Home className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase tracking-wider">
                  CIM Level 6 Quick Exam
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-400" />
                  Custom Quiz
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Choose your question count and syllabus focus for fast, targeted revision
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Candidate Profile Chip */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <TashaAvatar size="xs" showOnline={false} />
              <span className="hidden sm:inline text-xs font-bold text-white">Tasha Aka</span>
            </div>

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <span>Exit to Hub</span>
            </Link>
          </div>
        </header>

        {/* Setup Container */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Hero Banner with Tutor Shumba & Tasha Aka */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Tailored for Tasha Aka • Coached by Tutor Shumba (FCIM)
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-amber-300">
                <ShumbaAvatar size="xs" showMentorShield={false} />
                <span className="font-semibold">Tutor Shumba Recommends: 10 Qs Daily</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Short Quick Exam Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Hi <strong>Tasha</strong>! Choose your question count and target syllabus area below. Each question includes official 2-minute CIM pacing, formula step breakdowns, and instant Tutor Shumba examiner rationale.
            </p>
          </div>

          {/* Configuration Form Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            {/* STEP 1: Choose Number of Questions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Select Number of Questions
                  </h3>
                </div>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {questionCount} Questions Selected (~{questionCount * 2} Mins)
                </span>
              </div>

              {/* Preset Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {QUICK_EXAM_PRESETS.map((preset) => {
                  const isSelected = questionCount === preset.count;
                  return (
                    <button
                      key={preset.count}
                      type="button"
                      onClick={() => handleSelectCount(preset.count)}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-lg font-black text-white">{preset.count} Qs</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{preset.subtitle}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          ~{preset.durationMinutes} mins
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Number Slider */}
              <div className="pt-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-blue-400" />
                    Custom Question Volume:
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{questionCount} Questions</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="45"
                  step="1"
                  value={questionCount}
                  onChange={(e) => handleSelectCount(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>3 Qs (Speed)</span>
                  <span>10 Qs</span>
                  <span>20 Qs</span>
                  <span>30 Qs</span>
                  <span>45 Qs (Full Mock)</span>
                </div>
              </div>
            </div>

            {/* STEP 2: Choose Scope / Module */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Select Syllabus Scope
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Mixed Option */}
                <button
                  type="button"
                  onClick={() => setScope('all')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    scope === 'all'
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-400" />
                      Mixed Syllabus (All)
                    </span>
                    {scope === 'all' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Full 81-question pool blending Commercial Intelligence & Strategic Planning.
                  </p>
                </button>

                {/* Commercial Intelligence */}
                <button
                  type="button"
                  onClick={() => setScope('commercial-intelligence')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    scope === 'commercial-intelligence'
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-blue-400" />
                      Commercial Intelligence
                    </span>
                    {scope === 'commercial-intelligence' && <CheckCircle2 className="w-4 h-4 text-blue-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Module 2108: ROMI, CAC, CLV, 5Ms audit, moving averages, and attribution models.
                  </p>
                </button>

                {/* Strategy & Planning */}
                <button
                  type="button"
                  onClick={() => setScope('strategy-planning')}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    scope === 'strategy-planning'
                      ? 'bg-purple-600/20 border-purple-500 ring-2 ring-purple-500/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      Strategy & Planning
                    </span>
                    {scope === 'strategy-planning' && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Module 2109: Ansoff, BCG, SFA, SOSTAC®, 7Ps tactical mix, and governance dashboards.
                  </p>
                </button>
              </div>
            </div>

            {/* STEP 3: Topic / LO Filter (Optional) */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Learning Outcome Focus (Optional)
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400">Balanced selection across LOs by default</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'all', label: 'All Learning Outcomes (Balanced)' },
                  { id: 'LO1', label: 'LO1: Financial Metrics & ROMI' },
                  { id: 'LO2', label: 'LO2: Audit, 5Ms & Resources' },
                  { id: 'LO3', label: 'LO3: Budgeting & Forecasting' },
                  { id: 'LO4', label: 'LO4: Brand Equity & Objectives' },
                  { id: 'LO5', label: 'LO5: Tactical Mix (7Ps) & 5Ms' },
                  { id: 'LO6', label: 'LO6: Dashboards & Governance' }
                ].map((item) => {
                  const isSelected = loFilter === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLoFilter(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="truncate">{item.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: Timer & Pacing */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Timer & Exam Conditions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setIsTimed(true)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isTimed
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Timed Exam ({questionCount * 2} Minutes)</div>
                      <div className="text-[11px] text-slate-400">
                        Official 2 minutes per question standard CIM pacing.
                      </div>
                    </div>
                  </div>
                  {isTimed && <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />}
                </button>

                <button
                  type="button"
                  onClick={() => setIsTimed(false)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    !isTimed
                      ? 'bg-emerald-600/20 border-emerald-500 ring-2 ring-emerald-500/40'
                      : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Untimed / Practice Mode</div>
                      <div className="text-[11px] text-slate-400">
                        No clock pressure. Perfect for deep formula revision.
                      </div>
                    </div>
                  </div>
                  {!isTimed && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                </button>
              </div>
            </div>

            {/* Launch Summary & Start Button */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-white">Configured Quick Exam:</span>{' '}
                <span className="text-blue-400 font-mono font-bold">{questionCount} Questions</span> •{' '}
                <span className="text-slate-300 font-medium">
                  {isTimed ? `${questionCount * 2} Mins Timed` : 'Untimed Practice'}
                </span> •{' '}
                <span className="text-slate-300 capitalize">{scope.replace('-', ' ')}</span>
              </div>

              <button
                type="button"
                onClick={handleStartExam}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xl shadow-blue-500/25 cursor-pointer border border-blue-400/30"
              >
                <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>Start {questionCount}-Question Quick Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ACTIVE EXAM & RESULTS
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header Exam Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (isExamCompleted || window.confirm('Exit Quick Exam and return to setup?')) {
                handleReturnToSetup();
              }
            }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Setup / Config"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                CIM Level 6 Quick Exam
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-amber-400" />
                {questionCount} Questions
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {scope === 'commercial-intelligence'
                ? 'Commercial Intelligence Pool'
                : scope === 'strategy-planning'
                ? 'Strategy & Planning Pool'
                : 'Mixed CIM Level 6 Pool'} • {isTimed ? `${questionCount * 2} Minutes` : 'Untimed Practice'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowCalculator(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Calculator</span>
          </button>

          {!isExamCompleted && isTimed && (
            <ExamTimer
              durationMinutes={questionCount * 2}
              isActive={!isExamCompleted}
              onTick={(left) => setTimeSpentSeconds(questionCount * 2 * 60 - left)}
              onTimeExpired={handleFinishExam}
            />
          )}

          {!isExamCompleted && !isTimed && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-400 text-xs font-mono font-bold border border-slate-700">
              <Clock className="w-3.5 h-3.5" />
              <span>Untimed</span>
            </div>
          )}

          {!isExamCompleted && (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Finish & Grade
            </button>
          )}

          {isExamCompleted && (
            <button
              onClick={handleReturnToSetup}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer border border-slate-700"
            >
              New Quiz
            </button>
          )}

          {/* Candidate Profile Chip */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800">
            <TashaAvatar size="xs" showOnline={false} />
            <span className="text-xs font-bold text-white">Tasha Aka</span>
          </div>
        </div>
      </header>

      {/* Tutor Shumba Quick Exam Advice Banner */}
      {!isExamCompleted && (
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-b border-amber-500/20 px-4 sm:px-6 py-2 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShumbaAvatar size="xs" showBadge={false} showMentorShield={false} />
            <span className="text-amber-300 font-bold">Tutor Shumba:</span>
            <span className="hidden md:inline text-slate-300">
              Stay composed, Tasha! Eliminate extreme options first, check your formula units, and trust your preparation.
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold">Candidate: Tasha Aka • Quick Drill</span>
        </div>
      )}

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {isExamCompleted && completedAttempt ? (
          <div className="space-y-6">
            <ScoreReportModal
              attempt={completedAttempt}
              questions={questions}
              onRetake={handleRetakeWithSameSettings}
            />

            {/* Additional Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetakeWithSameSettings}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake with New Questions ({questionCount} Qs)</span>
              </button>

              <button
                onClick={handleReturnToSetup}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Configure Different Quick Exam</span>
              </button>

              <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold transition-all border border-slate-800"
              >
                <Home className="w-4 h-4" />
                <span>Return to Hub</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left 3 Columns: Active Question Card */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                {/* Question Info Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {currentQuestion.loId} • {currentQuestion.criterionId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentQuestion.isNumerical && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                        Formula Math
                      </span>
                    )}
                    {currentQuestion.commandVerb && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                        {currentQuestion.commandVerb}
                      </span>
                    )}
                  </div>
                </div>

                {/* Scenario Context Box */}
                {currentQuestion.scenario && (
                  <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800/80">
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Scenario Context:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentQuestion.scenario}
                    </p>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Multiple-Choice Options */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelectOption(option.id)}
                        className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white font-semibold ring-2 ring-blue-500/30'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {option.id}
                          </span>
                          <span className="leading-relaxed">{option.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation and Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFlag(currentQuestion.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        flaggedQuestions.includes(currentQuestion.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700'
                      }`}
                    >
                      <Flag
                        className={`w-3.5 h-3.5 ${
                          flaggedQuestions.includes(currentQuestion.id) ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                      <span className="hidden sm:inline">
                        {flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag'}
                      </span>
                    </button>

                    {currentIndex < questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowSubmitConfirm(true)}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      >
                        <span>Finish Exam</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Question Navigator */}
            <div className="lg:col-span-1 space-y-4">
              <QuestionNavigator
                totalQuestions={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                onSelectQuestion={setCurrentIndex}
                onToggleFlag={handleToggleFlag}
                questionIds={questions.map((q) => q.id)}
              />

              {/* Quick Status Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Questions:</span>
                  <span className="font-mono text-white font-bold">{questions.length}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Answered:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {Object.keys(answers).length}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Remaining:</span>
                  <span className="font-mono text-amber-400 font-bold">
                    {questions.length - Object.keys(answers).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Formula Calculator Modal */}
      <FormulaCalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Complete & Grade Quick Exam?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              You have answered{' '}
              <strong className="text-white font-mono">{Object.keys(answers).length}</strong> of{' '}
              <strong className="text-white font-mono">{questions.length}</strong> questions.
              {questions.length - Object.keys(answers).length > 0 && (
                <span className="block text-amber-400 mt-2">
                  Warning: You have {questions.length - Object.keys(answers).length} unanswered questions.
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Continue Quiz
              </button>
              <button
                type="button"
                onClick={handleFinishExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                Submit & View Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuickExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <QuickExamContent />
    </Suspense>
  );
}
