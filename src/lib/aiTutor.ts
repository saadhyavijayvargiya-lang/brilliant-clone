import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import type { GenerativeModel } from "firebase/ai";
import { httpsCallable } from "firebase/functions";
import { app, functions } from "./firebase";
import {
  assembleVerifiedChallenge,
  buildFallbackChallenge,
  FAMILY_PROMPT,
} from "./challengeChecker";
import type { RawChallenge } from "./challengeChecker";

// Provider for the AI tutor:
//   "firebase" — Firebase AI Logic (Gemini), called directly from the client.
//   "openai"   — OpenAI via the secure tutorChallenge Cloud Function (needs Blaze).
//   "worker"   — OpenAI via a free Cloudflare Worker proxy (VITE_AI_PROXY_URL).
const AI_PROVIDER = (import.meta.env.VITE_AI_PROVIDER ?? "firebase") as
  | "openai"
  | "firebase"
  | "worker";

const AI_PROXY_URL = import.meta.env.VITE_AI_PROXY_URL as string | undefined;

// How many times to ask the model for a verifiable item before falling back to
// a fully code-generated (deterministic) question.
const MAX_ATTEMPTS = 3;

export type ChallengeDifficulty = "easier" | "similar" | "harder";

export interface ChallengeRequest {
  lessonTitle: string;
  conceptSummary?: string;
  question: string;
  userAnswer: string;
  correctIdea: string;
  difficulty: ChallengeDifficulty;
}

export interface Challenge {
  insight: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
  nudge: string;
}

export class TutorUnavailableError extends Error {}

/**
 * Generate a fresh, adaptive multiple-choice challenge targeted at the exact
 * misconception behind a learner's wrong answer.
 *
 * The model only chooses a problem family + numeric params; the deterministic
 * checker (challengeChecker) computes the correct answer and builds the choices,
 * so a wrong answer key is impossible. If the model returns an unknown family or
 * out-of-range params, we retry; after MAX_ATTEMPTS we fall back to a fully
 * code-generated question so the learner always sees a valid item.
 *
 * Throws TutorUnavailableError only when the backend itself is unreachable or
 * not configured (so the UI can show a friendly "not enabled" message).
 */
export async function generateChallenge(
  req: ChallengeRequest
): Promise<Challenge> {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    // Provider errors (network/config) propagate; verification errors are retried.
    const raw = await callProvider(req);
    try {
      return assembleVerifiedChallenge(raw);
    } catch {
      // Model proposed an unverifiable item — try again.
    }
  }
  // Backend works but couldn't produce a verifiable item: deterministic fallback.
  return buildFallbackChallenge(req.difficulty);
}

async function callProvider(req: ChallengeRequest): Promise<RawChallenge> {
  if (AI_PROVIDER === "worker") return generateViaWorker(req);
  if (AI_PROVIDER === "openai") return generateViaFunction(req);
  return generateViaFirebaseAI(req);
}

async function generateViaWorker(req: ChallengeRequest): Promise<RawChallenge> {
  if (!AI_PROXY_URL) {
    throw new TutorUnavailableError(
      "AI proxy URL is not configured (set VITE_AI_PROXY_URL)."
    );
  }
  let response: Response;
  try {
    response = await fetch(AI_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
  } catch {
    throw new TutorUnavailableError("Could not reach the AI tutor.");
  }
  if (!response.ok) {
    let detail = `Tutor proxy error ${response.status}`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) detail = body.error;
    } catch {
      /* ignore */
    }
    throw new TutorUnavailableError(detail);
  }
  try {
    return (await response.json()) as RawChallenge;
  } catch {
    throw new TutorUnavailableError("AI tutor returned invalid data.");
  }
}

async function generateViaFunction(
  req: ChallengeRequest
): Promise<RawChallenge> {
  try {
    const callable = httpsCallable<ChallengeRequest, RawChallenge>(
      functions,
      "tutorChallenge"
    );
    const result = await callable(req);
    return result.data;
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
}

let challengeModel: GenerativeModel | null = null;

function getChallengeModel(): GenerativeModel {
  if (challengeModel) return challengeModel;
  const ai = getAI(app, { backend: new GoogleAIBackend() });
  challengeModel = getGenerativeModel(ai, {
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 500,
      responseMimeType: "application/json",
    },
  });
  return challengeModel;
}

async function generateViaFirebaseAI(
  req: ChallengeRequest
): Promise<RawChallenge> {
  let model: GenerativeModel;
  try {
    model = getChallengeModel();
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
  try {
    const result = await model.generateContent(buildPrompt(req));
    return JSON.parse(result.response.text()) as RawChallenge;
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
}

export function buildPrompt(req: ChallengeRequest): string {
  const difficultyHint = {
    easier:
      "Make it noticeably EASIER and more scaffolded — smaller numbers, more obvious structure.",
    similar:
      "Keep it at a SIMILAR difficulty to the original, with fresh numbers.",
    harder: "Make it a bit HARDER — a small twist or an extra step.",
  }[req.difficulty];

  return [
    "You are a sharp, upbeat probability coach inside a learn-by-doing app.",
    "A learner just missed a question. Design ONE fresh practice item that targets the SPECIFIC misconception behind their wrong answer.",
    "",
    `Lesson: ${req.lessonTitle}`,
    req.conceptSummary ? `Concept background: ${req.conceptSummary}` : "",
    `Original question: ${req.question}`,
    `Their incorrect answer: ${req.userAnswer || "(no answer given)"}`,
    `The correct idea behind the original: ${req.correctIdea}`,
    `Difficulty: ${difficultyHint}`,
    "",
    FAMILY_PROMPT,
    "",
    "Pick the family + params whose typical misconception best matches their error.",
    'Respond ONLY with JSON: {"family": string, "params": object of numbers, "insight": string, "explanation": string, "nudge": string}.',
    "Do NOT include the answer or the choices — the app computes them deterministically.",
    "'insight' names the misconception in one friendly sentence; 'explanation' and 'nudge' are short and plain (no markdown).",
  ]
    .filter(Boolean)
    .join("\n");
}
