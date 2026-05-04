import type { NavLinkItem } from './types';
import { isSafeNavHref } from './navHref';

function warnInvalid(href: string, context: string) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(`[${context}] invalid href:`, href);
  }
}

/** Resolved href + external flag for nav links (desktop + mobile). */
export function getNavLinkAttrs(item: NavLinkItem, context = 'Nav'): { href: string; external: boolean } {
  const ok = isSafeNavHref(item.href);
  const href = ok ? item.href : '#';
  if (!ok) warnInvalid(item.href, context);
  const external = item.external ?? /^https?:\/\//i.test(href);
  return { href, external };
}
