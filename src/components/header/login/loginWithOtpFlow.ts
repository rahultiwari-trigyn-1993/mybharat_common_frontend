/**
 * Post-OTP-verify login pipeline — replaces legacy `PagesController::loginWithOtp`.
 * Builds after_login JSON and browser-POSTs to CakePHP `establishSession` for PHP session hydration.
 */

import { encryptLoginSecret } from './shellLoginSecretPayload';
import {
  fetchInternalKeycloakClientAccessToken,
  postInternalAuthJson,
  SHELL_INTERNAL_CHANGE_PASSWORD_PATH,
  SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH,
} from './shellLoginInternalAuth';

const DEFAULT_ERROR = 'Something went wrong!!! Plz try again later.';
const REG_CODE_STORAGE_KEY = 'mybharat_reg_code';

export type LoginOtpApiResponse = {
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

export type AfterLoginPayload = {
  status_code: 200;
  data: {
    dl_id_detail: Record<string, unknown>;
    User: Record<string, unknown>;
  };
};

export type EstablishSessionRequest = {
  auth_output: AfterLoginPayload;
  loginby: 'email' | 'mobile' | '';
  username: string;
  org_id?: number | string;
  org_name?: string;
  token: string;
  encryptId?: string;
  after_login_route: { controller: string; action: string };
  /** Mirrors PHP Session writes where React cannot call those helpers yet. */
  session_hints?: {
    cvbuilder?: boolean;
    nyf_status?: boolean;
    org_activity_list?: unknown[];
  };
};

export type LoginOtpSuccessResponse = LoginOtpApiResponse & {
  status_code: 200;
  token: string;
  encryptId?: string;
  redirect_url?: string;
  domain?: string;
  controller?: string;
  action?: string;
  org_name?: string;
};

export type LoginOtpRedirectResult = { redirecting: true };

export function isLoginOtpRedirectResult(
  res: LoginOtpApiResponse | LoginOtpSuccessResponse | LoginOtpRedirectResult
): res is LoginOtpRedirectResult {
  return 'redirecting' in res && res.redirecting === true;
}

function isSuccessStatus(statusCode?: number | string): boolean {
  if (statusCode == null || statusCode === '') return false;
  const code = typeof statusCode === 'string' ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}

function readLoginFetchBase(): string {
  const shell = window.MYBHARAT_SHELL?.login;
  const proxy = shell?.apiProxyBaseUrl?.trim().replace(/\/$/, '');
  if (proxy) return proxy;

  const direct =
    shell?.apiBaseUrl?.trim().replace(/\/$/, '') ||
    document.querySelector('mybharat-header')?.getAttribute('api-base-url')?.trim().replace(/\/$/, '') ||
    '';
  if (!direct) return '';

  try {
    const origin = direct.includes('://')
      ? new URL(direct).origin
      : window.location.origin;
    if (origin !== window.location.origin) return '/mybharat-shell-api';
  } catch {
    /* ignore */
  }
  return direct;
}

function apiUrl(path: string): string {
  const base = readLoginFetchBase();
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

function readPagesBaseUrl(): string {
  const fromShell = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (fromShell) return fromShell.replace(/\/$/, '');
  const fromHeader = document
    .querySelector('mybharat-header')
    ?.getAttribute('login-base-url')
    ?.trim();
  return fromHeader ? fromHeader.replace(/\/$/, '') : '';
}

function pagesUrl(path: string): string {
  const base = readPagesBaseUrl();
  const segment = path.startsWith('/') ? path.slice(1) : path;
  if (base) return `${base}/${segment}`;
  return `/${segment}`;
}

function readCookieDomain(): string {
  const configured = window.MYBHARAT_SHELL?.login?.cookieDomain?.trim();
  if (configured) return configured;
  return window.location.hostname;
}

function readYouthProfileRedirectUrl(): string {
  const configured = window.MYBHARAT_SHELL?.login?.youthProfileUrl?.trim();
  if (configured) return configured;
  const base = readPagesBaseUrl();
  if (base) return `${base}/youth-profile`;
  return '/youth-profile';
}

function readSessionEstablishPath(): string {
  return (
    window.MYBHARAT_SHELL?.login?.sessionEstablishPath?.trim() ||
    '/reports/establishSession'
  );
}

async function parseJsonResponse<T extends LoginOtpApiResponse>(res: Response, text: string): Promise<T> {
  try {
    const parsed = JSON.parse(text) as T | unknown[];
    if (Array.isArray(parsed)) {
      return {
        status_code: res.status,
        data: parsed,
      } as T;
    }
    const obj = parsed as T;
    if (obj.status_code == null || obj.status_code === '') {
      obj.status_code = res.status;
    }
    return obj;
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: text } as T;
  }
}

async function postGatewayJson<T extends LoginOtpApiResponse>(
  path: string,
  body: Record<string, unknown>,
  bearerToken?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'Application/json',
    Accept: 'Application/json',
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken.replace(/^bearer\s+/i, '').trim()}`;
  }

  let res: Response;
  try {
    res = await fetch(apiUrl(path), {
      method: 'POST',
      credentials: 'omit',
      headers,
      body: JSON.stringify(body),
    });
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR } as T;
  }
  return parseJsonResponse<T>(res, await res.text());
}

async function postGatewayEmpty<T extends LoginOtpApiResponse>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(apiUrl(path), { method: 'POST', credentials: 'omit' });
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR } as T;
  }
  return parseJsonResponse<T>(res, await res.text());
}

function readField(obj: unknown, ...keys: string[]): unknown {
  if (!obj || typeof obj !== 'object') return undefined;
  const record = obj as Record<string, unknown>;
  for (const key of keys) {
    if (record[key] != null && record[key] !== '') return record[key];
  }
  return undefined;
}

function readString(obj: unknown, ...keys: string[]): string {
  const value = readField(obj, ...keys);
  return value != null ? String(value) : '';
}

function unwrapDataNode(response: LoginOtpApiResponse): Record<string, unknown> {
  const data = response.data;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }
  return {};
}

export function storeRegCodeFromVerifyResponse(verify: LoginOtpApiResponse): void {
  const regCode = verify.reg_code?.trim();
  if (!regCode) return;
  try {
    sessionStorage.setItem(REG_CODE_STORAGE_KEY, regCode);
  } catch {
    /* ignore */
  }
}

export function readStoredRegCode(): string {
  try {
    return sessionStorage.getItem(REG_CODE_STORAGE_KEY)?.trim() ?? '';
  } catch {
    return '';
  }
}

export function clearStoredRegCode(): void {
  try {
    sessionStorage.removeItem(REG_CODE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function detectLoginBy(identifier: string): 'email' | 'mobile' | '' {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(identifier)) return 'email';
  if (/^[6-9]\d{9}$/.test(identifier)) return 'mobile';
  return '';
}

export function decodeJwtPayload(accessToken: string): Record<string, unknown> | null {
  try {
    const parts = accessToken.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function formatCreatedTimestamp(raw: unknown): string {
  if (raw == null || raw === '') return '';
  const numeric = typeof raw === 'string' ? Number(raw) : raw;
  const date =
    typeof numeric === 'number' && !Number.isNaN(numeric)
      ? new Date(numeric > 1e12 ? numeric : numeric * 1000)
      : new Date(String(raw));
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function buildDlIdDetail(
  profile: Record<string, unknown>,
  mbToken: string,
  jwt: Record<string, unknown> | null
): Record<string, unknown> {
  const dlId = readString(profile, 'dl_id', 'dlId') || readString(jwt, 'dl_id', 'dlId');
  const kcId = readString(profile, 'kc_id', 'kcId') || readString(jwt, 'sub');
  const username =
    readString(profile, 'username', 'preferred_username') ||
    readString(jwt, 'preferred_username', 'username');

  return {
    dl_id: dlId,
    kc_id: kcId,
    dlId,
    kcId,
    username,
    first_name: readString(profile, 'first_name', 'firstName'),
    middle_name: readString(profile, 'middle_name', 'middleName'),
    last_name: readString(profile, 'last_name', 'lastName'),
    full_name: readString(profile, 'screen_name', 'full_name', 'fullName'),
    email: readString(profile, 'user_email', 'email'),
    mobile: readString(profile, 'user_phone', 'mobile'),
    dob: readString(profile, 'dob', 'date_of_birth'),
    address: readString(profile, 'address', 'address1'),
    gender: readString(profile, 'gender'),
    state_id: readString(profile, 'state_id', 'stateId'),
    district_id: readString(profile, 'city_id', 'district_id', 'districtId'),
    country_id: readString(profile, 'country_id', 'countryId'),
    is_outside_india: readString(profile, 'is_outside_india', 'isOutsideIndia'),
    pincode: readString(profile, 'zip', 'pincode'),
    access_token: mbToken,
    demographic_status: readString(profile, 'demographic_status', 'demographicStatus'),
    address2: readString(profile, 'address2'),
    caste_category: readString(profile, 'caste_category', 'casteCategory'),
    pwd_status: readString(profile, 'pwd_status', 'pwdStatus'),
    pwd_type: readString(profile, 'pwd_type', 'pwdType'),
    pwd_other_text: readString(profile, 'pwd_other_text', 'pwdOtherText'),
  };
}

function buildUserRecord(
  profile: Record<string, unknown>,
  dlIdDetail: Record<string, unknown>,
  mbToken: string
): Record<string, unknown> {
  const fullName = readString(profile, 'screen_name', 'full_name', 'FullName');
  const orgName = readString(profile, 'org_name', 'Org_name', 'organization_name');

  return {
    ID: readString(profile, 'id', 'ID', 'user_id'),
    Name: fullName || readString(dlIdDetail, 'full_name', 'username'),
    User_email: readString(profile, 'user_email', 'email'),
    Ministry: readString(profile, 'ministry', 'Ministry'),
    UserType: readString(profile, 'user_type', 'UserType') || '6',
    Yuva_type: readString(profile, 'yuva_type', 'Yuva_type'),
    created: formatCreatedTimestamp(readField(profile, 'created', 'created_at')),
    email_verification: readString(profile, 'email_verification'),
    user_verification: readString(profile, 'user_verification'),
    mmmd_reg_status: readString(profile, 'mmmd_reg_status'),
    city_id: readString(profile, 'city_id', 'district_id'),
    state_id: readString(profile, 'state_id'),
    tmp_state_name: readString(profile, 'tmp_state_name'),
    tmp_city_name: readString(profile, 'tmp_city_name'),
    institution_id: readString(profile, 'institution_id'),
    register_as: readString(profile, 'register_as'),
    user_status: readString(profile, 'user_status'),
    user_phone: readString(profile, 'user_phone', 'mobile'),
    auth_mode: readString(profile, 'auth_mode') || 'otp',
    dl_id: readString(dlIdDetail, 'dl_id'),
    kc_id: readString(dlIdDetail, 'kc_id'),
    dlId: readString(dlIdDetail, 'dlId'),
    kcId: readString(dlIdDetail, 'kcId'),
    username: readString(dlIdDetail, 'username'),
    FullName: fullName,
    Department: readString(profile, 'department', 'Department'),
    ProfilePic: readString(profile, 'profile_pic', 'ProfilePic'),
    otp_verfication: readString(profile, 'otp_verfication') || '1',
    Gender: readString(profile, 'gender', 'Gender'),
    DOB: readString(profile, 'dob', 'DOB'),
    access_token: mbToken,
    org_name: orgName,
    Org_name: orgName,
    Org_type: readString(profile, 'org_type', 'Org_type'),
    demographic_status: readString(profile, 'demographic_status'),
    isMentor: readString(profile, 'is_mentor', 'isMentor'),
  };
}

function isTruthyFlag(value: unknown): boolean {
  return value === 1 || value === '1' || value === true || value === 'true';
}

function readNfyStatus(profile: Record<string, unknown>, user: Record<string, unknown>): boolean {
  const raw =
    readField(profile, 'nyf_status', 'nyf', 'nfyStatus') ?? readField(user, 'nyf', 'nyf_status');
  return isTruthyFlag(raw);
}

function readCvBuilderFlag(profile: Record<string, unknown>, user: Record<string, unknown>): boolean {
  const raw =
    readField(profile, 'cvbuilder', 'cv_builder', 'cvBuilder') ?? readField(user, 'cvbuilder');
  return isTruthyFlag(raw);
}

/** Matches legacy `after_login` UserType redirect switch in PagesController. */
function resolveAfterLoginRoute(
  userType: string,
  profile: Record<string, unknown>,
  user: Record<string, unknown>
): { controller: string; action: string } {
  const type = userType.trim();

  if (type === '9' || type === '14') {
    return { controller: 'pages', action: 'organizational_dashboard' };
  }
  if (type === '17') {
    return { controller: 'pages', action: 'mybharat_state_dashboard' };
  }
  if (type === '11') {
    return { controller: 'pages', action: 'msmeverifier' };
  }
  if (type === '10') {
    return { controller: 'pages', action: 'dyo_dashboard' };
  }
  if (type === '1' || type === '13' || type === '15' || type === '50' || type === '102') {
    return { controller: 'pages', action: 'admin_dashboard' };
  }
  if (type === '6') {
    if (readCvBuilderFlag(profile, user)) {
      return { controller: 'pages', action: 'cvbuilder' };
    }
    return { controller: 'Reports', action: 'public_profile' };
  }
  if (type === '51') {
    if (readNfyStatus(profile, user)) {
      return { controller: 'pages', action: 'nyf_dashboard' };
    }
    return { controller: 'pages', action: 'organizational_dashboard' };
  }
  if (type === '18') {
    return { controller: 'pages', action: 'organizational_dashboard' };
  }
  return { controller: 'pages', action: 'dashboard' };
}

function buildSessionHints(
  userType: string,
  profile: Record<string, unknown>,
  user: Record<string, unknown>
): EstablishSessionRequest['session_hints'] | undefined {
  const type = userType.trim();
  const hints: NonNullable<EstablishSessionRequest['session_hints']> = {};

  if (type === '6') {
    hints.cvbuilder = readCvBuilderFlag(profile, user);
  }
  if (type === '18' || type === '51') {
    hints.nyf_status = readNfyStatus(profile, user);
  }
  if (type === '51') {
    hints.org_activity_list = [];
  }

  return Object.keys(hints).length > 0 ? hints : undefined;
}

async function fetchClientAccessToken(): Promise<string> {
  return fetchInternalKeycloakClientAccessToken();
}

async function fetchGetUserId(dlId: string): Promise<string> {
  const base = window.MYBHARAT_SHELL?.login?.publicProfileApiBaseUrl?.trim();
  if (!base || !dlId) return '';

  const url = `${base.replace(/\/$/, '')}/getUserId`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ dl_id: dlId }),
    });
  } catch {
    return '';
  }

  const parsed = await parseJsonResponse<LoginOtpApiResponse>(res, await res.text());
  if (!isSuccessStatus(parsed.status_code)) return '';
  const data = unwrapDataNode(parsed);
  return readString(data, 'id', 'ID', 'user_id');
}

function cookieExists(name: string): boolean {
  return document.cookie.split(';').some((c) => c.trim().startsWith(`${name}=`));
}

function setLoginAuthCookies(token: string, domain: string, encryptId?: string): void {
  const expiry = new Date(Date.now() + 1440 * 60 * 1000).toUTCString();
  if (!cookieExists('token') && !cookieExists('token_essays')) {
    document.cookie = `token=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
    document.cookie = `token_essays=${encodeURIComponent(token)};expires=${expiry};path=/;domain=${domain};`;
  }
  if (encryptId) {
    document.cookie = `encryptId=${encodeURIComponent(encryptId)};expires=${expiry};path=/;domain=${domain};`;
  }
}

/** Full-page form POST navigation — not fetch/AJAX. */
function redirectToEstablishSession(body: EstablishSessionRequest): void {
  const url = pagesUrl(readSessionEstablishPath());
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.style.display = 'none';
  form.acceptCharset = 'UTF-8';

  const payloadInput = document.createElement('input');
  payloadInput.type = 'hidden';
  payloadInput.name = 'payload';
  payloadInput.value = JSON.stringify(body);
  form.appendChild(payloadInput);

  const authOutputInput = document.createElement('input');
  authOutputInput.type = 'hidden';
  authOutputInput.name = 'auth_output';
  authOutputInput.value = JSON.stringify(body.auth_output);
  form.appendChild(authOutputInput);

  const scalarFields: Array<[string, string | undefined]> = [
    ['loginby', body.loginby],
    ['username', body.username],
    ['token', body.token],
    ['encryptId', body.encryptId],
    ['org_id', body.org_id != null ? String(body.org_id) : undefined],
    ['org_name', body.org_name],
    ['controller', body.after_login_route.controller],
    ['action', body.after_login_route.action],
    ['session_hints', body.session_hints ? JSON.stringify(body.session_hints) : undefined],
  ];

  for (const [name, value] of scalarFields) {
    if (value == null || value === '') continue;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}

function resolveGatewayError(
  res?: LoginOtpApiResponse | null,
  fallback = DEFAULT_ERROR
): string {
  if (typeof res?.error_description === 'string' && res.error_description.trim()) {
    return res.error_description.trim();
  }
  if (typeof res?.message === 'string' && res.message.trim()) return res.message.trim();
  return fallback;
}

function readNestedRecord(obj: unknown, ...path: string[]): Record<string, unknown> {
  let current: unknown = obj;
  for (const key of path) {
    if (!current || typeof current !== 'object') return {};
    current = (current as Record<string, unknown>)[key];
  }
  return current && typeof current === 'object' && !Array.isArray(current)
    ? (current as Record<string, unknown>)
    : {};
}

/** Matches PHP `$auth_output['keycloak']` from keycloakLogin / exchange responses. */
function readKeycloakNode(res: LoginOtpApiResponse): Record<string, unknown> {
  const data = unwrapDataNode(res);
  const authOutput = readField(res, 'auth_output');
  const authOutputRecord =
    authOutput && typeof authOutput === 'object' && !Array.isArray(authOutput)
      ? (authOutput as Record<string, unknown>)
      : {};

  const candidates = [
    readNestedRecord(res, 'keycloak'),
    readNestedRecord(data, 'keycloak'),
    readNestedRecord(authOutputRecord, 'keycloak'),
  ];

  for (const node of candidates) {
    if (readString(node, 'access_token', 'accessToken')) return node;
  }
  return candidates.find((node) => Object.keys(node).length > 0) ?? {};
}

function readLoginTokens(res: LoginOtpApiResponse): { accessToken: string; mbToken: string } {
  const data = unwrapDataNode(res);
  const keycloak = readKeycloakNode(res);

  // PHP signIn: $kc_access_token = $auth_output['keycloak']['access_token']
  const accessToken =
    readString(keycloak, 'access_token', 'accessToken') ||
    readString(res, 'access_token', 'accessToken') ||
    readString(data, 'access_token', 'accessToken');

  const mbToken =
    readString(res, 'mb_token', 'mbToken', 'token') ||
    readString(data, 'mb_token', 'mbToken', 'token') ||
    readString(keycloak, 'mb_token', 'mbToken') ||
    accessToken;

  return { accessToken, mbToken };
}

async function finalizeEstablishSession(
  username: string,
  mbToken: string,
  accessToken: string,
  orgLogin: LoginOtpApiResponse,
  options?: { clearRegCode?: boolean }
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  if (!isSuccessStatus(orgLogin.status_code)) {
    return {
      status_code: orgLogin.status_code ?? 500,
      message:
        typeof orgLogin.message === 'string'
          ? orgLogin.message
          : 'Unable to load user profile. Please try again.',
    };
  }

  const profile = unwrapDataNode(orgLogin);
  if (Object.keys(profile).length === 0) {
    return { status_code: 500, message: 'User profile is empty. Please try again.' };
  }

  const jwt = decodeJwtPayload(accessToken);
  const dlId = readString(jwt, 'dl_id', 'dlId');
  const dlIdDetail = buildDlIdDetail(profile, mbToken, jwt);
  const User = buildUserRecord(profile, dlIdDetail, mbToken);
  const loginby = detectLoginBy(username);

  if (!readString(User, 'ID') && dlId) {
    const userId = await fetchGetUserId(dlId);
    if (userId) User.ID = userId;
  }

  const userType = readString(User, 'UserType') || '6';
  const afterLoginRoute = resolveAfterLoginRoute(userType, profile, User);
  const sessionHints = buildSessionHints(userType, profile, User);
  const orgName = readString(User, 'org_name', 'Org_name');
  const orgId = readString(profile, 'org_id', 'organization_id', 'orgId');
  const encryptId = readString(profile, 'encryptId', 'encrypt_id');

  if (encryptId) {
    User.encryptId = encryptId;
  }

  const authOutput: AfterLoginPayload = {
    status_code: 200,
    data: { dl_id_detail: dlIdDetail, User },
  };

  const establishPayload: EstablishSessionRequest = {
    auth_output: authOutput,
    loginby,
    username,
    org_name: orgName || undefined,
    org_id: orgId || undefined,
    token: mbToken,
    encryptId: encryptId || undefined,
    after_login_route: afterLoginRoute,
    session_hints: sessionHints,
  };

  if (options?.clearRegCode) {
    clearStoredRegCode();
  }

  setLoginAuthCookies(accessToken, readCookieDomain(), encryptId || undefined);
  redirectToEstablishSession(establishPayload);
  return { redirecting: true };
}

async function runLoginAfterAccessToken(
  username: string,
  mbToken: string,
  accessToken: string,
  clientToken: string,
  options?: { clearRegCode?: boolean }
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  const jwt = decodeJwtPayload(accessToken);
  const dlId = readString(jwt, 'dl_id', 'dlId');
  if (!dlId) {
    return { status_code: 500, message: 'Unable to resolve user profile. Please try again.' };
  }

  const resolvedUsername =
    username.trim() || readString(jwt, 'preferred_username', 'username') || username;

  const orgLogin = await postGatewayJson<LoginOtpApiResponse>(
    '/userOrgAccessLogin',
    { dl_id: dlId },
    clientToken
  );

  return finalizeEstablishSession(resolvedUsername, mbToken, accessToken, orgLogin, options);
}

function resolveExchangeError(res: LoginOtpApiResponse): string {
  return resolveGatewayError(res, DEFAULT_ERROR);
}

/**
 * Full loginWithOtp replacement — call after successful verifyGuestUserOtp.
 * Requires reg_code from verify response (stored via storeRegCodeFromVerifyResponse).
 */
export async function completeLoginWithOtp(
  username: string
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: 'Something went wrong! Please try again.' };
  }

  let clientToken: string;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  const exchange = await postGatewayJson<LoginOtpApiResponse>(
    '/keycloakGetExchangeToken',
    { username, reg_code: regCode },
    clientToken
  );

  if (!isSuccessStatus(exchange.status_code)) {
    return {
      status_code: exchange.status_code ?? 401,
      message: resolveExchangeError(exchange),
    };
  }

  const { accessToken, mbToken } = readLoginTokens(exchange);
  if (!accessToken || !mbToken) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  return runLoginAfterAccessToken(username, mbToken, accessToken, clientToken, {
    clearRegCode: true,
  });
}

/**
 * Password sign-in — replaces legacy `pages/signIn`.
 * Flow: keycloakLogin → userOrgAccessLogin → establishSession (shared with OTP login).
 */
export async function completePasswordSignIn(
  username: string,
  password: string
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  let clientToken: string;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  let loginRes: LoginOtpApiResponse;
  try {
    loginRes = await postInternalAuthJson<LoginOtpApiResponse>(
      SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH,
      {
        username,
        password_secret: await encryptLoginSecret(password),
      }
    );
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  const statusCode = loginRes.status_code;
  if (statusCode === 401 || statusCode === '401') {
    return { status_code: 401, message: resolveGatewayError(loginRes, 'Login failed') };
  }

  const { accessToken, mbToken } = readLoginTokens(loginRes);
  if (!accessToken || !mbToken) {
    return {
      status_code: statusCode ?? 500,
      message: resolveGatewayError(loginRes, DEFAULT_ERROR),
    };
  }

  return runLoginAfterAccessToken(username, mbToken, accessToken, clientToken);
}

function readAttributeString(attributes: unknown, ...keys: string[]): string {
  if (!attributes || typeof attributes !== 'object') return '';
  const record = attributes as Record<string, unknown>;
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value) && value.length > 0) {
      const first = value[0];
      if (first != null && String(first).trim()) return String(first).trim();
    }
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

type KeycloakForgotPasswordUser = {
  id?: string;
  attributes?: Record<string, unknown>;
};

function readKeycloakForgotPasswordUser(node: unknown): KeycloakForgotPasswordUser | null {
  if (Array.isArray(node)) {
    for (const item of node) {
      const user = readKeycloakForgotPasswordUser(item);
      if (user?.id) return user;
    }
    return null;
  }

  if (!node || typeof node !== 'object') return null;

  const obj = node as Record<string, unknown>;
  if (typeof obj.id === 'string' && obj.id.trim()) {
    return obj as KeycloakForgotPasswordUser;
  }

  for (const key of ['data', 'message', 'response', 'result', 'user']) {
    const nested = readKeycloakForgotPasswordUser(obj[key]);
    if (nested?.id) return nested;
  }

  return null;
}

function isForgotPasswordGatewaySuccess(response: unknown): boolean {
  if (Array.isArray(response) && response.length > 0) return true;
  if (response && typeof response === 'object') {
    return isSuccessStatus((response as LoginOtpApiResponse).status_code);
  }
  return false;
}

/** APIGateway keycloakChangePassword often returns `{ message: "Password changed successfully" }` without status_code. */
function isKeycloakChangePasswordSuccess(res: LoginOtpApiResponse): boolean {
  if (isSuccessStatus(res.status_code)) return true;
  if (res.status_code != null && res.status_code !== '' && !isSuccessStatus(res.status_code)) {
    return false;
  }
  const message = res.message;
  if (typeof message !== 'string' || !message.trim()) return false;
  const normalized = message.trim().toLowerCase();
  if (normalized.includes('fail') || normalized.includes('error') || normalized.includes('invalid')) {
    return false;
  }
  return (
    normalized.includes('password changed successfully') ||
    normalized.includes('changed successfully') ||
    normalized === 'success'
  );
}

function readForgotPasswordIdentity(response: LoginOtpApiResponse | unknown): {
  userId: string;
  dlId: string;
} {
  const user =
    readKeycloakForgotPasswordUser(response) ??
    readKeycloakForgotPasswordUser((response as LoginOtpApiResponse)?.data) ??
    readKeycloakForgotPasswordUser((response as LoginOtpApiResponse)?.message);

  if (user?.id) {
    const dlId =
      readAttributeString(user.attributes, 'dlId', 'dl_id', 'DLId') ||
      readString(user, 'dlId', 'dl_id');
    return { userId: user.id.trim(), dlId };
  }

  const data = unwrapDataNode(response as LoginOtpApiResponse);
  const userId =
    readString(data, 'userId', 'user_id', 'ID', 'id') ||
    readString(response as LoginOtpApiResponse, 'userId', 'user_id', 'ID', 'id');
  const dlId =
    readString(data, 'dlId', 'dl_id') ||
    readString(response as LoginOtpApiResponse, 'dlId', 'dl_id');
  return { userId, dlId };
}

/**
 * Forgot-password password update — replaces legacy `pages/keycloakForgotPassword`.
 * Flow: keycloakForgotPassword → keycloakChangePassword (requires reg_code from OTP verify).
 */
export async function completeForgotPasswordUpdate(
  identifier: string,
  password: string
): Promise<LoginOtpApiResponse> {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  let clientToken: string;
  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  const forgotRes = await postGatewayJson<LoginOtpApiResponse>(
    '/keycloakForgotPassword',
    { identifier, reg_code: regCode },
    clientToken
  );

  if (!isForgotPasswordGatewaySuccess(forgotRes)) {
    return { status_code: forgotRes.status_code ?? 500, message: DEFAULT_ERROR };
  }

  const { userId, dlId } = readForgotPasswordIdentity(forgotRes);
  if (!userId || !dlId) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  try {
    clientToken = await fetchClientAccessToken();
  } catch {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  const changeRes = await postInternalAuthJson<LoginOtpApiResponse>(
    SHELL_INTERNAL_CHANGE_PASSWORD_PATH,
    {
      userId,
      dlId,
      password_secret: await encryptLoginSecret(password),
    }
  );

  if (!isKeycloakChangePasswordSuccess(changeRes)) {
    return {
      status_code: changeRes.status_code ?? 500,
      message: resolveGatewayError(changeRes, DEFAULT_ERROR),
    };
  }

  clearStoredRegCode();
  return { status_code: 200, message: 'success' };
}
