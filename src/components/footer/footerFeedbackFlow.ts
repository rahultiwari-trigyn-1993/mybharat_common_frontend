import {
  cleanupOrphanModalBackdrop,
  hideBootstrapModal,
  showBootstrapModal,
} from '../header/login/bootstrapModal';
import { validateEmail, validatePhone } from '../header/login/headerLoginFlow';
import { resetFeedbackRecaptchaSafely } from './footerRecaptchaBridge';
import {
  applyFooterFeedbackApiConfig,
  isFeedbackSubmitSuccess,
  saveUserFeedback,
  type FeedbackFormValues,
} from './footerFeedbackSubmit';
import { resolveUserFacingApiError } from '../header/login/loginApiErrorMessage';
import type { HeaderUserSessionInput } from '../header/headerUserSession';

type ValidationField = readonly [fieldKey: string, label: string];

const GUEST_VALIDATION_FIELDS: ValidationField[] = [
  ['user_rating:checked', 'Rating'],
  ['user_name', 'Name'],
  ['user_email', 'Email'],
  ['user_mobile', 'Mobile'],
  ['user_feedback', 'Feedback'],
];

const LOGGED_IN_VALIDATION_FIELDS: ValidationField[] = [
  ['user_rating:checked', 'Rating'],
  ['user_feedback', 'Feedback'],
];

const FEEDBACK_MAX_CHARS = 250;

let installed = false;
let feedbackIsLoggedIn: boolean | undefined;
let submitInFlight = false;

export function applyFooterFeedbackConfig(options?: {
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
  /** @deprecated Use `feedbackApiBaseUrl` — full URL override for save feedback POST. */
  feedbackSubmitUrl?: string;
  /** @deprecated No longer used — feedback posts to APIGateway `/saveFeedbackData`. */
  webroot?: string;
  userSession?: HeaderUserSessionInput;
  isLoggedIn?: boolean;
}): void {
  applyFooterFeedbackApiConfig({
    feedbackApiBaseUrl: options?.feedbackApiBaseUrl,
    rewardsApiBaseUrl: options?.rewardsApiBaseUrl,
    feedbackSubmitUrl: options?.feedbackSubmitUrl,
    userSession: options?.userSession,
    isLoggedIn: options?.isLoggedIn,
  });
  if (options?.isLoggedIn !== undefined) {
    feedbackIsLoggedIn = options.isLoggedIn;
  }
}

function resolveIsLoggedIn(): boolean {
  if (feedbackIsLoggedIn !== undefined) return feedbackIsLoggedIn;
  if (window.MYBHARAT_SHELL?.footer?.isLoggedIn !== undefined) {
    return !!window.MYBHARAT_SHELL.footer.isLoggedIn;
  }
  const form = document.getElementById('feedbackFrm');
  return form ? !form.querySelector('#user_name') : false;
}

function resolveRequiresCaptcha(): boolean {
  if (resolveIsLoggedIn()) return false;
  return !!document.querySelector('#feed_back .mb-common-footer__recaptcha[data-sitekey]');
}

function fieldElement(fieldKey: string): HTMLElement | null {
  if (fieldKey === 'user_rating:checked') {
    return document.querySelector(
      '#feedbackFrm input[name="user_rating"]:checked'
    ) as HTMLElement | null;
  }
  return document.getElementById(fieldKey);
}

function fieldValue(fieldKey: string): string {
  const el = fieldElement(fieldKey);
  if (!el) return '';
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return el.value.trim();
  }
  return (el.textContent ?? '').trim();
}

function setFieldError(
  fieldKey: string,
  label: string,
  hasError: boolean,
  message?: string
): void {
  if (fieldKey === 'user_rating:checked') {
    const errEl = document.querySelector('.Ratingerr');
    if (hasError) {
      fieldElement(fieldKey)?.classList.add('vError');
      if (errEl) errEl.textContent = message ?? `Please enter your ${label}`;
    } else {
      document.querySelectorAll('#feedbackFrm input[name="user_rating"]').forEach((input) => {
        input.classList.remove('vError');
      });
      if (errEl) errEl.textContent = '';
    }
    return;
  }

  const el = document.getElementById(fieldKey);
  const errEl = document.querySelector(`.${label}err`);
  if (hasError) {
    el?.classList.add('vError');
    if (errEl) errEl.textContent = message ?? `Please enter your ${label}`;
  } else {
    el?.classList.remove('vError');
    if (errEl) errEl.textContent = '';
  }
}

function validateGuestFieldFormat(fieldKey: string, label: string, value: string): boolean {
  if (fieldKey === 'user_email') {
    if (!validateEmail(value)) {
      setFieldError(fieldKey, label, true, 'Please enter a valid Email Id');
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }

  if (fieldKey === 'user_mobile') {
    if (!validatePhone(value)) {
      setFieldError(fieldKey, label, true, 'Please enter a valid 10-digit Mobile Number');
      return false;
    }
    setFieldError(fieldKey, label, false);
    return true;
  }

  return true;
}

export function validateFeedbackForm(requireCaptcha = resolveRequiresCaptcha()): boolean {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;
  let validCount = fields.length;

  for (const [fieldKey, label] of fields) {
    const value = fieldValue(fieldKey);
    if (value === '') {
      setFieldError(fieldKey, label, true);
      validCount -= 1;
      continue;
    }

    if (!resolveIsLoggedIn() && !validateGuestFieldFormat(fieldKey, label, value)) {
      validCount -= 1;
      continue;
    }

    setFieldError(fieldKey, label, false);
  }

  if (requireCaptcha) {
    const captchaEl = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement | null;
    const captchaVal = captchaEl?.value.trim() ?? '';
    const captchaErr = document.querySelector('.captchaerr');
    if (!captchaVal) {
      if (captchaErr) captchaErr.textContent = 'Please check the reCAPTCHA checkbox.';
      return false;
    }
    if (captchaErr) captchaErr.textContent = '';
  }

  return validCount === fields.length;
}

function showFeedbackAlert(msg: string, type: 'danger' | 'success'): void {
  const el = document.getElementById('feedback_alert');
  if (!el) return;
  el.style.display = '';
  el.className = `alert alert-${type}`;
  el.innerHTML = `<small>${msg}</small>`;
  window.setTimeout(() => {
    el.style.display = 'none';
  }, 10000);
}

function closeFeedbackModals(): void {
  hideBootstrapModal('feed_back');
  hideBootstrapModal('feed_back1');
  cleanupOrphanModalBackdrop();
}

function resetFeedbackForm(): void {
  const fields = resolveIsLoggedIn() ? LOGGED_IN_VALIDATION_FIELDS : GUEST_VALIDATION_FIELDS;

  for (const [fieldKey, label] of fields) {
    if (fieldKey !== 'user_rating:checked') {
      const el = document.getElementById(fieldKey) as HTMLInputElement | HTMLTextAreaElement | null;
      if (el) {
        el.value = '';
        el.classList.remove('vError');
      }
    }
    const errEl = document.querySelector(`.${label}err`);
    if (errEl) errEl.textContent = '';
  }

  const charCnt = document.getElementById('char_left_cnt');
  if (charCnt) charCnt.textContent = '';

  if (resolveRequiresCaptcha()) {
    const captchaErr = document.querySelector('.captchaerr');
    if (captchaErr) captchaErr.textContent = '';
    resetFeedbackRecaptchaSafely();
  }
}

function readFeedbackFormValues(): FeedbackFormValues {
  const form = document.getElementById('feedbackFrm');
  const captchaEl = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement | null;
  const typeInput = form?.querySelector('input[name="type"]') as HTMLInputElement | null;
  const ratingInput = form?.querySelector('input[name="user_rating"]:checked') as HTMLInputElement | null;

  return {
    type: typeInput?.value.trim() || 'web',
    user_rating: ratingInput?.value.trim() ?? '',
    user_feedback: fieldValue('user_feedback'),
    user_name: fieldValue('user_name'),
    user_email: fieldValue('user_email'),
    user_mobile: fieldValue('user_mobile'),
    feedback_captcha_name: fieldValue('feedback_captcha_name'),
    feedback_captcha_value: fieldValue('feedback_captcha_value'),
    'g-recaptcha-response': captchaEl?.value.trim() ?? '',
  };
}

function triggerFirebaseFeedbackEvent(event: 'user_feedback_success' | 'user_feedback_failure'): void {
  const setup = window.setupFirebaseUserAjaxEvents;
  const encode = window.encodeIdentifier;
  if (!setup || !encode) return;

  const userId = window.USER_DATA?.ID ?? window.__MYBHARAT_LOGIN_USER_ID__ ?? '';
  setup(event, encode(String(userId)));
}

function setFormC2Visible(visible: boolean): void {
  const el = document.getElementById('form_c2');
  if (el) el.style.display = visible ? '' : 'none';
}

function setFeedbackSubmitting(submitting: boolean): void {
  const form = document.getElementById('feedbackFrm');
  const loader = document.getElementById('mb-common-footer-feedback-loader');
  const cancelBtn = document.getElementById('form_cl');

  form?.classList.toggle('mb-common-footer__feedback-form--submitting', submitting);
  loader?.classList.toggle('is-visible', submitting);
  if (loader) loader.setAttribute('aria-hidden', submitting ? 'false' : 'true');

  if (cancelBtn instanceof HTMLImageElement) {
    cancelBtn.style.pointerEvents = submitting ? 'none' : '';
    cancelBtn.style.opacity = submitting ? '0.45' : '';
  }
}

function showFeedbackLoader(): void {
  setFeedbackSubmitting(true);
}

function hideFeedbackLoader(): void {
  setFeedbackSubmitting(false);
}

async function onFormC2Click(e: Event): Promise<void> {
  e.preventDefault();
  if (submitInFlight) return;

  setFormC2Visible(false);

  const requireCaptcha = resolveRequiresCaptcha();
  if (!validateFeedbackForm(requireCaptcha)) {
    setFormC2Visible(true);
    return;
  }

  submitInFlight = true;
  showFeedbackLoader();
  try {
    const res = await saveUserFeedback(readFeedbackFormValues());
    if (isFeedbackSubmitSuccess(res)) {
      hideBootstrapModal('feed_back');
      showBootstrapModal('successToaster');
      window.setTimeout(() => hideBootstrapModal('successToaster'), 10000);
      resetFeedbackForm();
      triggerFirebaseFeedbackEvent('user_feedback_success');
    } else {
      showFeedbackAlert(
        resolveUserFacingApiError({
          data: res.data,
          message: res.message,
          status_code: res.status_code,
        }),
        'danger'
      );
      triggerFirebaseFeedbackEvent('user_feedback_failure');
      setFormC2Visible(true);
    }
  } catch (err) {
    const msg =
      err instanceof Error
        ? resolveUserFacingApiError({ message: err.message })
        : resolveUserFacingApiError(null);
    showFeedbackAlert(msg, 'danger');
    triggerFirebaseFeedbackEvent('user_feedback_failure');
    setFormC2Visible(true);
  } finally {
    submitInFlight = false;
    hideFeedbackLoader();
  }
}

function onDocumentClick(e: Event): void {
  const target = e.target as Element | null;
  if (!target) return;

  if (target.closest('#form_c2')) {
    void onFormC2Click(e);
    return;
  }

  if (target.closest('#form_cl')) {
    e.preventDefault();
    e.stopPropagation();
    closeFeedbackModals();
    resetFeedbackForm();
    return;
  }

  if (target.closest('#feedback_mdl_btn')) {
    resetFeedbackForm();
  }
}

function isFooterFeedbackField(target: HTMLElement): boolean {
  return Boolean(target.closest('#feed_back, #feed_back1, #footer_external'));
}

function onDocumentInput(e: Event): void {
  const target = e.target as HTMLElement | null;
  if (!target || !isFooterFeedbackField(target)) return;

  if (target.id === 'user_feedback') {
    const len = (target as HTMLTextAreaElement).value.length;
    const charCnt = document.getElementById('char_left_cnt');
    if (!charCnt || len > FEEDBACK_MAX_CHARS) return;
    charCnt.textContent =
      len > 0
        ? `Remaining characters: ${FEEDBACK_MAX_CHARS - len}`
        : `Remaining characters: ${FEEDBACK_MAX_CHARS}`;
  }

  if (target.id === 'user_name') {
    const el = target as HTMLInputElement;
    el.value = el.value.replace(/[^a-zA-Z ]/g, '').replace(/(\..*)\./g, '$1');
  }

  if (target.id === 'user_mobile') {
    const el = target as HTMLInputElement;
    el.value = el.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  }
}

function syncFooterFeedbackConfigFromDom(): void {
  const footerEl = document.querySelector('mybharat-footer');
  if (!footerEl) return;

  const isLoggedInAttr = footerEl.getAttribute('is-logged-in');
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: footerEl.getAttribute('feedback-api-base-url') ?? undefined,
    rewardsApiBaseUrl: footerEl.getAttribute('rewards-api-base-url') ?? undefined,
    feedbackSubmitUrl: footerEl.getAttribute('feedback-submit-url') ?? undefined,
    isLoggedIn:
      isLoggedInAttr === 'true' || isLoggedInAttr === '' ? true : isLoggedInAttr === 'false' ? false : undefined,
  });
}

/** Document-level feedback modal handlers — validation + APIGateway submit. */
export function installFooterFeedbackFlow(): () => void {
  if (installed) return () => undefined;
  installed = true;

  syncFooterFeedbackConfigFromDom();
  applyFooterFeedbackConfig({
    feedbackApiBaseUrl: window.MYBHARAT_SHELL?.footer?.feedbackApiBaseUrl,
    rewardsApiBaseUrl: window.MYBHARAT_SHELL?.footer?.rewardsApiBaseUrl,
    feedbackSubmitUrl: window.MYBHARAT_SHELL?.footer?.feedbackSubmitUrl,
    userSession: (window.MYBHARAT_SHELL?.footer?.userSession ??
      window.MYBHARAT_SHELL?.header?.userSession) as HeaderUserSessionInput,
    isLoggedIn: window.MYBHARAT_SHELL?.footer?.isLoggedIn,
  });

  document.addEventListener('click', onDocumentClick, true);
  document.addEventListener('input', onDocumentInput, true);

  return () => {
    installed = false;
    document.removeEventListener('click', onDocumentClick, true);
    document.removeEventListener('input', onDocumentInput, true);
  };
}
