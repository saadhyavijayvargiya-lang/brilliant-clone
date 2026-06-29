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

    // The app computes the answer + choices itself (deterministic verifier), so
    // the model only picks a problem family and numeric params. Keep this catalog
    // in sync with src/lib/challengeChecker.ts; drift fails closed (client retries
    // or falls back).
    const familyCatalog = [
      "Choose ONE problem family and numeric params (the app computes the answer itself):",
      '- "expected-position": params {steps:int 2-40, pPercent in [20,25,40,50,60,75,80]}. Expected final position of a +1/-1 walk (50 = fair).',
      '- "prob-exact-heads": params {flips:int 2-12, heads:int 0..flips}. P(exactly k heads in n fair flips).',
      '- "prob-at-least-one-head": params {flips:int 2-12}. P(at least one head in n fair flips).',
      '- "count-paths": params {steps:int 2-18, end:int with |end|<=steps and same parity as steps}. Number of +1/-1 sequences ending at a position.',
      '- "gamblers-ruin": params {start:int, target:int 4-20, 0<start<target}. Fair gambler\'s ruin reach-target probability.',
    ].join("\n");

    const userPrompt = [
      "A learner just missed a question. Design ONE fresh practice item targeting the SPECIFIC misconception behind their wrong answer.",
      `Lesson: ${data.lessonTitle ?? "Probability"}`,
      data.conceptSummary ? `Concept background: ${data.conceptSummary}` : "",
      `Original question: ${data.question}`,
      `Their incorrect answer: ${data.userAnswer || "(none)"}`,
      `Correct idea: ${data.correctIdea}`,
      `Difficulty: ${difficultyHint}`,
      "",
      familyCatalog,
      "",
      "Pick the family + params whose typical misconception best matches their error.",
      'Respond ONLY with JSON: {"family": string, "params": object of numbers, "insight": string, "explanation": string, "nudge": string}.',
      "Do NOT include the answer or any choices — the app computes them. 'insight' names the misconception in one friendly sentence; 'explanation' and 'nudge' are short and plain.",
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
      family?: string;
      params?: Record<string, number>;
      insight?: string;
      explanation?: string;
      nudge?: string;
    };
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new HttpsError("internal", "Model returned invalid JSON.");
    }

    if (!parsed.family || typeof parsed.family !== "string" || !parsed.params) {
      throw new HttpsError("internal", "Model returned a malformed challenge.");
    }

    // Pass family + params through; the client verifies and computes the answer.
    return {
      family: parsed.family,
      params: parsed.params,
      insight: parsed.insight ?? "",
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
