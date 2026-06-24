import { useCallback, useEffect, useState } from "react";
import type { AppProgress } from "../types/content";
import {
  loadProgress,
  markIncorrect,
  markStepComplete,
  saveProgress,
  setAvatar,
  setCurrentStep,
  setDisplayName,
  setProfileBackground,
} from "../lib/localProgress";

export function useLocalProgress() {
  const [progress, setProgressState] = useState<AppProgress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeStep = useCallback(
    (lessonId: string, stepId: string, stepIndex: number, totalSteps: number) => {
      setProgressState((current) =>
        markStepComplete(current, lessonId, stepId, stepIndex, totalSteps)
      );
    },
    []
  );

  const goToStep = useCallback((lessonId: string, stepIndex: number) => {
    setProgressState((current) => setCurrentStep(current, lessonId, stepIndex));
  }, []);

  const recordIncorrect = useCallback(() => {
    setProgressState((current) => markIncorrect(current));
  }, []);

  const replaceProgress = useCallback((nextProgress: AppProgress) => {
    setProgressState(nextProgress);
    saveProgress(nextProgress);
  }, []);

  const updateDisplayName = useCallback(
    (displayName: string, isCustom = true) => {
      setProgressState((current) => setDisplayName(current, displayName, isCustom));
    },
    []
  );

  const updateProfileBackground = useCallback((profileBackground: string) => {
    setProgressState((current) => setProfileBackground(current, profileBackground));
  }, []);

  const updateAvatar = useCallback((avatar: string) => {
    setProgressState((current) => setAvatar(current, avatar));
  }, []);

  return {
    progress,
    completeStep,
    goToStep,
    recordIncorrect,
    replaceProgress,
    updateDisplayName,
    updateProfileBackground,
    updateAvatar,
  };
}
