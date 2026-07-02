/** AES-256-CBC + HMAC-SHA256 login envelope — PHP 5.6+, Node, Web Crypto. */
export const LOGIN_PAYLOAD_ALG = 'AES-256-CBC-HMAC-SHA256' as const;
export const LOGIN_PAYLOAD_HMAC_LABEL = 'mybharat-login-v1-hmac';
export const LOGIN_PAYLOAD_SESSION_TTL_SEC = 600;

export type EncryptedLoginSecret = {
  v: 1;
  alg: typeof LOGIN_PAYLOAD_ALG;
  kid: string;
  iv: string;
  ciphertext: string;
  mac: string;
};

export function isEncryptedLoginSecret(value: unknown): value is EncryptedLoginSecret {
  if (!value || typeof value !== 'object') return false;
  const s = value as EncryptedLoginSecret;
  return (
    s.v === 1 &&
    s.alg === LOGIN_PAYLOAD_ALG &&
    typeof s.kid === 'string' &&
    s.kid.trim().length > 0 &&
    typeof s.iv === 'string' &&
    typeof s.ciphertext === 'string' &&
    typeof s.mac === 'string'
  );
}
