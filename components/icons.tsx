export function GitHubIcon({ className = 'gh-icon' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.73-1.34-1.73-1.09-.73.08-.72.08-.72 1.21.08 1.84 1.22 1.84 1.22 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21.96-.26 1.98-.39 3-.4 1.02.01 2.04.14 3 .4 2.28-1.53 3.29-1.21 3.29-1.21.66 1.64.25 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.22.68.83.56C20.57 21.88 24 17.48 24 12.29 24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

const S = { fill: 'none', stroke: 'var(--honey-deep)', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function IconChoose() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M10 6h10M10 12h10M10 18h10" />
      <path d="M3.5 6l1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17" />
    </svg>
  );
}
export function IconPass() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 3l7 2.6v5.2c0 4.3-2.9 7.1-7 8.4-4.1-1.3-7-4.1-7-8.4V5.6L12 3z" />
      <path d="M9.2 12l1.9 1.9 3.7-3.9" />
    </svg>
  );
}
export function IconRevoke() {
  return (
    <svg viewBox="0 0 24 24" {...S}>
      <path d="M12 3.5v7" />
      <path d="M7 6.5a7 7 0 1 0 10 0" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="oklch(72% 0.16 150 / 0.2)" />
      <path d="M8 12.5l2.5 2.5 5-5.5" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Cross() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="oklch(63% 0.2 25 / 0.16)" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
