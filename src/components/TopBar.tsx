import { Link, NavLink } from "react-router-dom";
import type { AppProgress } from "../types/content";

interface TopBarProps {
  progress: AppProgress;
}

export function TopBar({ progress }: TopBarProps) {
  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Pathwise home">
        <span className="brand-mark">P</span>
        <span>Pathwise</span>
      </Link>
      <nav className="topnav" aria-label="Primary navigation">
        <NavLink to="/course">Course</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
      <div className="streak-pill" title="Current local streak">
        <span aria-hidden="true">◆</span>
        {progress.streakCount} day streak
      </div>
    </header>
  );
}
