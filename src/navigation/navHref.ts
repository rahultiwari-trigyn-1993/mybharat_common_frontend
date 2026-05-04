/**
 * Basic href allowlist for untrusted CMS JSON. Extend if your API needs more schemes.
 */
export function isSafeNavHref(href: string): boolean {
  const h = href.trim();
  if (!h) return false;
  if (/^\s*(javascript:|data:|vbscript:)/i.test(h)) return false;
  if (/^https?:\/\//i.test(h)) return true;
  if (h.startsWith('mailto:') || h.startsWith('tel:')) return true;
  if (h.startsWith('/')) return !h.startsWith('//');
  return false;
}
