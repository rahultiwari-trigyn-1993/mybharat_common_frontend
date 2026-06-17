import { DEFAULT_HEADER2_MAIN_NAV } from '../navigation/header2MainNav.defaults';
import { DEFAULT_HEADER_MAIN_NAV } from '../navigation/headerMainNav.defaults';
import { prepareMainNavItems } from '../navigation/prepareMainNavItems';
import type { NavTreeItem } from '../navigation/types';
import type { HeaderUserSessionInput } from '../components/header/headerUserSession';

export type ShellHeaderConfig = {
  cdnBase?: string;
  title?: string;
  variant?: 'header' | 'header2';
  navItems?: unknown;
  /** Logged-in user payload (`data` or full API envelope). */
  userSession?: unknown;
  webroot?: string;
};

export type ShellFooterConfig = {
  cdnBase?: string;
  isLoggedIn?: boolean;
  recaptchaSiteKey?: string;
  webroot?: string;
  /** APIGateway root for feedback (e.g. `/api` or `http://127.0.0.1:8000/api`). Falls back to `login.apiBaseUrl`. */
  feedbackApiBaseUrl?: string;
  /** Optional full URL override for save feedback POST (default `{feedbackApiBaseUrl}/saveFeedbackData`). */
  feedbackSubmitUrl?: string;
  /** Logged-in user payload for registered feedback submit. */
  userSession?: unknown;
};

export type ShellLoginConfig = {
  /** Post-login redirect prefix, e.g. `https://mybharat.gov.in/` */
  baseUrl?: string;
  /**
   * MY Bharat login API root (absolute URL recommended, no trailing slash).
   * Use full URL when shell is embedded on another origin (e.g. registration on localhost:3000).
   */
  apiBaseUrl?: string;
  /** Same-origin proxy for login fetch when apiBaseUrl is cross-origin. */
  apiProxyBaseUrl?: string;
  /** @deprecated Server-side only — configure host `/_internal/guest-oauth` proxy route. */
  oauthUsername?: string;
  /** @deprecated Server-side only — configure host `/_internal/guest-oauth` proxy route. */
  oauthPassword?: string;
  /** Optional RSA public key PEM — browser encrypts password/OTP before internal routes. */
  loginPayloadPublicKey?: string;
  /** Optional client IP for sendMobileGuestUserOtp. */
  ipAddress?: string;
  sessionEstablishPath?: string;
  cookieDomain?: string;
  youthProfileUrl?: string;
  publicProfileApiBaseUrl?: string;
};

declare global {
  interface Window {
    MYBHARAT_SHELL?: {
      header?: ShellHeaderConfig;
      footer?: ShellFooterConfig;
      login?: ShellLoginConfig;
    };
    MyBharatShell?: {
      openLoginModal?: (mode?: 'otp' | 'password') => void;
    };
  }
}

export function parseBooleanAttr(value: string | null): boolean | undefined {
  if (value === null) return undefined;
  if (value === 'true' || value === '') return true;
  if (value === 'false') return false;
  return undefined;
}

function readJsonFromScriptId(id: string): unknown | undefined {
  const el = document.getElementById(id);
  const text = el?.textContent?.trim();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

export function resolveHeaderNavItems(
  el: HTMLElement,
  variant: 'header' | 'header2'
): readonly NavTreeItem[] {
  const fallback = variant === 'header2' ? DEFAULT_HEADER2_MAIN_NAV : DEFAULT_HEADER_MAIN_NAV;

  const jsonId = el.getAttribute('nav-json-id');
  if (jsonId) {
    const fromScript = readJsonFromScriptId(jsonId);
    if (fromScript !== undefined) {
      return prepareMainNavItems(fromScript, { fallback });
    }
  }

  const navAttr = el.getAttribute('nav-items');
  if (navAttr) {
    try {
      return prepareMainNavItems(JSON.parse(navAttr) as unknown, { fallback });
    } catch {
      return fallback;
    }
  }

  const globalNav = window.MYBHARAT_SHELL?.header?.navItems;
  if (globalNav !== undefined) {
    return prepareMainNavItems(globalNav, { fallback });
  }

  return fallback;
}

export function resolveHeaderUserSession(el: HTMLElement): HeaderUserSessionInput {
  const jsonId = el.getAttribute('user-json-id');
  if (jsonId) {
    const fromScript = readJsonFromScriptId(jsonId);
    if (fromScript !== undefined) return fromScript as HeaderUserSessionInput;
  }

  const userAttr = el.getAttribute('user-session');
  if (userAttr) {
    try {
      return JSON.parse(userAttr) as HeaderUserSessionInput;
    } catch {
      return null;
    }
  }

  return (window.MYBHARAT_SHELL?.header?.userSession ?? null) as HeaderUserSessionInput;
}

export function resolveHeaderLoginConfig(el: HTMLElement): ShellLoginConfig {
  const global = window.MYBHARAT_SHELL?.login;
  return {
    baseUrl: el.getAttribute('login-base-url') ?? global?.baseUrl,
    apiBaseUrl: el.getAttribute('api-base-url') ?? global?.apiBaseUrl,
    apiProxyBaseUrl: el.getAttribute('api-proxy-base-url') ?? global?.apiProxyBaseUrl,
    loginPayloadPublicKey:
      el.getAttribute('login-payload-public-key') ?? global?.loginPayloadPublicKey,
    ipAddress: el.getAttribute('ip-address') ?? global?.ipAddress,
  };
}

export function resolveHeaderProps(el: HTMLElement): {
  cdnBase?: string;
  title?: string;
  variant: 'header' | 'header2';
  mainNavItems: readonly NavTreeItem[];
  userSession: HeaderUserSessionInput;
  webroot?: string;
  baseUrl?: string;
  apiBaseUrl?: string;
  apiProxyBaseUrl?: string;
  loginPayloadPublicKey?: string;
  ipAddress?: string;
} {
  const global = window.MYBHARAT_SHELL?.header;
  const variantAttr = el.getAttribute('variant');
  const variant =
    variantAttr === 'header2' || global?.variant === 'header2' ? 'header2' : 'header';
  const login = resolveHeaderLoginConfig(el);

  return {
    cdnBase: el.getAttribute('cdn-base') ?? global?.cdnBase,
    title: el.getAttribute('title') ?? global?.title,
    variant,
    mainNavItems: resolveHeaderNavItems(el, variant),
    userSession: resolveHeaderUserSession(el),
    webroot: el.getAttribute('webroot') ?? global?.webroot,
    baseUrl: login.baseUrl,
    apiBaseUrl: login.apiBaseUrl,
    apiProxyBaseUrl: login.apiProxyBaseUrl,
    loginPayloadPublicKey: login.loginPayloadPublicKey,
    ipAddress: login.ipAddress,
  };
}

export function resolveFooterProps(el: HTMLElement): {
  cdnBase?: string;
  isLoggedIn?: boolean;
  recaptchaSiteKey?: string;
  webroot?: string;
  feedbackApiBaseUrl?: string;
  feedbackSubmitUrl?: string;
  userSession?: unknown;
} {
  const global = window.MYBHARAT_SHELL?.footer;
  const isLoggedIn =
    parseBooleanAttr(el.getAttribute('is-logged-in')) ?? global?.isLoggedIn;

  return {
    cdnBase: el.getAttribute('cdn-base') ?? global?.cdnBase,
    isLoggedIn,
    recaptchaSiteKey: el.getAttribute('recaptcha-site-key') ?? global?.recaptchaSiteKey,
    webroot: el.getAttribute('webroot') ?? global?.webroot ?? window.MYBHARAT_SHELL?.header?.webroot,
    feedbackApiBaseUrl:
      el.getAttribute('feedback-api-base-url') ??
      global?.feedbackApiBaseUrl ??
      window.MYBHARAT_SHELL?.login?.apiBaseUrl,
    feedbackSubmitUrl: el.getAttribute('feedback-submit-url') ?? global?.feedbackSubmitUrl,
    userSession:
      global?.userSession ?? window.MYBHARAT_SHELL?.header?.userSession,
  };
}
