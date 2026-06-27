// Brand mark — "Sentry": a security shield whose negative space is a fox face,
// with a keyhole nose (the auth cue). Shield = security, fox = clever gatekeeper,
// keyhole = authorization. Reads at hero size down to a favicon.
export function Fox({ className = 'dog-illu' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sentry, the AgentAuth shield-fox mark">
      <title>AgentAuth</title>
      <g id="dog-bob">
        {/* shield */}
        <path fill="#E08A3A" d="M168 78 L344 78 Q380 78 380 114 L380 268 C380 358 330 408 256 446 C182 408 132 358 132 268 L132 114 Q132 78 168 78 Z" />
        {/* fox face (negative-space reveal) */}
        <path fill="#FBEFD9" d="M198 128 L219 188 Q256 202 293 188 L314 128 C331 157 337 207 327 248 C319 305 290 348 256 372 C222 348 193 305 185 248 C175 207 181 157 198 128 Z" />
        {/* eyes (shield showing through) */}
        <circle cx="226" cy="214" r="11" fill="#E08A3A" />
        <circle cx="286" cy="214" r="11" fill="#E08A3A" />
        {/* keyhole nose — the auth cue */}
        <g id="dog-key">
          <circle cx="256" cy="252" r="17" fill="#E08A3A" />
          <path d="M256 260 L271 308 Q256 316 241 308 Z" fill="#E08A3A" />
        </g>
      </g>
    </svg>
  );
}
