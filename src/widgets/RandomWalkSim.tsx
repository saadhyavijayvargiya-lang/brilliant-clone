import { useMemo, useState } from "react";

interface RandomWalkSimProps {
  stepsRequired?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

export function RandomWalkSim({ stepsRequired = 10, onComplete }: RandomWalkSimProps) {
  const [steps, setSteps] = useState<number[]>([]);
  const position = steps.reduce((sum, step) => sum + step, 0);
  const path = useMemo(
    () =>
      steps.reduce<number[]>(
        (positions, step) => [...positions, positions[positions.length - 1] + step],
        [0]
      ),
    [steps]
  );

  function takeStep(step: 1 | -1) {
    if (steps.length >= stepsRequired) return;
    const nextSteps = [...steps, step];
    setSteps(nextSteps);
    if (nextSteps.length === stepsRequired) {
      onComplete({
        finalPosition: nextSteps.reduce((sum, current) => sum + current, 0),
        steps: stepsRequired,
      });
    }
  }

  function reset() {
    setSteps([]);
  }

  return (
    <div className="interactive-widget">
      <div className="number-line" aria-label="Random walk number line">
        {Array.from({ length: 21 }, (_, index) => index - 10).map((tick) => (
          <span key={tick} className="tick" style={{ left: `${(tick + 10) * 5}%` }}>
            {tick % 5 === 0 ? tick : ""}
          </span>
        ))}
        <div
          className="walker"
          style={{ left: `${Math.max(0, Math.min(100, (position + 10) * 5))}%` }}
          aria-label={`Current position ${position}`}
        />
      </div>
      <div className="walk-path">
        {path.map((pos, index) => (
          <span key={`${pos}-${index}`} className="path-chip">
            {pos}
          </span>
        ))}
      </div>
      <div className="widget-stats">
        <span>Position: {position}</span>
        <span>
          Steps: {steps.length}/{stepsRequired}
        </span>
      </div>
      <div className="widget-actions">
        <button className="button" onClick={() => takeStep(1)}>
          Heads (+1)
        </button>
        <button className="button button-secondary" onClick={() => takeStep(-1)}>
          Tails (-1)
        </button>
        <button className="button button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
