/**
 * Vite dev-server proxy for MY Bharat header login (internal auth + APIGateway).
 *
 * Usage in host app vite.config.js:
 *
 *   import { mybharatShellLoginProxy } from './node_modules/mybharat_common_frontend/scripts/viteShellLoginProxy.mjs';
 *   // or copy this file into your repo
 *
 *   export default {
 *     server: {
 *       proxy: {
 *         ...mybharatShellLoginProxy(),
 *       },
 *     },
 *   };
 */

const DEFAULT_PREFIX = '/mybharat-shell-api';
const DEFAULT_TARGET = 'http://127.0.0.1:8000';

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
  const target = options.target ?? process.env.VITE_MYBHARAT_LOGIN_API_TARGET ?? DEFAULT_TARGET;
  const prefix = options.prefix ?? DEFAULT_PREFIX;
  const oauthUsername =
    options.oauthUsername ?? process.env.MYBHARAT_OAUTH_USERNAME ?? 'jJAKVlwUvbWb';
  const oauthPassword =
    options.oauthPassword ?? process.env.MYBHARAT_OAUTH_PASSWORD ?? '12345678';

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

          const body = new URLSearchParams({
            username: oauthUsername,
            password: oauthPassword,
          }).toString();

          proxyReq.setHeader('Content-Type', 'application/x-www-form-urlencoded');
          proxyReq.setHeader('Content-Length', String(Buffer.byteLength(body)));
          proxyReq.write(body);
        });
      },
    },
  };
}

export default mybharatShellLoginProxy;
