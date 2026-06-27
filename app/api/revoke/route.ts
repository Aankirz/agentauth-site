import { auth } from '../../../lib/auth';

// "Disconnect this agent" — revoke by token, or by agent to kill every token it holds.
export async function POST(req: Request) {
  const { token, agent } = await req.json().catch(() => ({}));
  if (agent) await auth.revoke({ agent });
  else if (token) await auth.revoke(token);
  else return Response.json({ error: 'pass a token or an agent' }, { status: 400 });
  return Response.json({ ok: true });
}
