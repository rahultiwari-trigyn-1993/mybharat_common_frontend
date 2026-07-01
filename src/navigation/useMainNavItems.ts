import { useEffect, useRef, useState } from 'react';
import { prepareMainNavItems } from './prepareMainNavItems';
import { alertMainNavLoadFailed } from './requireMainNavItems';
import {
  navLoadCacheKey,
  readCachedNavItems,
  runCachedNavLoad,
} from './navLoadCache';
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
 * Fetches once on mount (and when maxDepth/source change) — inline `load`/`select`
 * without useCallback will not retrigger endless requests.
 */
export function useMainNavItems(options: UseMainNavItemsOptions): readonly NavTreeItem[] {
  const { load, select, maxDepth, source = 'Header nav' } = options;
  const [nav, setNav] = useState<readonly NavTreeItem[]>([]);
  const loadRef = useRef(load);
  const selectRef = useRef(select);
  loadRef.current = load;
  selectRef.current = select;

  useEffect(() => {
    let cancelled = false;
    const cacheKey = navLoadCacheKey(source, maxDepth);

    const cached = readCachedNavItems(cacheKey);
    if (cached) {
      setNav(cached);
      return;
    }

    runCachedNavLoad(cacheKey, async () => {
      const raw = await loadRef.current();
      const selectFn = selectRef.current;
      const slice = selectFn ? selectFn(raw) : raw;
      return prepareMainNavItems(slice, { maxDepth, source });
    })
      .then((items) => {
        if (!cancelled) setNav(items);
      })
      .catch(() => {
        if (!cancelled) {
          alertMainNavLoadFailed(source);
          setNav([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [maxDepth, source]);

  return nav;
}
