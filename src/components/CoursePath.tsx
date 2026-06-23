import { Link } from "react-router-dom";
import { lessons } from "../content/course";
import { getLessonProgress, getLessonStatus } from "../lib/localProgress";
import type { AppProgress } from "../types/content";

interface CoursePathProps {
  progress: AppProgress;
}

export function CoursePath({ progress }: CoursePathProps) {
  return (
    <ol className="course-path">
      {lessons.map((lesson) => {
        const status = getLessonStatus(progress, lesson.id, lesson.unlockAfter);
        const lessonProgress = getLessonProgress(progress, lesson.id);
        const completeCount = lessonProgress.completedStepIds.length;
        const totalCount = Math.max(lesson.stepIds.length, 1);
        const pct = Math.round((completeCount / totalCount) * 100);
        const isPlayable = status !== "locked" && lesson.stepIds.length > 0;

        return (
          <li key={lesson.id} className={`lesson-node lesson-node-${status}`}>
            <div className="node-marker">{lesson.order}</div>
            <div className="node-card">
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
