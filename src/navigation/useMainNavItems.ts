import { useEffect, useState } from 'react';
import { prepareMainNavItems } from './prepareMainNavItems';
import { alertMainNavLoadFailed } from './requireMainNavItems';
import type { NavTreeItem } from './types';

export type UseMainNavItemsOptions = {
  /** Host-provided loader (API, CDN, etc.). This package does not call `fetch` by itself. */
  load: () => Promise<unknown>;
  /** Pick the slice to normalize, e.g. `(raw) => raw.data` */
  select?: (raw: unknown) => unknown;
  maxDepth?: number;
  /** Shown in alert messages when nav load/validation fails. */
  source?: string;
};

/**
 * Loads nav in the host app, then validates for `mainNavItems`.
 * Memoize `load` (and `select` if inline) with `useCallback` to avoid duplicate requests.
 */
export function useMainNavItems(options: UseMainNavItemsOptions): readonly NavTreeItem[] {
  const { load, select, maxDepth, source = 'Header nav' } = options;
  const [nav, setNav] = useState<readonly NavTreeItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const raw = await load();
        const slice = select ? select(raw) : raw;
        const items = prepareMainNavItems(slice, { maxDepth, source });
        if (!cancelled) setNav(items);
      } catch {
        if (!cancelled) {
          alertMainNavLoadFailed(source);
          setNav([]);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [load, select, maxDepth, source]);

  return nav;
}
