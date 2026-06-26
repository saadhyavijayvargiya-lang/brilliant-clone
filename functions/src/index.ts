import { setGlobalOptions } from "firebase-functions/v2";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
setGlobalOptions({ maxInstances: 10, region: "us-central1" });

// Stored in Google Secret Manager, never shipped to the client.
// Set with: firebase functions:secrets:set OPENAI_API_KEY
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

export const ping = onCall(async () => {
  return { ok: true, project: "brilliant-clone-5c11e" };
});

interface ChallengeRequest {
  lessonTitle?: string;
  conceptSummary?: string;
  question?: string;
  userAnswer?: string;
  correctIdea?: string;
  difficulty?: "easier" | "similar" | "harder";
}

/**
 * Secure OpenAI proxy: generates an adaptive tutoring challenge.
 * The API key lives only on the server (Secret Manager).
 */
export const tutorChallenge = onCall(
  { secrets: [OPENAI_API_KEY] },
  async (request) => {
    const data = (request.data ?? {}) as ChallengeRequest;
    if (!data.question || !data.correctIdea) {
      throw new HttpsError("invalid-argument", "Missing question context.");
    }

    const apiKey = OPENAI_API_KEY.value();
    if (!apiKey) {
      throw new HttpsError(
        "failed-precondition",
        "OpenAI key is not configured."
      );
    }

    const difficultyHint =
      data.difficulty === "easier"
        ? "Make it noticeably EASIER and more scaffolded — smaller numbers."
        : data.difficulty === "harder"
          ? "Make it a bit HARDER — a small twist or extra step."
          : "Keep it at a SIMILAR difficulty with a fresh scenario.";

    const userPrompt = [
      "Create ONE brand-new multiple-choice practice question targeting the SPECIFIC misconception behind the learner's wrong answer.",
      `Lesson: ${data.lessonTitle ?? "Probability"}`,
      data.conceptSummary ? `Concept background: ${data.conceptSummary}` : "",
      `Original question: ${data.question}`,
      `Their incorrect answer: ${data.userAnswer || "(none)"}`,
      `Correct idea: ${data.correctIdea}`,
      `Difficulty: ${difficultyHint}`,
      "",
      'Respond ONLY with JSON of shape: {"insight": string, "question": string, "choices": string[4], "correctIndex": number, "explanation": string, "nudge": string}.',
      "Exactly 4 choices, exactly one correct, clean mental-math numbers, concise plain text.",
    ]
      .filter(Boolean)
      .join("\n");

    let response: Response;
    try {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.85,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a sharp, upbeat probability tutor. Respond only with valid JSON.",
            },
            { role: "user", content: userPrompt },
          ],
        }),
      });
    } catch {
      throw new HttpsError("unavailable", "Could not reach OpenAI.");
    }

    if (!response.ok) {
      const text = await response.text();
      throw new HttpsError(
        "internal",
        `OpenAI error ${response.status}: ${text.slice(0, 200)}`
      );
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content ?? "{}";

    let parsed: {
      insight?: string;
      question?: string;
      choices?: string[];
      correctIndex?: number;
      explanation?: string;
      nudge?: string;
    };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new HttpsError("internal", "Model returned invalid JSON.");
    }

    if (
      !parsed.question ||
      !Array.isArray(parsed.choices) ||
      parsed.choices.length < 2 ||
      typeof parsed.correctIndex !== "number"
    ) {
      throw new HttpsError("internal", "Model returned a malformed challenge.");
    }

    const choices = parsed.choices.slice(0, 4);
    return {
      insight: parsed.insight ?? "",
      question: parsed.question,
      choices,
      correctIndex: Math.max(0, Math.min(parsed.correctIndex, choices.length - 1)),
      explanation: parsed.explanation ?? "",
      nudge: parsed.nudge ?? "",
    };
  }
);

export const onUserCreate = onCall(async (request) => {
  if (!request.auth) {
    throw new Error("Unauthenticated");
  }
  const uid = request.auth.uid;
  const db = getFirestore();
  const ref = db.collection("users").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    await ref.set({
      displayName: request.auth.token.name ?? request.auth.token.email ?? "Learner",
      email: request.auth.token.email ?? null,
      createdAt: FieldValue.serverTimestamp(),
      streakCount: 0,
      longestStreak: 0,
      lastActiveDate: null,
      lessonsCompleted: 0,
      milestones: [],
    });
  }
  return { ok: true };
});
