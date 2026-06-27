// Brand mascot — "Sentry the fox": a clever gatekeeper whose head is also a
// security shield. Ears = shield corners (dark fox tips), chin = shield point,
// nose = keyhole (the auth cue). Works hero -> favicon.
const SHIELD =
  'M48 24 L70 50 Q85 58 100 54 Q115 58 130 50 L152 24 Q170 50 170 78 C168 126 146 162 100 186 C54 162 32 126 30 78 Q30 50 48 24 Z';

export function Fox({ className = 'dog-illu' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sentry, the AgentAuth fox">
      <title>Sentry</title>
      <defs>
        <linearGradient id="foxfur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4B65C" />
          <stop offset="1" stopColor="#E08A2A" />
        </linearGradient>
      </defs>
      <g id="dog-bob">
        <path d={SHIELD} fill="#2C2733" />
        <g transform="translate(100 100) scale(0.88) translate(-100 -100)">
          <path d={SHIELD} fill="url(#foxfur)" />
        </g>
        {/* dark fox ear tips */}
        <path d="M48 24 L41 41 L60 40 Z" fill="#2C2733" />
        <path d="M152 24 L159 41 L140 40 Z" fill="#2C2733" />
        {/* white cheek + muzzle */}
        <path d="M100 104 C126 104 138 122 133 142 C128 159 112 167 100 168 C88 167 72 159 67 142 C62 122 74 104 100 104 Z" fill="#FBEFD9" />
        {/* eyes with sly fox liner */}
        <g className="dog-eye">
          <ellipse cx="72" cy="94" rx="9" ry="10.5" fill="#2C2733" />
          <circle cx="75" cy="90" r="2.8" fill="#fff" />
          <path d="M80 89 L92 84" stroke="#2C2733" strokeWidth="3.4" strokeLinecap="round" />
        </g>
        <g className="dog-eye">
          <ellipse cx="128" cy="94" rx="9" ry="10.5" fill="#2C2733" />
          <circle cx="131" cy="90" r="2.8" fill="#fff" />
          <path d="M120 89 L108 84" stroke="#2C2733" strokeWidth="3.4" strokeLinecap="round" />
        </g>
        {/* nose + keyhole slot (auth cue) */}
        <g id="dog-key">
          <circle cx="100" cy="120" r="8" fill="#2C2733" />
          <path d="M100 124 L106 146 Q100 151 94 146 Z" fill="#2C2733" />
        </g>
      </g>
    </svg>
  );
}
