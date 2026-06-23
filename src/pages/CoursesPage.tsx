import { Link } from "react-router-dom";
import { courses, getLessonsForCourse } from "../content/course";
import { getLessonProgress } from "../lib/localProgress";
import type { AppProgress } from "../types/content";

interface CoursesPageProps {
  progress: AppProgress;
}

export function CoursesPage({ progress }: CoursesPageProps) {
  const subjects = [...new Set(courses.map((course) => course.subject))];

  return (
    <main className="page courses-page">
      <section className="courses-hero">
        <div className="eyebrow">Courses</div>
        <h1>Pick a path through probability.</h1>
        <p>
          Short, visual courses with interactive checkpoints. Start with random
          walks, then jump into state-based thinking with Markov chains.
        </p>
      </section>

      {subjects.map((subject) => (
        <section className="subject-section" key={subject}>
          <div className="subject-heading">
            <h2>{subject}</h2>
            <span>{courses.filter((course) => course.subject === subject).length} courses</span>
          </div>
          <div className="course-grid">
            {courses
              .filter((course) => course.subject === subject)
              .map((course) => {
                const lessons = getLessonsForCourse(course.id);
                const totalSteps = lessons.reduce(
                  (sum, lesson) => sum + lesson.stepIds.length,
                  0
                );
                const completedLessons = lessons.filter((lesson) =>
                  progress.completedLessons.includes(lesson.id)
                ).length;
                const completedSteps = lessons.reduce(
                  (sum, lesson) =>
                    sum +
                    getLessonProgress(progress, lesson.id).completedStepIds.length,
                  0
                );
                const pct =
                  totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

                return (
                  <Link
                    className={`course-card course-card-${course.accent}`}
                    key={course.id}
                    to={`/course/${course.id}`}
                  >
                    <div className="course-orb">
                      <span className="course-orb-ring" />
                      <span className="course-orb-moon" />
                    </div>
                    <div className="node-eyebrow">
                      {course.level} · {lessons.length} lessons
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <div className="course-progress-bar" aria-label={`${pct}% complete`}>
                      <span style={{ width: `${pct}%` }} />
                    </div>
                    <div className="node-meta">
                      <span>{completedLessons} completed</span>
                      <span>{pct}%</span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </section>
      ))}
    </main>
  );
}
