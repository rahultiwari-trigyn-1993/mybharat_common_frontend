/**
 * Post-OTP-verify / password login — direct APIGateway calls then browser POST to `establish_session`.
 */

import {
  DEFAULT_API_ERROR_MESSAGE,
  hasOAuthFailure,
  inferApiStatusCode,
  isApiSuccessStatus,
  normalizeApiResponse,
  resolveLoginFlowError,
  resolveUserFacingApiError,
  type ApiErrorPayload,
} from './loginApiErrorMessage';
import { fetchInternalKeycloakClientAccessToken } from './shellLoginGateway';
import { submitEstablishSessionForm, type EstablishSessionFlow } from './establishSessionForm';
import { readMbAppTokenFromGatewayResponse, syncShellLoginCookieDomainFromDom } from './authSessionCookies';
import { GATEWAY_PATHS, BFF_INTERNAL_PATHS } from '../../../config/apiPaths';
import { assertRequiredClientConfig } from '../../../config/requireClientConfig';
import { resolveBrowserApiBaseUrl, isSameOriginApiBase } from '../../../config/resolveBrowserApiBaseUrl';
import { AUTH_CONFIG } from '../../../config/auth';
import { wrapLoginSecretField } from './loginPayloadSecret';
import { postShellLoginBffJson } from './shellLoginBff';
import { isShellLoginBffEnabled } from './shellLoginProxyConfig';

const DEFAULT_ERROR = DEFAULT_API_ERROR_MESSAGE;
const REG_CODE_STORAGE_KEY = AUTH_CONFIG.storageKeys.regCode;

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
  return isApiSuccessStatus(statusCode);
}

function readLoginFetchBase(): string {
  const shell = window.MYBHARAT_SHELL?.login;
  const direct =
    shell?.apiBaseUrl?.trim().replace(/\/$/, '') ||
    document.querySelector('mybharat-header')?.getAttribute('api-base-url')?.trim().replace(/\/$/, '') ||
    '';
  return resolveBrowserApiBaseUrl(direct);
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

async function parseJsonResponse<T extends LoginOtpApiResponse>(res: Response, text: string): Promise<T> {
  try {
    const parsed = JSON.parse(text) as T | unknown[];
    if (Array.isArray(parsed)) {
      return normalizeApiResponse(
        { status_code: res.status, data: parsed } as ApiErrorPayload,
        res.status
      ) as T;
    }
    return normalizeApiResponse(parsed as ApiErrorPayload, res.status) as T;
  } catch {
    return {
      status_code: res.ok ? 200 : res.status,
      message: DEFAULT_ERROR,
    } as T;
  }
}

async function prepareBffGatewayBody(
  path: string,
  body: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if (path === GATEWAY_PATHS.keycloakLogin && typeof body.password === 'string') {
    const { password, ...rest } = body;
    return {
      ...rest,
      ...(await wrapLoginSecretField(String(password), 'password_secret', 'password')),
    };
  }
  if (path === GATEWAY_PATHS.keycloakChangePassword && typeof body.password === 'string') {
    const { password, ...rest } = body;
    return {
      ...rest,
      ...(await wrapLoginSecretField(String(password), 'password_secret', 'password')),
    };
  }
  return body;
}

function gatewayPathToBffPath(path: string): string | undefined {
  switch (path) {
    case GATEWAY_PATHS.keycloakLogin:
      return BFF_INTERNAL_PATHS.keycloakLogin;
    case GATEWAY_PATHS.keycloakGetExchangeToken:
      return BFF_INTERNAL_PATHS.keycloakExchangeToken;
    case GATEWAY_PATHS.keycloakForgotPassword:
      return BFF_INTERNAL_PATHS.keycloakForgotPassword;
    case GATEWAY_PATHS.keycloakChangePassword:
      return BFF_INTERNAL_PATHS.keycloakChangePassword;
    default:
      return undefined;
  }
}

async function postGatewayJson<T extends LoginOtpApiResponse>(
  path: string,
  body: Record<string, unknown>,
  bearerToken?: string
): Promise<T> {
  const bffPath = gatewayPathToBffPath(path);
  if (bffPath && isShellLoginBffEnabled()) {
    try {
      const payload = await prepareBffGatewayBody(path, body);
      const data = await postShellLoginBffJson<T & Record<string, unknown>>(bffPath, payload);
      const statusCode = inferApiStatusCode(data as ApiErrorPayload);
      return normalizeApiResponse(
        data as ApiErrorPayload,
        typeof statusCode === 'number' ? statusCode : 200,
      ) as T;
    } catch (err) {
      return {
        status_code: 500,
        message: resolveLoginFlowError(err),
      } as T;
    }
  }

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
      credentials: isSameOriginApiBase(readLoginFetchBase()) ? 'same-origin' : 'omit',
      headers,
      body: JSON.stringify(body),
    });
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

async function fetchClientAccessToken(): Promise<string> {
  return fetchInternalKeycloakClientAccessToken();
}

function resolveGatewayError(
  res?: LoginOtpApiResponse | null,
  fallback = DEFAULT_ERROR
): string {
  return resolveUserFacingApiError(res as ApiErrorPayload | null, fallback);
}

function isGatewayAuthSuccess(res: LoginOtpApiResponse): boolean {
  if (hasOAuthFailure(res)) return false;
  if (isSuccessStatus(res.status_code)) return true;
  return Boolean(readMbAppTokenFromGatewayResponse(res));
}

function submitPortalEstablishSession(
  flow: Extract<EstablishSessionFlow, 'login_otp' | 'login_password'>,
  username: string,
  authResponse: LoginOtpApiResponse
): LoginOtpRedirectResult {
  const baseUrl = readPagesBaseUrl();
  if (!baseUrl.trim()) {
    assertRequiredClientConfig();
    throw new Error('Portal base URL is not configured for establish_session.');
  }

  syncShellLoginCookieDomainFromDom();

  submitEstablishSessionForm({
    baseUrl,
    flow,
    username,
    authResponse,
  });
  return { redirecting: true };
}

function resolveExchangeError(res: LoginOtpApiResponse): string {
  return resolveGatewayError(res, DEFAULT_ERROR);
}

export async function completeLoginWithOtp(
  username: string
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: 'Something went wrong! Please try again.' };
  }

  let clientToken: string | undefined;
  if (!isShellLoginBffEnabled()) {
    try {
      clientToken = await fetchClientAccessToken();
    } catch (err) {
      return { status_code: 500, message: resolveLoginFlowError(err) };
    }
  }

  const exchange = await postGatewayJson<LoginOtpApiResponse>(
    GATEWAY_PATHS.keycloakGetExchangeToken,
    { username, reg_code: regCode },
    clientToken
  );

  if (!isGatewayAuthSuccess(exchange)) {
    return {
      status_code: exchange.status_code ?? 401,
      message: resolveExchangeError(exchange),
    };
  }

  clearStoredRegCode();
  return submitPortalEstablishSession('login_otp', username, exchange);
}

export async function completePasswordSignIn(
  username: string,
  password: string
): Promise<LoginOtpApiResponse | LoginOtpRedirectResult> {
  let clientToken: string | undefined;
  if (!isShellLoginBffEnabled()) {
    try {
      clientToken = await fetchClientAccessToken();
    } catch (err) {
      return { status_code: 500, message: resolveLoginFlowError(err) };
    }
  }

  const loginRes = await postGatewayJson<LoginOtpApiResponse>(
    GATEWAY_PATHS.keycloakLogin,
    { username, password },
    clientToken
  );

  if (!isGatewayAuthSuccess(loginRes)) {
    return {
      status_code: inferApiStatusCode(loginRes as ApiErrorPayload) ?? loginRes.status_code ?? 401,
      message: resolveGatewayError(loginRes),
    };
  }

  return submitPortalEstablishSession('login_password', username, loginRes);
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

export async function completeForgotPasswordUpdate(
  identifier: string,
  password: string
): Promise<LoginOtpApiResponse> {
  const regCode = readStoredRegCode();
  if (!regCode) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  let clientToken: string | undefined;
  if (!isShellLoginBffEnabled()) {
    try {
      clientToken = await fetchClientAccessToken();
    } catch (err) {
      return { status_code: 500, message: resolveLoginFlowError(err) };
    }
  }

  const forgotRes = await postGatewayJson<LoginOtpApiResponse>(
    GATEWAY_PATHS.keycloakForgotPassword,
    { identifier, reg_code: regCode },
    clientToken
  );

  if (!isForgotPasswordGatewaySuccess(forgotRes)) {
    return {
      status_code: forgotRes.status_code ?? 500,
      message: resolveGatewayError(forgotRes),
    };
  }

  const { userId, dlId } = readForgotPasswordIdentity(forgotRes);
  if (!userId || !dlId) {
    return { status_code: 500, message: DEFAULT_ERROR };
  }

  if (!isShellLoginBffEnabled()) {
    try {
      clientToken = await fetchClientAccessToken();
    } catch (err) {
      return { status_code: 500, message: resolveLoginFlowError(err) };
    }
  }

  const changeRes = await postGatewayJson<LoginOtpApiResponse>(
    GATEWAY_PATHS.keycloakChangePassword,
    { userId, dlId, password },
    clientToken
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
