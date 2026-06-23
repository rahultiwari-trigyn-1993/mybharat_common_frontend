# CSS & CDN dependency inventory

Inventory of **where styles/scripts load from**, **what duplicates**, and **what hosts can remove safely** when consolidating to one bundled CSS — without changing Header / Header2 / Footer design or logic.

**Related:** [`header-ctp-reference.md`](header-ctp-reference.md) · [`cakephp-shell-integration.md`](cakephp-shell-integration.md)

---

## 1. Executive summary

| Layer | Today | Conflict driver |
|-------|--------|-----------------|
| **Package bundle** | `dist/index.css` / `dist/shell/mybharat-shell.css` (~2.5k lines custom CSS) | Scoped rules + `!important` to beat host |
| **Runtime inject** (every `Header` / `Header2` mount) | Bootstrap CSS, Bootstrap Icons, Font Awesome, Popper + Bootstrap JS, datepicker | **Duplicates** host `bootstrap.min.css` |
| **Host apps** (e.g. registration) | `default.css` (~130KB legacy Cake), Bootstrap again, Choices.js | **Overrides** shell layout/colors |
| **Images / fonts** | mybharat CDN + digitallocker Font Awesome | Not CSS conflicts; still external |

**Phase 1 (v1.0.230+):** Bootstrap, Bootstrap Icons, and Font Awesome are **bundled** into `dist/index.css` / `dist/shell/mybharat-shell.css` with fonts under `dist/vendor/` (and `dist/shell/vendor/`). Runtime CDN inject from `useMbHeaderBootstrapAndPortal` is **removed**. Hosts should drop duplicate Bootstrap/icons links when ready (Phase 2).

**Revert checkpoint:** see [`CHECKPOINT.md`](CHECKPOINT.md) — tag **`v1.0.229`**.

---

## 2. What this package already bundles (build output)

Built by `tsup` (`tsup.config.js` + `injectStyle: true`).

### npm / React

| File | Contents | When to import |
|------|----------|----------------|
| `dist/index.css` | `Header.common.css` + `HeaderLogin.css` + `Header.css` + `Footer.css` | `import "mybharat_common_frontend/style.css"` |
| `dist/header2.css` | `Header.common.css` + `HeaderLogin.css` + `Header2.css` | Header2 only — **not** in default `style.css` |

### CDN shell (Web Components)

| File | Contents |
|------|----------|
| `dist/shell/mybharat-shell.css` | Same as `index.css` (Header + Footer) — **use on jsDelivr** |
| `dist/shell/shell.css` | Same content (local / npm path) |
| `dist/shell/header2.css` | Header2 variant |
| `dist/shell/footer.css` | Footer only (Header2 layouts) |
| `dist/shell/shell.js` | React + components + **injects CSS via build** |

**Source files (repo):**

| File | ~Size | Role |
|------|-------|------|
| `src/components/header/Header.common.css` | Gov strip, `.font01`, Bhashini hooks, shared nav auth flex |
| `src/components/Header.css` | Default header layout, mobile bar, modals drawer, profile dropdown |
| `src/components/Header2.css` | Header2-specific overrides |
| `src/components/Footer.css` | Footer + feedback modal styles |
| `src/components/header/login/HeaderLogin.css` | Login / OTP modals |

**Not bundled:** Bootstrap grid/utilities, Bootstrap Icons font CSS, Font Awesome, `default.css` slices.

---

## 3. Runtime CDN injection (package — on Header mount)

**Source:** `src/components/header/useMbHeaderBootstrapAndPortal.ts`  
**Triggered by:** `Header.tsx`, `Header2.tsx` (via `useMbHeaderBootstrapAndPortal(cdn)`)

| ID | Type | URL pattern | Purpose |
|----|------|-------------|---------|
| `mb-bootstrap-css` | CSS | `{cdnBase}/assets/css/bootstrap.min.css` | Grid, `.btn`, `.modal`, `.navbar`, utilities |
| `mb-bootstrap-icons-css` | CSS | `{cdnBase}/assets/css/bootstrap-icons.css` | `bi bi-*` in login modals |
| `mb-fontawesome-css` | CSS | `https://img1.digitallocker.gov.in/nad/v-22/assets/css/fontawesome.min.css` | `fa fa-bars`, chevrons, profile icons |
| `mb-popper-js` | JS | `{cdnBase}/assets/js/popper.min.js` | Bootstrap positioning |
| `mb-bootstrap-js` | JS | `{cdnBase}/assets/js/bootstrap.min.js` | Modals, dropdowns, collapse |
| `mb-bootstrap-datepicker-js` | JS | `{cdnBase}/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js` | Date fields in login flows |

`cdnBase` defaults:

- `Header` → `https://cdn-prod.mybharats.in/mybharat` (`MYBHARAT_CDN_BASE`)
- `Header2` → `https://cdn-beta.mybharats.in/mybharat` (`MYBHARAT_CDN_BASE_BETA`)

**Note:** `default.css` inject is **commented out** in code (line 31).

---

## 4. Image / asset URLs (CDN — not CSS, but same origin)

Used for `<img src>` only; removing CSS CDN does **not** remove these.

| Area | Example path |
|------|----------------|
| Gov strip flag | `{cdn}/assets/img/mybharat/Flag%20of%20India.png` |
| Logos | `{cdn}/assets/img/yuva_landing/YASLogo_opt_2x.png`, `mybharatlogo_opt_2x.png` |
| Social icons | `{cdn}/assets/img/icon/twitter_v10.png`, … |
| Feedback / login | `{cdn}/assets/img/yuva_landing/mega_checkcircle.png`, … |

Hosts set `cdn-base` / `cdnBase` prop or `window.MYBHARAT_SHELL.header.cdnBase`.

---

## 5. Host app loading — registration frontend (reference)

**Repo:** `mybharat_registration_frontend` (linked `file:../mybharat_common_frontend`)

### `index.html` (loads **before** React)

| Order | URL | Overlaps with package? |
|-------|-----|-------------------------|
| 1 | `%VITE_CDN_PATH%/assets/css/bootstrap.min.css` | **Yes** — same as runtime inject |
| 2 | `%VITE_BOOTSTRAP_ICONS_CSS_URL%` (often jsDelivr bootstrap-icons) | **Yes** — different URL, same icons |
| 3 | `%VITE_CDN_PATH%/css/default.css` | **Partial** — legacy Cake global rules; fights shell `!important` |
| 4 | `%VITE_CDN_PATH%/assets/css/choices.min.css` | **No** — registration dropdowns only |

### `src/main.tsx`

| Import | Overlaps? |
|--------|-----------|
| `mybharat_common_frontend/style.css` | Package bundle — **keep** |
| `./styles/registration.css` | Host SPA overrides — **keep** (scoped to `.reg-page`, modals) |

### When `<Header />` mounts

Runtime inject runs again → **second** Bootstrap CSS/JS if ids not already present (inject skips if `#mb-bootstrap-css` exists — so **first** loader wins; still two sources in HTML if host loaded first).

---

## 6. Host app loading — CDN shell (CakePHP / demo)

**Demo:** `demo/cakephp-shell.html`

| Loads | Does **not** load |
|-------|-------------------|
| `mybharat-shell.css` + `shell.js` | `default.css`, host Bootstrap (in demo) |

**Production CakePHP** (typical legacy layout) often still has:

- `default.css`, `bootstrap.min.css`, `manipuri_text_v1.css`, Choices, page CSS
- **Plus** new `mybharat-shell.css` + `shell.js`

See [`cakephp-shell-integration.md`](cakephp-shell-integration.md) §7 — duplicate Bootstrap called out.

---

## 7. Duplicate & conflict matrix

| Rule / asset | Defined in | Conflicts with |
|--------------|------------|----------------|
| `.container`, `.row`, `.col-*`, `.btn`, `.modal` | Bootstrap (host + inject) | Double load, version skew |
| `.header-top`, `.main-menu`, `.litext`, `.footer-links` | `default.css` **and** package CSS | Alignment, font-size, link color |
| `.header-top .font01 { font-size: 12px }` | `default.css` | Package `Header.common.css` uses 13px — gov strip A/A+/−A |
| `header.fixed-top`, body padding | Host + `registration.css` `--mb-header-offset` | Must stay coordinated |
| `.dropdown-menu`, `[data-bs-popper]` | Bootstrap JS + `Header.css` z-index rules | Modal stacking if Bootstrap loaded twice |
| Font Awesome `fa-*` | digitallocker CDN | Host may load different FA version |
| Bootstrap Icons `bi-*` | mybharat CDN vs jsDelivr | Usually OK if one wins |

**Highest-impact conflict:** host **`default.css`** + package **`index.css`** on the same page.

---

## 8. What can be removed safely (by host type)

### A) React host using npm `Header` + `Footer` (e.g. registration)

| Remove / stop loading | When safe | Keep |
|------------------------|-----------|------|
| `bootstrap.min.css` from `index.html` | After Bootstrap is **bundled or single inject** from package only | Package `style.css` |
| Second Bootstrap Icons link | After icons bundled once | One icons CSS |
| **`default.css` for header/footer region** | After visual QA on all breakpoints | Slices needed for **non-shell** pages only |
| `choices.min.css` | Never for shell — only if registration forms need Choices | Registration forms |

**Do not remove yet:**

- `registration.css` — host content layout
- Package `style.css`
- `cdnBase` images

### B) CDN shell only (CakePHP — header/footer replaced)

| Remove from layout | When safe |
|--------------------|-----------|
| Old `header.ctp` / `footer_external.ctp` **inline styles** that duplicate shell | After shell parity sign-off |
| `default.css` rules targeting `.header-top`, `#footer_external`, `#mobileMenuNew` | After QA — **or** load trimmed `default-shell-compat.css` |
| Duplicate `bootstrap.min.css` | If shell provides sole Bootstrap (Phase 1 bundle) |

| Keep (for now) | Reason |
|----------------|--------|
| Page-specific CSS (quiz, registration body, etc.) | Not in shell |
| `manipuri_text_v1.css` | Language fonts if used |
| jQuery + legacy page scripts | Non-shell pages |

### C) Hybrid (shell + legacy Cake body)

Load order recommendation (future):

1. Bootstrap + icons + FA (**once**)
2. `mybharat-shell.css` / `style.css`
3. Host page CSS (minimal)
4. **Avoid** full `default.css` if shell replaces header/footer

---

## 9. What must stay (until code changes)

| Dependency | Why |
|------------|-----|
| **Bootstrap JavaScript** | `data-bs-toggle`, modals, dropdowns, `#mobileMenuNew`, feedback modals |
| **Popper** | Bootstrap 5 requirement |
| **Font Awesome CSS** | `fa fa-bars`, nav chevrons, profile menu icons |
| **Bootstrap Icons CSS** | Login modals (`bi-eye-slash`, `bi-arrow-left`, …) |
| **Custom package CSS** | Cake parity, mobile drawer, footer columns, login modal layout |
| **mybharat CDN images** | Logos, flags, social PNGs (unless vendored to package) |
| **Legacy class names** | `fontchange14`, `litext`, `#footer_external`, host script hooks |

**Optional / low usage:** `bootstrap-datepicker.js` — only if login/date UI uses it; confirm before dropping.

---

## 10. Recommended consolidation phases (no Tailwind)

### Phase 1 — Single source for framework CSS/JS (package)

- [ ] Add npm deps: `bootstrap`, `@popperjs/core`, `bootstrap-icons`, `@fortawesome/fontawesome-free` (or subset)
- [ ] Import framework CSS **once** in build (or copy into `dist/vendor/`)
- [ ] Replace runtime CDN `<link>` / `<script>` inject with bundled imports **or** single self-hosted `dist/vendor/*.css`
- [ ] Remove digitallocker Font Awesome URL (replace with vendored FA)

**Host change:** remove `bootstrap.min.css` + duplicate icons from `index.html`.

### Phase 2 — Host `default.css` diet

- [ ] Audit `default.css` rules that touch `#footer_external`, `.header-top`, `.main-menu`, `.modal.left`
- [ ] Document “shell replaces header/footer” → hosts stop loading full `default.css` on those routes
- [ ] Optional: publish `default-shell-trimmed.css` (only page-body rules) from Cake team

**Host change:** registration drops `default.css` or loads trimmed file.

### Phase 3 — Stricter scoping (if conflicts remain)

- [ ] Prefix host overrides under `#root` / `.reg-app-main` only
- [ ] Shell already uses `#mb-common-header-root`, `#footer_external.mb-common-footer`

### Phase 4 (optional, later) — Tailwind for **new** UI only

Not required for conflict resolution.

---

## 11. Checklists

### Registration frontend (`mybharat_registration_frontend`)

**Current load order:**

```
index.html: bootstrap.min.css → bootstrap-icons → default.css → choices.min.css
main.tsx:   mybharat_common_frontend/style.css → registration.css
Header mount: bootstrap + icons + FA + JS (skipped if ids exist)
```

**Target load order (Phase 1–2):**

```
package: style.css (includes shell + vendored bootstrap/icons/FA)
main.tsx: registration.css
Header mount: JS only (or JS also bundled)
index.html: choices.min.css only (+ page fonts if needed)
```

### CakePHP shell embed

**Current (ideal demo):**

```
mybharat-shell.css + shell.js only
cdnBase for images
(runtime bootstrap inject still runs on header connect)
```

**Target:**

```
mybharat-shell.css (includes bootstrap + icons + FA) + shell.js
No legacy header/footer CSS
No duplicate bootstrap in layout.ctp
```

---

## 12. Quick reference — all external stylesheet URLs

| URL | Loaded by |
|-----|-----------|
| `https://cdn-prod.mybharats.in/mybharat/assets/css/bootstrap.min.css` | Package inject, registration `index.html`, legacy Cake |
| `https://cdn-beta.mybharats.in/mybharat/assets/css/bootstrap.min.css` | Header2 default CDN |
| `{cdn}/assets/css/bootstrap-icons.css` | Package inject |
| `https://img1.digitallocker.gov.in/nad/v-22/assets/css/fontawesome.min.css` | Package inject |
| `{cdn}/css/default.css` | Registration `index.html`, legacy Cake layouts |
| `{cdn}/assets/css/choices.min.css` | Registration forms |
| `https://cdn.jsdelivr.net/npm/bootstrap-icons/...` | Registration `.env` optional |
| `https://cdn.jsdelivr.net/gh/.../mybharat-shell.css` | Shell CDN embed |
| `dist/index.css` / `style.css` | npm React hosts |

---

## 13. Sign-off before removing any host CSS

Test on **each** host after changes:

- [ ] Gov strip: flag, A/A+/−A, toll free, support link
- [ ] Desktop nav + dropdowns + profile menu
- [ ] Mobile hamburger → `#mobileMenuNew` drawer
- [ ] Sign In / Register + all login modals
- [ ] Footer columns alignment (desktop left / mobile center)
- [ ] Feedback modal + captcha + submit loader
- [ ] Font-size accessibility controls
- [ ] Header2 variant (if used)
- [ ] No double modal backdrop / blocked clicks

---

## 14. Next step

When you approve **Phase 1**, implementation work is:

1. Vendor Bootstrap + icons + FA into the package build
2. Gate or remove runtime CDN inject
3. Update registration `index.html` + `.env.example`
4. Update `docs/cakephp-shell-integration.md` with new load instructions

No markup or logic changes required for Phase 1.
