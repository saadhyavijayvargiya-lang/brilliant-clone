/**
 * Pathwise AI Tutor — Cloudflare Worker OpenAI proxy.
 *
 * Keeps your OpenAI key server-side (a Worker secret), so it never ships to the
 * browser. The web app POSTs the challenge context here; this calls OpenAI and
 * returns the structured challenge JSON.
 *
 * Secrets/vars:
 *   OPENAI_API_KEY   (secret) — set via: wrangler secret put OPENAI_API_KEY
 *   OPENAI_MODEL     (var)    — defaults to gpt-4o-mini
 *   ALLOWED_ORIGINS  (var)    — comma-separated list of allowed site origins
 */

interface Env {
  OPENAI_API_KEY: string;
  OPENAI_MODEL?: string;
  ALLOWED_ORIGINS?: string;
}

interface ChallengeRequest {
  lessonTitle?: string;
  conceptSummary?: string;
  question?: string;
  userAnswer?: string;
  correctIdea?: string;
  difficulty?: "easier" | "similar" | "harder";
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    const allowed = (env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    const allowOrigin =
      allowed.length === 0
        ? "*"
        : allowed.includes(origin)
          ? origin
          : allowed[0];

    const cors: Record<string, string> = {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }
    if (allowed.length > 0 && origin && !allowed.includes(origin)) {
      return json({ error: "Origin not allowed" }, 403, cors);
    }
    if (!env.OPENAI_API_KEY) {
      return json({ error: "OpenAI key not configured" }, 500, cors);
    }

    let body: ChallengeRequest;
    try {
      body = (await request.json()) as ChallengeRequest;
    } catch {
      return json({ error: "Invalid JSON body" }, 400, cors);
    }
    if (!body.question || !body.correctIdea) {
      return json({ error: "Missing question context" }, 400, cors);
    }

    const difficultyHint =
      body.difficulty === "easier"
        ? "Make it noticeably EASIER and more scaffolded — smaller numbers."
        : body.difficulty === "harder"
          ? "Make it a bit HARDER — a small twist or extra step."
          : "Keep it at a SIMILAR difficulty with a fresh scenario.";

    const userPrompt = [
      "Create ONE brand-new multiple-choice practice question targeting the SPECIFIC misconception behind the learner's wrong answer.",
      `Lesson: ${body.lessonTitle ?? "Probability"}`,
      body.conceptSummary ? `Concept background: ${body.conceptSummary}` : "",
      `Original question: ${body.question}`,
      `Their incorrect answer: ${body.userAnswer || "(none)"}`,
      `Correct idea: ${body.correctIdea}`,
      `Difficulty: ${difficultyHint}`,
      "",
      'Respond ONLY with JSON of shape: {"insight": string, "question": string, "choices": string[4], "correctIndex": number, "explanation": string, "nudge": string}.',
      "Exactly 4 choices, exactly one correct, clean mental-math numbers, concise plain text.",
    ]
      .filter(Boolean)
      .join("\n");

    let openaiResponse: Response;
    try {
      openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: env.OPENAI_MODEL ?? "gpt-4o-mini",
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
      return json({ error: "Could not reach OpenAI" }, 502, cors);
    }

    if (!openaiResponse.ok) {
      const text = await openaiResponse.text();
      return json(
        { error: `OpenAI error ${openaiResponse.status}`, detail: text.slice(0, 200) },
        502,
        cors
      );
    }

    const payload = (await openaiResponse.json()) as {
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
      return json({ error: "Model returned invalid JSON" }, 502, cors);
    }

    if (
      !parsed.question ||
      !Array.isArray(parsed.choices) ||
      parsed.choices.length < 2 ||
      typeof parsed.correctIndex !== "number"
    ) {
      return json({ error: "Model returned a malformed challenge" }, 502, cors);
    }

    const choices = parsed.choices.slice(0, 4);
    return json(
      {
        insight: parsed.insight ?? "",
        question: parsed.question,
        choices,
        correctIndex: Math.max(
          0,
          Math.min(parsed.correctIndex, choices.length - 1)
        ),
        explanation: parsed.explanation ?? "",
        nudge: parsed.nudge ?? "",
      },
      200,
      cors
    );
  },
};

function json(
  data: unknown,
  status: number,
  cors: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}
