import { useState } from "react";

interface SpinnerSimProps {
  segments?: string[];
  onComplete: (summary: Record<string, number | string>) => void;
}

const palette = ["#6c5ce7", "#00cec9", "#ff7675", "#f9d976", "#74b9ff", "#a29bfe"];

export function SpinnerSim({
  segments = ["Red", "Blue", "Green", "Yellow"],
  onComplete,
}: SpinnerSimProps) {
  const [angle, setAngle] = useState(0);
  const [tallies, setTallies] = useState<number[]>(() =>
    Array(segments.length).fill(0)
  );
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState<number | null>(null);

  const sliceAngle = 360 / segments.length;
  const gradient = segments
    .map((_, index) => {
      const color = palette[index % palette.length];
      return `${color} ${index * sliceAngle}deg ${(index + 1) * sliceAngle}deg`;
    })
    .join(", ");

  function spin(times = 1) {
    let nextTallies = [...tallies];
    let landedIndex = last ?? 0;
    for (let i = 0; i < times; i += 1) {
      landedIndex = Math.floor(Math.random() * segments.length);
      nextTallies[landedIndex] += 1;
    }
    const extraTurns = 360 * 4;
    const landedCenter = landedIndex * sliceAngle + sliceAngle / 2;
    setAngle((current) => current + extraTurns + ((360 - (current % 360)) - landedCenter));
    setTallies(nextTallies);
    setLast(landedIndex);
    const nextTotal = total + times;
    setTotal(nextTotal);
    onComplete({ spins: nextTotal, segments: segments.length });
  }

  function reset() {
    setTallies(Array(segments.length).fill(0));
    setTotal(0);
    setLast(null);
  }

  return (
    <div className="interactive-widget spinner-widget">
      <div className="spinner-stage">
        <div className="spinner-pointer" aria-hidden="true" />
        <div
          className="spinner-wheel"
          style={{
            background: `conic-gradient(${gradient})`,
            transform: `rotate(${angle}deg)`,
          }}
          aria-hidden="true"
        />
      </div>

      <div className="spinner-tallies">
        {segments.map((label, index) => (
          <div className="spinner-tally" key={label}>
            <span
              className="spinner-swatch"
              style={{ background: palette[index % palette.length] }}
            />
            <strong>{label}</strong>
            <span>
              {tallies[index]}
              {total > 0
                ? ` (${Math.round((tallies[index] / total) * 100)}%)`
                : ""}
            </span>
          </div>
        ))}
      </div>

      <div className="widget-stats">
        <span>{total} spins</span>
        <span>{last !== null ? `Last: ${segments[last]}` : "Spin to begin"}</span>
      </div>
      <div className="widget-actions">
        <button className="button" onClick={() => spin(1)}>
          Spin once
        </button>
        <button className="button" onClick={() => spin(50)}>
          Spin 50×
        </button>
        <button className="button button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
