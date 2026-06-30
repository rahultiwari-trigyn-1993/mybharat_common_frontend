import { INTERNAL_PATHS } from './apiPaths';
import { mergeRequiredClientConfig } from './requireClientConfig';
import type { ClientEnvironment, ShellRuntimeConfig } from './types';

const CDN_ASSET_SEGMENT = 'mybharat';

/** Strip trailing slash and optional `/mybharat` so hosts can pass origin or full base. */
function normalizeCdnOrigin(cdnBase: string): string {
  return cdnBase.trim().replace(/\/$/, '').replace(/\/mybharat$/i, '');
}

export function resolveCdnBase(options?: { cdnBase?: string }): string {
  const merged = mergeRequiredClientConfig({ cdnBase: options?.cdnBase });
  const raw = merged.cdnBase?.trim();
  return raw ? normalizeCdnOrigin(raw) : '';
}

/** Build `{cdnBase}/mybharat/{assetPath}` for logos and static images on the CDN. */
export function resolveCdnAssetUrl(cdnBase: string, assetPath: string): string {
  const origin = normalizeCdnOrigin(cdnBase);
  const path = assetPath.replace(/^\/+/, '');
  if (!origin) return `/${CDN_ASSET_SEGMENT}/${path}`;
  return `${origin}/${CDN_ASSET_SEGMENT}/${path}`;
}

export function resolveShellLoginConfig(
  props?: ShellRuntimeConfig,
): ShellRuntimeConfig & { apiProxyBaseUrl: string } {
  const shell = window.MYBHARAT_SHELL?.login ?? {};
  const required = mergeRequiredClientConfig({
    baseUrl: props?.baseUrl,
    apiBaseUrl: props?.apiBaseUrl,
    environment: props?.environment,
    cdnBase: props?.cdnBase,
  });
  return {
    baseUrl: required.baseUrl,
    apiBaseUrl: required.apiBaseUrl,
    environment: required.environment as ClientEnvironment | undefined,
    cdnBase: required.cdnBase,
    apiProxyBaseUrl:
      props?.apiProxyBaseUrl?.trim() ||
      shell.apiProxyBaseUrl?.trim() ||
      INTERNAL_PATHS.proxyDefault,
    cookieDomain: props?.cookieDomain?.trim() || shell.cookieDomain?.trim(),
    publicProfileApiBaseUrl:
      props?.publicProfileApiBaseUrl?.trim() || shell.publicProfileApiBaseUrl?.trim(),
    recaptchaSiteKey: props?.recaptchaSiteKey?.trim(),
    feedbackApiBaseUrl: props?.feedbackApiBaseUrl?.trim(),
    rewardsApiBaseUrl: props?.rewardsApiBaseUrl?.trim(),
    navItems: props?.navItems,
  };
}
