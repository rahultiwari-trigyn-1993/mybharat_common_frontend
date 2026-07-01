/** Runtime environment supplied by the host app (browser). */
export type ClientEnvironment = 'local' | 'dev' | 'beta' | 'prod';

export type ShellRuntimeConfig = {
  baseUrl?: string;
  apiBaseUrl?: string;
  /** Host environment — required at runtime (`local` | `dev` | `beta` | `prod`). */
  environment?: ClientEnvironment;
  oauthUsername?: string;
  oauthPassword?: string;
  cookieDomain?: string;
  publicProfileApiBaseUrl?: string;
  recaptchaSiteKey?: string;
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
  cdnBase?: string;
  navItems?: unknown;
};
