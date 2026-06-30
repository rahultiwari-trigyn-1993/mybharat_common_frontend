import { DEV_API_PROXY_PREFIXES, INTERNAL_PATHS, PROXY_REWRITES } from '../src/config/apiPaths';

export type ServerEnvConfig = {
  apiTarget: string;
  proxyPrefix: string;
  oauth: { username: string; password: string };
  loginPayload: { privateKey: string; publicKey: string };
};

/** Server-only environment — never import from browser bundles. */
export function readServerEnv(overrides?: Partial<ServerEnvConfig>): ServerEnvConfig {
  return {
    apiTarget: (
      overrides?.apiTarget ??
      process.env.MYBHARAT_LOGIN_API_TARGET?.trim() ??
      ''
    ).replace(/\/$/, ''),
    proxyPrefix:
      overrides?.proxyPrefix ??
      process.env.MYBHARAT_LOGIN_API_PROXY_PREFIX ??
      INTERNAL_PATHS.proxyDefault,
    oauth: {
      username:
        overrides?.oauth?.username ?? process.env.MYBHARAT_OAUTH_USERNAME?.trim() ?? '',
      password:
        overrides?.oauth?.password ?? process.env.MYBHARAT_OAUTH_PASSWORD?.trim() ?? '',
    },
    loginPayload: {
      privateKey:
        overrides?.loginPayload?.privateKey ??
        process.env.LOGIN_PAYLOAD_PRIVATE_KEY?.trim() ??
        '',
      publicKey:
        overrides?.loginPayload?.publicKey ??
        process.env.LOGIN_PAYLOAD_PUBLIC_KEY?.trim() ??
        '',
    },
  };
}

export function requireApiTarget(apiTarget: string): string {
  const value = apiTarget.trim();
  if (value) return value.replace(/\/$/, '');
  throw new Error(
    'MYBHARAT_LOGIN_API_TARGET is required. ' +
      'Set it in the host server environment (never VITE_* or browser config).'
  );
}

export function requireOAuthCredentials(oauth: { username: string; password: string }): {
  username: string;
  password: string;
} {
  if (oauth.username && oauth.password) return oauth;
  throw new Error(
    'MYBHARAT_OAUTH_USERNAME and MYBHARAT_OAUTH_PASSWORD are required. ' +
      'Set them in the host server environment (never VITE_* or browser config).'
  );
}

export { DEV_API_PROXY_PREFIXES, INTERNAL_PATHS, PROXY_REWRITES };
