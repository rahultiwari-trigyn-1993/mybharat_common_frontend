/**
 * Generate RSA key pair for encrypting login passwords/OTP in the browser.
 *
 *   node scripts/generateLoginPayloadKeypair.mjs
 *
 * Add output to host server .env (never commit private key):
 *   LOGIN_PAYLOAD_PRIVATE_KEY=...
 *   LOGIN_PAYLOAD_PUBLIC_KEY=...  (optional — derived from private if omitted)
 */
import { generateKeyPairSync } from 'node:crypto';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

const escape = (pem) => pem.replace(/\n/g, '\\n');

console.log('# Add to host .env (server-only — never bundle private key)');
console.log(`LOGIN_PAYLOAD_PRIVATE_KEY="${escape(privateKey)}"`);
console.log(`LOGIN_PAYLOAD_PUBLIC_KEY="${escape(publicKey)}"`);
