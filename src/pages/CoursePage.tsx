import { CoursePath } from "../components/CoursePath";
import { course } from "../content/course";
import type { AppProgress } from "../types/content";

interface CoursePageProps {
  progress: AppProgress;
}

export function CoursePage({ progress }: CoursePageProps) {
  return (
    <main className="page two-column">
      <section className="panel course-intro">
        <div className="eyebrow">MVP path</div>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <div className="stats-grid">
          <div>
            <strong>3</strong>
            <span>MVP lessons</span>
          </div>
          <div>
            <strong>16</strong>
            <span>interactive steps</span>
          </div>
          <div>
            <strong>{progress.completedLessons.length}</strong>
            <span>completed</span>
          </div>
        </div>
      </section>
      <CoursePath progress={progress} />
    </main>
  );
}
