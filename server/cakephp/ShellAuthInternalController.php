<?php
declare(strict_types=1);

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Core\Configure;
use Cake\Http\Response;

/**
 * Reference BFF for MY Bharat shell login (CDN / web component).
 *
 * Copy to your CakePHP app and wire routes — see docs/cakephp-shell-auth-bff.md
 *
 * @property \Cake\Http\Client $http
 */
class ShellAuthInternalController extends Controller
{
    public function initialize(): void
    {
        parent::initialize();
        $this->request->allowMethod(['post']);
        $this->autoRender = false;
    }

    public function dispatch(): Response
    {
        $path = $this->request->getPath();
        $suffix = preg_replace('#^.*/_internal/#', '', $path) ?? '';

        try {
            $payload = match ($suffix) {
                'kc-client' => $this->kcClient(),
                'guest-oauth' => $this->guestOauth(),
                'login-pubkey' => $this->loginPubkey(),
                'send-guest-otp' => $this->sendGuestOtp(),
                'verify-guest-otp' => $this->verifyGuestOtp(),
                'check-user-exists' => $this->checkUserExists(),
                'keycloak-login' => $this->keycloakLogin(),
                'keycloak-exchange-token' => $this->keycloakExchangeToken(),
                'keycloak-forgot-password' => $this->keycloakForgotPassword(),
                'keycloak-change-password' => $this->keycloakChangePassword(),
                default => ['status_code' => 404, 'message' => 'Unknown internal route'],
            };
        } catch (\Throwable $e) {
            $payload = ['status_code' => 502, 'message' => $e->getMessage()];
        }

        $status = (int)($payload['status_code'] ?? 200);
        if ($status < 100 || $status > 599) {
            $status = 200;
        }

        return $this->response
            ->withType('application/json')
            ->withStatus($status)
            ->withStringBody((string)json_encode($payload));
    }

    private function apiOrigin(): string
    {
        return rtrim((string)Configure::read('MyBharat.apiOrigin', env('MYBHARAT_API_ORIGIN', '')), '/');
    }

    private function oauthCredentials(): array
    {
        return [
            'username' => (string)Configure::read('MyBharat.oauthUsername', env('MYBHARAT_OAUTH_USERNAME', '')),
            'password' => (string)Configure::read('MyBharat.oauthPassword', env('MYBHARAT_OAUTH_PASSWORD', '')),
        ];
    }

    private function jsonBody(): array
    {
        $raw = (string)$this->request->getBody();
        if ($raw === '') {
            return [];
        }
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    private function readSecret(array $body, string $plainField, string $encryptedField): string
    {
        $plain = trim((string)($body[$plainField] ?? ''));
        if ($plain !== '') {
            return $plain;
        }
        // TODO: decrypt $body[$encryptedField] with LOGIN_PAYLOAD_PRIVATE_KEY when configured.
        throw new \RuntimeException("Missing {$plainField}.");
    }

    private function gatewayJson(string $path, array $body, ?string $bearer = null): array
    {
        $headers = ['Accept' => 'application/json', 'Content-Type' => 'application/json'];
        if ($bearer) {
            $headers['Authorization'] = 'Bearer ' . preg_replace('/^bearer\s+/i', '', $bearer);
        }
        $http = new \Cake\Http\Client();
        $response = $http->post($this->apiOrigin() . '/api' . $path, json_encode($body), ['headers' => $headers]);
        return $response->getJson() ?? ['status_code' => $response->getStatusCode(), 'message' => $response->getStringBody()];
    }

    private function gatewayForm(string $path, array $form, string $bearer): array
    {
        $http = new \Cake\Http\Client();
        $response = $http->post($this->apiOrigin() . '/api' . $path, $form, [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . preg_replace('/^bearer\s+/i', '', $bearer),
            ],
        ]);
        return $response->getJson() ?? ['status_code' => $response->getStatusCode(), 'message' => $response->getStringBody()];
    }

    private function kcClient(): array
    {
        $data = $this->gatewayJson('/getKeycloakClientAccessToken', []);
        $token = $data['access_token'] ?? $data['accessToken'] ?? '';
        if (!$token) {
            return $data;
        }
        return ['status_code' => 200, 'access_token' => $token, 'token_type' => 'Bearer'];
    }

    private function guestOauth(): array
    {
        $cred = $this->oauthCredentials();
        $http = new \Cake\Http\Client();
        $response = $http->post($this->apiOrigin() . '/api/oauth', $cred, [
            'headers' => ['Accept' => 'application/json'],
        ]);
        $data = $response->getJson() ?? [];
        $token = $data['access_token'] ?? '';
        if (!$token) {
            return ['status_code' => 502, 'message' => 'OAuth token failed'];
        }
        return ['status_code' => 200, 'access_token' => $token, 'token_type' => 'Bearer'];
    }

    private function loginPubkey(): array
    {
        $pem = (string)env('LOGIN_PAYLOAD_PUBLIC_KEY', '');
        if ($pem === '') {
            return ['status_code' => 503, 'message' => 'Login payload encryption is not configured on the host.'];
        }
        return ['status_code' => 200, 'public_key' => str_replace('\\n', "\n", $pem)];
    }

    private function sendGuestOtp(): array
    {
        $body = $this->jsonBody();
        $token = ($this->guestOauth())['access_token'] ?? '';
        return $this->gatewayForm('/sendMobileGuestUserOtp', array_map('strval', $body), $token);
    }

    private function verifyGuestOtp(): array
    {
        $body = $this->jsonBody();
        $otp = $this->readSecret($body, 'otp', 'otp_secret');
        $token = ($this->guestOauth())['access_token'] ?? '';
        return $this->gatewayForm('/verifyGuestUserOtp', [
            'otp' => $otp,
            'user_email' => (string)($body['user_email'] ?? ''),
            'user_phone' => (string)($body['user_phone'] ?? ''),
        ], $token);
    }

    private function checkUserExists(): array
    {
        $body = $this->jsonBody();
        $identifier = trim((string)($body['identifier'] ?? ''));
        $token = ($this->kcClient())['access_token'] ?? '';
        return $this->gatewayJson('/checkUserExists', ['identifier' => $identifier], $token);
    }

    private function keycloakLogin(): array
    {
        $body = $this->jsonBody();
        $username = trim((string)($body['username'] ?? ''));
        $password = $this->readSecret($body, 'password', 'password_secret');
        $token = ($this->kcClient())['access_token'] ?? '';
        return $this->gatewayJson('/keycloakLogin', compact('username', 'password'), $token);
    }

    private function keycloakExchangeToken(): array
    {
        $body = $this->jsonBody();
        $token = ($this->kcClient())['access_token'] ?? '';
        return $this->gatewayJson('/keycloakGetExchangeToken', [
            'username' => (string)($body['username'] ?? ''),
            'reg_code' => (string)($body['reg_code'] ?? ''),
        ], $token);
    }

    private function keycloakForgotPassword(): array
    {
        $body = $this->jsonBody();
        $token = ($this->kcClient())['access_token'] ?? '';
        return $this->gatewayJson('/keycloakForgotPassword', [
            'identifier' => (string)($body['identifier'] ?? ''),
            'reg_code' => (string)($body['reg_code'] ?? ''),
        ], $token);
    }

    private function keycloakChangePassword(): array
    {
        $body = $this->jsonBody();
        $password = $this->readSecret($body, 'password', 'password_secret');
        $token = ($this->kcClient())['access_token'] ?? '';
        return $this->gatewayJson('/keycloakChangePassword', [
            'userId' => $body['userId'] ?? '',
            'dlId' => $body['dlId'] ?? '',
            'password' => $password,
        ], $token);
    }
}
