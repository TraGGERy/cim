'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Loader2,
  Home,
  FileText,
  Cpu
} from 'lucide-react';
import { STRATEGY_PLANNING_CASES } from '../../../lib/examData/strategyPlanning';
import { gradeStrategyResponseTogether, TOGETHER_MODELS, DEFAULT_TOGETHER_MODEL } from '../../../lib/together';
import { getSavedTogetherApiKey, saveTogetherApiKey, getSavedTogetherModel, saveTogetherModel } from '../../../lib/storage';
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
  const [togetherKey, setTogetherKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_TOGETHER_MODEL);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);

  useEffect(() => {
    const key = getSavedTogetherApiKey();
    const model = getSavedTogetherModel();
    if (key) {
      setTogetherKey(key);
      setIsKeyConfigured(true);
    }
    if (model) {
      setSelectedModel(model);
    }
  }, []);

  const handleSaveTogetherSettings = () => {
    saveTogetherApiKey(togetherKey);
    saveTogetherModel(selectedModel);
    setIsKeyConfigured(!!togetherKey.trim());
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
      const result = await gradeStrategyResponseTogether({
        caseTitle: caseStudy.title,
        taskPrompt: currentTask.taskPrompt,
        commandVerb: currentTask.commandVerb,
        userResponse: text,
        marks: currentTask.marks,
        apiKey: togetherKey,
        model: selectedModel
      });

      setGradingResults((prev) => ({
        ...prev,
        [currentTask.sectionId]: result
      }));
      setActiveTab('results');
    } catch (err) {
      console.error('Together AI grading error:', err);
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar */}
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
              Onscreen Plan Submission & Response Test • 2 Hours Standard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isKeyConfigured
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Together AI:</span>
            <span className="font-mono text-[11px] text-purple-300">
              {selectedModel.split('/')[1] || selectedModel}
            </span>
          </button>

          <ExamTimer durationMinutes={120} isActive={true} onTimeExpired={() => {}} />
        </div>
      </header>

      {/* Main Case & Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Case Study Scenario Context */}
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
                Exam Tasks (100 Marks Total)
              </h4>
              <div className="space-y-1.5">
                {caseStudy.examTasks.map((t, idx) => (
                  <button
                    key={t.sectionId}
                    onClick={() => {
                      setActiveTaskIndex(idx);
                      setActiveTab(gradingResults[t.sectionId] ? 'results' : 'editor');
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${
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

        {/* Right Column (7 Cols): Active Task Editor & AI Examiner */}
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'editor' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Plan Workspace
              </button>
              <button
                onClick={() => setActiveTab('rubric')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'rubric' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Level 6 Marking Rubric
              </button>
              {currentResult && (
                <button
                  onClick={() => setActiveTab('results')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'results' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  AI Chief Examiner Grade ({currentResult.marksAwarded}/{currentTask.marks})
                </button>
              )}
            </div>

            {/* Editor Body */}
            {activeTab === 'editor' && (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Draft your structured response for Nyika.app below:</span>
                  <span className="font-mono">
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

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    Required Frameworks: {currentTask.requiredFrameworks.join(', ')}
                  </span>

                  <button
                    disabled={isGrading}
                    onClick={handleGradeTask}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                  >
                    {isGrading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Together AI Examiner Grading...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Submit for Together AI Examiner Review</span>
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

      {/* Together AI Settings Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Together AI Model Configuration</h3>
                <p className="text-xs text-slate-400">Fast, low-cost AI examiner & Socratic tutoring</p>
              </div>
            </div>

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
                <label className="text-xs font-medium text-slate-300 block mb-1">Select Model (Cheap & Capable)</label>
                <div className="space-y-2">
                  {TOGETHER_MODELS.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedModel(m.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedModel === m.id
                          ? 'bg-purple-950/60 border-purple-500 text-white'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span>{m.name}</span>
                        {selectedModel === m.id && <span className="text-purple-400 text-[10px]">Active</span>}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{m.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTogetherSettings}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-500/20"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
