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

/** @deprecated Optional Vite dev plugin only — browser shell calls APIGateway directly. */
export const INTERNAL_PATHS = {
  proxyDefault: '/mybharat-shell-api',
} as const;

/** @deprecated Optional Vite dev plugin only. */
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
