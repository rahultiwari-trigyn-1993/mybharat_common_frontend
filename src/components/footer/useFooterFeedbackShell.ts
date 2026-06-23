import { useLayoutEffect } from 'react';
import { applyFooterFeedbackConfig, installFooterFeedbackFlow } from './footerFeedbackFlow';
import type { HeaderUserSessionInput } from '../header/headerUserSession';

export type UseFooterFeedbackShellOptions = {
  feedbackApiBaseUrl?: string;
  rewardsApiBaseUrl?: string;
  feedbackSubmitUrl?: string;
  userSession?: HeaderUserSessionInput;
  isLoggedIn?: boolean;
  enabled?: boolean;
};

/** Installs global feedback form handlers (validation, submit, reset). */
export function useFooterFeedbackShell({
  feedbackApiBaseUrl,
  rewardsApiBaseUrl,
  feedbackSubmitUrl,
  userSession,
  isLoggedIn,
  enabled = true,
}: UseFooterFeedbackShellOptions = {}): void {
  useLayoutEffect(() => {
    if (!enabled) return undefined;

    applyFooterFeedbackConfig({
      feedbackApiBaseUrl,
      rewardsApiBaseUrl,
      feedbackSubmitUrl,
      userSession,
      isLoggedIn,
    });
    return installFooterFeedbackFlow();
  }, [enabled, feedbackApiBaseUrl, rewardsApiBaseUrl, feedbackSubmitUrl, userSession, isLoggedIn]);
}

export default useFooterFeedbackShell;
