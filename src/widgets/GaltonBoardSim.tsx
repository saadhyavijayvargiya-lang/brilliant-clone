import { useState } from "react";

interface GaltonBoardSimProps {
  rows?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

function dropBall(rows: number): number {
  let rights = 0;
  for (let i = 0; i < rows; i += 1) {
    if (Math.random() < 0.5) rights += 1;
  }
  return rights;
}

export function GaltonBoardSim({ rows = 8, onComplete }: GaltonBoardSimProps) {
  const binCount = rows + 1;
  const [bins, setBins] = useState<number[]>(() => Array(binCount).fill(0));
  const [total, setTotal] = useState(0);

  function addBalls(count: number) {
    const nextBins = [...bins];
    for (let i = 0; i < count; i += 1) {
      nextBins[dropBall(rows)] += 1;
    }
    setBins(nextBins);
    const nextTotal = total + count;
    setTotal(nextTotal);
    onComplete({ balls: nextTotal, bins: binCount });
  }

  function reset() {
    setBins(Array(binCount).fill(0));
    setTotal(0);
  }

  const maxCount = Math.max(...bins, 1);

  return (
    <div className="interactive-widget galton-widget">
      <div className="galton-pegs" aria-hidden="true">
        {Array.from({ length: Math.min(rows, 7) }, (_, rowIndex) => (
          <div className="galton-peg-row" key={rowIndex}>
            {Array.from({ length: rowIndex + 1 }, (_, pegIndex) => (
              <span className="galton-peg" key={pegIndex} />
            ))}
          </div>
        ))}
      </div>

      <div className="galton-bins" aria-label="Where the balls landed">
        {bins.map((count, index) => (
          <div className="galton-bin" key={index}>
            <div
              className="galton-bar"
              style={{ height: `${Math.max(2, (count / maxCount) * 150)}px` }}
              title={`${count} balls`}
            />
          </div>
        ))}
      </div>

      <div className="widget-stats">
        <span>{total} balls dropped</span>
        <span>Each ball makes {rows} left/right bounces</span>
      </div>
      <div className="widget-actions">
        <button className="button" onClick={() => addBalls(1)}>
          Drop 1 ball
        </button>
        <button className="button" onClick={() => addBalls(200)}>
          Drop 200 balls
        </button>
        <button className="button button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
