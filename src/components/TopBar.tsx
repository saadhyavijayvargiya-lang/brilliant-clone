import { Link, NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import type { AppProgress } from "../types/content";
import { useMemo, useState } from "react";
import { Logo } from "./Logo";

interface TopBarProps {
  progress: AppProgress;
  user: User | null;
  onSignOut: () => void;
}

export function TopBar({ progress, user, onSignOut }: TopBarProps) {
  const [showHistory, setShowHistory] = useState(false);
  const activeDateSet = useMemo(
    () => new Set(progress.activeDates ?? []),
    [progress.activeDates]
  );
  const days = useMemo(() => getPastYearDays(), []);

  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Pathwise home">
        <Logo />
      </Link>
      <nav className="topnav" aria-label="Primary navigation">
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {user ? (
          <button className="link-button nav-action" onClick={onSignOut}>
            Sign out
          </button>
        ) : (
          <NavLink to="/auth">Sign in</NavLink>
        )}
      </nav>
      <div className="streak-wrap">
        <button
          className="streak-pill"
          title="Show last 365 days"
          onClick={() => setShowHistory((current) => !current)}
        >
          <span aria-hidden="true">◆</span>
          {progress.streakCount} day streak
        </button>
        {showHistory ? (
          <div className="streak-popover">
            <div className="streak-popover-head">
              <strong>Last 365 days</strong>
              <span>{activeDateSet.size} active days</span>
            </div>
            <div className="activity-grid" aria-label="365 day activity history">
              {days.map((day) => (
                <span
                  key={day}
                  className={`activity-day ${activeDateSet.has(day) ? "activity-day-on" : ""}`}
                  title={`${day}: ${activeDateSet.has(day) ? "showed up" : "missed"}`}
                />
              ))}
            </div>
            <div className="activity-legend">
              <span>Missed</span>
              <span className="activity-day activity-day-on" />
              <span>Showed up</span>
            </div>
          </div>
        ) : null}
      </div>
      <NavLink className="profile-orb-link" to="/profile" aria-label="Profile">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="" />
        ) : (
          <span>{(user?.displayName ?? progress.displayName ?? "L")[0]}</span>
        )}
      </NavLink>
    </header>
  );
}

function getPastYearDays(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i -= 1) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    days.push(day.toISOString().slice(0, 10));
  }
  return days;
}
