export interface OAuthTokenConfig {
  oauthUrl: string;
  username: string;
  password: string;
}

interface OAuthTokenResponse {
  access_token?: string;
}

let cachedToken: string | null = null;
let tokenPromise: Promise<string> | null = null;

function resetTokenCache(): void {
  cachedToken = null;
  tokenPromise = null;
}

/** Server-only OAuth (mirrors CakePHP `curl_authToken`). Credentials never sent to the browser. */
export async function getAccessToken(
  config: OAuthTokenConfig,
  forceRefresh = false,
): Promise<string> {
  if (forceRefresh) resetTokenCache();
  if (cachedToken) return cachedToken;
  if (tokenPromise) return tokenPromise;

  tokenPromise = (async () => {
    const fields = new URLSearchParams();
    fields.set('username', config.username);
    fields.set('password', config.password);

    const res = await fetch(config.oauthUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: fields.toString(),
    });

    const raw = await res.text();
    let payload: OAuthTokenResponse;
    try {
      payload = JSON.parse(raw) as OAuthTokenResponse;
    } catch {
      throw new Error(`OAuth response was not JSON (${res.status})`);
    }

    if (!res.ok || !payload.access_token) {
      throw new Error(`OAuth failed (${res.status}): ${raw}`);
    }

    cachedToken = payload.access_token;
    return cachedToken;
  })();

  try {
    return await tokenPromise;
  } catch (err) {
    resetTokenCache();
    throw err;
  }
}

export function invalidateAccessToken(): void {
  resetTokenCache();
}
