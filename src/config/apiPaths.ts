/** APIGateway paths (appended to apiBaseUrl or same-origin proxy prefix). */
export const GATEWAY_PATHS = {
  checkUserExists: '/checkUserExists',
  sendMobileGuestUserOtp: '/sendMobileGuestUserOtp',
  keycloakGetExchangeToken: '/keycloakGetExchangeToken',
  keycloakForgotPassword: '/keycloakForgotPassword',
  saveFeedbackData: '/saveFeedbackData',
  triggerYouthReward: '/trigger-youth-reward-points',
} as const;

/** Opaque browser → host-server routes (credentials stay on server). */
export const INTERNAL_PATHS = {
  proxyDefault: '/mybharat-shell-api',
  kcClient: '/_internal/kc-client',
  guestOauth: '/_internal/guest-oauth',
  loginPubkey: '/_internal/login-pubkey',
  keycloakLogin: '/_internal/keycloak-login',
  verifyGuestOtp: '/_internal/verify-guest-otp',
  keycloakChangePassword: '/_internal/keycloak-change-password',
} as const;

/** Host dev proxy rewrites (server-side only). */
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
