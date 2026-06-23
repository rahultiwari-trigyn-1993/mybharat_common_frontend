/* Bundled into shell.js so host pages get styles even without a separate <link> (injectStyle: true). */
import '../vendor/installShellFramework';
import '../components/header/Header.common.css';
import '../components/Header.css';
import '../components/Footer.css';
/* Header2.css is NOT bundled — load dist/shell/header2.css separately when variant="header2". */

import { installHeaderAccessibilityFont } from '../components/header/headerAccessibilityFont';
import { registerMyBharatWebComponents } from './registerWebComponents';

registerMyBharatWebComponents();

if (typeof document !== 'undefined') {
  installHeaderAccessibilityFont();
}

export { registerMyBharatWebComponents, HEADER_TAG, FOOTER_TAG } from './registerWebComponents';
export {
  openLoginWithOtpModal,
  openSignInPasswordModal,
  installHeaderLoginFlow,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
} from '../components/header/login/headerLoginFlow';
export { installHeaderAccessibilityFont } from '../components/header/headerAccessibilityFont';
export {
  installFooterFeedbackFlow,
  applyFooterFeedbackConfig,
  validateFeedbackForm,
} from '../components/footer/footerFeedbackFlow';
export {
  saveUserFeedback,
  isFeedbackSubmitSuccess,
  SAVE_FEEDBACK_DATA_PATH,
} from '../components/footer/footerFeedbackSubmit';
export { getShellApiFetchBaseUrl, buildShellApiUrl } from '../components/header/login/headerLoginFlow';
export type { ShellFooterConfig, ShellHeaderConfig } from './parseShellConfig';

/** Published shell version — inlined at build from `package.json`. */
export const MYBHARAT_SHELL_VERSION = __MYBHARAT_PKG_VERSION__;
