import { getFeedbackRecaptchaWidgetId, setFeedbackRecaptchaWidgetId } from './footerRecaptchaBridge';
import { whenRecaptchaReady } from './footerRecaptchaLoader';

function hasRenderedWidget(container: HTMLElement): boolean {
  return !!container.querySelector('iframe[src*="recaptcha"], iframe[title*="reCAPTCHA"]');
}

/** Render reCAPTCHA v2 into the feedback modal container (idempotent). */
export async function renderFeedbackRecaptchaWidget(
  container: HTMLElement,
  siteKey: string
): Promise<number | null> {
  const key = siteKey.trim();
  if (!key) return null;

  if (hasRenderedWidget(container)) {
    return getFeedbackRecaptchaWidgetId();
  }

  try {
    const grecaptcha = await whenRecaptchaReady();
    if (hasRenderedWidget(container)) {
      return getFeedbackRecaptchaWidgetId();
    }

    // Drop orphaned markup before a retry render.
    container.replaceChildren();

    const widgetId = grecaptcha.render(container, { sitekey: key });
    setFeedbackRecaptchaWidgetId(widgetId);
    return widgetId;
  } catch {
    return null;
  }
}

/** Retry render after Bootstrap modal open — container/ref may not be ready on first tick. */
export function scheduleFeedbackRecaptchaRender(
  getContainer: () => HTMLElement | null,
  siteKey: string,
  delayMs = 150
): void {
  window.setTimeout(() => {
    void (async () => {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const container = getContainer();
        if (container && hasRenderedWidget(container)) return;
        if (container && siteKey.trim()) {
          const widgetId = await renderFeedbackRecaptchaWidget(container, siteKey);
          if (widgetId != null) return;
        }
        await new Promise((resolve) => window.setTimeout(resolve, 200));
      }
    })();
  }, delayMs);
}
