# `footer_external.ctp` → React `Footer` parity

## What this package ships

- **`Footer.tsx`**: Main `#footer_external` shell — logos, copy, **Important / Useful** link columns, **Follow Us** social strip, **Powered by Digital India**, bottom **`pricy1_a`** bar (copyright + Terms / Privacy).
- **`FooterFeedbackModals.tsx`**: Bootstrap modals `#feed_back1` (Guest vs Registered), `#feed_back` (rating + feedback form), `#successToaster` — portaled to `document.body` for stacking (same idea as `MobileMenuModal`).
- **`Footer.css`**: Styles ported from the inline `<style>` block in the `.ctp` (footer, social icons, modal shells).

## What stays in the host (Cake / portal)

- **PHP session / i18n**: `$language[...]` strings — React uses English defaults; host can replace copy via wrapper or future props.
- **`$ufdl_id` / logged-in user**: Pass **`isLoggedIn`** to `Footer` — controls feedback modal target (`#feed_back` vs `#feed_back1`) and whether captcha + name/mobile/email fields render (matches `isset($ufdl_id)`).
- **AJAX submit**: Posts to APIGateway **`/saveFeedbackData`** (port of CakePHP `saveUserFeedback()`). Guest fields + reCAPTCHA; logged-in uses `userSession`. Optional reward trigger via **`/trigger-youth-reward-points`**. Configure `feedbackApiBaseUrl` (e.g. `/api` on Vite hosts) or rely on `MYBHARAT_SHELL.login.apiBaseUrl`.
- **`#loginWithOtpModal`**: Registered-user flow still opens that modal from the host app — pass **`onRegisteredUserClick`** from the consumer or rely on global Bootstrap + existing DOM id.
- **jQuery blocks** at bottom of `.ctp` (font resize, quiz popup, click counters, etc.) — not bundled; load in host if needed.
- **`Configure::read('GOOGLE_CAPTCHA_SITE_KEY')`**: Pass **`recaptchaSiteKey`** prop when embedding the feedback form with captcha.

## Legacy DOM ids / classes (host scripts)

| Selector | Role |
|----------|------|
| `#footer_external` | Root footer |
| `#feedback_mdl_btn` | Opens feedback modal (`data-bs-target` set from `isLoggedIn`) |
| `#feed_back`, `#feed_back1`, `#successToaster` | Feedback modals |
| `#feedbackFrm`, `#user_feedback`, `#guest_usr`, `#regi_usr` | Form / choice buttons |
| `lang_*` classes | i18n hooks |

## CDN

Same as `Header`: **`cdnBase`** optional prop; defaults to `MYBHARAT_CDN_BASE` from `src/constants/cdn.ts`.
