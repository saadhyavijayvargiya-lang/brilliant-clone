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

    // The app computes the answer + choices itself (deterministic verifier), so the
    // model only chooses a problem family and numeric params. This keeps the family
    // catalog in sync with src/lib/challengeChecker.ts; if it drifts, the client
    // rejects the item and retries or falls back, so it fails closed (safe).
    const familyCatalog = [
      "Choose ONE problem family and numeric params (the app computes the answer itself):",
      '- "expected-position": params {steps:int 2-40, pPercent in [20,25,40,60,75,80]}. Expected final position of a biased +1/-1 walk.',
      '- "prob-exact-heads": params {flips:int 2-12, heads:int 0..flips}. P(exactly k heads in n fair flips).',
      '- "prob-at-least-one-head": params {flips:int 2-12}. P(at least one head in n fair flips).',
      '- "count-paths": params {steps:int 2-18, end:int with |end|<=steps and same parity as steps}. Number of +1/-1 sequences ending at a position.',
      '- "gamblers-ruin": params {start:int, target:int 4-20, 0<start<target}. Fair gambler\'s ruin reach-target probability.',
    ].join("\n");

    const userPrompt = [
      "A learner just missed a question. Design ONE fresh practice item targeting the SPECIFIC misconception behind their wrong answer.",
      `Lesson: ${body.lessonTitle ?? "Probability"}`,
      body.conceptSummary ? `Concept background: ${body.conceptSummary}` : "",
      `Original question: ${body.question}`,
      `Their incorrect answer: ${body.userAnswer || "(none)"}`,
      `Correct idea: ${body.correctIdea}`,
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
          temperature: 0.7,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a sharp, upbeat probability tutor. You pick a problem family and numeric params; the app computes the answer. Respond only with valid JSON.",
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
      family?: string;
      params?: Record<string, number>;
      insight?: string;
      explanation?: string;
      nudge?: string;
    };
    try {
      parsed = JSON.parse(content);
    } catch {
      return json({ error: "Model returned invalid JSON" }, 502, cors);
    }

    if (!parsed.family || typeof parsed.family !== "string" || !parsed.params) {
      return json({ error: "Model returned a malformed challenge" }, 502, cors);
    }

    // Pass the family + params through; the app verifies and computes the answer.
    return json(
      {
        family: parsed.family,
        params: parsed.params,
        insight: parsed.insight ?? "",
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
