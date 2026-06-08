import { DEFAULT_HEADER2_MAIN_NAV } from '../navigation/header2MainNav.defaults';
import { DEFAULT_HEADER_MAIN_NAV } from '../navigation/headerMainNav.defaults';
import { prepareMainNavItems } from '../navigation/prepareMainNavItems';
import type { NavTreeItem } from '../navigation/types';

export type ShellHeaderConfig = {
  cdnBase?: string;
  title?: string;
  variant?: 'header' | 'header2';
  navItems?: unknown;
};

export type ShellFooterConfig = {
  cdnBase?: string;
  isLoggedIn?: boolean;
  recaptchaSiteKey?: string;
};

export type ShellLoginConfig = {
  /** Post-login redirect prefix, e.g. `https://mybharat.gov.in/` */
  baseUrl?: string;
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

export function resolveHeaderProps(el: HTMLElement): {
  cdnBase?: string;
  title?: string;
  variant: 'header' | 'header2';
  mainNavItems: readonly NavTreeItem[];
} {
  const global = window.MYBHARAT_SHELL?.header;
  const variantAttr = el.getAttribute('variant');
  const variant =
    variantAttr === 'header2' || global?.variant === 'header2' ? 'header2' : 'header';

  return {
    cdnBase: el.getAttribute('cdn-base') ?? global?.cdnBase,
    title: el.getAttribute('title') ?? global?.title,
    variant,
    mainNavItems: resolveHeaderNavItems(el, variant),
  };
}

export function resolveFooterProps(el: HTMLElement): {
  cdnBase?: string;
  isLoggedIn?: boolean;
  recaptchaSiteKey?: string;
} {
  const global = window.MYBHARAT_SHELL?.footer;
  const isLoggedIn =
    parseBooleanAttr(el.getAttribute('is-logged-in')) ?? global?.isLoggedIn;

  return {
    cdnBase: el.getAttribute('cdn-base') ?? global?.cdnBase,
    isLoggedIn,
    recaptchaSiteKey: el.getAttribute('recaptcha-site-key') ?? global?.recaptchaSiteKey,
  };
}
