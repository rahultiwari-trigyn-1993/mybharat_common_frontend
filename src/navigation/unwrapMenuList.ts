/** Keys commonly used to wrap a nav array in API/CMS JSON. */
const MENU_LIST_KEYS = [
  'items',
  'children',
  'menus',
  'menu_items',
  'nodes',
  'data',
  'tree',
  'mainNavItems',
  'nav',
  'navigation',
] as const;

/**
 * Unwraps a nav array from a raw API payload (array or one-level wrapper object).
 */
export function unwrapMenuListFromPayload(data: unknown): unknown[] | null {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return null;
  const obj = data as Record<string, unknown>;
  for (const k of MENU_LIST_KEYS) {
    const v = obj[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return null;
}
