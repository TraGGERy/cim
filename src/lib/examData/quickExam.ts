import { ExamQuestion } from '../../types/cim';
import { getCommercialIntelligenceExamQuestions } from './commercialIntelligence';
import { STRATEGY_PLANNING_MCQ_QUESTIONS } from './strategyPlanning';

export type QuickExamScope = 'all' | 'commercial-intelligence' | 'strategy-planning';

export interface QuickExamConfig {
  questionCount: number;
  scope: QuickExamScope;
  loFilter?: string; // 'all' or specific like 'LO1', 'LO2', etc.
  timed: boolean;
  durationMinutes: number; // calculated at 2 mins per question by default
  shuffle: boolean;
}

export const QUICK_EXAM_PRESETS = [
  {
    count: 5,
    label: '5 Questions',
    subtitle: 'Speed Sprint',
    durationMinutes: 10,
    description: 'Perfect for a rapid 10-minute active recall drill or commute practice.'
  },
  {
    count: 10,
    label: '10 Questions',
    subtitle: 'Quick Drill',
    durationMinutes: 20,
    description: 'Balanced 20-minute checkpoint covering core financial formulas & strategic matrices.'
  },
  {
    count: 15,
    label: '15 Questions',
    subtitle: 'Standard Test',
    durationMinutes: 30,
    description: 'Focused 30-minute mini-mock assessment with detailed examiner feedback.'
  },
  {
    count: 20,
    label: '20 Questions',
    subtitle: 'Half Mock',
    durationMinutes: 40,
    description: 'In-depth 40-minute simulation across all Learning Outcomes.'
  },
  {
    count: 25,
    label: '25 Questions',
    subtitle: 'Power Test',
    durationMinutes: 50,
    description: 'High-intensity assessment testing analytical stamina and calculation speed.'
  }
];

// Helper to shuffle an array deterministically or randomly
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns a balanced, randomized subset of questions based on user-chosen count, scope, and filters.
 */
export function getQuickExamQuestions(config: Partial<QuickExamConfig> = {}): ExamQuestion[] {
  const count = config.questionCount || 10;
  const scope = config.scope || 'all';
  const loFilter = config.loFilter || 'all';
  const shouldShuffle = config.shuffle !== false;

  const ciQuestions = getCommercialIntelligenceExamQuestions();
  const spQuestions = STRATEGY_PLANNING_MCQ_QUESTIONS;

  let pool: ExamQuestion[] = [];
  if (scope === 'commercial-intelligence') {
    pool = [...ciQuestions];
  } else if (scope === 'strategy-planning') {
    pool = [...spQuestions];
  } else {
    // 'all' - combine both pools (81 questions total)
    pool = [...ciQuestions, ...spQuestions];
  }

  // Filter by LO if specified
  if (loFilter && loFilter !== 'all') {
    const filtered = pool.filter((q) => q.loId === loFilter);
    if (filtered.length > 0) {
      pool = filtered;
    }
  }

  // If specific LO filter was not active, ensure balanced representation across available LOs
  if (loFilter === 'all') {
    // Group by LO
    const byLo: Record<string, ExamQuestion[]> = {};
    pool.forEach((q) => {
      const lo = q.loId || 'LO1';
      if (!byLo[lo]) byLo[lo] = [];
      byLo[lo].push(q);
    });

    const loKeys = Object.keys(byLo);
    if (shouldShuffle) {
      loKeys.forEach((key) => {
        byLo[key] = shuffleArray(byLo[key]);
      });
    }

    const selected: ExamQuestion[] = [];
    const targetPerLo = Math.max(1, Math.floor(count / loKeys.length));
    
    // First pass: pull proportional count from each LO
    loKeys.forEach((key) => {
      const take = byLo[key].splice(0, targetPerLo);
      selected.push(...take);
    });

    // Second pass: fill remainder up to requested count
    if (selected.length < count) {
      const remainingPool = Object.values(byLo).flat();
      const shuffledRemainder = shouldShuffle ? shuffleArray(remainingPool) : remainingPool;
      const needed = count - selected.length;
      selected.push(...shuffledRemainder.slice(0, needed));
    }

    const finalQuestions = selected.slice(0, count);
    return shouldShuffle ? shuffleArray(finalQuestions) : finalQuestions;
  }

  // If specific LO was filtered
  const finalPool = shouldShuffle ? shuffleArray(pool) : pool;
  return finalPool.slice(0, count);
}
