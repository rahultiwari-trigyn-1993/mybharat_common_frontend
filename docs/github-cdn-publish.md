# Publish shell to GitHub CDN (jsDelivr)

Dev/test CDN for [`rahultiwari-trigyn-1993`](https://github.com/rahultiwari-trigyn-1993) on GitHub. Production stays on S3 + CloudFront.

After you push and tag, assets load from [jsDelivr](https://www.jsdelivr.com/?docs=gh):

| File | jsDelivr URL (v1.0.163) |
|------|-------------------------|
| CSS | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/mybharat-shell.css` |
| JS | `https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/shell.js` |

Pin the version (`@v1.0.163`) in CakePHP / yuva_application — do not use `@main`.

> **jsDelivr quirks:**
> - CDN URLs must use **`@v1.0.163`** (with `v`). `@1.0.163` fails with “Failed to fetch version info”.
> - CSS file must be **`mybharat-shell.css`**, not `shell.css` (jsDelivr 404 on `dist/shell/shell.css`).

---

## One-time setup

### 1. Create the GitHub repo

1. Open [github.com/new](https://github.com/new)
2. Repository name: **`mybharat_common_frontend`**
3. Public (required for jsDelivr)
4. Do **not** add README if you are pushing an existing folder

### 2. Add GitHub remote (keep OpenForge as `origin`)

```powershell
cd D:\mybharat_common_frontend
git remote add github https://github.com/rahultiwari-trigyn-1993/mybharat_common_frontend.git
```

If `github` remote already exists:

```powershell
git remote set-url github https://github.com/rahultiwari-trigyn-1993/mybharat_common_frontend.git
```

---

## Publish (each release)

```powershell
cd D:\mybharat_common_frontend
npm run build

git add src/shell demo docs/cakephp-shell-integration.md docs/github-cdn-publish.md
git add package.json package-lock.json tsup.config.js README.md dist/shell
git commit -m "Add CDN shell Web Components for CakePHP and GitHub jsDelivr"

git push github beta
git tag v1.0.163
git push github v1.0.163
```

Use **`v`-prefixed tags** (`v1.0.163`) for jsDelivr. You can keep `1.0.163` as well, but CDN URLs must use `@v1.0.163`.

Alternatively push only the branch and use `@beta` until tags are set:

```html
<script src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@beta/dist/shell/shell.js" defer></script>

Use your branch name instead of `beta` if different. jsDelivr accepts tags like `1.0.163` or `v1.0.163` — match what you push.

Wait **~5 minutes** after the first push before jsDelivr serves new files.

---

## Copy-paste for CakePHP / HTML

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/mybharat-shell.css"
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
  src="https://cdn.jsdelivr.net/gh/rahultiwari-trigyn-1993/mybharat_common_frontend@v1.0.163/dist/shell/shell.js"
  defer
></script>
```

---

## Test the demo

**From GitHub CDN** (after push + tag):

Open `demo/cakephp-shell.html` — it loads jsDelivr by default.

**Local build** (no GitHub):

```
http://localhost:3456/demo/cakephp-shell.html?local=1
```

Run: `npm run demo`

---

## Verify

1. Open the jsDelivr CSS URL in a browser — should return CSS text.
2. Open the jsDelivr JS URL — should start with `/*! mybharat_shell@v1.0.163`.
3. Check `dist/shell/manifest.json` for the latest `cdn.github` URLs after each build.

---

## Notes

- **OpenForge** (`origin`) and **GitHub** (`github`) can both exist — push to GitHub for jsDelivr testing, OpenForge for the official npm/git install path.
- `shell.js` is ~1.1 MB (includes React). jsDelivr caches it globally after first request.
- For production gov sites, upload the same `dist/shell/*` files to S3 + CloudFront and change only the base URL.
