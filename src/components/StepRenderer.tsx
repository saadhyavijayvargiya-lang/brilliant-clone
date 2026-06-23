import type { LessonStep } from "../types/content";

interface StepRendererProps {
  step: LessonStep;
  onComplete: () => void;
  isComplete: boolean;
}

export function StepRenderer({ step, onComplete, isComplete }: StepRendererProps) {
  return (
    <section className="step-card">
      <div className="step-type">{step.type}</div>
      <h2>{step.title}</h2>
      <p>{step.body}</p>
      <div className="widget-placeholder">
        <span>{formatWidgetName(step.interaction.widget)}</span>
        <small>Interactive widget placeholder for this implementation slice.</small>
      </div>
      {isComplete ? (
        <div className="feedback feedback-correct">{step.feedback.correct}</div>
      ) : (
        <button className="button" onClick={onComplete}>
          {step.type === "explain" ? "Finish step" : "Mark step complete"}
        </button>
      )}
    </section>
  );
}

function formatWidgetName(widget: string): string {
  if (widget === "none") return "Concept step";
  return widget
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}
