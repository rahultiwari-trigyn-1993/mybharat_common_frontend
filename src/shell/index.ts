import { registerMyBharatWebComponents } from './registerWebComponents';

registerMyBharatWebComponents();

export { registerMyBharatWebComponents, HEADER_TAG, FOOTER_TAG } from './registerWebComponents';
export type { ShellFooterConfig, ShellHeaderConfig } from './parseShellConfig';

/** Published shell version — inlined at build from `package.json`. */
export const MYBHARAT_SHELL_VERSION = __MYBHARAT_PKG_VERSION__;
