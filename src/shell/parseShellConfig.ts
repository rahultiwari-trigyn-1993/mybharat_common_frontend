import type { NavTreeItem } from '../navigation/types';
import { requireMainNavItems } from '../navigation/requireMainNavItems';
import type { HeaderUserSessionInput } from '../components/header/headerUserSession';

export type ShellHeaderConfig = {
  cdnBase?: string;
  title?: string;
  variant?: 'header' | 'header2';
  navItems?: unknown;
  /** Logged-in user payload (`data` or full API envelope). */
  userSession?: unknown;
  webroot?: string;
  /** Load Bhashini website translation plugin (default true). */
  bhashini?: boolean;
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
  /** Rewards API root (`VITE_REWARDS_API_URL` / `/rewards-api` dev proxy). */
  rewardsApiBaseUrl?: string;
  /** Logged-in user payload for registered feedback submit. */
  userSession?: unknown;
};

export type ShellLoginConfig = {
  baseUrl?: string;
  apiBaseUrl?: string;
  environment?: 'local' | 'dev' | 'beta' | 'prod';
  oauthUsername?: string;
  oauthPassword?: string;
  ipAddress?: string;
  sessionEstablishPath?: string;
  cookieDomain?: string;
  youthProfileUrl?: string;
  publicProfileApiBaseUrl?: string;
};

export function parseBooleanAttr(value: string | null): boolean | undefined {
  if (value === null) return undefined;
  if (value === 'true' || value === '') return true;
  if (value === 'false') return false;
  return undefined;
}

const alerted = new Set<string>();

function alertOnceShellNav(key: string, message: string): void {
  if (typeof window === 'undefined' || alerted.has(key)) return;
  alerted.add(key);
  window.alert(message);
}

function readJsonFromScriptId(id: string): { ok: true; data: unknown } | { ok: false; message: string } {
  const el = document.getElementById(id);
  if (!el) {
    return { ok: false, message: `element #${id} not found` };
  }
  const text = el.textContent?.trim();
  if (!text) {
    return { ok: false, message: `#${id} is empty — pass a JSON array` };
  }
  try {
    return { ok: true, data: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, message: `invalid JSON in #${id}` };
  }
}

export function resolveHeaderNavItems(
  el: HTMLElement,
  variant: 'header' | 'header2'
): readonly NavTreeItem[] {
  const source = variant === 'header2' ? 'Header2 nav' : 'Header nav';
  const jsonId = el.getAttribute('nav-json-id');

  if (jsonId) {
    const parsed = readJsonFromScriptId(jsonId);
    if (parsed.ok) {
      return requireMainNavItems(parsed.data, { source });
    }
    alertOnceShellNav(`shell-nav:${jsonId}`, `${source}: ${parsed.message}`);
    return [];
  }

  const navAttr = el.getAttribute('nav-items');
  if (navAttr !== null) {
    if (!navAttr.trim()) {
      alertOnceShellNav('shell-nav:attr-empty', `${source}: nav-items attribute is empty.`);
      return [];
    }
    try {
      return requireMainNavItems(JSON.parse(navAttr) as unknown, { source });
    } catch {
      alertOnceShellNav('shell-nav:attr-parse', `${source}: nav-items attribute contains invalid JSON.`);
      return [];
    }
  }

  const globalNav = window.MYBHARAT_SHELL?.header?.navItems;
  if (globalNav !== undefined) {
    return requireMainNavItems(globalNav, { source });
  }

  alertOnceShellNav(
    'shell-nav:not-configured',
    `${source}: nav JSON is not configured. Set nav-json-id, nav-items, or MYBHARAT_SHELL.header.navItems.`
  );
  return [];
}

export function resolveUserSessionFromElement(el: HTMLElement): HeaderUserSessionInput {
  const jsonId = el.getAttribute('user-json-id');
  if (jsonId) {
    const parsed = readJsonFromScriptId(jsonId);
    if (parsed.ok) return parsed.data as HeaderUserSessionInput;
  }

  const userAttr = el.getAttribute('user-session');
  if (userAttr) {
    try {
      return JSON.parse(userAttr) as HeaderUserSessionInput;
    } catch {
      return null;
    }
  }

  return null;
}

export function resolveHeaderUserSession(el: HTMLElement): HeaderUserSessionInput {
  return (
    resolveUserSessionFromElement(el) ??
    ((window.MYBHARAT_SHELL?.header?.userSession ?? null) as HeaderUserSessionInput)
  );
}

export function resolveHeaderLoginConfig(el: HTMLElement): ShellLoginConfig {
  const global = window.MYBHARAT_SHELL?.login;
  return {
    baseUrl: el.getAttribute('login-base-url') ?? global?.baseUrl,
    apiBaseUrl: el.getAttribute('api-base-url') ?? global?.apiBaseUrl,
    environment: (el.getAttribute('environment') ?? global?.environment) as
      | ShellLoginConfig['environment']
      | undefined,
    oauthUsername: el.getAttribute('oauth-username') ?? global?.oauthUsername,
    oauthPassword: el.getAttribute('oauth-password') ?? global?.oauthPassword,
    ipAddress: el.getAttribute('ip-address') ?? global?.ipAddress,
    cookieDomain: el.getAttribute('cookie-domain') ?? global?.cookieDomain,
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
  environment?: 'local' | 'dev' | 'beta' | 'prod';
  oauthUsername?: string;
  oauthPassword?: string;
  ipAddress?: string;
  cookieDomain?: string;
  bhashini?: boolean;
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
    environment: login.environment,
    oauthUsername: login.oauthUsername,
    oauthPassword: login.oauthPassword,
    ipAddress: login.ipAddress,
    cookieDomain: login.cookieDomain,
    bhashini: parseBooleanAttr(el.getAttribute('bhashini')) ?? global?.bhashini,
  };
}

export function resolveFooterProps(el: HTMLElement): {
  cdnBase?: string;
  isLoggedIn?: boolean;
  recaptchaSiteKey?: string;
  webroot?: string;
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
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
    rewardsApiBaseUrl:
      el.getAttribute('rewards-api-base-url') ?? global?.rewardsApiBaseUrl,
    feedbackSubmitUrl: el.getAttribute('feedback-submit-url') ?? global?.feedbackSubmitUrl,
    userSession:
      resolveUserSessionFromElement(el) ??
      global?.userSession ??
      window.MYBHARAT_SHELL?.header?.userSession,
  };
}
