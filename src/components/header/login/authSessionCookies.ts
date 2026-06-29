function readField(obj: unknown, ...keys: string[]): unknown {
  if (!obj || typeof obj !== 'object') return undefined;
  const record = obj as Record<string, unknown>;
  for (const key of keys) {
    if (record[key] != null && record[key] !== '') return record[key];
  }
  return undefined;
}

function readString(obj: unknown, ...keys: string[]): string {
  const value = readField(obj, ...keys);
  return value != null ? String(value).trim() : '';
}

function readNestedRecord(obj: unknown, ...path: string[]): Record<string, unknown> {
  let current: unknown = obj;
  for (const key of path) {
    if (!current || typeof current !== 'object') return {};
    current = (current as Record<string, unknown>)[key];
  }
  return current && typeof current === 'object' && !Array.isArray(current)
    ? (current as Record<string, unknown>)
    : {};
}

function readKeycloakNode(res: Record<string, unknown>): Record<string, unknown> {
  const data =
    res.data && typeof res.data === 'object' && !Array.isArray(res.data)
      ? (res.data as Record<string, unknown>)
      : {};
  const authOutputRecord = readNestedRecord(res, 'auth_output');

  const candidates = [
    readNestedRecord(res, 'keycloak'),
    readNestedRecord(data, 'keycloak'),
    readNestedRecord(authOutputRecord, 'keycloak'),
  ];

  for (const node of candidates) {
    if (readString(node, 'access_token', 'accessToken')) return node;
  }
  return candidates.find((node) => Object.keys(node).length > 0) ?? {};
}

/** MB app token for `token` / `token_essays` cookies (keycloakLogin / exchange / registerKeycloakUser). */
export function readMbAppTokenFromGatewayResponse(authResponse: unknown): string {
  if (!authResponse || typeof authResponse !== 'object') return '';

  const res = authResponse as Record<string, unknown>;
  const data =
    res.data && typeof res.data === 'object' && !Array.isArray(res.data)
      ? (res.data as Record<string, unknown>)
      : {};
  const keycloak = readKeycloakNode(res);

  const mbTokenFromField =
    readString(res, 'mb_token', 'mbToken', 'token') ||
    readString(data, 'mb_token', 'mbToken', 'token') ||
    readString(keycloak, 'mb_token', 'mbToken');

  if (mbTokenFromField) return mbTokenFromField;

  const keycloakAccessToken = readString(keycloak, 'access_token', 'accessToken');
  const rootAccessToken =
    readString(res, 'access_token', 'accessToken') ||
    readString(data, 'access_token', 'accessToken');

  if (
    keycloakAccessToken &&
    rootAccessToken &&
    rootAccessToken !== keycloakAccessToken
  ) {
    return rootAccessToken;
  }

  return rootAccessToken || keycloakAccessToken;
}

export function readShellCookieDomain(): string {
  const configured = window.MYBHARAT_SHELL?.login?.cookieDomain?.trim();
  if (configured) return configured;
  return window.location.hostname;
}

/** Sets `token` and `token_essays` before `establish_session` navigation. */
export function setMbAuthSessionCookies(
  token: string,
  options?: { cookieDomain?: string },
): void {
  const value = token.trim();
  if (!value) return;

  const expiry = new Date(Date.now() + 1440 * 60 * 1000).toUTCString();
  const domain = (options?.cookieDomain ?? readShellCookieDomain()).trim();
  const domainPart = domain ? `;domain=${domain}` : '';

  document.cookie = `token=${encodeURIComponent(value)};expires=${expiry};path=/${domainPart}`;
  document.cookie = `token_essays=${encodeURIComponent(value)};expires=${expiry};path=/${domainPart}`;
}
