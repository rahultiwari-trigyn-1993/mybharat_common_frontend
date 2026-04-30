# MY Bharat `header.ctp` — parity reference

This document captures the **CakePHP `header.ctp`** structure the React `Header` / `MobileMenuModal` are aligned to. The canonical source lives in the PHP app (`View/Elements/` or equivalent); paste updates here when the portal header changes.

## React note: `#mobileMenuNew` is portaled to `document.body`

Bootstrap appends `.modal-backdrop` to `body`. If the modal lived inside `header.fixed-top` (inside the app `#root`), the backdrop could stack **above** the entire `#root` layer and **block all clicks** on the drawer (dimmed / “blurred” look). The library renders `MobileMenuModal` with `createPortal(..., document.body)` so the modal is a direct `body` child and stacks correctly above the backdrop.

## What stays in the host (Cake) app

- PHP session: `$userType`, `$session_user`, `$language`, `$authDistrict`, partner OAuth URLs, etc.
- **All login / OTP / forgot-password modals** and their markup: `#signInModal`, `#forgotPwdModal`, `#otpVerifyForgotPwdModal`, `#newPasswordModal`, `#successModal`, `#loginWithOtpModal`, `#loginWIthOtpVerifyModal`, `#autoLoadInfo`, `#loader`
- **jQuery** handlers (`#btnGroupDrop1`, `#signInLink`, …) that open those modals and call `/pages/signIn`, etc.
- **Choices.js**, **manipuri_text_v1.css**, and other page-specific assets not bundled in this npm package

This library supplies the **shell header**, **Bootstrap + FA + datepicker** (see `Header.tsx` `useEffect`), **`#mobileMenuNew`** drawer (guest menu + nav links), and **Header.css** rules ported from the inline `<style>` block where applicable.

## Critical DOM ids / classes (legacy scripts)

| Selector | Role |
|----------|------|
| `#mobileMenuNew` | Left mobile nav drawer (`modal left fade`) |
| `#mb_menus`, `[data-bs-target="#mobileMenuNew"]` | Hamburger opens drawer |
| `#signInLink` | Guest “Sign In” in drawer; host jQuery opens OTP login modal |
| `#btnGroupDrop1`, `#btnGroupDrop2` | Desktop Sign In / Register (host binds login) |
| `#bhashini-mobile-header`, `#bhashini-desktop-header` | Bhashini widget mount targets |
| `#mobile-menu` | **Both** tablet quick nav and desktop `<nav>` used this id in `.ctp` (duplicate HTML id). React uses **`#mb-nav-mobile-quick`** and **`#mb-nav-desktop-main`** instead; update host scripts if they queried `#mobile-menu`. |
| `#decreasetext`, `#resettext`, `#increasetext` | Font size controls |

## `#mobileMenuNew` (guest branch) — structure

- Outer: `div.modal.left.fade#mobileMenuNew`
- `modal-dialog` → `modal-content` → `modal-header` (logo in `h5.modal-title`) → `modal-body`
- Body: `div.m-menu` → `ul` of primary links (`<a><li>` in legacy; valid HTML is `<li><a>`)
- Then guest block: Sign In (`#signInLink`, `href="#"` or `javascript:void(0)`), Register
- **Accordion** `#accordionExamples`: “Get Started” → Youth (`yuva_register`) + Partner (`partner_register`) with `f-10-dropdown` helper lines

Logged-in drawer branch (Dashboard, profile, switch district, logout, etc.) is **not** duplicated in the library; render that from the host or extend `MobileMenuModal` with props when you wire session.

## Inline CSS themes (`.ctp` → `Header.css`)

Already mirrored or partially mirrored in `Header.css`:

- `.modal.left .modal-dialog` — fixed right, 75% width, full height slide-in
- `@media (max-width: 600px)` — `.modal-content` transform slide, `.lang_mobile`, accordion collapsed colour (legacy `.mb_new1` absolute removed; mobile bar uses flex in React)
- `@media (max-width: 1000px)` — hide `.header-top` / `.main-menu`, show `.d-sm-none1`, toll `#toll_mb` rules
- `@media (max-width: 999px)` — `#mb_menus`, `#toll_mb`, `.bhashini-plugin-container` positions, `svg path` fill
- Dropdown / button colours: `.btn-outline-primary`, `#btnGroupDrop1:hover`, `.dropdown-menu-header`, `.carrot_dn`, etc.

## CDN paths

`.ctp` uses `Configure::read('cdn_path')` (trailing slash). This package uses `MYBHARAT_CDN_BASE` in `src/constants/cdn.ts` (`https://cdn-prod.mybharats.in/mybharat`).

## Popper + Bootstrap

`header.ctp` loads `popper.min.js` before Bootstrap. This package injects **`popper.min.js`** then **`bootstrap.min.js`** so modals work when not using `bootstrap.bundle.min.js`.
