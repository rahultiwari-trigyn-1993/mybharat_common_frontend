/**
 * Data model for desktop main nav — suitable for JSON from CMS/API/ELK.
 * Render with {@link DesktopMainNav}; validate shape server-side; use {@link isSafeNavHref} for untrusted `href` values.
 */

/** Single link row (renders as `<li><a>…</a></li>`). */
export type NavLinkItem = {
  type: 'link';
  /** Visible label (HTML entities should be decoded server-side if needed). */
  label: string;
  href: string;
  /** Classes on the `<a>` (e.g. `fontchange14 youth lang_youth`). */
  linkClassName?: string;
  /** Classes on inner `<span>` (e.g. `lang_event`). */
  spanClassName?: string;
  /** Sets `rel="noopener noreferrer"` and `target="_blank"` when true. */
  external?: boolean;
};

/**
 * Dropdown group: label + children. JSON from CMS/API may contain **any mix** of nested `group`
 * and `link` nodes at every level (single child or many). Rendering is recursive in
 * {@link DesktopMainNav} and {@link MobileMenuModal}; use {@link normalizeNavTree} for loose payloads.
 */
export type NavGroupItem = {
  type: 'group';
  label: string;
  children: NavTreeItem[];
};

export type NavTreeItem = NavLinkItem | NavGroupItem;
