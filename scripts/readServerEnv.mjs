const DEFAULT_PROXY_PREFIX = '/mybharat-shell-api';

/**
 * Server-only env for login proxy / Vite internal-auth plugin.
 * OAuth credentials are required when guest-oauth proxy is used.
 */
export function readServerEnv(options = {}) {
  const apiTarget =
    options.target ?? process.env.MYBHARAT_LOGIN_API_TARGET?.trim() ?? '';
  const proxyPrefix =
    options.prefix ??
    process.env.MYBHARAT_LOGIN_API_PROXY_PREFIX ??
    DEFAULT_PROXY_PREFIX;

  return {
    apiTarget: apiTarget.replace(/\/$/, ''),
    proxyPrefix,
    oauth: {
      username: options.oauthUsername ?? process.env.MYBHARAT_OAUTH_USERNAME?.trim() ?? '',
      password: options.oauthPassword ?? process.env.MYBHARAT_OAUTH_PASSWORD?.trim() ?? '',
    },
    loginPayload: {
      privateKey: process.env.LOGIN_PAYLOAD_PRIVATE_KEY?.trim() ?? '',
      publicKey: process.env.LOGIN_PAYLOAD_PUBLIC_KEY?.trim() ?? '',
    },
  };
}

export function requireApiTarget(apiTarget) {
  const value = typeof apiTarget === 'string' ? apiTarget.trim() : '';
  if (value) return value.replace(/\/$/, '');
  throw new Error(
    'MYBHARAT_LOGIN_API_TARGET is required for the login API proxy. ' +
      'Set it in the host app .env (server-only, never VITE_*).'
  );
}

export function requireOAuthCredentials(oauth) {
  if (oauth.username && oauth.password) return oauth;
  throw new Error(
    'MYBHARAT_OAUTH_USERNAME and MYBHARAT_OAUTH_PASSWORD are required for guest OAuth proxy. ' +
      'Set them in the host app .env (server-only, never VITE_*).'
  );
}
