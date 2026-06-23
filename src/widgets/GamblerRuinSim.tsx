import { useState } from "react";
import { randomStep } from "../lib/randomWalk";

interface GamblerRuinSimProps {
  trials?: number;
  start?: number;
  goal?: number;
  p?: number;
  onComplete: (summary: Record<string, number | string>) => void;
}

export function GamblerRuinSim({
  trials = 300,
  start = 5,
  goal = 10,
  p = 0.5,
  onComplete,
}: GamblerRuinSimProps) {
  const [startCapital, setStartCapital] = useState(start);
  const [winChance, setWinChance] = useState(p);
  const [summary, setSummary] = useState({ ruin: 0, win: 0, avgSteps: 0 });

  function runTrials() {
    let ruin = 0;
    let win = 0;
    let totalSteps = 0;

    for (let trial = 0; trial < trials; trial += 1) {
      let capital = startCapital;
      let steps = 0;
      while (capital > 0 && capital < goal && steps < 1000) {
        capital += randomStep(winChance);
        steps += 1;
      }
      totalSteps += steps;
      if (capital <= 0) ruin += 1;
      if (capital >= goal) win += 1;
    }

    const nextSummary = {
      ruin,
      win,
      avgSteps: Number((totalSteps / trials).toFixed(1)),
    };
    setSummary(nextSummary);
    onComplete({
      ruinRate: Number((ruin / trials).toFixed(2)),
      winRate: Number((win / trials).toFixed(2)),
      avgSteps: nextSummary.avgSteps,
    });
  }

  const ruinPct = Math.round((summary.ruin / trials) * 100);
  const winPct = Math.round((summary.win / trials) * 100);

  return (
    <div className="interactive-widget ruin-widget">
      <label className="range-label">
        <span>Starting capital: {startCapital}</span>
        <input
          type="range"
          min="1"
          max={goal - 1}
          step="1"
          value={startCapital}
          onChange={(event) => setStartCapital(Number(event.target.value))}
        />
      </label>
      <label className="range-label">
        <span>Chance of winning each bet: {winChance.toFixed(2)}</span>
        <input
          type="range"
          min="0.35"
          max="0.65"
          step="0.01"
          value={winChance}
          onChange={(event) => setWinChance(Number(event.target.value))}
        />
      </label>
      <div className="ruin-bars">
        <div>
          <span>Ruin</span>
          <strong>{ruinPct}%</strong>
          <div className="ruin-meter">
            <span style={{ width: `${ruinPct}%` }} />
          </div>
        </div>
        <div>
          <span>Goal hit</span>
          <strong>{winPct}%</strong>
          <div className="ruin-meter ruin-meter-win">
            <span style={{ width: `${winPct}%` }} />
          </div>
        </div>
      </div>
      <div className="widget-stats">
        <span>{trials} simulated games</span>
        <span>Average length: {summary.avgSteps} bets</span>
      </div>
      <button className="button" onClick={runTrials}>
        Run ruin simulation
      </button>
    </div>
  );
}
