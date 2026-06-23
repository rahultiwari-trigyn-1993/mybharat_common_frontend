import { useEffect, useState } from 'react';

/**
 * Enables the mobile menu portal on the client.
 * Bootstrap / icons / Font Awesome are bundled via `src/vendor/installShellFramework.ts` (Phase 1).
 */
export function useMbHeaderBootstrapAndPortal(_cdn?: string): boolean {
  const [menuPortalReady, setMenuPortalReady] = useState(false);

  useEffect(() => {
    setMenuPortalReady(true);
  }, []);

  return menuPortalReady;
}
