'use client';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    setTheme((document.documentElement.getAttribute('data-theme') as 'light' | 'dark') || 'light');
  }, []);
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('aa-theme', next); } catch {}
    setTheme(next);
  };
  return (
    <button className="theme-toggle" aria-label="Toggle dark mode" onClick={flip}>
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}
