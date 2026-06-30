declare module '*.css';

/** Replaced at build by `tsup` `define` from `package.json` `version`. */
declare const __MYBHARAT_PKG_VERSION__: string;

interface Window {
  MYBHARAT_SHELL?: {
    header?: {
      cdnBase?: string;
      title?: string;
      variant?: 'header' | 'header2';
      navItems?: unknown;
      userSession?: unknown;
      webroot?: string;
      bhashini?: boolean;
    };
    footer?: {
      cdnBase?: string;
      isLoggedIn?: boolean;
      recaptchaSiteKey?: string;
      webroot?: string;
      feedbackApiBaseUrl?: string;
      rewardsApiBaseUrl?: string;
      feedbackSubmitUrl?: string;
      userSession?: unknown;
    };
    login?: {
      baseUrl?: string;
      /** Absolute MY Bharat API root — not the host page `/api` (see shell login docs). */
      apiBaseUrl?: string;
      /** Host environment (`local` | `dev` | `beta` | `prod`). */
      environment?: 'local' | 'dev' | 'beta' | 'prod';
      /** Same-origin proxy for login fetch when apiBaseUrl is cross-origin (avoids OPTIONS preflight). */
      apiProxyBaseUrl?: string;
      /** @deprecated OAuth credentials belong on the host server — map `/_internal/guest-oauth` in your proxy. */
      oauthUsername?: string;
      /** @deprecated OAuth credentials belong on the host server — map `/_internal/guest-oauth` in your proxy. */
      oauthPassword?: string;
      /** Optional RSA public key PEM for encrypting passwords/OTP before internal routes. */
      loginPayloadPublicKey?: string;
      /** Optional client IP forwarded to sendMobileGuestUserOtp when host cannot infer it server-side. */
      ipAddress?: string;
      /** Cake route for PHP session hydration after OTP login (default `/reports/establishSession`). */
      sessionEstablishPath?: string;
      /** Cookie domain for post-login token cookies (defaults to current hostname). */
      cookieDomain?: string;
      /** Youth profile redirect URL for UserType 6 (default `{baseUrl}/youth-profile`). */
      youthProfileUrl?: string;
      /** Optional internal API base for `getUserId` when User.ID is missing. */
      publicProfileApiBaseUrl?: string;
    };
  };
  MyBharatShell?: {
    openLoginModal?: (mode?: 'otp' | 'password') => void;
    registerMyBharatWebComponents?: () => void;
    MYBHARAT_SHELL_VERSION?: string;
  };
  setupFirebaseUserAjaxEvents?: (event: string, id: string) => void;
  encodeIdentifier?: (id: string) => string;
  /** Optional guest user id for analytics when session user is not on page. */
  __MYBHARAT_LOGIN_USER_ID__?: string;
  /** Set by firebase.ctp when analytics is enabled on allowed domains. */
  USER_DATA?: { ID?: string | number; UserType?: string | number; [key: string]: unknown };
  trackEvent?: (eventName: string, parameters?: Record<string, unknown>) => void;
  grecaptcha?: {
    render: (container: HTMLElement, params: { sitekey: string }) => number;
    reset: (widgetId?: number) => void;
  };
}
