/**
 * APIGateway auth tokens — uses same-origin BFF when `api-proxy-base-url` is configured,
 * otherwise falls back to direct APIGateway calls (legacy; requires oauth in page config).
 */
import { GATEWAY_PATHS } from '../../../config/apiPaths';
import { resolveBrowserApiBaseUrl } from '../../../config/resolveBrowserApiBaseUrl';
import {
  DEFAULT_API_ERROR_MESSAGE,
  normalizeApiResponse,
  resolveUserFacingApiError,
  type ApiErrorPayload,
} from './loginApiErrorMessage';
import {
  fetchBffGuestOauthAccessToken,
  fetchBffKeycloakClientAccessToken,
} from './shellLoginBff';
import { isShellLoginBffEnabled } from './shellLoginProxyConfig';

export class ShellGatewayAuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShellGatewayAuthError';
  }
}

let cachedKeycloakClientToken: string | null = null;
let keycloakClientTokenPromise: Promise<string> | null = null;
let cachedGuestOauthToken: string | null = null;
let warnedLegacyOauthInPage = false;

export function clearShellInternalKcAuthCache(): void {
  cachedKeycloakClientToken = null;
  keycloakClientTokenPromise = null;
}

export function clearShellInternalAuthCache(): void {
  clearShellInternalKcAuthCache();
  cachedGuestOauthToken = null;
}

function warnLegacyOauthInPageOnce(): void {
  if (warnedLegacyOauthInPage || typeof console === 'undefined') return;
  warnedLegacyOauthInPage = true;
  console.warn(
    '[mybharat-shell] Direct APIGateway login mode: set api-proxy-base-url on <mybharat-header> ' +
      'and remove oauth-username/oauth-password from the page. See docs/cakephp-shell-auth-bff.md',
  );
}

function readApiBaseUrl(): string {
  const fromShell = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (fromShell) return resolveBrowserApiBaseUrl(fromShell);

  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('api-base-url')
    ?.trim();
  if (fromHeader) return resolveBrowserApiBaseUrl(fromHeader);

  const fromMeta = document
    .querySelector('meta[name="mybharat-shell-api-base-url"]')
    ?.getAttribute('content')
    ?.trim();
  return fromMeta ? resolveBrowserApiBaseUrl(fromMeta) : '';
}

function buildGatewayUrl(path: string): string {
  const base = readApiBaseUrl();
  if (!base) {
    throw new ShellGatewayAuthError('Api Base Url is not configured');
  }
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

function normalizeBearerAccessToken(raw?: string): string {
  if (!raw) return '';
  return raw.trim().replace(/^bearer\s+/i, '').trim();
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
  return undefined;
}

function readAccessTokenFromResponse(data: Record<string, unknown>): string | undefined {
  const root =
    readAccessTokenField(data.access_token) ?? readAccessTokenField(data.accessToken);
  if (root) return root;
  return (
    readAccessTokenFromNode(data.data) ??
    readAccessTokenFromNode(data.message) ??
    readAccessTokenFromNode(data)
  );
}

function decodeJwtHeaderAlg(token: string): string {
  try {
    const parts = token.split('.');
    if (parts.length < 1) return '';
    const base64 = parts[0]!.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const header = JSON.parse(atob(padded)) as { alg?: string };
    return header.alg ?? '';
  } catch {
    return '';
  }
}

async function parseGatewayJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as Record<string, unknown> | unknown[];
    if (Array.isArray(parsed)) {
      return normalizeApiResponse(
        { status_code: res.status, data: parsed } as ApiErrorPayload,
        res.status,
      ) as Record<string, unknown>;
    }
    return normalizeApiResponse(parsed as ApiErrorPayload, res.status) as Record<string, unknown>;
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: DEFAULT_API_ERROR_MESSAGE };
  }
}

function readOauthCredentials(): { username: string; password: string } {
  warnLegacyOauthInPageOnce();
  const login = window.MYBHARAT_SHELL?.login;
  return {
    username: login?.oauthUsername?.trim() ?? '',
    password: login?.oauthPassword?.trim() ?? '',
  };
}

async function fetchDirectKeycloakClientAccessToken(forceRefresh = false): Promise<string> {
  if (forceRefresh) clearShellInternalKcAuthCache();
  if (cachedKeycloakClientToken) return cachedKeycloakClientToken;
  if (keycloakClientTokenPromise) return keycloakClientTokenPromise;

  keycloakClientTokenPromise = (async () => {
    let res: Response;
    try {
      res = await fetch(buildGatewayUrl(GATEWAY_PATHS.getKeycloakClientAccessToken), {
        method: 'POST',
        credentials: 'omit',
        headers: { Accept: 'application/json' },
      });
    } catch {
      throw new ShellGatewayAuthError(DEFAULT_API_ERROR_MESSAGE);
    }

    const data = await parseGatewayJson(res);
    const token = readAccessTokenFromResponse(data);
    if (!token) {
      throw new ShellGatewayAuthError(resolveUserFacingApiError(data as ApiErrorPayload));
    }
    if (decodeJwtHeaderAlg(token) !== 'RS256') {
      throw new ShellGatewayAuthError('Keycloak client token has unexpected format.');
    }
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
    if (cachedKeycloakClientToken) keycloakClientTokenPromise = null;
  }
}

async function fetchDirectGuestOauthAccessToken(forceRefresh = false): Promise<string> {
  if (forceRefresh) cachedGuestOauthToken = null;
  if (cachedGuestOauthToken) return cachedGuestOauthToken;

  const { username, password } = readOauthCredentials();
  if (!username || !password) {
    throw new ShellGatewayAuthError(
      'Guest OAuth is not configured. Set api-proxy-base-url on the host, or MYBHARAT_SHELL.login.oauthUsername and oauthPassword.',
    );
  }

  let res: Response;
  try {
    res = await fetch(buildGatewayUrl(GATEWAY_PATHS.oauth), {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({ username, password }).toString(),
    });
  } catch {
    throw new ShellGatewayAuthError(DEFAULT_API_ERROR_MESSAGE);
  }

  const data = await parseGatewayJson(res);
  const token = readAccessTokenFromResponse(data);
  if (!token) {
    throw new ShellGatewayAuthError(resolveUserFacingApiError(data as ApiErrorPayload));
  }
  cachedGuestOauthToken = token;
  return token;
}

/** Keycloak client access token — via BFF when configured. */
export async function fetchInternalKeycloakClientAccessToken(
  forceRefresh = false,
): Promise<string> {
  if (isShellLoginBffEnabled()) {
    if (forceRefresh) clearShellInternalKcAuthCache();
    if (cachedKeycloakClientToken && !forceRefresh) return cachedKeycloakClientToken;
    const token = await fetchBffKeycloakClientAccessToken(forceRefresh);
    cachedKeycloakClientToken = token;
    return token;
  }
  return fetchDirectKeycloakClientAccessToken(forceRefresh);
}

/** Guest OAuth token for OTP APIs — via BFF when configured. */
export async function fetchInternalGuestOauthAccessToken(
  forceRefresh = false,
): Promise<string> {
  if (isShellLoginBffEnabled()) {
    if (forceRefresh) cachedGuestOauthToken = null;
    if (cachedGuestOauthToken && !forceRefresh) return cachedGuestOauthToken;
    const token = await fetchBffGuestOauthAccessToken(forceRefresh);
    cachedGuestOauthToken = token;
    return token;
  }
  return fetchDirectGuestOauthAccessToken(forceRefresh);
}
