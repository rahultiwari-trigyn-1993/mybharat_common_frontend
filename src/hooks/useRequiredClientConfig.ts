import { useEffect } from 'react';
import {
  assertRequiredClientConfig,
  type RequiredClientConfigInput,
} from '../config/requireClientConfig';

/** Validates required host config on mount. */
export function useRequiredClientConfig(config?: RequiredClientConfigInput): void {
  const baseUrl = config?.baseUrl?.trim();
  const apiBaseUrl = config?.apiBaseUrl?.trim();
  const apiProxyBaseUrl = config?.apiProxyBaseUrl?.trim();
  const environment = config?.environment?.trim();
  const cdnBase = config?.cdnBase?.trim();

  useEffect(() => {
    assertRequiredClientConfig({ baseUrl, apiBaseUrl, apiProxyBaseUrl, environment, cdnBase });
  }, [baseUrl, apiBaseUrl, apiProxyBaseUrl, environment, cdnBase]);
}
