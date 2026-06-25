/**
 * Prepends vendored Bootstrap + Bootstrap Icons + Font Awesome to dist CSS outputs.
 * Copies font files so url() paths resolve for npm and shell CDN layouts.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function readUtf8(path) {
  return readFileSync(join(root, path), 'utf8');
}

function copyDir(srcRel, destAbs) {
  const srcAbs = join(root, srcRel);
  if (!existsSync(srcAbs)) {
    throw new Error(`Missing path for CSS bundle: ${srcRel}`);
  }
  mkdirSync(destAbs, { recursive: true });
  for (const name of readdirSync(srcAbs)) {
    cpSync(join(srcAbs, name), join(destAbs, name));
  }
}

function stripSourceMapComments(css) {
  return css
    .replace(/\/\*#\s*sourceMappingURL=[^*]*\*\/\s*/g, '')
    .replace(/\/\/#\s*sourceMappingURL=.*$/gm, '');
}

function inlineCriticalFonts(css) {
  /** @type {{ file: string; mime: string; urlPattern: RegExp }[]} */
  const fonts = [
    {
      file: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2',
      mime: 'font/woff2',
      urlPattern: /url\(["']?[^"']*fa-solid-900\.(woff2|woff|ttf)[^"']*["']?\)/g,
    },
    {
      file: 'node_modules/@fortawesome/fontawesome-free/webfonts/fa-v4compatibility.woff2',
      mime: 'font/woff2',
      urlPattern: /url\(["']?[^"']*fa-v4compatibility\.(woff2|woff|ttf)[^"']*["']?\)/g,
    },
    {
      file: 'node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2',
      mime: 'font/woff2',
      urlPattern: /url\(["']?[^"']*bootstrap-icons\.(woff2|woff)[^"']*["']?\)/g,
    },
  ];

  let out = css;
  for (const { file, mime, urlPattern } of fonts) {
    const abs = join(root, file);
    if (!existsSync(abs)) {
      throw new Error(`Missing icon font for CSS bundle: ${file}`);
    }
    const dataUri = `url("data:${mime};base64,${readFileSync(abs).toString('base64')}")`;
    out = out.replace(urlPattern, dataUri);
  }
  return out;
}

function frameworkBlock({ fontsPrefix, webfontsPrefix, inlineFonts }) {
  const bootstrap = stripSourceMapComments(
    readUtf8('node_modules/bootstrap/dist/css/bootstrap.min.css')
  );
  let bootstrapIcons = stripSourceMapComments(
    readUtf8('node_modules/bootstrap-icons/font/bootstrap-icons.css')
  );
  bootstrapIcons = bootstrapIcons.replace(/url\(["']?\.\/fonts\//g, `url("${fontsPrefix}`);

  let fontAwesome = stripSourceMapComments(
    readUtf8('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
  );
  fontAwesome = fontAwesome.replace(/url\(["']?\.\.\/webfonts\//g, `url("${webfontsPrefix}`);

  const v4Shims = stripSourceMapComments(
    readUtf8('node_modules/@fortawesome/fontawesome-free/css/v4-shims.min.css')
  );

  let block =
    `/* Bundled framework CSS (Bootstrap + Bootstrap Icons + Font Awesome) — Phase 1 */\n` +
    `${bootstrap}\n${bootstrapIcons}\n${fontAwesome}\n${v4Shims}\n`;

  if (inlineFonts) {
    block = inlineCriticalFonts(block);
  }

  return block;
}

function copyVendorAssets({ fontsDir, webfontsDir }) {
  copyDir('node_modules/bootstrap-icons/font/fonts', fontsDir);
  copyDir('node_modules/@fortawesome/fontawesome-free/webfonts', webfontsDir);
}

function writeCss(targetAbs, framework, componentCss) {
  writeFileSync(targetAbs, framework + componentCss);
}

function main() {
  const bhashiniCss = readUtf8('src/styles/bhashini.css');
  const headerCommonCss = readUtf8('src/components/header/Header.common.css');
  const headerLoginCss = readUtf8('src/components/header/login/HeaderLogin.css');
  const headerCss = readUtf8('src/components/Header.css');
  const footerCss = readUtf8('src/components/Footer.css');
  const header2Css = readUtf8('src/components/Header2.css');

  const headerFooterBundle = `${bhashiniCss}\n${headerCommonCss}\n${headerLoginCss}\n${headerCss}\n${footerCss}`;
  const header2Bundle = `${bhashiniCss}\n${headerCommonCss}\n${headerLoginCss}\n${header2Css}`;

  // npm package: dist/index.css, dist/header2.css
  copyVendorAssets({
    fontsDir: join(root, 'dist/vendor/fonts'),
    webfontsDir: join(root, 'dist/vendor/webfonts'),
  });
  const npmFramework = frameworkBlock({
    fontsPrefix: './vendor/fonts/',
    webfontsPrefix: './vendor/webfonts/',
    inlineFonts: true,
  });
  writeCss(join(root, 'dist/index.css'), npmFramework, headerFooterBundle);
  writeCss(join(root, 'dist/header2.css'), npmFramework, header2Bundle);

  // shell CDN: dist/shell/*.css (fonts colocated under dist/shell/vendor/)
  copyVendorAssets({
    fontsDir: join(root, 'dist/shell/vendor/fonts'),
    webfontsDir: join(root, 'dist/shell/vendor/webfonts'),
  });
  const shellFramework = frameworkBlock({
    fontsPrefix: './vendor/fonts/',
    webfontsPrefix: './vendor/webfonts/',
    inlineFonts: true,
  });
  const shellDir = join(root, 'dist/shell');
  mkdirSync(shellDir, { recursive: true });
  writeCss(join(shellDir, 'shell.css'), shellFramework, headerFooterBundle);
  writeCss(join(shellDir, 'mybharat-shell.css'), shellFramework, headerFooterBundle);
  writeCss(join(shellDir, 'header2.css'), shellFramework, header2Bundle);
  writeCss(join(shellDir, 'footer.css'), shellFramework, footerCss);

  console.log('[bundle-framework-css] Wrote dist/index.css, dist/header2.css, dist/shell/*.css + vendor fonts');
}

main();
