import type { ClientEnvironment } from './types';

export type RequiredClientConfigInput = {
  baseUrl?: string;
  apiBaseUrl?: string;
  environment?: string;
  cdnBase?: string;
};

const VALID_ENVIRONMENTS = new Set<ClientEnvironment>(['local', 'dev', 'beta', 'prod']);

const alerted = new Set<string>();

function alertOnce(key: string, message: string): void {
  if (typeof window === 'undefined' || alerted.has(key)) return;
  alerted.add(key);
  window.alert(message);
}

function readBaseUrlFromDom(): string | undefined {
  return document.querySelector('mybharat-header')?.getAttribute('login-base-url')?.trim();
}

function readApiBaseUrlFromDom(): string | undefined {
  return document.querySelector('mybharat-header')?.getAttribute('api-base-url')?.trim();
}

function readApiProxyBaseUrlFromDom(): string | undefined {
  const header = document.querySelector('mybharat-header');
  return (
    header?.getAttribute('api-proxy-base-url')?.trim() ||
    header?.getAttribute('api-proxy-baseurl')?.trim()
  );
}

function readConfiguredApiProxyBaseUrl(): string | undefined {
  return window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim() || readApiProxyBaseUrlFromDom();
}

function readEnvironmentFromDom(): string | undefined {
  return document.querySelector('mybharat-header')?.getAttribute('environment')?.trim();
}

function readCdnBaseFromDom(): string | undefined {
  return (
    document.querySelector('mybharat-header')?.getAttribute('cdn-base')?.trim() ||
    document.querySelector('mybharat-footer')?.getAttribute('cdn-base')?.trim()
  );
}

/** Merges React props, `window.MYBHARAT_SHELL`, and web-component attributes. */
export function mergeRequiredClientConfig(
  props?: RequiredClientConfigInput,
): RequiredClientConfigInput {
  const shellLogin = window.MYBHARAT_SHELL?.login;
  return {
    baseUrl:
      props?.baseUrl?.trim() || shellLogin?.baseUrl?.trim() || readBaseUrlFromDom(),
    apiBaseUrl:
      props?.apiBaseUrl?.trim() || shellLogin?.apiBaseUrl?.trim() || readApiBaseUrlFromDom(),
    environment:
      props?.environment?.trim() || shellLogin?.environment?.trim() || readEnvironmentFromDom(),
    cdnBase:
      props?.cdnBase?.trim() ||
      window.MYBHARAT_SHELL?.header?.cdnBase?.trim() ||
      window.MYBHARAT_SHELL?.footer?.cdnBase?.trim() ||
      readCdnBaseFromDom(),
  };
}

function isValidEnvironment(value?: string): value is ClientEnvironment {
  return !!value && VALID_ENVIRONMENTS.has(value as ClientEnvironment);
}

/**
 * Alerts when required host config is missing.
 * Each message is shown at most once per page load.
 */
export function assertRequiredClientConfig(props?: RequiredClientConfigInput): boolean {
  const merged = mergeRequiredClientConfig(props);
  let ok = true;

  if (!merged.baseUrl) {
    alertOnce('baseUrl', 'Base Url is not configured');
    ok = false;
  }

  if (!merged.apiBaseUrl && !readConfiguredApiProxyBaseUrl()) {
    alertOnce('apiBaseUrl', 'Api Base Url or login proxy (api-proxy-base-url) is not configured');
    ok = false;
  }

  if (!isValidEnvironment(merged.environment)) {
    alertOnce('environment', 'Environment is not configured');
    ok = false;
  }

  if (!merged.cdnBase) {
    alertOnce('cdnBase', 'Cdn Base Url is not configured');
    ok = false;
  }

  return ok;
}

export function readClientEnvironment(
  props?: RequiredClientConfigInput,
): ClientEnvironment | undefined {
  const env = mergeRequiredClientConfig(props).environment;
  return isValidEnvironment(env) ? env : undefined;
}
