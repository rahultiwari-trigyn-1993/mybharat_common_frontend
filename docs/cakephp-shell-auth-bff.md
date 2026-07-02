# CakePHP — MY Bharat shell login BFF

The shell login UI calls **same-origin** routes under `api-proxy-base-url` (default `/mybharat-shell-api`).  
CakePHP holds OAuth credentials and APIGateway URL **server-side only**.

## 1. Header / layout (browser-safe config)

```php
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.250/dist/shell/mybharat-shell.css" />
<script src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.250/dist/shell/shell.js" defer></script>

<script type="application/json" id="mybharat-user-session"><?= json_encode($userSession ?? null) ?></script>

<mybharat-header
  login-base-url="<?= h(Router::url('/', true)) ?>"
  api-proxy-base-url="/mybharat-shell-api"
  cookie-domain=".local.com"
  environment="local"
  nav-json-id="mybharat-header-nav"
  user-json-id="mybharat-user-session"
></mybharat-header>
```

**Remove from HTML** (secrets — server only):

- `api-base-url` pointing at APIGateway
- `oauth-username` / `oauth-password`

## 2. Environment (`.env` or `app_local.php`)

```env
MYBHARAT_API_ORIGIN=http://127.0.0.1:8000
MYBHARAT_OAUTH_USERNAME=your_guest_oauth_user
MYBHARAT_OAUTH_PASSWORD=your_guest_oauth_pass
# Optional HTTPS payload encryption:
# LOGIN_PAYLOAD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
# LOGIN_PAYLOAD_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\n..."
```

Generate keys (optional):

```bash
node node_modules/mybharat_common_frontend/scripts/generateLoginPayloadKeypair.mjs
```

## 3. Routes (`config/routes.php`)

```php
$routes->connect(
    '/mybharat-shell-api/_internal/*',
    ['controller' => 'ShellAuthInternal', 'action' => 'dispatch']
)->setMethods(['POST']);
```

## 4. Controller

Copy and adapt: [`server/cakephp/ShellAuthInternalController.php`](../server/cakephp/ShellAuthInternalController.php)

## 5. BFF routes (shell → CakePHP → APIGateway)

| POST path | Forwards to |
|-----------|-------------|
| `/_internal/kc-client` | `POST /api/getKeycloakClientAccessToken` |
| `/_internal/guest-oauth` | `POST /api/oauth` (server credentials) |
| `/_internal/login-pubkey` | Returns RSA public key (optional) |
| `/_internal/send-guest-otp` | `POST /api/sendMobileGuestUserOtp` |
| `/_internal/verify-guest-otp` | `POST /api/verifyGuestUserOtp` |
| `/_internal/check-user-exists` | `POST /api/checkUserExists` |
| `/_internal/keycloak-login` | `POST /api/keycloakLogin` |
| `/_internal/keycloak-exchange-token` | `POST /api/keycloakGetExchangeToken` |
| `/_internal/keycloak-forgot-password` | `POST /api/keycloakForgotPassword` |
| `/_internal/keycloak-change-password` | `POST /api/keycloakChangePassword` |

Password / OTP body: plain `password` / `otp` over HTTPS, or encrypted `password_secret` / `otp_secret` when RSA keys are configured.

## 6. After login — `establish_session`

Unchanged: shell POSTs to `/establish_session` with `auth_response`. CakePHP creates session and redirects.

## 7. Logged-in header

Pass `userSession` JSON on every page (header does not read cookies for UI).

## 8. Cookies

Use `cookie-domain=".local.com"` (not `localhost`) when host is `digisevak.local.com`.

On HTTPS, set CakePHP cookies with `secure => true`, `httpOnly => true`.
