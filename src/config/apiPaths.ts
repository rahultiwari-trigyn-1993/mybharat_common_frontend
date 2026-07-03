/** APIGateway paths (appended to `apiBaseUrl`, e.g. `https://host/api/checkUserExists`). */
export const GATEWAY_PATHS = {
  getKeycloakClientAccessToken: '/getKeycloakClientAccessToken',
  oauth: '/oauth',
  keycloakLogin: '/keycloakLogin',
  verifyGuestUserOtp: '/verifyGuestUserOtp',
  keycloakChangePassword: '/keycloakChangePassword',
  checkUserExists: '/checkUserExists',
  sendMobileGuestUserOtp: '/sendMobileGuestUserOtp',
  keycloakGetExchangeToken: '/keycloakGetExchangeToken',
  keycloakForgotPassword: '/keycloakForgotPassword',
  saveFeedbackData: '/saveFeedbackData',
  triggerYouthReward: '/trigger-youth-reward-points',
} as const;

/** Default same-origin BFF prefix (host implements routes under this path). */
export const SHELL_LOGIN_PROXY_DEFAULT = '/mybharat-shell-api';

/** Same-origin BFF routes — browser calls these; host forwards to APIGateway. */
export const BFF_INTERNAL_PATHS = {
  kcClient: '/_internal/kc-client',
  guestOauth: '/_internal/guest-oauth',
  loginCryptoKey: '/_internal/login-crypto-key',
  /** @deprecated Alias of loginCryptoKey */
  loginPubkey: '/_internal/login-pubkey',
  keycloakLogin: '/_internal/keycloak-login',
  verifyGuestOtp: '/_internal/verify-guest-otp',
  sendGuestOtp: '/_internal/send-guest-otp',
  checkUserExists: '/_internal/check-user-exists',
  keycloakExchangeToken: '/_internal/keycloak-exchange-token',
  keycloakForgotPassword: '/_internal/keycloak-forgot-password',
  keycloakChangePassword: '/_internal/keycloak-change-password',
  saveFeedbackData: '/_internal/save-feedback-data',
  triggerYouthReward: '/_internal/trigger-youth-reward',
} as const;

/** @deprecated Use `SHELL_LOGIN_PROXY_DEFAULT`. */
export const INTERNAL_PATHS = {
  proxyDefault: SHELL_LOGIN_PROXY_DEFAULT,
} as const;

/** @deprecated BFF routes are listed in `BFF_INTERNAL_PATHS`. */
export const PROXY_REWRITES = {
  kcClient: '/api/getKeycloakClientAccessToken',
  guestOauth: '/api/oauth',
  apiPrefix: '/api',
} as const;

export const PORTAL_PATHS = {
  establishSession: '/establish_session',
} as const;

/** Dev proxy shortcuts checked by feedback submit. */
export const DEV_API_PROXY_PREFIXES = {
  feedback: '/api',
  rewards: '/rewards-api',
} as const;
