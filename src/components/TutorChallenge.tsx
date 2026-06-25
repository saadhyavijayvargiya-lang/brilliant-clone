import { useState } from "react";
import { generateChallenge } from "../lib/aiTutor";
import type { Challenge, ChallengeDifficulty } from "../lib/aiTutor";

interface TutorChallengeProps {
  lessonTitle: string;
  conceptSummary?: string;
  question: string;
  correctIdea: string;
  userAnswer?: string;
  onAwardXp?: (amount: number) => void;
  triggerLabel?: string;
}

export function TutorChallenge({
  lessonTitle,
  conceptSummary,
  question,
  correctIdea,
  userAnswer = "",
  onAwardXp,
  triggerLabel = "✦ Tutor Challenge — practice this until it clicks",
}: TutorChallengeProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>("similar");
  const [wins, setWins] = useState(0);

  async function load(nextDifficulty: ChallengeDifficulty) {
    setLoading(true);
    setError(null);
    setChallenge(null);
    setPicked(null);
    setDifficulty(nextDifficulty);
    try {
      const next = await generateChallenge({
        lessonTitle,
        conceptSummary,
        question,
        userAnswer,
        correctIdea,
        difficulty: nextDifficulty,
      });
      setChallenge(next);
    } catch {
      setError(
        "The AI tutor isn't switched on yet. Once Firebase AI Logic is enabled for this project, you'll get fresh tailored challenges here."
      );
    } finally {
      setLoading(false);
    }
  }

  function pick(index: number) {
    if (picked !== null || !challenge) return;
    setPicked(index);
    if (index === challenge.correctIndex) {
      setWins((value) => value + 1);
      onAwardXp?.(15);
    }
  }

  return (
    <div className="tutor-block">
      {!challenge && !error ? (
        <button
          className="button button-secondary tutor-button"
          onClick={() => load("similar")}
          disabled={loading}
        >
          {loading ? "Spinning up a challenge…" : triggerLabel}
        </button>
      ) : null}

      {error ? (
        <div className="tutor-note tutor-note-error">
          <span className="tutor-note-label">AI tutor</span>
          <p>{error}</p>
        </div>
      ) : null}

      {challenge ? (
        <div className="challenge-card">
          <div className="challenge-head">
            <span className="tutor-note-label">
              ✦ Tutor Challenge{wins > 0 ? ` · ${wins} nailed` : ""}
            </span>
            <span className="challenge-diff">{difficulty}</span>
          </div>
          {challenge.insight ? (
            <p className="challenge-insight">{challenge.insight}</p>
          ) : null}
          <p className="challenge-question">{challenge.question}</p>
          <div className="answer-panel">
            {challenge.choices.map((choice, index) => {
              const revealed = picked !== null;
              const isAnswer = challenge.correctIndex === index;
              const isPicked = picked === index;
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
                  onClick={() => pick(index)}
                  disabled={revealed}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {picked !== null ? (
            <>
              <div
                className={`feedback ${
                  picked === challenge.correctIndex
                    ? "feedback-correct"
                    : "feedback-wrong"
                }`}
              >
                {picked === challenge.correctIndex
                  ? `Nailed it! +15 XP. ${challenge.nudge}`
                  : challenge.explanation}
              </div>
              <div className="challenge-actions">
                {picked === challenge.correctIndex ? (
                  <button
                    className="button"
                    onClick={() => load("harder")}
                    disabled={loading}
                  >
                    Level up — harder one
                  </button>
                ) : (
                  <button
                    className="button"
                    onClick={() => load("easier")}
                    disabled={loading}
                  >
                    Try an easier one
                  </button>
                )}
                <button
                  className="button button-secondary"
                  onClick={() => load("similar")}
                  disabled={loading}
                >
                  Another like this
                </button>
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
