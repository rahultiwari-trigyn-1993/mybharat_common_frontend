# Host server — login integration (required for shell login UI)

The **mybharat_common_frontend** package ships the login/forgot-password **UI in the browser** (`dist/shell/shell.js` or React components). It does **not** ship secrets or direct APIGateway access.

Every host that embeds the shell must implement a small **host server layer** on the **same origin as the HTML page**. This is the same idea as OAuth client credentials: they live on the server that serves your site, not inside the npm/CDN bundle.

---

## Three layers (who owns what)

```
┌─────────────────────────────────────────────────────────────────┐
│  BROWSER — shell package (CDN or npm)                           │
│  • Login / OTP / forgot-password forms                          │
│  • Encrypts password/OTP with RSA **public** key (Web Crypto)   │
│  • POSTs only to same-origin /mybharat-shell-api/_internal/*    │
│  • Never contains private key, OAuth password, or KC client creds │
└────────────────────────────┬────────────────────────────────────┘
                             │ same origin (your domain)
┌────────────────────────────▼────────────────────────────────────┐
│  HOST SERVER — your app (CakePHP, Vite, nginx, Laravel, …)      │
│  • Implements /_internal/* routes (see table below)             │
│  • LOGIN_PAYLOAD_PRIVATE_KEY — decrypt password/OTP             │
│  • OAUTH_USERNAME / OAUTH_PASSWORD — guest OTP token            │
│  • Forwards to APIGateway with server-fetched Bearer tokens     │
└────────────────────────────┬────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│  APIGateway — MY Bharat API (keycloakLogin, verifyGuestUserOtp) │
└─────────────────────────────────────────────────────────────────┘
```

| Secret / key | Where it lives | Never in |
|--------------|----------------|----------|
| `LOGIN_PAYLOAD_PRIVATE_KEY` | Host server env (`.env`, Cake `Configure`, K8s secret) | Browser, CDN, `window.MYBHARAT_SHELL` |
| `LOGIN_PAYLOAD_PUBLIC_KEY` | Host server env **or** inlined in shell config (public only) | Private repo in client bundle is OK for public key only |
| OAuth username/password | Host server env | Browser |
| Plain password / OTP | Only in host memory after decrypt | Network tab from browser |

**Registration frontend `.env` is not “client side”.** It is the **host dev server** config for whoever serves `localhost:3000`. Production CakePHP uses the same variables in PHP/server env on `digisevak.local.com`.

---

## What the browser calls (contract)

Set `apiProxyBaseUrl` (default `/mybharat-shell-api`). All routes are `POST`.

| Path | Purpose |
|------|---------|
| `/_internal/login-pubkey` | Returns `{ public_key }` PEM for encryption |
| `/_internal/kc-client` | Keycloak client access token (server → APIGateway) |
| `/_internal/guest-oauth` | Guest OAuth token (server credentials) |
| `/_internal/keycloak-login` | Body: `{ username, password_secret }` → decrypt → `keycloakLogin` |
| `/_internal/verify-guest-otp` | Body: `{ otp_secret, user_email, user_phone }` → decrypt → `verifyGuestUserOtp` |
| `/_internal/keycloak-change-password` | Body: `{ userId, dlId, password_secret }` → decrypt → `keycloakChangePassword` |

`password_secret` / `otp_secret` shape:

```json
{ "v": 1, "alg": "RSA-OAEP", "ciphertext": "<base64>" }
```

Shell exports path constants: `SHELL_INTERNAL_*` from `mybharat_common_frontend`.

---

## Quick start for integrators

### 1. Generate RSA key pair (once per environment)

```bash
node node_modules/mybharat_common_frontend/scripts/generateLoginPayloadKeypair.mjs
```

Add output to **host server** environment only:

```bash
LOGIN_PAYLOAD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
LOGIN_PAYLOAD_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
```

Also set OAuth (same as before):

```bash
OAUTH_USERNAME=...
OAUTH_PASSWORD=...
```

### 2. Embed shell + config (any stack)

```html
<script src="https://cdn…/dist/shell/shell.js" defer></script>
<script>
  window.MYBHARAT_SHELL = {
    login: {
      baseUrl: 'https://your-site.gov.in',
      apiProxyBaseUrl: '/mybharat-shell-api',
      // optional — skip /login-pubkey fetch if you inline public key:
      // loginPayloadPublicKey: '-----BEGIN PUBLIC KEY-----…'
    }
  };
</script>
<mybharat-header api-proxy-base-url="/mybharat-shell-api"></mybharat-header>
```

### 3. Implement host server routes

Choose **one** option:

| Host type | Implementation |
|-----------|----------------|
| **Vite / Node dev** | `shellLoginInternalAuthPlugin` from package (see below) |
| **CakePHP / PHP** | Controller actions or nginx → PHP for each `/_internal/*` path |
| **nginx + Lua / Java / .NET** | Reverse proxy + server handler that decrypts and calls APIGateway |

---

## Vite / Node (included in this package)

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import { shellLoginInternalAuthPlugin } from 'mybharat_common_frontend/server/shellLoginInternalAuthPlugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      shellLoginInternalAuthPlugin({
        loginProxyPrefix: '/mybharat-shell-api',
        apiOrigin: 'http://127.0.0.1:8000',
        oauth: {
          oauthUrl: 'http://127.0.0.1:8000/api/oauth',
          username: env.OAUTH_USERNAME,
          password: env.OAUTH_PASSWORD,
        },
        loginPayload: {
          privateKey: env.LOGIN_PAYLOAD_PRIVATE_KEY,
          publicKey: env.LOGIN_PAYLOAD_PUBLIC_KEY,
        },
      }),
    ],
    server: {
      proxy: {
        '/mybharat-shell-api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mybharat-shell-api/, '/api'),
        },
      },
    },
  };
});
```

The plugin registers middleware **before** the catch-all proxy so `/_internal/*` is handled on your dev server, not forwarded as `/api/_internal/...`.

---

## CakePHP / non-JS host

No JavaScript build required. You need **server-side** endpoints on the same domain as the page:

1. **login-pubkey** — read public key from `Configure::read('LoginPayload.publicKey')` or derive from private key in PHP (`openssl_pkey_get_private` + `openssl_pkey_get_details`).
2. **keycloak-login** — `openssl_private_decrypt` on `password_secret.ciphertext` (RSA-OAEP SHA-256), then POST JSON to APIGateway `/keycloakLogin` with KC client Bearer (your existing `getKcClientToken()`).
3. **verify-guest-otp** — decrypt OTP, form POST to `/verifyGuestUserOtp` with OAuth Bearer (`curl_authToken`).
4. **keycloak-change-password** — decrypt new password, POST to `/keycloakChangePassword`.

Store keys in CakePHP config / server env — same as `OAUTH_USERNAME` today. See [cakephp-shell-integration.md](./cakephp-shell-integration.md) for layout and proxy notes.

---

## Checklist for a new developer

- [ ] Include `shell.js` + CSS (CDN or npm)
- [ ] Set `window.MYBHARAT_SHELL.login.apiProxyBaseUrl`
- [ ] Generate RSA keys → **host server env only**
- [ ] Implement 6 `/_internal/*` routes on the host (Vite plugin or PHP/nginx)
- [ ] Set `OAUTH_USERNAME` / `OAUTH_PASSWORD` on host server
- [ ] Never put private key or OAuth password in HTML or frontend `.env` variables prefixed with `VITE_`

---

## FAQ

**Why isn’t encryption built entirely into the npm package?**  
The private key must decrypt on **your domain**. If it were inside the CDN bundle, anyone could extract it and encryption would be useless. The package owns UI + public-key encryption; the host owns decryption + API credentials.

**Can I skip encryption and only use internal routes?**  
Internal routes alone hide credentials from cross-origin APIGateway URLs, but DevTools would still show plain passwords. Encryption is required for the security model described above.

**Another module installs only the CDN script — what do they do?**  
Read this doc + `cakephp-shell-integration.md`. Implement the host server routes in their stack; run the keygen script once; configure env on their server.
