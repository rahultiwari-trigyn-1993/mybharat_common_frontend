import {
  getShellApiFetchBaseUrl,
} from '../header/login/headerLoginFlow';
import { fetchInternalGuestOauthAccessToken } from '../header/login/shellLoginInternalAuth';
import {
  DEFAULT_API_ERROR_MESSAGE,
  isApiSuccessStatus,
  normalizeApiResponse,
  resolveUserFacingApiError,
  type ApiErrorPayload,
} from '../header/login/loginApiErrorMessage';
import {
  isHeaderUserLoggedIn,
  parseHeaderUserSession,
  type HeaderUserSessionInput,
} from '../header/headerUserSession';
import { DEV_API_PROXY_PREFIXES, GATEWAY_PATHS } from '../../config/apiPaths';

export const SAVE_FEEDBACK_DATA_PATH = GATEWAY_PATHS.saveFeedbackData;
export const TRIGGER_YOUTH_REWARD_PATH = GATEWAY_PATHS.triggerYouthReward;

export type FeedbackApiResponse = {
  status_code?: number | string;
  data?: string;
  message?: string;
};

export type FeedbackFormValues = {
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

let feedbackApiBaseUrl: string | undefined;
let rewardsApiBaseUrl: string | undefined;
let feedbackSubmitUrlOverride: string | undefined;
let feedbackUserSession: HeaderUserSessionInput | undefined;
let feedbackIsLoggedInOverride: boolean | undefined;

export function applyFooterFeedbackApiConfig(options?: {
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
  /** Full URL override for the save feedback POST (default `{apiBase}/saveFeedbackData`). */
  feedbackSubmitUrl?: string;
  userSession?: HeaderUserSessionInput;
  isLoggedIn?: boolean;
}): void {
  const apiBase = options?.feedbackApiBaseUrl?.trim();
  if (apiBase) feedbackApiBaseUrl = apiBase.replace(/\/$/, '');

  const rewardsBase = options?.rewardsApiBaseUrl?.trim();
  if (rewardsBase) rewardsApiBaseUrl = rewardsBase.replace(/\/$/, '');

  const submitUrl = options?.feedbackSubmitUrl?.trim();
  if (submitUrl) feedbackSubmitUrlOverride = submitUrl;

  if (options?.userSession !== undefined) {
    feedbackUserSession = options.userSession;
  }
  if (options?.isLoggedIn !== undefined) {
    feedbackIsLoggedInOverride = options.isLoggedIn;
  }
}

function resolveUserSession(): HeaderUserSessionInput {
  if (feedbackUserSession !== undefined) return feedbackUserSession;
  return (
    window.MYBHARAT_SHELL?.footer?.userSession ??
    window.MYBHARAT_SHELL?.header?.userSession ??
    null
  );
}

function resolveApiFetchBase(): string {
  if (feedbackApiBaseUrl) return feedbackApiBaseUrl;

  const fromFooter = window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl?.trim();
  if (fromFooter) return fromFooter.replace(/\/$/, '');

  const fromShell = getShellApiFetchBaseUrl();
  if (fromShell) return fromShell.replace(/\/$/, '');

  const loginApi = window.MYBHARAT_SHELL?.login?.apiBaseUrl?.trim();
  if (loginApi) return loginApi.replace(/\/$/, '');

  return '';
}

function resolveSubmitUrl(): string {
  if (feedbackSubmitUrlOverride) return feedbackSubmitUrlOverride;

  const fromShell = window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl?.trim();
  if (fromShell) return fromShell;

  const base = resolveApiFetchBase();
  if (!base) return SAVE_FEEDBACK_DATA_PATH;
  return `${base}${SAVE_FEEDBACK_DATA_PATH}`;
}

function resolveRewardsApiFetchBase(): string {
  if (rewardsApiBaseUrl) return rewardsApiBaseUrl;

  const fromFooter = window.MYBHARAT_SHELL?.footer?.rewardsApiBaseUrl?.trim();
  if (fromFooter) return fromFooter.replace(/\/$/, '');

  return '';
}

function usesHostApiAuthProxy(base: string): boolean {
  return base === DEV_API_PROXY_PREFIXES.feedback;
}

function usesHostRewardsApiAuthProxy(base: string): boolean {
  return base === DEV_API_PROXY_PREFIXES.rewards;
}

function unwrapRawUserRecord(input: HeaderUserSessionInput): Record<string, unknown> | null {
  if (input == null || typeof input !== 'object') return null;
  if ('data' in input && input.data != null && typeof input.data === 'object') {
    return input.data as Record<string, unknown>;
  }
  return input as Record<string, unknown>;
}

function readSessionPhone(raw: Record<string, unknown> | null): string {
  if (!raw) return '';
  for (const key of ['user_phone', 'phone', 'mobile', 'USER_PHONE']) {
    const value = raw[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }
  return '';
}

function resolveWebActivityUrl(): string {
  const baseUrl = window.MYBHARAT_SHELL?.login?.baseUrl?.trim();
  if (baseUrl) {
    const normalized = baseUrl.replace(/\/$/, '');
    return `${normalized}/`;
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/`;
  }
  return '/';
}

function resolveIsLoggedInForSubmit(formType: string): boolean {
  const isWeb = formType.toLowerCase() === 'web';
  if (!isWeb) return true;

  if (feedbackIsLoggedInOverride !== undefined) return feedbackIsLoggedInOverride;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== undefined) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }

  return isHeaderUserLoggedIn(resolveUserSession());
}

function buildSaveFeedbackPayload(
  form: FeedbackFormValues,
  isLoggedIn: boolean
): Record<string, string> {
  const session = parseHeaderUserSession(resolveUserSession());
  const raw = unwrapRawUserRecord(resolveUserSession());
  const formType = (form.type || 'web').trim() || 'web';
  const isWeb = formType.toLowerCase() === 'web';

  const payload: Record<string, string> = {
    user_name: !isLoggedIn && form.user_name?.trim() ? form.user_name.trim() : session?.displayName ?? '',
    user_email: !isLoggedIn && form.user_email?.trim() ? form.user_email.trim() : session?.email ?? '',
    user_mobile:
      !isLoggedIn && form.user_mobile?.trim() ? form.user_mobile.trim() : readSessionPhone(raw),
    dl_id: !isLoggedIn ? '' : session?.dlId ?? '',
    user_registered: !isLoggedIn ? 'N' : 'Y',
    user_type: formType,
    user_activity: isWeb ? resolveWebActivityUrl() : '',
    user_activity_id: isWeb ? '' : '',
    user_feedback: form.user_feedback.trim(),
    user_rating: form.user_rating.trim(),
    feedback_exist_check: '0',
    feedback_captcha_name: !isLoggedIn ? form.feedback_captcha_name?.trim() ?? '' : '',
    feedback_captcha_value: !isLoggedIn ? form.feedback_captcha_value?.trim() ?? '' : '',
    'g-recaptcha-response': !isLoggedIn ? form['g-recaptcha-response']?.trim() ?? '' : '',
    id: !isLoggedIn ? '' : session ? String(session.id) : '',
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  ) as Record<string, string>;
}

async function postFormToApi(
  url: string,
  form: Record<string, string>
): Promise<FeedbackApiResponse> {
  const base = resolveApiFetchBase();
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Accept: 'application/json',
  };

  if (!usesHostApiAuthProxy(base)) {
    try {
      const token = await fetchInternalGuestOauthAccessToken();
      headers.Authorization = `Bearer ${token}`;
    } catch {
      return { status_code: 500, message: DEFAULT_API_ERROR_MESSAGE };
    }
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers,
      body: new URLSearchParams(form),
      credentials: usesHostApiAuthProxy(base) ? 'same-origin' : 'omit',
    });
  } catch {
    return { status_code: 500, message: DEFAULT_API_ERROR_MESSAGE };
  }

  const text = await res.text();
  try {
    const parsed = JSON.parse(text) as FeedbackApiResponse;
    return normalizeApiResponse(parsed as ApiErrorPayload, res.status) as FeedbackApiResponse;
  } catch {
    return { status_code: res.ok ? 200 : res.status, message: DEFAULT_API_ERROR_MESSAGE };
  }
}

function buildRewardsApiUrl(path: string): string {
  const base = resolveRewardsApiFetchBase();
  const suffix = path.startsWith('/') ? path : `/${path}`;
  if (!base) return suffix;
  return `${base}${suffix}`;
}

async function postJsonToRewardsApi(path: string, body: unknown): Promise<void> {
  const base = resolveRewardsApiFetchBase();
  if (!base) return;

  const url = buildRewardsApiUrl(path);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (!usesHostRewardsApiAuthProxy(base)) {
    const token = await fetchInternalGuestOauthAccessToken();
    headers.Authorization = `Bearer ${token}`;
  }

  await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    credentials: usesHostRewardsApiAuthProxy(base) ? 'same-origin' : 'omit',
  });
}

/** Mirrors CakePHP `trigger-youth-reward-points` for logged-in web feedback — non-blocking. */
export async function triggerGeneralFeedbackReward(userId: number): Promise<void> {
  if (!Number.isFinite(userId) || userId <= 0) return;

  try {
    await postJsonToRewardsApi(TRIGGER_YOUTH_REWARD_PATH, {
      events: [
        {
          event_key: 'general_feedback',
          action: 'added',
          user_id: userId,
        },
      ],
      is_batch: true,
    });
  } catch {
    // Rewards must not block feedback submission.
  }
}

/**
 * Port of CakePHP `TasksController::saveUserFeedback()` — POST `{API_BASE}/saveFeedbackData`.
 */
export async function saveUserFeedback(form: FeedbackFormValues): Promise<FeedbackApiResponse> {
  const formType = (form.type || 'web').trim() || 'web';
  const isLoggedIn = resolveIsLoggedInForSubmit(formType);
  const session = parseHeaderUserSession(resolveUserSession());

  if (isLoggedIn && formType === 'web' && session) {
    void triggerGeneralFeedbackReward(session.id);
  }

  const payload = buildSaveFeedbackPayload(form, isLoggedIn);
  return postFormToApi(resolveSubmitUrl(), payload);
}

export function isFeedbackSubmitSuccess(res: FeedbackApiResponse): boolean {
  return isApiSuccessStatus(res.status_code);
}
