import Link from 'next/link';
import { Dog } from '../components/Dog';
import { ThemeToggle } from '../components/ThemeToggle';
import { GitHubIcon, IconChoose, IconPass, IconRevoke, Check, Cross, Arrow } from '../components/icons';

const GH = 'https://github.com/Aankirz/agentauth';

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/"><span className="mark"><Dog className="" /></span>AgentAuth</Link>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#how">How it works</a>
            <a href="#why">Why</a>
            <Link href="/demo">Demo</Link>
            <ThemeToggle />
            <a className="nav-cta" href={GH} target="_blank" rel="noopener"><GitHubIcon /> GitHub</a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO — one clear idea */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="badge-tag">Open-source auth for AI agents</span>
              <h1>Give AI agents a pass, <span className="hl">not your master key.</span></h1>
              <p className="lede">Agents can read your email, call your APIs, even spend your money. AgentAuth hands each one a limited pass instead: only what you allow, expiring in minutes, revocable in one click.</p>
              <div className="cta-row">
                <Link className="btn btn-primary" href="/demo">See it in action →</Link>
                <a className="btn btn-ghost" href={GH} target="_blank" rel="noopener"><GitHubIcon /> GitHub</a>
              </div>
            </div>
            <div className="hero-art">
              <Dog />
              <div className="dog-caption">
                <p className="nm">Watchdog</p>
                <p className="rl">checks every agent at the gate</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW — connected sequence */}
        <section id="how">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker">How it works</span>
              <h2>A grant in, a pass out, revoke whenever.</h2>
            </div>
            <div className="howflow">
              <div className="fstep">
                <div className="art"><IconChoose /></div>
                <p className="num">STEP 01</p>
                <h3>You choose what it can do</h3>
                <p>Pick exact permissions, like <em>read my inbox</em> but never <em>send</em>.</p>
              </div>
              <div className="fconn"><Arrow /></div>
              <div className="fstep fstep--key">
                <div className="art"><IconPass /></div>
                <p className="num">STEP 02</p>
                <h3>It gets a short-lived pass</h3>
                <p>A signed token carrying only those permissions, good for 15 minutes.</p>
              </div>
              <div className="fconn"><Arrow /></div>
              <div className="fstep">
                <div className="art"><IconRevoke /></div>
                <p className="num">STEP 03</p>
                <h3>You cut it off anytime</h3>
                <p>Revoke one agent, or all of them. Access stops instantly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY — visual comparison */}
        <section id="why">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker">Why not just an API key</span>
              <h2>One of these you can take back.</h2>
            </div>
            <div className="compare">
              <div className="cmp bad">
                <h3><span className="tag">API key</span> What agents get today</h3>
                <ul>
                  <li><Cross /> Full access to everything</li>
                  <li><Cross /> Never expires</li>
                  <li><Cross /> Can&apos;t be taken back</li>
                  <li><Cross /> No record of what it did</li>
                </ul>
              </div>
              <div className="cmp good">
                <h3><span className="tag">AgentAuth pass</span> What you give instead</h3>
                <ul>
                  <li><Check /> Only the permissions you pick</li>
                  <li><Check /> Expires in minutes</li>
                  <li><Check /> Revoke instantly</li>
                  <li><Check /> Every action logged</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="wrap">
            <div className="cta-band">
              <h2>See the watchdog work.</h2>
              <p>A real demo: connect an agent, watch it get allowed and blocked by what you granted, then revoke it.</p>
              <div className="cta-row">
                <Link className="btn btn-primary" href="/demo">Try the live demo →</Link>
                <a className="btn btn-ghost" href={GH} target="_blank" rel="noopener"><GitHubIcon /> Star on GitHub</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>AgentAuth · MIT · built for the agent era</span>
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
