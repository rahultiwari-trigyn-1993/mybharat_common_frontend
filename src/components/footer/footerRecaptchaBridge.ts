/** Shared reCAPTCHA widget id — set when `#feed_back` modal renders the widget. */
let feedbackRecaptchaWidgetId: number | null = null;

export function setFeedbackRecaptchaWidgetId(widgetId: number | null): void {
  feedbackRecaptchaWidgetId = widgetId;
}

export function getFeedbackRecaptchaWidgetId(): number | null {
  return feedbackRecaptchaWidgetId;
}

function isFeedbackRecaptchaRendered(): boolean {
  return !!document.querySelector('#feed_back .mb-common-footer__recaptcha iframe');
}

/** Reset only when the feedback captcha widget has been rendered (avoids "No reCAPTCHA clients exist"). */
export function resetFeedbackRecaptchaSafely(): void {
  const grecaptcha = window.grecaptcha;
  if (!grecaptcha || feedbackRecaptchaWidgetId == null || !isFeedbackRecaptchaRendered()) {
    return;
  }

  try {
    grecaptcha.reset(feedbackRecaptchaWidgetId);
  } catch {
    // Widget may have been torn down between check and reset.
  }
}
