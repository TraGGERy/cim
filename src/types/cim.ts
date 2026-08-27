export type ModuleId = 'commercial-intelligence' | 'strategy-planning';

export interface ModuleInfo {
  id: ModuleId;
  title: string;
  code: string;
  credits: number;
  tqt: number; // Total Qualification Time in hours
  glh: number; // Guided Learning Hours
  assessmentType: string;
  durationMinutes: number;
  totalQuestions?: number;
  passingScore: {
    pass: number;
    merit: number;
    distinction: number;
  };
  description: string;
  learningOutcomes: LearningOutcome[];
}

export interface LearningOutcome {
  id: string; // e.g. "LO1"
  title: string;
  criteria: AssessmentCriterion[];
}

export interface AssessmentCriterion {
  id: string; // e.g. "1.1"
  description: string;
  indicativeContent: string[];
}

export interface ExamQuestion {
  id: number;
  loId: string; // e.g., "LO1"
  criterionId: string; // e.g., "1.1"
  commandVerb?: string; // e.g., "Analyse", "Determine", "Evaluate"
  scenario: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: {
    rationale: string;
    calculationSteps?: string[];
    distractorAnalysis: Record<string, string>;
    syllabusReference: string;
  };
  difficulty: 'intermediate' | 'advanced';
  isNumerical?: boolean;
}

export interface UserExamAttempt {
  id: string;
  moduleId: ModuleId;
  startTime: string;
  endTime?: string;
  timeSpentSeconds: number;
  answers: Record<number, string>; // questionId -> selectedOptionId
  flaggedQuestions: number[];
  score?: {
    totalQuestions: number;
    correctCount: number;
    percentage: number;
    grade: 'Fail' | 'Pass' | 'Merit' | 'Distinction';
    loBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  };
  completed: boolean;
}

export interface InterruptChallenge {
  id: string;
  type: 'concept-recall' | 'scenario-dilemma' | 'formula-calc' | 'command-verb';
  title: string;
  context: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  loReference: string;
  timeLimitSeconds?: number;
}

export interface CommandVerbDefinition {
  verb: string;
  definition: string;
  level6Expectation: string;
  exampleExamPrompt: string;
}

export interface LearningRecord {
  id: string;
  date: string;
  moduleId: ModuleId;
  topic: string;
  scorePercentage: number;
  strengths: string[];
  weaknesses: string[];
  recommendedAction: string;
}
