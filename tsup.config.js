import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));

function writeShellCssAndManifest() {
  const shellDir = join(__dirname, "dist/shell");
  const globalJs = join(shellDir, "shell.global.js");
  const shellJs = join(shellDir, "shell.js");
  try {
    renameSync(globalJs, shellJs);
  } catch {
    /* first run or already renamed */
  }

  /* CSS: scripts/bundle-framework-css.mjs (Bootstrap + icons + FA + component CSS) */

  const githubUser = "rahultiwari-trigyn-1993";
  const githubRepo = "mybharat_common_frontend";
  const gitTag = `v${pkg.version}`;
  const jsdelivrBase = `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}@${gitTag}/dist/shell`;

  writeFileSync(
    join(shellDir, "manifest.json"),
    JSON.stringify(
      {
        name: "mybharat-shell",
        version: pkg.version,
        files: {
          "shell.js": "shell.js",
          "shell.css": "shell.css (local / npm)",
          "mybharat-shell.css": "mybharat-shell.css (jsDelivr CDN — same content as shell.css)",
          "header2.css": "header2.css (Header2 variant)",
          "footer.css": "footer.css (Footer only, for Header2 layouts)",
        },
        customElements: ["mybharat-header", "mybharat-footer"],
        cdn: {
          recommended: "jsdelivr",
          jsdelivr: {
            tag: gitTag,
            base: jsdelivrBase,
            shellJs: `${jsdelivrBase}/shell.js`,
            shellCss: `${jsdelivrBase}/mybharat-shell.css`,
          },
          note: "Do not use raw.githubusercontent.com in <link>/<script> — Content-Type text/plain causes net::ERR_BLOCKED_BY_ORB in Chrome.",
        },
        docs: "docs/github-cdn-publish.md",
      },
      null,
      2
    )
  );
}

const versionDefine = {
  __MYBHARAT_PKG_VERSION__: JSON.stringify(pkg.version),
};

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    injectStyle: true,
    esbuildOptions(options) {
      options.banner = {
        js: `/*! mybharat_common_frontend@${pkg.version} — if this version is wrong in Sources, Vite cached an old pre-bundle; see README "Vite dev server" */\n`,
      };
      options.define = {
        ...options.define,
        ...versionDefine,
      };
    },
    dts: {
      compilerOptions: {
        ignoreDeprecations: "6.0",
      },
    },
    clean: true,
    external: ["react", "react-dom"],
    async onSuccess() {
      /* CSS: scripts/bundle-framework-css.mjs */
    },
  },
  {
    entry: { shell: "src/shell/index.ts" },
    format: ["iife"],
    globalName: "MyBharatShell",
    outDir: "dist/shell",
    platform: "browser",
    target: "es2020",
    injectStyle: true,
    clean: false,
    dts: false,
    minify: false,
    noExternal: ["react", "react-dom"],
    esbuildOptions(options) {
      options.banner = {
        js: `/*! mybharat_shell@${pkg.version} — CDN Web Component bundle for Header/Footer */\n`,
      };
      options.define = {
        ...options.define,
        ...versionDefine,
      };
    },
    async onSuccess() {
      writeShellCssAndManifest();
    },
  },
]);
