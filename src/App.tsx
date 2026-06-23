import { Navigate, Route, Routes } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { useAuth } from "./hooks/useAuth";
import { useLocalProgress } from "./hooks/useLocalProgress";
import { loadRemoteProgress, saveRemoteProgress } from "./lib/firestoreProgress";
import { AuthPage } from "./pages/AuthPage";
import { CoursePage } from "./pages/CoursePage";
import { CoursesPage } from "./pages/CoursesPage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const { user, loading, error, signInWithEmail, signUpWithEmail, signInWithGoogle, logOut } =
    useAuth();
  const { progress, completeStep, goToStep, replaceProgress } = useLocalProgress();
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const hydratedUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user || hydratedUserRef.current === user.uid) return;
    hydratedUserRef.current = user.uid;
    loadRemoteProgress(user)
      .then((remoteProgress) => {
        if (remoteProgress) {
          replaceProgress(remoteProgress);
          setSyncMessage("Progress loaded.");
        } else {
          setSyncMessage("Signed in. Progress will sync across devices.");
        }
      })
      .catch((err: unknown) => {
        setSyncMessage(getSyncError(err));
      });
  }, [replaceProgress, user]);

  useEffect(() => {
    if (!user || loading) return;
    const timeout = window.setTimeout(() => {
      saveRemoteProgress(user, progress).catch((err: unknown) => {
        setSyncMessage(getSyncError(err));
      });
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [loading, progress, user]);

  return (
    <div className="app-shell">
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
            />
          }
        />
        <Route path="/profile" element={<ProfilePage progress={progress} />} />
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
