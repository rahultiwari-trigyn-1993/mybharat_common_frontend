import { BFF_INTERNAL_PATHS } from '../../../config/apiPaths';
import {
  isApiSuccessStatus,
  normalizeApiResponse,
  type ApiErrorPayload,
} from './loginApiErrorMessage';
import {
  isShellLoginBffEnabled,
  readShellLoginProxyPrefix,
  syncShellLoginProxyConfigFromDom,
} from './shellLoginProxyConfig';

export { BFF_INTERNAL_PATHS };

/** Gateway payloads often omit top-level status_code (e.g. checkUserExists message.given_data). */
export function normalizeShellLoginBffPayload<T extends Record<string, unknown>>(
  data: T,
  httpStatus = 200,
): T {
  let normalized = normalizeApiResponse(data as ApiErrorPayload, httpStatus) as T;

  if (!isApiSuccessStatus((normalized as ApiErrorPayload).status_code)) {
    const message = (normalized as ApiErrorPayload).message;
    if (message && typeof message === 'object' && !Array.isArray(message)) {
      const given = (message as Record<string, unknown>).given_data;
      if (typeof given === 'string' && given.trim()) {
        normalized = { ...normalized, status_code: 200 };
      }
    }
  }

  return normalized;
}

export function buildShellLoginBffUrl(relativePath: string): string {
  syncShellLoginProxyConfigFromDom();
  const prefix = readShellLoginProxyPrefix().replace(/\/$/, '');
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  if (!prefix) return path;
  return `${prefix}${path}`;
}

function buildRefreshQuery(forceRefresh: boolean): string {
  return forceRefresh ? '?refresh=1' : '';
}

export async function postShellLoginBffJson<T extends Record<string, unknown>>(
  relativePath: string,
  body: Record<string, unknown>,
  options?: { forceRefresh?: boolean },
): Promise<T> {
  const url = `${buildShellLoginBffUrl(relativePath)}${buildRefreshQuery(Boolean(options?.forceRefresh))}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options?.forceRefresh ? { 'X-Shell-Auth-Refresh': '1' } : {}),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Unable to reach the login service. Please try again.');
  }

  const text = await res.text();
  try {
    return normalizeShellLoginBffPayload(JSON.parse(text) as T, res.status);
  } catch {
    const fallback: Record<string, unknown> = {
      status_code: res.status,
      message: text || 'Login service error.',
    };
    return normalizeShellLoginBffPayload(fallback as unknown as T, res.status);
  }
}

function readBearerFromBffResponse(data: Record<string, unknown>): string {
  const direct =
    (typeof data.access_token === 'string' && data.access_token.trim()) ||
    (typeof data.accessToken === 'string' && data.accessToken.trim()) ||
    (typeof data.token === 'string' && data.token.trim()) ||
    '';
  if (direct) return direct.replace(/^bearer\s+/i, '').trim();

  const nested = data.data;
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    const node = nested as Record<string, unknown>;
    const token =
      (typeof node.access_token === 'string' && node.access_token.trim()) ||
      (typeof node.accessToken === 'string' && node.accessToken.trim()) ||
      '';
    if (token) return token.replace(/^bearer\s+/i, '').trim();
  }

  return '';
}

export async function fetchBffKeycloakClientAccessToken(forceRefresh = false): Promise<string> {
  if (!isShellLoginBffEnabled()) {
    throw new Error('Login proxy is not configured.');
  }
  const data = await postShellLoginBffJson<Record<string, unknown>>(
    BFF_INTERNAL_PATHS.kcClient,
    {},
    { forceRefresh },
  );
  const token = readBearerFromBffResponse(data);
  if (!token) {
    const message =
      typeof data.message === 'string' && data.message.trim()
        ? data.message
        : 'Keycloak client token failed.';
    throw new Error(message);
  }
  return token;
}

/** Same-origin form POST to the login BFF (no CORS preflight). */
export async function postShellLoginBffForm<T extends Record<string, unknown>>(
  relativePath: string,
  form: Record<string, string>,
  options?: { forceRefresh?: boolean },
): Promise<T> {
  const url = `${buildShellLoginBffUrl(relativePath)}${buildRefreshQuery(Boolean(options?.forceRefresh))}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'application/json',
        ...(options?.forceRefresh ? { 'X-Shell-Auth-Refresh': '1' } : {}),
      },
      body: new URLSearchParams(form),
    });
  } catch {
    throw new Error('Unable to reach the login service. Please try again.');
  }

  const text = await res.text();
  try {
    return normalizeShellLoginBffPayload(JSON.parse(text) as T, res.status);
  } catch {
    const fallback: Record<string, unknown> = {
      status_code: res.status,
      message: text || 'Login service error.',
    };
    return normalizeShellLoginBffPayload(fallback as unknown as T, res.status);
  }
}

export async function fetchBffGuestOauthAccessToken(forceRefresh = false): Promise<string> {
  if (!isShellLoginBffEnabled()) {
    throw new Error('Login proxy is not configured.');
  }
  const data = await postShellLoginBffJson<Record<string, unknown>>(
    BFF_INTERNAL_PATHS.guestOauth,
    {},
    { forceRefresh },
  );
  const token = readBearerFromBffResponse(data);
  if (!token) {
    const message =
      typeof data.message === 'string' && data.message.trim()
        ? data.message
        : 'Guest OAuth token failed.';
    throw new Error(message);
  }
  return token;
}
