import { Link, Navigate, useParams } from "react-router-dom";
import { StepRenderer } from "../components/StepRenderer";
import { getLesson, getLessonSteps } from "../content/course";
import { getLessonProgress, getLessonStatus } from "../lib/localProgress";
import type { AppProgress } from "../types/content";

interface LessonPageProps {
  progress: AppProgress;
  onCompleteStep: (
    lessonId: string,
    stepId: string,
    stepIndex: number,
    totalSteps: number
  ) => void;
  onGoToStep: (lessonId: string, stepIndex: number) => void;
  onIncorrectAnswer: () => void;
}

export function LessonPage({
  progress,
  onCompleteStep,
  onGoToStep,
  onIncorrectAnswer,
}: LessonPageProps) {
  const { lessonId } = useParams();
  if (!lessonId) return <Navigate to="/course" replace />;

  const lesson = getLesson(lessonId);
  if (!lesson) return <Navigate to="/course" replace />;

  const status = getLessonStatus(progress, lesson.id, lesson.unlockAfter);
  if (status === "locked") {
    return (
      <main className="page narrow-page">
        <section className="panel">
          <h1>{lesson.title}</h1>
          <p>This lesson is locked. Complete the previous lesson first.</p>
          <Link className="button" to={`/course/${lesson.courseId}`}>
            Back to course
          </Link>
        </section>
      </main>
    );
  }

  const steps = getLessonSteps(lesson.id);
  if (steps.length === 0) {
    return (
      <main className="page narrow-page">
        <section className="panel">
          <h1>{lesson.title}</h1>
          <p>This stretch lesson is still being prepared.</p>
          <Link className="button" to={`/course/${lesson.courseId}`}>
            Back to course
          </Link>
        </section>
      </main>
    );
  }
  const lessonProgress = getLessonProgress(progress, lesson.id);
  const stepIndex = Math.min(lessonProgress.currentStepIndex, steps.length - 1);
  const step = steps[stepIndex];
  const isStepComplete = lessonProgress.completedStepIds.includes(step.id);
  const lessonComplete = progress.completedLessons.includes(lesson.id);

  return (
    <main className="page lesson-layout">
      <aside className="panel lesson-sidebar">
        <Link className="back-link" to={`/course/${lesson.courseId}`}>
          ← Course
        </Link>
        <div className="eyebrow">Lesson {lesson.order}</div>
        <h1>{lesson.title}</h1>
        <p>{lesson.description}</p>
        <div className="progress-dots" aria-label="Lesson steps">
          {steps.map((lessonStep, index) => (
            <button
              key={lessonStep.id}
              className={`dot ${
                lessonProgress.completedStepIds.includes(lessonStep.id)
                  ? "dot-complete"
                  : ""
              } ${index === stepIndex ? "dot-current" : ""}`}
              onClick={() => onGoToStep(lesson.id, index)}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </aside>
      <div>
        <StepRenderer
          key={step.id}
          step={step}
          isComplete={isStepComplete}
          onIncorrect={onIncorrectAnswer}
          onComplete={() =>
            onCompleteStep(lesson.id, step.id, stepIndex, steps.length)
          }
        />
        <div className="lesson-controls">
          <button
            className="button button-secondary"
            disabled={stepIndex === 0}
            onClick={() => onGoToStep(lesson.id, stepIndex - 1)}
          >
            Back
          </button>
          <button
            className="button"
            disabled={!isStepComplete || stepIndex === steps.length - 1}
            onClick={() => onGoToStep(lesson.id, stepIndex + 1)}
          >
            Continue
          </button>
        </div>
        {lessonComplete ? (
          <div className="completion-card">
            <h2>Lesson complete</h2>
            <p>
              Nice work. Head back to the path to unlock the next lesson and keep
              your streak going.
            </p>
            <Link className="button" to={`/course/${lesson.courseId}`}>
              View course path
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
