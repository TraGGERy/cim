'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap,
  Clock,
  Flame,
  Award,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Home
} from 'lucide-react';
import { InterruptChallenge } from '../../types/cim';
import { getInterruptStats, recordInterruptResult, InterruptStats } from '../../lib/storage';
import TashaAvatar from '../../components/avatars/TashaAvatar';
import ShumbaAvatar from '../../components/avatars/ShumbaAvatar';

const INTERRUPT_TRAINER_BANK: InterruptChallenge[] = [
  {
    id: 'it-1',
    type: 'scenario-dilemma',
    title: 'Adverse Cost Variance vs Favorable Volume',
    context: 'Q2 Paid Search spent £115,000 against a £100,000 budget (+£15k adverse spend), but generated 2,800 conversions vs 2,000 target (+40% volume, CAC £41.07 vs £50 target).',
    prompt: 'How must the commercial manager defend this variance during executive review?',
    options: [
      { id: 'A', text: 'Present that unit efficiency improved by 17.8% and total net profit contribution expanded, justifying a flexible budget increase.' },
      { id: 'B', text: 'Apologize for cost overruns and agree to cut Q3 budget by £15k.' },
      { id: 'C', text: 'Deny the figures and blame the ad agency bidding algorithm.' },
      { id: 'D', text: 'Convert all search campaigns to organic SEO immediately.' }
    ],
    correctAnswer: 'A',
    explanation: 'Under LO 3.2 (Variance Analysis & Flexible Budgeting), exceeding spend is commercially sound when accompanied by superior unit acquisition economics and expanded net contribution margin.',
    loReference: 'Commercial Intelligence LO 3.2 (Budget Variance Analysis)',
    timeLimitSeconds: 40
  },
  {
    id: 'it-2',
    type: 'formula-calc',
    title: 'Quick CLV vs CAC Multiplier Check',
    context: 'A digital service has CAC = £40. Monthly subscription fee is £30 with 70% gross margin. Monthly churn rate is 5%.',
    prompt: 'What is the LTV:CAC ratio, and does it meet the commercial viability threshold?',
    options: [
      { id: 'A', text: 'CLV is £420, giving a 10.5 : 1 ratio (Exceeds 3:1 healthy benchmark).' },
      { id: 'B', text: 'CLV is £120, giving a 3 : 1 ratio (Marginal).' },
      { id: 'C', text: 'CLV is £600, giving a 15 : 1 ratio.' },
      { id: 'D', text: 'CLV is £40, giving a 1 : 1 break-even ratio.' }
    ],
    correctAnswer: 'A',
    explanation: 'Average lifespan = 1 / 0.05 = 20 months. Monthly margin = £30 × 70% = £21. CLV = £21 × 20 = £420. Ratio = £420 / £40 = 10.5:1, which is outstanding commercial health.',
    loReference: 'Commercial Intelligence LO 1.1 & LO 2.1 (CLV, Margin & CAC)',
    timeLimitSeconds: 45
  },
  {
    id: 'it-3',
    type: 'concept-recall',
    title: 'Attribution Model Selection Dilemma',
    context: 'A B2B enterprise with an 8-month sales cycle is currently utilizing Last-Touch attribution, causing management to consider defunding content marketing whitepapers.',
    prompt: 'What structural flaw in Last-Touch attribution must be highlighted under LO 3.3?',
    options: [
      { id: 'A', text: 'It completely ignores the critical top/mid-funnel nurturing assets that generated buyer intent and pipeline velocity.' },
      { id: 'B', text: 'It double-counts initial organic social impressions.' },
      { id: 'C', text: 'It requires double the computational processing bandwidth.' },
      { id: 'D', text: 'It violates GDPR privacy compliance rules.' }
    ],
    correctAnswer: 'A',
    explanation: 'Last-touch attribution misallocates budget by over-rewarding direct navigation and closing mechanisms while defunding the exploratory content that generated the opportunity.',
    loReference: 'Commercial Intelligence LO 3.3 (Attribution & Expenditure Prioritisation)',
    timeLimitSeconds: 35
  },
  {
    id: 'it-4',
    type: 'scenario-dilemma',
    title: '5Ms Bottleneck Identification',
    context: 'A marketing audit reveals £500k budget ("Money") and state-of-the-art tools ("Materials"), but product launch is delayed 4 months because only 1 staff member understands predictive data modeling.',
    prompt: 'Which element of the 5Ms framework represents the primary operational bottleneck?',
    options: [
      { id: 'A', text: 'Men (Human Skills & Capacity Deficit)' },
      { id: 'B', text: 'Money (Budget Deficit)' },
      { id: 'C', text: 'Measurements (Lack of KPIs)' },
      { id: 'D', text: 'Materials (Insufficient Software)' }
    ],
    correctAnswer: 'A',
    explanation: 'The bottleneck is clearly human talent and analytical skills ("Men"), requiring recruitment, upskilling, or specialized contractor support.',
    loReference: 'Commercial Intelligence LO 2.1 (5Ms Resource Management)',
    timeLimitSeconds: 30
  },
  {
    id: 'it-5',
    type: 'scenario-dilemma',
    title: 'Nyika.app SFA Option Appraisal Dilemma',
    context: 'Nyika is choosing between expanding 4-wheel passenger taxis in Johannesburg vs launching B2B Heavy Cargo parcel delivery in Harare and Lusaka. Parcel delivery offers 32% margin vs 14% on passenger rides.',
    prompt: 'Under Johnson, Scholes & Whittington’s SFA framework, which strategy is justified on "Feasibility" and "Acceptability"?',
    options: [
      { id: 'A', text: 'B2B Cargo Delivery: leverages existing 2-wheeler tech fleet (High Feasibility) and delivers 32% gross margins with predictable B2B cash flows (High Acceptability).' },
      { id: 'B', text: '4-Wheel Passenger Taxis in SA: High capital cost and direct price war with Uber/Bolt.' },
      { id: 'C', text: 'Shutting down operations in Lusaka to fund billboard advertising.' },
      { id: 'D', text: 'Switching all payments from EcoCash to 90-day post-dated cheques.' }
    ],
    correctAnswer: 'A',
    explanation: 'B2B Heavy Cargo fits SFA criteria: it utilizes existing core assets and driver routing (Feasibility) and provides superior returns and margins (Acceptability).',
    loReference: 'Strategy & Planning LO 3.1 & LO 3.2 (SFA Framework & Ansoff)',
    timeLimitSeconds: 40
  },
  {
    id: 'it-6',
    type: 'scenario-dilemma',
    title: 'Zero-Based Budgeting (ZBB) Implementation',
    context: 'Under a new commercial director, all marketing managers must justify every pound of expenditure starting from zero rather than taking last year’s spend + 5%.',
    prompt: 'What is the principal strategic advantage of Zero-Based Budgeting under CIM LO 3.1?',
    options: [
      { id: 'A', text: 'It eliminates historical budget inertia and forces explicit commercial justification tied directly to expected ROMI.' },
      { id: 'B', text: 'It guarantees an automatic 20% budget increase for digital channels.' },
      { id: 'C', text: 'It requires zero administrative time or financial modeling.' },
      { id: 'D', text: 'It fixes ad spend as an unchanging percentage of revenue.' }
    ],
    correctAnswer: 'A',
    explanation: 'Zero-Based Budgeting stops legacy complacency by requiring every operational activity to prove its commercial value and ROMI contribution from scratch.',
    loReference: 'Commercial Intelligence LO 3.1 (Forecasting & Strategic Budgeting)',
    timeLimitSeconds: 35
  },
  {
    id: 'it-7',
    type: 'concept-recall',
    title: 'Mendelow Matrix Stakeholder Strategy',
    context: 'Municipal transport regulators in Harare have High Power over motorcycle taxi permits and lane access bylaws, but currently moderate/low direct interest in commercial apps.',
    prompt: 'According to Mendelow’s Matrix, what is the mandatory engagement posture for this stakeholder group?',
    options: [
      { id: 'A', text: 'Keep Satisfied (High Power / Low Interest): proactively brief on safety standards and compliance before issues arise.' },
      { id: 'B', text: 'Key Player / Manage Closely (High Power / High Interest).' },
      { id: 'C', text: 'Minimal Effort (Low Power / Low Interest).' },
      { id: 'D', text: 'Keep Informed (Low Power / High Interest).' }
    ],
    correctAnswer: 'A',
    explanation: 'High Power / Low Interest stakeholders must be "Kept Satisfied" so they do not abruptly exercise their veto power to the detriment of the business.',
    loReference: 'Strategy & Planning LO 2.3 (Stakeholder Audit & Mendelow)',
    timeLimitSeconds: 35
  },
  {
    id: 'it-8',
    type: 'scenario-dilemma',
    title: 'PDCA Governance & Strategic Drift Check',
    context: 'Nyika’s monthly take-rate in Harare dipped from 12% to 8% because drivers are switching to unmetered cash rides outside the app during peak hours.',
    prompt: 'Under the "Act" phase of the PDCA cycle, what immediate operational control must be deployed?',
    options: [
      { id: 'A', text: 'Introduce dynamic in-app driver milestone bonuses and instant mobile money cashbacks to enforce transaction tracking on-platform.' },
      { id: 'B', text: 'Wait 12 months for annual review before examining the data.' },
      { id: 'C', text: 'Delete the mobile money payment gateway.' },
      { id: 'D', text: 'Fire all marketing staff in Zimbabwe.' }
    ],
    correctAnswer: 'A',
    explanation: 'In the Act phase of PDCA, agile corrective actions align incentives (bonuses, automated mobile money escrow) to fix operational leaks and maintain governance.',
    loReference: 'Strategy & Planning LO 6.1 (PDCA Control & Governance)',
    timeLimitSeconds: 40
  }
];

export default function InterruptTrainerPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const [stats, setStats] = useState<InterruptStats>({
    totalFired: 0,
    totalAnswered: 0,
    totalCorrect: 0,
    streak: 0,
    lastInterceptTime: 0
  });

  useEffect(() => {
    setStats(getInterruptStats());
  }, []);

  const currentChallenge = INTERRUPT_TRAINER_BANK[currentIndex % INTERRUPT_TRAINER_BANK.length];

  const handleAnswer = useCallback((optionId: string) => {
    setSelectedOption(optionId);
    setIsAnswered(true);
    const correct = optionId === currentChallenge.correctAnswer;
    const updated = recordInterruptResult(correct);
    setStats(updated);
  }, [currentChallenge]);

  useEffect(() => {
    if (isAnswered) return;
    setTimeLeft(currentChallenge.timeLimitSeconds || 40);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!isAnswered) {
            handleAnswer('');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, currentChallenge, handleAnswer]);

  const handleNextChallenge = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const isCorrect = selectedOption === currentChallenge.correctAnswer;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
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
                Interruptive Active-Recall Arena
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                Socratic Pedagogy
              </span>
            </div>
            <p className="text-[10px] text-slate-400">High-Retention Rapid Interceptions & Dilemma Drills</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{stats.streak} Streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>{stats.totalCorrect} / {stats.totalAnswered} Correct</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
            <TashaAvatar size="xs" showOnline={false} />
            <span className="text-xs font-bold text-white">Tasha Aka</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center">
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Challenge Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Zap className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  Scenario Intercept #{(currentIndex % INTERRUPT_TRAINER_BANK.length) + 1} of {INTERRUPT_TRAINER_BANK.length}
                </span>
                <span className="text-[11px] text-slate-400">{currentChallenge.loReference}</span>
              </div>
            </div>

            {!isAnswered && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-amber-400">
                <Clock className="w-4 h-4" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>

          {/* Scenario Context */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white">{currentChallenge.title}</h2>
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-400">Operational Scenario:</strong> {currentChallenge.context}
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 pt-1">{currentChallenge.prompt}</p>
          </div>

          {/* Options Grid */}
          {!isAnswered ? (
            <div className="space-y-3 pt-2">
              {currentChallenge.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  className="w-full text-left p-4 rounded-2xl bg-slate-950/60 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/60 text-xs sm:text-sm text-slate-200 transition-all flex items-center gap-3.5 group cursor-pointer"
                >
                  <span className="w-7 h-7 rounded-xl bg-slate-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors">
                    {opt.id}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </button>
              ))}
            </div>
          ) : (
            /* Feedback Card */
            <div
              className={`rounded-2xl p-6 border shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200 ${
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
                    <span className="text-[11px] font-mono text-slate-400">{currentChallenge.loReference}</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-xl border uppercase tracking-wider ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  {isCorrect ? '+10 XP' : 'Gap Review'}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed">
                <div className="font-semibold text-blue-400 mb-1">CIM Examiner Derivation & Rationale:</div>
                <p className="text-slate-300">{currentChallenge.explanation}</p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextChallenge}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Next Socratic Dilemma</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
