import type { NavLinkItem, NavTreeItem } from './types';

export type NormalizeApiMenuTreeOptions = {
  maxDepth?: number;
};

const LABEL_KEYS = ['label', 'name', 'title', 'text', 'menu_label', 'menu_name', 'display_name'] as const;
const HREF_KEYS = ['href', 'url', 'path', 'link', 'route', 'slug', 'menu_url'] as const;
const CHILD_KEYS = [
  'children',
  'submenu',
  'items',
  'nodes',
  'child_menus',
  'menu_items',
  'sub_menus',
] as const;

function isPlainRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function pickFirstString(obj: Record<string, unknown>, keys: readonly string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

function pickChildArray(raw: Record<string, unknown>): unknown[] {
  for (const k of CHILD_KEYS) {
    const v = raw[k];
    if (Array.isArray(v) && v.length) return v;
  }
  return [];
}

/** Normalizes relative paths and blocks dangerous schemes in loose API `href` fields. */
export function normalizeHrefForNav(href: unknown): string {
  if (typeof href !== 'string') return '';
  const t = href.trim();
  if (!t) return '';
  if (/^\s*(javascript:|data:|vbscript:)/i.test(t)) return '';
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith('mailto:') || t.startsWith('tel:')) return t;
  if (t.startsWith('/')) return t.startsWith('//') ? '' : t;
  return `/${t.replace(/^\.\//, '')}`;
}

function normalizeApiMenuNode(raw: unknown, depth: number, maxDepth: number): NavTreeItem | null {
  if (depth > maxDepth) return null;
  if (!isPlainRecord(raw)) return null;

  const rawType = typeof raw.type === 'string' ? raw.type.trim().toLowerCase() : '';
  const childSource = pickChildArray(raw);
  const children = childSource
    .map((c) => normalizeApiMenuNode(c, depth + 1, maxDepth))
    .filter((n): n is NavTreeItem => n !== null);

  const label = pickFirstString(raw, LABEL_KEYS);
  const hrefRaw = pickFirstString(raw, HREF_KEYS);

  const treatAsGroup = rawType === 'group' || (rawType !== 'link' && children.length > 0);
  if (treatAsGroup) {
    if (!children.length) return null;
    return { type: 'group', label: label || 'More', children };
  }

  const href = normalizeHrefForNav(hrefRaw);
  const link: NavLinkItem = {
    type: 'link',
    label: label || href || 'Link',
    href: href || '/',
  };
  if (typeof raw.linkClassName === 'string') link.linkClassName = raw.linkClassName;
  if (typeof raw.spanClassName === 'string') link.spanClassName = raw.spanClassName;
  if (typeof raw.external === 'boolean') link.external = raw.external;
  return link;
}

/**
 * Maps loose API/CMS menu nodes (`name`, `url`, `submenu`, etc.) into {@link NavTreeItem} trees.
 * Also accepts strict `{ type: "link" | "group", label, href, children }` payloads.
 */
export function normalizeApiMenuTree(
  items: unknown,
  options?: NormalizeApiMenuTreeOptions
): NavTreeItem[] {
  const maxDepth = options?.maxDepth ?? 32;
  if (!Array.isArray(items)) return [];
  return items
    .map((raw) => normalizeApiMenuNode(raw, 0, maxDepth))
    .filter((n): n is NavTreeItem => n !== null);
}
