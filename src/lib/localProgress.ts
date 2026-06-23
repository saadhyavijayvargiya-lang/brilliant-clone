import type { AppProgress, LessonProgress, LessonStatus } from "../types/content";

const STORAGE_KEY = "pathwise-progress";

export function defaultProgress(): AppProgress {
  return {
    displayName: "Learner",
    streakCount: 0,
    lastActiveDate: null,
    lessonProgress: {},
    completedLessons: [],
  };
}

export function loadProgress(): AppProgress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) } as AppProgress;
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress: AppProgress): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getLessonProgress(
  progress: AppProgress,
  lessonId: string
): LessonProgress {
  return (
    progress.lessonProgress[lessonId] ?? {
      lessonId,
      currentStepIndex: 0,
      completedStepIds: [],
      completedAt: null,
    }
  );
}

export function getLessonStatus(
  progress: AppProgress,
  lessonId: string,
  unlockAfter: string | null
): LessonStatus {
  if (progress.completedLessons.includes(lessonId)) return "completed";
  if (unlockAfter && !progress.completedLessons.includes(unlockAfter)) {
    return "locked";
  }
  const lessonProgress = progress.lessonProgress[lessonId];
  if (lessonProgress && lessonProgress.completedStepIds.length > 0) {
    return "in_progress";
  }
  return "available";
}

export function markActivity(progress: AppProgress): AppProgress {
  const today = new Date().toISOString().slice(0, 10);
  if (progress.lastActiveDate === today) return progress;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().slice(0, 10);

  return {
    ...progress,
    lastActiveDate: today,
    streakCount:
      progress.lastActiveDate === yesterdayString ? progress.streakCount + 1 : 1,
  };
}

export function markStepComplete(
  progress: AppProgress,
  lessonId: string,
  stepId: string,
  stepIndex: number,
  totalSteps: number
): AppProgress {
  const activeProgress = markActivity(progress);
  const current = getLessonProgress(activeProgress, lessonId);
  const completedStepIds = current.completedStepIds.includes(stepId)
    ? current.completedStepIds
    : [...current.completedStepIds, stepId];
  const lessonCompleted = completedStepIds.length >= totalSteps;

  const nextProgress: AppProgress = {
    ...activeProgress,
    completedLessons: lessonCompleted
      ? [...new Set([...activeProgress.completedLessons, lessonId])]
      : activeProgress.completedLessons,
    lessonProgress: {
      ...activeProgress.lessonProgress,
      [lessonId]: {
        lessonId,
        completedStepIds,
        currentStepIndex: Math.min(stepIndex, totalSteps - 1),
        completedAt: lessonCompleted
          ? current.completedAt ?? new Date().toISOString()
          : current.completedAt,
      },
    },
  };

  saveProgress(nextProgress);
  return nextProgress;
}

export function setCurrentStep(
  progress: AppProgress,
  lessonId: string,
  stepIndex: number
): AppProgress {
  const current = getLessonProgress(progress, lessonId);
  const nextProgress = {
    ...progress,
    lessonProgress: {
      ...progress.lessonProgress,
      [lessonId]: { ...current, currentStepIndex: stepIndex },
    },
  };
  saveProgress(nextProgress);
  return nextProgress;
}
