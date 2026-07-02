import { SHELL_LOGIN_PROXY_DEFAULT } from '../../../config/apiPaths';

function readProxyMetaTag(): string {
  if (typeof document === 'undefined') return '';
  return (
    document
      .querySelector('meta[name="mybharat-shell-api-proxy-base-url"]')
      ?.getAttribute('content')
      ?.trim() || ''
  );
}

function readHeaderProxyAttribute(): string {
  if (typeof document === 'undefined') return '';
  const headerEl = document.querySelector('mybharat-header');
  if (!headerEl) return '';
  return (
    headerEl.getAttribute('api-proxy-base-url')?.trim() ||
    headerEl.getAttribute('api-proxy-baseurl')?.trim() ||
    ''
  );
}

/** Sync `<mybharat-header api-proxy-base-url>` into shell login config. */
export function syncShellLoginProxyConfigFromDom(): void {
  const apiProxyBaseUrl = readHeaderProxyAttribute() || readProxyMetaTag();
  if (!apiProxyBaseUrl) return;

  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      apiProxyBaseUrl,
    },
  };
}

/** Same-origin BFF prefix, e.g. `/mybharat-shell-api`. Empty when direct gateway mode. */
export function readShellLoginProxyPrefix(): string {
  syncShellLoginProxyConfigFromDom();
  return (
    window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim() ||
    readHeaderProxyAttribute() ||
    readProxyMetaTag() ||
    ''
  );
}

export function isShellLoginBffEnabled(): boolean {
  return Boolean(readShellLoginProxyPrefix());
}

export function resolveShellLoginProxyPrefix(configured?: string): string {
  const value = configured?.trim() || readShellLoginProxyPrefix();
  return value || SHELL_LOGIN_PROXY_DEFAULT;
}
