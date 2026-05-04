import * as React from 'react';
import React__default from 'react';

type FooterProps = {
    /** CDN origin + `/mybharat` path segment (no trailing slash) */
    cdnBase?: string;
    /** Matches logged-in `User` / `$ufdl_id` — feedback opens full form; skips Guest modal branch for captcha UI when false */
    isLoggedIn?: boolean;
    /** When set and user is not logged in, renders reCAPTCHA widget inside `#feed_back` */
    recaptchaSiteKey?: string;
    /** Consumer hook when Registered User is chosen in `#feed_back1` */
    onRegisteredUserClick?: () => void;
};
declare const Footer: React__default.FC<FooterProps>;

/**
 * Data model for desktop main nav — suitable for JSON from CMS/API/ELK.
 * Render with {@link DesktopMainNav}; validate shape server-side; use {@link isSafeNavHref} for untrusted `href` values.
 */
/** Single link row (renders as `<li><a>…</a></li>`). */
type NavLinkItem = {
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
/** Dropdown group: label + children (links or nested groups for multilevel). */
type NavGroupItem = {
    type: 'group';
    label: string;
    children: NavTreeItem[];
};
type NavTreeItem = NavLinkItem | NavGroupItem;

/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */

type Header2Props = {
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-beta.mybharats.in/mybharat` */
    cdnBase?: string;
    /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER2_MAIN_NAV}. */
    mainNavItems?: readonly NavTreeItem[];
};
declare const Header2: React__default.FC<Header2Props>;

type HeaderProps = {
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-prod.mybharats.in/mybharat` */
    cdnBase?: string;
    /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER_MAIN_NAV}. */
    mainNavItems?: readonly NavTreeItem[];
};
declare const Header: React__default.FC<HeaderProps>;

type DesktopMainNavProps = {
    items: readonly NavTreeItem[];
};
/**
 * Renders only `ul.menu_nav1` — place inside the existing desktop `nav.navbar` next to auth controls.
 * Tree from API/CMS/ELK; {@link isSafeNavHref} blocks `javascript:` / `data:` on the client.
 */
declare const DesktopMainNav: React__default.FC<DesktopMainNavProps>;

/** MY Bharat production CDN origin (CSS, JS, images under /mybharat/...). */
declare const MYBHARAT_CDN_ORIGIN = "https://cdn-prod.mybharats.in";
/** Base path for MY Bharat static assets on the CDN. */
declare const MYBHARAT_CDN_BASE = "https://cdn-prod.mybharats.in/mybharat";
/** Beta CDN base for `Header2` default (no trailing slash). */
declare const MYBHARAT_CDN_BASE_BETA = "https://cdn-beta.mybharats.in/mybharat";

/** Default desktop main nav for {@link Header} — replace at runtime via `mainNavItems` prop or merge from API. */
declare const DEFAULT_HEADER_MAIN_NAV: readonly NavTreeItem[];

/** Default desktop main nav for {@link Header2} — override with `mainNavItems` when loading from API. */
declare const DEFAULT_HEADER2_MAIN_NAV: readonly NavTreeItem[];

/**
 * Basic href allowlist for untrusted CMS JSON. Extend if your API needs more schemes.
 */
declare function isSafeNavHref(href: string): boolean;

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
declare const MYBHARAT_COMMON_FRONTEND_VERSION: string;
declare const _default: {
    Header: React.FC<HeaderProps>;
    Header2: React.FC<Header2Props>;
    Footer: React.FC<FooterProps>;
};

export { DEFAULT_HEADER2_MAIN_NAV, DEFAULT_HEADER_MAIN_NAV, DesktopMainNav, Footer, Header, Header2, MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN, MYBHARAT_COMMON_FRONTEND_VERSION, type NavGroupItem, type NavLinkItem, type NavTreeItem, _default as default, isSafeNavHref };
