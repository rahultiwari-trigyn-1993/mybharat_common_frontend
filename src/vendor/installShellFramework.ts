/**
 * Bootstrap 5 for modals, dropdowns, collapse — bundled instead of CDN inject (Phase 1).
 * Exposes `window.bootstrap` for `data-bs-*` markup and `bootstrapModal.ts`.
 */
import * as bootstrap from 'bootstrap';

declare global {
  interface Window {
    bootstrap?: typeof bootstrap;
  }
}

if (typeof window !== 'undefined') {
  window.bootstrap = bootstrap;
}

export {};
