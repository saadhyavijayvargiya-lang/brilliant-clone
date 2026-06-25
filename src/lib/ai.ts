import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import type { GenerativeModel } from "firebase/ai";
import { app } from "./firebase";

let cachedModel: GenerativeModel | null = null;

/**
 * Lazily create a Gemini model via Firebase AI Logic (Gemini Developer API).
 *
 * Note: this requires the AI Logic backend to be provisioned on the Firebase
 * project (`firebase init ailogic`). Until then, calls will throw and the UI
 * falls back to a friendly "not enabled yet" message.
 */
export function getTutorModel(): GenerativeModel {
  if (cachedModel) return cachedModel;

  const ai = getAI(app, { backend: new GoogleAIBackend() });
  cachedModel = getGenerativeModel(ai, {
    model: "gemini-flash-latest",
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 600,
      topP: 0.95,
      topK: 40,
    },
  });
  return cachedModel;
}

/** Feature flag so the AI tutor can be hidden until the backend is ready. */
export const AI_ENABLED = import.meta.env.VITE_ENABLE_AI !== "false";
