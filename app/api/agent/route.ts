import { auth, ACTION_SCOPE } from '../../../lib/auth';
import { AgentAuthError } from '../../../lib/agentauth';

// Mock "inbox" data the agent is trying to reach — gated by real scope checks.
const INBOX = [
  { from: 'Stripe', subject: 'Your payout of $4,210 is on the way' },
  { from: 'Linear', subject: '3 issues assigned to you' },
  { from: 'Mom', subject: 're: dinner sunday?' },
];
const CALENDAR = [
  { time: '10:00', title: 'Standup' },
  { time: '14:30', title: 'Design review — AgentAuth' },
];

function bearer(req: Request): string | null {
  const h = req.headers.get('authorization') ?? '';
  return h.startsWith('Bearer ') ? h.slice(7) : null;
}

// The protected endpoint the AGENT calls. Each action needs a specific scope.
export async function POST(req: Request) {
  const { action } = await req.json().catch(() => ({}));
  const required = ACTION_SCOPE[action];
  if (!required) return Response.json({ error: 'unknown action' }, { status: 400 });

  const token = bearer(req);
  if (!token) return Response.json({ error: 'no token', code: 'token_invalid' }, { status: 401 });

  try {
    const claims = await auth.verify(token, { requiredScopes: [required], checkRevocation: true });
    const data =
      action === 'read_inbox' ? { inbox: INBOX } :
      action === 'read_calendar' ? { calendar: CALENDAR } :
      { sent: true, to: 'investor@vc.com' };
    return Response.json({ ok: true, action, scope: required, agent: claims.agent, data });
  } catch (err) {
    const e = err as AgentAuthError;
    // 401 for bad/expired/revoked credentials, 403 for valid token lacking scope.
    const status = e.code === 'missing_scope' ? 403 : 401;
    return Response.json({ error: e.message, code: e.code, requiredScope: required }, { status });
  }
}
