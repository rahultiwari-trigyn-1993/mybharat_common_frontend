import { useEffect, useState } from 'react';
import { DEFAULT_HEADER_MAIN_NAV } from './headerMainNav.defaults';
import { prepareMainNavItems } from './prepareMainNavItems';
import type { NavTreeItem } from './types';

export type UseMainNavItemsOptions = {
  /** Host-provided loader (API, CDN, etc.). This package does not call `fetch` by itself. */
  load: () => Promise<unknown>;
  /** Pick the slice to normalize, e.g. `(raw) => raw.data` */
  select?: (raw: unknown) => unknown;
  fallback?: readonly NavTreeItem[];
  maxDepth?: number;
};

/**
 * Loads nav in the host app, then unwraps / normalizes / filters for `mainNavItems`.
 * Memoize `load` (and `select` if inline) with `useCallback` to avoid duplicate requests.
 */
export function useMainNavItems(options: UseMainNavItemsOptions): readonly NavTreeItem[] {
  const { load, select, fallback = DEFAULT_HEADER_MAIN_NAV, maxDepth } = options;
  const [nav, setNav] = useState<readonly NavTreeItem[]>(fallback);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await load();
        const slice = select ? select(raw) : raw;
        const items = prepareMainNavItems(slice, { fallback, maxDepth });
        if (!cancelled) setNav(items);
      } catch {
        if (!cancelled) setNav(fallback);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [load, select, fallback, maxDepth]);

  return nav;
}
