export type { ClientEnvironment, ShellRuntimeConfig } from './types';
export {
  GATEWAY_PATHS,
  BFF_INTERNAL_PATHS,
  SHELL_LOGIN_PROXY_DEFAULT,
  INTERNAL_PATHS,
  PROXY_REWRITES,
  PORTAL_PATHS,
  DEV_API_PROXY_PREFIXES,
} from './apiPaths';
export { APP_ROUTES } from './routes';
export { AUTH_CONFIG } from './auth';
export { EXTERNAL_URLS } from './external';
export { DEFAULT_API_ERROR_MESSAGE, OTP_MESSAGES } from './messages';
export { resolveCdnBase, resolveCdnAssetUrl, resolveShellLoginConfig } from './resolve';
export {
  assertRequiredClientConfig,
  mergeRequiredClientConfig,
  readClientEnvironment,
  type RequiredClientConfigInput,
} from './requireClientConfig';
