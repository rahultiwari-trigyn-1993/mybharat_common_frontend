import { BFF_INTERNAL_PATHS } from '../../../config/apiPaths';
import {
  isShellLoginBffEnabled,
  readShellLoginProxyPrefix,
  syncShellLoginProxyConfigFromDom,
} from './shellLoginProxyConfig';

export { BFF_INTERNAL_PATHS };

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
    return JSON.parse(text) as T;
  } catch {
    return { status_code: res.status, message: text || 'Login service error.' } as T;
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
