import { BFF_INTERNAL_PATHS } from '../../../config/apiPaths';
import { postShellLoginBffJson } from './shellLoginBff';

export type EncryptedLoginSecret = {
  v: 1;
  alg: 'RSA-OAEP';
  ciphertext: string;
};

let cachedPublicKeyPem: string | null = null;
let publicKeyPromise: Promise<string | null> | null = null;

export function canEncryptLoginSecrets(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext === true &&
    typeof window.crypto?.subtle?.encrypt === 'function'
  );
}

function pemToBinary(pem: string): ArrayBuffer {
  const base64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\s/g, '');
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    bytes[i] = raw.charCodeAt(i);
  }
  return bytes.buffer;
}

async function importRsaPublicKey(pem: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'spki',
    pemToBinary(pem),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt'],
  );
}

export async function encryptLoginSecret(
  plaintext: string,
  publicKeyPem: string,
): Promise<EncryptedLoginSecret> {
  const key = await importRsaPublicKey(publicKeyPem);
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, encoded);
  const bytes = new Uint8Array(ciphertext);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return {
    v: 1,
    alg: 'RSA-OAEP',
    ciphertext: btoa(binary),
  };
}

async function fetchLoginPublicKeyPem(): Promise<string | null> {
  if (cachedPublicKeyPem) return cachedPublicKeyPem;
  if (publicKeyPromise) return publicKeyPromise;

  publicKeyPromise = (async () => {
    try {
      const res = await postShellLoginBffJson<{ public_key?: string }>(
        BFF_INTERNAL_PATHS.loginPubkey,
        {},
      );
      const pem = res.public_key?.trim();
      if (pem) {
        cachedPublicKeyPem = pem;
        return pem;
      }
    } catch {
      /* host may not configure RSA keys — fall back to plaintext over HTTPS BFF */
    }
    return null;
  })();

  try {
    return await publicKeyPromise;
  } finally {
    publicKeyPromise = null;
  }
}

/** Returns RSA envelope when possible; otherwise plaintext (same-origin BFF over HTTPS). */
export async function wrapLoginSecretField(
  plaintext: string,
  encryptedField: string,
  plainField: string,
): Promise<Record<string, unknown>> {
  const value = plaintext.trim();
  if (!value) return {};

  if (!canEncryptLoginSecrets()) {
    return { [plainField]: value };
  }

  const publicKey = await fetchLoginPublicKeyPem();
  if (!publicKey) {
    return { [plainField]: value };
  }

  return {
    [encryptedField]: await encryptLoginSecret(value, publicKey),
  };
}

export function clearLoginPublicKeyCache(): void {
  cachedPublicKeyPem = null;
  publicKeyPromise = null;
}
