import { getSavedDeepSeekApiKey, getSavedDeepSeekModel } from './storage';
import { InterruptChallenge } from '../types/cim';

export const DEFAULT_DEEPSEEK_MODEL = 'deepseek-chat';
export const REASONER_DEEPSEEK_MODEL = 'deepseek-reasoner';

export const DEEPSEEK_MODELS = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek-V3 (deepseek-chat)',
    description: 'High-speed, top-tier intelligence for CIM examiner grading & active recall (~$0.14/1M input)'
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek-R1 (deepseek-reasoner)',
    description: 'Deep chain-of-thought reasoning & analytical mark breakdown (~$0.55/1M input)'
  }
];

export async function callDeepSeekChat(params: {
  systemPrompt: string;
  userPrompt: string;
  model?: string;
  temperature?: number;
  apiKey?: string;
}): Promise<string> {
  const key = params.apiKey || getSavedDeepSeekApiKey();
  const model = params.model || getSavedDeepSeekModel() || DEFAULT_DEEPSEEK_MODEL;

  if (!key) {
    throw new Error('DeepSeek API Key not found. Please set your key in Settings.');
  }

  const isReasoner = model === 'deepseek-reasoner';

  // deepseek-reasoner doesn't accept custom temperature or system role in some contexts, so format appropriately
  const messages = isReasoner
    ? [
        {
          role: 'user',
          content: `${params.systemPrompt}\n\nCandidate Submission & Request:\n${params.userPrompt}`
        }
      ]
    : [
        { role: 'system', content: params.systemPrompt },
        { role: 'user', content: params.userPrompt }
      ];

  const bodyPayload: Record<string, unknown> = {
    model,
    messages,
    max_tokens: 2048
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
  const key = params.apiKey || getSavedDeepSeekApiKey();

  if (!key) {
    const words = params.userResponse.trim().split(/\s+/).length;
    const marksAwarded = Math.min(params.marks, Math.max(6, Math.round((words / 250) * params.marks)));
    const percentage = (marksAwarded / params.marks) * 100;
    return {
      marksAwarded,
      grade: percentage >= 80 ? 'Distinction' : percentage >= 70 ? 'Merit' : percentage >= 60 ? 'Pass' : 'Fail',
      examinerFeedback: 'DeepSeek API Key not configured. Standard heuristic word count applied. Connect your DeepSeek API Key for line-by-line examiner commentary.',
      commandVerbCompliance: `Assessed against Level 6 command verb '${params.commandVerb}'. Ensure deep justification, data backing, and balanced critique.`,
      strengths: ['Addressed the case study requirements', 'Applied structured business headings'],
      areasForImprovement: ['Deepen quantitative ROMI calculations', 'Include explicit SFA matrix criteria and risk mitigations']
    };
  }

  const systemPrompt = `You are a Senior Chief Examiner for the Chartered Institute of Marketing (CIM) evaluating a Level 6 Award in Strategy and Planning candidate.
Grade with strict academic and commercial rigor according to the official CIM Level 6 2024 V1.1 standards.
Grading boundaries: Distinction (80%+), Merit (70-79%), Pass (60-69%), Fail (0-59%).
Check specifically:
1. Command Verb Precision: Did the candidate actively '${params.commandVerb}' (e.g. critical evaluation/justification vs mere descriptive recall)?
2. Framework Rigor: Correct application of SOSTAC, 7Ps, SFA, TOWS, 5Ms, PDCA with specific contextual numbers from the case study.
3. Commercial & Financial Feasibility: ROMI, CAC, cash flow, risk assessment.

You MUST reply ONLY in valid raw JSON with this exact schema:
{
  "marksAwarded": number (0 to ${params.marks}),
  "grade": "Distinction" | "Merit" | "Pass" | "Fail",
  "examinerFeedback": "Detailed paragraph explaining the rationale for the marks awarded",
  "commandVerbCompliance": "Critique on how well the candidate fulfilled the '${params.commandVerb}' command verb expectation",
  "strengths": ["string", "string"],
  "areasForImprovement": ["string", "string"]
}`;

  const userPrompt = `Case Study: ${params.caseTitle}
Task Prompt: ${params.taskPrompt}
Target Command Verb: ${params.commandVerb}
Total Marks Available: ${params.marks}

Candidate Response:
"""
${params.userResponse}
"""`;

  try {
    const rawOutput = await callDeepSeekChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || getSavedDeepSeekModel() || DEFAULT_DEEPSEEK_MODEL,
      temperature: 0.2
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('DeepSeek grading error:', error);
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

export async function generateAdaptiveInterruptDeepSeek(params: {
  topic: string;
  learningOutcome: string;
  apiKey?: string;
  model?: string;
}): Promise<InterruptChallenge | null> {
  const key = params.apiKey || getSavedDeepSeekApiKey();
  if (!key) return null;

  const systemPrompt = `You are a CIM Level 6 Senior Examiner creating an interruptive Socratic micro-challenge.
Create a rapid, realistic practitioner dilemma that tests active recall and diagnostic decision-making.
Reply ONLY with valid raw JSON:
{
  "id": "challenge-${Date.now()}",
  "type": "scenario-dilemma",
  "title": "Short punchy dilemma title",
  "context": "1-2 sentences real-world scenario with concrete metrics",
  "prompt": "Direct question asking the candidate to choose the right strategic/commercial action",
  "options": [
    {"id": "A", "text": "Option A"},
    {"id": "B", "text": "Option B"},
    {"id": "C", "text": "Option C"},
    {"id": "D", "text": "Option D"}
  ],
  "correctAnswer": "A",
  "explanation": "Clear, concise rationale referencing the CIM Learning Outcome",
  "loReference": "${params.learningOutcome}",
  "timeLimitSeconds": 40
}`;

  const userPrompt = `Generate a challenge for Topic: ${params.topic}, Learning Outcome: ${params.learningOutcome}`;

  try {
    const rawOutput = await callDeepSeekChat({
      systemPrompt,
      userPrompt,
      apiKey: key,
      model: params.model || DEFAULT_DEEPSEEK_MODEL,
      temperature: 0.3
    });

    const cleaned = rawOutput.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}
