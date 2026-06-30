# Publish shell to GitHub jsDelivr (local testing only)

> **Not for dev / beta / prod.** Infra publishes shell JS/CSS and static assets to the **OpenForge CDN**.  
> This personal GitHub repo (`rahultiwari-trigyn-1993/mybharat_common_frontend`) exists so developers can test Header/Footer on a **local CakePHP** app without AWS S3 or org CDN access.

## When to use jsDelivr from this repo

| Environment | Shell JS/CSS | Static assets (`cdnBase`) |
|-------------|--------------|---------------------------|
| **Local** (your machine) | jsDelivr from this GitHub repo (optional) | `VITE_MYBHARAT_CDN_BASE` / Infra CDN URL you have access to |
| **dev / beta / prod** | **Infra OpenForge CDN** | **Infra OpenForge CDN** — host config only |

Host apps must always pass `cdnBase`, `baseUrl`, `apiBaseUrl`, and `environment` from env — never rely on baked-in defaults.

## Use jsDelivr — not raw GitHub

**Do not** embed `raw.githubusercontent.com` in `<link>` or `<script>` tags. GitHub serves files as `Content-Type: text/plain`, which Chrome blocks with:

```
net::ERR_BLOCKED_BY_ORB
```

Use **jsDelivr** for local testing (correct `text/css` and `application/javascript` MIME types).

## Example jsDelivr URLs (local testing)

Replace `@v1.0.238` with your published tag.

| File | URL |
|------|-----|
| **CSS** | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.238/dist/shell/mybharat-shell.css` |
| **JS** | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.238/dist/shell/shell.js` |

> CSS filename is **`mybharat-shell.css`** (not `shell.css`) — jsDelivr returns 404 on `dist/shell/shell.css`.

---

## Copy-paste for local CakePHP / HTML

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.238/dist/shell/mybharat-shell.css"
/>
<script>
  window.MYBHARAT_SHELL = {
    header: { cdnBase: "https://cdn-prod.mybharats.in" },
    login: {
      baseUrl: "http://localhost:8080",
      apiBaseUrl: "http://127.0.0.1:8000/api",
      environment: "local",
    },
    footer: { isLoggedIn: false },
  };
</script>
<script type="application/json" id="mybharat-header-nav">[]</script>
<mybharat-header nav-json-id="mybharat-header-nav"></mybharat-header>
<mybharat-footer></mybharat-footer>
<script
  src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.238/dist/shell/shell.js"
  defer
></script>
```

For **dev/beta/prod**, replace jsDelivr `<link>` / `<script>` URLs with Infra-provided OpenForge CDN URLs and set `cdnBase` to the matching origin.

---

## Publish to personal GitHub (local testing)

```powershell
cd D:\mybharat_common_frontend
npm run build
git add dist/shell docs package.json tsup.config.js
git commit -m "Publish shell tag for local jsDelivr testing"
git push origin main
git tag v1.0.238
git push origin v1.0.238
```

Wait ~5 minutes after first push for jsDelivr to index new tags.

---

## Test locally

```powershell
npm run demo
```

Open `http://localhost:3456/demo/cakephp-shell.html` or `?local=1` for local files.

After publish, verify jsDelivr URLs return 200 in the browser Network tab (not ORB blocked).
