import { EXTERNAL_URLS } from '../config/external';

export const BHASHINI_SCRIPT_URL = EXTERNAL_URLS.thirdParty.bhashiniScript;

const BHASHINI_LANGUAGE_LIST = EXTERNAL_URLS.thirdParty.bhashiniLanguages;

/** v3 widget id/class (v2 used `.bhashini-translator-widget`). */
export const BHASHINI_WIDGET_SELECTORS = [
  '#bhashini-translation',
  '.bhashini-plugin-container .bhashini-dropdown',
  '.bhashini-translator-widget',
] as const;

let loadPromise: Promise<void> | null = null;

export function findBhashiniWidget(root?: ParentNode | null): HTMLElement | null {
  const scope = root ?? document;
  for (const selector of BHASHINI_WIDGET_SELECTORS) {
    const el = scope.querySelector(selector);
    if (el instanceof HTMLElement) return el;
  }
  return null;
}

function appendBhashiniScriptTag(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = BHASHINI_SCRIPT_URL;
    script.async = false;
    script.setAttribute('language-icon-color', '#fff');
    script.setAttribute('translation-language-list', BHASHINI_LANGUAGE_LIST);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Bhashini script'));
    document.body.appendChild(script);
  });
}

/**
 * Load Bhashini v3 after `.bhashini-plugin-container` exists in the DOM.
 * Re-injects the script if a host layout loaded it before the header mounted.
 */
export function loadBhashiniScript(): Promise<void> {
  if (findBhashiniWidget()) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  const existingScript = document.querySelector(`script[src="${BHASHINI_SCRIPT_URL}"]`);
  if (existingScript) {
    // Host layout often loads this in <head> before React header — container was missing and init failed.
    existingScript.remove();
    loadPromise = null;
  }

  loadPromise = appendBhashiniScriptTag().catch((err) => {
    loadPromise = null;
    throw err;
  });

  return loadPromise;
}
