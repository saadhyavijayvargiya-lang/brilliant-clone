interface LogoProps {
  showWordmark?: boolean;
}

export function Logo({ showWordmark = true }: LogoProps) {
  return (
    <span className="logo">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img" aria-label="Pathwise">
          <defs>
            <linearGradient id="logoBadge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7c6cf0" />
              <stop offset="55%" stopColor="#5b4bd4" />
              <stop offset="100%" stopColor="#0c6471" />
            </linearGradient>
            <linearGradient id="logoPath" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#00f0d4" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <radialGradient id="logoGlow" cx="50%" cy="38%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#logoBadge)" />
          <rect
            x="2.75"
            y="2.75"
            width="42.5"
            height="42.5"
            rx="12.25"
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
          <ellipse cx="24" cy="17" rx="16" ry="11" fill="url(#logoGlow)" />

          <polyline
            points="9,33 17,24 23,30 31,15 39,21"
            fill="none"
            stroke="url(#logoPath)"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="9" cy="33" r="3" fill="#ffffff" />
          <circle cx="23" cy="30" r="2.6" fill="#bff7ee" />
          <circle cx="39" cy="21" r="3.4" fill="#00f0d4" />
          <circle cx="39" cy="21" r="6.2" fill="none" stroke="rgba(0,240,212,0.45)" strokeWidth="1.4" />
        </svg>
      </span>
      {showWordmark ? <span className="logo-word">Pathwise</span> : null}
    </span>
  );
}
