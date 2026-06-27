// Brand mascot — "Shield-Sentinel": a friendly guard-dog head that is also a
// security shield. Ears = shield corners, chin = shield point, nose = keyhole (auth cue).
const SHIELD =
  'M48 24 L70 50 Q85 58 100 54 Q115 58 130 50 L152 24 Q170 50 170 78 C168 126 146 162 100 186 C54 162 32 126 30 78 Q30 50 48 24 Z';

export function Dog({ className = 'dog-illu' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Watchdog, the AgentAuth shield mascot">
      <title>Watchdog</title>
      <defs>
        <linearGradient id="fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2BA5E" />
          <stop offset="1" stopColor="#DA8824" />
        </linearGradient>
      </defs>
      <g id="dog-bob">
        <path d={SHIELD} fill="#2C2733" />
        <g transform="translate(100 100) scale(0.88) translate(-100 -100)">
          <path d={SHIELD} fill="url(#fur)" />
        </g>
        {/* inner-ear notches */}
        <path d="M62 38 L73 52 L61 50 Z" fill="#F8E6C6" />
        <path d="M138 38 L127 52 L139 50 Z" fill="#F8E6C6" />
        {/* muzzle */}
        <path d="M100 108 C124 108 135 124 131 143 C126 158 112 166 100 167 C88 166 74 158 69 143 C65 124 76 108 100 108 Z" fill="#F8E6C6" />
        {/* eyes */}
        <g className="dog-eye"><ellipse cx="71" cy="94" rx="9.5" ry="11" fill="#2C2733" /><circle cx="74.5" cy="89.5" r="3" fill="#fff" /></g>
        <g className="dog-eye"><ellipse cx="129" cy="94" rx="9.5" ry="11" fill="#2C2733" /><circle cx="132.5" cy="89.5" r="3" fill="#fff" /></g>
        {/* nose + keyhole slot (auth cue), gently pulsing like it's armed */}
        <g id="dog-key">
          <circle cx="100" cy="120" r="8" fill="#2C2733" />
          <path d="M100 124 L106 146 Q100 151 94 146 Z" fill="#2C2733" />
        </g>
      </g>
    </svg>
  );
}

export function Paw({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="paw" style={{ display: 'block' }}>
      <ellipse cx="6.5" cy="9" rx="2.4" ry="3.1" />
      <ellipse cx="10.4" cy="5.6" rx="2.3" ry="3.1" />
      <ellipse cx="14.6" cy="5.6" rx="2.3" ry="3.1" />
      <ellipse cx="18" cy="9" rx="2.4" ry="3.1" />
      <path d="M12 11.4c3.2 0 5.6 2.1 5.6 4.7 0 2.2-1.9 3.4-4 3.4-0.7 0-1.1-0.3-1.6-0.3s-0.9 0.3-1.6 0.3c-2.1 0-4-1.2-4-3.4 0-2.6 2.4-4.7 5.6-4.7z" />
    </svg>
  );
}
