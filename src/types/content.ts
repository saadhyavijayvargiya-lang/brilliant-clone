export type StepType = "intro" | "simulation" | "input" | "choice" | "explain";

export type WidgetType =
  | "none"
  | "random-walk-sim"
  | "histogram-sim"
  | "bias-slider-sim"
  | "markov-chain-sim"
  | "choice-input"
  | "number-input";

export type ValidationType =
  | "completion"
  | "exact"
  | "choice"
  | "range"
  | "custom";

export interface ValidationConfig {
  type: ValidationType;
  expected?: number | string | boolean;
  tolerance?: number;
  min?: number;
  max?: number;
}

export interface LessonStep {
  id: string;
  lessonId: string;
  order: number;
  type: StepType;
  title: string;
  body: string;
  interaction: {
    widget: WidgetType;
    params?: Record<string, unknown>;
    validation: ValidationConfig;
  };
  feedback: {
    correct: string;
    incorrect: string;
    hint?: string;
  };
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  stepIds: string[];
  unlockAfter: string | null;
  estimatedMinutes: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessonIds: string[];
  subject: string;
  level: string;
  accent: string;
}

export type LessonStatus = "locked" | "available" | "in_progress" | "completed";

export interface LessonProgress {
  lessonId: string;
  currentStepIndex: number;
  completedStepIds: string[];
  completedAt: string | null;
}

export interface AppProgress {
  displayName: string;
  streakCount: number;
  lastActiveDate: string | null;
  activeDates: string[];
  lessonProgress: Record<string, LessonProgress>;
  completedLessons: string[];
}
