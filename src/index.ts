import './vendor/installShellFramework';
import './components/header/Header.common.css';
import './styles/bhashini.css';
import './components/Header.css';
import './components/Footer.css';

import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';

export { Header, Header2, Footer };
export {
  SHELL_INTERNAL_GUEST_OAUTH_PATH,
  SHELL_INTERNAL_KC_CLIENT_PATH,
  SHELL_INTERNAL_LOGIN_PUBKEY_PATH,
  SHELL_INTERNAL_KEYCLOAK_LOGIN_PATH,
  SHELL_INTERNAL_VERIFY_GUEST_OTP_PATH,
  SHELL_INTERNAL_CHANGE_PASSWORD_PATH,
} from './components/header/login/shellLoginInternalAuth';
export {
  openLoginWithOtpModal,
  openSignInPasswordModal,
  installHeaderLoginFlow,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
  getKeycloakClientAccessToken,
  applyShellLoginApiConfig,
  SHELL_LOGIN_API_PROXY_DEFAULT,
  validateOtpLoginForm,
  submitOtpLoginFromModal,
  DEFAULT_LOGIN_API_ERROR,
} from './components/header/login/headerLoginFlow';
export { completeLoginWithOtp, completeLoginWithOtp as completeLoginWithOtpFlow, completeForgotPasswordUpdate, completePasswordSignIn, isLoginOtpRedirectResult } from './components/header/login/loginWithOtpFlow';
export {
  submitEstablishSessionForm,
  resolveEstablishSessionAction,
  type EstablishSessionFlow,
} from './components/header/login/establishSessionForm';
export {
  parseHeaderUserSession,
  isHeaderUserLoggedIn,
  isGuestHeaderUserPayload,
  buildHeaderProfileMenuItems,
} from './components/header/headerUserSession';
export type {
  HeaderUserSession,
  HeaderUserSessionInput,
  HeaderUserApiEnvelope,
  HeaderUserApiData,
} from './components/header/headerUserSession';
export { HeaderAuthControls } from './components/header/HeaderAuthControls';
export { HeaderProfileMenu } from './components/header/HeaderProfileMenu';
export { HeaderLoginShellPortal } from './components/header/login/useHeaderLoginShell';
export { installHeaderAccessibilityFont } from './components/header/headerAccessibilityFont';
export { useHeaderAccessibilityFont } from './components/header/useHeaderAccessibilityFont';
export { loadBhashiniScript, findBhashiniWidget, BHASHINI_WIDGET_SELECTORS } from './utils/loadBhashiniScript';
export { useBhashiniWidgetPlacement } from './hooks/useBhashiniWidgetPlacement';
export {
  installFooterFeedbackFlow,
  applyFooterFeedbackConfig,
  validateFeedbackForm,
} from './components/footer/footerFeedbackFlow';
export {
  applyFooterFeedbackApiConfig,
  saveUserFeedback,
  triggerGeneralFeedbackReward,
  isFeedbackSubmitSuccess,
  SAVE_FEEDBACK_DATA_PATH,
} from './components/footer/footerFeedbackSubmit';
export { useFooterFeedbackShell } from './components/footer/useFooterFeedbackShell';
export { getShellApiFetchBaseUrl, buildShellApiUrl } from './components/header/login/headerLoginFlow';
export { DesktopMainNav } from './components/DesktopMainNav';
export { MYBHARAT_CDN_BASE, MYBHARAT_CDN_BASE_BETA, MYBHARAT_CDN_ORIGIN } from './constants/cdn';
export { DEFAULT_HEADER_MAIN_NAV } from './navigation/headerMainNav.defaults';
export { DEFAULT_HEADER2_MAIN_NAV } from './navigation/header2MainNav.defaults';
export { isSafeNavHref } from './navigation/navHref';
export { normalizeNavTree, isNavLinkItem, isNavGroupItem } from './navigation/navTree';
export { navTreeItemKey } from './navigation/navTreeKeys';
export {
  normalizeApiMenuTree,
  normalizeHrefForNav,
} from './navigation/navApiNormalize';
export { filterUnsafeNavTree } from './navigation/filterUnsafeNavTree';
export { prepareMainNavItems } from './navigation/prepareMainNavItems';
export { unwrapMenuListFromPayload } from './navigation/unwrapMenuList';
export { useMainNavItems } from './navigation/useMainNavItems';
export type { NormalizeNavTreeOptions } from './navigation/navTree';
export type { NormalizeApiMenuTreeOptions } from './navigation/navApiNormalize';
export type { PrepareMainNavItemsOptions } from './navigation/prepareMainNavItems';
export type { UseMainNavItemsOptions } from './navigation/useMainNavItems';
export type { NavTreeItem, NavLinkItem, NavGroupItem } from './navigation/types';

/** Published npm version — inlined at build from `package.json`. Compare with DevTools Sources banner. */
export const MYBHARAT_COMMON_FRONTEND_VERSION = __MYBHARAT_PKG_VERSION__;

export default { Header, Header2, Footer };
