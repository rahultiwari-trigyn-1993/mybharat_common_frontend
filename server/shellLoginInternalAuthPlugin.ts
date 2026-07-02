import type { Connect, Plugin } from 'vite';
import { getKeycloakClientAccessToken } from './keycloakClientToken';
import {
  decryptLoginSecret,
  issueLoginPayloadSessionKey,
  type EncryptedLoginSecret,
} from './loginPayloadCrypto';
import { getAccessToken, type OAuthTokenConfig } from './oauthToken';

export interface ShellLoginInternalAuthOptions {
  /** Same-origin prefix the shell calls, e.g. `/mybharat-shell-api`. */
  loginProxyPrefix: string;
  /** APIGateway origin without path, e.g. `http://127.0.0.1:8000`. */
  apiOrigin: string;
  oauth: OAuthTokenConfig;
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
  if (message && typeof message === 'object' && !Array.isArray(message)) {
    const given = (message as Record<string, unknown>).given_data;
    if (typeof given === 'string' && given.trim()) {
      return { ...payload, status_code: 200 };
    }
  }
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

function readPlainOrEncryptedSecret(
  body: Record<string, unknown>,
  plainField: string,
  encryptedField: string,
): string {
  const plain = typeof body[plainField] === 'string' ? body[plainField].trim() : '';
  if (plain) return plain;
  return decryptLoginSecret(readEncryptedSecret(body, encryptedField));
}

function readStringField(body: Record<string, unknown>, field: string): string {
  return typeof body[field] === 'string' ? body[field].trim() : '';
}

function readFormFields(body: Record<string, unknown>): Record<string, string> {
  const form: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (value == null) continue;
    form[key] = String(value);
  }
  return form;
}

function readClientIpFromRequest(req: Connect.IncomingMessage): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  const remote = req.socket?.remoteAddress?.replace(/^::ffff:/, '').trim();
  return remote || '';
}

function ensureFormClientIp(
  form: Record<string, string>,
  req: Connect.IncomingMessage,
): Record<string, string> {
  const ip = form.ip_address?.trim();
  if (ip && ip !== '0.0.0.0') return form;
  const clientIp = readClientIpFromRequest(req);
  if (!clientIp) return form;
  return { ...form, ip_address: clientIp };
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
  const prefix = options.loginProxyPrefix.replace(/\/$/, '');
  const kcPath = `${prefix}/_internal/kc-client`;
  const oauthPath = `${prefix}/_internal/guest-oauth`;
  const loginCryptoKeyPath = `${prefix}/_internal/login-crypto-key`;
  const loginPubkeyPath = `${prefix}/_internal/login-pubkey`;
  const keycloakLoginPath = `${prefix}/_internal/keycloak-login`;
  const verifyGuestOtpPath = `${prefix}/_internal/verify-guest-otp`;
  const sendGuestOtpPath = `${prefix}/_internal/send-guest-otp`;
  const checkUserExistsPath = `${prefix}/_internal/check-user-exists`;
  const keycloakExchangePath = `${prefix}/_internal/keycloak-exchange-token`;
  const keycloakForgotPath = `${prefix}/_internal/keycloak-forgot-password`;
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

    if (url === loginCryptoKeyPath || url === loginPubkeyPath) {
      try {
        const issued = issueLoginPayloadSessionKey();
        sendJson(res, 200, { status_code: 200, ...issued });
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Login crypto key failed',
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
        const password = readPlainOrEncryptedSecret(body, 'password', 'password_secret');
        if (!password) {
          sendJson(res, 400, { status_code: 400, message: 'password is required.' });
          return;
        }
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
        const otp = readPlainOrEncryptedSecret(body, 'otp', 'otp_secret');
        if (!otp) {
          sendJson(res, 400, { status_code: 400, message: 'otp is required.' });
          return;
        }
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

    if (url === sendGuestOtpPath) {
      try {
        const body = await readJsonBody(req);
        const form = ensureFormClientIp(readFormFields(body), req);
        const oauthToken = await getAccessToken(options.oauth, forceRefresh);
        const payload = normalizeGatewaySuccessPayload(
          await postGatewayForm(
            options.apiOrigin,
            '/sendMobileGuestUserOtp',
            form,
            oauthToken,
          ),
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Send OTP failed',
        });
      }
      return;
    }

    if (url === checkUserExistsPath) {
      try {
        const body = await readJsonBody(req);
        const identifier = readStringField(body, 'identifier');
        if (!identifier) {
          sendJson(res, 400, { status_code: 400, message: 'identifier is required.' });
          return;
        }
        const clientToken = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        const payload = normalizeGatewaySuccessPayload(
          await postGatewayJson(
            options.apiOrigin,
            '/checkUserExists',
            { identifier },
            clientToken,
          ),
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'checkUserExists failed',
        });
      }
      return;
    }

    if (url === keycloakExchangePath) {
      try {
        const body = await readJsonBody(req);
        const username = readStringField(body, 'username');
        const regCode = readStringField(body, 'reg_code');
        if (!username || !regCode) {
          sendJson(res, 400, {
            status_code: 400,
            message: 'username and reg_code are required.',
          });
          return;
        }
        const clientToken = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        const payload = await postGatewayJson(
          options.apiOrigin,
          '/keycloakGetExchangeToken',
          { username, reg_code: regCode },
          clientToken,
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Exchange token failed',
        });
      }
      return;
    }

    if (url === keycloakForgotPath) {
      try {
        const body = await readJsonBody(req);
        const identifier = readStringField(body, 'identifier');
        const regCode = readStringField(body, 'reg_code');
        if (!identifier || !regCode) {
          sendJson(res, 400, {
            status_code: 400,
            message: 'identifier and reg_code are required.',
          });
          return;
        }
        const clientToken = await getKeycloakClientAccessToken(options.apiOrigin, forceRefresh);
        const payload = await postGatewayJson(
          options.apiOrigin,
          '/keycloakForgotPassword',
          { identifier, reg_code: regCode },
          clientToken,
        );
        sendJson(res, 200, payload);
      } catch (err) {
        sendJson(res, 502, {
          status_code: 502,
          message: err instanceof Error ? err.message : 'Forgot password failed',
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
        const password = readPlainOrEncryptedSecret(body, 'password', 'password_secret');
        if (!password) {
          sendJson(res, 400, { status_code: 400, message: 'password is required.' });
          return;
        }
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
