import { getTutorModel } from "./ai";

export interface TutorRequest {
  lessonTitle: string;
  conceptSummary?: string;
  question: string;
  userAnswer: string;
  correctIdea: string;
}

export class TutorUnavailableError extends Error {}

/**
 * Ask Gemini for short, personalized tutoring on a question the learner missed.
 * Throws TutorUnavailableError when the AI backend is not provisioned yet.
 */
export async function getTutorFeedback(req: TutorRequest): Promise<string> {
  const prompt = buildPrompt(req);

  try {
    const model = getTutorModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    if (!text) throw new Error("Empty response");
    return text;
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
}

export async function* streamTutorFeedback(
  req: TutorRequest
): AsyncGenerator<string> {
  const prompt = buildPrompt(req);
  let model;
  try {
    model = getTutorModel();
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }

  try {
    const result = await model.generateContentStream(prompt);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  } catch (error) {
    throw new TutorUnavailableError(
      error instanceof Error ? error.message : "AI tutor unavailable"
    );
  }
}

function buildPrompt(req: TutorRequest): string {
  return [
    "You are a warm, encouraging probability tutor inside a learn-by-doing app.",
    "A learner just answered a question incorrectly. Give brief, personalized tutoring in at most 110 words.",
    "",
    `Lesson: ${req.lessonTitle}`,
    req.conceptSummary ? `Concept background: ${req.conceptSummary}` : "",
    `Question: ${req.question}`,
    `Their incorrect answer: ${req.userAnswer || "(no answer given)"}`,
    `The correct idea: ${req.correctIdea}`,
    "",
    "Reply in plain sentences (no markdown headings, no lists longer than 3 items):",
    "1) Kindly acknowledge their attempt.",
    "2) Explain the specific misconception behind THEIR answer.",
    "3) Give one concrete tip or tiny example so they get it next time.",
  ]
    .filter(Boolean)
    .join("\n");
}
