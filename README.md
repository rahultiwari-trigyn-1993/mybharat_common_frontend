# React UI Kit

Reusable Header and Footer components.

## Install

```bash
npm install git+https://openforge.gov.in/plugins/git/yuvaproj/mybharat_common_frontend.git
```

## Usage

```tsx
import { Header, Footer } from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";
// import "mybharat_common_frontend/header2.css"; // only if you use <Header2 />

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
```

Optional **`cdnBase`** (no trailing slash): production default is `https://cdn-prod.mybharats.in/mybharat`; for beta assets use `https://cdn-beta.mybharats.in/mybharat`. Import **`MYBHARAT_CDN_BASE`** from this package if you need the same default elsewhere.

## CDN shell (CakePHP, Laravel, WordPress, plain HTML)

For non-React hosts, use the Web Component bundle in **`dist/shell/`** after `npm run build`:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.css" />
<script>
  window.MYBHARAT_SHELL = { header: { cdnBase: "https://cdn-prod.mybharats.in/mybharat" } };
</script>
<script type="application/json" id="mybharat-header-nav">[...]</script>
<mybharat-header nav-json-id="mybharat-header-nav"></mybharat-header>
<mybharat-footer is-logged-in="false"></mybharat-footer>
<script src="https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.js" defer></script>
```

- **CakePHP:** see [`docs/cakephp-shell-integration.md`](docs/cakephp-shell-integration.md)
- **GitHub CDN (raw):** [`docs/github-cdn-publish.md`](docs/github-cdn-publish.md) — tag `v1.0.164`
- **Local demo:** `npm run demo` → `/demo/cakephp-shell.html` (GitHub CDN) or `?local=1` for local `dist/shell`

Custom elements: **`mybharat-header`**, **`mybharat-footer`**. Host app still owns login modals, session, and nav fetch.

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
