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
  Footer,
  DEFAULT_HEADER_MAIN_NAV,
  useMainNavItems,
} from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";

export default function App() {
  const loadHeaderNav = useCallback(async () => {
    const token = import.meta.env.VITE_API_TOKEN;
    const res = await fetch("https://your-api.example/api/getDynamicMenuTree", {
      method: "POST",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({
        menu_section: "header",
        menu_key: "betaheader",
        include_inactive: false,
      }),
    });
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
      <main>...</main>
      <Footer />
    </>
  );
}
```

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
