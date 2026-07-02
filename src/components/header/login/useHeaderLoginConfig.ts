import { useEffect } from 'react';
import { assertRequiredClientConfig } from '../../../config/requireClientConfig';
import type { ClientEnvironment } from '../../../config/types';
import { applyShellLoginApiConfig } from './headerLoginFlow';

export type HeaderLoginConfig = {
  /** Portal origin for post-login redirects (trailing slash recommended). */
  baseUrl?: string;
  /** APIGateway root — e.g. `https://api.mybharat.gov.in/api` or `/api`. */
  apiBaseUrl?: string;
  /** Same-origin login BFF prefix — e.g. `/mybharat-shell-api`. */
  apiProxyBaseUrl?: string;
  /** Host environment (`local` | `dev` | `beta` | `prod`). */
  environment?: ClientEnvironment;
  /** Guest OAuth username for sendMobileGuestUserOtp / verifyGuestUserOtp. */
  oauthUsername?: string;
  /** Guest OAuth password for sendMobileGuestUserOtp / verifyGuestUserOtp. */
  oauthPassword?: string;
  /** Optional client IP for sendMobileGuestUserOtp when host cannot infer it server-side. */
  ipAddress?: string;
  /** Public profile API base for post-login `getUserId`. */
  publicProfileApiBaseUrl?: string;
  /** Cookie domain for post-login token cookies. */
  cookieDomain?: string;
  /** CDN base for static assets (no trailing slash). */
  cdnBase?: string;
};

function applyHeaderLoginConfig(config?: HeaderLoginConfig): void {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const oauthUsername = config?.oauthUsername?.trim();
  const oauthPassword = config?.oauthPassword?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();
  if (
    !baseUrl &&
    !apiBaseUrl &&
    !apiProxyBaseUrl &&
    !environment &&
    !cdnBase &&
    !oauthUsername &&
    !oauthPassword &&
    !ipAddress &&
    !publicProfileApiBaseUrl &&
    !cookieDomain
  ) {
    return;
  }

  if (apiBaseUrl && !apiProxyBaseUrl) applyShellLoginApiConfig(apiBaseUrl);

  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    ...(cdnBase
      ? {
          header: { ...window.MYBHARAT_SHELL?.header, cdnBase },
          footer: { ...window.MYBHARAT_SHELL?.footer, cdnBase },
        }
      : {}),
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...(baseUrl ? { baseUrl } : {}),
      ...(apiBaseUrl ? { apiBaseUrl } : {}),
      ...(apiProxyBaseUrl ? { apiProxyBaseUrl } : {}),
      ...(environment ? { environment: environment as ClientEnvironment } : {}),
      ...(oauthUsername ? { oauthUsername } : {}),
      ...(oauthPassword ? { oauthPassword } : {}),
      ...(ipAddress ? { ipAddress } : {}),
      ...(publicProfileApiBaseUrl ? { publicProfileApiBaseUrl } : {}),
      ...(cookieDomain ? { cookieDomain } : {}),
    },
  };

  assertRequiredClientConfig({
    baseUrl,
    apiBaseUrl,
    apiProxyBaseUrl,
    environment,
    cdnBase,
  });
}

/** Syncs React `Header` props into shell login config. */
export function useHeaderLoginConfig(config?: HeaderLoginConfig): void {
  applyHeaderLoginConfig(config);

  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const oauthUsername = config?.oauthUsername?.trim();
  const oauthPassword = config?.oauthPassword?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();

  useEffect(() => {
    applyHeaderLoginConfig({
      baseUrl,
      apiBaseUrl,
      apiProxyBaseUrl,
      environment: environment as ClientEnvironment | undefined,
      cdnBase,
      oauthUsername,
      oauthPassword,
      ipAddress,
      publicProfileApiBaseUrl,
      cookieDomain,
    });
  }, [
    baseUrl,
    apiBaseUrl,
    apiProxyBaseUrl,
    environment,
    cdnBase,
    oauthUsername,
    oauthPassword,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain,
  ]);
}
