import { getSavedTogetherApiKey, getSavedTogetherModel } from './storage';
import { InterruptChallenge } from '../types/cim';

export const DEFAULT_TOGETHER_MODEL = 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
export const FAST_TOGETHER_MODEL = 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo';

export const TOGETHER_MODELS = [
  {
    id: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
    name: 'Llama 3.3 70B Turbo',
    description: 'High-capability reasoning for CIM Level 6 Examiner grading (~$0.88/1M tokens)'
  },
  {
    id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
    name: 'Llama 3.1 8B Turbo (Ultra Fast & Low Cost)',
    description: 'Instant response times for rapid Socratic intercepts (~$0.18/1M tokens)'
  },
  {
    id: 'Qwen/Qwen2.5-72B-Instruct-Turbo',
    name: 'Qwen 2.5 72B Turbo',
    description: 'Exceptional mathematical and analytical reasoning (~$1.20/1M tokens)'
  },
  {
    id: 'mistralai/Mistral-Small-24B-Instruct-2501',
    name: 'Mistral Small 24B',
    description: 'Balanced performance and low latency (~$0.30/1M tokens)'
  }
];

// In-memory cache to prevent redundant token consumption
const togetherResponseCache = new Map<string, unknown>();

function getCacheKey(prefix: string, payload: string): string {
  return `${prefix}:${payload.trim().replace(/\s+/g, ' ').slice(0, 300)}`;
}

export async function callTogetherChat(params: {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
}): Promise<string> {
  const key = params.apiKey || getSavedTogetherApiKey();
  const model = params.model || getSavedTogetherModel() || DEFAULT_TOGETHER_MODEL;

  if (!key) {
    throw new Error('Together AI API Key not found. Please set your key in Settings.');
  }

  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key.trim()}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt }
      ],
      temperature: params.temperature ?? 0.2,
      max_tokens: params.maxTokens || 600 // Constrained max tokens for budget efficiency
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Together AI Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function gradeStrategyResponseTogether(params: {
  caseTitle: string;
  taskPrompt: string;
  commandVerb: string;
  userResponse: string;
  marks: number;
  apiKey?: string;
  model?: string;
}): Promise<{
  marksAwarded: number;
  grade: 'Distinction' | 'Merit' | 'Pass' | 'Fail';
  examinerFeedback: string;
  commandVerbCompliance: string;
  strengths: string[];
  areasForImprovement: string[];
}> {
  const cleanResponse = params.userResponse.trim();
  const words = cleanResponse.split(/\s+/).filter(Boolean).length;

  if (words < 10) {
    return {
      marksAwarded: 0,
      grade: 'Fail',
      examinerFeedback: 'Response is too short to evaluate. Please draft a structured answer containing case data and strategic frameworks.',
      commandVerbCompliance: `Failed '${params.commandVerb}' requirement due to insufficient length.`,
      strengths: [],
      areasForImprovement: ['Provide substantive analysis with specific references to Nyika.app']
    };
  }

  const cacheKey = getCacheKey('tg-grade', `${params.taskPrompt}:${cleanResponse}`);
  if (togetherResponseCache.has(cacheKey)) {
    return togetherResponseCache.get(cacheKey) as {
      marksAwarded: number;
      grade: 'Distinction' | 'Merit' | 'Pass' | 'Fail';
      examinerFeedback: string;
      commandVerbCompliance: string;
      strengths: string[];
      areasForImprovement: string[];
    };
  }

  const key = params.apiKey || getSavedTogetherApiKey();

  if (!key) {
    const marksAwarded = Math.min(params.marks, Math.max(6, Math.round((words / 250) * params.marks)));
    const percentage = (marksAwarded / params.marks) * 100;
    return {
      marksAwarded,
      grade: percentage >= 80 ? 'Distinction' : percentage >= 70 ? 'Merit' : percentage >= 60 ? 'Pass' : 'Fail',
      examinerFeedback: 'Together AI Key not configured. Standard word count assessment applied. Connect your Together AI key in Settings for full review.',
      commandVerbCompliance: `Assessed against Level 6 command verb '${params.commandVerb}'.`,
      strengths: ['Addressed the case study requirements'],
      areasForImprovement: ['Deepen quantitative ROMI calculations and SFA matrix criteria']
    };
  }

  const systemPrompt = `You are a CIM Level 6 Chief Examiner. Grade candidate response against 2024 V1.1 standards (Distinction 80%+, Merit 70-79%, Pass 60-69%, Fail <60%). Check command verb compliance and framework rigor. Return concise JSON only:
{"marksAwarded": number (0-${params.marks}), "grade": "Distinction"|"Merit"|"Pass"|"Fail", "examinerFeedback": "1-2 evaluative sentences", "commandVerbCompliance": "1 sentence assessing '${params.commandVerb}'", "strengths": ["string", "string"], "areasForImprovement": ["string", "string"]}`;

  const truncatedResponse = cleanResponse.split(/\s+/).slice(0, 1200).join(' ');

  const userPrompt = `Case: ${params.caseTitle}
Task (${params.marks} Marks, Verb: ${params.commandVerb}): ${params.taskPrompt}
Response:
"""
${truncatedResponse}
"""`;

  try {
    const rawOutput = await callTogetherChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || getSavedTogetherModel() || DEFAULT_TOGETHER_MODEL,
      temperature: 0.2,
      maxTokens: 550
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    togetherResponseCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    console.error('Together AI grading error:', error);
    return {
      marksAwarded: Math.round(params.marks * 0.65),
      grade: 'Pass',
      examinerFeedback: `Completed review with fallback scoring: ${(error as Error).message}.`,
      commandVerbCompliance: `Ensure complete satisfaction of Level 6 '${params.commandVerb}' requirements.`,
      strengths: ['Addressed the main scenario prompt'],
      areasForImprovement: ['Expand on quantitative metrics and strategic frameworks']
    };
  }
}

export async function generateAdaptiveInterruptTogether(params: {
  topic: string;
  learningOutcome: string;
  apiKey?: string;
  model?: string;
}): Promise<InterruptChallenge | null> {
  const key = params.apiKey || getSavedTogetherApiKey();
  if (!key) return null;

  const cacheKey = getCacheKey('tg-interrupt', `${params.topic}:${params.learningOutcome}`);
  if (togetherResponseCache.has(cacheKey)) {
    return togetherResponseCache.get(cacheKey) as InterruptChallenge;
  }

  const systemPrompt = `CIM Level 6 Examiner. Generate rapid scenario micro-challenge in JSON only:
{"id": "ch-${Date.now()}", "type": "scenario-dilemma", "title": "Brief title", "context": "1-2 sentence scenario", "prompt": "Question", "options": [{"id":"A","text":"opt"},{"id":"B","text":"opt"},{"id":"C","text":"opt"},{"id":"D","text":"opt"}], "correctAnswer": "A", "explanation": "Brief rationale", "loReference": "${params.learningOutcome}", "timeLimitSeconds": 40}`;

  const userPrompt = `Topic: ${params.topic}`;

  try {
    const rawOutput = await callTogetherChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || FAST_TOGETHER_MODEL,
      temperature: 0.3,
      maxTokens: 300
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    togetherResponseCache.set(cacheKey, parsed);
    return parsed;
  } catch {
    return null;
  }
}
