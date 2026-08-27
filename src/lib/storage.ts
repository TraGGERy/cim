import { UserExamAttempt, LearningRecord } from '../types/cim';

const EXAM_ATTEMPTS_KEY = 'cim_exam_attempts_v2';
const LEARNING_RECORDS_KEY = 'cim_learning_records_v2';
const TOGETHER_API_KEY_STORAGE = 'cim_together_api_key';
const TOGETHER_MODEL_STORAGE = 'cim_together_model';
const INTERRUPT_STATS_KEY = 'cim_interrupt_stats_v2';

export interface InterruptStats {
  totalFired: number;
  totalAnswered: number;
  totalCorrect: number;
  streak: number;
  lastInterceptTime: number;
}

export function getSavedTogetherApiKey(): string {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_TOGETHER_API_KEY || 'tgp_v1_vmy0anP-I6uy5SD0QOkGWVzwhtqDdiLT8Dc6yyigadQ';
  }
  return (
    localStorage.getItem(TOGETHER_API_KEY_STORAGE) ||
    process.env.NEXT_PUBLIC_TOGETHER_API_KEY ||
    'tgp_v1_vmy0anP-I6uy5SD0QOkGWVzwhtqDdiLT8Dc6yyigadQ'
  );
}

export function saveTogetherApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOGETHER_API_KEY_STORAGE, key.trim());
}

export function getSavedTogetherModel(): string {
  if (typeof window === 'undefined') return 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
  return (
    localStorage.getItem(TOGETHER_MODEL_STORAGE) ||
    'meta-llama/Llama-3.3-70B-Instruct-Turbo'
  );
}

export function saveTogetherModel(model: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOGETHER_MODEL_STORAGE, model.trim());
}

// Retain legacy helpers for compatibility
export function getSavedApiKey(): string {
  return getSavedTogetherApiKey();
}

export function saveApiKey(key: string): void {
  saveTogetherApiKey(key);
}

export function getExamAttempts(): UserExamAttempt[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(EXAM_ATTEMPTS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveExamAttempt(attempt: UserExamAttempt): void {
  if (typeof window === 'undefined') return;
  const attempts = getExamAttempts();
  const existingIndex = attempts.findIndex(a => a.id === attempt.id);
  if (existingIndex >= 0) {
    attempts[existingIndex] = attempt;
  } else {
    attempts.unshift(attempt);
  }
  localStorage.setItem(EXAM_ATTEMPTS_KEY, JSON.stringify(attempts));
}

export function getLearningRecords(): LearningRecord[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(LEARNING_RECORDS_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveLearningRecord(record: LearningRecord): void {
  if (typeof window === 'undefined') return;
  const records = getLearningRecords();
  records.unshift(record);
  localStorage.setItem(LEARNING_RECORDS_KEY, JSON.stringify(records));
}

export function getInterruptStats(): InterruptStats {
  if (typeof window === 'undefined') {
    return { totalFired: 0, totalAnswered: 0, totalCorrect: 0, streak: 0, lastInterceptTime: 0 };
  }
  const data = localStorage.getItem(INTERRUPT_STATS_KEY);
  if (!data) {
    return { totalFired: 0, totalAnswered: 0, totalCorrect: 0, streak: 0, lastInterceptTime: 0 };
  }
  try {
    return JSON.parse(data);
  } catch {
    return { totalFired: 0, totalAnswered: 0, totalCorrect: 0, streak: 0, lastInterceptTime: 0 };
  }
}

export function recordInterruptResult(isCorrect: boolean): InterruptStats {
  const stats = getInterruptStats();
  stats.totalFired += 1;
  stats.totalAnswered += 1;
  if (isCorrect) {
    stats.totalCorrect += 1;
    stats.streak += 1;
  } else {
    stats.streak = 0;
  }
  stats.lastInterceptTime = Date.now();
  if (typeof window !== 'undefined') {
    localStorage.setItem(INTERRUPT_STATS_KEY, JSON.stringify(stats));
  }
  return stats;
}
