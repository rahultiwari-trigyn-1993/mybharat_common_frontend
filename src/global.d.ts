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
    };
    footer?: {
      cdnBase?: string;
      isLoggedIn?: boolean;
      recaptchaSiteKey?: string;
    };
    login?: {
      baseUrl?: string;
      /** Absolute MY Bharat API root — not the host page `/api` (see shell login docs). */
      apiBaseUrl?: string;
    };
  };
  MyBharatShell?: {
    openLoginModal?: (mode?: 'otp' | 'password') => void;
    registerMyBharatWebComponents?: () => void;
    MYBHARAT_SHELL_VERSION?: string;
  };
  setupFirebaseUserAjaxEvents?: (event: string, id: string) => void;
  encodeIdentifier?: (id: string) => string;
  __MYBHARAT_LOGIN_USER_ID__?: string;
}
