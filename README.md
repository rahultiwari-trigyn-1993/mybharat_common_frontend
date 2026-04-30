# React UI Kit

Reusable Header and Footer components.

## Install

npm install git+https://openforge.gov.in/plugins/git/yuvaproj/mybharat_common_frontend.git

## Usage

```tsx
import { Header, Footer } from "mybharat_common_frontend";
import "mybharat_common_frontend/style.css";
// import "mybharat_common_frontend/header2.css"; // if using <Header2 />

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
```

`cdnBase` is optional (defaults to `https://cdn-prod.mybharats.in/mybharat`). For beta assets use `cdnBase="https://cdn-beta.mybharats.in/mybharat"`. You can also import `MYBHARAT_CDN_BASE` from this package if you need the same default elsewhere (no trailing slash).

## If your app does not show the latest changes

This package ships **compiled `dist/`** only. The host app must load a build that includes your edits.

### Prove which build the app is using

After `npm run build`, open `node_modules/mybharat_common_frontend/dist/index.mjs` in your app (or DevTools → Sources) and search for **`mybharat_common_frontend@`**. The comment at the top shows the **installed** version. If it is old, the problem is install or cache—not this repo’s source.

### Vite dev server (e.g. `localhost:5173`) — most common cause

Vite **pre-bundles** dependencies into `node_modules/.vite/deps/`. It often **never re-reads** `mybharat_common_frontend` after you change this library, so the UI looks frozen.

**Do this once in the Vite app** (`vite.config.ts` / `vite.config.js`):

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["mybharat_common_frontend"],
  },
});
```

Then **stop** the dev server, delete the folder **`node_modules/.vite`** in the consumer project, run **`npm run dev`** again, and hard-refresh the browser.

After that, each `npm run build` (or `npm run watch`) in **this** repo should show up after a normal refresh, as long as the app resolves the same `node_modules/mybharat_common_frontend` path (symlinked `file:` or `npm link`).

### Install / lockfile

1. **In this repo:** run `npm run build` (or `npm run watch` while developing).
2. **Re-link the consumer to this build:**
   - **`file:` dependency:** from the consumer app folder run `npm install` again after each build **if** npm copied the package instead of symlinking (Windows defaults vary). Prefer **`npm link`** (below) for daily work.
   - **`npm link`:** run `npm link` in this repo, then `npm link mybharat_common_frontend` in the consumer; keep `npm run watch` running here so `dist/` updates continuously.
   - **Git / registry install:** commit and push, bump `version` in `package.json`, publish or install by tag/commit, then in the consumer run `npm update mybharat_common_frontend` or `npm install mybharat_common_frontend@<version>` so the lockfile picks up the new tarball.
3. **CSS:** import `mybharat_common_frontend/style.css` after your theme (includes Header + Footer). If you use **`Header2`**, also import **`mybharat_common_frontend/header2.css`**, or rely on styles injected when `Header2` loads from the bundle import chain.