import { readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));

function writeShellCssAndManifest() {
  const headerCommonCss = readFileSync(
    join(__dirname, "src/components/header/Header.common.css"),
    "utf8"
  );
  const headerCss = readFileSync(join(__dirname, "src/components/Header.css"), "utf8");
  const footerCss = readFileSync(join(__dirname, "src/components/Footer.css"), "utf8");
  const header2Css = readFileSync(join(__dirname, "src/components/Header2.css"), "utf8");

  const shellDir = join(__dirname, "dist/shell");
  const globalJs = join(shellDir, "shell.global.js");
  const shellJs = join(shellDir, "shell.js");
  try {
    renameSync(globalJs, shellJs);
  } catch {
    /* first run or already renamed */
  }

  writeFileSync(join(shellDir, "mybharat-shell.css"), `${headerCommonCss}\n${headerCss}\n${footerCss}`);
  writeFileSync(join(shellDir, "header2.css"), `${headerCommonCss}\n${header2Css}`);
  writeFileSync(join(shellDir, "footer.css"), footerCss);
  /* Remove tsup-extracted shell.css — jsDelivr breaks on dist/shell/shell.css path */
  try {
    unlinkSync(join(shellDir, "shell.css"));
  } catch {
    /* ok */
  }

  const githubUser = "rahultiwari-trigyn-1993";
  const githubRepo = "mybharat_common_frontend";
  const jsdelivrBase = `https://cdn.jsdelivr.net/gh/${githubUser}/${githubRepo}@v${pkg.version}/dist/shell`;

  writeFileSync(
    join(shellDir, "manifest.json"),
    JSON.stringify(
      {
        name: "mybharat-shell",
        version: pkg.version,
        files: {
          "shell.js": "shell.js",
          "mybharat-shell.css": "mybharat-shell.css (Header + Footer — use this, not shell.css)",
          "header2.css": "header2.css (Header2 variant)",
          "footer.css": "footer.css (Footer only, for Header2 layouts)",
        },
        customElements: ["mybharat-header", "mybharat-footer"],
        cdn: {
          github: {
            user: githubUser,
            repo: githubRepo,
            tag: pkg.version,
            jsdelivrBase,
            shellCss: `${jsdelivrBase}/mybharat-shell.css`,
            shellJs: `${jsdelivrBase}/shell.js`,
          },
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
      const headerCommonCss = readFileSync(
        join(__dirname, "src/components/header/Header.common.css"),
        "utf8"
      );
      const headerCss = readFileSync(join(__dirname, "src/components/Header.css"), "utf8");
      const footerCss = readFileSync(join(__dirname, "src/components/Footer.css"), "utf8");
      writeFileSync(
        join(__dirname, "dist/index.css"),
        `${headerCommonCss}\n${headerCss}\n${footerCss}`
      );
      const header2Css = readFileSync(join(__dirname, "src/components/Header2.css"), "utf8");
      writeFileSync(
        join(__dirname, "dist/header2.css"),
        `${headerCommonCss}\n${header2Css}`
      );
    },
  },
  {
    entry: { shell: "src/shell/index.ts" },
    format: ["iife"],
    globalName: "MyBharatShell",
    outDir: "dist/shell",
    platform: "browser",
    target: "es2020",
    injectStyle: false,
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
