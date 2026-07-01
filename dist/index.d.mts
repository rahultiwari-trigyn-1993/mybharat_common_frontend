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
    /** CDN origin (e.g. `https://cdn-prod.mybharats.in`) — assets load from `{cdnBase}/mybharat/...`. */
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

/** Runtime environment supplied by the host app (browser). */
type ClientEnvironment = 'local' | 'dev' | 'beta' | 'prod';
type ShellRuntimeConfig = {
    baseUrl?: string;
    apiBaseUrl?: string;
    /** Host environment — required at runtime (`local` | `dev` | `beta` | `prod`). */
    environment?: ClientEnvironment;
    apiProxyBaseUrl?: string;
    cookieDomain?: string;
    publicProfileApiBaseUrl?: string;
    /** RSA public key PEM — browser-safe; skips /_internal/login-pubkey fetch when inlined. */
    loginPayloadPublicKey?: string;
    recaptchaSiteKey?: string;
    feedbackApiBaseUrl?: string;
    rewardsApiBaseUrl?: string;
    cdnBase?: string;
    navItems?: unknown;
};

/**
 * Alternate header (nav + auth styling). Exported as `Header2` from the package entry.
 * Avoid mounting `Header` and `Header2` on one page — shared DOM ids / modal hooks.
 */

type Header2Props = {
    /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
    title?: string;
    /** CDN origin (e.g. `https://cdn-beta.mybharats.in`) — assets load from `{cdnBase}/mybharat/...`. */
    cdnBase?: string;
    /** Desktop main nav from host API/CMS — required JSON array. */
    mainNavItems: readonly NavTreeItem[];
    /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
    userSession?: HeaderUserSessionInput;
    /** Cake webroot for profile / logout URLs (default `/`). */
    webroot?: string;
    /** Portal origin for header login redirects (`VITE_BASE_URL`). */
    baseUrl?: string;
    /** MY Bharat login API root — absolute URL when embedded on another app (not host `/api`). */
    apiBaseUrl?: string;
    /** Host environment (`local` | `dev` | `beta` | `prod`). */
    environment?: ClientEnvironment;
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
    /** Load Bhashini website translation plugin (default true). Set false if the host page loads the script. */
    bhashini?: boolean;
};
declare const Header2: React__default.FC<Header2Props>;

type HeaderProps = {
    /** Landmark label for the root `<header>` (`aria-label`). Does not change visible UI. */
    title?: string;
    /** CDN origin (e.g. `https://cdn-prod.mybharats.in`) — assets load from `{cdnBase}/mybharat/...`. */
    cdnBase?: string;
    /** Desktop main nav from host API/CMS — required JSON array. */
    mainNavItems: readonly NavTreeItem[];
    /** Logged-in user (`data` object or full API envelope). Guest header when omitted. */
    userSession?: HeaderUserSessionInput;
    /** Cake webroot for profile / logout URLs (default `/`). */
    webroot?: string;
    /** Portal origin for header login redirects (`VITE_BASE_URL`). */
    baseUrl?: string;
    /** MY Bharat login API root — absolute URL when embedded on another app (not host `/api`). */
    apiBaseUrl?: string;
    /** Host environment (`local` | `dev` | `beta` | `prod`). */
    environment?: ClientEnvironment;
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
    /** Load Bhashini website translation plugin (default true). Set false if the host page loads the script. */
    bhashini?: boolean;
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

/** Opaque path — host proxies to POST /getKeycloakClientAccessToken (no body). */
declare const SHELL_INTERNAL_KC_CLIENT_PATH: "/_internal/kc-client";
/** Opaque path — host proxies to POST /oauth with server-stored client credentials. */
declare const SHELL_INTERNAL_GUEST_OAUTH_PATH: "/_internal/guest-oauth";
/** RSA public key for encrypting passwords/OTP in the browser. */
declare const SHELL_INTERNAL_LOGIN_PUBKEY_PATH: "/_internal/login-pubkey";
/** Encrypted password sign-in — host decrypts and calls keycloakLogin. */
declare const SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH: "/_internal/keycloak-login";
/** Encrypted OTP verify — host decrypts and calls verifyGuestUserOtp. */
declare const SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH: "/_internal/verify-guest-otp";
/** Encrypted password change — host decrypts and calls keycloakChangePassword. */
declare const SHELL_INTERNAL_CHANGE_PASSWORD_PATH: "/_internal/keycloak-change-password";

/** Matches header.ctp jQuery selectors — works for in-package and host-page Sign In controls. */
declare const HEADER_LOGIN_SIGN_IN_SELECTORS = "#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link";
declare const DEFAULT_LOGIN_API_ERROR = "Something went wrong!!! Plz try again later.";
declare const SHELL_LOGIN_API_PROXY_DEFAULT: "/mybharat-shell-api";
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
 * Post-OTP-verify / password login — gateway auth then browser POST to PHP `establish_session`.
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
 * Flow: keycloakLogin → POST `{baseUrl}/establish_session`.
 */
declare function completePasswordSignIn(username: string, password: string): Promise<LoginOtpApiResponse | LoginOtpRedirectResult>;
/**
 * Forgot-password password update — replaces legacy `pages/keycloakForgotPassword`.
 * Flow: keycloakForgotPassword → keycloakChangePassword (requires reg_code from OTP verify).
 */
declare function completeForgotPasswordUpdate(identifier: string, password: string): Promise<LoginOtpApiResponse>;

type EstablishSessionFlow = 'login_password' | 'login_otp' | 'registration';
type SubmitEstablishSessionParams = {
    /** Portal origin (`VITE_BASE_URL` / Header `baseUrl`). */
    baseUrl: string;
    flow: EstablishSessionFlow;
    username: string;
    authResponse: unknown;
    /** Override shell cookie domain (e.g. registration app `VITE_COOKIE_DOMAIN`). */
    cookieDomain?: string;
    /** Registration only — POST field `qualification`. */
    qualification?: string;
    /** Registration only — POST field `sports_area`. */
    sportsArea?: string;
    /** Registration only — POST field `is_outside_india` (`"1"` when international). */
    isOutsideIndia?: boolean;
    /** Registration only — POST field `country_id`. */
    countryId?: string;
};
/** `{baseUrl}/establish_session` — PHP hydrates session from gateway auth response. */
declare function resolveEstablishSessionAction(baseUrl: string): string;
/** Full-page form POST — leaves the React SPA (not fetch/AJAX). */
declare function submitEstablishSessionForm(params: SubmitEstablishSessionParams): void;

/** MB app token for `token` / `token_essays` cookies (keycloakLogin / exchange / registerKeycloakUser). */
declare function readMbAppTokenFromGatewayResponse(authResponse: unknown): string;
declare function readShellCookieDomain(): string;
/** Sets `token` and `token_essays` before `establish_session` navigation. */
declare function setMbAuthSessionCookies(tokenValue: string, options?: {
    cookieDomain?: string;
}): void;

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

/** v3 widget id/class (v2 used `.bhashini-translator-widget`). */
declare const BHASHINI_WIDGET_SELECTORS: readonly ["#bhashini-translation", ".bhashini-plugin-container .bhashini-dropdown", ".bhashini-translator-widget"];
declare function findBhashiniWidget(root?: ParentNode | null): HTMLElement | null;
/**
 * Load Bhashini v3 after `.bhashini-plugin-container` exists in the DOM.
 * Re-injects the script if a host layout loaded it before the header mounted.
 */
declare function loadBhashiniScript(): Promise<void>;

declare function useBhashiniWidgetPlacement(enabled?: boolean): void;

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

declare const SAVE_FEEDBACK_DATA_PATH: "/saveFeedbackData";
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

/** APIGateway paths (appended to apiBaseUrl or same-origin proxy prefix). */
declare const GATEWAY_PATHS: {
    readonly checkUserExists: "/checkUserExists";
    readonly sendMobileGuestUserOtp: "/sendMobileGuestUserOtp";
    readonly keycloakGetExchangeToken: "/keycloakGetExchangeToken";
    readonly keycloakForgotPassword: "/keycloakForgotPassword";
    readonly saveFeedbackData: "/saveFeedbackData";
    readonly triggerYouthReward: "/trigger-youth-reward-points";
};
/** Opaque browser → host-server routes (credentials stay on server). */
declare const INTERNAL_PATHS: {
    readonly proxyDefault: "/mybharat-shell-api";
    readonly kcClient: "/_internal/kc-client";
    readonly guestOauth: "/_internal/guest-oauth";
    readonly loginPubkey: "/_internal/login-pubkey";
    readonly keycloakLogin: "/_internal/keycloak-login";
    readonly verifyGuestOtp: "/_internal/verify-guest-otp";
    readonly keycloakChangePassword: "/_internal/keycloak-change-password";
};
/** Host dev proxy rewrites (server-side only). */
declare const PROXY_REWRITES: {
    readonly kcClient: "/api/getKeycloakClientAccessToken";
    readonly guestOauth: "/api/oauth";
    readonly apiPrefix: "/api";
};
declare const PORTAL_PATHS: {
    readonly establishSession: "/establish_session";
};
/** Dev proxy shortcuts checked by feedback submit. */
declare const DEV_API_PROXY_PREFIXES: {
    readonly feedback: "/api";
    readonly rewards: "/rewards-api";
};

/** CakePHP / portal routes used in header, footer, and profile menus. */
declare const APP_ROUTES: {
    readonly home: "/";
    readonly yuvaRegister: "/yuva_register";
    readonly partnerRegister: "/partner_register";
    readonly youthProfile: "/youth-profile";
    readonly dashboard: "/dashboard";
    readonly quiz: "/quiz";
    readonly support: "/pages/support";
    readonly terms: "/pages/terms_of_use";
    readonly policy: "/pages/policy";
    readonly sitemap: "/sitemap";
    readonly about: "/pages/about_mybharat";
    readonly megaEvents: "/mega_events";
    readonly experientialLearning: "/pages/experiential_learning?mode=I";
    readonly events: "/pages/events";
    readonly podcasts: "/pages/podcasts";
    readonly designForBharat: "/pages/design_for_bharat";
    readonly editPartnerProfile: "users/editpartnerprofile";
    readonly partnerProfile: "reports/partner_profile";
    readonly logout: "users/check_user_logout";
};

declare const AUTH_CONFIG: {
    readonly cookieNames: {
        readonly token: "token";
        readonly tokenEssays: "token_essays";
        readonly encryptId: "encryptId";
        readonly essayRedirectUrl: "essay_redirect_url";
    };
    readonly cookieExpiryMinutes: 1440;
    readonly cookiePath: "/";
    readonly otpResendSeconds: 45;
    readonly otpLength: 6;
    readonly storageKeys: {
        readonly loginData: "loginData";
        readonly regCode: "mybharat_reg_code";
        readonly clientIp: "mybharat_client_ip_address";
        readonly fromQuiz: "fromQuiz";
        readonly fromOrg: "fromOrg";
        readonly quizId: "quizId";
        readonly designForBharat: "design_for_bharat";
        readonly hackForSocial: "hack_for_social_cause";
        readonly fromGamification: "fromGamification";
        readonly userId: "user_id";
        readonly accessibilityFont: "mb-accessibility-font-step";
    };
    readonly excludedProfileMenuUserTypes: Set<number>;
    readonly youthUserType: 6;
    readonly recaptchaLoadTimeoutMs: 15000;
};

declare const EXTERNAL_URLS: {
    readonly government: {
        readonly indiaGov: "https://www.india.gov.in/";
        readonly digitalIndia: "https://digitalindia.gov.in/";
        readonly yas: "https://yas.gov.in/";
    };
    readonly support: {
        readonly phones: readonly ["14472", "18002122729"];
        readonly tel: "18002122729";
        readonly label: "support.mybharat.gov.in";
    };
    readonly social: {
        readonly twitter: "https://x.com/MYBharatHQ";
        readonly instagram: "https://www.instagram.com/mybharatgov/";
        readonly facebook: "https://www.facebook.com/mybharathq/";
        readonly linkedin: "https://www.linkedin.com/company/mybharatgov/";
        readonly whatsapp: "https://whatsapp.com/channel/0029VaI9Yoj9WtCA717aAd0h";
        readonly youtube: "https://www.youtube.com/@MyBharatHQ";
    };
    readonly thirdParty: {
        readonly bhashiniScript: "https://translation-plugin.bhashini.co.in/v3/website_translation_utility.js";
        readonly bhashiniLanguages: "en,as,bn,brx,gom,gu,hi,ml,or,pa,te,ur";
        readonly recaptchaApi: "https://www.google.com/recaptcha/api.js";
        readonly ipLookup: readonly ["https://api.ipify.org?format=json", "https://api64.ipify.org?format=json"];
        readonly cloudflareTrace: "https://www.cloudflare.com/cdn-cgi/trace";
    };
};

/** Standard fallback when an API response cannot be treated as success. */
declare const DEFAULT_API_ERROR_MESSAGE = "Something went wrong!!! Plz try again later.";
declare const OTP_MESSAGES: {
    readonly invalid: "Please enter valid OTP.";
    readonly required: "Please enter OTP";
    readonly sixDigits: "Please enter 6 digit OTP";
    readonly maxAttempts: "You have reached maximum limit to verify OTP. Please try again after sometime.";
    readonly sendFailed: "Failed to send OTP";
};

declare function resolveCdnBase(options?: {
    cdnBase?: string;
}): string;
/** Build `{cdnBase}/mybharat/{assetPath}` for logos and static images on the CDN. */
declare function resolveCdnAssetUrl(cdnBase: string, assetPath: string): string;
declare function resolveShellLoginConfig(props?: ShellRuntimeConfig): ShellRuntimeConfig & {
    apiProxyBaseUrl: string;
};

type RequiredClientConfigInput = {
    baseUrl?: string;
    apiBaseUrl?: string;
    environment?: string;
    cdnBase?: string;
};
/** Merges React props, `window.MYBHARAT_SHELL`, and web-component attributes. */
declare function mergeRequiredClientConfig(props?: RequiredClientConfigInput): RequiredClientConfigInput;
/**
 * Alerts when required host config is missing.
 * Each message is shown at most once per page load.
 */
declare function assertRequiredClientConfig(props?: RequiredClientConfigInput): boolean;
declare function readClientEnvironment(props?: RequiredClientConfigInput): ClientEnvironment | undefined;

/** Validates required host config on mount. */
declare function useRequiredClientConfig(config?: RequiredClientConfigInput): void;

/** Host nav loader failed (network/API). */
declare function alertMainNavLoadFailed(source: string): void;
type RequireMainNavItemsOptions = {
    maxDepth?: number;
    /** Shown in alert messages, e.g. "Header nav" or "Header". */
    source?: string;
};
/**
 * Validates host-provided nav JSON. Alerts once per page when missing/invalid; returns `[]` on failure.
 * No built-in default menu — the host must pass API/CDN JSON.
 */
declare function requireMainNavItems(raw: unknown, options?: RequireMainNavItemsOptions): readonly NavTreeItem[];
/** React Header / Header2 — require prepared or raw nav items from the host app. */
declare function resolveMainNavItemsFromProp(items: readonly NavTreeItem[] | unknown | undefined | null, source: string): readonly NavTreeItem[];

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

type PrepareMainNavItemsOptions = RequireMainNavItemsOptions;
/**
 * Unwraps API JSON → normalize → filter unsafe hrefs.
 * Alerts when nav is missing or invalid; no built-in fallback menu.
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
    maxDepth?: number;
    /** Shown in alert messages when nav load/validation fails. */
    source?: string;
};
/**
 * Loads nav in the host app, then validates for `mainNavItems`.
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

export { APP_ROUTES, AUTH_CONFIG, BHASHINI_WIDGET_SELECTORS, type ClientEnvironment, DEFAULT_API_ERROR_MESSAGE, DEFAULT_LOGIN_API_ERROR, DEV_API_PROXY_PREFIXES, DesktopMainNav, EXTERNAL_URLS, type EstablishSessionFlow, Footer, GATEWAY_PATHS, HEADER_LOGIN_SIGN_IN_SELECTORS, Header, Header2, HeaderAuthControls, HeaderLoginShellPortal, HeaderProfileMenu, type HeaderUserApiData, type HeaderUserApiEnvelope, type HeaderUserSession, type HeaderUserSessionInput, INTERNAL_PATHS, MYBHARAT_COMMON_FRONTEND_VERSION, type NavGroupItem, type NavLinkItem, type NavTreeItem, type NormalizeApiMenuTreeOptions, type NormalizeNavTreeOptions, OTP_MESSAGES, PORTAL_PATHS, PROXY_REWRITES, type PrepareMainNavItemsOptions, type RequireMainNavItemsOptions, type RequiredClientConfigInput, SAVE_FEEDBACK_DATA_PATH, SHELL_INTERNAL_CHANGE_PASSWORD_PATH, SHELL_INTERNAL_GUEST_OAUTH_PATH, SHELL_INTERNAL_KC_CLIENT_PATH, SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH, SHELL_INTERNAL_LOGIN_PUBKEY_PATH, SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH, SHELL_LOGIN_API_PROXY_DEFAULT, type ShellRuntimeConfig, type UseMainNavItemsOptions, alertMainNavLoadFailed, applyFooterFeedbackApiConfig, applyFooterFeedbackConfig, applyShellLoginApiConfig, assertRequiredClientConfig, buildHeaderProfileMenuItems, buildShellApiUrl, completeForgotPasswordUpdate, completeLoginWithOtp, completeLoginWithOtp as completeLoginWithOtpFlow, completePasswordSignIn, _default as default, filterUnsafeNavTree, findBhashiniWidget, getKeycloakClientAccessToken, getShellApiFetchBaseUrl, installFooterFeedbackFlow, installHeaderAccessibilityFont, installHeaderLoginFlow, isFeedbackSubmitSuccess, isGuestHeaderUserPayload, isHeaderUserLoggedIn, isLoginOtpRedirectResult, isNavGroupItem, isNavLinkItem, isSafeNavHref, loadBhashiniScript, mergeRequiredClientConfig, navTreeItemKey, normalizeApiMenuTree, normalizeHrefForNav, normalizeNavTree, openLoginWithOtpModal, openSignInPasswordModal, parseHeaderUserSession, prepareMainNavItems, readClientEnvironment, readMbAppTokenFromGatewayResponse, readShellCookieDomain, requireMainNavItems, resolveCdnAssetUrl, resolveCdnBase, resolveEstablishSessionAction, resolveMainNavItemsFromProp, resolveShellLoginConfig, saveUserFeedback, setMbAuthSessionCookies, submitEstablishSessionForm, submitOtpLoginFromModal, triggerGeneralFeedbackReward, unwrapMenuListFromPayload, useBhashiniWidgetPlacement, useFooterFeedbackShell, useHeaderAccessibilityFont, useMainNavItems, useRequiredClientConfig, validateFeedbackForm, validateOtpLoginForm };
