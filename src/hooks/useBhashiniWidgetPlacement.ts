import { useEffect, useCallback } from 'react';
import { findBhashiniWidget, loadBhashiniScript } from '../utils/loadBhashiniScript';

/** Fallback when `.header-top` is not in the DOM (admin / minimal shells). */
const MOBILE_BREAKPOINT = 768;
const MOUNT_ID = 'bhashini-plugin-mount';
const DESKTOP_SLOT_ID = 'bhashini-desktop-header';
const MOBILE_SLOT_ID = 'bhashini-mobile-header';
const MAX_POLL_MS = 30_000;

function isDesktopSlotVisible(): boolean {
  const desktopHeader = document.getElementById(DESKTOP_SLOT_ID);
  const topStrip = desktopHeader?.closest('.header-top');
  if (topStrip) {
    return window.getComputedStyle(topStrip).display !== 'none';
  }
  return window.innerWidth >= MOBILE_BREAKPOINT;
}

function isSlotVisible(slot: HTMLElement | null): boolean {
  if (!slot) return false;
  return window.getComputedStyle(slot).display !== 'none' && slot.offsetParent !== null;
}

export function useBhashiniWidgetPlacement(enabled = true) {
  const moveBhashiniToTarget = useCallback(() => {
    const mount = document.getElementById(MOUNT_ID);
    const widget = findBhashiniWidget(mount ?? document);
    const mobileHeader = document.getElementById(MOBILE_SLOT_ID);
    const desktopHeader = document.getElementById(DESKTOP_SLOT_ID);

    if (!widget) return false;

    const useDesktop = isDesktopSlotVisible() && isSlotVisible(desktopHeader);
    const target = useDesktop ? desktopHeader : mobileHeader;

    if (target && !target.contains(widget)) {
      target.appendChild(widget);
    }

    if (mount) {
      const empty = mount.childElementCount === 0;
      mount.classList.toggle('mb-common-header__bhashini-mount--empty', empty);
      mount.setAttribute('aria-hidden', empty ? 'true' : 'false');
    }

    return Boolean(target?.contains(widget));
  }, []);

  const pollUntilWidgetReady = useCallback(() => {
    const started = Date.now();
    const tryMove = () => {
      if (moveBhashiniToTarget()) return;
      if (Date.now() - started > MAX_POLL_MS) {
        console.warn('[Bhashini] Widget not found after 30s — check script/CSP and .bhashini-plugin-container mount');
        return;
      }
      setTimeout(tryMove, 300);
    };
    tryMove();
  }, [moveBhashiniToTarget]);

  useEffect(() => {
    if (!enabled) return;

    let resizeTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const init = async () => {
      const mount = document.getElementById(MOUNT_ID);
      if (!mount) {
        console.warn('[Bhashini] Mount #bhashini-plugin-mount missing');
        return;
      }

      try {
        await loadBhashiniScript();
        if (!cancelled) pollUntilWidgetReady();
      } catch (e) {
        console.error('[Bhashini] Script load failed', e);
      }
    };

    init();

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(moveBhashiniToTarget, 150);
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, [enabled, moveBhashiniToTarget, pollUntilWidgetReady]);

  useEffect(() => {
    if (!enabled) return;
    const id = setTimeout(moveBhashiniToTarget, 300);
    return () => clearTimeout(id);
  }, [enabled, moveBhashiniToTarget]);
}
