import { useMemo, useState } from "react";
import { expectedPosition, runPath } from "../lib/randomWalk";

interface BiasSliderSimProps {
  defaultP?: number;
  steps?: number;
  paths?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

export function BiasSliderSim({
  defaultP = 0.6,
  steps = 100,
  paths = 30,
  onComplete,
}: BiasSliderSimProps) {
  const [pUp, setPUp] = useState(defaultP);
  const [version, setVersion] = useState(0);

  const walkPaths = useMemo(
    () => Array.from({ length: paths }, () => runPath(steps, pUp)),
    [pUp, paths, steps, version]
  );
  const expected = expectedPosition(steps, pUp);
  const yLimit = Math.max(20, Math.ceil(Math.abs(expected) + Math.sqrt(steps) * 3));

  function xFor(index: number) {
    return (index / steps) * 100;
  }

  function yFor(value: number) {
    return 50 - (value / yLimit) * 45;
  }

  function runAgain() {
    setVersion((current) => current + 1);
    onComplete({
      p: Number(pUp.toFixed(2)),
      expected: Number(expected.toFixed(1)),
      paths,
    });
  }

  return (
    <div className="interactive-widget">
      <label className="range-label">
        <span>Probability of +1: {pUp.toFixed(2)}</span>
        <input
          type="range"
          min="0.5"
          max="0.9"
          step="0.01"
          value={pUp}
          onChange={(event) => {
            const nextP = Number(event.target.value);
            setPUp(nextP);
            onComplete({
              p: Number(nextP.toFixed(2)),
              expected: Number(expectedPosition(steps, nextP).toFixed(1)),
              paths,
            });
          }}
        />
      </label>
      <svg className="path-plot" viewBox="0 0 100 100" role="img" aria-label="Biased random walk paths">
        <line x1="0" y1="50" x2="100" y2="50" className="plot-axis" />
        <line
          x1="0"
          y1="50"
          x2="100"
          y2={yFor(expected)}
          className="expected-line"
        />
        {walkPaths.map((path, pathIndex) => (
          <polyline
            key={`${version}-${pathIndex}`}
            className="walk-polyline"
            points={path
              .map((position, index) => `${xFor(index)},${yFor(position)}`)
              .join(" ")}
          />
        ))}
      </svg>
      <div className="widget-stats">
        <span>Expected final position: {expected.toFixed(1)}</span>
        <span>{paths} paths</span>
      </div>
      <button className="button" onClick={runAgain}>
        Run new paths
      </button>
    </div>
  );
}
