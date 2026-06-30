import { AUTH_CONFIG } from '../../config/auth';

const STEP_SIZE = 2;
const MAX_STEPS = 3;
const STORAGE_KEY = AUTH_CONFIG.storageKeys.accessibilityFont;
const HTML_ACTIVE_CLASS = 'mb-accessibility-font-active';

let listenerCount = 0;
let currentStep = 0;
let originalRootFontSize: number | null = null;

function clampStep(step: number): number {
  return Math.max(-MAX_STEPS, Math.min(MAX_STEPS, step));
}

function readStoredStep(): number {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return 0;
    const parsed = Number.parseInt(raw, 10);
    return Number.isFinite(parsed) ? clampStep(parsed) : 0;
  } catch {
    return 0;
  }
}

function ensureOriginalRootFontSize(): number {
  if (originalRootFontSize !== null) return originalRootFontSize;

  const html = document.documentElement;
  const previousInline = html.style.fontSize;
  html.style.fontSize = '';
  originalRootFontSize = parseFloat(getComputedStyle(html).fontSize) || 16;
  if (previousInline) html.style.fontSize = previousInline;

  return originalRootFontSize;
}

function rootSupportsZoom(): boolean {
  return typeof CSS !== 'undefined' && CSS.supports?.('zoom', '1') === true;
}

function updateButtonActiveState(): void {
  const decrease = document.getElementById('decreasetext');
  const reset = document.getElementById('resettext');
  const increase = document.getElementById('increasetext');

  decrease?.classList.toggle('active01', currentStep < 0);
  reset?.classList.toggle('active01', currentStep === 0);
  increase?.classList.toggle('active01', currentStep > 0);
}

function applyAccessibilityFont(): void {
  const html = document.documentElement;
  const base = ensureOriginalRootFontSize();
  const delta = currentStep * STEP_SIZE;
  const nextSize = base + delta;
  const ratio = nextSize / base;
  const useZoom = rootSupportsZoom();

  html.style.setProperty('--mb-font-step', String(currentStep));
  html.style.setProperty('--mb-font-delta', `${delta}px`);
  html.style.setProperty('--mb-font-ratio', String(ratio));

  if (currentStep === 0) {
    html.classList.remove(HTML_ACTIVE_CLASS);
    html.style.zoom = '';
    html.style.fontSize = '';
    document.body.style.fontSize = '';
  } else {
    html.classList.add(HTML_ACTIVE_CLASS);

    if (useZoom) {
      html.style.zoom = String(ratio);
      html.style.fontSize = '';
      document.body.style.fontSize = '';
    } else {
      html.style.zoom = '';
      html.style.fontSize = `${nextSize}px`;
      document.body.style.fontSize = `${nextSize}px`;
    }
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, String(currentStep));
  } catch {
    /* ignore quota / private mode */
  }

  updateButtonActiveState();
}

function handleFontControl(action: 'increase' | 'decrease' | 'reset'): void {
  if (action === 'increase') {
    if (currentStep >= MAX_STEPS) return;
    currentStep += 1;
  } else if (action === 'decrease') {
    if (currentStep <= -MAX_STEPS) return;
    currentStep -= 1;
  } else {
    currentStep = 0;
  }

  applyAccessibilityFont();
}

function onDocumentClick(event: Event): void {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const control = target.closest('#increasetext, #decreasetext, #resettext');
  if (!control) return;

  event.preventDefault();

  if (control.id === 'increasetext') handleFontControl('increase');
  else if (control.id === 'decreasetext') handleFontControl('decrease');
  else if (control.id === 'resettext') handleFontControl('reset');
}

/** Document-level handlers for `#increasetext`, `#decreasetext`, `#resettext`. */
export function installHeaderAccessibilityFont(): () => void {
  if (listenerCount === 0) {
    currentStep = readStoredStep();
    ensureOriginalRootFontSize();
    applyAccessibilityFont();
    document.addEventListener('click', onDocumentClick, true);
  }

  listenerCount += 1;

  return () => {
    listenerCount = Math.max(0, listenerCount - 1);
    if (listenerCount === 0) {
      document.removeEventListener('click', onDocumentClick, true);
    }
  };
}
