interface KeycloakClientTokenResponse {
  access_token?: string;
}

let cachedToken: string | null = null;
let tokenPromise: Promise<string> | null = null;

function resetCache(): void {
  cachedToken = null;
  tokenPromise = null;
}

function decodeJwtExp(token: string): number | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8')) as {
      exp?: number;
    };
    return typeof payload.exp === 'number' ? payload.exp : null;
  } catch {
    return null;
  }
}

function isAccessTokenExpired(token: string, bufferSeconds = 30): boolean {
  const exp = decodeJwtExp(token);
  if (exp == null) return false;
  return exp * 1000 <= Date.now() + bufferSeconds * 1000;
}

function isKeycloakClientJwt(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length < 1) return false;
    const base64 = parts[0].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const header = JSON.parse(Buffer.from(padded, 'base64').toString('utf8')) as {
      alg?: string;
    };
    return header.alg === 'RS256';
  } catch {
    return false;
  }
}

/** Server-side Keycloak client token (Cake `getKcClientToken()`). */
export async function getKeycloakClientAccessToken(
  apiOrigin: string,
  forceRefresh = false,
): Promise<string> {
  if (forceRefresh) resetCache();

  if (cachedToken && !isAccessTokenExpired(cachedToken) && isKeycloakClientJwt(cachedToken)) {
    return cachedToken;
  }
  if (cachedToken && (isAccessTokenExpired(cachedToken) || !isKeycloakClientJwt(cachedToken))) {
    resetCache();
  }

  if (tokenPromise) return tokenPromise;

  tokenPromise = (async () => {
    const url = `${apiOrigin.replace(/\/$/, '')}/api/getKeycloakClientAccessToken`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });

    const raw = await res.text();
    let payload: KeycloakClientTokenResponse;
    try {
      payload = JSON.parse(raw) as KeycloakClientTokenResponse;
    } catch {
      throw new Error(`getKeycloakClientAccessToken response was not JSON (${res.status})`);
    }

    if (!res.ok || !payload.access_token) {
      throw new Error(`getKeycloakClientAccessToken failed (${res.status}): ${raw}`);
    }

    if (!isKeycloakClientJwt(payload.access_token)) {
      throw new Error('getKeycloakClientAccessToken returned a non-Keycloak token');
    }

    cachedToken = payload.access_token;
    return cachedToken;
  })();

  try {
    return await tokenPromise;
  } catch (err) {
    resetCache();
    throw err;
  }
}

export function invalidateKeycloakClientAccessToken(): void {
  resetCache();
}
