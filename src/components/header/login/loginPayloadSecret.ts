import { BFF_INTERNAL_PATHS } from '../../../config/apiPaths';
import { postShellLoginBffJson } from './shellLoginBff';
import { isShellLoginBffEnabled } from './shellLoginProxyConfig';

export const LOGIN_PAYLOAD_ALG = 'AES-256-CBC-HMAC-SHA256' as const;
const HMAC_LABEL = 'mybharat-login-v1-hmac';

export type EncryptedLoginSecret = {
  v: 1;
  alg: typeof LOGIN_PAYLOAD_ALG;
  kid: string;
  iv: string;
  ciphertext: string;
  mac: string;
};

type CryptoSession = { kid: string; key: Uint8Array; expiresAt: number };

let cachedSession: CryptoSession | null = null;
let sessionPromise: Promise<CryptoSession | null> | null = null;

export function canEncryptLoginSecrets(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext === true &&
    typeof window.crypto?.subtle?.encrypt === 'function'
  );
}

function b64Encode(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function b64Decode(value: string): Uint8Array {
  const raw = atob(value);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

async function deriveMacKey(aesKey: Uint8Array): Promise<Uint8Array> {
  const label = new TextEncoder().encode(HMAC_LABEL);
  return new Uint8Array(await crypto.subtle.digest('SHA-256', concat(aesKey, label)));
}

async function fetchCryptoSession(): Promise<CryptoSession | null> {
  if (cachedSession && cachedSession.expiresAt > Date.now() + 5000) return cachedSession;
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    try {
      const res = await postShellLoginBffJson<{
        kid?: string;
        key?: string;
        expires_in?: number;
      }>(BFF_INTERNAL_PATHS.loginCryptoKey, {});
      const kid = res.kid?.trim();
      const keyB64 = res.key?.trim();
      if (!kid || !keyB64) return null;
      const session: CryptoSession = {
        kid,
        key: b64Decode(keyB64),
        expiresAt: Date.now() + Math.max(60, Number(res.expires_in ?? 600)) * 1000,
      };
      cachedSession = session;
      return session;
    } catch {
      return null;
    }
  })();

  try {
    return await sessionPromise;
  } finally {
    sessionPromise = null;
  }
}

export async function encryptLoginSecret(
  plaintext: string,
  session: CryptoSession,
): Promise<EncryptedLoginSecret> {
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const aesKey = await crypto.subtle.importKey('raw', session.key, 'AES-CBC', false, ['encrypt']);
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    aesKey,
    new TextEncoder().encode(plaintext),
  );
  const ct = new Uint8Array(ciphertext);
  const macKey = await deriveMacKey(session.key);
  const macCryptoKey = await crypto.subtle.importKey(
    'raw',
    macKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', macCryptoKey, concat(iv, ct));

  return {
    v: 1,
    alg: LOGIN_PAYLOAD_ALG,
    kid: session.kid,
    iv: b64Encode(iv),
    ciphertext: b64Encode(ct),
    mac: b64Encode(new Uint8Array(mac)),
  };
}

/** AES-256-CBC + HMAC via short-lived session key from BFF — no static client secrets. */
export async function wrapLoginSecretField(
  plaintext: string,
  encryptedField: string,
  plainField: string,
): Promise<Record<string, unknown>> {
  const value = plaintext.trim();
  if (!value) return {};

  if (!isShellLoginBffEnabled() || !canEncryptLoginSecrets()) {
    return { [plainField]: value };
  }

  const session = await fetchCryptoSession();
  if (!session) {
    return { [plainField]: value };
  }

  return { [encryptedField]: await encryptLoginSecret(value, session) };
}

export function clearLoginPublicKeyCache(): void {
  cachedSession = null;
  sessionPromise = null;
}
