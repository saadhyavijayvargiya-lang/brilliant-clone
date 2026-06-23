import { useCallback, useEffect, useState } from "react";
import type { AppProgress } from "../types/content";
import {
  loadProgress,
  markStepComplete,
  saveProgress,
  setCurrentStep,
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

  return { progress, completeStep, goToStep };
}
