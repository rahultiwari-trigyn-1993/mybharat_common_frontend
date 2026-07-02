import { randomBytes } from 'node:crypto';
import { LOGIN_PAYLOAD_SESSION_TTL_SEC } from './loginPayloadCryptoSpec';

type Entry = { key: Buffer; expires: number };

const store = new Map<string, Entry>();

function cleanup(now = Date.now()): void {
  for (const [kid, entry] of store.entries()) {
    if (entry.expires <= now) store.delete(kid);
  }
}

export function issueLoginPayloadSessionKey(ttlSec = LOGIN_PAYLOAD_SESSION_TTL_SEC): {
  kid: string;
  key: string;
  expires_in: number;
} {
  cleanup();
  const kid = randomBytes(16).toString('hex');
  const key = randomBytes(32);
  store.set(kid, { key, expires: Date.now() + ttlSec * 1000 });
  return { kid, key: key.toString('base64'), expires_in: ttlSec };
}

export function resolveLoginPayloadSessionKey(kid: string): Buffer {
  const id = kid.trim();
  if (!id) throw new Error('Missing login crypto session id.');
  cleanup();
  const entry = store.get(id);
  if (!entry || entry.expires <= Date.now()) {
    throw new Error('Login crypto session expired. Please try again.');
  }
  return entry.key;
}

export function clearLoginPayloadSessionKeys(): void {
  store.clear();
}
