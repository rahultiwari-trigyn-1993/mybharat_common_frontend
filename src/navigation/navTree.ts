import type { NavGroupItem, NavLinkItem, NavTreeItem } from './types';

export type NormalizeNavTreeOptions = {
  /** Guard against runaway trees (default 32). */
  maxDepth?: number;
};

function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function normalizeLink(raw: Record<string, unknown>): NavLinkItem | null {
  const href = typeof raw.href === 'string' ? raw.href.trim() : '';
  const label = typeof raw.label === 'string' ? raw.label.trim() : '';
  if (!href && !label) return null;
  const link: NavLinkItem = {
    type: 'link',
    label,
    href: href || '#',
  };
  if (typeof raw.linkClassName === 'string') link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === 'string') link.spanClassName = raw.spanClassName;
  if (typeof raw.external === 'boolean') link.external = raw.external;
  return link;
}

function normalizeGroup(
  raw: Record<string, unknown>,
  depth: number,
  maxDepth: number
): NavGroupItem | null {
  const label = typeof raw.label === 'string' ? raw.label.trim() : '';
  const rawChildren = raw.children;
  const arr = Array.isArray(rawChildren) ? rawChildren : [];
  const children = normalizeNavTreeInner(arr, depth + 1, maxDepth);
  if (children.length === 0) return null;
  return {
    type: 'group',
    label: label || 'More',
    children,
  };
}

/** Lowercase nav node kind from JSON (`link` / `group`), tolerating API casing. */
function navNodeType(raw: Record<string, unknown>): string | null {
  const t = raw.type;
  if (typeof t === 'string') return t.trim().toLowerCase();
  return null;
}

/**
 * If the API wraps the array (e.g. `{ "items": [...] }`), unwrap once at the root.
 * Nested `children` arrays inside groups are unchanged.
 */
function unwrapRootNavArray(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  if (!isPlainRecord(data)) return [];
  const keys = ['items', 'children', 'mainNavItems', 'nav', 'navigation', 'data'] as const;
  for (const k of keys) {
    const v = data[k];
    if (Array.isArray(v)) return v;
  }
  return [];
}

function normalizeNavTreeInner(items: unknown, depth: number, maxDepth: number): NavTreeItem[] {
  if (depth > maxDepth) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('[normalizeNavTree] maxDepth exceeded; deeper nodes dropped.');
    }
    return [];
  }
  const list = depth === 0 ? unwrapRootNavArray(items) : Array.isArray(items) ? items : [];
  if (!Array.isArray(list)) return [];

  const out: NavTreeItem[] = [];
  for (const raw of list) {
    if (!isPlainRecord(raw)) continue;
    const t = navNodeType(raw);
    if (t === 'link') {
      const link = normalizeLink(raw);
      if (link) out.push(link);
      continue;
    }
    if (t === 'group') {
      const group = normalizeGroup(raw, depth, maxDepth);
      if (group) out.push(group);
      continue;
    }
  }
  return out;
}

/**
 * Normalizes API/CMS JSON into a safe {@link NavTreeItem} tree: any mix of `group` and `link`
 * at any depth; drops invalid nodes; drops empty groups; enforces max nesting depth.
 * Use before rendering when `mainNavItems` comes from untrusted or loose JSON.
 */
export function normalizeNavTree(items: unknown, options?: NormalizeNavTreeOptions): NavTreeItem[] {
  const maxDepth = options?.maxDepth ?? 32;
  return normalizeNavTreeInner(items, 0, maxDepth);
}

export function isNavLinkItem(item: NavTreeItem): item is NavLinkItem {
  return item.type === 'link';
}

export function isNavGroupItem(item: NavTreeItem): item is NavGroupItem {
  return item.type === 'group';
}
