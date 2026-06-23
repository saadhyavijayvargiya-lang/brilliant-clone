import { courses, getLessonsForCourse } from "../content/course";
import { getLessonProgress } from "../lib/localProgress";
import type { AppProgress } from "../types/content";

interface ProfilePageProps {
  progress: AppProgress;
}

export function ProfilePage({ progress }: ProfilePageProps) {
  const totalLessons = courses.reduce(
    (sum, course) => sum + getLessonsForCourse(course.id).length,
    0
  );
  const totalSteps = courses.reduce(
    (sum, course) =>
      sum +
      getLessonsForCourse(course.id).reduce(
        (courseSum, lesson) => courseSum + lesson.stepIds.length,
        0
      ),
    0
  );
  const completedSteps = Object.values(progress.lessonProgress).reduce(
    (sum, lessonProgress) => sum + lessonProgress.completedStepIds.length,
    0
  );
  const overallPct =
    totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

  return (
    <main className="page profile-page">
      <section className="panel profile-hero">
        <div className="profile-avatar-ring">
          <span>{progress.displayName[0] ?? "L"}</span>
        </div>
        <div>
          <div className="eyebrow">Profile</div>
          <h1>{progress.displayName}</h1>
          <p>Your learning map, streak, and course completion at a glance.</p>
        </div>
        <div className="stats-grid">
          <div>
            <strong>{progress.streakCount}</strong>
            <span>day streak</span>
          </div>
          <div>
            <strong>{progress.completedLessons.length}</strong>
            <span>of {totalLessons} lessons</span>
          </div>
          <div>
            <strong>{overallPct}%</strong>
            <span>overall progress</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="subject-heading">
          <h2>Sample profile icons</h2>
          <span>pick a vibe later</span>
        </div>
        <div className="avatar-row" aria-label="Sample profile icons">
          {["🪐", "🌙", "☄", "✦", "∞"].map((avatar) => (
            <button className="sample-avatar" key={avatar}>
              {avatar}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="subject-heading">
          <h2>Course progress</h2>
          <span>{completedSteps} steps complete</span>
        </div>
        <div className="profile-course-list">
          {courses.map((course) => {
            const lessons = getLessonsForCourse(course.id);
            const steps = lessons.reduce(
              (sum, lesson) => sum + lesson.stepIds.length,
              0
            );
            const doneSteps = lessons.reduce(
              (sum, lesson) =>
                sum +
                getLessonProgress(progress, lesson.id).completedStepIds.length,
              0
            );
            const pct = steps === 0 ? 0 : Math.round((doneSteps / steps) * 100);
            return (
              <div className="profile-course-item" key={course.id}>
                <div>
                  <strong>{course.title}</strong>
                  <span>{doneSteps}/{steps} steps</span>
                </div>
                <div className="course-progress-bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
