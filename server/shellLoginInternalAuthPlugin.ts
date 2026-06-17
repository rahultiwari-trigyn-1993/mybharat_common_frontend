import type { Connect, Plugin } from 'vite';
import { getKeycloakClientAccessToken } from './keycloakClientToken';
import {
  configureLoginPayloadCrypto,
  decryptLoginSecret,
  getLoginPayloadPublicKeyPem,
  isLoginPayloadCryptoConfigured,
  type EncryptedLoginSecret,
} from './loginPayloadCrypto';
import { getAccessToken, type OAuthTokenConfig } from './oauthToken';

export interface ShellLoginInternalAuthOptions {
  /** Same-origin prefix the shell calls, e.g. `/mybharat-shell-api`. */
  loginProxyPrefix: string;
  /** APIGateway origin without path, e.g. `http://127.0.0.1:8000`. */
  apiOrigin: string;
  oauth: OAuthTokenConfig;
  /** RSA keys for decrypting password/OTP from browser — host server env only. */
  loginPayload?: {
    privateKey?: string;
    publicKey?: string;
  };
}

function sendJson(res: Connect.ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: Connect.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text ? (JSON.parse(text) as Record<string, unknown>) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function gatewayApiUrl(apiOrigin: string, path: string): string {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${apiOrigin.replace(/\/$/, '')}/api${suffix}`;
}

async function postGatewayJson(
  apiOrigin: string,
  path: string,
  body: Record<string, unknown>,
  bearerToken?: string,
): Promise<Record<string, unknown>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken.replace(/^bearer\s+/i, '').trim()}`;
  }

  const res = await fetch(gatewayApiUrl(apiOrigin, path), {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { status_code: res.status, message: text };
  }
}

async function postGatewayForm(
  apiOrigin: string,
  path: string,
  form: Record<string, string>,
  bearerToken: string,
): Promise<Record<string, unknown>> {
  const token = bearerToken.replace(/^bearer\s+/i, '').trim();
  const res = await fetch(gatewayApiUrl(apiOrigin, path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: new URLSearchParams(form).toString(),
  });
  const text = await res.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { status_code: res.status, message: text };
  }
}

function normalizeGatewaySuccessPayload(payload: Record<string, unknown>): Record<string, unknown> {
  if (payload.status_code != null && payload.status_code !== '') return payload;
  const message = payload.message;
  if (typeof message !== 'string' || !message.trim()) return payload;
  const normalized = message.trim().toLowerCase();
  if (normalized.includes('fail') || normalized.includes('error') || normalized.includes('invalid')) {
    return payload;
  }
  if (normalized.includes('success') || normalized.includes('changed successfully')) {
    return { ...payload, status_code: 200 };
  }
  return payload;
}

function readEncryptedSecret(body: Record<string, unknown>, field: string): EncryptedLoginSecret {
  const node = body[field];
  if (!node || typeof node !== 'object') {
    throw new Error(`Missing ${field}.`);
  }
  return node as EncryptedLoginSecret;
}

/**
 * Vite host plugin — implements opaque `/_internal/*` login routes on the **host server**.
 * Required when embedding the shell login UI (CDN or npm) on a Vite dev/preview server.
 *
 * @see docs/host-login-server.md
 */
export function shellLoginInternalAuthPlugin(options: ShellLoginInternalAuthOptions): Plugin {
  return {
    name: 'shell-login-internal-auth',
    enforce: 'pre',
    configureServer(server) {
      attachInternalAuthMiddleware(server, options);
    },
    configurePreviewServer(server) {
      attachInternalAuthMiddleware(server, options);
    },
  };
}

function attachInternalAuthMiddleware(
  server: { middlewares: Connect.Server },
  options: ShellLoginInternalAuthOptions,
): void {
  configureLoginPayloadCrypto({
    privateKey: options.loginPayload?.privateKey,
    publicKey: options.loginPayload?.publicKey,
  });

  const prefix = options.loginProxyPrefix.replace(/\/$/, '');
  const kcPath = `${prefix}/_internal/kc-client`;
  const oauthPath = `${prefix}/_internal/guest-oauth`;
  const pubkeyPath = `${prefix}/_internal/login-pubkey`;
  const keycloakLoginPath = `${prefix}/_internal/keycloak-login`;
  const verifyGuestOtpPath = `${prefix}/_internal/verify-guest-otp`;
  const changePasswordPath = `${prefix}/_internal/keycloak-change-password`;

  server.middlewares.use(async (req, res, next) => {
    const rawUrl = req.url ?? '';
    const url = rawUrl.split('?')[0];
    if (req.method !== 'POST') return next();

    const forceRefresh =
      rawUrl.includes('refresh=1') || req.headers['x-shell-auth-refresh'] === '1';

    if (url === kcPath) {
      try {
        const token = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        sendJson(res, 200, { status_code: 200, access_token: token, token_type: 'Bearer' });
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Keycloak client token failed',
        });
      }
      return;
    }

    if (url === oauthPath) {
      try {
        const token = await getAccessToken(options.oauth, forceRefresh);
        sendJson(res, 200, { status_code: 200, access_token: token, token_type: 'Bearer' });
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'OAuth token failed',
        });
      }
      return;
    }

    if (url === pubkeyPath) {
      if (!isLoginPayloadCryptoConfigured()) {
        sendJson(res, 503, {
          status_code: 503,
          message: 'Login payload encryption is not configured on the host.',
        });
        return;
      }
      try {
        sendJson(res, 200, {
          status_code: 200,
          public_key: getLoginPayloadPublicKeyPem(),
        });
      } catch (err) {
        sendJson(res, 503, {
          status_code: 503,
          message: err instanceof Error ? err.message : 'Login payload encryption failed',
        });
      }
      return;
    }

    if (url === keycloakLoginPath) {
      try {
        const body = await readJsonBody(req);
        const username = typeof body.username === 'string' ? body.username.trim() : '';
        if (!username) {
          sendJson(res, 400, { status_code: 400, message: 'username is required.' });
          return;
        }
        const password = decryptLoginSecret(readEncryptedSecret(body, 'password_secret'));
        const clientToken = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        const payload = await postGatewayJson(
          options.apiOrigin,
          '/keycloakLogin',
          { username, password },
          clientToken,
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Keycloak login failed',
        });
      }
      return;
    }

    if (url === verifyGuestOtpPath) {
      try {
        const body = await readJsonBody(req);
        const otp = decryptLoginSecret(readEncryptedSecret(body, 'otp_secret'));
        const userEmail = typeof body.user_email === 'string' ? body.user_email : '';
        const userPhone = typeof body.user_phone === 'string' ? body.user_phone : '';
        const oauthToken = await getAccessToken(options.oauth, forceRefresh);
        const payload = await postGatewayForm(
          options.apiOrigin,
          '/verifyGuestUserOtp',
          { otp, user_email: userEmail, user_phone: userPhone },
          oauthToken,
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'OTP verification failed',
        });
      }
      return;
    }

    if (url === changePasswordPath) {
      try {
        const body = await readJsonBody(req);
        const userId = body.userId;
        const dlId = body.dlId;
        if (userId == null || dlId == null) {
          sendJson(res, 400, { status_code: 400, message: 'userId and dlId are required.' });
          return;
        }
        const password = decryptLoginSecret(readEncryptedSecret(body, 'password_secret'));
        const clientToken = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        const payload = normalizeGatewaySuccessPayload(
          await postGatewayJson(
            options.apiOrigin,
            '/keycloakChangePassword',
            { userId, dlId, password },
            clientToken,
          ),
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Password change failed',
        });
      }
      return;
    }

    next();
  });
}
