/** Runtime environment supplied by the host app (browser). */
export type ClientEnvironment = 'local' | 'dev' | 'beta' | 'prod';

export type ShellRuntimeConfig = {
  baseUrl?: string;
  apiBaseUrl?: string;
  /** Host environment — required at runtime (`local` | `dev` | `beta` | `prod`). */
  environment?: ClientEnvironment;
  apiProxyBaseUrl?: string;
  cookieDomain?: string;
  publicProfileApiBaseUrl?: string;
  /** RSA public key PEM — browser-safe; skips /_internal/login-pubkey fetch when inlined. */
  loginPayloadPublicKey?: string;
  recaptchaSiteKey?: string;
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
  cdnBase?: string;
  navItems?: unknown;
};
