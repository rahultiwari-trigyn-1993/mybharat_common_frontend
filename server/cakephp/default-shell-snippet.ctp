<?php
/**
 * Reference layout for CakePHP `View/Layouts/default.ctp` (shell v1.0.245+).
 */

if (!isset($isLoggedIn)) {
    $isLoggedIn = !empty($this->Session->read('User.ID'));
    $userSession = $this->Session->read('User');
}

if (!isset($headerNavItems)) {
    $headerNavItems = json_decode(file_get_contents('https://cdn-beta.mybharats.in/master/header.json'), true);
}

$mybharatBaseUrl = Configure::read('base_url');
$mybharatApiBaseUrl = Configure::read('API_BASEURL');
$mybharatRewardsApiBaseUrl = Configure::read('REWARDS_API_BASEURL');
$mybharatOauthUsername = Configure::read('MybharatShell.MYBHARAT_OAUTH_USERNAME') ?: '';
$mybharatOauthPassword = Configure::read('MybharatShell.MYBHARAT_OAUTH_PASSWORD') ?: '';
$mybharatPublicProfileApiBaseUrl = Configure::read('PUBLIC_PROFILE_API_BASE_URL');

if (!empty($_SERVER['HTTP_HOST']) && stripos($_SERVER['HTTP_HOST'], 'local') !== false) {
    $mybharatBaseUrl = Router::url('/', true);
}

$headerUserPayload = null;
if (!empty($isLoggedIn) && !empty($userSession)) {
    $headerUserPayload = array(
        'status_code' => 200,
        'data' => array(
            'id' => (int)$userSession['ID'],
            'first_name' => !empty($userSession['first_name'])
                ? $userSession['first_name']
                : (!empty($userSession['FirstName']) ? $userSession['FirstName'] : ''),
            'user_type' => isset($userSession['UserType']) ? (int)$userSession['UserType'] : null,
            'username' => !empty($userSession['username']) ? $userSession['username'] : '',
        ),
    );
}

$mybharatShellVersion = 'v1.0.245';
$mybharatShellCdn = 'https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@' . $mybharatShellVersion . '/dist/shell/';
?>

<!--
  IMPORTANT: place mybharat-shell.css AFTER host bootstrap.min.css and default.css
  in default.ctp so shell logo/dropdown rules win over Cake theme CSS.
-->
<link rel="stylesheet" href="<?php echo h($mybharatShellCdn . 'mybharat-shell.css'); ?>" />

<script type="text/javascript">
    window.MYBHARAT_SHELL = {
        header: {
            cdnBase: <?php echo json_encode($cdn_path); ?>,
            variant: 'header',
            userSession: <?php echo json_encode($headerUserPayload, JSON_UNESCAPED_SLASHES); ?>,
        },
        footer: {
            isLoggedIn: <?php echo !empty($isLoggedIn) ? 'true' : 'false'; ?>,
            feedbackApiBaseUrl: <?php echo json_encode($mybharatApiBaseUrl); ?>,
            rewardsApiBaseUrl: <?php echo json_encode($mybharatRewardsApiBaseUrl); ?>,
            userSession: <?php echo json_encode($headerUserPayload, JSON_UNESCAPED_SLASHES); ?>,
        },
        login: {
            baseUrl: <?php echo json_encode($mybharatBaseUrl); ?>,
            apiBaseUrl: <?php echo json_encode($mybharatApiBaseUrl); ?>,
            environment: 'local',
            oauthUsername: <?php echo json_encode($mybharatOauthUsername); ?>,
            oauthPassword: <?php echo json_encode($mybharatOauthPassword); ?>,
            publicProfileApiBaseUrl: <?php echo json_encode($mybharatPublicProfileApiBaseUrl); ?>,
            crossOriginApi: true,
        },
    };
</script>

<script type="application/json" id="mybharat-header-nav">
<?php echo json_encode(isset($headerNavItems) ? $headerNavItems : array(), JSON_UNESCAPED_SLASHES | JSON_HEX_TAG); ?>
</script>

<script type="application/json" id="mybharat-user-session">
<?php echo json_encode($headerUserPayload, JSON_UNESCAPED_SLASHES | JSON_HEX_TAG); ?>
</script>

<mybharat-header
    nav-json-id="mybharat-header-nav"
    user-json-id="mybharat-user-session"
    login-base-url="<?php echo h($mybharatBaseUrl); ?>"
    api-base-url="<?php echo h($mybharatApiBaseUrl); ?>"
    oauth-username="<?php echo h($mybharatOauthUsername); ?>"
    oauth-password="<?php echo h($mybharatOauthPassword); ?>"
    environment="local"
    cdn-base="<?php echo h($cdn_path); ?>"
></mybharat-header>

<main style="padding-top: 5px">
    <?php echo $this->fetch('content'); ?>
</main>

<mybharat-footer
    is-logged-in="<?php echo !empty($isLoggedIn) ? 'true' : 'false'; ?>"
    feedback-api-base-url="<?php echo h($mybharatApiBaseUrl); ?>"
    rewards-api-base-url="<?php echo h($mybharatRewardsApiBaseUrl); ?>"
    user-json-id="mybharat-user-session"
></mybharat-footer>

<script src="<?php echo h($mybharatShellCdn . 'shell.js'); ?>" defer></script>
