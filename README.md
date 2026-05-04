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

Example: **`fetch` in your app**, then pass the array (see callout above):

```tsx
import { useEffect, useState } from "react";
import { Header, DEFAULT_HEADER_MAIN_NAV, isSafeNavHref, type NavTreeItem } from "mybharat_common_frontend";

function filterUnsafeLinks(items: NavTreeItem[]): NavTreeItem[] {
  return items
    .map((item) => {
      if (item.type === "link") return isSafeNavHref(item.href) ? item : null;
      const children = filterUnsafeLinks(item.children);
      return children.length ? { ...item, children } : null;
    })
    .filter(Boolean) as NavTreeItem[];
}

export function AppHeader() {
  const [nav, setNav] = useState<readonly NavTreeItem[]>(DEFAULT_HEADER_MAIN_NAV);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://example.com/header.json", { credentials: "omit" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as NavTreeItem[];
        if (!cancelled && Array.isArray(data)) setNav(filterUnsafeLinks(data));
      } catch {
        if (!cancelled) setNav(DEFAULT_HEADER_MAIN_NAV);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return <Header mainNavItems={nav} />;
}
```

For **`Header2`**, swap in **`DEFAULT_HEADER2_MAIN_NAV`** as the initial state and catch fallback. **`isSafeNavHref`** is a light client guard on `href`; prefer stricter validation server-side for untrusted JSON. **`fetch`** needs **CORS** from the JSON host. Cache **`header.json`** with HTTP headers or a versioned URL if you need busting.

## Consumer app shows an old build

This package is **prebuilt `dist/`**. Confirm the installed build by opening `node_modules/mybharat_common_frontend/dist/index.mjs` and searching for **`mybharat_common_frontend@`** in the banner comment.

**Vite** often caches deps: in the consumer’s `vite.config.ts` / `vite.config.js` set `optimizeDeps.exclude: ["mybharat_common_frontend"]`, then stop dev server, delete **`node_modules/.vite`**, run **`npm run dev`** again, and hard-refresh.

**Publishing / linking:** run **`npm run build`** (or **`npm run watch`**) in this repo; in the consumer use **`npm link`**, a **`file:`** path, or bump the package **version** and reinstall so the lockfile picks up the new build.
