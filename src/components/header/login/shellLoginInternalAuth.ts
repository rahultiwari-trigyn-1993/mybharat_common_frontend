/**
 * Server-side auth bootstrap — browser calls opaque same-origin routes only.
 * Host must map these paths to APIGateway (credentials stay on server).
 *
 * @see docs/cakephp-shell-integration.md — "Internal auth routes"
 */
import {
  DEFAULT_API_ERROR_MESSAGE,
  normalizeApiResponse,
  resolveUserFacingApiError,
  type ApiErrorPayload,
} from './loginApiErrorMessage';

/** Default same-origin proxy prefix when host does not set apiProxyBaseUrl explicitly. */
const SHELL_LOGIN_API_PROXY_DEFAULT = '/mybharat-shell-api';

/** Opaque path — host proxies to POST /getKeycloakClientAccessToken (no body). */
export const SHELL_INTERNAL_KC_CLIENT_PATH = '/_internal/kc-client';

/** Opaque path — host proxies to POST /oauth with server-stored client credentials. */
export const SHELL_INTERNAL_GUEST_OAUTH_PATH = '/_internal/guest-oauth';

/** RSA public key for encrypting passwords/OTP in the browser. */
export const SHELL_INTERNAL_LOGIN_PUBKEY_PATH = '/_internal/login-pubkey';

/** Encrypted password sign-in — host decrypts and calls keycloakLogin. */
export const SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH = '/_internal/keycloak-login';

/** Encrypted OTP verify — host decrypts and calls verifyGuestUserOtp. */
export const SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH = '/_internal/verify-guest-otp';

/** Encrypted password change — host decrypts and calls keycloakChangePassword. */
export const SHELL_INTERNAL_CHANGE_PASSWORD_PATH = '/_internal/keycloak-change-password';

export class ShellInternalAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShellInternalAuthError';
  }
}

const DEFAULT_INTERNAL_AUTH_ERROR = DEFAULT_API_ERROR_MESSAGE;

function normalizeBearerAccessToken(raw?: string): string {
  if (!raw) return '';
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, '').trim();
  }
  return token;
}

function readAccessTokenField(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const token = normalizeBearerAccessToken(value);
  return token || undefined;
}

function readAccessTokenFromNode(node: unknown, depth = 0): string | undefined {
  if (node == null || depth > 5) return undefined;

  if (typeof node === 'string') {
    const trimmed = node.trim();
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return undefined;
    try {
      return readAccessTokenFromNode(JSON.parse(trimmed) as unknown, depth + 1);
    } catch {
      return undefined;
    }
  }

  if (typeof node !== 'object') return undefined;

  const obj = node as Record<string, unknown>;
  const direct =
    readAccessTokenField(obj.access_token) ?? readAccessTokenField(obj.accessToken);
  if (direct) return direct;

  for (const key of ['data', 'message', 'response', 'result']) {
    const nested = readAccessTokenFromNode(obj[key], depth + 1);
    if (nested) return nested;
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') {
      const nested = readAccessTokenFromNode(value, depth + 1);
      if (nested) return nested;
    }
  }

  return undefined;
}

function readAccessTokenFromResponse(data: Record<string, unknown>): string | undefined {
  const rootToken =
    readAccessTokenField(data.access_token) ?? readAccessTokenField(data.accessToken);
  if (rootToken) return rootToken;

  return (
    readAccessTokenFromNode(data.data) ??
    readAccessTokenFromNode(data.message) ??
    readAccessTokenFromNode(data)
  );
}

function readConfiguredProxyBase(): string {
  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('api-proxy-base-url')
    ?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, '');

  const fromShell = window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, '');

  const fromMeta = document
    .querySelector('meta[name="mybharat-shell-api-proxy-base"]')
    ?.getAttribute('content')
    ?.trim();
  if (fromMeta) return fromMeta.replace(/\/$/, '');

  return '';
}

function resolveInternalAuthBase(): string {
  const explicit = readConfiguredProxyBase();
  if (explicit) return explicit;
  return SHELL_LOGIN_API_PROXY_DEFAULT;
}

function buildInternalAuthUrl(path: string): string {
  const base = resolveInternalAuthBase();
  if (!base) {
    throw new ShellInternalAuthError(DEFAULT_INTERNAL_AUTH_ERROR);
  }
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

async function postInternalAuth(path: string, forceRefresh = false): Promise<Record<string, unknown>> {
  const refreshSuffix = forceRefresh ? (path.includes('?') ? '&refresh=1' : '?refresh=1') : '';
  const url = `${buildInternalAuthUrl(path)}${refreshSuffix}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: forceRefresh ? { 'X-Shell-Auth-Refresh': '1' } : undefined,
    });
  } catch {
    throw new ShellInternalAuthError(DEFAULT_API_ERROR_MESSAGE);
  }

  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as Record<string, unknown> | unknown[];
    if (Array.isArray(parsed)) {
      return normalizeApiResponse(
        { status_code: res.status, data: parsed } as ApiErrorPayload,
        res.status
      ) as Record<string, unknown>;
    }
    return normalizeApiResponse(parsed as ApiErrorPayload, res.status) as Record<string, unknown>;
  } catch {
    return {
      status_code: res.ok ? 200 : res.status,
      message: DEFAULT_API_ERROR_MESSAGE,
    };
  }
}

/** POST JSON to same-origin internal auth route (encrypted secrets, secure gateway). */
export async function postInternalAuthJson<T extends Record<string, unknown>>(
  path: string,
  body: Record<string, unknown>
): Promise<T> {
  const url = buildInternalAuthUrl(path);
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ShellInternalAuthError(DEFAULT_API_ERROR_MESSAGE);
  }

  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as T;
    return normalizeApiResponse(parsed as ApiErrorPayload, res.status) as T;
  } catch {
    return {
      status_code: res.ok ? 200 : res.status,
      message: DEFAULT_API_ERROR_MESSAGE,
    } as unknown as T;
  }
}

let cachedKeycloakClientToken: string | null = null;
let keycloakClientTokenPromise: Promise<string> | null = null;
let cachedGuestOauthToken: string | null = null;

export function clearShellInternalKcAuthCache(): void {
  cachedKeycloakClientToken = null;
  keycloakClientTokenPromise = null;
}

export function clearShellInternalAuthCache(): void {
  clearShellInternalKcAuthCache();
  cachedGuestOauthToken = null;
}

function decodeJwtHeaderAlg(token: string): string {
  try {
    const parts = token.split('.');
    if (parts.length < 1) return '';
    const base64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const header = JSON.parse(atob(padded)) as { alg?: string };
    return header.alg ?? '';
  } catch {
    return '';
  }
}

function assertKeycloakClientJwt(token: string): void {
  if (decodeJwtHeaderAlg(token) !== 'RS256') {
    throw new ShellInternalAuthError(
      'Internal auth returned the wrong token type for Keycloak client access.'
    );
  }
}

/**
 * Keycloak client access token — never calls `/getKeycloakClientAccessToken` from the browser.
 */
export async function fetchInternalKeycloakClientAccessToken(
  forceRefresh = false
): Promise<string> {
  if (forceRefresh) {
    clearShellInternalKcAuthCache();
  }
  if (cachedKeycloakClientToken) {
    return cachedKeycloakClientToken;
  }
  if (keycloakClientTokenPromise) {
    return keycloakClientTokenPromise;
  }

  keycloakClientTokenPromise = (async () => {
    const data = await postInternalAuth(SHELL_INTERNAL_KC_CLIENT_PATH, forceRefresh);
    if (data.status_code === 404 || data.status_code === '404') {
      throw new ShellInternalAuthError(
        'Host proxy must map /_internal/kc-client → /api/getKeycloakClientAccessToken. See scripts/viteShellLoginProxy.mjs or docs/cakephp-shell-integration.md.'
      );
    }
    const token = readAccessTokenFromResponse(data);
    if (!token) {
      throw new ShellInternalAuthError(resolveUserFacingApiError(data as ApiErrorPayload));
    }
    assertKeycloakClientJwt(token);
    cachedKeycloakClientToken = token;
    return token;
  })();

  try {
    return await keycloakClientTokenPromise;
  } catch (err) {
    cachedKeycloakClientToken = null;
    keycloakClientTokenPromise = null;
    throw err;
  } finally {
    if (cachedKeycloakClientToken) {
      keycloakClientTokenPromise = null;
    }
  }
}

/**
 * Guest OTP OAuth token — credentials must not be sent from the browser.
 */
export async function fetchInternalGuestOauthAccessToken(
  forceRefresh = false
): Promise<string> {
  if (forceRefresh) {
    cachedGuestOauthToken = null;
  }
  if (cachedGuestOauthToken) {
    return cachedGuestOauthToken;
  }

  const data = await postInternalAuth(SHELL_INTERNAL_GUEST_OAUTH_PATH, forceRefresh);
  if (data.status_code === 404 || data.status_code === '404') {
    throw new ShellInternalAuthError(
      'Host proxy must map /_internal/guest-oauth → /api/oauth with server credentials. See scripts/viteShellLoginProxy.mjs.'
    );
  }
  const token = readAccessTokenFromResponse(data);
  if (!token) {
    throw new ShellInternalAuthError(resolveUserFacingApiError(data as ApiErrorPayload));
  }
  cachedGuestOauthToken = token;
  return token;
}
