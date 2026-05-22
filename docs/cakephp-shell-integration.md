# CakePHP — CDN shell integration (Header / Footer)

Use the **Web Component shell** (`dist/shell/`) when the host app is **not** React (CakePHP, Blade, WordPress, plain HTML).

The npm package (`import { Header } from "mybharat_common_frontend"`) remains for React apps. Both share the same source code.

---

## 1. Files you need from this repo

After `npm run build`:

| File | Purpose |
|------|---------|
| `dist/shell/shell.js` | Registers `<mybharat-header>` and `<mybharat-footer>` |
| `dist/shell/mybharat-shell.css` | Header + Footer styles (default `variant="header"`) |
| `dist/shell/header2.css` | Header2 styles only — pair with `footer.css` |
| `dist/shell/footer.css` | Footer styles only (for Header2 layouts) |
| `dist/shell/manifest.json` | Version + file list |

---

## 2. CDN URLs

### Local / dev test

1. Run `npm run build` in this repo.
2. Serve the repo root: `npx serve .`
3. Open `http://localhost:3000/demo/cakephp-shell.html`

Or publish a **git tag** and use jsDelivr ([`rahultiwari-trigyn-1993/mybharat_common_frontend`](https://github.com/rahultiwari-trigyn-1993)):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/mybharat-shell.css" />
<script src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/shell.js" defer></script>
```

See [`docs/github-cdn-publish.md`](github-cdn-publish.md) for push steps.

### Production

Upload `dist/shell/*` to S3 → CloudFront, e.g.:

```html
<link rel="stylesheet" href="https://cdn-prod.mybharats.in/shell/shell@v1.0.163.css" />
<script src="https://cdn-prod.mybharats.in/shell/shell@v1.0.163.js" defer></script>
```

Use **immutable versioned filenames** — do not use `@latest` on live sites.

---

## 3. CakePHP layout (minimal)

In your layout (replacing or alongside `header.ctp` / `footer_external.ctp` fragments):

```php
<?php
// Controller should set $cdnPath, $headerNavJson, $isLoggedIn, $recaptchaKey
$cdnPath = Configure::read('cdn_path'); // e.g. https://cdn-prod.mybharats.in/mybharat — no trailing slash
$shellBase = 'https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell'; // dev GitHub CDN
// $shellBase = 'https://cdn-prod.mybharats.in/shell'; // production
?>
<link rel="stylesheet" href="<?= h($shellBase) ?>/mybharat-shell.css" />
<script>
  window.MYBHARAT_SHELL = {
    header: {
      cdnBase: <?= json_encode(rtrim($cdnPath, '/')) ?>,
      variant: 'header'
    },
    footer: {
      isLoggedIn: <?= !empty($ufdl_id) ? 'true' : 'false' ?>,
      recaptchaSiteKey: <?= json_encode(Configure::read('GOOGLE_CAPTCHA_SITE_KEY') ?? '') ?>
    }
  };
</script>
<script type="application/json" id="mybharat-header-nav"><?= $headerNavJson ?></script>

<mybharat-header nav-json-id="mybharat-header-nav"></mybharat-header>

<!-- Your page content -->
<?= $this->fetch('content') ?>

<mybharat-footer></mybharat-footer>

<script src="<?= h($shellBase) ?>/shell.js" defer></script>
```

**Nav JSON:** fetch in the **CakePHP controller** (API or CDN URL), `json_encode` the array, and output into `#mybharat-header-nav`. The shell **must not** call `fetch` for menu data.

Example controller sketch:

```php
// Fetch from your API or https://cdn-beta.mybharats.in/master/header.json
$headerNavJson = json_encode($navItemsArray);
$this->set(compact('headerNavJson', 'ufdl_id'));
```

---

## 4. What stays in CakePHP (do not remove)

Per `docs/header-ctp-reference.md` and `docs/footer-ctp-reference.md`:

| Still in host app | Why |
|-------------------|-----|
| Login / OTP modals (`#signInModal`, `#loginWithOtpModal`, …) | Shell only renders `#signInLink`; jQuery opens host modals |
| jQuery handlers for `#btnGroupDrop1`, `#signInLink` | Sign In / Register desktop + mobile |
| PHP session (`$ufdl_id`, user type, language) | Logged-in mobile drawer not in shell yet |
| Feedback form **submit** AJAX | Shell renders modals; host posts to API |
| Bhashini / page-specific scripts | As today |

Listen for shell events if you prefer over jQuery:

```javascript
document.addEventListener('mb:registered-user-click', function () {
  // open #loginWithOtpModal
});
document.addEventListener('mb:ready', function (e) {
  console.info('Shell ready', e.detail);
});
```

---

## 5. Custom element attributes

### `<mybharat-header>`

| Attribute | Example | Notes |
|-----------|---------|--------|
| `variant` | `header` (default) or `header2` | Only one header per page |
| `cdn-base` | `https://cdn-prod.mybharats.in/mybharat` | Overrides `window.MYBHARAT_SHELL.header.cdnBase` |
| `nav-json-id` | `mybharat-header-nav` | Points to `<script type="application/json">` — **recommended for CakePHP** |
| `nav-items` | `'[{"type":"link",...}]'` | Inline JSON (escape carefully in PHP) |
| `title` | `MyBharat` | `aria-label` on header |

For **Header2**: use `variant="header2"`, load `header2.css` + `footer.css` instead of `shell.css`.

### `<mybharat-footer>`

| Attribute | Example |
|-----------|---------|
| `cdn-base` | CDN asset base |
| `is-logged-in` | `true` / `false` |
| `recaptcha-site-key` | Google site key |

---

## 6. Body padding

The header is `fixed-top`. Add top padding on the host body/main (your CakePHP layout likely already does this for `header.ctp`).

---

## 7. Rules

1. **One** of `<mybharat-header>` or `<mybharat-header variant="header2">` per page — not both.
2. Host fetches nav; shell only renders it.
3. Pin shell **version** in script/style URLs.
4. If Bootstrap is already loaded by Cake, watch for duplicate Bootstrap (modals). The shell injects Bootstrap from CDN when needed — see README / header reference if modals misbehave.

---

## 8. Verify

1. Header + footer visible.
2. Mobile hamburger opens `#mobileMenuNew`.
3. Sign In in drawer triggers host login (jQuery or `mb:registered-user-click` / modal).
4. Feedback button opens footer modals.
5. DevTools → Sources → confirm banner `mybharat_shell@v1.0.163`.

See also: `demo/cakephp-shell.html` in this repo.
