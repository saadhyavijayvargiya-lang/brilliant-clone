import { Link } from "react-router-dom";
import { getLessonProgress, getLessonStatus } from "../lib/localProgress";
import type { AppProgress, Course, Lesson } from "../types/content";

interface CoursePathProps {
  course: Course;
  lessons: Lesson[];
  progress: AppProgress;
}

export function CoursePath({ course, lessons, progress }: CoursePathProps) {
  return (
    <ol className={`planet-path planet-path-${course.accent}`}>
      {lessons.map((lesson) => {
        const status = getLessonStatus(progress, lesson.id, lesson.unlockAfter);
        const lessonProgress = getLessonProgress(progress, lesson.id);
        const completeCount = lessonProgress.completedStepIds.length;
        const totalCount = Math.max(lesson.stepIds.length, 1);
        const pct = Math.round((completeCount / totalCount) * 100);
        const isPlayable = status !== "locked" && lesson.stepIds.length > 0;

        return (
          <li
            key={lesson.id}
            className={`planet-node planet-node-${status} planet-node-${lesson.order % 2 === 0 ? "right" : "left"} planet-style-${getPlanetStyle(lesson.order)}`}
          >
            <div className="orbit-line" />
            <div className="planet-marker">
              {lesson.order}
              <span className="planet-ring" />
              <span className="planet-moon" />
            </div>
            <div className="planet-card">
              <div className="node-eyebrow">
                Lesson {lesson.order} · {lesson.estimatedMinutes} min
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
              <div className="node-meta">
                <span>{status.replace("_", " ")}</span>
                {lesson.stepIds.length > 0 ? <span>{pct}%</span> : <span>stretch</span>}
              </div>
              {isPlayable ? (
                <Link className="button button-small" to={`/lesson/${lesson.id}`}>
                  {status === "completed" ? "Review" : "Start"}
                </Link>
              ) : (
                <button className="button button-small button-disabled" disabled>
                  Locked
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function getPlanetStyle(order: number): "plain" | "ring" | "moon" | "double" {
  if (order % 5 === 0) return "double";
  if (order % 3 === 0) return "moon";
  if (order % 2 === 0) return "ring";
  return "plain";
}
