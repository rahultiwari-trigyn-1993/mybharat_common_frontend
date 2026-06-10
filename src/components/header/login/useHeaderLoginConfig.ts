import { useEffect } from 'react';
import { applyShellLoginApiConfig } from './headerLoginFlow';

export type HeaderLoginConfig = {
  /** Portal origin for post-login redirects (trailing slash recommended). */
  baseUrl?: string;
  /**
   * MY Bharat login API root (absolute URL, no trailing slash).
   * Example: `http://127.0.0.1:8000/api` — required when shell runs on another app (e.g. registration on localhost:3000).
   */
  apiBaseUrl?: string;
};

function applyHeaderLoginConfig(config?: HeaderLoginConfig): void {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  if (!baseUrl && !apiBaseUrl) return;

  if (apiBaseUrl) applyShellLoginApiConfig(apiBaseUrl);

  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...(baseUrl ? { baseUrl } : {}),
      ...(apiBaseUrl ? { apiBaseUrl } : {}),
    },
  };
}

/** Syncs React `Header` props into shell login config (isolated from host page `/api`). */
export function useHeaderLoginConfig(config?: HeaderLoginConfig): void {
  applyHeaderLoginConfig(config);

  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();

  useEffect(() => {
    applyHeaderLoginConfig({ baseUrl, apiBaseUrl });
  }, [baseUrl, apiBaseUrl]);
}
