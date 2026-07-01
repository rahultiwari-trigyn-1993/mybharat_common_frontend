/**
 * Browser fetch should use same-origin `/api` when APIGateway is on another host/port.
 * Cross-origin POST + Authorization triggers an automatic OPTIONS preflight (not a duplicate POST).
 * Host dev server must proxy `/api` → APIGateway (see `scripts/viteShellLoginProxy.mjs`).
 */
let loggedSameOriginRewrite = false;

function logSameOriginRewrite(from: string, to: string): void {
  if (loggedSameOriginRewrite) return;
  loggedSameOriginRewrite = true;
  console.info(
    `[mybharat_common_frontend] apiBaseUrl "${from}" → "${to}" to avoid CORS OPTIONS preflight. ` +
      'Add a dev proxy (mybharatApiGatewayProxy in vite.config). ' +
      'Set MYBHARAT_SHELL.login.crossOriginApi = true to keep the absolute URL.'
  );
}

/** Normalize configured APIGateway root for browser `fetch`. */
export function resolveBrowserApiBaseUrl(configured?: string): string {
  const trimmed = configured?.trim().replace(/\/$/, '') ?? '';
  if (!trimmed) return '';

  if (typeof window === 'undefined') return trimmed;

  const login = window.MYBHARAT_SHELL?.login;
  if (login?.crossOriginApi === true) return trimmed;

  if (!/^https?:\/\//i.test(trimmed)) return trimmed;

  try {
    const parsed = new URL(trimmed);
    if (parsed.origin === window.location.origin) return trimmed;

    const apiPath = parsed.pathname.replace(/\/$/, '') || '/api';
    if (apiPath === '/api' || apiPath.endsWith('/api')) {
      logSameOriginRewrite(trimmed, apiPath);
      return apiPath;
    }
  } catch {
    return trimmed;
  }

  return trimmed;
}
