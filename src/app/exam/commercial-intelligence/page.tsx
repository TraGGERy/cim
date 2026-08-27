'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Calculator,
  Flag,
  Award,
  Home
} from 'lucide-react';
import { getCommercialIntelligenceExamQuestions } from '../../../lib/examData/commercialIntelligence';
import { ExamQuestion, UserExamAttempt } from '../../../types/cim';
import ExamTimer from '../../../components/exam/ExamTimer';
import QuestionNavigator from '../../../components/exam/QuestionNavigator';
import FormulaCalculator from '../../../components/exam/FormulaCalculator';
import ScoreReportModal from '../../../components/exam/ScoreReportModal';
import { saveExamAttempt } from '../../../lib/storage';

export default function CommercialIntelligenceExamPage() {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<UserExamAttempt | null>(null);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    const loadedQuestions = getCommercialIntelligenceExamQuestions();
    setQuestions(loadedQuestions);
  }, []);

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
    const loBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {
      LO1: { total: 0, correct: 0, percentage: 0 },
      LO2: { total: 0, correct: 0, percentage: 0 },
      LO3: { total: 0, correct: 0, percentage: 0 }
    };

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
      id: `attempt-ci-${Date.now()}`,
      moduleId: 'commercial-intelligence',
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

  const handleRetake = () => {
    setAnswers({});
    setFlaggedQuestions([]);
    setCurrentIndex(0);
    setTimeSpentSeconds(0);
    setIsExamCompleted(false);
    setCompletedAttempt(null);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Loading Official CIM Level 6 Exam...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header Exam Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
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
                CIM Award in Commercial Intelligence
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                CI-L6-2024
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Onscreen Assessment • 45 Questions • 90 Minutes Standard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowCalculator(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Formula Calculator</span>
          </button>

          {!isExamCompleted && (
            <ExamTimer
              durationMinutes={90}
              isActive={!isExamCompleted}
              onTick={(left) => setTimeSpentSeconds(90 * 60 - left)}
              onTimeExpired={handleFinishExam}
            />
          )}

          {!isExamCompleted && (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              Submit Exam
            </button>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {isExamCompleted && completedAttempt ? (
          <ScoreReportModal
            attempt={completedAttempt}
            questions={questions}
            onRetake={handleRetake}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left 3 Columns: Active Question Card */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                {/* Question Info Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-blue-600 text-white text-xs font-mono font-bold">
                      Question {currentIndex + 1} of {questions.length}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {currentQuestion.loId} ({currentQuestion.criterionId})
                    </span>
                    {currentQuestion.commandVerb && (
                      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800">
                        {currentQuestion.commandVerb}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleToggleFlag(currentQuestion.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      flaggedQuestions.includes(currentQuestion.id)
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                    }`}
                  >
                    <Flag
                      className={`w-3.5 h-3.5 ${
                        flaggedQuestions.includes(currentQuestion.id) ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                    <span className="hidden sm:inline">
                      {flaggedQuestions.includes(currentQuestion.id) ? 'Flagged' : 'Flag for Review'}
                    </span>
                  </button>
                </div>

                {/* Scenario Context */}
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-sans">
                  <span className="text-blue-400 font-bold uppercase tracking-wider block mb-1">
                    Scenario Background:
                  </span>
                  {currentQuestion.scenario}
                </div>

                {/* Direct Question Prompt */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/30 text-white shadow-lg'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-xs sm:text-sm pt-0.5 leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 text-xs font-bold transition-all border border-slate-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="text-xs font-mono text-slate-400 hidden sm:block">
                    {Object.keys(answers).length} of {questions.length} Answered
                  </div>

                  <button
                    disabled={currentIndex === questions.length - 1}
                    onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Question Navigator Grid */}
            <div className="lg:col-span-1">
              <QuestionNavigator
                totalQuestions={questions.length}
                currentIndex={currentIndex}
                answers={answers}
                flaggedQuestions={flaggedQuestions}
                onSelectQuestion={(idx) => setCurrentIndex(idx)}
                onToggleFlag={handleToggleFlag}
              />
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
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Submit Examination?</h3>
                <p className="text-xs text-slate-400">Review your answered questions before completing</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Answered:</span>
                <span className="font-bold text-white font-mono">
                  {Object.keys(answers).length} / {questions.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Flagged for Review:</span>
                <span className="font-bold text-amber-400 font-mono">{flaggedQuestions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Unanswered:</span>
                <span className="font-bold text-rose-400 font-mono">
                  {questions.length - Object.keys(answers).length}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Back to Exam
              </button>
              <button
                onClick={handleFinishExam}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
