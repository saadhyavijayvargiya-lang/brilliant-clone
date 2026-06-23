import { useMemo, useState } from "react";
import { buildHistogram, runManyTrials } from "../lib/randomWalk";

interface HistogramSimProps {
  defaultSteps?: number;
  trials?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

export function HistogramSim({
  defaultSteps = 40,
  trials = 1000,
  onComplete,
}: HistogramSimProps) {
  const [stepCount, setStepCount] = useState(defaultSteps);
  const [results, setResults] = useState<number[]>(() =>
    runManyTrials(trials, defaultSteps)
  );

  const histogram = useMemo(() => buildHistogram(results, 2), [results]);
  const maxCount = Math.max(...histogram.map((bin) => bin.count), 1);
  const mean =
    results.length === 0
      ? 0
      : results.reduce((sum, result) => sum + result, 0) / results.length;

  function runTrials(nextStepCount = stepCount) {
    const nextResults = runManyTrials(trials, nextStepCount);
    setResults(nextResults);
    onComplete({
      steps: nextStepCount,
      trials,
      mean: Number(mean.toFixed(2)),
    });
  }

  return (
    <div className="interactive-widget">
      <label className="range-label">
        <span>Steps per walk: {stepCount}</span>
        <input
          type="range"
          min="10"
          max="500"
          step="10"
          value={stepCount}
          onChange={(event) => {
            const nextStepCount = Number(event.target.value);
            setStepCount(nextStepCount);
            runTrials(nextStepCount);
          }}
        />
      </label>
      <div className="histogram" aria-label="Terminal position histogram">
        {histogram.map((bin) => (
          <div key={bin.binStart} className="histogram-bin">
            <div
              className="histogram-bar"
              style={{ height: `${Math.max(6, (bin.count / maxCount) * 160)}px` }}
              title={`${bin.binStart}: ${bin.count}`}
            />
          </div>
        ))}
      </div>
      <div className="widget-stats">
        <span>{trials} trials</span>
        <span>Mean: {mean.toFixed(2)}</span>
        <span>Typical spread ≈ √{stepCount} = {Math.sqrt(stepCount).toFixed(1)}</span>
      </div>
      <button className="button" onClick={() => runTrials()}>
        Run trials again
      </button>
    </div>
  );
}
