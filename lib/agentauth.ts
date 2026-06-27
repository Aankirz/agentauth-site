// AgentAuth — the real library, consolidated into one module for the app.
// (Same logic as the published package: github.com/Aankirz/agentauth)
import { SignJWT, jwtVerify, errors as joseErrors, type JWTPayload } from 'jose';
import { randomUUID } from 'node:crypto';

export type AgentAuthErrorCode =
  | 'invalid_config' | 'invalid_grant' | 'token_invalid'
  | 'token_expired' | 'token_revoked' | 'missing_scope';

export class AgentAuthError extends Error {
  constructor(message: string, public readonly code: AgentAuthErrorCode) {
    super(message);
    this.name = 'AgentAuthError';
  }
}
export class TokenInvalidError extends AgentAuthError {
  constructor(m = 'token is invalid') { super(m, 'token_invalid'); this.name = 'TokenInvalidError'; }
}
export class TokenExpiredError extends AgentAuthError {
  constructor(m = 'token has expired') { super(m, 'token_expired'); this.name = 'TokenExpiredError'; }
}
export class RevokedError extends AgentAuthError {
  constructor(m = 'token has been revoked') { super(m, 'token_revoked'); this.name = 'RevokedError'; }
}
export class MissingScopeError extends AgentAuthError {
  constructor(public readonly missing: readonly string[]) { super('insufficient scope', 'missing_scope'); this.name = 'MissingScopeError'; }
}
export class InvalidGrantError extends AgentAuthError {
  constructor(m: string) { super(m, 'invalid_grant'); this.name = 'InvalidGrantError'; }
}

export function scopeSatisfied(granted: string[], required: string): boolean {
  for (const g of granted) {
    if (g === required || g === '*') return true;
    if (g.endsWith(':*') && required.startsWith(g.slice(0, -1))) return true;
  }
  return false;
}
function missingScopes(granted: string[], required: string[]): string[] {
  return required.filter((r) => !scopeSatisfied(granted, r));
}

export interface RevocationCriteria { jti?: string; agent?: string; subject?: string }
interface RevSubject { jti: string; agent: string; subject: string }
export interface RevocationStore {
  revoke(c: RevocationCriteria, expiresAt: number): void | Promise<void>;
  isRevoked(s: RevSubject): boolean | Promise<boolean>;
}

class MemoryStore implements RevocationStore {
  private entries: Array<{ c: RevocationCriteria; expiresAt: number }> = [];
  revoke(c: RevocationCriteria, expiresAt: number) {
    if (c.jti === undefined && c.agent === undefined && c.subject === undefined) return;
    this.entries.push({ c, expiresAt });
  }
  isRevoked(s: RevSubject) {
    const now = Date.now();
    this.entries = this.entries.filter((e) => e.expiresAt * 1000 >= now);
    return this.entries.some(
      (e) =>
        (e.c.jti === undefined || e.c.jti === s.jti) &&
        (e.c.agent === undefined || e.c.agent === s.agent) &&
        (e.c.subject === undefined || e.c.subject === s.subject),
    );
  }
}

export interface AgentClaims {
  sub: string; agent: string; scopes: string[]; jti: string; iss: string; aud: string; iat: number; exp: number;
}
export interface Grant { subject: string; agent: string; scopes: string[]; ttlSeconds?: number }
export interface VerifyOptions { requiredScopes?: string[]; checkRevocation?: boolean }
export type AgentAuthEvent =
  | { type: 'issued'; jti: string; subject: string; agent: string; scopes: string[]; expiresAt: number }
  | { type: 'verified'; jti: string; subject: string; agent: string; scopes: string[] }
  | { type: 'denied'; reason: AgentAuthErrorCode; jti?: string }
  | { type: 'revoked'; jti?: string; agent?: string; subject?: string };

export interface AgentAuthConfig {
  secret: string | Uint8Array;
  issuer?: string;
  audience?: string;
  defaultTtlSeconds?: number;
  kid?: string;
  clockToleranceSeconds?: number;
  checkRevocation?: boolean;
  store?: RevocationStore;
  onEvent?: (e: AgentAuthEvent) => void;
}

const DEFAULT_TTL = 15 * 60;
const MIN_SECRET_BYTES = 32;

export class AgentAuth {
  private key: Uint8Array;
  private issuer: string;
  private audience: string;
  private ttl: number;
  private kid?: string;
  private clockTolerance: number;
  private checkRevocationDefault: boolean;
  private store: RevocationStore;
  private onEvent?: (e: AgentAuthEvent) => void;
  private maxIssuedTtl: number;

  constructor(config: AgentAuthConfig) {
    if (!config.secret) throw new AgentAuthError('secret is required', 'invalid_config');
    this.key = typeof config.secret === 'string' ? new TextEncoder().encode(config.secret) : config.secret;
    if (this.key.length < MIN_SECRET_BYTES) throw new AgentAuthError(`secret must be at least ${MIN_SECRET_BYTES} bytes`, 'invalid_config');
    this.issuer = config.issuer ?? 'agentauth';
    this.audience = config.audience ?? 'agentauth';
    this.ttl = config.defaultTtlSeconds ?? DEFAULT_TTL;
    this.kid = config.kid;
    this.clockTolerance = config.clockToleranceSeconds ?? 30;
    this.checkRevocationDefault = config.checkRevocation ?? true;
    this.store = config.store ?? new MemoryStore();
    this.onEvent = config.onEvent;
    this.maxIssuedTtl = this.ttl;
  }

  async issue(grant: Grant): Promise<{ token: string; jti: string; expiresAt: number }> {
    if (!grant.subject) throw new InvalidGrantError('subject is required');
    if (!grant.agent) throw new InvalidGrantError('agent is required');
    if (!grant.scopes?.length) throw new InvalidGrantError('at least one scope is required');
    if (grant.scopes.some((s) => typeof s !== 'string' || s.trim() === '')) throw new InvalidGrantError('scopes must be non-empty strings');

    const jti = randomUUID();
    const iat = Math.floor(Date.now() / 1000);
    const ttlSeconds = grant.ttlSeconds ?? this.ttl;
    const exp = iat + ttlSeconds;
    if (ttlSeconds > this.maxIssuedTtl) this.maxIssuedTtl = ttlSeconds;

    const header: { alg: 'HS256'; kid?: string } = { alg: 'HS256' };
    if (this.kid) header.kid = this.kid;
    const token = await new SignJWT({ agent: grant.agent, scopes: grant.scopes })
      .setProtectedHeader(header).setSubject(grant.subject).setIssuer(this.issuer)
      .setAudience(this.audience).setJti(jti).setIssuedAt(iat).setExpirationTime(exp).sign(this.key);

    this.emit({ type: 'issued', jti, subject: grant.subject, agent: grant.agent, scopes: grant.scopes, expiresAt: exp });
    return { token, jti, expiresAt: exp };
  }

  async verify(token: string, opts: VerifyOptions = {}): Promise<AgentClaims> {
    let claims: AgentClaims;
    try {
      const { payload } = await jwtVerify(token, this.key, {
        issuer: this.issuer, audience: this.audience, clockTolerance: this.clockTolerance, algorithms: ['HS256'],
      });
      claims = toClaims(payload);
    } catch (err) {
      const wrapped = err instanceof joseErrors.JWTExpired ? new TokenExpiredError() : new TokenInvalidError();
      this.emit({ type: 'denied', reason: wrapped.code });
      throw wrapped;
    }
    const shouldCheck = opts.checkRevocation ?? this.checkRevocationDefault;
    if (shouldCheck && (await this.store.isRevoked({ jti: claims.jti, agent: claims.agent, subject: claims.sub }))) {
      this.emit({ type: 'denied', reason: 'token_revoked', jti: claims.jti });
      throw new RevokedError();
    }
    const missing = missingScopes(claims.scopes, opts.requiredScopes ?? []);
    if (missing.length) {
      this.emit({ type: 'denied', reason: 'missing_scope', jti: claims.jti });
      throw new MissingScopeError(missing);
    }
    this.emit({ type: 'verified', jti: claims.jti, subject: claims.sub, agent: claims.agent, scopes: claims.scopes });
    return claims;
  }

  async revoke(target: string | RevocationCriteria): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    if (typeof target === 'object') {
      await this.store.revoke(target, now + this.maxIssuedTtl + this.clockTolerance);
      this.emit({ type: 'revoked', agent: target.agent, subject: target.subject, jti: target.jti });
      return;
    }
    let jti = target;
    let expiresAt = now + this.maxIssuedTtl + this.clockTolerance;
    try {
      const { payload } = await jwtVerify(target, this.key, { issuer: this.issuer, audience: this.audience, clockTolerance: this.clockTolerance, algorithms: ['HS256'] });
      jti = String(payload.jti);
      expiresAt = Number(payload.exp) + this.clockTolerance;
    } catch { /* treat as bare jti */ }
    await this.store.revoke({ jti }, expiresAt);
    this.emit({ type: 'revoked', jti });
  }

  private emit(e: AgentAuthEvent) {
    if (!this.onEvent) return;
    try { this.onEvent(e); } catch { /* audit must never break auth */ }
  }
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}
function toClaims(p: JWTPayload): AgentClaims {
  const raw = (p as Record<string, unknown>).scopes;
  return {
    sub: String(p.sub), agent: String((p as Record<string, unknown>).agent),
    scopes: isStringArray(raw) ? raw : [],
    jti: String(p.jti), iss: String(p.iss),
    aud: Array.isArray(p.aud) ? (p.aud[0] ?? '') : String(p.aud ?? ''),
    iat: Number(p.iat), exp: Number(p.exp),
  };
}
