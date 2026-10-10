'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Loader2,
  Home,
  FileText,
  Cpu,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Check
} from 'lucide-react';
import { STRATEGY_PLANNING_CASES, STRATEGY_PLANNING_MCQ_QUESTIONS } from '../../../lib/examData/strategyPlanning';
import { gradeStrategyResponseDeepSeek, DEEPSEEK_MODELS, DEFAULT_DEEPSEEK_MODEL } from '../../../lib/deepseek';
import { gradeStrategyResponseTogether, TOGETHER_MODELS, DEFAULT_TOGETHER_MODEL } from '../../../lib/together';
import {
  getSavedAiProvider,
  saveAiProvider,
  getSavedDeepSeekApiKey,
  saveDeepSeekApiKey,
  getSavedDeepSeekModel,
  saveDeepSeekModel,
  getSavedTogetherApiKey,
  saveTogetherApiKey,
  getSavedTogetherModel,
  saveTogetherModel,
  AiProvider
} from '../../../lib/storage';
import ExamTimer from '../../../components/exam/ExamTimer';

interface StrategyGradingResult {
  marksAwarded: number;
  grade: 'Distinction' | 'Merit' | 'Pass' | 'Fail';
  examinerFeedback: string;
  commandVerbCompliance: string;
  strengths: string[];
  areasForImprovement: string[];
}

export default function StrategyPlanningExamPage() {
  const caseStudy = STRATEGY_PLANNING_CASES[0];
  const [examMode, setExamMode] = useState<'written-case' | 'diagnostic-mcq'>('written-case');

  // Written Case Study State
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({
    'Task 1': '',
    'Task 2': '',
    'Task 3': '',
    'Task 4': ''
  });
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResults, setGradingResults] = useState<Record<string, StrategyGradingResult>>({});
  const [activeTab, setActiveTab] = useState<'editor' | 'rubric' | 'results'>('editor');

  // MCQ State
  const [mcqIndex, setMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, string>>({});

  // AI Provider State
  const [provider, setProvider] = useState<AiProvider>('deepseek');
  const [deepseekKey, setDeepseekKey] = useState('');
  const [deepseekModel, setDeepseekModel] = useState(DEFAULT_DEEPSEEK_MODEL);
  const [togetherKey, setTogetherKey] = useState('');
  const [togetherModel, setTogetherModel] = useState(DEFAULT_TOGETHER_MODEL);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);

  useEffect(() => {
    const savedProvider = getSavedAiProvider();
    const dsKey = getSavedDeepSeekApiKey();
    const dsModel = getSavedDeepSeekModel();
    const tgKey = getSavedTogetherApiKey();
    const tgModel = getSavedTogetherModel();

    setProvider(savedProvider);
    if (dsKey) setDeepseekKey(dsKey);
    if (dsModel) setDeepseekModel(dsModel);
    if (tgKey) setTogetherKey(tgKey);
    if (tgModel) setTogetherModel(tgModel);

    setIsKeyConfigured(savedProvider === 'deepseek' ? !!dsKey : !!tgKey);
  }, []);

  const handleSaveSettings = () => {
    saveAiProvider(provider);
    saveDeepSeekApiKey(deepseekKey);
    saveDeepSeekModel(deepseekModel);
    saveTogetherApiKey(togetherKey);
    saveTogetherModel(togetherModel);
    setIsKeyConfigured(provider === 'deepseek' ? !!deepseekKey.trim() : !!togetherKey.trim());
    setShowKeyModal(false);
  };

  const currentTask = caseStudy.examTasks[activeTaskIndex];
  const currentResult = gradingResults[currentTask.sectionId];

  const handleGradeTask = async () => {
    const text = userResponses[currentTask.sectionId] || '';
    if (!text.trim()) {
      alert('Please write your strategic response before submitting for AI examination.');
      return;
    }

    setIsGrading(true);
    try {
      let result: StrategyGradingResult;

      if (provider === 'deepseek') {
        result = await gradeStrategyResponseDeepSeek({
          caseTitle: caseStudy.title,
          taskPrompt: currentTask.taskPrompt,
          commandVerb: currentTask.commandVerb,
          userResponse: text,
          marks: currentTask.marks,
          apiKey: deepseekKey,
          model: deepseekModel
        });
      } else {
        result = await gradeStrategyResponseTogether({
          caseTitle: caseStudy.title,
          taskPrompt: currentTask.taskPrompt,
          commandVerb: currentTask.commandVerb,
          userResponse: text,
          marks: currentTask.marks,
          apiKey: togetherKey,
          model: togetherModel
        });
      }

      setGradingResults((prev) => ({
        ...prev,
        [currentTask.sectionId]: result
      }));
      setActiveTab('results');
    } catch (err) {
      console.error('AI examiner grading error:', err);
    } finally {
      setIsGrading(false);
    }
  };

  const activeModelDisplay =
    provider === 'deepseek'
      ? deepseekModel === 'deepseek-reasoner'
        ? 'DeepSeek-R1'
        : 'DeepSeek-V3'
      : togetherModel.split('/')[1] || togetherModel;

  // MCQ stats calculation
  const currentMcq = STRATEGY_PLANNING_MCQ_QUESTIONS[mcqIndex];
  const totalMcqs = STRATEGY_PLANNING_MCQ_QUESTIONS.length;
  const answeredMcqCount = Object.keys(mcqAnswers).length;
  const correctMcqCount = Object.entries(mcqAnswers).filter(
    ([id, ans]) => {
      const q = STRATEGY_PLANNING_MCQ_QUESTIONS.find((item) => item.id === Number(id));
      return q && q.correctAnswer === ans;
    }
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <Home className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                CIM Award in Strategy and Planning
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                SP-L6-2024
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              20 Credits • Onscreen Plan Submission & Extended Response Test
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setExamMode('written-case')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              examMode === 'written-case'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Written Plan Arena</span>
          </button>

          <button
            onClick={() => setExamMode('diagnostic-mcq')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              examMode === 'diagnostic-mcq'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Diagnostic MCQs ({answeredMcqCount}/{totalMcqs})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isKeyConfigured
                ? 'bg-blue-950/40 text-blue-300 border-blue-800'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">AI Examiner:</span>
            <span className="font-mono text-[11px] text-blue-300 font-bold">
              {activeModelDisplay}
            </span>
          </button>

          <ExamTimer durationMinutes={120} isActive={true} onTimeExpired={() => {}} />
        </div>
      </header>

      {/* =========================================================================
          MODE 1: WRITTEN CASE STUDY & PLAN SUBMISSION ARENA (NYIKA.APP)
      ========================================================================== */}
      {examMode === 'written-case' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Case Study Scenario */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 max-h-[82vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Official CIM Case Study (2024 V1.1)</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                  nyika.app
                </span>
              </div>

              <h2 className="text-lg font-bold text-white leading-snug">{caseStudy.title}</h2>

              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed space-y-2">
                <p>{caseStudy.background}</p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Strategic Situation & Audit Data:
                </h4>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div>
                    <strong className="text-blue-400">Financials & GMV:</strong> {caseStudy.currentSituation.financials}
                  </div>
                  <div>
                    <strong className="text-emerald-400">Market Share (Harare vs SA):</strong>{' '}
                    {caseStudy.currentSituation.marketShare}
                  </div>
                  <div>
                    <strong className="text-amber-400">Competitive Rivalry:</strong>{' '}
                    {caseStudy.currentSituation.competitivePressure}
                  </div>
                  <div>
                    <strong className="text-purple-400">Internal Tech & 5Ms:</strong>{' '}
                    {caseStudy.currentSituation.internalResources}
                  </div>
                </div>
              </div>

              {/* Task Selector Tabs */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exam Written Tasks (100 Marks Total)
                </h4>
                <div className="space-y-1.5">
                  {caseStudy.examTasks.map((t, idx) => (
                    <button
                      key={t.sectionId}
                      onClick={() => {
                        setActiveTaskIndex(idx);
                        setActiveTab(gradingResults[t.sectionId] ? 'results' : 'editor');
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        activeTaskIndex === idx
                          ? 'bg-purple-950/60 border-purple-500 text-white font-semibold'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-purple-400">{t.sectionId}:</span>
                        <span className="truncate">
                          {t.commandVerb} ({t.marks} Marks)
                        </span>
                      </div>
                      {gradingResults[t.sectionId] && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Task Editor & AI Examiner */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col h-full space-y-5">
              {/* Task Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase font-mono px-2.5 py-0.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
                      {currentTask.sectionId} • {currentTask.marks} Marks
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      Command Verb: {currentTask.commandVerb}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{currentTask.taskPrompt}</h3>
                </div>
              </div>

              {/* Sub-tabs: Editor / Rubrics / AI Results */}
              <div className="flex gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'editor' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plan Workspace
                </button>
                <button
                  onClick={() => setActiveTab('rubric')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'rubric' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Level 6 Marking Rubric
                </button>
                {currentResult && (
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'results' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Chief Examiner Grade ({currentResult.marksAwarded}/{currentTask.marks})
                  </button>
                )}
              </div>

              {/* Editor Body */}
              {activeTab === 'editor' && (
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="text-xs text-slate-400 flex items-center justify-between">
                    <span>Draft your written strategic response for Nyika.app below:</span>
                    <span className="font-mono font-bold text-slate-300">
                      {(userResponses[currentTask.sectionId] || '').split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>

                  <textarea
                    value={userResponses[currentTask.sectionId] || ''}
                    onChange={(e) =>
                      setUserResponses({
                        ...userResponses,
                        [currentTask.sectionId]: e.target.value
                      })
                    }
                    placeholder={`Structure your answer for Nyika.app following the Level 6 '${currentTask.commandVerb}' requirements:\n\n1. External Environment Analysis (PESTEL: Currency, Mobile Money, Traffic / Porter's 5 Forces)...\n2. Strategic TOWS Matrix (SO, ST, WO, WT)...\n3. Clear financial and operational justification grounded in Nyika's B2B and B2C market metrics...`}
                    className="w-full flex-1 min-h-[320px] bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-white font-sans focus:outline-none focus:border-purple-500 leading-relaxed resize-y"
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <span className="text-[11px] text-slate-500">
                      Required Frameworks: {currentTask.requiredFrameworks.join(', ')}
                    </span>

                    <button
                      disabled={isGrading}
                      onClick={handleGradeTask}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                    >
                      {isGrading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>AI Examiner Grading ({activeModelDisplay})...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Submit for Chief Examiner Review ({activeModelDisplay})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Rubric View */}
              {activeTab === 'rubric' && (
                <div className="space-y-4 text-xs p-4 bg-slate-950 rounded-2xl border border-slate-800 overflow-y-auto max-h-96">
                  <div>
                    <h4 className="font-bold text-white mb-1">Expected Model Answer Key Points for Nyika.app:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      {currentTask.modelAnswerStructure.keyPoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <h4 className="font-bold text-amber-400 mb-1">
                      Command Verb Compliance ({currentTask.commandVerb}):
                    </h4>
                    <p className="text-slate-300">{currentTask.modelAnswerStructure.commandVerbApplication}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <h4 className="font-bold text-purple-400 mb-1">Level 6 Distinction Criteria (80%+):</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300">
                      {currentTask.modelAnswerStructure.level6DistinctionCriteria.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Results View */}
              {activeTab === 'results' && currentResult && (
                <div className="space-y-4 p-5 bg-slate-950 rounded-2xl border border-slate-800 overflow-y-auto max-h-96 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Awarded Score:</span>
                      <div className="text-xl font-bold font-mono text-purple-400">
                        {currentResult.marksAwarded} / {currentTask.marks} Marks ({currentResult.grade})
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold uppercase border ${
                        currentResult.grade === 'Distinction'
                          ? 'bg-purple-950 text-purple-300 border-purple-700'
                          : currentResult.grade === 'Merit'
                          ? 'bg-blue-950 text-blue-300 border-blue-700'
                          : currentResult.grade === 'Pass'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : 'bg-rose-950 text-rose-300 border-rose-700'
                      }`}
                    >
                      {currentResult.grade}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-1">Chief Examiner Commentary:</h4>
                    <p className="text-slate-300 leading-relaxed">{currentResult.examinerFeedback}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-amber-400">Command Verb Check ({currentTask.commandVerb}):</strong>
                    <p className="text-slate-300">{currentResult.commandVerbCompliance}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-emerald-950/30 border border-emerald-900/60 rounded-xl space-y-1">
                      <strong className="text-emerald-400">Demonstrated Strengths:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-emerald-200">
                        {currentResult.strengths?.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-rose-950/30 border border-rose-900/60 rounded-xl space-y-1">
                      <strong className="text-rose-400">Areas for Improvement:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-rose-200">
                        {currentResult.areasForImprovement?.map((a: string, i: number) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          MODE 2: STRATEGIC DIAGNOSTIC MULTIPLE-CHOICE EXAM
      ========================================================================== */}
      {examMode === 'diagnostic-mcq' && (
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Diagnostic Stats Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Strategy & Planning Diagnostic Exam</h3>
                <p className="text-xs text-slate-400">
                  Multiple-Choice Knowledge Review • 2024 V1.1 Standards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="text-slate-400">
                Answered: <strong className="text-white">{answeredMcqCount}</strong> / {totalMcqs}
              </div>
              <div className="text-slate-400">
                Score: <strong className="text-emerald-400">{correctMcqCount}</strong> Correct (
                {answeredMcqCount > 0 ? Math.round((correctMcqCount / answeredMcqCount) * 100) : 0}%)
              </div>
            </div>
          </div>

          {/* MCQ Question Navigator Tabs */}
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-1.5 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            {STRATEGY_PLANNING_MCQ_QUESTIONS.map((q, idx) => {
              const answered = mcqAnswers[q.id];
              const isCorrect = answered === q.correctAnswer;
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setMcqIndex(idx);
                  }}
                  className={`h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    mcqIndex === idx
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : answered
                      ? isCorrect
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : 'bg-rose-950 text-rose-400 border border-rose-700'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-400 text-xs font-mono font-bold border border-blue-800">
                  Question {mcqIndex + 1} of {totalMcqs}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentMcq.loId} • {currentMcq.criterionId}
                </span>
                {currentMcq.commandVerb && (
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    Verb: {currentMcq.commandVerb}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-blue-400">Scenario Context:</strong> {currentMcq.scenario}
              </div>
              <h3 className="text-base font-bold text-white pt-1">{currentMcq.question}</h3>
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentMcq.options.map((opt) => {
                const selected = mcqAnswers[currentMcq.id] === opt.id;
                const isAnswered = !!mcqAnswers[currentMcq.id];
                const isCorrect = opt.id === currentMcq.correctAnswer;

                let btnStyle = 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-200';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                  } else if (selected) {
                    btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setMcqAnswers({
                        ...mcqAnswers,
                        [currentMcq.id]: opt.id
                      });
                    }}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-800 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {opt.id}
                      </span>
                      <span>{opt.text}</span>
                    </div>
                    {isAnswered && isCorrect && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswered && selected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Distractor Analysis */}
            {mcqAnswers[currentMcq.id] && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-blue-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CIM Examiner Rationale:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{currentMcq.explanation.rationale}</p>
                <div className="text-[11px] text-slate-500 font-mono pt-1">
                  Syllabus: {currentMcq.explanation.syllabusReference}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={mcqIndex === 0}
                onClick={() => setMcqIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Previous Question
              </button>

              <button
                disabled={mcqIndex === totalMcqs - 1}
                onClick={() => setMcqIndex((prev) => Math.min(totalMcqs - 1, prev + 1))}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold disabled:opacity-40 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* AI Model Settings Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">AI Examiner Configuration</h3>
                <p className="text-xs text-slate-400">DeepSeek (V3 / R1) & Together AI multi-model engine</p>
              </div>
            </div>

            {/* Provider Switch Tabs */}
            <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setProvider('deepseek')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  provider === 'deepseek'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                DeepSeek (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setProvider('together')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  provider === 'together'
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Together AI
              </button>
            </div>

            {provider === 'deepseek' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">DeepSeek API Key</label>
                  <input
                    type="password"
                    placeholder="sk-..."
                    value={deepseekKey}
                    onChange={(e) => setDeepseekKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Pre-configured for economical, high-speed examiner reviews.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Select DeepSeek Model</label>
                  <div className="space-y-2">
                    {DEEPSEEK_MODELS.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setDeepseekModel(m.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          deepseekModel === m.id
                            ? 'bg-blue-950/60 border-blue-500 text-white'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{m.name}</span>
                          {deepseekModel === m.id && <span className="text-blue-400 text-[10px]">Active</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Together AI API Key</label>
                  <input
                    type="password"
                    placeholder="together_api_key_..."
                    value={togetherKey}
                    onChange={(e) => setTogetherKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Select Together Model</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {TOGETHER_MODELS.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setTogetherModel(m.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          togetherModel === m.id
                            ? 'bg-purple-950/60 border-purple-500 text-white'
                            : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{m.name}</span>
                          {togetherModel === m.id && <span className="text-purple-400 text-[10px]">Active</span>}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                Save AI Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
