import { filterUnsafeNavTree } from './filterUnsafeNavTree';
import { normalizeApiMenuTree } from './navApiNormalize';
import type { NavTreeItem } from './types';
import { unwrapMenuListFromPayload } from './unwrapMenuList';

export type PrepareMainNavItemsOptions = {
  /** Used when payload is empty or normalizes to no safe links (default `[]`). */
  fallback?: readonly NavTreeItem[];
  maxDepth?: number;
};

/**
 * Unwraps API JSON → loose API normalize → {@link filterUnsafeNavTree}.
 * Pass the result to `Header` / `Header2` as `mainNavItems`.
 */
export function prepareMainNavItems(
  raw: unknown,
  options?: PrepareMainNavItemsOptions
): readonly NavTreeItem[] {
  const fallback = options?.fallback ?? [];
  const list = unwrapMenuListFromPayload(raw);
  if (!list?.length) return fallback.length ? fallback : [];

  const shaped = normalizeApiMenuTree(list, { maxDepth: options?.maxDepth });
  const safe = filterUnsafeNavTree(shaped);
  if (safe.length) return safe;
  return fallback.length ? fallback : [];
}
