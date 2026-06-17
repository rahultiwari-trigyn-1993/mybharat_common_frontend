import {
  constants,
  createPrivateKey,
  createPublicKey,
  privateDecrypt,
} from 'node:crypto';

export type EncryptedLoginSecret = {
  v: 1;
  alg: 'RSA-OAEP';
  ciphertext: string;
};

let configuredPrivateKey = '';
let configuredPublicKey = '';

/** Host server config — call from Vite plugin, Express, etc. (never from browser code). */
export function configureLoginPayloadCrypto(options: {
  privateKey?: string;
  publicKey?: string;
}): void {
  configuredPrivateKey = options.privateKey?.trim() ?? '';
  configuredPublicKey = options.publicKey?.trim() ?? '';
}

function normalizePem(value: string): string {
  return value.replace(/\\n/g, '\n').trim();
}

function readPrivateKeyPem(): string {
  return configuredPrivateKey || process.env.LOGIN_PAYLOAD_PRIVATE_KEY?.trim() || '';
}

function readPublicKeyPem(): string {
  return configuredPublicKey || process.env.LOGIN_PAYLOAD_PUBLIC_KEY?.trim() || '';
}

export function isLoginPayloadCryptoConfigured(): boolean {
  return Boolean(readPrivateKeyPem() || readPublicKeyPem());
}

export function getLoginPayloadPublicKeyPem(): string {
  const configuredPublic = readPublicKeyPem();
  if (configuredPublic) return normalizePem(configuredPublic);

  const privatePem = readPrivateKeyPem();
  if (!privatePem) {
    throw new Error('LOGIN_PAYLOAD_PRIVATE_KEY or LOGIN_PAYLOAD_PUBLIC_KEY is not configured.');
  }

  const keyObject = createPrivateKey(normalizePem(privatePem));
  return createPublicKey(keyObject).export({ type: 'spki', format: 'pem' }) as string;
}

export function decryptLoginSecret(secret: EncryptedLoginSecret): string {
  if (secret?.v !== 1 || secret?.alg !== 'RSA-OAEP' || !secret?.ciphertext?.trim()) {
    throw new Error('Invalid encrypted secret format.');
  }

  const privatePem = readPrivateKeyPem();
  if (!privatePem) {
    throw new Error('LOGIN_PAYLOAD_PRIVATE_KEY is not configured.');
  }

  const decrypted = privateDecrypt(
    {
      key: normalizePem(privatePem),
      padding: constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(secret.ciphertext, 'base64'),
  );

  return decrypted.toString('utf8');
}
