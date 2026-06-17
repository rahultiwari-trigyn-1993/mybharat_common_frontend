import { hideBootstrapModal, showBootstrapModal, switchBootstrapModal } from './bootstrapModal';
import {
  completeForgotPasswordUpdate,
  completeLoginWithOtp,
  completePasswordSignIn,
  isLoginOtpRedirectResult,
  storeRegCodeFromVerifyResponse,
} from './loginWithOtpFlow';
import {
  clearShellInternalAuthCache,
  clearShellInternalKcAuthCache,
  fetchInternalGuestOauthAccessToken,
  fetchInternalKeycloakClientAccessToken,
  postInternalAuthJson,
  ShellInternalAuthError,
  SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH,
} from './shellLoginInternalAuth';
import { encryptLoginSecret } from './shellLoginSecretPayload';

/** Matches header.ctp jQuery selectors — works for in-package and host-page Sign In controls. */
export const HEADER_LOGIN_SIGN_IN_SELECTORS =
  '#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link';

const LOGIN_DATA_KEY = 'loginData';
const DEFAULT_LOGIN_API_ERROR = 'Something went wrong!!! Plz try again later.';

/** Shell-scoped API base — never derived from `window.location` (avoids localhost:3000 registration `/api` collision). */
let shellLoginApiBaseUrl: string | undefined;
/** Same-origin proxy base for fetch (avoids cross-origin CORS OPTIONS preflight). */
let shellLoginApiProxyBaseUrl: string | undefined;

/** Default same-origin proxy prefix when apiBaseUrl is on another host/port. */
export const SHELL_LOGIN_API_PROXY_DEFAULT = '/mybharat-shell-api';

let warnedAutoLoginProxy = false;

/** Pin header login API root and optional same-origin proxy for browser fetch. */
export function applyShellLoginApiConfig(apiBaseUrl?: string, apiProxyBaseUrl?: string): void {
  const url = apiBaseUrl?.trim();
  if (url) shellLoginApiBaseUrl = url.replace(/\/$/, '');
  const proxy = apiProxyBaseUrl?.trim();
  if (proxy) shellLoginApiProxyBaseUrl = proxy.replace(/\/$/, '');
  clearShellInternalAuthCache();
}

let installed = false;
let timeRemainingHeader = 45;
let responseCount = 0;
let countdownHeader: ReturnType<typeof setInterval> | null = null;
let otpLoginSendInFlight = false;

class LoginApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginApiError';
  }
}

/** Prefer in-package login modals when present (avoids duplicate ids on host pages). */
function loginModalRoot(): ParentNode {
  return document.querySelector('.mb-common-header-login') ?? document;
}

function $(id: string): HTMLElement | null {
  const root = loginModalRoot();
  if (root === document) return document.getElementById(id);
  const escaped = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape(id) : id;
  return root.querySelector(`#${escaped}`);
}

function val(id: string): string {
  return (($(id) as HTMLInputElement | null)?.value ?? '').trim();
}

function setVal(id: string, value: string): void {
  const el = $(id) as HTMLInputElement | null;
  if (el) el.value = value;
}

function setText(id: string, text: string): void {
  const el = $(id);
  if (el) el.textContent = text;
}

function setHtml(id: string, html: string): void {
  const el = $(id);
  if (el) el.innerHTML = html;
}

function isChecked(id: string): boolean {
  return !!(($(id) as HTMLInputElement | null)?.checked);
}

function setChecked(id: string, checked: boolean): void {
  const el = $(id) as HTMLInputElement | null;
  if (el) el.checked = checked;
}

function setDisabled(id: string, disabled: boolean): void {
  const el = $(id) as HTMLButtonElement | HTMLInputElement | null;
  if (el) el.disabled = disabled;
}

function showLoader(): void {
  const el = $('mb-common-header-loader');
  if (el) el.style.display = 'flex';
}

function hideLoader(): void {
  const el = $('mb-common-header-loader');
  if (el) el.style.display = 'none';
}

function validateEmail(email: string): boolean {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function validatePhone(phone: string): boolean {
  return /^[0-9]{10}$/.test(phone);
}

function validatePassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-+=])[A-Za-z\d@$!%*?&#^()\-+=]{8,15}$/.test(password);
}

function storeLoginIdentifier(identifier: string): void {
  try {
    localStorage.setItem(LOGIN_DATA_KEY, identifier);
  } catch {
    /* ignore */
  }
}

function readLoginIdentifier(): string {
  try {
    return localStorage.getItem(LOGIN_DATA_KEY) ?? '';
  } catch {
    return '';
  }
}

function clearLoginStorage(): void {
  try {
    localStorage.removeItem(LOGIN_DATA_KEY);
    localStorage.removeItem('user_id');
  } catch {
    /* ignore */
  }
}

function cookieExists(name: string): boolean {
  return document.cookie.split(';').some((c) => c.trim().startsWith(`${name}=`));
}

function setAuthCookies(token: string, domain: string, encryptId?: string): void {
  const expiry = new Date(Date.now() + 1440 * 60 * 1000).toUTCString();
  if (!cookieExists('token') && !cookieExists('token_essays')) {
    document.cookie = `token=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
    document.cookie = `token_essays=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
  }
  if (encryptId) {
    document.cookie = `encryptId=${encodeURIComponent(encryptId)};expires=${expiry};path=/;domain=${domain};`;
  }
}

function resolveFirebaseTrackingUserId(loginRes?: SignInResponse): string {
  const data = loginRes?.data;
  if (data && typeof data === 'object') {
    for (const key of ['user_id', 'userId', 'ID', 'id']) {
      const value = (data as Record<string, unknown>)[key];
      if (value != null && String(value).trim()) return String(value);
    }
  }

  const userData = (window as Window & { USER_DATA?: { ID?: string | number } }).USER_DATA?.ID;
  if (userData != null && String(userData).trim()) return String(userData);

  const fromShell = window.__MYBHARAT_LOGIN_USER_ID__?.trim();
  if (fromShell) return fromShell;

  return 'unknown';
}

/** Mirrors legacy `setupFirebaseUserAjaxEvents(event, encodeIdentifier(userId))` after login AJAX. */
function tryFirebaseEvent(event: string, loginRes?: SignInResponse): void {
  const setup = window.setupFirebaseUserAjaxEvents;
  if (typeof setup !== 'function') return;

  const rawId = resolveFirebaseTrackingUserId(loginRes);
  const encode = window.encodeIdentifier;
  const trackingId = typeof encode === 'function' ? encode(rawId) : rawId;
  setup(event, trackingId);
}

type SignInResponse = {
  status_code?: number | string;
  message?: string | { given_data?: string; [key: string]: unknown };
  redirect_url?: string;
  controller?: string;
  action?: string;
  token?: string;
  domain?: string;
  encryptId?: string;
  access_token?: string;
  accessToken?: string;
  error?: string;
  error_description?: string;
  reg_code?: string;
  mb_token?: string;
  data?: string | Record<string, unknown> | { access_token?: string; accessToken?: string; [key: string]: unknown };
};

/** Read shell login API base — pinned config only, not the host page's `/api` proxy. */
function readShellLoginApiBaseUrl(): string {
  if (shellLoginApiBaseUrl) return shellLoginApiBaseUrl;

  const fromShellLogin = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (fromShellLogin) return fromShellLogin.replace(/\/$/, '');

  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('api-base-url')
    ?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, '');

  const fromMeta = document
    .querySelector('meta[name="mybharat-shell-api-base-url"]')
    ?.getAttribute('content')
    ?.trim();
  return fromMeta ? fromMeta.replace(/\/$/, '') : '';
}

function readShellLoginApiProxyBaseUrl(): string {
  if (shellLoginApiProxyBaseUrl) return shellLoginApiProxyBaseUrl;

  const fromShell = window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, '');

  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('api-proxy-base-url')
    ?.trim();
  if (fromHeader) return fromHeader.replace(/\/$/, '');

  const fromMeta = document
    .querySelector('meta[name="mybharat-shell-api-proxy-base"]')
    ?.getAttribute('content')
    ?.trim();
  return fromMeta ? fromMeta.replace(/\/$/, '') : '';
}

function resolveApiBaseOrigin(base: string): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const resolved = base.includes('://')
      ? base
      : `${window.location.origin}${base.startsWith('/') ? base : `/${base}`}`;
    return new URL(resolved).origin;
  } catch {
    return undefined;
  }
}

function isCrossOriginApiBase(base: string): boolean {
  if (typeof window === 'undefined' || !base) return false;
  const apiOrigin = resolveApiBaseOrigin(base);
  return !!apiOrigin && apiOrigin !== window.location.origin;
}

/**
 * URL base used for browser fetch — same-origin proxy when apiBaseUrl is cross-origin
 * (keeps Authorization: Bearer POST without CORS OPTIONS preflight).
 */
function readShellLoginFetchBaseUrl(): string {
  const proxy = readShellLoginApiProxyBaseUrl();
  if (proxy) return proxy;

  const direct = readShellLoginApiBaseUrl();
  if (!direct) return '';

  if (!isCrossOriginApiBase(direct)) return direct;

  if (!warnedAutoLoginProxy && typeof console !== 'undefined') {
    warnedAutoLoginProxy = true;
    console.warn(
      `[mybharat header] apiBaseUrl (${direct}) is cross-origin; login fetch uses same-origin proxy ${SHELL_LOGIN_API_PROXY_DEFAULT}. Forward that path to the API on your dev server (see docs).`
    );
  }
  return SHELL_LOGIN_API_PROXY_DEFAULT;
}

/** Sync `<mybharat-header api-base-url>` into shell login config before fetch. */
function syncShellLoginApiConfigFromDom(): void {
  const headerEl = document.querySelector('mybharat-header');
  const apiBaseUrl = headerEl?.getAttribute('api-base-url')?.trim();
  const apiProxyBaseUrl = headerEl?.getAttribute('api-proxy-base-url')?.trim();
  const baseUrl = headerEl?.getAttribute('login-base-url')?.trim();

  if (apiBaseUrl) applyShellLoginApiConfig(apiBaseUrl, apiProxyBaseUrl);

  if (!baseUrl && !apiBaseUrl && !apiProxyBaseUrl) return;

  window.MYBHARAT_SHELL = {
    ...window.MYBHARAT_SHELL,
    login: {
      ...window.MYBHARAT_SHELL?.login,
      ...(baseUrl ? { baseUrl } : {}),
      ...(apiBaseUrl ? { apiBaseUrl } : {}),
      ...(apiProxyBaseUrl ? { apiProxyBaseUrl } : {}),
    },
  };
}

function getLoginApiBaseUrl(): string {
  syncShellLoginApiConfigFromDom();
  return readShellLoginApiBaseUrl();
}

function buildLoginApiUrl(path: string): string {
  const base = readShellLoginFetchBaseUrl();
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** Same-origin or proxy base used for APIGateway fetch from the shell. */
export function getShellApiFetchBaseUrl(): string {
  syncShellLoginApiConfigFromDom();
  return readShellLoginFetchBaseUrl();
}

/** Build APIGateway URL under the shell login/feedback proxy base. */
export function buildShellApiUrl(path: string): string {
  syncShellLoginApiConfigFromDom();
  return buildLoginApiUrl(path);
}

function isSuccessStatus(statusCode?: number | string): boolean {
  if (statusCode == null || statusCode === '') return false;
  const code = typeof statusCode === 'string' ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}

type LoginApiErrorPayload = {
  message?: SignInResponse['message'];
  error?: string;
  error_description?: string;
};

function resolveLoginApiError(
  res?: LoginApiErrorPayload | null,
  fallback = DEFAULT_LOGIN_API_ERROR
): string {
  if (res && typeof res === 'object') {
    if (typeof res.error_description === 'string' && res.error_description.trim()) {
      return res.error_description.trim();
    }
    if (typeof res.error === 'string' && res.error.trim()) {
      return res.error.trim();
    }
  }

  const message = res?.message;
  if (typeof message === 'string' && message.trim()) return message.trim();
  if (message && typeof message === 'object') {
    const obj = message as Record<string, unknown>;
    for (const key of ['message', 'error', 'error_description', 'detail', 'description']) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v.trim();
    }
  }
  return fallback;
}

/** Cake portal origin for legacy `/pages/*` endpoints (e.g. `VITE_BASE_URL`). */
function readShellLoginBaseUrl(): string {
  syncShellLoginApiConfigFromDom();
  const fromShell = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, '');

  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('login-base-url')
    ?.trim();
  return fromHeader ? fromHeader.replace(/\/$/, '') : '';
}

function buildPagesUrl(path: string): string {
  const base = readShellLoginBaseUrl();
  const segment = path.startsWith('/') ? path.slice(1) : path;
  if (base) return `${base}/${segment}`;
  return `/${segment}`;
}

function resolveVerifyOtpError(
  res?: SignInResponse | null,
  fallback = 'Please enter valid OTP.'
): string {
  const data = res?.data;
  if (typeof data === 'string' && data.trim()) return data.trim();
  if (data && typeof data === 'object') {
    const parts: string[] = [];
    for (const value of Object.values(data)) {
      if (typeof value === 'string' && value.trim()) parts.push(value.trim());
      else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'string' && item.trim()) parts.push(item.trim());
        }
      }
    }
    if (parts.length) return parts.join(' ');
  }
  return resolveLoginApiError(res, fallback);
}

function markLoginOtpVerified(): void {
  setText('otp-field-3_error', '');
  setVal('verify_otp_header', '1');
  timeRemainingHeader = 0;
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll('.resend_otp_header').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
  document.querySelectorAll('.otp_timer_header').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
  setDisabled('otp-field-3', true);
  setDisabled('btn-otp-verify-header', true);
}

/** JSON + Bearer — used for /checkUserExists per Keycloak integration spec. */
const LOGIN_API_JSON_CONTENT_TYPE = 'Application/json';

/** Form POST — host internal route (server calls getKeycloakClientAccessToken). */
const LOGIN_API_FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';

function normalizeBearerAccessToken(raw?: string): string {
  if (!raw) return '';
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, '').trim();
  }
  return token;
}

function parseLoginApiResponse<T extends SignInResponse>(res: Response, text: string): T {
  try {
    const parsed = JSON.parse(text) as T;
    if (parsed.status_code == null || parsed.status_code === '') {
      parsed.status_code = res.status;
    }
    return parsed;
  } catch {
    if (!res.ok) throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
    return { status_code: res.status, message: text } as T;
  }
}

/**
 * Simple shell login POST/GET (non-sensitive routes only — use internal auth for KC client / oauth).
 */
async function fetchLoginApi<T extends SignInResponse>(
  path: string,
  options?: {
    method?: 'POST' | 'GET';
    form?: Record<string, string>;
  }
): Promise<T> {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const method = options?.method ?? 'POST';
  const url = buildLoginApiUrl(path);
  const form = options?.form;

  let res: Response;
  try {
    if (method === 'GET') {
      const qs = form ? `?${new URLSearchParams(form).toString()}` : '';
      res = await fetch(`${url}${qs}`, { method: 'GET', credentials: 'omit' });
    } else if (form && Object.keys(form).length > 0) {
      res = await fetch(url, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': LOGIN_API_FORM_CONTENT_TYPE },
        body: new URLSearchParams(form),
      });
    } else {
      res = await fetch(url, { method: 'POST', credentials: 'omit' });
    }
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const text = await res.text();
  return parseLoginApiResponse<T>(res, text);
}

/** POST form-urlencoded with Authorization: Bearer — e.g. /sendMobileGuestUserOtp. */
async function fetchLoginApiFormPost<T extends SignInResponse>(
  path: string,
  form: Record<string, string>,
  bearerAccessToken: string
): Promise<T> {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const token = normalizeBearerAccessToken(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const url = buildLoginApiUrl(path);
  const headers = new Headers();
  headers.set('Content-Type', LOGIN_API_FORM_CONTENT_TYPE);
  headers.set('Authorization', `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'omit',
      headers,
      body: new URLSearchParams(form),
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const text = await res.text();
  return parseLoginApiResponse<T>(res, text);
}

function buildBearerJsonHeaders(bearerAccessToken: string): Headers {
  const headers = new Headers();
  headers.set('Content-Type', LOGIN_API_JSON_CONTENT_TYPE);
  headers.set('Accept', LOGIN_API_JSON_CONTENT_TYPE);
  const token = normalizeBearerAccessToken(bearerAccessToken);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

/** POST JSON with Authorization: Bearer — body must not include access_token. */
async function fetchLoginApiJsonPost<T extends SignInResponse>(
  path: string,
  body: Record<string, unknown>,
  bearerAccessToken: string
): Promise<T> {
  syncShellLoginApiConfigFromDom();
  const base = readShellLoginFetchBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const token = normalizeBearerAccessToken(bearerAccessToken);
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const headers = buildBearerJsonHeaders(token);
  if (!headers.has('Authorization')) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const url = buildLoginApiUrl(path);
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'omit',
      headers,
      body: JSON.stringify(body),
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const text = await res.text();
  return parseLoginApiResponse<T>(res, text);
}

function readAccessTokenField(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const token = normalizeBearerAccessToken(value);
  return token || undefined;
}

function readAccessTokenFromNode(node: unknown, depth = 0): string | undefined {
  if (node == null || depth > 5) return undefined;

  if (typeof node === 'string') {
    const trimmed = node.trim();
    if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return undefined;
    try {
      return readAccessTokenFromNode(JSON.parse(trimmed) as unknown, depth + 1);
    } catch {
      return undefined;
    }
  }

  if (typeof node !== 'object') return undefined;

  const obj = node as Record<string, unknown>;
  const direct =
    readAccessTokenField(obj.access_token) ?? readAccessTokenField(obj.accessToken);
  if (direct) return direct;

  for (const key of ['data', 'message', 'response', 'result']) {
    const nested = readAccessTokenFromNode(obj[key], depth + 1);
    if (nested) return nested;
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') {
      const nested = readAccessTokenFromNode(value, depth + 1);
      if (nested) return nested;
    }
  }

  return undefined;
}

function readAccessTokenFromResponse(data: SignInResponse): string | undefined {
  if (typeof data.error === 'string' && data.error.trim() && !data.access_token) {
    return undefined;
  }

  // Raw Keycloak OAuth response: { access_token, expires_in, token_type, ... }
  const rootToken =
    readAccessTokenField(data.access_token) ?? readAccessTokenField(data.accessToken);
  if (rootToken) return rootToken;

  return (
    readAccessTokenFromNode(data.data) ??
    readAccessTokenFromNode(data.message) ??
    readAccessTokenFromNode(data)
  );
}

function isKeycloakUnauthorizedResponse(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;
  if (obj.status_code === 401 || obj.status_code === '401') return true;
  const err = typeof obj.error === 'string' ? obj.error : '';
  return /401|unauthorized/i.test(err);
}

/** Client access token — server-side internal route only (not exposed in Network tab). */
export async function getKeycloakClientAccessToken(forceRefresh = false): Promise<string> {
  try {
    return await fetchInternalKeycloakClientAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellInternalAuthError) {
      throw new LoginApiError(err.message);
    }
    throw err;
  }
}

/** Guest OTP OAuth token — server-side internal route only (credentials never in browser). */
async function getOauthAccessToken(forceRefresh = false): Promise<string> {
  try {
    return await fetchInternalGuestOauthAccessToken(forceRefresh);
  } catch (err) {
    if (err instanceof ShellInternalAuthError) {
      throw new LoginApiError(err.message);
    }
    throw err;
  }
}

function readShellClientIpAddress(): string {
  return window.MYBHARAT_SHELL?.login?.ipAddress?.trim() ?? '';
}

function readClientUserAgent(): string {
  return typeof navigator !== 'undefined' ? navigator.userAgent : '';
}

const CLIENT_IP_SESSION_KEY = 'mybharat_client_ip_address';
let cachedClientIpAddress: string | null = null;
let clientIpFetchPromise: Promise<string> | null = null;

function readCachedClientIpFromSession(): string {
  try {
    return sessionStorage.getItem(CLIENT_IP_SESSION_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

function storeClientIpCache(ip: string): void {
  cachedClientIpAddress = ip;
  try {
    sessionStorage.setItem(CLIENT_IP_SESSION_KEY, ip);
  } catch {
    // sessionStorage unavailable (private mode, etc.)
  }
}

function parseIpFromJsonResponse(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const obj = data as Record<string, unknown>;
  for (const key of ['ip', 'ipAddress', 'query', 'ip_address']) {
    const value = obj[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

function parseIpFromCloudflareTrace(text: string): string | undefined {
  for (const line of text.split('\n')) {
    if (line.startsWith('ip=')) {
      const ip = line.slice(3).trim();
      if (ip) return ip;
    }
  }
  return undefined;
}

async function fetchClientIpFromPublicApi(): Promise<string> {
  const jsonEndpoints = [
    'https://api.ipify.org?format=json',
    'https://api64.ipify.org?format=json',
  ];

  for (const url of jsonEndpoints) {
    try {
      const res = await fetch(url, { method: 'GET', credentials: 'omit' });
      if (!res.ok) continue;
      const data = (await res.json()) as unknown;
      const ip = parseIpFromJsonResponse(data);
      if (ip) return ip;
    } catch {
      // try next endpoint
    }
  }

  try {
    const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace', {
      method: 'GET',
      credentials: 'omit',
    });
    if (res.ok) {
      const ip = parseIpFromCloudflareTrace(await res.text());
      if (ip) return ip;
    }
  } catch {
    // fall through
  }

  return '';
}

/** Shell config → memory cache → sessionStorage → public IP lookup. */
async function resolveClientIpAddress(): Promise<string> {
  const fromShell = readShellClientIpAddress();
  if (fromShell) return fromShell;

  if (cachedClientIpAddress) return cachedClientIpAddress;

  const fromSession = readCachedClientIpFromSession();
  if (fromSession) {
    cachedClientIpAddress = fromSession;
    return fromSession;
  }

  if (!clientIpFetchPromise) {
    clientIpFetchPromise = fetchClientIpFromPublicApi().finally(() => {
      clientIpFetchPromise = null;
    });
  }

  const ip = await clientIpFetchPromise;
  if (ip) storeClientIpCache(ip);
  return ip;
}

function prefetchClientIpAddress(): void {
  void resolveClientIpAddress();
}

/** POST /checkUserExists — Authorization: Bearer {token}; body `{ identifier }` only. */
async function fetchCheckUserExists(identifier: string, accessToken: string): Promise<KeycloakCheckResponse> {
  return fetchLoginApiJsonPost<KeycloakCheckResponse>('/checkUserExists', { identifier }, accessToken);
}

async function postJson(path: string, data: Record<string, string>): Promise<SignInResponse> {
  const url = buildPagesUrl(path);
  const body = new URLSearchParams(data);
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    return { status_code: 500, message: DEFAULT_LOGIN_API_ERROR };
  }
  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as SignInResponse;
    if (parsed.status_code == null || parsed.status_code === '') {
      parsed.status_code = res.status;
    }
    return parsed;
  } catch {
    return { status_code: res.ok ? 200 : 500, message: text };
  }
}

function handleLoginRedirect(signInJsonObj: SignInResponse): void {
  const fromQuiz = localStorage.getItem('fromQuiz');
  const returnUrl = localStorage.getItem('fromOrg');
  const quizId = localStorage.getItem('quizId');
  const designForBharat = localStorage.getItem('design_for_bharat') === 'true';
  const hackForSocial = localStorage.getItem('hack_for_social_cause') === 'true';
  const baseUrl = window.MYBHARAT_SHELL?.login?.baseUrl ?? '/';

  if (hackForSocial) {
    localStorage.removeItem('hack_for_social_cause');
    window.location.href = `${baseUrl}pages/podcasts`;
    return;
  }
  if (designForBharat) {
    localStorage.removeItem('design_for_bharat');
    window.location.href = `${baseUrl}pages/design_for_bharat`;
    return;
  }
  if (returnUrl && quizId != null) {
    window.location.href = returnUrl;
    return;
  }
  if (fromQuiz && window.location.href.includes('quiz') && quizId != null) {
    hideBootstrapModal('signInModal');
    hideBootstrapModal('loginWithOtpModal');
    hideBootstrapModal('loginWIthOtpVerifyModal');
    window.location.reload();
    return;
  }
  if (signInJsonObj.redirect_url && signInJsonObj.token && signInJsonObj.domain) {
    setAuthCookies(signInJsonObj.token, signInJsonObj.domain, signInJsonObj.encryptId);
    const matches = document.cookie.match(/(?:^|; )essay_redirect_url=([^;]*)/);
    if (matches) {
      document.cookie = 'essay_redirect_url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = decodeURIComponent(matches[1]);
      return;
    }
    const fromGamification = localStorage.getItem('fromGamification');
    if (fromGamification) {
      localStorage.removeItem('fromGamification');
      window.location.href = fromGamification;
      return;
    }
    window.location.href = signInJsonObj.redirect_url;
    return;
  }
  if (signInJsonObj.controller && signInJsonObj.action) {
    window.location.href = `${baseUrl}${signInJsonObj.controller}/${signInJsonObj.action}`;
    return;
  }
  window.location.href = baseUrl;
}

function startTimerHeader(): void {
  document.querySelectorAll('.resend_otp_header').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
  document.querySelectorAll('.otp_timer_header').forEach((el) => {
    (el as HTMLElement).style.display = 'block';
  });
  updateTimerHeader();
  if (countdownHeader) clearInterval(countdownHeader);
  countdownHeader = setInterval(updateTimerHeader, 1000);
}

function updateTimerHeader(): void {
  const label = `Resend OTP in 00:${timeRemainingHeader}`;
  setText('timerHeader', label);
  setText('timerHeaderOtp', label);
  if (timeRemainingHeader > 0) {
    timeRemainingHeader -= 1;
    return;
  }
  if (countdownHeader) clearInterval(countdownHeader);
  document.querySelectorAll('.otp_timer_header').forEach((el) => {
    (el as HTMLElement).style.display = 'none';
  });
  if (val('verified_otp_header') === '1') {
    document.querySelectorAll('.resend_otp_header').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  } else {
    document.querySelectorAll('.resend_otp_header').forEach((el) => {
      (el as HTMLElement).style.display = 'block';
    });
    const alertEl = $('alertDivHeader');
    if (alertEl) alertEl.style.display = 'none';
  }
}

function resetOtpLoginForm(): void {
  setVal('otp_login_header', '');
  setText('otp_login_header_error', '');
  setChecked('consentCheck1', false);
  loginModalQueryAll('.login_otp_header').forEach((el) => {
    (el as HTMLButtonElement).disabled = true;
  });
}

function openLoginWithOtpModalNow(): void {
  if (!document.getElementById('loginWithOtpModal')) return;
  resetOtpLoginForm();
  hideBootstrapModal('mobileMenuNew');
  showBootstrapModal('loginWithOtpModal');
  window.dispatchEvent(new CustomEvent('mb:open-login', { bubbles: true, detail: { mode: 'otp' } }));
}

/** Primary entry — matches header.ctp (`#loginWithOtpModal` first). */
export function openLoginWithOtpModal(): void {
  if (document.getElementById('loginWithOtpModal')) {
    openLoginWithOtpModalNow();
    return;
  }

  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById('loginWithOtpModal')) {
      window.clearInterval(timer);
      openLoginWithOtpModalNow();
      return;
    }
    if (Date.now() - started >= 8000) {
      window.clearInterval(timer);
    }
  }, 50);
}

export function openSignInPasswordModal(): void {
  if (!document.getElementById('signInModal')) return;
  hideBootstrapModal('mobileMenuNew');
  showBootstrapModal('signInModal', { backdrop: 'static', keyboard: false });
  window.dispatchEvent(new CustomEvent('mb:open-login', { bubbles: true, detail: { mode: 'password' } }));
}

function togglePasswordField(inputId: string, toggleId: string): void {
  const input = $(inputId) as HTMLInputElement | null;
  const toggle = $(toggleId);
  if (!input || !toggle) return;
  const icon = toggle.querySelector('i');
  if (input.type === 'password') {
    input.type = 'text';
    icon?.classList.replace('bi-eye-slash', 'bi-eye');
  } else {
    input.type = 'password';
    icon?.classList.replace('bi-eye', 'bi-eye-slash');
  }
}

function loginModalQueryAll(selector: string): NodeListOf<Element> {
  const root = loginModalRoot();
  if (root === document) return document.querySelectorAll(selector);
  return root.querySelectorAll(selector);
}

function validateOtpLoginInput(): void {
  const input = val('otp_login_header');
  const isEmail = validateEmail(input);
  const isMobile = validatePhone(input);
  const consent = isChecked('consentCheck1');
  const err = $('otp_login_header_error');
  const buttons = loginModalQueryAll('.login_otp_header');

  if ((isEmail || isMobile) && consent) {
    if (err) err.style.display = 'none';
    buttons.forEach((b) => {
      (b as HTMLButtonElement).disabled = false;
    });
  } else if (!consent && (isEmail || isMobile)) {
    setText('otp_login_header_error', 'Please check the consent box');
    if (err) err.style.display = 'block';
    buttons.forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });
  } else {
    setText('otp_login_header_error', 'Please enter valid Mobile / Email');
    if (err) err.style.display = 'block';
    buttons.forEach((b) => {
      (b as HTMLButtonElement).disabled = true;
    });
  }
}

function validatePasswordLoginForm(): void {
  const username = val('username');
  const password = val('password');
  const consent = isChecked('consentCheck2');
  const btn = $('signInButton') as HTMLButtonElement | null;
  const err = $('user_mobile_header_error_login');
  if (username && password && consent) {
    setText('user_mobile_header_error_login', '');
    if (err) err.style.display = 'none';
    if (btn) btn.disabled = false;
  } else {
    setText('user_mobile_header_error_login', 'All inputs are mandatory!');
    if (err) err.style.display = 'block';
    if (btn) btn.disabled = true;
  }
}

function buildSendMobileGuestUserOtpForm(
  data: Record<string, string>,
  ipAddress: string
): Record<string, string> {
  const form: Record<string, string> = {
    ip_address: ipAddress,
    user_agent: readClientUserAgent(),
  };

  const phone = data.user_phone?.trim();
  const email = data.user_email?.trim();

  if (phone) {
    form.user_phone = phone;
  } else if (email) {
    form.user_email = email;
  }

  return form;
}

async function sendGuestOtp(data: Record<string, string>): Promise<SignInResponse> {
  const ipAddress = await resolveClientIpAddress();
  if (!ipAddress) {
    return {
      status_code: 400,
      message: 'Unable to detect your IP address. Please try again.',
    };
  }

  const form = buildSendMobileGuestUserOtpForm(data, ipAddress);
  if (!form.user_phone && !form.user_email) {
    return {
      status_code: 400,
      message: 'Please enter valid Mobile / Email',
    };
  }

  try {
    let accessToken = await getOauthAccessToken();
    let res = await fetchLoginApiFormPost<SignInResponse>(
      '/sendMobileGuestUserOtp',
      form,
      accessToken
    );

    if (isKeycloakUnauthorizedResponse(res)) {
      accessToken = await getOauthAccessToken(true);
      res = await fetchLoginApiFormPost<SignInResponse>(
        '/sendMobileGuestUserOtp',
        form,
        accessToken
      );
    }

    return res;
  } catch (err) {
    const message = err instanceof LoginApiError ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}

/** POST verifyGuestUserOtp via encrypted internal route (OTP never in plain network payload). */
async function verifyGuestUserOtp(identifier: string, otp: string): Promise<SignInResponse> {
  try {
    const otpSecret = await encryptLoginSecret(otp);
    const body: Record<string, unknown> = {
      otp_secret: otpSecret,
    };
    if (validateEmail(identifier)) {
      body.user_email = identifier;
      body.user_phone = '';
    } else if (validatePhone(identifier)) {
      body.user_phone = identifier;
      body.user_email = '';
    } else {
      body.user_email = identifier;
      body.user_phone = '';
    }

    return await postInternalAuthJson<SignInResponse>(SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH, body);
  } catch (err) {
    const message = err instanceof Error ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}

type KeycloakCheckResponse = SignInResponse & {
  message?: string | { given_data?: string };
};

function readKeycloakGivenData(message: KeycloakCheckResponse['message']): string | undefined {
  if (message && typeof message === 'object' && 'given_data' in message) {
    return (message as { given_data?: string }).given_data;
  }
  return undefined;
}

async function checkUserInKeycloak(identifier: string): Promise<KeycloakCheckResponse> {
  try {
    let accessToken = await getKeycloakClientAccessToken();
    let check = await fetchCheckUserExists(identifier, accessToken);

    if (isKeycloakUnauthorizedResponse(check)) {
      clearShellInternalKcAuthCache();
      accessToken = await getKeycloakClientAccessToken(true);
      check = await fetchCheckUserExists(identifier, accessToken);
    }

    if (!isSuccessStatus(check.status_code)) {
      return {
        ...check,
        status_code: check.status_code ?? 500,
        message: resolveLoginApiError(check),
      };
    }
    return check;
  } catch (err) {
    const message = err instanceof LoginApiError ? err.message : DEFAULT_LOGIN_API_ERROR;
    return { status_code: 500, message };
  }
}

function buildOtpPayload(identifier: string, givenData?: string): Record<string, string> {
  if (givenData === 'Mobile' || validatePhone(identifier)) {
    setText('mobEmailHeader', 'Mobile Number');
    setText('mobEmailConfirm', 'Mobile Number');
    return { user_phone: identifier };
  }
  setText('mobEmailHeader', 'Email Id');
  setText('mobEmailConfirm', 'Email ID');
  return { user_email: identifier };
}

async function handleForgotPasswordGetOtp(): Promise<void> {
  const identifier = val('user_mobile_header');
  if (!identifier) return;
  storeLoginIdentifier(identifier);
  showLoader();
  setText('user_mobile_header_error', '');
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus(check.status_code)) {
      setText('user_mobile_header_error', resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus(otpRes.status_code)) {
      timeRemainingHeader = 45;
      startTimerHeader();
      setDisabled('user_mobile_header', true);
      document.querySelectorAll('.generate_otp_header').forEach((el) => {
        (el as HTMLButtonElement).disabled = true;
      });
      switchBootstrapModal('forgotPwdModal', 'otpVerifyForgotPwdModal', 200);
      setVal('otp-field-2', '');
      setDisabled('btn-verify-otp-header', false);
    } else {
      setText('user_mobile_header_error', String(otpRes.message ?? 'Failed to send OTP'));
    }
  } finally {
    hideLoader();
  }
}

/** Sync OTP login submit button enabled/disabled state (safe to call from React handlers). */
export function validateOtpLoginForm(): void {
  validateOtpLoginInput();
}

/** Submit OTP login — validates form first; wired from React and document click handlers. */
export function submitOtpLoginFromModal(): void {
  validateOtpLoginInput();
  const btn = loginModalQueryAll('.login_otp_header')[0] as HTMLButtonElement | undefined;
  if (btn?.disabled) return;
  void handleOtpLoginSend();
}

async function handleOtpLoginSend(): Promise<void> {
  if (otpLoginSendInFlight) return;
  const identifier = val('otp_login_header');
  if (!identifier) return;
  otpLoginSendInFlight = true;
  storeLoginIdentifier(identifier);
  showLoader();
  loginModalQueryAll('.login_otp_header').forEach((el) => {
    (el as HTMLButtonElement).disabled = true;
  });
  try {
    const check = await checkUserInKeycloak(identifier);
    if (!isSuccessStatus(check.status_code)) {
      setText('otp_login_header_error', resolveLoginApiError(check));
      return;
    }
    const given = readKeycloakGivenData(check.message);
    const payload = buildOtpPayload(identifier, given);
    const otpRes = await sendGuestOtp(payload);
    if (isSuccessStatus(otpRes.status_code)) {
      timeRemainingHeader = 45;
      startTimerHeader();
      switchBootstrapModal('loginWithOtpModal', 'loginWIthOtpVerifyModal', 200);
      setVal('otp-field-3', '');
      setText('otp-field-3_error', '');
    } else {
      setText('otp_login_header_error', String(otpRes.message ?? 'Please check Mobile / Email you entered!'));
    }
  } finally {
    otpLoginSendInFlight = false;
    hideLoader();
    validateOtpLoginInput();
  }
}

function otpPayloadForStoredIdentifier(): Record<string, string> {
  const identifier = readLoginIdentifier();
  if (validatePhone(identifier)) return { user_phone: identifier };
  if (validateEmail(identifier)) return { user_email: identifier };
  return { user_email: identifier };
}

async function handleResendOtp(): Promise<void> {
  if (timeRemainingHeader > 0) return;
  timeRemainingHeader = 45;
  const payload = otpPayloadForStoredIdentifier();
  const res = await sendGuestOtp(payload);
  if (isSuccessStatus(res.status_code)) {
    startTimerHeader();
    setText('otp-field-2_error', '');
    setText('otp-field-3_error', '');
  }
}

async function handleVerifyForgotOtp(): Promise<void> {
  const identifier = readLoginIdentifier() || val('user_mobile_header');
  const otp = val('otp-field-2');
  if (!otp) {
    setText('otp-field-2_error', 'Please enter OTP');
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    setText('otp-field-2_error', 'Please enter 6 digit OTP');
    return;
  }
  const verify = await verifyGuestUserOtp(identifier, otp);
  if (isSuccessStatus(verify.status_code)) {
    storeRegCodeFromVerifyResponse(verify);
    setText('otp-field-2_error', '');
    setVal('verified_otp_header', '1');
    timeRemainingHeader = 0;
    setDisabled('user_mobile_header', true);
    setDisabled('btn-verify-otp-header', true);
    switchBootstrapModal('otpVerifyForgotPwdModal', 'newPasswordModal', 200);
    setVal('newPwd', '');
    setVal('confirmPwd', '');
    return;
  }
  responseCount += 1;
  if (responseCount >= 5) {
    setHtml('otp-field-2_error', 'You have reached maximum limit to verify OTP. Please try again after sometime.');
    setDisabled('btn-verify-otp-header', true);
  } else {
    setText('otp-field-2_error', 'Please enter valid OTP.');
  }
}

async function handleVerifyLoginOtp(): Promise<void> {
  const userMobile = readLoginIdentifier();
  setVal('otp_login_header', userMobile);
  setDisabled('btn-otp-verify-header', true);
  const otp = val('otp-field-3');
  if (!otp) {
    setText('otp-field-3_error', 'Please enter OTP');
    setDisabled('btn-otp-verify-header', false);
    return;
  }
  if (!/^[0-9]{6}$/.test(otp)) {
    setText('otp-field-3_error', 'Please enter 6 digit OTP');
    setDisabled('btn-otp-verify-header', false);
    return;
  }

  showLoader();
  try {
    const verify = await verifyGuestUserOtp(userMobile, otp);
    if (!isSuccessStatus(verify.status_code)) {
      responseCount += 1;
      if (responseCount >= 5) {
        document.querySelectorAll('.otp_timer_header').forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
        document.querySelectorAll('.resend_otp_header').forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
        loginModalQueryAll('.generate_otp_header').forEach((el) => {
          (el as HTMLButtonElement).disabled = true;
        });
        setHtml(
          'otp-field-3_error',
          'You have reached maximum limit to verify OTP. Please try again after sometime.'
        );
        setDisabled('btn-otp-verify-header', true);
      } else {
        setText('otp-field-3_error', resolveVerifyOtpError(verify));
        setDisabled('btn-otp-verify-header', false);
      }
      return;
    }

    markLoginOtpVerified();

    storeRegCodeFromVerifyResponse(verify);
    const loginRes = await completeLoginWithOtp(userMobile);
    clearLoginStorage();

    if (isLoginOtpRedirectResult(loginRes)) {
      tryFirebaseEvent('user_login_success');
      return;
    }

    if (isSuccessStatus(loginRes.status_code)) {
      const redirectPayload = loginRes as SignInResponse;
      tryFirebaseEvent('user_login_success', redirectPayload);
      handleLoginRedirect(redirectPayload);
      return;
    }

    tryFirebaseEvent('user_login_failure');
    setText('otp-field-3_error', String(loginRes.message ?? 'Login failed'));
    setDisabled('btn-otp-verify-header', false);
  } finally {
    hideLoader();
  }
}

async function handleUpdatePassword(): Promise<void> {
  const identifier = readLoginIdentifier() || val('user_mobile_header');
  const password = val('newPwd');
  const confirmPwd = val('confirmPwd');
  if (!validatePassword(password)) {
    setText('new_pwd_error', 'Please follow the password policy!');
    return;
  }
  if (password !== confirmPwd) {
    setText('new_pwd_error', 'Passwords do not match!');
    return;
  }

  showLoader();
  setText('new_pwd_error', '');
  try {
    const res = await completeForgotPasswordUpdate(identifier, password);
    if (isSuccessStatus(res.status_code)) {
      switchBootstrapModal('newPasswordModal', 'successModal', 200);
      return;
    }
    setText(
      'new_pwd_error',
      typeof res.message === 'string' && res.message.trim()
        ? res.message.trim()
        : DEFAULT_LOGIN_API_ERROR
    );
  } finally {
    hideLoader();
  }
}

async function handlePasswordSignIn(): Promise<void> {
  validatePasswordLoginForm();
  const username = val('username');
  const password = val('password');
  const consent = isChecked('consentCheck2');
  if (!username || !password || !consent) return;

  showLoader();
  try {
    const res = await completePasswordSignIn(username, password);
    clearLoginStorage();

    if (isLoginOtpRedirectResult(res)) {
      tryFirebaseEvent('user_login_success');
      return;
    }

    if (res.status_code === 401 || res.status_code === '401') {
      tryFirebaseEvent('user_login_failure');
      setText('user_mobile_header_error_login', String(res.message ?? 'Login failed'));
      return;
    }

    tryFirebaseEvent('user_login_failure');
    setText('user_mobile_header_error_login', DEFAULT_LOGIN_API_ERROR);
  } finally {
    hideLoader();
  }
}

function onDocumentClick(e: Event): void {
  const target = e.target as Element | null;
  if (!target) return;

  const signInTrigger = target.closest(HEADER_LOGIN_SIGN_IN_SELECTORS);
  if (signInTrigger) {
    e.preventDefault();
    openLoginWithOtpModal();
    return;
  }

  if (target.closest('#forgot_password')) {
    e.preventDefault();
    const username = val('username') || val('otp_login_header');
    if (username) {
      setVal('user_mobile_header', username);
      setDisabled('user_mobile_header', false);
      document.querySelectorAll('.generate_otp_header').forEach((el) => {
        (el as HTMLButtonElement).disabled = !!username;
      });
    }
    switchBootstrapModal('signInModal', 'forgotPwdModal', 0);
    return;
  }

  if (target.closest('#login_with_otp')) {
    e.preventDefault();
    const username = val('username');
    if (username) setVal('otp_login_header', username);
    switchBootstrapModal('signInModal', 'loginWithOtpModal', 0);
    return;
  }

  if (target.closest('#login_with_pwd')) {
    e.preventDefault();
    const otpVal = val('otp_login_header');
    if (otpVal) setVal('username', otpVal);
    setChecked('consentCheck2', false);
    switchBootstrapModal('loginWithOtpModal', 'signInModal', 0);
    return;
  }

  if (target.closest('#backToSignInModal')) {
    e.preventDefault();
    const mobile = val('user_mobile_header');
    if (mobile) {
      setVal('username', mobile);
      validatePasswordLoginForm();
    }
    switchBootstrapModal('forgotPwdModal', 'signInModal', 0);
    return;
  }

  if (target.closest('#backToSignInModal2')) {
    e.preventDefault();
    switchBootstrapModal('loginWithOtpModal', 'signInModal', 0);
    return;
  }

  if (target.closest('#backTologinWithOtpModal')) {
    e.preventDefault();
    setChecked('consentCheck1', false);
    switchBootstrapModal('loginWIthOtpVerifyModal', 'loginWithOtpModal', 0);
    return;
  }

  if (target.closest('#backToForgotPwdModal')) {
    e.preventDefault();
    setDisabled('user_mobile_header', false);
    document.querySelectorAll('.generate_otp_header').forEach((el) => {
      (el as HTMLButtonElement).disabled = false;
    });
    switchBootstrapModal('otpVerifyForgotPwdModal', 'forgotPwdModal', 0);
    return;
  }

  if (target.closest('#backToOtpVerifyForgotPwdModal')) {
    e.preventDefault();
    setVal('otp-field-2', '');
    setDisabled('btn-verify-otp-header', false);
    switchBootstrapModal('newPasswordModal', 'otpVerifyForgotPwdModal', 0);
    return;
  }

  if (target.closest('#backToNewPwdModal')) {
    e.preventDefault();
    switchBootstrapModal('successModal', 'newPasswordModal', 0);
    return;
  }

  if (target.closest('.generate_otp_header')) {
    e.preventDefault();
    void handleForgotPasswordGetOtp();
    return;
  }

  if (target.closest('.login_otp_header')) {
    e.preventDefault();
    // React portaled modals attach onClick; skip capture listener to avoid double submit.
    if (target.closest('.mb-common-header-login')) return;
    submitOtpLoginFromModal();
    return;
  }

  if (target.closest('#signInButton')) {
    e.preventDefault();
    void handlePasswordSignIn();
    return;
  }

  if (target.closest('#togglePassword')) {
    e.preventDefault();
    togglePasswordField('password', 'togglePassword');
    return;
  }

  if (target.closest('#toggleNewPwd')) {
    e.preventDefault();
    togglePasswordField('newPwd', 'toggleNewPwd');
    return;
  }

  if (target.closest('#toggleConfirmPwd')) {
    e.preventDefault();
    togglePasswordField('confirmPwd', 'toggleConfirmPwd');
    return;
  }

  if (target.closest('#btn-verify-otp-header')) {
    e.preventDefault();
    void handleVerifyForgotOtp();
    return;
  }

  if (target.closest('#btn-otp-verify-header')) {
    e.preventDefault();
    void handleVerifyLoginOtp();
    return;
  }

  if (target.closest('#updatePwdButton')) {
    e.preventDefault();
    void handleUpdatePassword();
    return;
  }

  if (target.closest('#resendOTPHeader') || target.closest('#resendOTPVerifyHeader')) {
    e.preventDefault();
    void handleResendOtp();
    return;
  }

  if (target.closest('#loginNowButton')) {
    e.preventDefault();
    hideBootstrapModal('successModal');
    window.location.href = window.MYBHARAT_SHELL?.login?.baseUrl ?? '/';
    return;
  }

  if (target.closest('#close-signIn')) {
    localStorage.removeItem('fromQuiz');
    localStorage.removeItem('quizId');
    localStorage.removeItem('loginData');
    localStorage.removeItem('design_for_bharat');
    localStorage.removeItem('hack_for_social_cause');
    return;
  }

  if (target.closest('#close-otpLogin')) {
    setVal('otp_login_header', '');
    localStorage.removeItem('fromQuiz');
    localStorage.removeItem('quizId');
    localStorage.removeItem('loginData');
    localStorage.removeItem('design_for_bharat');
    localStorage.removeItem('hack_for_social_cause');
    loginModalQueryAll('.login_otp_header').forEach((el) => {
      (el as HTMLButtonElement).disabled = true;
    });
  }
}

function onDocumentInput(e: Event): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;
  if (target.id === 'otp_login_header' || target.id === 'consentCheck1') {
    validateOtpLoginInput();
  }
  if (target.id === 'username' || target.id === 'password' || target.id === 'consentCheck2') {
    validatePasswordLoginForm();
  }
  if (target.id === 'user_mobile_header') {
    document.querySelectorAll('.generate_otp_header').forEach((el) => {
      (el as HTMLButtonElement).disabled = !val('user_mobile_header');
    });
  }
  if (target.id === 'newPwd' || target.id === 'confirmPwd') {
    const password = val('newPwd');
    const confirmPassword = val('confirmPwd');
    const help = $('confirmPwdHelpBlock');
    if (!validatePassword(password)) {
      $('newPwd')?.classList.add('is-invalid');
    } else {
      $('newPwd')?.classList.remove('is-invalid');
    }
    if (password !== confirmPassword) {
      $('confirmPwd')?.classList.add('is-invalid');
      if (help) help.style.display = 'block';
    } else {
      $('confirmPwd')?.classList.remove('is-invalid');
      if (help) help.style.display = 'none';
    }
  }
}

function onDocumentKeyPress(e: KeyboardEvent): void {
  const target = e.target as HTMLElement | null;
  if (target?.classList.contains('otp-field')) {
    if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
  }
}

/** Wire global Sign In triggers + modal interactions (idempotent). */
export function installHeaderLoginFlow(): () => void {
  if (installed) return () => undefined;
  installed = true;

  syncShellLoginApiConfigFromDom();
  applyShellLoginApiConfig(
    window.MYBHARAT_SHELL?.login?.apiBaseUrl,
    window.MYBHARAT_SHELL?.login?.apiProxyBaseUrl
  );
  prefetchClientIpAddress();

  document.addEventListener('click', onDocumentClick, true);
  document.addEventListener('input', onDocumentInput, true);
  document.addEventListener('change', onDocumentInput, true);
  document.addEventListener('keypress', onDocumentKeyPress, true);

  if (window.location.hash === '#login') {
    window.setTimeout(openLoginWithOtpModal, 0);
  }

  const w = window as unknown as {
    MyBharatShell?: { openLoginModal?: (mode?: 'otp' | 'password') => void };
  };
  w.MyBharatShell = w.MyBharatShell ?? {};
  w.MyBharatShell.openLoginModal = (mode = 'otp') => {
    if (mode === 'password') openSignInPasswordModal();
    else openLoginWithOtpModal();
  };

  return () => {
    installed = false;
    document.removeEventListener('click', onDocumentClick, true);
    document.removeEventListener('input', onDocumentInput, true);
    document.removeEventListener('change', onDocumentInput, true);
    document.removeEventListener('keypress', onDocumentKeyPress, true);
  };
}

/** Skip package modals when host already rendered login modals outside our portal. */
export function hostHasLoginModals(): boolean {
  const el = document.getElementById('loginWithOtpModal');
  return !!el && !el.closest('.mb-common-header-login');
}

export {
  readLoginIdentifier,
  storeLoginIdentifier,
  validateEmail,
  validatePhone,
  validatePassword,
  DEFAULT_LOGIN_API_ERROR,
};
