import { useMemo, useState } from "react";
import { randomStep, runWalk } from "../lib/randomWalk";

interface RunningAverageSimProps {
  trialsPerBatch?: number;
  mode?: "walk" | "die";
  onComplete: (summary: Record<string, number | string>) => void;
}

export function RunningAverageSim({
  trialsPerBatch = 50,
  mode = "walk",
  onComplete,
}: RunningAverageSimProps) {
  const [trials, setTrials] = useState(0);
  const [sum, setSum] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  const average = trials === 0 ? 0 : sum / trials;
  const target = mode === "die" ? 3.5 : 0;

  const recent = useMemo(() => history.slice(-12), [history]);

  function addBatch() {
    let batchSum = 0;
    const batchValues: number[] = [];
    for (let i = 0; i < trialsPerBatch; i += 1) {
      const value =
        mode === "die"
          ? Math.floor(Math.random() * 6) + 1
          : runWalk(20, 0.5);
      batchSum += value;
      batchValues.push(value);
    }

    const nextTrials = trials + trialsPerBatch;
    const nextSum = sum + batchSum;
    const nextAverage = nextSum / nextTrials;
    setTrials(nextTrials);
    setSum(nextSum);
    setHistory((current) => [...current, nextAverage]);
    onComplete({
      trials: nextTrials,
      average: Number(nextAverage.toFixed(2)),
      target,
    });
  }

  function addOneWalkStep() {
    if (mode === "die") return;
    const value = randomStep(0.5);
    const nextTrials = trials + 1;
    const nextSum = sum + value;
    const nextAverage = nextSum / nextTrials;
    setTrials(nextTrials);
    setSum(nextSum);
    setHistory((current) => [...current, nextAverage]);
    onComplete({
      trials: nextTrials,
      average: Number(nextAverage.toFixed(2)),
      target,
    });
  }

  function reset() {
    setTrials(0);
    setSum(0);
    setHistory([]);
  }

  return (
    <div className="interactive-widget average-widget">
      <div className="average-display">
        <div>
          <span>Running average</span>
          <strong>{average.toFixed(2)}</strong>
        </div>
        <div>
          <span>Target EV</span>
          <strong>{target.toFixed(2)}</strong>
        </div>
        <div>
          <span>Trials</span>
          <strong>{trials}</strong>
        </div>
      </div>
      <div className="average-track" aria-label="Running average history">
        {recent.length === 0 ? (
          <span className="empty-track">Add trials to see the average settle.</span>
        ) : (
          recent.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="average-dot"
              style={{
                left: `${(index / Math.max(1, recent.length - 1)) * 100}%`,
                top: `${50 - Math.max(-45, Math.min(45, (value - target) * 12))}%`,
              }}
              title={value.toFixed(2)}
            />
          ))
        )}
      </div>
      <div className="widget-actions">
        {mode === "walk" ? (
          <button className="button button-secondary" onClick={addOneWalkStep}>
            Add one ±1 step
          </button>
        ) : null}
        <button className="button" onClick={addBatch}>
          Add {trialsPerBatch} trials
        </button>
        <button className="button button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
