import { useState } from "react";
import { validateAnswer } from "../lib/validators";
import { AI_ENABLED } from "../lib/ai";
import { generateChallenge } from "../lib/aiTutor";
import type { Challenge, ChallengeDifficulty } from "../lib/aiTutor";
import type { LessonStep } from "../types/content";
import { BiasSliderSim } from "../widgets/BiasSliderSim";
import { HistogramSim } from "../widgets/HistogramSim";
import { MarkovChainSim } from "../widgets/MarkovChainSim";
import { RandomWalkSim } from "../widgets/RandomWalkSim";
import { RunningAverageSim } from "../widgets/RunningAverageSim";
import { GamblerRuinSim } from "../widgets/GamblerRuinSim";
import { TargetPathSim } from "../widgets/TargetPathSim";
import { GaltonBoardSim } from "../widgets/GaltonBoardSim";
import { SpinnerSim } from "../widgets/SpinnerSim";

interface StepRendererProps {
  step: LessonStep;
  onComplete: (summary?: Record<string, number | string>) => void;
  onIncorrect: () => void;
  isComplete: boolean;
  lessonTitle?: string;
  conceptSummary?: string;
  onAwardXp?: (amount: number) => void;
}

export function StepRenderer({
  step,
  onComplete,
  onIncorrect,
  isComplete,
  lessonTitle,
  conceptSummary,
  onAwardXp,
}: StepRendererProps) {
  const [answer, setAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackKind, setFeedbackKind] = useState<"correct" | "wrong" | null>(
    null
  );
  const [lastWrongAnswer, setLastWrongAnswer] = useState("");

  // Adaptive AI challenge state
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [challengeLoading, setChallengeLoading] = useState(false);
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [pickedChoice, setPickedChoice] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>("similar");
  const [challengeWins, setChallengeWins] = useState(0);

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
    setLastWrongAnswer(String(value ?? ""));
    onIncorrect();
    setFeedbackKind("wrong");
    setFeedback(
      nextAttempts >= 2 && step.feedback.hint
        ? `${step.feedback.incorrect} Hint: ${step.feedback.hint}`
        : step.feedback.incorrect
    );
  }

  async function loadChallenge(nextDifficulty: ChallengeDifficulty) {
    setChallengeLoading(true);
    setChallengeError(null);
    setChallenge(null);
    setPickedChoice(null);
    setDifficulty(nextDifficulty);
    try {
      const next = await generateChallenge({
        lessonTitle: lessonTitle ?? "Probability",
        conceptSummary,
        question: `${step.title} — ${step.body}`,
        userAnswer: lastWrongAnswer,
        correctIdea: step.feedback.correct,
        difficulty: nextDifficulty,
      });
      setChallenge(next);
    } catch {
      setChallengeError(
        "The AI tutor isn't switched on yet. Once Firebase AI Logic is enabled for this project, you'll get fresh tailored challenges here."
      );
    } finally {
      setChallengeLoading(false);
    }
  }

  function pickChallengeChoice(index: number) {
    if (pickedChoice !== null || !challenge) return;
    setPickedChoice(index);
    if (index === challenge.correctIndex) {
      setChallengeWins((wins) => wins + 1);
      onAwardXp?.(15);
    }
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
      {step.teach && (feedbackKind === "correct" || isComplete) ? (
        <div className="teach-note">
          <span className="teach-note-label">Key takeaway</span>
          <p>{step.teach}</p>
        </div>
      ) : null}
      {AI_ENABLED && feedbackKind === "wrong" ? (
        <div className="tutor-block">
          {!challenge && !challengeError ? (
            <button
              className="button button-secondary tutor-button"
              onClick={() => loadChallenge("similar")}
              disabled={challengeLoading}
            >
              {challengeLoading
                ? "Spinning up a challenge…"
                : "✦ Tutor Challenge — practice this until it clicks"}
            </button>
          ) : null}

          {challengeError ? (
            <div className="tutor-note tutor-note-error">
              <span className="tutor-note-label">AI tutor</span>
              <p>{challengeError}</p>
            </div>
          ) : null}

          {challenge ? (
            <div className="challenge-card">
              <div className="challenge-head">
                <span className="tutor-note-label">
                  ✦ Tutor Challenge
                  {challengeWins > 0 ? ` · ${challengeWins} nailed` : ""}
                </span>
                <span className="challenge-diff">{difficulty}</span>
              </div>
              {challenge.insight ? (
                <p className="challenge-insight">{challenge.insight}</p>
              ) : null}
              <p className="challenge-question">{challenge.question}</p>
              <div className="answer-panel">
                {challenge.choices.map((choice, index) => {
                  const isPicked = pickedChoice === index;
                  const isAnswer = challenge.correctIndex === index;
                  const revealed = pickedChoice !== null;
                  const cls = revealed
                    ? isAnswer
                      ? "choice-button choice-correct"
                      : isPicked
                        ? "choice-button choice-wrong"
                        : "choice-button"
                    : "choice-button";
                  return (
                    <button
                      key={`${choice}-${index}`}
                      className={cls}
                      onClick={() => pickChallengeChoice(index)}
                      disabled={revealed}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>

              {pickedChoice !== null ? (
                <>
                  <div
                    className={`feedback ${
                      pickedChoice === challenge.correctIndex
                        ? "feedback-correct"
                        : "feedback-wrong"
                    }`}
                  >
                    {pickedChoice === challenge.correctIndex
                      ? `Nailed it! +15 XP. ${challenge.nudge}`
                      : challenge.explanation}
                  </div>
                  <div className="challenge-actions">
                    {pickedChoice === challenge.correctIndex ? (
                      <button
                        className="button"
                        onClick={() => loadChallenge("harder")}
                        disabled={challengeLoading}
                      >
                        Level up — harder one
                      </button>
                    ) : (
                      <button
                        className="button"
                        onClick={() => loadChallenge("easier")}
                        disabled={challengeLoading}
                      >
                        Try an easier one
                      </button>
                    )}
                    <button
                      className="button button-secondary"
                      onClick={() => loadChallenge("similar")}
                      disabled={challengeLoading}
                    >
                      Another like this
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : null}
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

      case "galton-board-sim":
        return (
          <GaltonBoardSim
            rows={Number(params.rows ?? 8)}
            onComplete={markComplete}
          />
        );

      case "spinner-sim":
        return (
          <SpinnerSim
            segments={
              Array.isArray(params.segments)
                ? (params.segments as string[])
                : undefined
            }
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
