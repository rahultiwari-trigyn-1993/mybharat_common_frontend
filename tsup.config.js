import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));

export default defineConfig({
  entry: ["src/index.js"],
  format: ["cjs", "esm"],
  injectStyle: true,
  esbuildOptions(options) {
    options.banner = {
      js: `/*! mybharat_common_frontend@${pkg.version} — if this version is wrong in Sources, Vite cached an old pre-bundle; see README "Vite dev server" */\n`,
    };
    options.define = {
      ...options.define,
      __MYBHARAT_PKG_VERSION__: JSON.stringify(pkg.version),
    };
  },
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0"
    }
  },
  clean: true,
  external: ["react", "react-dom"],
  // package.json "style" / exports["./style.css"] must exist; injectStyle only embeds CSS in JS.
  async onSuccess() {
    const headerCss = readFileSync(join(__dirname, "src/components/Header.css"), "utf8");
    const footerCss = readFileSync(join(__dirname, "src/components/Footer.css"), "utf8");
    writeFileSync(join(__dirname, "dist/index.css"), `${headerCss}\n${footerCss}`);
    const header2Css = readFileSync(join(__dirname, "src/components/Header2.css"), "utf8");
    writeFileSync(join(__dirname, "dist/header2.css"), header2Css);
  }
});