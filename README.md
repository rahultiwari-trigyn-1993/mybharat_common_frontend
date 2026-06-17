# React UI Kit

Reusable Header and Footer components — use as an **npm package** (React) or a **CDN plugin** (Web Components for CakePHP / plain HTML).

**Current shell tag:** `v1.0.218` · jsDelivr base: `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.218/dist/shell`

---

## A) Package — React / npm

For React apps (Vite, Next.js, CRA, etc.).

### Install

```bash
npm install git+https://openforge.gov.in/plugins/git/yuvaproj/mybharat_common_frontend.git
# or: npm install git+https://github.com/rahultiwari-trigyn-1993/mybharat_common_frontend.git
```

### Basic usage (Header + Footer)

```tsx
import { Header, Footer } from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 120 }}>{/* fixed-top header */}</main>
      <Footer />
    </>
  );
}
```

### Header2 (brown brand variant)

```tsx
import { Header2, Footer } from "mybharat_common_frontend";
import "mybharat_common_frontend/header2.css";

function App() {
  return (
    <>
      <Header2 cdnBase="https://cdn-beta.mybharats.in/mybharat" />
      <main style={{ paddingTop: 120 }}>...</main>
      <Footer />
    </>
  );
}
```

Login modals are included automatically when `<Header />` or `<Header2 />` mounts (portaled to `document.body`).

### Sign In — package

Works out of the box for:

- Desktop **Sign In** (`#btnGroupDrop1`)
- Mobile drawer **Sign In** (`#signInLink`)

Programmatic open (e.g. from your own page):

```tsx
import { openLoginWithOtpModal, openSignInPasswordModal } from "mybharat_common_frontend";

openLoginWithOtpModal();           // OTP login (default, same as header.ctp)
openSignInPasswordModal();         // password login modal
```

Or from the browser after the header is mounted:

```js
window.MyBharatShell?.openLoginModal();            // OTP
window.MyBharatShell?.openLoginModal("password");  // password
```

Host-page buttons **outside** the header also work if they use these ids:

- `#home-login-link`
- `#register-login-link`

Optional redirect base after login:

```tsx
<Header
  baseUrl="https://mybharat.gov.in"
  apiBaseUrl="http://127.0.0.1:8000/api"
  apiProxyBaseUrl="/mybharat-shell-api"
/>
```

Or via `window.MYBHARAT_SHELL` before the header loads:

```tsx
window.MYBHARAT_SHELL = { login: { baseUrl: "https://mybharat.gov.in/" } };
```

See **[Login configuration](#login-configuration-header-props--host-server)** below for all login props and what must stay on the host server.

### Dynamic nav (API / CDN JSON)

```tsx
import { useCallback } from "react";
import {
  Header,
  Footer,
  DEFAULT_HEADER_MAIN_NAV,
  useMainNavItems,
} from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";

export default function App() {
  const loadHeaderNav = useCallback(async () => {
    const res = await fetch("https://cdn-beta.mybharats.in/master/header.json");
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  }, []);

  const nav = useMainNavItems({
    load: loadHeaderNav,
    select: (raw) => raw?.data ?? raw,
    fallback: DEFAULT_HEADER_MAIN_NAV,
  });

  return (
    <>
      <Header mainNavItems={nav} />
      <Footer />
    </>
  );
}
```

For **Header2**, use `DEFAULT_HEADER2_MAIN_NAV`, `import "mybharat_common_frontend/header2.css"`, and `<Header2 mainNavItems={nav} />`.

See [Navigation](#navigation-mainnavitems) below for JSON shape and exports.

---

## B) Plugin — CDN shell (CakePHP / plain HTML)

For non-React hosts. Registers custom elements **`<mybharat-header>`** and **`<mybharat-footer>`**.

> Use **jsDelivr** URLs only — not `raw.githubusercontent.com` (Chrome `ERR_BLOCKED_BY_ORB`).

### Default Header

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.218/dist/shell/mybharat-shell.css"
/>
<script>
  window.MYBHARAT_SHELL = {
    header: { cdnBase: "https://cdn-prod.mybharats.in/mybharat", variant: "header" },
    footer: { isLoggedIn: false },
    login: {
      baseUrl: "https://mybharat.gov.in/",
      apiProxyBaseUrl: "/mybharat-shell-api",
    },
  };
</script>
<script type="application/json" id="mybharat-header-nav">
  [{"type":"link","label":"Quiz & Essay","href":"/quiz","linkClassName":"fontchange14"}]
</script>

<mybharat-header
  nav-json-id="mybharat-header-nav"
  login-base-url="https://mybharat.gov.in"
  api-proxy-base-url="/mybharat-shell-api"
></mybharat-header>

<main style="padding-top: 120px"><!-- page content --></main>

<mybharat-footer></mybharat-footer>

<script
  src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.218/dist/shell/shell.js"
  defer
></script>
```

### Header2 plugin

Load **`header2.css`** instead of `mybharat-shell.css`, set `variant: "header2"`:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.218/dist/shell/header2.css"
/>
<script>
  window.MYBHARAT_SHELL = {
    header: { cdnBase: "https://cdn-prod.mybharats.in/mybharat", variant: "header2" },
    login: {
      baseUrl: "https://mybharat.gov.in/",
      apiProxyBaseUrl: "/mybharat-shell-api",
    },
  };
</script>
<mybharat-header variant="header2" nav-json-id="mybharat-header-nav"></mybharat-header>
<script src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.218/dist/shell/shell.js" defer></script>
```

If `@v1.0.218` is slow to appear on jsDelivr, pin **`@beta`** temporarily (same branch).

### Sign In — plugin

Included in `shell.js` — **remove** login modal HTML from `header.ctp` when using the shell.

| Trigger | Opens |
|---------|--------|
| `#btnGroupDrop1` | OTP login modal |
| `#signInLink` | OTP login modal |
| `#home-login-link`, `#register-login-link` | OTP login modal (anywhere on page) |
| URL `#login` | OTP modal on load |

```javascript
// programmatic
window.MyBharatShell.openLoginModal();
window.MyBharatShell.openLoginModal("password");

// event
document.addEventListener("mb:open-login", (e) => console.log(e.detail.mode));
```

### Plugin attributes

| Element | Attribute | Example |
|---------|-----------|---------|
| `<mybharat-header>` | `variant` | `header` (default) or `header2` |
| | `cdn-base` | `https://cdn-prod.mybharats.in/mybharat` |
| | `nav-json-id` | `mybharat-header-nav` → `<script type="application/json">` |
| | `login-base-url` | `https://mybharat.gov.in` |
| | `api-base-url` | `http://127.0.0.1:8000/api` |
| | `api-proxy-base-url` | `/mybharat-shell-api` |
| | `login-payload-public-key` | RSA public key PEM (optional) |
| | `ip-address` | Client IP for OTP send (optional) |
| `<mybharat-footer>` | `is-logged-in` | `true` / `false` |
| | `recaptcha-site-key` | Google reCAPTCHA site key |

Nav JSON must be fetched in **CakePHP controller** (or host app) — the shell does not call `fetch` for menus.

- **CakePHP:** [`docs/cakephp-shell-integration.md`](docs/cakephp-shell-integration.md)
- **Login host server (keys, internal routes):** [`docs/host-login-server.md`](docs/host-login-server.md)
- **GitHub CDN:** [`docs/github-cdn-publish.md`](docs/github-cdn-publish.md)
- **Local demo:** `npm run demo` → `http://localhost:3456/demo/cakephp-shell.html` or `?local=1`

---

## Login configuration (header props & host server)

The shell includes **login / OTP / forgot-password UI**. It does **not** include API secrets or the private decryption key — those belong on **your host server** (CakePHP, Vite, nginx, etc.), the same way OAuth credentials do today.

### What you CAN pass as Header props or `<mybharat-header>` attributes

These are **safe for the browser** — URLs and the RSA **public** key only:

| React prop | Web component attribute | Purpose |
|------------|-------------------------|---------|
| `baseUrl` | `login-base-url` | Site origin after login (e.g. `https://mybharat.gov.in`) |
| `apiBaseUrl` | `api-base-url` | APIGateway root (e.g. `http://127.0.0.1:8000/api`) |
| `apiProxyBaseUrl` | `api-proxy-base-url` | Same-origin proxy prefix — **required** when shell runs on another domain (e.g. `/mybharat-shell-api`) |
| `loginPayloadPublicKey` | `login-payload-public-key` | RSA public key PEM (optional; else browser calls `/_internal/login-pubkey`) |
| `ipAddress` | `ip-address` | Client IP for OTP send (optional) |
| `publicProfileApiBaseUrl` | — (React prop or `window.MYBHARAT_SHELL.login`) | Post-login `getUserId` API |
| `cookieDomain` | — (React prop or `window.MYBHARAT_SHELL.login`) | Cookie domain after login |

**React example:**

```tsx
<Header
  baseUrl="https://mybharat.gov.in"
  apiProxyBaseUrl="/mybharat-shell-api"
  apiBaseUrl="http://127.0.0.1:8000/api"
/>
```

**CDN / CakePHP example:**

```html
<mybharat-header
  login-base-url="https://mybharat.gov.in"
  api-proxy-base-url="/mybharat-shell-api"
></mybharat-header>
```

Or equivalent in `window.MYBHARAT_SHELL.login` before `shell.js` loads.

### What you must NOT pass as header props

Never put these in HTML, React props, or `VITE_*` env vars bundled to the browser:

| Secret | Where it goes |
|--------|----------------|
| `LOGIN_PAYLOAD_PRIVATE_KEY` | Host **server** env only (decrypts password/OTP) |
| `OAUTH_USERNAME` / `OAUTH_PASSWORD` | Host **server** env only |
| Plain password / OTP | Never in config — user types in form; browser encrypts before send |

### What the host server must implement

Every site that embeds the shell must expose same-origin routes under `apiProxyBaseUrl`, for example:

- `POST /mybharat-shell-api/_internal/login-pubkey`
- `POST /mybharat-shell-api/_internal/keycloak-login`
- `POST /mybharat-shell-api/_internal/verify-guest-otp`
- … (see full list in [`docs/host-login-server.md`](docs/host-login-server.md))

**Vite / Node hosts:** use `shellLoginInternalAuthPlugin` from `mybharat_common_frontend/server/shell-login-internal-auth`.

**CakePHP / PHP / non-JS hosts:** implement the same routes in PHP or nginx — no npm build required on the host.

**One-time setup on the host server:**

```bash
node node_modules/mybharat_common_frontend/scripts/generateLoginPayloadKeypair.mjs
# Add LOGIN_PAYLOAD_PRIVATE_KEY (+ optional PUBLIC_KEY) and OAUTH_* to host server .env
```

### Simple rule

| Layer | Responsibility |
|-------|----------------|
| **Shell (this package)** | Login UI + encrypt password/OTP with public key |
| **Header props / attributes** | URLs + optional public key (browser-safe) |
| **Host server** | Private key, OAuth creds, `/_internal/*` routes → APIGateway |

---

## Package vs plugin — quick comparison

| | **Package (npm)** | **Plugin (CDN shell)** |
|--|-------------------|------------------------|
| Host | React | CakePHP, Laravel, HTML |
| Import | `import { Header } from "…"` | `<mybharat-header>` + `shell.js` |
| CSS | `style.css` / `header2.css` | `mybharat-shell.css` / `header2.css` |
| Login modals | Auto with Header | Auto with `<mybharat-header>` |
| Login URLs | Header props / `MYBHARAT_SHELL.login` | Header attributes / `MYBHARAT_SHELL.login` |
| Login secrets | Host server env — see [Login configuration](#login-configuration-header-props--host-server) | Same |
| Nav data | `mainNavItems` prop / hook | `nav-json-id` or `nav-items` attr |
| Sign In ids | Same global triggers | Same global triggers |

Only **one** header variant per page (`Header` **or** `Header2`, not both).

---

## Navigation (`mainNavItems`)

> **@developers — required**  
> **Call every `.json` URL or navigation API only from your host application.** This package **does not** fetch remote URLs for menu data and **must not** be extended to do so: pass data in via **`mainNavItems`** only. **Do not add `fetch` / HTTP calls for nav JSON inside `mybharat_common_frontend`.** _(Host-app integrators and contributors to this repo.)_

Desktop and the mobile drawer use **one** array. Pass **`mainNavItems`** to **`Header`** or **`Header2`** to replace the package defaults (**`DEFAULT_HEADER_MAIN_NAV`** / **`DEFAULT_HEADER2_MAIN_NAV`**). Types: **`NavTreeItem`**, **`NavLinkItem`**, **`NavGroupItem`**.

The payload is almost always a **JSON array**—whether it comes from an API, DB, Elasticsearch, CMS, or a static `.json` URL. If your API wraps it (e.g. `{ "nav": [...] }`), unwrap to the array before passing it in.

| `type`   | Fields |
|----------|--------|
| `"link"` | `label`, `href`; optional `linkClassName`, `spanClassName`, `external` (adds `target="_blank"`). |
| `"group"` | `label`, `children` (same items; nesting allowed). |

Example:

```json
[
  { "type": "link", "label": "Quiz", "href": "/quiz", "linkClassName": "fontchange14" },
  {
    "type": "group",
    "label": "Voices",
    "children": [
      { "type": "link", "label": "Blogs", "href": "/voices/blogs", "linkClassName": "events fontchange14", "spanClassName": "lang_event" }
    ]
  }
]
```

### Dynamic menu (API or CDN)

Use **`useMainNavItems`** or **`prepareMainNavItems`** so you do not copy unwrap/normalize/filter helpers into every app. **`fetch` stays in your app** (auth, CORS, env); the package only shapes the payload.

```tsx
import { useCallback } from "react";
import {
  Header,
  Header2,
  Footer,
  DEFAULT_HEADER_MAIN_NAV,
  useMainNavItems,
  MYBHARAT_COMMON_FRONTEND_VERSION,
} from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";

console.info("[mybharat_common_frontend]", MYBHARAT_COMMON_FRONTEND_VERSION);

export default function App() {
  const loadHeaderNav = useCallback(async () => {

    /* Uncomment below to get Dynamic Menu Tree from CDN for Header */
    const res = await fetch("https://cdn-beta.mybharats.in/master/header.json", {
      credentials: "omit",
    });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
    /* Get Dynamic Menu Tree from CDN for Header */

    /* Uncomment below to get Dynamic Menu Tree from API for Header */
    // const bearer_token = import.meta.env.VITE_API_TOKEN; // do not hardcode JWT in source
    // const res = await fetch("http://127.0.0.1:8000/api/getDynamicMenuTree", {
    //   method: "POST",
    //   credentials: "omit",
    //   headers: {
    //     "Content-Type": "application/json",
    //     ...(bearer_token && { Authorization: `Bearer ${bearer_token}` }),
    //   },
    //   body: JSON.stringify({
    //     menu_section: "header",
    //     menu_key: "betaheader",
    //     include_inactive: false,
    //   }),
    // });
    // if (!res.ok) throw new Error(String(res.status));
    // return res.json();
    /* Get Dynamic Menu Tree from API for Header */
    
  }, []);

  const selectHeaderNav = useCallback((raw) => raw?.data ?? raw, []);

  const nav = useMainNavItems({
    load: loadHeaderNav,
    select: selectHeaderNav,
    fallback: DEFAULT_HEADER_MAIN_NAV,
  });

  return (
    <div>
      <Header mainNavItems={nav} />
      <main>
        <div className="container mx-auto px-16 py-32">
          <p>Main Content</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
```

For **`Header2`**, add `import "mybharat_common_frontend/header2.css"` and use `<Header2 mainNavItems={nav} />` with **`DEFAULT_HEADER2_MAIN_NAV`** as `fallback`.

One-shot (no hook), e.g. after your own `fetch`:

```tsx
import { prepareMainNavItems, DEFAULT_HEADER_MAIN_NAV } from "mybharat_common_frontend";

const nav = prepareMainNavItems(apiJson.data, { fallback: DEFAULT_HEADER_MAIN_NAV });
```

Exports: **`normalizeApiMenuTree`**, **`filterUnsafeNavTree`**, **`unwrapMenuListFromPayload`**, **`normalizeHrefForNav`**, **`prepareMainNavItems`**, **`useMainNavItems`**. Strict CMS JSON can still use **`normalizeNavTree`**.

For **`Header2`**, use **`DEFAULT_HEADER2_MAIN_NAV`** as `fallback`. Prefer server-side validation for untrusted menu JSON; **`isSafeNavHref`** is a light client guard on `href`.

## Consumer app shows an old build

This package is **prebuilt `dist/`**. Confirm the installed build by opening `node_modules/mybharat_common_frontend/dist/index.mjs` and searching for **`mybharat_common_frontend@`** in the banner comment.

**Vite** often caches deps: in the consumer’s `vite.config.ts` / `vite.config.js` set `optimizeDeps.exclude: ["mybharat_common_frontend"]`, then stop dev server, delete **`node_modules/.vite`**, run **`npm run dev`** again, and hard-refresh.

**Publishing / linking:** run **`npm run build`** (or **`npm run watch`**) in this repo; in the consumer use **`npm link`**, a **`file:`** path, or bump the package **version** and reinstall so the lockfile picks up the new build.
