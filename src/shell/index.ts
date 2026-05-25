/* Bundled into shell.js so host pages get styles even without a separate <link> (injectStyle: true). */
import '../components/header/Header.common.css';
import '../components/Header.css';
import '../components/Footer.css';
import '../components/Header2.css';

import { registerMyBharatWebComponents } from './registerWebComponents';

registerMyBharatWebComponents();

export { registerMyBharatWebComponents, HEADER_TAG, FOOTER_TAG } from './registerWebComponents';
export type { ShellFooterConfig, ShellHeaderConfig } from './parseShellConfig';

/** Published shell version — inlined at build from `package.json`. */
export const MYBHARAT_SHELL_VERSION = __MYBHARAT_PKG_VERSION__;
