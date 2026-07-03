/**
 * APIGateway root for browser fetch.
 * Cross-origin URLs are rewritten to same-origin `/api` by default so the browser
 * sends POST only (no CORS OPTIONS preflight). Host must proxy `/api` → APIGateway.
 *
 * Opt out: `MYBHARAT_SHELL.login.sameOriginApi = false` or deprecated `crossOriginApi: true`.
 */
let loggedSameOriginRewrite = false;

function logSameOriginRewrite(from: string, to: string): void {
  if (loggedSameOriginRewrite) return;
  loggedSameOriginRewrite = true;
  console.info(
    `[mybharat_common_frontend] sameOriginApi: "${from}" → "${to}". ` +
      'Host must proxy /api to APIGateway (Vite or CakePHP). ' +
      'Set MYBHARAT_SHELL.login.sameOriginApi = false to keep cross-origin URLs.'
  );
}

function isSameOriginRewriteDisabled(): boolean {
  const login = window.MYBHARAT_SHELL?.login;
  if (login?.sameOriginApi === false) return true;
  /** @deprecated Allow cross-origin APIGateway (triggers CORS OPTIONS). */
  if (login?.crossOriginApi === true) return true;
  return false;
}

/** True when `base` resolves to the current page origin (relative `/api` or same host). */
export function isSameOriginApiBase(base: string): boolean {
  const trimmed = base?.trim().replace(/\/$/, '') ?? '';
  if (!trimmed) return false;
  if (typeof window === 'undefined') return trimmed.startsWith('/');
  if (!/^https?:\/\//i.test(trimmed)) return true;
  try {
    return new URL(trimmed).origin === window.location.origin;
  } catch {
    return false;
  }
}

/** Normalize configured APIGateway root for browser `fetch`. */
export function resolveBrowserApiBaseUrl(configured?: string): string {
  const trimmed = configured?.trim().replace(/\/$/, '') ?? '';
  if (!trimmed) return '';

  if (typeof window === 'undefined') return trimmed;
  if (isSameOriginRewriteDisabled()) return trimmed;
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
