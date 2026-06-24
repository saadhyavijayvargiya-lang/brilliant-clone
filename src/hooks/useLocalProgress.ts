import { useCallback, useEffect, useState } from "react";
import type { AppProgress } from "../types/content";
import {
  defaultProgress,
  loadProgress,
  markIncorrect,
  markStepComplete,
  saveProgress,
  setActiveAccount,
  setAvatar,
  setCurrentStep,
  setDisplayName,
  setLocalPersistence,
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

  const switchAccount = useCallback((uid: string | null) => {
    setActiveAccount(uid);
    if (uid) {
      // Signed in: Firestore is the only store. Start clean and let the remote
      // load fill it in, so a previous account's data can never show.
      setLocalPersistence(false);
      setProgressState(defaultProgress());
    } else {
      // Guest: keep a local cache so the app still works without an account.
      setLocalPersistence(true);
      setProgressState(loadProgress());
    }
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
    switchAccount,
  };
}
