import { Navigate, Route, Routes } from "react-router-dom";
import { CosmicBackground } from "./components/CosmicBackground";
import { TopBar } from "./components/TopBar";
import { useAuth } from "./hooks/useAuth";
import { useLocalProgress } from "./hooks/useLocalProgress";
import { loadRemoteProgress, saveRemoteProgress } from "./lib/firestoreProgress";
import { AuthPage } from "./pages/AuthPage";
import { CoursePage } from "./pages/CoursePage";
import { CoursesPage } from "./pages/CoursesPage";
import { HomePage } from "./pages/HomePage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LessonPage } from "./pages/LessonPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const { user, loading, error, signInWithEmail, signUpWithEmail, signInWithGoogle, logOut } =
    useAuth();
  const {
    progress,
    completeStep,
    goToStep,
    recordIncorrect,
    replaceProgress,
    updateDisplayName,
    updateProfileBackground,
    updateAvatar,
    switchAccount,
  } =
    useLocalProgress();
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const hydratedUserRef = useRef<string | null | undefined>(undefined);
  // Becomes true only after the signed-in account's Firestore data has loaded,
  // so we never overwrite remote progress with a freshly-reset default.
  const remoteReadyRef = useRef(false);

  useEffect(() => {
    if (loading) return;
    const accountId = user?.uid ?? null;
    if (hydratedUserRef.current === accountId) return;
    hydratedUserRef.current = accountId;
    remoteReadyRef.current = false;

    // Reset to this account's clean slate (or guest cache) before loading.
    switchAccount(accountId);

    if (!user) return;

    loadRemoteProgress(user)
      .then((remoteProgress) => {
        if (remoteProgress) {
          replaceProgress(withAccountDefaultName(remoteProgress, user));
          setSyncMessage("Progress loaded.");
        } else {
          updateDisplayName(getAccountDisplayName(user), false);
          setSyncMessage("Signed in. Progress will sync across devices.");
        }
      })
      .catch((err: unknown) => {
        setSyncMessage(getSyncError(err));
      })
      .finally(() => {
        remoteReadyRef.current = true;
      });
  }, [loading, replaceProgress, switchAccount, updateDisplayName, user]);

  useEffect(() => {
    if (!user || loading || !remoteReadyRef.current) return;
    const timeout = window.setTimeout(() => {
      saveRemoteProgress(user, progress).catch((err: unknown) => {
        setSyncMessage(getSyncError(err));
      });
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [loading, progress, user]);

  useEffect(() => {
    if (!syncMessage) return;
    const timeout = window.setTimeout(() => setSyncMessage(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [syncMessage]);

  return (
    <div className="app-shell">
      <CosmicBackground />
      <TopBar progress={progress} user={user} onSignOut={logOut} />
      {error ? <div className="status-banner status-error">{error}</div> : null}
      {syncMessage ? <div className="status-banner">{syncMessage}</div> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage progress={progress} />} />
        <Route path="/course" element={<Navigate to="/courses" replace />} />
        <Route path="/course/:courseId" element={<CoursePage progress={progress} />} />
        <Route
          path="/lesson/:lessonId"
          element={
            <LessonPage
              progress={progress}
              onCompleteStep={completeStep}
              onGoToStep={goToStep}
              onIncorrectAnswer={recordIncorrect}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              progress={progress}
              onDisplayNameChange={(name) => updateDisplayName(name, true)}
              onBackgroundChange={updateProfileBackground}
              onAvatarChange={updateAvatar}
            />
          }
        />
        <Route path="/leaderboard" element={<LeaderboardPage progress={progress} />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              user={user}
              loading={loading}
              error={error}
              onEmailSignIn={signInWithEmail}
              onEmailSignUp={signUpWithEmail}
              onGoogleSignIn={signInWithGoogle}
              onSignOut={logOut}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function getSyncError(err: unknown): string {
  if (err instanceof Error) {
    return `Sync skipped: ${err.message}`;
  }
  return "Sync skipped. Progress is still saved on this device.";
}

function getAccountDisplayName(user: { displayName: string | null; email: string | null }) {
  return user.displayName?.trim() || user.email?.split("@")[0] || "Learner";
}

function withAccountDefaultName<T extends { displayName: string; hasCustomDisplayName?: boolean }>(
  progress: T,
  user: { displayName: string | null; email: string | null }
): T {
  if (progress.hasCustomDisplayName || progress.displayName !== "Learner") {
    return progress;
  }
  return { ...progress, displayName: getAccountDisplayName(user), hasCustomDisplayName: false };
}
