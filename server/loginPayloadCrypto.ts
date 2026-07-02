import { createDecipheriv, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import {
  isEncryptedLoginSecret,
  LOGIN_PAYLOAD_HMAC_LABEL,
  type EncryptedLoginSecret,
} from './loginPayloadCryptoSpec';
import { resolveLoginPayloadSessionKey } from './loginPayloadSessionKeys';

export type { EncryptedLoginSecret } from './loginPayloadCryptoSpec';
export { issueLoginPayloadSessionKey } from './loginPayloadSessionKeys';

export function deriveLoginPayloadMacKey(aesKey: Buffer): Buffer {
  return createHash('sha256')
    .update(Buffer.concat([aesKey, Buffer.from(LOGIN_PAYLOAD_HMAC_LABEL, 'utf8')]))
    .digest();
}

export function decryptLoginSecret(secret: EncryptedLoginSecret): string {
  if (!isEncryptedLoginSecret(secret)) {
    throw new Error('Invalid encrypted secret format.');
  }

  const aesKey = resolveLoginPayloadSessionKey(secret.kid);
  const macKey = deriveLoginPayloadMacKey(aesKey);
  const iv = Buffer.from(secret.iv, 'base64');
  const ciphertext = Buffer.from(secret.ciphertext, 'base64');
  const mac = Buffer.from(secret.mac, 'base64');

  if (iv.length !== 16) throw new Error('Invalid login payload IV.');

  const expected = createHmac('sha256', macKey)
    .update(Buffer.concat([iv, ciphertext]))
    .digest();
  if (mac.length !== expected.length || !timingSafeEqual(mac, expected)) {
    throw new Error('Login payload authentication failed.');
  }

  const decipher = createDecipheriv('aes-256-cbc', aesKey, iv);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

/** @deprecated No static env keys — session keys from login-crypto-key. */
export function configureLoginPayloadCrypto(_options?: unknown): void {}

export function isLoginPayloadCryptoConfigured(): boolean {
  return true;
}

/** @deprecated */
export function getLoginPayloadPublicKeyPem(): never {
  throw new Error('Use POST /_internal/login-crypto-key instead.');
}
