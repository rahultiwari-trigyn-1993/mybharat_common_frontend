import { isSafeNavHref } from './navHref';
import type { NavTreeItem } from './types';

/** Drops links with unsafe `href` values; prunes empty groups. */
export function filterUnsafeNavTree(items: readonly NavTreeItem[]): NavTreeItem[] {
  return items
    .map((item) => {
      if (item.type === 'link') return isSafeNavHref(item.href) ? item : null;
      const children = filterUnsafeNavTree(item.children);
      return children.length ? { ...item, children } : null;
    })
    .filter((item): item is NavTreeItem => item !== null);
}
