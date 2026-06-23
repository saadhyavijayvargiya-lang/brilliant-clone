import type { AppProgress, LessonProgress, LessonStatus } from "../types/content";

const STORAGE_KEY = "pathwise-progress";

export function defaultProgress(): AppProgress {
  return {
    displayName: "Learner",
    hasCustomDisplayName: false,
    streakCount: 0,
    lastActiveDate: null,
    activeDates: [],
    currentCorrectStreak: 0,
    longestCorrectStreak: 0,
    lessonProgress: {},
    completedLessons: [],
  };
}

export function setDisplayName(
  progress: AppProgress,
  displayName: string,
  isCustom: boolean
): AppProgress {
  const cleanedName = displayName.trim() || "Learner";
  const nextProgress = {
    ...progress,
    displayName: cleanedName,
    hasCustomDisplayName: isCustom,
  };
  saveProgress(nextProgress);
  return nextProgress;
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
    activeDates: [...new Set([...(progress.activeDates ?? []), today])],
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
  const alreadyCompleted = current.completedStepIds.includes(stepId);
  const currentCorrectStreak = alreadyCompleted
    ? activeProgress.currentCorrectStreak
    : (activeProgress.currentCorrectStreak ?? 0) + 1;
  const lessonCompleted = completedStepIds.length >= totalSteps;

  const nextProgress: AppProgress = {
    ...activeProgress,
    currentCorrectStreak,
    longestCorrectStreak: Math.max(
      activeProgress.longestCorrectStreak ?? 0,
      currentCorrectStreak
    ),
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

export function markIncorrect(progress: AppProgress): AppProgress {
  const nextProgress = {
    ...markActivity(progress),
    currentCorrectStreak: 0,
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
