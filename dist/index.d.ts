import * as React from 'react';
import React__default from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

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
/**
 * Dropdown group: label + children. JSON from CMS/API may contain **any mix** of nested `group`
 * and `link` nodes at every level (single child or many). Rendering is recursive in
 * {@link DesktopMainNav} and {@link MobileMenuModal}; use {@link normalizeNavTree} for loose payloads.
 */
type NavGroupItem = {
    type: 'group';
    label: string;
    children: NavTreeItem[];
};
type NavTreeItem = NavLinkItem | NavGroupItem;

/** Raw user object from MY Bharat profile / session API (`data` field). */
type HeaderUserApiData = {
    id?: number;
    dl_id?: string;
    screen_name?: string | null;
    username?: string | null;
    first_name?: string | null;
    middle_name?: string | null;
    last_name?: string | null;
    user_email?: string | null;
    profile_pic?: string | null;
    profile_pic_path?: string | null;
    public_profile?: string | null;
    my_bharat_id?: string | null;
    /** CakePHP session `User.UserType` when provided by host. */
    user_type?: number | null;
    userType?: number | null;
    org_type?: string | null;
    orgType?: string | null;
    yuva_type?: string | null;
    admin_id?: number | null;
    [key: string]: unknown;
};
/** Full API envelope the host may pass through. */
type HeaderUserApiEnvelope = {
    message?: string;
    status_code?: string | number;
    data?: HeaderUserApiData | null;
};
type HeaderUserSessionInput = HeaderUserSession | HeaderUserApiEnvelope | HeaderUserApiData | null | undefined;
/** Host sends `{ data: { id, ... } }` when logged in, or `{ data: {} }` for guest. */
declare function isGuestHeaderUserPayload(input: HeaderUserSessionInput): boolean;
/** Normalized session consumed by header profile UI. */
type HeaderUserSession = {
    id: number;
    dlId?: string;
    displayName: string;
    username?: string;
    email?: string;
    profilePic?: string | null;
    publicProfileUrl?: string;
    myBharatId?: string;
    userType?: number;
    orgType?: string;
};
type HeaderProfileMenuItem = {
    href: string;
    label: string;
    iconClass: string;
    className?: string;
    external?: boolean;
};
/** Returns normalized session or `null` when guest / invalid payload. */
declare function parseHeaderUserSession(input: HeaderUserSessionInput): HeaderUserSession | null;
declare function isHeaderUserLoggedIn(input: HeaderUserSessionInput): boolean;
/** Profile dropdown items — aligned to legacy `header.ctp` (youth + partner branches). */
declare function buildHeaderProfileMenuItems(user: HeaderUserSession, options?: {
    webroot?: string;
}): HeaderProfileMenuItem[];

/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */

type Header2Props = {
    /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-beta.mybharats.in/mybharat` */
    cdnBase?: string;
    /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER2_MAIN_NAV}. */
    mainNavItems?: readonly NavTreeItem[];
    /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
    userSession?: HeaderUserSessionInput;
    /** Cake webroot for profile / logout URLs (default `/`). */
    webroot?: string;
    /** Portal origin for header login redirects (`VITE_BASE_URL`). */
    baseUrl?: string;
    /** MY Bharat login API root — absolute URL when embedded on another app (not host `/api`). */
    apiBaseUrl?: string;
};
declare const Header2: React__default.FC<Header2Props>;

type HeaderProps = {
    /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
    title?: string;
    /** Override CDN base (no trailing slash), e.g. `https://cdn-prod.mybharats.in/mybharat` */
    cdnBase?: string;
    /** Desktop main nav from API/CMS; defaults to {@link DEFAULT_HEADER_MAIN_NAV}. */
    mainNavItems?: readonly NavTreeItem[];
    /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
    userSession?: HeaderUserSessionInput;
    /** Cake webroot for profile / logout URLs (default `/`). */
    webroot?: string;
    /** Portal origin for header login redirects (`VITE_BASE_URL`). */
    baseUrl?: string;
    /** MY Bharat login API root — absolute URL when embedded on another app (not host `/api`). */
    apiBaseUrl?: string;
};
declare const Header: React__default.FC<HeaderProps>;

/** Matches header.ctp jQuery selectors — works for in-package and host-page Sign In controls. */
declare const HEADER_LOGIN_SIGN_IN_SELECTORS = "#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link";
declare const DEFAULT_LOGIN_API_ERROR = "Something went wrong!!! Plz try again later.";
/** Pin header login API root (absolute URL recommended, e.g. `http://127.0.0.1:8000/api`). */
declare function applyShellLoginApiConfig(apiBaseUrl?: string): void;
/** Client access token — cached for subsequent login API calls. */
declare function getKeycloakClientAccessToken(forceRefresh?: boolean): Promise<string>;
/** Primary entry — matches header.ctp (`#loginWithOtpModal` first). */
declare function openLoginWithOtpModal(): void;
declare function openSignInPasswordModal(): void;
/** Wire global Sign In triggers + modal interactions (idempotent). */
declare function installHeaderLoginFlow(): () => void;

type HeaderAuthControlsProps = {
    cdn: string;
    userSession?: HeaderUserSessionInput;
    webroot?: string;
};
/**
 * Desktop auth area — guest Sign In / Register or logged-in profile dropdown.
 */
declare function HeaderAuthControls({ cdn, userSession, webroot }: HeaderAuthControlsProps): react_jsx_runtime.JSX.Element;

type HeaderProfileMenuProps = {
    user: HeaderUserSession;
    /** Cake webroot prefix for partner / logout URLs (default `/`). */
    webroot?: string;
    /** `desktop` — navbar dropdown; `mobile` — drawer link list */
    variant?: 'desktop' | 'mobile';
};
/** Desktop profile chip + Bootstrap dropdown (legacy `header.ctp` `.chat-toggler`). */
declare function HeaderProfileMenu({ user, webroot, variant }: HeaderProfileMenuProps): react_jsx_runtime.JSX.Element;

type HeaderLoginShellPortalProps = {
    cdnBase: string;
    enabled?: boolean;
    variant?: 'header' | 'header2';
};
declare function HeaderLoginShellPortal({ cdnBase, enabled, variant, }: HeaderLoginShellPortalProps): react_jsx_runtime.JSX.Element | null;

type DesktopMainNavProps = {
    items: readonly NavTreeItem[];
};
/**
 * Renders only `ul.menu_nav1` — place inside the existing desktop `nav.navbar` next to auth controls.
 * Tree from API/CMS/ELK; {@link isSafeNavHref} blocks `javascript:` / `data:` on the client.
 * Only one top-level dropdown is open at a time; within an open panel, only one nested group is open at a time.
 * Menus close when the pointer leaves the trigger + panel wrapper (desktop).
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

type NormalizeNavTreeOptions = {
    /** Guard against runaway trees (default 32). */
    maxDepth?: number;
};
/**
 * Normalizes API/CMS JSON into a safe {@link NavTreeItem} tree: any mix of `group` and `link`
 * at any depth; drops invalid nodes; drops empty groups; enforces max nesting depth.
 * Use before rendering when `mainNavItems` comes from untrusted or loose JSON.
 */
declare function normalizeNavTree(items: unknown, options?: NormalizeNavTreeOptions): NavTreeItem[];
declare function isNavLinkItem(item: NavTreeItem): item is NavLinkItem;
declare function isNavGroupItem(item: NavTreeItem): item is NavGroupItem;

/**
 * Stable React key from tree position + item identity (label/href/child count).
 * Safer than `key={index}` when CMS reorders items at the same depth.
 */
declare function navTreeItemKey(item: NavTreeItem, segments: readonly number[]): string;

type NormalizeApiMenuTreeOptions = {
    maxDepth?: number;
};
/** Normalizes relative paths and blocks dangerous schemes in loose API `href` fields. */
declare function normalizeHrefForNav(href: unknown): string;
/**
 * Maps loose API/CMS menu nodes (`name`, `url`, `submenu`, etc.) into {@link NavTreeItem} trees.
 * Also accepts strict `{ type: "link" | "group", label, href, children }` payloads.
 */
declare function normalizeApiMenuTree(items: unknown, options?: NormalizeApiMenuTreeOptions): NavTreeItem[];

/** Drops links with unsafe `href` values; prunes empty groups. */
declare function filterUnsafeNavTree(items: readonly NavTreeItem[]): NavTreeItem[];

type PrepareMainNavItemsOptions = {
    /** Used when payload is empty or normalizes to no safe links (default `[]`). */
    fallback?: readonly NavTreeItem[];
    maxDepth?: number;
};
/**
 * Unwraps API JSON → loose API normalize → {@link filterUnsafeNavTree}.
 * Pass the result to `Header` / `Header2` as `mainNavItems`.
 */
declare function prepareMainNavItems(raw: unknown, options?: PrepareMainNavItemsOptions): readonly NavTreeItem[];

/**
 * Unwraps a nav array from a raw API payload (array or one-level wrapper object).
 */
declare function unwrapMenuListFromPayload(data: unknown): unknown[] | null;

type UseMainNavItemsOptions = {
    /** Host-provided loader (API, CDN, etc.). This package does not call `fetch` by itself. */
    load: () => Promise<unknown>;
    /** Pick the slice to normalize, e.g. `(raw) => raw.data` */
    select?: (raw: unknown) => unknown;
    fallback?: readonly NavTreeItem[];
    maxDepth?: number;
};
/**
 * Loads nav in the host app, then unwraps / normalizes / filters for `mainNavItems`.
 * Memoize `load` (and `select` if inline) with `useCallback` to avoid duplicate requests.
 */
declare function useMainNavItems(options: UseMainNavItemsOptions): readonly NavTreeItem[];

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
declare const MYBHARAT_COMMON_FRONTEND_VERSION: string;
declare const _default: {
    Header: React.FC<HeaderProps>;
    Header2: React.FC<Header2Props>;
    Footer: React.FC<FooterProps>;
};

export { DEFAULT_HEADER2_MAIN_NAV, DEFAULT_HEADER_MAIN_NAV, DEFAULT_LOGIN_API_ERROR, DesktopMainNav, Footer, HEADER_LOGIN_SIGN_IN_SELECTORS, Header, Header2, HeaderAuthControls, HeaderLoginShellPortal, HeaderProfileMenu, type HeaderUserApiData, type HeaderUserApiEnvelope, type HeaderUserSession, type HeaderUserSessionInput, MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN, MYBHARAT_COMMON_FRONTEND_VERSION, type NavGroupItem, type NavLinkItem, type NavTreeItem, type NormalizeApiMenuTreeOptions, type NormalizeNavTreeOptions, type PrepareMainNavItemsOptions, type UseMainNavItemsOptions, applyShellLoginApiConfig, buildHeaderProfileMenuItems, _default as default, filterUnsafeNavTree, getKeycloakClientAccessToken, installHeaderLoginFlow, isGuestHeaderUserPayload, isHeaderUserLoggedIn, isNavGroupItem, isNavLinkItem, isSafeNavHref, navTreeItemKey, normalizeApiMenuTree, normalizeHrefForNav, normalizeNavTree, openLoginWithOtpModal, openSignInPasswordModal, parseHeaderUserSession, prepareMainNavItems, unwrapMenuListFromPayload, useMainNavItems };
