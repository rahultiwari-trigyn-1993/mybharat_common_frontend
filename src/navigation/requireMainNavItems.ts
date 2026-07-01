import { filterUnsafeNavTree } from './filterUnsafeNavTree';
import { isSafeNavHref } from './navHref';
import { normalizeApiMenuTree } from './navApiNormalize';
import type { NavTreeItem } from './types';
import { unwrapMenuListFromPayload } from './unwrapMenuList';

const alerted = new Set<string>();

function alertOnceNav(key: string, message: string): void {
  if (typeof window === 'undefined' || alerted.has(key)) return;
  alerted.add(key);
  window.alert(message);
}

/** Host nav loader failed (network/API). */
export function alertMainNavLoadFailed(source: string): void {
  alertOnceNav(
    `nav:${source}:load-failed`,
    `${source}: failed to load nav JSON. Check your API/CDN URL and network.`
  );
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateStrictNavItem(item: unknown, path: string): string | null {
  if (!isPlainRecord(item)) {
    return `${path}: must be an object with type "link" or "group"`;
  }

  const type = typeof item.type === 'string' ? item.type.trim().toLowerCase() : '';
  if (type !== 'link' && type !== 'group') {
    return `${path}: missing or invalid "type" (expected "link" or "group")`;
  }

  if (typeof item.label !== 'string' || !item.label.trim()) {
    return `${path}: missing or empty "label"`;
  }

  if (type === 'link') {
    if (typeof item.href !== 'string' || !item.href.trim()) {
      return `${path}: missing or empty "href"`;
    }
    if (!isSafeNavHref(item.href)) {
      return `${path}: unsafe or invalid "href"`;
    }
    return null;
  }

  if (!Array.isArray(item.children) || item.children.length === 0) {
    return `${path}: "group" must have a non-empty "children" array`;
  }

  for (let i = 0; i < item.children.length; i += 1) {
    const childError = validateStrictNavItem(item.children[i], `${path}.children[${i}]`);
    if (childError) return childError;
  }

  return null;
}

function describeLooseNavItemError(item: unknown, path: string): string | null {
  if (!isPlainRecord(item)) {
    return `${path}: must be an object`;
  }

  const hasLabel = ['label', 'name', 'title', 'text', 'menu_label', 'menu_name', 'display_name'].some(
    (key) => typeof item[key] === 'string' && String(item[key]).trim()
  );
  const hasHref = ['href', 'url', 'path', 'link', 'route', 'slug', 'menu_url'].some(
    (key) => typeof item[key] === 'string' && String(item[key]).trim()
  );
  const childKeys = ['children', 'submenu', 'items', 'nodes', 'child_menus', 'menu_items', 'sub_menus'] as const;
  const hasChildren = childKeys.some((key) => Array.isArray(item[key]) && (item[key] as unknown[]).length > 0);

  if (!hasLabel && !hasHref && !hasChildren) {
    return `${path}: missing menu fields (need label/name, href/url, or children/submenu)`;
  }

  if (hasChildren) {
    for (const key of childKeys) {
      const children = item[key];
      if (!Array.isArray(children)) continue;
      for (let i = 0; i < children.length; i += 1) {
        const childError = describeLooseNavItemError(children[i], `${path}.${key}[${i}]`);
        if (childError) return childError;
      }
    }
  }

  if (hasHref) {
    const hrefKey = ['href', 'url', 'path', 'link', 'route', 'slug', 'menu_url'].find(
      (key) => typeof item[key] === 'string' && String(item[key]).trim()
    );
    const href = hrefKey ? String(item[hrefKey]) : '';
    if (href && !isSafeNavHref(href)) {
      return `${path}: unsafe or invalid href`;
    }
  }

  return null;
}

function findFirstNavJsonError(list: unknown[]): string | null {
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    const path = `[${i}]`;
    if (isPlainRecord(item) && (item.type === 'link' || item.type === 'group')) {
      const strictError = validateStrictNavItem(item, path);
      if (strictError) return strictError;
    } else {
      const looseError = describeLooseNavItemError(item, path);
      if (looseError) return looseError;
    }
  }
  return null;
}

export type RequireMainNavItemsOptions = {
  maxDepth?: number;
  /** Shown in alert messages, e.g. "Header nav" or "Header". */
  source?: string;
};

/**
 * Validates host-provided nav JSON. Alerts once per page when missing/invalid; returns `[]` on failure.
 * No built-in default menu — the host must pass API/CDN JSON.
 */
export function requireMainNavItems(
  raw: unknown,
  options?: RequireMainNavItemsOptions
): readonly NavTreeItem[] {
  const source = options?.source?.trim() || 'Header nav';
  const alertKey = `nav:${source}`;

  if (raw === undefined || raw === null) {
    alertOnceNav(
      `${alertKey}:missing`,
      `${source}: nav JSON is not passed. Provide a non-empty JSON array via mainNavItems, nav-json-id, or MYBHARAT_SHELL.header.navItems.`
    );
    return [];
  }

  const list = unwrapMenuListFromPayload(raw);
  if (!list) {
    alertOnceNav(
      `${alertKey}:not-array`,
      `${source}: nav JSON must be a non-empty array (or an object wrapping one, e.g. { "data": [...] }).`
    );
    return [];
  }

  if (!list.length) {
    alertOnceNav(`${alertKey}:empty`, `${source}: nav JSON array is empty.`);
    return [];
  }

  const shaped = normalizeApiMenuTree(list, { maxDepth: options?.maxDepth });
  const safe = filterUnsafeNavTree(shaped);
  if (safe.length) return safe;

  const detail = findFirstNavJsonError(list);
  alertOnceNav(
    `${alertKey}:invalid`,
    detail
      ? `${source}: invalid nav JSON — ${detail}`
      : `${source}: nav JSON has no usable menu items after validation.`
  );
  return [];
}

/** React Header / Header2 — require prepared or raw nav items from the host app. */
export function resolveMainNavItemsFromProp(
  items: readonly NavTreeItem[] | unknown | undefined | null,
  source: string
): readonly NavTreeItem[] {
  return requireMainNavItems(items, { source });
}
