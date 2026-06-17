import { useLayoutEffect } from 'react';
import { applyFooterFeedbackConfig, installFooterFeedbackFlow } from './footerFeedbackFlow';
import type { HeaderUserSessionInput } from '../header/headerUserSession';

export type UseFooterFeedbackShellOptions = {
  feedbackApiBaseUrl?: string;
  feedbackSubmitUrl?: string;
  userSession?: HeaderUserSessionInput;
  isLoggedIn?: boolean;
  enabled?: boolean;
};

/** Installs global feedback form handlers (validation, submit, reset). */
export function useFooterFeedbackShell({
  feedbackApiBaseUrl,
  feedbackSubmitUrl,
  userSession,
  isLoggedIn,
  enabled = true,
}: UseFooterFeedbackShellOptions = {}): void {
  useLayoutEffect(() => {
    if (!enabled) return undefined;

    applyFooterFeedbackConfig({
      feedbackApiBaseUrl,
      feedbackSubmitUrl,
      userSession,
      isLoggedIn,
    });
    return installFooterFeedbackFlow();
  }, [enabled, feedbackApiBaseUrl, feedbackSubmitUrl, userSession, isLoggedIn]);
}

export default useFooterFeedbackShell;
