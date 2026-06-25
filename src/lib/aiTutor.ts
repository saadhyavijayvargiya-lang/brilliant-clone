import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  Schema,
} from "firebase/ai";
import type { GenerativeModel } from "firebase/ai";
import { app } from "./firebase";

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

let challengeModel: GenerativeModel | null = null;

function getChallengeModel(): GenerativeModel {
  if (challengeModel) return challengeModel;

  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const schema = Schema.object({
    properties: {
      insight: Schema.string(),
      question: Schema.string(),
      choices: Schema.array({ items: Schema.string() }),
      correctIndex: Schema.number(),
      explanation: Schema.string(),
      nudge: Schema.string(),
    },
  });

  challengeModel = getGenerativeModel(ai, {
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.85,
      maxOutputTokens: 700,
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  return challengeModel;
}

/**
 * Generate a fresh, adaptive multiple-choice challenge targeted at the exact
 * misconception behind a learner's wrong answer. Throws TutorUnavailableError
 * when the AI backend is not provisioned.
 */
export async function generateChallenge(
  req: ChallengeRequest
): Promise<Challenge> {
  let model: GenerativeModel;
  try {
    model = getChallengeModel();
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }

  const prompt = buildPrompt(req);

  try {
    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text()) as Challenge;

    if (
      !data ||
      typeof data.question !== "string" ||
      !Array.isArray(data.choices) ||
      data.choices.length < 2 ||
      typeof data.correctIndex !== "number" ||
      data.correctIndex < 0 ||
      data.correctIndex >= data.choices.length
    ) {
      throw new Error("Malformed challenge");
    }

    return {
      insight: data.insight ?? "",
      question: data.question,
      choices: data.choices.slice(0, 4),
      correctIndex: Math.min(data.correctIndex, Math.min(data.choices.length, 4) - 1),
      explanation: data.explanation ?? "",
      nudge: data.nudge ?? "",
    };
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
}

function buildPrompt(req: ChallengeRequest): string {
  const difficultyHint = {
    easier: "Make it noticeably EASIER and more scaffolded than the original — smaller numbers, more obvious structure.",
    similar: "Keep it at a SIMILAR difficulty to the original, but with a fresh scenario and new numbers.",
    harder: "Make it a bit HARDER — a small twist or an extra step beyond the original.",
  }[req.difficulty];

  return [
    "You are a sharp, upbeat probability coach inside a learn-by-doing app.",
    "A learner just missed a question. Create ONE brand-new multiple-choice practice question that targets the SPECIFIC misconception behind their wrong answer, so they can prove they've got it now.",
    "",
    `Lesson: ${req.lessonTitle}`,
    req.conceptSummary ? `Concept background: ${req.conceptSummary}` : "",
    `Original question: ${req.question}`,
    `Their incorrect answer: ${req.userAnswer || "(no answer given)"}`,
    `The correct idea behind the original: ${req.correctIdea}`,
    `Difficulty: ${difficultyHint}`,
    "",
    "Rules:",
    "- Provide exactly 4 answer choices, with exactly one correct.",
    "- Use clean, simple numbers a learner can compute mentally.",
    "- 'insight': one short, friendly sentence naming the misconception their answer suggests.",
    "- 'explanation': 1-2 sentences on why the correct choice is right.",
    "- 'nudge': a short, motivating one-liner.",
    "- Keep everything concise and plain (no markdown).",
  ]
    .filter(Boolean)
    .join("\n");
}
