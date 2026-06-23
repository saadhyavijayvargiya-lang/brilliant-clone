import { useEffect, useMemo, useState } from "react";

interface TargetPathSimProps {
  start?: number;
  target?: number;
  moves?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

export function TargetPathSim({
  start = 0,
  target = 3,
  moves = 5,
  onComplete,
}: TargetPathSimProps) {
  const [steps, setSteps] = useState<number[]>([]);
  const [playIndex, setPlayIndex] = useState(0);
  const path = useMemo(
    () =>
      steps.reduce<number[]>(
        (positions, step) => [...positions, positions[positions.length - 1] + step],
        [start]
      ),
    [start, steps]
  );
  const final = path[path.length - 1];
  const playingPosition = path[Math.min(playIndex, path.length - 1)] ?? start;

  useEffect(() => {
    if (path.length <= 1) return;
    const timer = window.setInterval(() => {
      setPlayIndex((index) => (index >= path.length - 1 ? 0 : index + 1));
    }, 420);
    return () => window.clearInterval(timer);
  }, [path.length]);

  function addStep(step: 1 | -1) {
    if (steps.length >= moves) return;
    const nextSteps = [...steps, step];
    setSteps(nextSteps);
    setPlayIndex(0);
    const nextFinal = nextSteps.reduce((sum, current) => sum + current, start);
    if (nextSteps.length === moves && nextFinal === target) {
      onComplete({ final: nextFinal, target, moves });
    }
  }

  function reset() {
    setSteps([]);
    setPlayIndex(0);
  }

  const min = Math.min(-5, start, target, ...path) - 1;
  const max = Math.max(5, start, target, ...path) + 1;
  const range = max - min || 1;
  const positionPct = ((playingPosition - min) / range) * 100;
  const targetPct = ((target - min) / range) * 100;

  return (
    <div className="interactive-widget target-widget">
      <div className="target-copy">
        <strong>Start at {start}</strong>
        <span>Use exactly {moves} moves to land on {target}.</span>
      </div>
      <div className="target-stage" aria-label="Animated path to target">
        <div className="target-line" />
        <span className="target-flag" style={{ left: `${targetPct}%` }}>
          target {target}
        </span>
        <span className="target-runner" style={{ left: `${positionPct}%` }}>
          {playingPosition}
        </span>
      </div>
      <div className="walk-path">
        {path.map((pos, index) => (
          <span
            key={`${pos}-${index}`}
            className={`path-chip ${index === playIndex ? "path-chip-active" : ""}`}
          >
            {pos}
          </span>
        ))}
      </div>
      <div className="widget-stats">
        <span>
          Moves: {steps.length}/{moves}
        </span>
        <span>Final: {final}</span>
      </div>
      <div className="widget-actions">
        <button className="button" onClick={() => addStep(1)}>
          Add +1
        </button>
        <button className="button button-secondary" onClick={() => addStep(-1)}>
          Add -1
        </button>
        <button className="button button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      {steps.length === moves && final !== target ? (
        <div className="feedback feedback-wrong">
          You landed at {final}. Reset and try another path to hit {target}.
        </div>
      ) : null}
    </div>
  );
}
