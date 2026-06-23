import { Link, Navigate, useParams } from "react-router-dom";
import { CoursePath } from "../components/CoursePath";
import { getCourse, getLessonsForCourse } from "../content/course";
import type { AppProgress } from "../types/content";

interface CoursePageProps {
  progress: AppProgress;
}

export function CoursePage({ progress }: CoursePageProps) {
  const { courseId } = useParams();
  if (!courseId) return <Navigate to="/courses" replace />;

  const course = getCourse(courseId);
  if (!course) return <Navigate to="/courses" replace />;

  const courseLessons = getLessonsForCourse(course.id);
  const totalSteps = courseLessons.reduce(
    (sum, lesson) => sum + lesson.stepIds.length,
    0
  );
  const completedInCourse = courseLessons.filter((lesson) =>
    progress.completedLessons.includes(lesson.id)
  ).length;

  return (
    <main className="page two-column">
      <section className="panel course-intro">
        <Link className="back-link" to="/courses">
          ← All courses
        </Link>
        <div className="eyebrow">{course.subject} · {course.level}</div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="stats-grid">
          <div>
            <strong>{courseLessons.length}</strong>
            <span>lessons</span>
          </div>
          <div>
            <strong>{totalSteps}</strong>
            <span>interactive steps</span>
          </div>
          <div>
            <strong>{completedInCourse}</strong>
            <span>completed</span>
          </div>
        </div>
      </section>
      <CoursePath course={course} lessons={courseLessons} progress={progress} />
    </main>
  );
}
