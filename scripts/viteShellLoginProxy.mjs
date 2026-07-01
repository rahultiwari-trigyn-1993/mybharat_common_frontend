/**
 * Vite dev-server proxy for MY Bharat header login (APIGateway).
 *
 * Direct APIGateway mode (v1.0.240+): proxy same-origin `/api` → APIGateway.
 * Set `apiBaseUrl: "http://127.0.0.1:8000/api"` in the app — the shell rewrites it to `/api` in the browser.
 *
 * Usage in host app vite.config.js:
 *
 *   import { mybharatApiGatewayProxy } from './node_modules/mybharat_common_frontend/scripts/viteShellLoginProxy.mjs';
 *
 *   export default {
 *     server: {
 *       proxy: {
 *         ...mybharatApiGatewayProxy(),
 *       },
 *     },
 *   };
 *
 * Legacy internal-auth proxy (`/mybharat-shell-api`) — see `mybharatShellLoginProxy`.
 */

import { readServerEnv, requireApiTarget, requireOAuthCredentials } from './readServerEnv.mjs';

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {object} [options]
 * @param {string} [options.target] APIGateway origin (no trailing slash path)
 * @param {string} [options.prefix] Same-origin prefix the shell calls (default `/mybharat-shell-api`)
 * @param {string} [options.oauthUsername] Server-only — env `MYBHARAT_OAUTH_USERNAME`
 * @param {string} [options.oauthPassword] Server-only — env `MYBHARAT_OAUTH_PASSWORD`
 */
export function mybharatShellLoginProxy(options = {}) {
  const env = readServerEnv(options);
  const target = requireApiTarget(env.apiTarget);
  const prefix = env.proxyPrefix;
  const prefixPattern = new RegExp(`^${escapeRegex(prefix)}`);

  return {
    [prefix]: {
      target,
      changeOrigin: true,
      rewrite: (path) => {
        if (path.includes('/_internal/kc-client')) {
          return '/api/getKeycloakClientAccessToken';
        }
        if (path.includes('/_internal/guest-oauth')) {
          return '/api/oauth';
        }
        return path.replace(prefixPattern, '/api');
      },
      configure: (proxy) => {
        proxy.on('proxyReq', (proxyReq, req) => {
          if (!req.url?.includes('/_internal/guest-oauth')) return;

          const { username, password } = requireOAuthCredentials(env.oauth);
          const body = new URLSearchParams({ username, password }).toString();

          proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded');
          proxyReq.setHeader('Content-Length', String(Buffer.byteLength(body)));
          proxyReq.write(body);
        });
      },
    },
  };
}

/**
 * Same-origin `/api` proxy — browser sends POST only (no CORS OPTIONS preflight).
 * @param {object} [options]
 * @param {string} [options.target] APIGateway origin, e.g. `http://127.0.0.1:8000`
 * @param {string} [options.apiPrefix] Browser path (default `/api`)
 */
export function mybharatApiGatewayProxy(options = {}) {
  const env = readServerEnv(options);
  const target = requireApiTarget(env.apiTarget);
  const apiPrefix = options.apiPrefix ?? '/api';

  return {
    [apiPrefix]: {
      target,
      changeOrigin: true,
      secure: false,
    },
  };
}

export default mybharatShellLoginProxy;
