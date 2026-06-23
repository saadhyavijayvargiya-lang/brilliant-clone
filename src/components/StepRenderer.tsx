import { useState } from "react";
import { validateAnswer } from "../lib/validators";
import type { LessonStep } from "../types/content";
import { BiasSliderSim } from "../widgets/BiasSliderSim";
import { HistogramSim } from "../widgets/HistogramSim";
import { MarkovChainSim } from "../widgets/MarkovChainSim";
import { RandomWalkSim } from "../widgets/RandomWalkSim";
import { RunningAverageSim } from "../widgets/RunningAverageSim";
import { GamblerRuinSim } from "../widgets/GamblerRuinSim";
import { TargetPathSim } from "../widgets/TargetPathSim";

interface StepRendererProps {
  step: LessonStep;
  onComplete: (summary?: Record<string, number | string>) => void;
  onIncorrect: () => void;
  isComplete: boolean;
}

export function StepRenderer({
  step,
  onComplete,
  onIncorrect,
  isComplete,
}: StepRendererProps) {
  const [answer, setAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackKind, setFeedbackKind] = useState<"correct" | "wrong" | null>(
    null
  );

  const params = step.interaction.params ?? {};

  function markComplete(summary?: Record<string, number | string>) {
    setFeedback(step.feedback.correct);
    setFeedbackKind("correct");
    onComplete(summary);
  }

  function submit(value: unknown) {
    const result = validateAnswer(step.interaction.validation, value);
    if (result.correct) {
      markComplete();
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    onIncorrect();
    setFeedbackKind("wrong");
    setFeedback(
      nextAttempts >= 2 && step.feedback.hint
        ? `${step.feedback.incorrect} Hint: ${step.feedback.hint}`
        : step.feedback.incorrect
    );
  }

  return (
    <section className="step-card">
      <div className="step-type">{step.type}</div>
      <h2>{step.title}</h2>
      <p>{step.body}</p>
      {renderInteraction()}
      {feedback || isComplete ? (
        <div
          className={`feedback ${
            feedbackKind === "wrong" ? "feedback-wrong" : "feedback-correct"
          }`}
        >
          {feedback ?? step.feedback.correct}
        </div>
      ) : null}
    </section>
  );

  function renderInteraction() {
    switch (step.interaction.widget) {
      case "random-walk-sim":
        return (
          <RandomWalkSim
            stepsRequired={Number(params.stepsRequired ?? 10)}
            onComplete={markComplete}
          />
        );

      case "histogram-sim":
        return (
          <HistogramSim
            defaultSteps={Number(params.defaultSteps ?? 40)}
            trials={Number(params.trials ?? 1000)}
            onComplete={markComplete}
          />
        );

      case "bias-slider-sim":
        return (
          <BiasSliderSim
            defaultP={Number(params.defaultP ?? 0.6)}
            steps={Number(params.steps ?? 100)}
            paths={Number(params.paths ?? 30)}
            onComplete={markComplete}
          />
        );

      case "markov-chain-sim":
        return (
          <MarkovChainSim
            days={Number(params.days ?? 10)}
            sunnyToSunny={Number(params.sunnyToSunny ?? 0.75)}
            rainyToRainy={Number(params.rainyToRainy ?? 0.6)}
            onComplete={markComplete}
          />
        );

      case "running-average-sim":
        return (
          <RunningAverageSim
            trialsPerBatch={Number(params.trialsPerBatch ?? 50)}
            mode={params.mode === "die" ? "die" : "walk"}
            onComplete={markComplete}
          />
        );

      case "gambler-ruin-sim":
        return (
          <GamblerRuinSim
            trials={Number(params.trials ?? 300)}
            start={Number(params.start ?? 5)}
            goal={Number(params.goal ?? 10)}
            p={Number(params.p ?? 0.5)}
            onComplete={markComplete}
          />
        );

      case "target-path-sim":
        return (
          <TargetPathSim
            start={Number(params.start ?? 0)}
            target={Number(params.target ?? 3)}
            moves={Number(params.moves ?? 5)}
            onComplete={markComplete}
          />
        );

      case "choice-input": {
        const options = Array.isArray(params.options) ? params.options : [];
        return (
          <div className="answer-panel">
            {options.map((option) => (
              <button
                key={String(option)}
                className={`choice-button ${
                  selectedChoice === option ? "choice-button-selected" : ""
                }`}
                onClick={() => {
                  const nextChoice = String(option);
                  setSelectedChoice(nextChoice);
                  submit(nextChoice);
                }}
              >
                {String(option)}
              </button>
            ))}
          </div>
        );
      }

      case "number-input":
        return (
          <form
            className="answer-panel inline-answer"
            onSubmit={(event) => {
              event.preventDefault();
              submit(answer);
            }}
          >
            <label>
              <span>{String(params.label ?? "Answer")}</span>
              <input
                inputMode="decimal"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              />
            </label>
            <button className="button" type="submit">
              Check
            </button>
          </form>
        );

      case "none":
      default:
        return (
          <button className="button" onClick={() => markComplete()}>
            Continue
          </button>
        );
    }
  }
}
