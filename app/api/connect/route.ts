import { auth } from '../../../lib/auth';

// The user grants the agent a set of scopes; the server mints a real scoped token.
export async function POST(req: Request) {
  const { scopes, ttlSeconds } = await req.json().catch(() => ({}));
  if (!Array.isArray(scopes) || scopes.length === 0) {
    return Response.json({ error: 'pick at least one scope' }, { status: 400 });
  }
  try {
    const { token, expiresAt } = await auth.issue({
      subject: 'you@demo',
      agent: 'research-bot',
      scopes,
      ttlSeconds: typeof ttlSeconds === 'number' ? ttlSeconds : undefined,
    });
    return Response.json({ token, expiresAt, scopes });
  } catch (err) {
    const e = err as { message?: string; code?: string };
    return Response.json({ error: e.message ?? 'could not issue', code: e.code }, { status: 400 });
  }
}
