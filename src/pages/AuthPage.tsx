import { FormEvent, useState } from "react";
import type { User } from "firebase/auth";

interface AuthPageProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  onEmailSignIn: (email: string, password: string) => Promise<void>;
  onEmailSignUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

export function AuthPage({
  user,
  loading,
  error,
  onEmailSignIn,
  onEmailSignUp,
  onGoogleSignIn,
  onSignOut,
}: AuthPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "signup") {
      await onEmailSignUp(email, password, displayName);
      return;
    }
    await onEmailSignIn(email, password);
  }

  if (loading) {
    return (
      <main className="page narrow-page">
        <section className="panel">
          <h1>Checking session...</h1>
        </section>
      </main>
    );
  }

  if (user) {
    return (
      <main className="page narrow-page">
        <section className="panel">
          <div className="eyebrow">Signed in</div>
          <h1>{user.displayName ?? user.email ?? "Learner"}</h1>
          <p>Your progress will sync to Firebase when Firestore rules and Auth are enabled.</p>
          <button className="button" onClick={onSignOut}>
            Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="page narrow-page">
      <section className="panel">
        <div className="eyebrow">Firebase Auth</div>
        <h1>{mode === "signin" ? "Welcome back" : "Create account"}</h1>
        <p>
          Sign in to sync progress across devices. If Auth providers are not
          enabled yet, local progress still works.
        </p>
        {error ? <div className="feedback feedback-wrong">{error}</div> : null}
        <form className="auth-form" onSubmit={submit}>
          {mode === "signup" ? (
            <label>
              <span>Name</span>
              <input
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Alex"
              />
            </label>
          ) : null}
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />
          </label>
          <button className="button" type="submit">
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <div className="auth-actions">
          <button className="button button-secondary" onClick={onGoogleSignIn}>
            Continue with Google
          </button>
          <button
            className="link-button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </section>
    </main>
  );
}
