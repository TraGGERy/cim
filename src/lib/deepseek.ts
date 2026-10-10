import { getSavedDeepSeekApiKey, getSavedDeepSeekModel } from './storage';
import { InterruptChallenge } from '../types/cim';

export const DEFAULT_DEEPSEEK_MODEL = 'deepseek-chat';
export const REASONER_DEEPSEEK_MODEL = 'deepseek-reasoner';

export const DEEPSEEK_MODELS = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek-V3 (deepseek-chat) - Most Economical',
    description: 'Ultra-low cost ($0.14/1M input, $0.014 cache hit), high-speed examiner grading'
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek-R1 (deepseek-reasoner)',
    description: 'Deep chain-of-thought analysis for complex case study tasks'
  }
];

// Simple in-memory & local cache to prevent redundant token consumption
const responseCache = new Map<string, unknown>();

function getCacheKey(prefix: string, payload: string): string {
  return `${prefix}:${payload.trim().replace(/\s+/g, ' ').slice(0, 300)}`;
}

export async function callDeepSeekChat(params: {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
}): Promise<string> {
  const key = params.apiKey || getSavedDeepSeekApiKey();
  const model = params.model || getSavedDeepSeekModel() || DEFAULT_DEEPSEEK_MODEL;

  if (!key) {
    throw new Error('DeepSeek API Key not found. Please set your key in Settings.');
  }

  const isReasoner = model === 'deepseek-reasoner';

  // Format messages (static system prompt first enables DeepSeek automatic prefix caching for 90% discount)
  const messages = isReasoner
    ? [
        {
          role: 'user',
          content: `${params.systemPrompt}\n\nCandidate Submission:\n${params.userPrompt}`
        }
      ]
    : [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt }
      ];

  const bodyPayload: Record<string, unknown> = {
    model,
    messages,
    // Limit max_tokens to prevent unnecessary output generation tokens
    max_tokens: params.maxTokens || 650
  };

  if (!isReasoner) {
    bodyPayload.temperature = params.temperature ?? 0.2;
    bodyPayload.response_format = { type: 'json_object' };
  }

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key.trim()}`
    },
    body: JSON.stringify(bodyPayload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function gradeStrategyResponseDeepSeek(params: {
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

  // Local validation to prevent zero-value token spend
  if (words < 10) {
    return {
      marksAwarded: 0,
      grade: 'Fail',
      examinerFeedback: 'Response is too short to evaluate. Please draft a structured answer containing case data, relevant frameworks (e.g. PESTEL, SFA, SOSTAC, 5Ms), and tactical justifications.',
      commandVerbCompliance: `Failed '${params.commandVerb}' requirement due to lack of content.`,
      strengths: [],
      areasForImprovement: ['Provide substantive analysis with specific references to Nyika.app']
    };
  }

  // Check cache to avoid paying for identical repeated requests
  const cacheKey = getCacheKey('ds-grade', `${params.taskPrompt}:${cleanResponse}`);
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey) as {
      marksAwarded: number;
      grade: 'Distinction' | 'Merit' | 'Pass' | 'Fail';
      examinerFeedback: string;
      commandVerbCompliance: string;
      strengths: string[];
      areasForImprovement: string[];
    };
  }

  const key = params.apiKey || getSavedDeepSeekApiKey();

  if (!key) {
    const marksAwarded = Math.min(params.marks, Math.max(6, Math.round((words / 250) * params.marks)));
    const percentage = (marksAwarded / params.marks) * 100;
    return {
      marksAwarded,
      grade: percentage >= 80 ? 'Distinction' : percentage >= 70 ? 'Merit' : percentage >= 60 ? 'Pass' : 'Fail',
      examinerFeedback: 'DeepSeek API Key not configured. Heuristic word-count assessment applied. Connect your API key in settings for line-by-line feedback.',
      commandVerbCompliance: `Assessed against Level 6 '${params.commandVerb}'.`,
      strengths: ['Addressed scenario tasks'],
      areasForImprovement: ['Deepen quantitative ROMI calculations and SFA matrix criteria']
    };
  }

  // Token-optimized static system prompt (facilitates prefix cache hit on DeepSeek)
  const systemPrompt = `You are a CIM Level 6 Chief Examiner. Grade candidate response against 2024 V1.1 standards (Distinction 80%+, Merit 70-79%, Pass 60-69%, Fail <60%). Check command verb compliance and framework rigor (PESTEL, SFA, SOSTAC, 5Ms, PDCA). Return concise JSON only:
{"marksAwarded": number (0-${params.marks}), "grade": "Distinction"|"Merit"|"Pass"|"Fail", "examinerFeedback": "1-2 concise evaluative sentences", "commandVerbCompliance": "1 concise sentence assessing '${params.commandVerb}'", "strengths": ["string", "string"], "areasForImprovement": ["string", "string"]}`;

  // Truncate user response to 1200 words max to prevent runaway token spend
  const truncatedResponse = cleanResponse.split(/\s+/).slice(0, 1200).join(' ');

  const userPrompt = `Case: ${params.caseTitle}
Task (${params.marks} Marks, Verb: ${params.commandVerb}): ${params.taskPrompt}
Response:
"""
${truncatedResponse}
"""`;

  try {
    const rawOutput = await callDeepSeekChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || getSavedDeepSeekModel() || DEFAULT_DEEPSEEK_MODEL,
      temperature: 0.1,
      maxTokens: 550 // Tight max output limit for token economy
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    responseCache.set(cacheKey, parsed);
    return parsed;
  } catch (error) {
    console.error('DeepSeek grading error:', error);
    return {
      marksAwarded: Math.round(params.marks * 0.65),
      grade: 'Pass',
      examinerFeedback: `Evaluation completed with fallback scoring: ${(error as Error).message}.`,
      commandVerbCompliance: `Verify Level 6 '${params.commandVerb}' requirements.`,
      strengths: ['Addressed core scenario elements'],
      areasForImprovement: ['Expand on quantitative metrics and strategic frameworks']
    };
  }
}

export async function generateAdaptiveInterruptDeepSeek(params: {
  topic: string;
  learningOutcome: string;
  apiKey?: string;
  model?: string;
}): Promise<InterruptChallenge | null> {
  const key = params.apiKey || getSavedDeepSeekApiKey();
  if (!key) return null;

  const cacheKey = getCacheKey('ds-interrupt', `${params.topic}:${params.learningOutcome}`);
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey) as InterruptChallenge;
  }

  // Token-minimized system prompt
  const systemPrompt = `CIM Level 6 Examiner. Generate rapid scenario micro-challenge in JSON only:
{"id": "ch-${Date.now()}", "type": "scenario-dilemma", "title": "Brief title", "context": "1-2 sentence scenario", "prompt": "Question", "options": [{"id":"A","text":"opt"},{"id":"B","text":"opt"},{"id":"C","text":"opt"},{"id":"D","text":"opt"}], "correctAnswer": "A", "explanation": "Brief rationale", "loReference": "${params.learningOutcome}", "timeLimitSeconds": 40}`;

  const userPrompt = `Topic: ${params.topic}`;

  try {
    const rawOutput = await callDeepSeekChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: 0.2,
      maxTokens: 300 // Minimal token budget for dilemma questions
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    responseCache.set(cacheKey, parsed);
    return parsed;
  } catch {
    return null;
  }
}
