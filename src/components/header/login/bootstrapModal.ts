export type BootstrapModalInstance = {
  show: () => void;
  hide: () => void;
};

export type BootstrapModalCtor = {
  getInstance: (el: Element | null) => BootstrapModalInstance | undefined;
  getOrCreateInstance: (
    el: Element | null,
    options?: { backdrop?: boolean | 'static'; keyboard?: boolean }
  ) => BootstrapModalInstance;
};

export function getBootstrapModal(): BootstrapModalCtor | undefined {
  return (typeof window !== 'undefined' &&
    (window as unknown as { bootstrap?: { Modal: BootstrapModalCtor } }).bootstrap?.Modal) as
    | BootstrapModalCtor
    | undefined;
}

const BOOTSTRAP_WAIT_MS = 8000;
const BOOTSTRAP_POLL_MS = 50;

function whenElementReady(id: string, onReady: () => void): void {
  if (document.getElementById(id)) {
    onReady();
    return;
  }

  const started = Date.now();
  const timer = window.setInterval(() => {
    if (document.getElementById(id)) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}

function whenBootstrapReady(onReady: () => void): void {
  if (getBootstrapModal()) {
    onReady();
    return;
  }

  const started = Date.now();
  const timer = window.setInterval(() => {
    if (getBootstrapModal()) {
      window.clearInterval(timer);
      onReady();
      return;
    }
    if (Date.now() - started >= BOOTSTRAP_WAIT_MS) {
      window.clearInterval(timer);
    }
  }, BOOTSTRAP_POLL_MS);
}

export function showBootstrapModal(
  id: string,
  options?: { backdrop?: boolean | 'static'; keyboard?: boolean }
): void {
  const tryShow = (): boolean => {
    const el = document.getElementById(id);
    const Modal = getBootstrapModal();
    if (!el || !Modal) return false;
    Modal.getOrCreateInstance(el, options).show();
    return true;
  };

  if (tryShow()) return;

  const attemptShow = (): void => {
    if (tryShow()) return;
    whenBootstrapReady(tryShow);
  };

  if (document.getElementById(id)) {
    whenBootstrapReady(tryShow);
  } else {
    whenElementReady(id, attemptShow);
  }
}

/** Remove leftover dimmer when host + shell Bootstrap both touch modals (e.g. CakePHP). */
export function cleanupOrphanModalBackdrop(): void {
  if (typeof document === 'undefined') return;

  const visibleModals = document.querySelectorAll('.modal.show');
  if (visibleModals.length > 0) return;

  document.querySelectorAll('.modal-backdrop').forEach((node) => node.remove());
  document.body.classList.remove('modal-open');
  document.body.style.removeProperty('overflow');
  document.body.style.removeProperty('padding-right');
}

export function hideBootstrapModal(id: string): void {
  const el = document.getElementById(id);
  const Modal = getBootstrapModal();
  if (!el) return;

  if (Modal) {
    const instance = Modal.getInstance(el) ?? Modal.getOrCreateInstance(el);
    instance.hide();
  } else {
    el.classList.remove('show');
    el.setAttribute('aria-hidden', 'true');
    el.removeAttribute('aria-modal');
    el.style.display = 'none';
  }

  window.setTimeout(cleanupOrphanModalBackdrop, 350);
}

export function switchBootstrapModal(fromId: string, toId: string, delayMs = 0): void {
  hideBootstrapModal(fromId);
  window.setTimeout(() => showBootstrapModal(toId, { backdrop: 'static', keyboard: false }), delayMs);
}
