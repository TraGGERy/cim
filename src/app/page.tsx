'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  Zap,
  BookOpen,
  Award,
  Flame,
  ArrowRight,
  Calculator,
  Layers,
  Cpu,
  CheckCircle2,
  FileText
} from 'lucide-react';
import {
  getSavedTogetherApiKey,
  saveTogetherApiKey,
  getSavedTogetherModel,
  saveTogetherModel,
  getInterruptStats,
  getExamAttempts,
  InterruptStats
} from '../lib/storage';
import { UserExamAttempt } from '../types/cim';
import FormulaCalculator from '../components/exam/FormulaCalculator';
import InterruptionModal from '../components/interrupt/InterruptionModal';
import { InterruptChallenge } from '../types/cim';
import AttributionCanvas from '../components/3d/AttributionCanvas';
import { TOGETHER_MODELS, DEFAULT_TOGETHER_MODEL } from '../lib/together';

export default function HomePage() {
  const [togetherKey, setTogetherKey] = useState('');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_TOGETHER_MODEL);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [interruptStats, setInterruptStats] = useState<InterruptStats>({
    totalFired: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastInterceptTime: 0
  });
  const [recentAttempts, setRecentAttempts] = useState<UserExamAttempt[]>([]);

  // Interruption prompt state
  const [activeChallenge, setActiveChallenge] = useState<InterruptChallenge | null>(null);
  const [showInterruptModal, setShowInterruptModal] = useState(false);

  useEffect(() => {
    const savedKey = getSavedTogetherApiKey();
    const savedModel = getSavedTogetherModel();
    if (savedKey) {
      setTogetherKey(savedKey);
      setIsKeySaved(true);
    }
    if (savedModel) {
      setSelectedModel(savedModel);
    }
    setInterruptStats(getInterruptStats());
    setRecentAttempts(getExamAttempts());
  }, []);

  const handleSaveTogetherSettings = () => {
    saveTogetherApiKey(togetherKey);
    saveTogetherModel(selectedModel);
    setIsKeySaved(!!togetherKey.trim());
    setShowKeyModal(false);
  };

  const triggerRapidInterrupt = () => {
    const sampleChallenge: InterruptChallenge = {
      id: `ch-${Date.now()}`,
      type: 'scenario-dilemma',
      title: 'Nyika.app Driver Subsidies vs B2B Margin Dilemma',
      context: 'Nyika’s B2B express parcel courier achieves 32% gross margin, while B2C passenger rides yield 14%. Driver acquisition in Johannesburg is currently inflating monthly burn rate.',
      prompt: 'Under CIM LO 2.1 & LO 3.3, what resource reallocation is commercially recommended?',
      options: [
        { id: 'A', text: 'Reallocate capital toward B2B SME merchant acquisition where 32% gross margins deliver superior ROMI and faster customer payback.' },
        { id: 'B', text: 'Quadruple passenger ride subsidies in Johannesburg regardless of negative unit economics.' },
        { id: 'C', text: 'Shut down the B2B cargo logistics line entirely.' },
        { id: 'D', text: 'Eliminate EcoCash and M-Pesa mobile money integrations.' }
      ],
      correctAnswer: 'A',
      explanation: 'Under LO 3.3 (Prioritising Expenditure for ROMI), capital must flow toward segments with superior unit contribution margins (32% parcel vs 14% passenger) to optimize overall platform profitability.',
      loReference: 'CIM Commercial Intelligence LO 2.1 & LO 3.3 (Resource Allocation & ROMI)',
      timeLimitSeconds: 45
    };
    setActiveChallenge(sampleChallenge);
    setShowInterruptModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white">CIM MASTER</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 font-mono">
                  LEVEL 6 • 2024 V1.1
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Commercial Intelligence & Strategy (Nyika.app Case Study)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCalculator(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-all"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Formulas</span>
            </button>

            <button
              onClick={triggerRapidInterrupt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span>Active Intercept</span>
            </button>

            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                isKeySaved
                  ? 'bg-purple-950/40 border-purple-800 text-purple-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Configure Together AI"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="hidden md:inline text-[11px] font-mono">
                {isKeySaved ? `Together AI (${selectedModel.split('/')[1] || 'Connected'})` : 'Together AI'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden p-6 sm:p-10 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Grounded in Official 2024 V1.1 Standards • Powered by Together AI
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Master the CIM Level 6 Exam with Precision.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              An exam-accurate simulation platform built specifically for the <strong>Commercial Intelligence</strong> (45-Question 90-Min Onscreen Test) and <strong>Strategy & Planning</strong> qualifications featuring the <strong>Nyika.app</strong> mobility case study, evaluated with low-cost high-capability Together AI models.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/exam/commercial-intelligence"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 border border-blue-400/30"
              >
                <Award className="w-4 h-4" />
                <span>Launch 45-Q Commercial Exam (90m)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/exam/strategy-planning"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-bold transition-all border border-purple-500/30"
              >
                <FileText className="w-4 h-4" />
                <span>Nyika.app Strategy Case Study (2h)</span>
              </Link>

              <Link
                href="/interrupt-trainer"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-800 hover:border-slate-700"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Interruptive Recall Arena</span>
              </Link>

              <Link
                href="/visual-3d"
                className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all border border-slate-800 hover:border-slate-700"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                <span>3D WebGL Learning Lab</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Real-time Stats & Active Recall Metric */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-panel p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Flame className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-white">{interruptStats.streak}</div>
              <div className="text-xs text-slate-400 font-medium">Recall Streak</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-white">{recentAttempts.length}</div>
              <div className="text-xs text-slate-400 font-medium">Exam Mock Tests</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-white">
                {interruptStats.totalAnswered > 0
                  ? Math.round((interruptStats.totalCorrect / interruptStats.totalAnswered) * 100)
                  : 0}
                %
              </div>
              <div className="text-xs text-slate-400 font-medium">Accuracy Rate</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black font-mono text-white">2024 V1.1</div>
              <div className="text-xs text-slate-400 font-medium">CIM Standard</div>
            </div>
          </div>
        </section>

        {/* 2 Core CIM Modules Cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">CIM Level 6 Core Qualifications</h2>
              <p className="text-xs text-slate-400">Strictly modeled on official Ofqual specification criteria</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Module 1: Commercial Intelligence */}
            <div className="glass-panel-interactive p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-mono font-bold border border-blue-500/30">
                    CI-L6-2024 • 10 Credits
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">90 Mins • 45 MCQs</span>
                </div>

                <h3 className="text-xl font-bold text-white">CIM Level 6 Award in Commercial Intelligence</h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Financial metrics (ROMI, CAC, CLV, Margin, Break-even), Marketing performance analytics, 5Ms resource allocation, forecasting regression, and variance management.
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span><strong>LO 1:</strong> Financial & Marketing Performance Metrics (40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span><strong>LO 2:</strong> 5Ms & Resource Management (30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span><strong>LO 3:</strong> Forecasting & Strategic Budgeting (30%)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Pass: <strong className="text-emerald-400">60%</strong> • Merit: <strong className="text-blue-400">70%</strong> • Distinction: <strong className="text-purple-400">80%</strong>
                </div>
                <Link
                  href="/exam/commercial-intelligence"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  Start Exam
                </Link>
              </div>
            </div>

            {/* Module 2: Strategy and Planning (Nyika.app) */}
            <div className="glass-panel-interactive p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-mono font-bold border border-purple-500/30">
                    SP-L6-2024 • 20 Credits
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-semibold">2 Hours • nyika.app Case</span>
                </div>

                <h3 className="text-xl font-bold text-white">CIM Level 6 Award in Strategy and Planning</h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Featured Case Study: Nyika.app</strong> — Scaling motorcycle fare bidding and B2B express parcel delivery across Zimbabwe, South Africa, Zambia, and Mozambique using SOSTAC®, 7Ps, and Together AI grading.
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span><strong>LO 1-2:</strong> Nyika.app Audit (PESTEL, 5 Forces & TOWS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span><strong>LO 3-4:</strong> Strategic Option Appraisal (SFA) & SOSTAC®</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span><strong>LO 5-6:</strong> 5Ms Implementation & PDCA Measurement</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  Graded by: <strong className="text-purple-300">Together AI Examiner (Llama 3.3)</strong>
                </div>
                <Link
                  href="/exam/strategy-planning"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-500/20"
                >
                  Start Case Exam
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Interactive Feature Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Interactive 3D WebGL Learning Simulation</h2>
              <p className="text-xs text-slate-400">Explore multi-touch attribution and strategic spaces with real-time physics</p>
            </div>
            <Link
              href="/visual-3d"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>View All 3D Labs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <AttributionCanvas />
        </section>

        {/* Reference & Quick Links Hub */}
        <section className="glass-panel p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">CIM Level 6 Reference Center</h3>
                <p className="text-xs text-slate-400">Printable reference guides and command verb master sheets</p>
              </div>
            </div>
            <Link
              href="/reference"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
            >
              Open Reference Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/reference#formulas"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <h4 className="text-xs font-bold text-white mb-1">Commercial Formulas Sheet</h4>
              <p className="text-[11px] text-slate-400">ROMI, CAC, CLV, Break-even, Variance formulas with derivations.</p>
            </Link>

            <Link
              href="/reference#command-verbs"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <h4 className="text-xs font-bold text-white mb-1">Command Verbs Master List</h4>
              <p className="text-[11px] text-slate-400">Analyse, Critically Evaluate, Justify, Appraise definitions.</p>
            </Link>

            <Link
              href="/reference#frameworks"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <h4 className="text-xs font-bold text-white mb-1">Strategic Frameworks Blueprint</h4>
              <p className="text-[11px] text-slate-400">SOSTAC®, SFA Matrix, TOWS Synthesis, and 5Ms Resource Audit.</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>CIM Level 6 Study Wrapper • Ofqual Regulated Specification Standard (2024 V1.1)</div>
          <div className="flex items-center gap-4">
            <Link href="/reference" className="hover:text-slate-300">Reference</Link>
            <Link href="/visual-3d" className="hover:text-slate-300">3D Labs</Link>
            <Link href="/interrupt-trainer" className="hover:text-slate-300">Interrupt Trainer</Link>
          </div>
        </div>
      </footer>

      {/* Formula Calculator Modal */}
      <FormulaCalculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

      {/* Interruption Challenge Modal */}
      {activeChallenge && (
        <InterruptionModal
          challenge={activeChallenge}
          isOpen={showInterruptModal}
          onClose={() => setShowInterruptModal(false)}
          onAnswered={() => setInterruptStats(getInterruptStats())}
        />
      )}

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
                <p className="text-xs text-slate-400">Low-cost, high-capability AI examiner & Socratic tutoring</p>
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
                <p className="text-[11px] text-slate-400 mt-1">
                  Get your key from{' '}
                  <a
                    href="https://api.together.xyz/settings/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-400 hover:underline"
                  >
                    Together AI
                  </a>
                </p>
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
