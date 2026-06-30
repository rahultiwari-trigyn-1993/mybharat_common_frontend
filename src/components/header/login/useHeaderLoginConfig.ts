import { useEffect } from 'react';
import { assertRequiredClientConfig } from '../../../config/requireClientConfig';
import type { ClientEnvironment } from '../../../config/types';
import { applyShellLoginApiConfig } from './headerLoginFlow';

export type HeaderLoginConfig = {
  /** Portal origin for post-login redirects (trailing slash recommended). */
  baseUrl?: string;
  /**
   * MY Bharat login API root (absolute URL, no trailing slash).
   * Example: `http://127.0.0.1:8000/api` — required when shell runs on another app (e.g. registration on localhost:3000).
   */
  apiBaseUrl?: string;
  /** Host environment (`local` | `dev` | `beta` | `prod`). */
  environment?: ClientEnvironment;
  /**
   * Same-origin proxy base for login fetch (e.g. `/mybharat-shell-api`).
   * Required on cross-origin embeds to avoid CORS OPTIONS while keeping Authorization header.
   */
  apiProxyBaseUrl?: string;
  /** RSA public key PEM — optional; browser encrypts password/OTP before internal routes. Never pass private key here. */
  loginPayloadPublicKey?: string;
  /** Optional client IP for sendMobileGuestUserOtp when host cannot infer it server-side. */
  ipAddress?: string;
  /** Public profile API base for post-login `getUserId` (e.g. `{VITE_API_BASE_URL}/public-profile/v1`). */
  publicProfileApiBaseUrl?: string;
  /** Cookie domain for post-login token cookies. */
  cookieDomain?: string;
  /** CDN base for static assets (no trailing slash). */
  cdnBase?: string;
};

function applyHeaderLoginConfig(config?: HeaderLoginConfig): void {
  assertRequiredClientConfig({
    baseUrl: config?.baseUrl,
    apiBaseUrl: config?.apiBaseUrl,
    environment: config?.environment,
    cdnBase: config?.cdnBase,
  });

  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const loginPayloadPublicKey = config?.loginPayloadPublicKey?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();
  if (
    !baseUrl &&
    !apiBaseUrl &&
    !environment &&
    !cdnBase &&
    !apiProxyBaseUrl &&
    !loginPayloadPublicKey &&
    !ipAddress &&
    !publicProfileApiBaseUrl &&
    !cookieDomain
  ) {
    return;
  }

  if (apiBaseUrl || apiProxyBaseUrl) applyShellLoginApiConfig(apiBaseUrl, apiProxyBaseUrl);

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
      ...(environment ? { environment: environment as ClientEnvironment } : {}),
      ...(apiProxyBaseUrl ? { apiProxyBaseUrl } : {}),
      ...(loginPayloadPublicKey ? { loginPayloadPublicKey } : {}),
      ...(ipAddress ? { ipAddress } : {}),
      ...(publicProfileApiBaseUrl ? { publicProfileApiBaseUrl } : {}),
      ...(cookieDomain ? { cookieDomain } : {}),
    },
  };
}

/** Syncs React `Header` props into shell login config (isolated from host page `/api`). */
export function useHeaderLoginConfig(config?: HeaderLoginConfig): void {
  applyHeaderLoginConfig(config);

  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const loginPayloadPublicKey = config?.loginPayloadPublicKey?.trim();
  const ipAddress = config?.ipAddress?.trim();
  const publicProfileApiBaseUrl = config?.publicProfileApiBaseUrl?.trim();
  const cookieDomain = config?.cookieDomain?.trim();
  const cdnBase = config?.cdnBase?.trim();

  useEffect(() => {
    applyHeaderLoginConfig({
      baseUrl,
      apiBaseUrl,
      environment: environment as ClientEnvironment | undefined,
      cdnBase,
      apiProxyBaseUrl,
      loginPayloadPublicKey,
      ipAddress,
      publicProfileApiBaseUrl,
      cookieDomain,
    });
  }, [
    baseUrl,
    apiBaseUrl,
    environment,
    cdnBase,
    apiProxyBaseUrl,
    loginPayloadPublicKey,
    ipAddress,
    publicProfileApiBaseUrl,
    cookieDomain,
  ]);
}
