/**
 * APIGateway root for browser fetch.
 * Default: use `apiBaseUrl` as configured (e.g. `http://127.0.0.1:8000/api`).
 * Set `MYBHARAT_SHELL.login.sameOriginApi = true` to rewrite cross-origin URLs to `/api`
 * when the host proxies `/api` → APIGateway (avoids CORS OPTIONS).
 */
let loggedSameOriginRewrite = false;

function logSameOriginRewrite(from: string, to: string): void {
  if (loggedSameOriginRewrite) return;
  loggedSameOriginRewrite = true;
  console.info(
    `[mybharat_common_frontend] sameOriginApi: "${from}" → "${to}". ` +
      'Host must proxy /api to APIGateway (Vite or CakePHP).'
  );
}

/** Normalize configured APIGateway root for browser `fetch`. */
export function resolveBrowserApiBaseUrl(configured?: string): string {
  const trimmed = configured?.trim().replace(/\/$/, '') ?? '';
  if (!trimmed) return '';

  if (typeof window === 'undefined') return trimmed;

  const login = window.MYBHARAT_SHELL?.login;
  if (login?.sameOriginApi !== true) return trimmed;

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
