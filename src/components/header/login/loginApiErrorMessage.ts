/** Standard fallback when an API response cannot be treated as success. */
export const DEFAULT_API_ERROR_MESSAGE = 'Something went wrong!!! Plz try again later.';

export type ApiErrorPayload = {
  status_code?: number | string;
  message?: unknown;
  error?: string;
  error_description?: string;
  keycloak?: { error?: string; error_description?: string; [key: string]: unknown };
  access_token?: string;
  accessToken?: string;
  data?: unknown;
  [key: string]: unknown;
};

const TECHNICAL_ERROR_PATTERNS = [
  /fetch failed/i,
  /ECONNREFUSED/i,
  /ENOTFOUND/i,
  /network error/i,
  /Host proxy must map/i,
  /Login is not configured/i,
  /internal auth proxy routes/i,
  /wrong token type/i,
];

export function isApiSuccessStatus(statusCode?: number | string): boolean {
  if (statusCode == null || statusCode === '') return false;
  const code = typeof statusCode === 'string' ? Number(statusCode) : statusCode;
  return code === 200 || code === 201;
}

function readTrimmedString(value: unknown): string {
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function collectErrorStrings(node: unknown, depth = 0): string[] {
  if (node == null || depth > 6) return [];
  const parts: string[] = [];

  if (typeof node === 'string') {
    const trimmed = node.trim();
    if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('[')) {
      parts.push(trimmed);
    }
    return parts;
  }

  if (typeof node !== 'object') return parts;

  const obj = node as Record<string, unknown>;
  for (const key of ['error_description', 'error', 'message', 'detail', 'description']) {
    const value = obj[key];
    if (typeof value === 'string' && value.trim()) parts.push(value.trim());
  }

  for (const key of ['keycloak', 'data', 'message', 'response', 'result']) {
    parts.push(...collectErrorStrings(obj[key], depth + 1));
  }

  return parts;
}

/** Extract the best human-readable message from a gateway / internal auth payload. */
export function resolveApiErrorMessage(
  res?: ApiErrorPayload | null,
  fallback = DEFAULT_API_ERROR_MESSAGE
): string {
  if (!res || typeof res !== 'object') return fallback;

  const direct =
    readTrimmedString(res.error_description) ||
    readTrimmedString(res.keycloak?.error_description) ||
    readTrimmedString(res.error) ||
    readTrimmedString(res.keycloak?.error);

  if (direct && direct !== 'invalid_grant') return direct;

  const message = res.message;
  if (typeof message === 'string' && message.trim()) return message.trim();

  const collected = collectErrorStrings(res);
  const description = collected.find((part) => part.includes(' ') && part.length > 8);
  if (description) return description;

  if (collected.includes('invalid_grant')) {
    return 'Invalid user credentials';
  }

  if (collected.length) return collected[0];

  return fallback;
}

/** Hide low-level transport / setup errors from end users. */
export function sanitizeUserFacingError(
  message: string,
  fallback = DEFAULT_API_ERROR_MESSAGE
): string {
  const trimmed = message.trim();
  if (!trimmed) return fallback;
  if (TECHNICAL_ERROR_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return fallback;
  }
  return trimmed;
}

export function resolveUserFacingApiError(
  res?: ApiErrorPayload | null,
  fallback = DEFAULT_API_ERROR_MESSAGE
): string {
  return sanitizeUserFacingError(resolveApiErrorMessage(res, fallback), fallback);
}

export function hasOAuthFailure(res?: ApiErrorPayload | null): boolean {
  if (!res || typeof res !== 'object') return false;
  if (readTrimmedString(res.keycloak?.error)) return true;
  if (readTrimmedString(res.error) && !readTrimmedString(res.access_token)) return true;
  return false;
}

export function inferApiStatusCode(
  res: ApiErrorPayload,
  httpStatus?: number
): number | string | undefined {
  if (res.status_code != null && res.status_code !== '' && !isApiSuccessStatus(res.status_code)) {
    return res.status_code;
  }

  const oauthError = readTrimmedString(res.keycloak?.error) || readTrimmedString(res.error);
  if (oauthError === 'invalid_grant') return 401;
  if (oauthError) return 400;

  if (httpStatus != null && httpStatus >= 400) return httpStatus;
  return res.status_code;
}

/** Normalize parsed JSON + HTTP status; infer failure when OAuth error is nested under HTTP 200. */
export function normalizeApiResponse<T extends ApiErrorPayload>(
  parsed: T,
  httpStatus: number
): T {
  const next = { ...parsed };

  if (next.status_code == null || next.status_code === '') {
    next.status_code = inferApiStatusCode(next, httpStatus) ?? (httpStatus >= 400 ? httpStatus : httpStatus);
  }

  if (hasOAuthFailure(next) && isApiSuccessStatus(next.status_code)) {
    next.status_code = inferApiStatusCode(next, httpStatus) ?? 401;
  }

  if (!isApiSuccessStatus(next.status_code) && httpStatus >= 400) {
    next.status_code = httpStatus;
  }

  return next;
}

/** True when the payload must not proceed (non-2xx, OAuth error, or explicit failure). */
export function isApiFailureResponse(res?: ApiErrorPayload | null): boolean {
  if (!res || typeof res !== 'object') return true;
  if (hasOAuthFailure(res)) return true;
  if (res.status_code == null || res.status_code === '') return false;
  return !isApiSuccessStatus(res.status_code);
}

export function resolveLoginFlowError(
  error: unknown,
  fallback = DEFAULT_API_ERROR_MESSAGE
): string {
  if (error instanceof Error) {
    return resolveUserFacingApiError({ message: error.message }, fallback);
  }
  return fallback;
}

export function toApiErrorResponse(
  res?: ApiErrorPayload | null,
  fallback = DEFAULT_API_ERROR_MESSAGE
): { status_code: number | string; message: string } {
  const status =
    (res?.status_code != null && res.status_code !== ''
      ? res.status_code
      : inferApiStatusCode(res ?? {}, 500)) ?? 500;
  return {
    status_code: status,
    message: resolveUserFacingApiError(res, fallback),
  };
}
