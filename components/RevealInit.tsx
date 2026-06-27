'use client';
import { useEffect } from 'react';

// Adds scroll-reveal entrances. Content is visible by default (no-JS / SEO safe);
// only once JS marks <html> reveal-ready do .reveal elements start hidden and fade up.
export function RevealInit() {
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('reveal-ready');
    const els = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
