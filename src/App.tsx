import { Navigate, Route, Routes } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { useLocalProgress } from "./hooks/useLocalProgress";
import { AuthPage } from "./pages/AuthPage";
import { CoursePage } from "./pages/CoursePage";
import { HomePage } from "./pages/HomePage";
import { LessonPage } from "./pages/LessonPage";
import { ProfilePage } from "./pages/ProfilePage";

export default function App() {
  const { progress, completeStep, goToStep } = useLocalProgress();

  return (
    <div className="app-shell">
      <TopBar progress={progress} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course" element={<CoursePage progress={progress} />} />
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
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
