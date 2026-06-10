import { hideBootstrapModal, showBootstrapModal, switchBootstrapModal } from './bootstrapModal';

/** Matches header.ctp jQuery selectors — works for in-package and host-page Sign In controls. */
export const HEADER_LOGIN_SIGN_IN_SELECTORS =
  '#btnGroupDrop1, #signInLink, #register-login-link, #home-login-link';

const LOGIN_DATA_KEY = 'loginData';
const DEFAULT_LOGIN_API_ERROR = 'Something went wrong!!! Plz try again later.';

let installed = false;
let timeRemainingHeader = 45;
let responseCount = 0;
let countdownHeader: ReturnType<typeof setInterval> | null = null;
let cachedKeycloakAccessToken: string | null = null;

class LoginApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LoginApiError';
  }
}

function $(id: string): HTMLElement | null {
  return document.getElementById(id);
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

function tryFirebaseEvent(event: string): void {
  const setup = (window as unknown as { setupFirebaseUserAjaxEvents?: (e: string, id: string) => void })
    .setupFirebaseUserAjaxEvents;
  const encode = (window as unknown as { encodeIdentifier?: (id: string) => string }).encodeIdentifier;
  const userId = (window as unknown as { __MYBHARAT_LOGIN_USER_ID__?: string }).__MYBHARAT_LOGIN_USER_ID__;
  if (typeof setup === 'function' && typeof encode === 'function' && userId) {
    setup(event, encode(userId));
  }
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
  data?: { access_token?: string; accessToken?: string; [key: string]: unknown };
};

function getLoginApiBaseUrl(): string {
  const raw = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  return raw ? raw.replace(/\/$/, '') : '';
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

/** Headers for login API calls — matches host Keycloak integration spec. */
const LOGIN_API_CONTENT_TYPE = 'Application/json';

function normalizeBearerAccessToken(raw?: string): string {
  if (!raw) return '';
  let token = raw.trim();
  if (/^bearer\s+/i.test(token)) {
    token = token.replace(/^bearer\s+/i, '').trim();
  }
  return token;
}

function buildLoginApiHeaders(bearerAccessToken?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': LOGIN_API_CONTENT_TYPE,
  };
  const token = normalizeBearerAccessToken(bearerAccessToken);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
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

async function fetchLoginApiJson<T extends SignInResponse>(
  path: string,
  options?: {
    method?: string;
    body?: Record<string, unknown>;
    token?: string;
    requireAuth?: boolean;
    /** Bearer-only API calls — do not send host session cookies (avoids 401 from cookie auth). */
    omitCredentials?: boolean;
  }
): Promise<T> {
  const base = getLoginApiBaseUrl();
  if (!base) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const normalizedToken = normalizeBearerAccessToken(options?.token);
  if (options?.requireAuth && !normalizedToken) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const headers = buildLoginApiHeaders(normalizedToken);
  if (options?.requireAuth && !headers.Authorization) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const method = options?.method ?? (options?.body ? 'POST' : 'POST');
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      credentials: options?.omitCredentials === false ? 'include' : 'omit',
      headers,
      body: options?.body != null ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as T;
    if (parsed.status_code == null && !res.ok) {
      parsed.status_code = res.status;
    }
    return parsed;
  } catch {
    if (!res.ok) throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
    return { status_code: res.status, message: text } as T;
  }
}

/** Client access token — cached for subsequent login API calls. */
export async function getKeycloakClientAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedKeycloakAccessToken) {
    return cachedKeycloakAccessToken;
  }

  const data = await fetchLoginApiJson<SignInResponse>('/getKeycloakClientAccessToken', {
    method: 'POST',
    omitCredentials: true,
  });

  const token = readAccessTokenFromResponse(data);
  if (!isSuccessStatus(data.status_code) && !token) {
    throw new LoginApiError(resolveLoginApiError(data));
  }
  if (!token) {
    throw new LoginApiError(DEFAULT_LOGIN_API_ERROR);
  }

  cachedKeycloakAccessToken = token;
  return token;
}

/** POST /checkUserExists — Authorization: Bearer {access_token from getKeycloakClientAccessToken}. */
async function fetchCheckUserExists(identifier: string, accessToken: string): Promise<KeycloakCheckResponse> {
  const token = normalizeBearerAccessToken(accessToken);
  return fetchLoginApiJson<KeycloakCheckResponse>('/checkUserExists', {
    method: 'POST',
    body: { identifier, access_token: token },
    token,
    requireAuth: true,
    omitCredentials: true,
  });
}

async function postJson(path: string, data: Record<string, string>): Promise<SignInResponse> {
  const body = new URLSearchParams(data);
  const res = await fetch(path, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  const text = await res.text();
  try {
    return JSON.parse(text) as SignInResponse;
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
  }
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
  setDisabled('login_otp_header', true);
  document.querySelectorAll('.login_otp_header').forEach((el) => {
    (el as HTMLButtonElement).disabled = true;
  });
}

/** Primary entry — matches header.ctp (`#loginWithOtpModal` first). */
export function openLoginWithOtpModal(): void {
  if (!document.getElementById('loginWithOtpModal')) return;
  resetOtpLoginForm();
  hideBootstrapModal('mobileMenuNew');
  showBootstrapModal('loginWithOtpModal');
  window.dispatchEvent(new CustomEvent('mb:open-login', { bubbles: true, detail: { mode: 'otp' } }));
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

function validateOtpLoginInput(): void {
  const input = val('otp_login_header');
  const isEmail = validateEmail(input);
  const isMobile = validatePhone(input);
  const consent = isChecked('consentCheck1');
  const err = $('otp_login_header_error');
  const buttons = document.querySelectorAll('.login_otp_header');

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

async function sendGuestOtp(data: Record<string, string>): Promise<SignInResponse> {
  return postJson('/pages/sendGuestUserOtp', data);
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
      cachedKeycloakAccessToken = null;
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
    if (otpRes.status_code === 200) {
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

async function handleOtpLoginSend(): Promise<void> {
  const identifier = val('otp_login_header');
  storeLoginIdentifier(identifier);
  showLoader();
  document.querySelectorAll('.login_otp_header').forEach((el) => {
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
    if (otpRes.status_code === 200) {
      timeRemainingHeader = 45;
      startTimerHeader();
      switchBootstrapModal('loginWithOtpModal', 'loginWIthOtpVerifyModal', 200);
      setVal('otp-field-3', '');
      setText('otp-field-3_error', '');
    } else {
      setText('otp_login_header_error', String(otpRes.message ?? 'Please check Mobile / Email you entered!'));
    }
  } finally {
    hideLoader();
    document.querySelectorAll('.login_otp_header').forEach((el) => {
      (el as HTMLButtonElement).disabled = false;
    });
  }
}

function otpPayloadForStoredIdentifier(): Record<string, string> {
  const identifier = readLoginIdentifier();
  if (validatePhone(identifier)) return { user_phone: identifier };
  if (validateEmail(identifier)) return { user_email: identifier };
  return { identifier };
}

async function handleResendOtp(): Promise<void> {
  if (timeRemainingHeader > 0) return;
  timeRemainingHeader = 45;
  const payload = otpPayloadForStoredIdentifier();
  const res = await sendGuestOtp(payload);
  if (res.status_code === 200) {
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
  const data: Record<string, string> = { otp };
  if (validateEmail(identifier)) data.user_email = identifier;
  else if (validatePhone(identifier)) data.user_phone = identifier;

  const verify = await postJson('/pages/verifyGuestUserOtpNew', data);
  if (verify.status_code === 200) {
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

  const data: Record<string, string> = { otp };
  if (validateEmail(userMobile)) data.user_email = userMobile;
  else if (validatePhone(userMobile)) data.user_phone = userMobile;

  showLoader();
  try {
    const verify = await postJson('/pages/verifyGuestUserOtpNew', data);
    if (verify.status_code !== 200) {
      responseCount += 1;
      if (responseCount >= 5) {
        setHtml('otp-field-3_error', 'You have reached maximum limit to verify OTP. Please try again after sometime.');
        setDisabled('btn-otp-verify-header', true);
      } else {
        setText('otp-field-3_error', 'Please enter valid OTP.');
        setDisabled('btn-otp-verify-header', false);
      }
      return;
    }

    const loginRes = await postJson('/pages/loginWithOtp', { username: userMobile });
    clearLoginStorage();
    if (loginRes.status_code === 200) {
      tryFirebaseEvent('user_login_success');
      handleLoginRedirect(loginRes);
    } else {
      tryFirebaseEvent('user_login_failure');
      setText('otp-field-3_error', String(loginRes.message ?? 'Login failed'));
      setDisabled('btn-otp-verify-header', false);
    }
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
  const res = await postJson('/pages/keycloakForgotPassword', { identifier, password });
  if (res.status_code === 200) {
    switchBootstrapModal('newPasswordModal', 'successModal', 200);
  } else {
    setText('new_pwd_error', String(res.message ?? 'Unable to update password'));
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
    const res = await postJson('/pages/signIn', { username, password });
    clearLoginStorage();
    if (res.status_code === 200) {
      tryFirebaseEvent('user_login_success');
      handleLoginRedirect(res);
    } else if (res.status_code === 401) {
      tryFirebaseEvent('user_login_failure');
      setText('user_mobile_header_error_login', String(res.message ?? 'Login failed'));
    }
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
    void handleOtpLoginSend();
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
    document.querySelectorAll('.login_otp_header').forEach((el) => {
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
