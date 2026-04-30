/**
 * Runs after `tsup`: rollup DTS still references __MYBHARAT_PKG_VERSION__ (esbuild define).
 * Replace with a concrete literal type for consumers.
 */
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const root = join(__dirname, "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));

for (const name of ["index.d.ts", "index.d.mts"]) {
  const p = join(root, "dist", name);
  let d = readFileSync(p, "utf8").replace(/\r\n/g, "\n");
  d = d.replace(
    "const MYBHARAT_COMMON_FRONTEND_VERSION = __MYBHARAT_PKG_VERSION__;",
    `export declare const MYBHARAT_COMMON_FRONTEND_VERSION: "${pkg.version}";`
  );
  d = d.replace(
    "MYBHARAT_CDN_ORIGIN, MYBHARAT_COMMON_FRONTEND_VERSION, index as default",
    "MYBHARAT_CDN_ORIGIN, index as default"
  );
  writeFileSync(p, d);
}
