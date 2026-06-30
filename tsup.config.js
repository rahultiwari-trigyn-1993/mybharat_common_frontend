import { readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";
import { getShellManifestGithub } from "./scripts/loadBuildEnv.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));
const shellManifestGithub = getShellManifestGithub(pkg);

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

  const { githubUser, githubRepo, tag: gitTag } = shellManifestGithub;
  const jsdelivrBase =
    githubUser && githubRepo
      ? `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}@${gitTag}/dist/shell`
      : '';

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
          localTestingOnly: {
            provider: "jsdelivr",
            purpose:
              "Local CakePHP / dev-machine testing when you have no S3 or org CDN access. Not for dev/beta/prod.",
            githubUser,
            githubRepo,
            tag: gitTag,
            base: jsdelivrBase,
            shellJs: jsdelivrBase ? `${jsdelivrBase}/shell.js` : "",
            shellCss: jsdelivrBase ? `${jsdelivrBase}/mybharat-shell.css` : "",
          },
          devBetaProd: {
            managedBy: "Infra (OpenForge)",
            purpose:
              "Org CDN for dev, beta, and production. Host sets cdnBase (VITE_MYBHARAT_CDN_BASE / window.MYBHARAT_SHELL).",
            assetPath: "/mybharat",
            note: "Do not point dev/beta/prod at the personal GitHub jsDelivr URLs in package.json repository.",
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
