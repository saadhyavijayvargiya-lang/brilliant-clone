import { useState } from "react";

interface MarkovChainSimProps {
  days?: number;
  sunnyToSunny?: number;
  rainyToRainy?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

type WeatherState = "Sunny" | "Rainy";

export function MarkovChainSim({
  days = 10,
  sunnyToSunny = 0.75,
  rainyToRainy = 0.6,
  onComplete,
}: MarkovChainSimProps) {
  const [sunStickiness, setSunStickiness] = useState(sunnyToSunny);
  const [rainStickiness, setRainStickiness] = useState(rainyToRainy);
  const [path, setPath] = useState<WeatherState[]>(["Sunny"]);

  function runChain() {
    const nextPath: WeatherState[] = ["Sunny"];
    for (let i = 1; i < days; i += 1) {
      const current = nextPath[nextPath.length - 1];
      if (current === "Sunny") {
        nextPath.push(Math.random() < sunStickiness ? "Sunny" : "Rainy");
      } else {
        nextPath.push(Math.random() < rainStickiness ? "Rainy" : "Sunny");
      }
    }
    setPath(nextPath);
    onComplete({
      sunnyToSunny: Number(sunStickiness.toFixed(2)),
      rainyToRainy: Number(rainStickiness.toFixed(2)),
      rainyDays: nextPath.filter((state) => state === "Rainy").length,
    });
  }

  return (
    <div className="interactive-widget markov-widget">
      <div className="state-diagram" aria-label="Two-state Markov chain">
        <div className="state-node state-sunny">Sunny</div>
        <div className="transition-copy">
          <span>Sunny → Sunny: {sunStickiness.toFixed(2)}</span>
          <span>Rainy → Rainy: {rainStickiness.toFixed(2)}</span>
        </div>
        <div className="state-node state-rainy">Rainy</div>
      </div>

      <label className="range-label">
        <span>Sunny stickiness</span>
        <input
          type="range"
          min="0.1"
          max="0.95"
          step="0.01"
          value={sunStickiness}
          onChange={(event) => setSunStickiness(Number(event.target.value))}
        />
      </label>
      <label className="range-label">
        <span>Rainy stickiness</span>
        <input
          type="range"
          min="0.1"
          max="0.95"
          step="0.01"
          value={rainStickiness}
          onChange={(event) => setRainStickiness(Number(event.target.value))}
        />
      </label>

      <div className="weather-path">
        {path.map((state, index) => (
          <span
            key={`${state}-${index}`}
            className={`weather-day ${state === "Sunny" ? "weather-sunny" : "weather-rainy"}`}
          >
            <small>Day {index + 1}</small>
            {state === "Sunny" ? "☀" : "☂"}
          </span>
        ))}
      </div>

      <button className="button" onClick={runChain}>
        Run chain
      </button>
    </div>
  );
}
