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
      /** APIGateway root — e.g. `https://api.mybharat.gov.in/api` or `/api`. */
      apiBaseUrl?: string;
      /** When true, keep absolute cross-origin apiBaseUrl (browser sends CORS OPTIONS preflight). */
      crossOriginApi?: boolean;
      environment?: 'local' | 'dev' | 'beta' | 'prod';
      /** Guest OAuth for sendMobileGuestUserOtp / verifyGuestUserOtp. */
      oauthUsername?: string;
      oauthPassword?: string;
      ipAddress?: string;
      sessionEstablishPath?: string;
      cookieDomain?: string;
      youthProfileUrl?: string;
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
