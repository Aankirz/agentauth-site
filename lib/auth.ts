import { AgentAuth } from './agentauth';

// Module-level singleton so the in-memory revocation store survives across requests
// on a warm serverless instance. (Multi-instance prod would use a shared store.)
const secret = (process.env.AGENTAUTH_SECRET ?? 'demo-secret-set-AGENTAUTH_SECRET-in-prod').padEnd(32, '0');

const g = globalThis as unknown as { __agentauth?: AgentAuth };
export const auth =
  g.__agentauth ??
  (g.__agentauth = new AgentAuth({
    secret,
    issuer: 'agentauth-demo',
    audience: 'inbox-copilot',
    defaultTtlSeconds: 15 * 60,
  }));

// Which scope each agent action requires — the heart of the demo.
export const ACTION_SCOPE: Record<string, string> = {
  read_inbox: 'email:read',
  send_email: 'email:send',
  read_calendar: 'calendar:read',
};
