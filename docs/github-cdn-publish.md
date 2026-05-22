# Publish shell to GitHub CDN

Dev/test CDN for [`rahultiwari-trigyn-1993`](https://github.com/rahultiwari-trigyn-1993) on GitHub. Production stays on S3 + CloudFront.

## URLs (v1.0.164) — both from raw GitHub

| File | URL |
|------|-----|
| **CSS** | `https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.css` |
| **JS** | `https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.js` |

Pin tag **`v1.0.164`** in CakePHP / yuva_application.

---

## Publish (each release)

```powershell
cd D:\mybharat_common_frontend
npm run build

git add dist/shell demo docs package.json tsup.config.js src/shell src/constants/shellCdn.ts README.md
git commit -m "Shell CDN v1.0.164 — raw GitHub for CSS and JS"

git push github beta
git tag v1.0.164
git push github v1.0.164
```

---

## Copy-paste for CakePHP / HTML

```html
<link
  rel="stylesheet"
  href="https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.css"
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
  src="https://raw.githubusercontent.com/rahultiwari-trigyn-1993/mybharat_common_frontend/v1.0.164/dist/shell/shell.js"
  defer
></script>
```

---

## Test

```powershell
npm run demo
```

Open `http://localhost:3456/demo/cakephp-shell.html` or add `?local=1` for local `dist/shell`.

---

## Notes

- **OpenForge** (`origin`) and **GitHub** (`github`) are separate remotes.
- `dist/shell/` must be committed and tagged so raw GitHub URLs serve the built files.
