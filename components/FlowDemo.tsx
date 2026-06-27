import { Fox } from './Fox';

// Animated explainer: requests carry a pass to the gate; the fox checks the scope.
// Granted scope flows through (green); ungranted bounces off (red). Pure CSS motion.
export function FlowDemo() {
  return (
    <div className="flowtrack" role="img" aria-label="Agents send requests with a pass; the gate allows the granted scope and blocks the rest.">
      <div className="lane lane-top">
        <span className="fd-agent">research-bot</span>
        <span className="fd-rail" />
        <span className="fd-token fd-token--allow">email:read</span>
        <span className="fd-out fd-out--ok">✓ inbox</span>
      </div>

      <div className="gate">
        <Fox className="gate-fox" />
        <span className="gate-label">scope check</span>
      </div>

      <div className="lane lane-bot">
        <span className="fd-agent">research-bot</span>
        <span className="fd-rail" />
        <span className="fd-token fd-token--deny">email:send</span>
        <span className="fd-out fd-out--no">✗ blocked</span>
      </div>
    </div>
  );
}
