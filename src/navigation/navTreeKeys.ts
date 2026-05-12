import type { NavTreeItem } from './types';
import { isNavGroupItem } from './navTree';

/**
 * Stable React key from tree position + item identity (label/href/child count).
 * Safer than `key={index}` when CMS reorders items at the same depth.
 */
export function navTreeItemKey(item: NavTreeItem, segments: readonly number[]): string {
  const prefix = segments.join('_');
  if (!isNavGroupItem(item)) {
    return `${prefix}|L|${item.label}|${item.href}`;
  }
  return `${prefix}|G|${item.label}|${item.children.length}`;
}
