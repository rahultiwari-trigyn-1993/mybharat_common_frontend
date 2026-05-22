# Publish shell to GitHub CDN (jsDelivr)

Dev/test CDN for [`rahultiwari-trigyn-1993`](https://github.com/rahultiwari-trigyn-1993) on GitHub.

## Use jsDelivr — not raw GitHub

**Do not** embed `raw.githubusercontent.com` in `<link>` or `<script>` tags. GitHub serves files as `Content-Type: text/plain`, which Chrome blocks with:

```
net::ERR_BLOCKED_BY_ORB
```

Use **jsDelivr** instead (correct `text/css` and `application/javascript` MIME types).

## URLs (v1.0.165)

| File | URL |
|------|-----|
| **CSS** | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.165/dist/shell/mybharat-shell.css` |
| **JS** | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.165/dist/shell/shell.js` |

> CSS filename is **`mybharat-shell.css`** (not `shell.css`) — jsDelivr returns 404 on `dist/shell/shell.css`. Same styles as `shell.css`.

Pin **`@v1.0.165`** (with `v` prefix). Production: S3 + CloudFront.

---

## Copy-paste for CakePHP / HTML

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.165/dist/shell/mybharat-shell.css"
/>
<script>
  window.MYBHARAT_SHELL = {
    header: { cdnBase: "https://cdn-prod.mybharats.in/mybharat" },
    footer: { isLoggedIn: false },
  };
</script>
<script type="application/json" id="mybharat-header-nav">[]</script>
<mybharat-header nav-json-id="mybharat-header-nav"></mybharat-header>
<mybharat-footer></mybharat-footer>
<script
  src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.165/dist/shell/shell.js"
  defer
></script>
```

---

## Publish

```powershell
cd D:\mybharat_common_frontend
npm run build
git add dist/shell demo docs package.json tsup.config.js src/constants/shellCdn.ts README.md
git commit -m "Fix ORB: jsDelivr CDN with mybharat-shell.css at v1.0.165"
git push github beta
git tag v1.0.165
git push github v1.0.165
```

Wait ~5 minutes after first push for jsDelivr to index new tags.

---

## Test

```powershell
npm run demo
```

Open `http://localhost:3456/demo/cakephp-shell.html` or `?local=1` for local files.

After publish, verify URLs return 200 in the browser Network tab (not ORB blocked).
