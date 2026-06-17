/** Resolve Google reCAPTCHA v2 site key from props, shell config, or host page meta. */
export function resolveRecaptchaSiteKey(prop?: string): string {
  const fromProp = prop?.trim();
  if (fromProp) return fromProp;

  const fromShell = window.MYBHARAT_SHELL?.footer?.recaptchaSiteKey?.trim();
  if (fromShell) return fromShell;

  for (const selector of [
    'meta[name="google-site-key"]',
    'meta[name="google-recaptcha-site-key"]',
    'meta[name="recaptcha-site-key"]',
  ]) {
    const fromMeta = document.querySelector(selector)?.getAttribute('content')?.trim();
    if (fromMeta) return fromMeta;
  }

  const footerEl = document.querySelector('mybharat-footer');
  const fromAttr = footerEl?.getAttribute('recaptcha-site-key')?.trim();
  return fromAttr ?? '';
}
