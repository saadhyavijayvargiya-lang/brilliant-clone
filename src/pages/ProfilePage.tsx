import { courses, getLessonsForCourse } from "../content/course";
import { getAchievements } from "../lib/achievements";
import { getLessonProgress } from "../lib/localProgress";
import type { AppProgress } from "../types/content";
import { FormEvent, useEffect, useState } from "react";

interface ProfilePageProps {
  progress: AppProgress;
  onDisplayNameChange: (displayName: string) => void;
  onBackgroundChange: (background: string) => void;
  onAvatarChange: (avatar: string) => void;
}

const avatarOptions = ["🪐", "🌙", "☄", "✦", "∞", "🛰", "⭐", "🌌"];

const backgroundOptions = [
  {
    id: "nebula",
    title: "Nebula",
    description: "Soft violet clouds and star dust.",
  },
  {
    id: "fractal",
    title: "Fractal",
    description: "Recursive arcs and electric gradients.",
  },
  {
    id: "eclipse",
    title: "Eclipse",
    description: "Golden orbit rings against deep space.",
  },
  {
    id: "aurora",
    title: "Aurora",
    description: "Cyan waves with a calm night-sky feel.",
  },
];

export function ProfilePage({
  progress,
  onDisplayNameChange,
  onBackgroundChange,
  onAvatarChange,
}: ProfilePageProps) {
  const [draftName, setDraftName] = useState(progress.displayName);

  useEffect(() => {
    setDraftName(progress.displayName);
  }, [progress.displayName]);
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
  const achievements = getAchievements(progress);
  const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked);

  function submitName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onDisplayNameChange(draftName);
  }

  return (
    <main className="page profile-page">
      <section className={`panel profile-hero profile-bg-${progress.profileBackground ?? "nebula"}`}>
        <div className="profile-avatar-ring">
          <span>{progress.avatar || progress.displayName[0] || "L"}</span>
        </div>
        <div>
          <div className="eyebrow">Profile</div>
          <h1>{progress.displayName}</h1>
          <p>Your learning map, streak, and course completion at a glance.</p>
          <form className="profile-name-form" onSubmit={submitName}>
            <label>
              <span>Display name</span>
              <input
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                placeholder="Your name"
              />
            </label>
            <button className="button button-small" type="submit">
              Save
            </button>
          </form>
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
          <div>
            <strong>{progress.currentCorrectStreak ?? 0}</strong>
            <span>current correct streak</span>
          </div>
          <div>
            <strong>{progress.longestCorrectStreak ?? 0}</strong>
            <span>best correct streak</span>
          </div>
          <div>
            <strong>{unlockedAchievements.length}</strong>
            <span>achievements</span>
          </div>
          <div>
            <strong>{progress.experiencePoints ?? 0}</strong>
            <span>experience points</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="subject-heading">
          <h2>Profile icon</h2>
          <span>tap to choose yours</span>
        </div>
        <div className="avatar-row" aria-label="Profile icons">
          {avatarOptions.map((avatar) => (
            <button
              className={`sample-avatar ${
                progress.avatar === avatar ? "sample-avatar-active" : ""
              }`}
              key={avatar}
              onClick={() => onAvatarChange(avatar)}
              aria-pressed={progress.avatar === avatar}
            >
              {avatar}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="subject-heading">
          <h2>Profile background</h2>
          <span>choose your space</span>
        </div>
        <div className="background-grid">
          {backgroundOptions.map((option) => (
            <button
              className={`background-option background-option-${option.id} ${
                (progress.profileBackground ?? "nebula") === option.id
                  ? "background-option-active"
                  : ""
              }`}
              key={option.id}
              onClick={() => onBackgroundChange(option.id)}
            >
              <span className="background-preview" />
              <strong>{option.title}</strong>
              <small>{option.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="subject-heading">
          <h2>Achievements</h2>
          <span>{unlockedAchievements.length}/{achievements.length} unlocked</span>
        </div>
        <div className="achievement-grid">
          {achievements.map((achievement) => (
            <article
              className={`achievement-card ${
                achievement.unlocked ? "achievement-unlocked" : ""
              }`}
              key={achievement.id}
            >
              <strong>{achievement.title}</strong>
              <span>{achievement.description}</span>
            </article>
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
