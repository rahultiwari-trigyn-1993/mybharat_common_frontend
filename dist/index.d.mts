import * as React from 'react';
import React__default from 'react';
import * as bootstrap from 'bootstrap';
import * as react_jsx_runtime from 'react/jsx-runtime';

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

type FooterProps = {
    /** CDN origin + `/mybharat` path segment (no trailing slash) */
    cdnBase?: string;
    /** Matches logged-in `User` / `$ufdl_id` — feedback opens full form; skips Guest modal branch for captcha UI when false */
    isLoggedIn?: boolean;
    /** When set and user is not logged in, renders reCAPTCHA widget inside `#feed_back` */
    recaptchaSiteKey?: string;
    /** APIGateway root for feedback submit (e.g. `/api` dev proxy or `login.apiBaseUrl`). */
    feedbackApiBaseUrl?: string;
    /** Rewards API root for `trigger-youth-reward-points` (e.g. `/rewards-api` or `VITE_REWARDS_API_URL`). */
    rewardsApiBaseUrl?: string;
    /** Optional full URL override (default `{feedbackApiBaseUrl}/saveFeedbackData`). */
    feedbackSubmitUrl?: string;
    /** Logged-in user session for registered feedback payload. */
    userSession?: HeaderUserSessionInput;
    /** @deprecated Unused — feedback posts to APIGateway. */
    webroot?: string;
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
    /** Same-origin proxy for login fetch when apiBaseUrl is cross-origin (avoids OPTIONS preflight). */
    apiProxyBaseUrl?: string;
    /** RSA public key PEM (optional). Browser encrypts password/OTP — never pass private key as a prop. */
    loginPayloadPublicKey?: string;
    /** Optional client IP for OTP send when host cannot infer IP server-side. */
    ipAddress?: string;
    /** Public profile API base for post-login `getUserId`. */
    publicProfileApiBaseUrl?: string;
    /** Cookie domain for post-login token cookies. */
    cookieDomain?: string;
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
    /** Same-origin proxy for login fetch when apiBaseUrl is cross-origin (avoids OPTIONS preflight). */
    apiProxyBaseUrl?: string;
    /** RSA public key PEM (optional). Browser encrypts password/OTP — never pass private key as a prop. */
    loginPayloadPublicKey?: string;
    /** Optional client IP for OTP send when host cannot infer IP server-side. */
    ipAddress?: string;
    /** Public profile API base for post-login `getUserId`. */
    publicProfileApiBaseUrl?: string;
    /** Cookie domain for post-login token cookies. */
    cookieDomain?: string;
};
declare const Header: React__default.FC<HeaderProps>;

/**
 * Bootstrap 5 for modals, dropdowns, collapse — bundled instead of CDN inject (Phase 1).
 * Exposes `window.bootstrap` for `data-bs-*` markup and `bootstrapModal.ts`.
 */

declare global {
    interface Window {
        bootstrap?: typeof bootstrap;
    }
}

/**
 * Server-side auth bootstrap — browser calls opaque same-origin routes only.
 * Host must map these paths to APIGateway (credentials stay on server).
 *
 * @see docs/cakephp-shell-integration.md — "Internal auth routes"
 */
/** Opaque path — host proxies to POST /getKeycloakClientAccessToken (no body). */
declare const SHELL_INTERNAL_KC_CLIENT_PATH = "/_internal/kc-client";
/** Opaque path — host proxies to POST /oauth with server-stored client credentials. */
declare const SHELL_INTERNAL_GUEST_OAUTH_PATH = "/_internal/guest-oauth";
/** RSA public key for encrypting passwords/OTP in the browser. */
declare const SHELL_INTERNAL_LOGIN_PUBKEY_PATH = "/_internal/login-pubkey";
/** Encrypted password sign-in — host decrypts and calls keycloakLogin. */
declare const SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH = "/_internal/keycloak-login";
/** Encrypted OTP verify — host decrypts and calls verifyGuestUserOtp. */
declare const SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH = "/_internal/verify-guest-otp";
/** Encrypted password change — host decrypts and calls keycloakChangePassword. */
declare const SHELL_INTERNAL_CHANGE_PASSWORD_PATH = "/_internal/keycloak-change-password";

/** Matches header.ctp jQuery selectors — works for in-package and host-page Sign In controls. */
declare const HEADER_LOGIN_SIGN_IN_SELECTORS = "#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link";
declare const DEFAULT_LOGIN_API_ERROR = "Something went wrong!!! Plz try again later.";
/** Default same-origin proxy prefix when apiBaseUrl is on another host/port. */
declare const SHELL_LOGIN_API_PROXY_DEFAULT = "/mybharat-shell-api";
/** Pin header login API root and optional same-origin proxy for browser fetch. */
declare function applyShellLoginApiConfig(apiBaseUrl?: string, apiProxyBaseUrl?: string): void;
/** Same-origin or proxy base used for APIGateway fetch from the shell. */
declare function getShellApiFetchBaseUrl(): string;
/** Build APIGateway URL under the shell login/feedback proxy base. */
declare function buildShellApiUrl(path: string): string;
/** Client access token — server-side internal route only (not exposed in Network tab). */
declare function getKeycloakClientAccessToken(forceRefresh?: boolean): Promise<string>;
/** Primary entry — matches header.ctp (`#loginWithOtpModal` first). */
declare function openLoginWithOtpModal(): void;
declare function openSignInPasswordModal(): void;
/** Sync OTP login submit button enabled/disabled state (safe to call from React handlers). */
declare function validateOtpLoginForm(): void;
/** Submit OTP login — validates form first; wired from React and document click handlers. */
declare function submitOtpLoginFromModal(): void;
/** Wire global Sign In triggers + modal interactions (idempotent). */
declare function installHeaderLoginFlow(): () => void;

/**
 * Post-OTP-verify login pipeline — replaces legacy `PagesController::loginWithOtp`.
 * Builds after_login JSON and browser-POSTs to CakePHP `establishSession` for PHP session hydration.
 */
type LoginOtpApiResponse = {
    status_code?: number | string;
    message?: string | unknown;
    error?: string;
    error_description?: string;
    access_token?: string;
    accessToken?: string;
    mb_token?: string;
    mbToken?: string;
    reg_code?: string;
    data?: unknown;
    token?: string;
    encryptId?: string;
    redirect_url?: string;
    domain?: string;
    controller?: string;
    action?: string;
    org_name?: string;
};
type LoginOtpSuccessResponse = LoginOtpApiResponse & {
    status_code: 200;
    token: string;
    encryptId?: string;
    redirect_url?: string;
    domain?: string;
    controller?: string;
    action?: string;
    org_name?: string;
};
type LoginOtpRedirectResult = {
    redirecting: true;
};
declare function isLoginOtpRedirectResult(res: LoginOtpApiResponse | LoginOtpSuccessResponse | LoginOtpRedirectResult): res is LoginOtpRedirectResult;
/**
 * Full loginWithOtp replacement — call after successful verifyGuestUserOtp.
 * Requires reg_code from verify response (stored via storeRegCodeFromVerifyResponse).
 */
declare function completeLoginWithOtp(username: string): Promise<LoginOtpApiResponse | LoginOtpRedirectResult>;
/**
 * Password sign-in — replaces legacy `pages/signIn`.
 * Flow: keycloakLogin → userOrgAccessLogin → establishSession (shared with OTP login).
 */
declare function completePasswordSignIn(username: string, password: string): Promise<LoginOtpApiResponse | LoginOtpRedirectResult>;
/**
 * Forgot-password password update — replaces legacy `pages/keycloakForgotPassword`.
 * Flow: keycloakForgotPassword → keycloakChangePassword (requires reg_code from OTP verify).
 */
declare function completeForgotPasswordUpdate(identifier: string, password: string): Promise<LoginOtpApiResponse>;

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

/** Document-level handlers for `#increasetext`, `#decreasetext`, `#resettext`. */
declare function installHeaderAccessibilityFont(): () => void;

/** Binds gov-strip font size controls (`#increasetext`, `#decreasetext`, `#resettext`). */
declare function useHeaderAccessibilityFont(enabled?: boolean): void;

declare function applyFooterFeedbackConfig(options?: {
    feedbackApiBaseUrl?: string;
    rewardsApiBaseUrl?: string;
    /** @deprecated Use `feedbackApiBaseUrl` — full URL override for save feedback POST. */
    feedbackSubmitUrl?: string;
    /** @deprecated No longer used — feedback posts to APIGateway `/saveFeedbackData`. */
    webroot?: string;
    userSession?: HeaderUserSessionInput;
    isLoggedIn?: boolean;
}): void;
declare function validateFeedbackForm(requireCaptcha?: boolean): boolean;
/** Document-level feedback modal handlers — validation + APIGateway submit. */
declare function installFooterFeedbackFlow(): () => void;

declare const SAVE_FEEDBACK_DATA_PATH = "/saveFeedbackData";
type FeedbackApiResponse = {
    status_code?: number | string;
    data?: string;
    message?: string;
};
type FeedbackFormValues = {
    type: string;
    user_rating: string;
    user_feedback: string;
    user_name?: string;
    user_email?: string;
    user_mobile?: string;
    feedback_captcha_name?: string;
    feedback_captcha_value?: string;
    'g-recaptcha-response'?: string;
};
declare function applyFooterFeedbackApiConfig(options?: {
    feedbackApiBaseUrl?: string;
    rewardsApiBaseUrl?: string;
    /** Full URL override for the save feedback POST (default `{apiBase}/saveFeedbackData`). */
    feedbackSubmitUrl?: string;
    userSession?: HeaderUserSessionInput;
    isLoggedIn?: boolean;
}): void;
/** Mirrors CakePHP `trigger-youth-reward-points` for logged-in web feedback — non-blocking. */
declare function triggerGeneralFeedbackReward(userId: number): Promise<void>;
/**
 * Port of CakePHP `TasksController::saveUserFeedback()` — POST `{API_BASE}/saveFeedbackData`.
 */
declare function saveUserFeedback(form: FeedbackFormValues): Promise<FeedbackApiResponse>;
declare function isFeedbackSubmitSuccess(res: FeedbackApiResponse): boolean;

type UseFooterFeedbackShellOptions = {
    feedbackApiBaseUrl?: string;
    rewardsApiBaseUrl?: string;
    feedbackSubmitUrl?: string;
    userSession?: HeaderUserSessionInput;
    isLoggedIn?: boolean;
    enabled?: boolean;
};
/** Installs global feedback form handlers (validation, submit, reset). */
declare function useFooterFeedbackShell({ feedbackApiBaseUrl, rewardsApiBaseUrl, feedbackSubmitUrl, userSession, isLoggedIn, enabled, }?: UseFooterFeedbackShellOptions): void;

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

export { DEFAULT_HEADER2_MAIN_NAV, DEFAULT_HEADER_MAIN_NAV, DEFAULT_LOGIN_API_ERROR, DesktopMainNav, Footer, HEADER_LOGIN_SIGN_IN_SELECTORS, Header, Header2, HeaderAuthControls, HeaderLoginShellPortal, HeaderProfileMenu, type HeaderUserApiData, type HeaderUserApiEnvelope, type HeaderUserSession, type HeaderUserSessionInput, MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN, MYBHARAT_COMMON_FRONTEND_VERSION, type NavGroupItem, type NavLinkItem, type NavTreeItem, type NormalizeApiMenuTreeOptions, type NormalizeNavTreeOptions, type PrepareMainNavItemsOptions, SAVE_FEEDBACK_DATA_PATH, SHELL_INTERNAL_CHANGE_PASSWORD_PATH, SHELL_INTERNAL_GUEST_OAUTH_PATH, SHELL_INTERNAL_KC_CLIENT_PATH, SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH, SHELL_INTERNAL_LOGIN_PUBKEY_PATH, SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH, SHELL_LOGIN_API_PROXY_DEFAULT, type UseMainNavItemsOptions, applyFooterFeedbackApiConfig, applyFooterFeedbackConfig, applyShellLoginApiConfig, buildHeaderProfileMenuItems, buildShellApiUrl, completeForgotPasswordUpdate, completeLoginWithOtp, completeLoginWithOtp as completeLoginWithOtpFlow, completePasswordSignIn, _default as default, filterUnsafeNavTree, getKeycloakClientAccessToken, getShellApiFetchBaseUrl, installFooterFeedbackFlow, installHeaderAccessibilityFont, installHeaderLoginFlow, isFeedbackSubmitSuccess, isGuestHeaderUserPayload, isHeaderUserLoggedIn, isLoginOtpRedirectResult, isNavGroupItem, isNavLinkItem, isSafeNavHref, navTreeItemKey, normalizeApiMenuTree, normalizeHrefForNav, normalizeNavTree, openLoginWithOtpModal, openSignInPasswordModal, parseHeaderUserSession, prepareMainNavItems, saveUserFeedback, submitOtpLoginFromModal, triggerGeneralFeedbackReward, unwrapMenuListFromPayload, useFooterFeedbackShell, useHeaderAccessibilityFont, useMainNavItems, validateFeedbackForm, validateOtpLoginForm };
