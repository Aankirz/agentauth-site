import Link from 'next/link';
import { Dog, Paw } from '../components/Dog';
import { ThemeToggle } from '../components/ThemeToggle';

const GH = 'https://github.com/Aankirz/agentauth';

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/"><span className="mark"><Paw size={28} color="var(--honey-deep)" /></span>AgentAuth</Link>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#how">How it works</a>
            <a href="#why">Why</a>
            <Link href="/demo">Demo</Link>
            <ThemeToggle />
            <a className="nav-cta" href={GH} target="_blank" rel="noopener">GitHub ★</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="badge-tag"><Paw size={15} color="var(--honey-deep)" /> Open source · MIT · zero-dep core</span>
              <h1>The <span className="hl">watchdog</span> for your AI agents.</h1>
              <p className="lede">Every agent shows its badge at the gate. Only the scopes you approved get through, and you can call it off anytime.</p>
              <div className="chips">
                <span className="chip"><b>issue</b> · verify · revoke</span>
                <span className="chip">15-min leash</span>
                <span className="chip">MCP-ready</span>
              </div>
              <div className="cta-row">
                <Link className="btn btn-primary" href="/demo">Try the live demo</Link>
                <a className="btn btn-ghost" href={GH} target="_blank" rel="noopener">View on GitHub</a>
              </div>
            </div>
            <div className="hero-art">
              <Dog />
              <div className="dog-caption">
                <p className="nm">Watchdog</p>
                <p className="rl">checks every badge at the gate</p>
              </div>
            </div>
          </div>
        </section>

        <section id="how">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker"><Paw size={16} color="var(--honey-deep)" /> The model</span>
              <h2>A grant becomes a token. The token is all the agent ever holds.</h2>
              <p>The user grants. AgentAuth mints. Your server checks the badge. Anyone can call the dog off.</p>
            </div>
            <div className="flow">
              <div className="flow-step"><div className="n">01 Grant</div><h3>User consents</h3><p>Approves an agent for specific <code>scopes</code> on a short leash.</p></div>
              <div className="flow-step"><div className="n">02 Issue</div><h3>Mint a token</h3><p><code>issue()</code> returns a signed, short-lived badge.</p></div>
              <div className="flow-step"><div className="n">03 Verify</div><h3>Dog checks it</h3><p><code>verify()</code> sniffs signature, expiry, scopes.</p></div>
              <div className="flow-step"><div className="n">04 Revoke</div><h3>Call it off</h3><p><code>revoke()</code> by token, agent, or user.</p></div>
            </div>
          </div>
        </section>

        <section id="why">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker"><Paw size={16} color="var(--honey-deep)" /> Why not just an API key</span>
              <h2>Because a key can&apos;t be scoped, revoked, or expired.</h2>
            </div>
            <div className="bento">
              <div className="feat span-2">
                <div className="ic">Scoped</div>
                <h3>Least privilege, enforced</h3>
                <p>Every token carries explicit scopes. <code>verify</code> rejects anything beyond them, with wildcards (<code>email:*</code>) for grouping. The agent only ever sees what the user approved.</p>
              </div>
              <div className="feat"><div className="ic">Short leash</div><h3>Small blast radius</h3><p>15-minute TTL by default. A leaked token is worthless in minutes.</p></div>
              <div className="feat"><div className="ic">Revocable</div><h3>Kill switch</h3><p>Revoke a token, or every token an agent or user holds, in one call.</p></div>
              <div className="feat"><div className="ic">Stateless</div><h3>No DB round-trip</h3><p>Signed JWTs verify locally. Opt into revocation checks only where needed.</p></div>
              <div className="feat"><div className="ic">Auditable</div><h3>Every event, hooked</h3><p>Structured issued / verified / denied / revoked events for your trail.</p></div>
            </div>
            <div className="callout" style={{ marginTop: '2rem' }}>
              <span className="pup"><Paw size={34} color="var(--honey-deep)" /></span>
              <span><b>See it work for real.</b> The live demo runs this exact library server-side: connect an agent, watch scopes enforced on real API routes, then revoke it. <Link href="/demo">Open the demo →</Link></span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span><Paw size={16} color="var(--text-dim)" /> AgentAuth · MIT · built for the agent era</span>
          <span className="links">
            <a href={GH} target="_blank" rel="noopener">GitHub</a>
            <a href={`${GH}#readme`} target="_blank" rel="noopener">Docs</a>
            <Link href="/demo">Demo</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
