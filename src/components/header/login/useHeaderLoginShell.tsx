import { useEffect, useState } from 'react';
import { HeaderLoginModals } from './HeaderLoginModals';
import { hostHasLoginModals, installHeaderLoginFlow } from './headerLoginFlow';

/**
 * Installs global Sign In handlers and returns whether to render package login modals.
 */
export function useHeaderLoginShell(enabled = true): boolean {
  const [showModals] = useState(() => !hostHasLoginModals());

  useEffect(() => {
    if (!enabled) return undefined;
    return installHeaderLoginFlow();
  }, [enabled]);

  return enabled && showModals;
}

export type HeaderLoginShellPortalProps = {
  cdnBase: string;
  enabled?: boolean;
};

export function HeaderLoginShellPortal({ cdnBase, enabled = true }: HeaderLoginShellPortalProps) {
  const showModals = useHeaderLoginShell(enabled);
  if (!showModals) return null;
  return <HeaderLoginModals cdnBase={cdnBase} />;
}

export default HeaderLoginShellPortal;
