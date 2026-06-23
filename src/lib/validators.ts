import type { ValidationConfig } from "../types/content";

export interface ValidationResult {
  correct: boolean;
  normalized?: unknown;
}

export function validateAnswer(
  validation: ValidationConfig,
  answer: unknown
): ValidationResult {
  switch (validation.type) {
    case "completion":
      return { correct: answer === true, normalized: answer };

    case "exact": {
      if (typeof validation.expected === "number") {
        const numericAnswer =
          typeof answer === "number" ? answer : Number.parseFloat(String(answer));
        if (Number.isNaN(numericAnswer)) {
          return { correct: false, normalized: answer };
        }
        const tolerance = validation.tolerance ?? 0;
        return {
          correct: Math.abs(numericAnswer - validation.expected) <= tolerance,
          normalized: numericAnswer,
        };
      }

      return {
        correct: String(answer).trim() === String(validation.expected),
        normalized: String(answer).trim(),
      };
    }

    case "choice":
      return {
        correct: String(answer) === String(validation.expected),
        normalized: answer,
      };

    case "range": {
      const numericAnswer =
        typeof answer === "number" ? answer : Number.parseFloat(String(answer));
      if (Number.isNaN(numericAnswer)) {
        return { correct: false, normalized: answer };
      }
      return {
        correct:
          numericAnswer >= (validation.min ?? -Infinity) &&
          numericAnswer <= (validation.max ?? Infinity),
        normalized: numericAnswer,
      };
    }

    case "custom":
      return { correct: answer === true, normalized: answer };

    default:
      return { correct: false, normalized: answer };
  }
}

export function interpolateFeedback(
  text: string,
  vars: Record<string, string | number>
): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) =>
    String(vars[key] ?? `{${key}}`)
  );
}
