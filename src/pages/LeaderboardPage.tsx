import { getLeaderboard, getLoginLeaderboard } from "../lib/achievements";
import type { AppProgress } from "../types/content";

interface LeaderboardPageProps {
  progress: AppProgress;
}

export function LeaderboardPage({ progress }: LeaderboardPageProps) {
  const correctBoard = getLeaderboard(progress);
  const loginBoard = getLoginLeaderboard(progress);

  return (
    <main className="page leaderboard-page">
      <section className="courses-hero">
        <div className="eyebrow">Leaderboard</div>
        <h1>Keep the streak alive.</h1>
        <p>
          Compare correct-answer streaks and login streaks. Sample learners keep
          the board lively while your real stats update as you work.
        </p>
      </section>
      <div className="leaderboard-grid">
        <LeaderboardTable title="Longest correct streak" rows={correctBoard} metric="correctStreak" />
        <LeaderboardTable title="Longest login streak" rows={loginBoard} metric="loginStreak" />
      </div>
    </main>
  );
}

interface Row {
  name: string;
  correctStreak: number;
  loginStreak: number;
  isCurrentUser?: boolean;
}

function LeaderboardTable({
  title,
  rows,
  metric,
}: {
  title: string;
  rows: Row[];
  metric: "correctStreak" | "loginStreak";
}) {
  return (
    <section className="panel leaderboard-card">
      <h2>{title}</h2>
      <ol>
        {rows.map((row, index) => (
          <li key={`${row.name}-${metric}`} className={row.isCurrentUser ? "you-row" : ""}>
            <span className="rank">#{index + 1}</span>
            <span>{row.name}</span>
            <strong>{row[metric]}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
