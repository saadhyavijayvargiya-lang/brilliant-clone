/**
 * Deterministic probability/math verifier for AI-generated tutor challenges.
 *
 * Validating the JSON shape of a model response is NOT enough: the model can
 * confidently mark a wrong choice as correct. So the model is never trusted to
 * decide correctness. Instead it only chooses a problem FAMILY and numeric
 * PARAMS; this module deterministically computes the true answer, renders the
 * question from a template (so the wording always matches the numbers), and
 * builds the answer choices in code. A wrong answer key is therefore impossible.
 *
 * If the model picks an unknown family or out-of-range params, assembly throws
 * and the caller retries; after retries it falls back to a fully code-generated
 * question (see buildFallbackChallenge), so the learner always sees a valid item.
 */

import type { Challenge, ChallengeDifficulty } from "./aiTutor";

export interface RawChallenge {
  family: string;
  params: Record<string, number>;
  insight?: string;
  explanation?: string;
  nudge?: string;
}

// ---------------------------------------------------------------------------
// math helpers
// ---------------------------------------------------------------------------

function combBig(n: number, k: number): bigint {
  if (k < 0 || k > n) return 0n;
  const kk = Math.min(k, n - k);
  let num = 1n;
  let den = 1n;
  for (let i = 0; i < kk; i += 1) {
    num *= BigInt(n - i);
    den *= BigInt(i + 1);
  }
  return num / den;
}

function gcdBig(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1n;
}

function formatFraction(num: bigint, den: bigint): string {
  if (den === 0n) return "0";
  let n = num;
  let d = den;
  if (d < 0n) {
    n = -n;
    d = -d;
  }
  const g = gcdBig(n, d);
  n /= g;
  d /= g;
  if (n === 0n) return "0";
  if (d === 1n) return n.toString();
  return `${n}/${d}`;
}

/** Format a decimal compactly: integers stay integers, else up to 2 dp, no trailing zeros. */
function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return parseFloat(value.toFixed(2)).toString();
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Take distinct distractors (!= correct, != each other); pad via padFn until we have `needed`. */
function pickDistinct(
  correct: string,
  candidates: string[],
  needed: number,
  padFn: (i: number) => string
): string[] {
  const out: string[] = [];
  const seen = new Set<string>([correct]);
  for (const c of candidates) {
    if (out.length >= needed) break;
    if (!seen.has(c)) {
      seen.add(c);
      out.push(c);
    }
  }
  let i = 0;
  while (out.length < needed) {
    const candidate = padFn(i);
    i += 1;
    if (!seen.has(candidate)) {
      seen.add(candidate);
      out.push(candidate);
    }
    if (i > 500) break; // safety
  }
  return out;
}

// ---------------------------------------------------------------------------
// family registry
// ---------------------------------------------------------------------------

interface Family {
  id: string;
  /** Validate + normalize model-supplied params; throw on anything invalid. */
  parse: (params: Record<string, number>) => Record<string, number>;
  /** Deterministic correct-answer display string. */
  solve: (p: Record<string, number>) => string;
  /** Rendered question text (numbers come from params, guaranteeing consistency). */
  question: (p: Record<string, number>) => string;
  /** 3 distinct distractor display strings, none equal to the correct answer. */
  distractors: (p: Record<string, number>, correct: string) => string[];
  /** Default explanation if the model didn't supply a usable one. */
  explain: (p: Record<string, number>, correct: string) => string;
  /** Produce valid params for the deterministic fallback path. */
  randomParams: (difficulty: ChallengeDifficulty) => Record<string, number>;
}

function num(params: Record<string, number>, key: string): number {
  const raw = params?.[key];
  const value = typeof raw === "string" ? Number(raw) : raw;
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Missing/invalid param: ${key}`);
  }
  return value;
}

const expectedPosition: Family = {
  id: "expected-position",
  parse: (params) => {
    const steps = num(params, "steps");
    const pPercent = num(params, "pPercent");
    if (!Number.isInteger(steps) || steps < 2 || steps > 40) {
      throw new Error("steps out of range");
    }
    const allowed = [20, 25, 40, 60, 75, 80];
    if (!allowed.includes(pPercent)) throw new Error("pPercent not clean");
    const value = steps * (2 * (pPercent / 100) - 1);
    // keep answers clean (integer or half)
    if (Math.abs(value * 2 - Math.round(value * 2)) > 1e-9) {
      throw new Error("expected value not clean");
    }
    return { steps, pPercent };
  },
  solve: (p) => formatNumber(p.steps * (2 * (p.pPercent / 100) - 1)),
  question: (p) =>
    `A biased random walk takes ${p.steps} steps. Each step is +1 with probability ${p.pPercent}% and -1 otherwise. What is the expected final position?`,
  distractors: (p, correct) => {
    const N = p.steps;
    const pr = p.pPercent / 100;
    const v = N * (2 * pr - 1);
    const candidates = [
      formatNumber(N), // assumes every step is +1
      formatNumber(N * pr), // counts expected +1 steps, forgets the -1 steps
      "0", // assumes symmetric
      formatNumber(-v), // sign error
    ];
    return pickDistinct(correct, candidates, 3, (i) => {
      const offset = Math.floor(i / 2) + 1;
      return formatNumber(v + (i % 2 === 0 ? offset : -offset));
    });
  },
  explain: (p, correct) =>
    `Each step contributes (2p - 1) on average, so the expected position is ${p.steps} * (2 * ${p.pPercent}% - 1) = ${correct}.`,
  randomParams: (difficulty) => {
    const pPercent = pick(difficulty === "easier" ? [25, 75] : [20, 40, 60, 80]);
    const base = pPercent % 50 === 0 ? 2 : 5; // keep clean
    const mult =
      difficulty === "easier" ? randInt(1, 3) : randInt(2, 6);
    return { steps: base * mult, pPercent };
  },
};

const probExactHeads: Family = {
  id: "prob-exact-heads",
  parse: (params) => {
    const flips = num(params, "flips");
    const heads = num(params, "heads");
    if (!Number.isInteger(flips) || flips < 2 || flips > 12) {
      throw new Error("flips out of range");
    }
    if (!Number.isInteger(heads) || heads < 0 || heads > flips) {
      throw new Error("heads out of range");
    }
    return { flips, heads };
  },
  solve: (p) =>
    formatFraction(combBig(p.flips, p.heads), 2n ** BigInt(p.flips)),
  question: (p) =>
    `Flip a fair coin ${p.flips} times. What is the probability of getting exactly ${p.heads} heads?`,
  distractors: (p, correct) => {
    const n = p.flips;
    const k = p.heads;
    const den = 2n ** BigInt(n);
    const candidates = [
      formatFraction(BigInt(k), BigInt(n)), // proportion, not probability
      formatFraction(1n, 2n ** BigInt(k || 1)), // (1/2)^k
      "1/2", // naive
      formatFraction(combBig(n, Math.min(k + 1, n)), den),
      formatFraction(combBig(n, Math.max(k - 1, 0)), den),
    ];
    // Abundant pad: other j/2^n values (includes 0 and 1).
    return pickDistinct(correct, candidates, 3, (i) =>
      formatFraction(BigInt(i), den)
    );
  },
  explain: (p, correct) =>
    `There are C(${p.flips}, ${p.heads}) favorable sequences out of 2^${p.flips} equally likely outcomes, so the probability is ${correct}.`,
  randomParams: (difficulty) => {
    const flips = difficulty === "easier" ? randInt(2, 4) : randInt(4, 10);
    return { flips, heads: randInt(1, flips - 1) };
  },
};

const probAtLeastOneHead: Family = {
  id: "prob-at-least-one-head",
  parse: (params) => {
    const flips = num(params, "flips");
    if (!Number.isInteger(flips) || flips < 2 || flips > 12) {
      throw new Error("flips out of range");
    }
    return { flips };
  },
  solve: (p) =>
    formatFraction(2n ** BigInt(p.flips) - 1n, 2n ** BigInt(p.flips)),
  question: (p) =>
    `Flip a fair coin ${p.flips} times. What is the probability of getting at least one head?`,
  distractors: (p, correct) => {
    const n = p.flips;
    const den = 2n ** BigInt(n);
    const candidates = [
      formatFraction(1n, den), // probability of zero heads
      "1/2",
      formatFraction(BigInt(n), den),
    ];
    // Abundant pad: other j/2^n values (includes 0 and 1).
    return pickDistinct(correct, candidates, 3, (i) =>
      formatFraction(den - BigInt(i), den)
    );
  },
  explain: (p, correct) =>
    `P(at least one head) = 1 - P(no heads) = 1 - (1/2)^${p.flips} = ${correct}.`,
  randomParams: (difficulty) => ({
    flips: difficulty === "easier" ? randInt(2, 4) : randInt(3, 8),
  }),
};

const countPaths: Family = {
  id: "count-paths",
  parse: (params) => {
    const steps = num(params, "steps");
    const end = num(params, "end");
    if (!Number.isInteger(steps) || steps < 2 || steps > 18) {
      throw new Error("steps out of range");
    }
    if (!Number.isInteger(end) || Math.abs(end) > steps) {
      throw new Error("end out of range");
    }
    if ((steps + end) % 2 !== 0) throw new Error("parity mismatch");
    return { steps, end };
  },
  solve: (p) => Number(combBig(p.steps, (p.steps + p.end) / 2)).toString(),
  question: (p) =>
    `How many distinct sequences of ${p.steps} steps (each +1 or -1) end at position ${p.end}?`,
  distractors: (p, correct) => {
    const N = p.steps;
    const ups = (N + p.end) / 2;
    const cnt = Number(combBig(N, ups));
    const candidates = [
      Number(2n ** BigInt(N)).toString(), // all sequences
      Number(combBig(N, Math.min(ups + 1, N))).toString(),
      Number(combBig(N, Math.max(ups - 1, 0))).toString(),
      String(N), // confuses with step count
    ];
    // Abundant pad: nearby integer counts.
    return pickDistinct(correct, candidates, 3, (i) => String(cnt + i + 1));
  },
  explain: (p, correct) =>
    `Ending at ${p.end} needs (${p.steps}+${p.end})/2 = ${(p.steps + p.end) / 2} up-steps, so the count is C(${p.steps}, ${(p.steps + p.end) / 2}) = ${correct}.`,
  randomParams: (difficulty) => {
    const steps = difficulty === "easier" ? randInt(2, 6) : randInt(6, 14);
    const maxEnd = steps;
    let end = randInt(-maxEnd, maxEnd);
    if ((steps + end) % 2 !== 0) end += end >= 0 ? -1 : 1;
    return { steps, end };
  },
};

const gamblersRuin: Family = {
  id: "gamblers-ruin",
  parse: (params) => {
    const start = num(params, "start");
    const target = num(params, "target");
    // target >= 4 guarantees at least 3 distinct j/target distractors.
    if (!Number.isInteger(target) || target < 4 || target > 20) {
      throw new Error("target out of range");
    }
    if (!Number.isInteger(start) || start < 1 || start >= target) {
      throw new Error("start out of range");
    }
    return { start, target };
  },
  solve: (p) => formatFraction(BigInt(p.start), BigInt(p.target)),
  question: (p) =>
    `In a fair gambler's ruin you start with $${p.start} and play $1 fair bets until you reach $${p.target} (win) or $0 (broke). What is the probability you reach $${p.target}?`,
  distractors: (p, correct) => {
    const i = p.start;
    const N = p.target;
    const candidates = [
      "1/2",
      formatFraction(BigInt(N - i), BigInt(N)), // probability of going broke
      formatFraction(1n, BigInt(N)),
    ];
    // Abundant pad: other j/N values (includes 0 and 1).
    return pickDistinct(correct, candidates, 3, (j) =>
      formatFraction(BigInt(j), BigInt(N))
    );
  },
  explain: (p, correct) =>
    `For a fair walk the chance of reaching the target before ruin is start/target = ${p.start}/${p.target} = ${correct}.`,
  randomParams: (difficulty) => {
    const target = difficulty === "easier" ? randInt(4, 6) : randInt(6, 12);
    return { start: randInt(1, target - 1), target };
  },
};

const FAMILIES: Record<string, Family> = {
  [expectedPosition.id]: expectedPosition,
  [probExactHeads.id]: probExactHeads,
  [probAtLeastOneHead.id]: probAtLeastOneHead,
  [countPaths.id]: countPaths,
  [gamblersRuin.id]: gamblersRuin,
};

export const FAMILY_IDS = Object.keys(FAMILIES);

/** Catalog the model is shown so it can pick a family + params. */
export const FAMILY_PROMPT = [
  "Choose ONE problem family and numeric params (the app computes the answer itself):",
  '- "expected-position": params {steps:int 2-40, pPercent in [20,25,40,60,75,80]}. Expected final position of a biased +1/-1 walk.',
  '- "prob-exact-heads": params {flips:int 2-12, heads:int 0..flips}. P(exactly k heads in n fair flips).',
  '- "prob-at-least-one-head": params {flips:int 2-12}. P(at least one head in n fair flips).',
  '- "count-paths": params {steps:int 2-18, end:int with |end|<=steps and same parity as steps}. Number of +1/-1 sequences ending at a position.',
  '- "gamblers-ruin": params {start:int, target:int 4-20, 0<start<target}. Fair gambler\'s ruin reach-target probability.',
].join("\n");

// ---------------------------------------------------------------------------
// assembly + fallback
// ---------------------------------------------------------------------------

function clean(text: string | undefined): string {
  return (text ?? "").toString().trim();
}

function assembleFromFamily(
  family: Family,
  params: Record<string, number>,
  meta: { insight?: string; explanation?: string; nudge?: string }
): Challenge {
  const correct = family.solve(params);
  const distractors = family.distractors(params, correct);
  if (distractors.length < 3) {
    throw new Error("could not build distinct choices");
  }
  const choices = shuffle([correct, ...distractors.slice(0, 3)]);
  const correctIndex = choices.indexOf(correct);
  if (correctIndex < 0) throw new Error("correct choice missing");
  return {
    insight: clean(meta.insight),
    question: family.question(params),
    choices,
    correctIndex,
    explanation: clean(meta.explanation) || family.explain(params, correct),
    nudge: clean(meta.nudge) || "Solid reasoning—keep the streak going.",
  };
}

/**
 * Verify and assemble a model-proposed challenge. Throws if the family is
 * unknown or the params don't pass the family's deterministic checks.
 */
export function assembleVerifiedChallenge(raw: RawChallenge): Challenge {
  const family = FAMILIES[raw?.family];
  if (!family) throw new Error(`Unknown family: ${raw?.family}`);
  const params = family.parse(raw.params ?? {});
  return assembleFromFamily(family, params, {
    insight: raw.insight,
    explanation: raw.explanation,
    nudge: raw.nudge,
  });
}

/** Always-valid, fully code-generated challenge used when generation fails. */
export function buildFallbackChallenge(
  difficulty: ChallengeDifficulty
): Challenge {
  const order =
    difficulty === "harder"
      ? [probExactHeads, countPaths, gamblersRuin, expectedPosition]
      : difficulty === "easier"
        ? [probAtLeastOneHead, expectedPosition, gamblersRuin]
        : [expectedPosition, probExactHeads, gamblersRuin, countPaths];
  // Try families in order; each randomParams is valid, but guard anyway.
  for (const family of shuffle(order)) {
    try {
      return assembleFromFamily(family, family.randomParams(difficulty), {});
    } catch {
      continue;
    }
  }
  // Last-resort hardcoded item (should never be reached).
  return {
    insight: "",
    question: "Flip a fair coin 3 times. What is the probability of exactly 2 heads?",
    choices: ["3/8", "1/2", "2/3", "1/4"],
    correctIndex: 0,
    explanation: "C(3,2)=3 favorable outcomes out of 2^3=8, so 3/8.",
    nudge: "Keep going.",
  };
}
