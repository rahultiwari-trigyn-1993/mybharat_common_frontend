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

export function showBootstrapModal(
  id: string,
  options?: { backdrop?: boolean | 'static'; keyboard?: boolean }
): void {
  const el = document.getElementById(id);
  const Modal = getBootstrapModal();
  if (!el || !Modal) return;
  Modal.getOrCreateInstance(el, options).show();
}

export function hideBootstrapModal(id: string): void {
  const el = document.getElementById(id);
  const Modal = getBootstrapModal();
  Modal?.getInstance(el)?.hide();
}

export function switchBootstrapModal(fromId: string, toId: string, delayMs = 0): void {
  hideBootstrapModal(fromId);
  window.setTimeout(() => showBootstrapModal(toId, { backdrop: 'static', keyboard: false }), delayMs);
}
