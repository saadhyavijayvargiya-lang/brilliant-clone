import { Link, NavLink } from "react-router-dom";
import type { User } from "firebase/auth";
import type { AppProgress } from "../types/content";

interface TopBarProps {
  progress: AppProgress;
  user: User | null;
  onSignOut: () => void;
}

export function TopBar({ progress, user, onSignOut }: TopBarProps) {
  return (
    <header className="topbar">
      <Link to="/" className="brand" aria-label="Pathwise home">
        <span className="brand-mark">P</span>
        <span>Pathwise</span>
      </Link>
      <nav className="topnav" aria-label="Primary navigation">
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        {user ? (
          <button className="link-button" onClick={onSignOut}>
            Sign out
          </button>
        ) : (
          <NavLink to="/auth">Sign in</NavLink>
        )}
      </nav>
      <div className="streak-pill" title="Current local streak">
        <span aria-hidden="true">◆</span>
        {progress.streakCount} day streak
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
