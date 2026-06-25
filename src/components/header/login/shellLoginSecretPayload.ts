/**
 * Encrypt login secrets (password, OTP) in the browser before same-origin internal routes.
 * Host server decrypts with LOGIN_PAYLOAD_PRIVATE_KEY and forwards to APIGateway.
 * @see docs/host-login-server.md — keys are host **server** env, never in this bundle.
 */

import {
  DEFAULT_API_ERROR_MESSAGE,
  isApiSuccessStatus,
  isApiFailureResponse,
  resolveUserFacingApiError,
  type ApiErrorPayload,
} from './loginApiErrorMessage';
import {
  SHELL_INTERNAL_LOGIN_PUBKEY_PATH,
  postInternalAuthJson,
} from './shellLoginInternalAuth';

export type EncryptedLoginSecret = {
  v: 1;
  alg: 'RSA-OAEP';
  ciphertext: string;
};

let cachedPublicKeyPem: string | null = null;
let publicKeyPromise: Promise<string> | null = null;

function readConfiguredPublicKeyPem(): string {
  const fromShell = window.MYBHARAT_SHELL?.login?.loginPayloadPublicKey?.trim();
  if (fromShell) return fromShell;

  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('login-payload-public-key')
    ?.trim();
  if (fromHeader) return fromHeader;

  const fromMeta = document
    .querySelector('meta[name="mybharat-login-payload-public-key"]')
    ?.getAttribute('content')
    ?.trim();
  return fromMeta ?? '';
}

async function fetchPublicKeyPemFromHost(): Promise<string> {
  const res = await postInternalAuthJson<Record<string, unknown>>(SHELL_INTERNAL_LOGIN_PUBKEY_PATH, {});
  if (isApiFailureResponse(res as ApiErrorPayload)) {
    throw new Error(resolveUserFacingApiError(res as ApiErrorPayload));
  }
  const pem =
    (typeof res.public_key === 'string' && res.public_key) ||
    (typeof res.publicKey === 'string' && res.publicKey) ||
    '';
  if (!pem.trim()) {
    throw new Error(DEFAULT_API_ERROR_MESSAGE);
  }
  return pem.trim();
}

async function resolveLoginPayloadPublicKeyPem(): Promise<string> {
  const configured = readConfiguredPublicKeyPem();
  if (configured) return configured;

  if (cachedPublicKeyPem) return cachedPublicKeyPem;
  if (publicKeyPromise) return publicKeyPromise;

  publicKeyPromise = fetchPublicKeyPemFromHost().then((pem) => {
    cachedPublicKeyPem = pem;
    return pem;
  });

  try {
    return await publicKeyPromise;
  } finally {
    publicKeyPromise = null;
  }
}

function pemToSpkiBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function importRsaPublicKey(pem: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'spki',
    pemToSpkiBuffer(pem),
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['encrypt']
  );
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/** Encrypt a password or OTP for internal host routes (never send plaintext to network). */
export async function encryptLoginSecret(plaintext: string): Promise<EncryptedLoginSecret> {
  const value = plaintext.trim();
  if (!value) {
    throw new Error('Secret value is empty.');
  }
  if (typeof crypto === 'undefined' || !crypto.subtle) {
    throw new Error('Secure login requires Web Crypto in this browser.');
  }

  const pem = await resolveLoginPayloadPublicKeyPem();
  const key = await importRsaPublicKey(pem);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    key,
    new TextEncoder().encode(value)
  );

  return {
    v: 1,
    alg: 'RSA-OAEP',
    ciphertext: bufferToBase64(encrypted),
  };
}

export function clearLoginPayloadPublicKeyCache(): void {
  cachedPublicKeyPem = null;
  publicKeyPromise = null;
}
