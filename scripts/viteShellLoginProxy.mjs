/**
 * Vite dev-server proxy for MY Bharat header login (internal auth + APIGateway).
 *
 * Usage in host app vite.config.js:
 *
 *   import { mybharatShellLoginProxy } from './node_modules/mybharat_common_frontend/scripts/viteShellLoginProxy.mjs';
 *
 *   export default {
 *     server: {
 *       proxy: {
 *         ...mybharatShellLoginProxy(),
 *       },
 *     },
 *   };
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

export default mybharatShellLoginProxy;
