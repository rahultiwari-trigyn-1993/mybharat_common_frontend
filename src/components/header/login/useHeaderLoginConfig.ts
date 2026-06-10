import { useEffect } from 'react';

export type HeaderLoginConfig = {
  /** Portal origin for post-login redirects (trailing slash recommended). */
  baseUrl?: string;
  /** API origin for header login OTP flows (e.g. `/api` in dev, full URL in prod). */
  apiBaseUrl?: string;
};

function applyHeaderLoginConfig(config?: HeaderLoginConfig): void {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  if (!baseUrl && !apiBaseUrl) return;

  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...(baseUrl ? { baseUrl } : {}),
      ...(apiBaseUrl ? { apiBaseUrl } : {}),
    },
  };
}

/** Syncs React `Header` props into `window.MYBHARAT_SHELL.login` for login modals. */
export function useHeaderLoginConfig(config?: HeaderLoginConfig): void {
  applyHeaderLoginConfig(config);

  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();

  useEffect(() => {
    applyHeaderLoginConfig({ baseUrl, apiBaseUrl });
  }, [baseUrl, apiBaseUrl]);
}
