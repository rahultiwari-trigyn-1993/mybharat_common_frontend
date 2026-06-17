type GrecaptchaApi = {
  render: (container: HTMLElement, params: { sitekey: string }) => number;
  reset: (widgetId?: number) => void;
  ready?: (callback: () => void) => void;
};

const SCRIPT_ID = 'mb-google-recaptcha-script';
const SCRIPT_ONLOAD = '__mbRecaptchaScriptOnload';

declare global {
  interface Window {
    [SCRIPT_ONLOAD]?: () => void;
    __mbRecaptchaReadyCallbacks?: Array<() => void>;
  }
}

function flushRecaptchaReadyCallbacks(): void {
  const callbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window.__mbRecaptchaReadyCallbacks = [];
  callbacks.forEach((cb) => {
    try {
      cb();
    } catch {
      // Ignore listener errors — other callbacks should still run.
    }
  });
}

function ensureRecaptchaScript(): void {
  if (document.getElementById(SCRIPT_ID)) return;

  window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
  window[SCRIPT_ONLOAD] = () => flushRecaptchaReadyCallbacks();

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.src = `https://www.google.com/recaptcha/api.js?onload=${SCRIPT_ONLOAD}&render=explicit`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

/** Load api.js once and resolve when `grecaptcha.render` is callable. */
export function whenRecaptchaReady(timeoutMs = 15000): Promise<GrecaptchaApi> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timeoutId = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error('reCAPTCHA timed out while loading'));
    }, timeoutMs);

    const finish = (): void => {
      if (settled) return;
      const api = window.grecaptcha as GrecaptchaApi | undefined;
      if (!api?.render) {
        settled = true;
        window.clearTimeout(timeoutId);
        reject(new Error('reCAPTCHA API unavailable'));
        return;
      }
      const done = (resolved: GrecaptchaApi): void => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        resolve(resolved);
      };
      if (typeof api.ready === 'function') {
        api.ready(() => done(api));
      } else {
        done(api);
      }
    };

    if (window.grecaptcha?.render) {
      finish();
      return;
    }

    ensureRecaptchaScript();

    window.__mbRecaptchaReadyCallbacks = window.__mbRecaptchaReadyCallbacks ?? [];
    window.__mbRecaptchaReadyCallbacks.push(finish);

    const pollForApi = (attempt = 0): void => {
      if (settled) return;
      if (window.grecaptcha?.render) {
        finish();
        return;
      }
      if (attempt >= 200) return;
      window.setTimeout(() => pollForApi(attempt + 1), 50);
    };
    pollForApi();
  });
}

/** Begin loading the script early (safe to call multiple times). */
export function preloadRecaptchaScript(): void {
  if (window.grecaptcha?.render) return;
  ensureRecaptchaScript();
}
