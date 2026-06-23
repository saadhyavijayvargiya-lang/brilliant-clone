import type { AppProgress } from "../types/content";

interface ProfilePageProps {
  progress: AppProgress;
}

export function ProfilePage({ progress }: ProfilePageProps) {
  return (
    <main className="page narrow-page">
      <section className="panel">
        <div className="eyebrow">Local profile</div>
        <h1>{progress.displayName}</h1>
        <p>
          Firebase Auth is scaffolded, but this first app slice stores progress
          locally so the lesson flow can be tested before wiring accounts.
        </p>
        <div className="stats-grid">
          <div>
            <strong>{progress.streakCount}</strong>
            <span>day streak</span>
          </div>
          <div>
            <strong>{progress.completedLessons.length}</strong>
            <span>lessons done</span>
          </div>
          <div>
            <strong>{progress.lastActiveDate ?? "—"}</strong>
            <span>last active</span>
          </div>
        </div>
      </section>
    </main>
  );
}
