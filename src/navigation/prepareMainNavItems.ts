import type { NavTreeItem } from './types';
import { requireMainNavItems, type RequireMainNavItemsOptions } from './requireMainNavItems';

export type PrepareMainNavItemsOptions = RequireMainNavItemsOptions;

/**
 * Unwraps API JSON → normalize → filter unsafe hrefs.
 * Alerts when nav is missing or invalid; no built-in fallback menu.
 */
export function prepareMainNavItems(
  raw: unknown,
  options?: PrepareMainNavItemsOptions
): readonly NavTreeItem[] {
  return requireMainNavItems(raw, options);
}
