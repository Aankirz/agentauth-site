'use client';
import { useState } from 'react';

export function CopyWidget({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="install-widget">
      <span className="install-prompt">$</span>
      <code>{text}</code>
      <button className="install-copy" onClick={copy} aria-label="Copy to clipboard">
        {copied ? '✓' : 'copy'}
      </button>
    </div>
  );
}
