'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Fox } from '../../components/Fox';
import { ThemeToggle } from '../../components/ThemeToggle';

const SCOPES = [
  { id: 'email:read', label: 'Read your inbox' },
  { id: 'email:send', label: 'Send email as you' },
  { id: 'calendar:read', label: 'Read your calendar' },
];
const ACTIONS = [
  { id: 'read_inbox', label: 'Read inbox', scope: 'email:read' },
  { id: 'send_email', label: 'Send an email', scope: 'email:send' },
  { id: 'read_calendar', label: 'Check calendar', scope: 'calendar:read' },
];

type Feed = { ok: boolean; title: string; code?: string; body?: unknown };

export default function Demo() {
  const [granted, setGranted] = useState<Record<string, boolean>>({ 'email:read': true });
  const [token, setToken] = useState<string | null>(null);
  const [revoked, setRevoked] = useState(false);
  const [feed, setFeed] = useState<Feed[]>([]);
  const [busy, setBusy] = useState(false);

  const push = (f: Feed) => setFeed((p) => [f, ...p].slice(0, 8));

  async function connect() {
    const scopes = Object.keys(granted).filter((k) => granted[k]);
    if (!scopes.length) return;
    setBusy(true);
    const r = await fetch('/api/connect', { method: 'POST', body: JSON.stringify({ scopes }) });
    const d = await r.json();
    setBusy(false);
    if (r.ok) {
      setToken(d.token);
      setRevoked(false);
      setFeed([]);
      push({ ok: true, title: `Connected research-bot with [${scopes.join(', ')}]` });
    } else push({ ok: false, title: d.error });
  }

  async function runAction(action: string, scope: string) {
    if (!token) return;
    setBusy(true);
    const r = await fetch('/api/agent', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action }),
    });
    const d = await r.json();
    setBusy(false);
    if (r.ok) push({ ok: true, title: `${action} → allowed (${scope})`, body: d.data });
    else push({ ok: false, title: `${action} → denied`, code: `${d.code}${d.requiredScope ? ` · needs ${d.requiredScope}` : ''}` });
  }

  async function revoke() {
    setBusy(true);
    await fetch('/api/revoke', { method: 'POST', body: JSON.stringify({ agent: 'research-bot' }) });
    setBusy(false);
    setRevoked(true);
    push({ ok: false, title: 'Revoked research-bot. Its token still exists, but the server now rejects it.' });
  }

  const status = !token ? 'disconnected' : revoked ? 'revoked' : 'connected';

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/">AgentAuth</Link>
          <nav className="nav-links" aria-label="Main navigation">
            <Link href="/">← Back</Link>
            <ThemeToggle />
            <a className="nav-cta" href="https://github.com/Aankirz/agentauth" target="_blank" rel="noopener">GitHub ★</a>
          </nav>
        </div>
      </header>

      <div className="demo-wrap">
        <div className="demo-hero">
          <Fox className="demo-dog" />
          <h1>Inbox Copilot, guarded by AgentAuth</h1>
          <p>A real implementation. The buttons below hit live API routes that mint, verify, and revoke tokens with the actual library, server-side.</p>
        </div>

        <div className="demo-grid">
          <div className="panel">
            <h2>1 · You grant the agent</h2>
            <p className="sub">Pick what “research-bot” may do on your behalf.</p>
            {SCOPES.map((s) => (
              <label className="scope-row" key={s.id}>
                <input type="checkbox" checked={!!granted[s.id]} onChange={(e) => setGranted((p) => ({ ...p, [s.id]: e.target.checked }))} />
                <code>{s.id}</code>
                <span className="d">{s.label}</span>
              </label>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.8rem' }} onClick={connect} disabled={busy}>
              {token ? 'Re-connect with these scopes' : 'Connect research-bot'}
            </button>
            {token && (
              <>
                <div className="token-box">{token.slice(0, 48)}…{token.slice(-12)}</div>
                <button className="danger-btn" onClick={revoke} disabled={busy || revoked}>Revoke (disconnect agent)</button>
              </>
            )}
          </div>

          <div className="panel">
            <h2>2 · The agent acts</h2>
            <p className="sub">
              Status:{' '}
              <span className={`status ${status === 'connected' ? 'on' : 'off'}`}>
                {status === 'connected' ? '● connected' : status === 'revoked' ? '● revoked' : '○ not connected'}
              </span>
            </p>
            {ACTIONS.map((a) => (
              <button className="action-btn" key={a.id} onClick={() => runAction(a.id, a.scope)} disabled={!token || busy}>
                {a.label}
                <span className="req">needs {a.scope}</span>
              </button>
            ))}
            <div className="result-feed">
              {feed.length === 0 && <div className="feed-item">Connect, then have the agent try an action.</div>}
              {feed.map((f, i) => (
                <div className={`feed-item ${f.ok ? 'ok' : 'err'}`} key={i}>
                  <div>{f.ok ? '✓ ' : '✗ '}{f.title}</div>
                  {f.code && <div className="code">{f.code}</div>}
                  {f.body != null && <pre>{JSON.stringify(f.body, null, 2)}</pre>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
