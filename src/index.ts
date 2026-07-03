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
  openLoginWithOtpModal,
  openSignInPasswordModal,
  installHeaderLoginFlow,
  HEADER_LOGIN_SIGN_IN_SELECTORS,
  getKeycloakClientAccessToken,
  applyShellLoginApiConfig,
  validateOtpLoginForm,
  submitOtpLoginFromModal,
  DEFAULT_LOGIN_API_ERROR,
} from './components/header/login/headerLoginFlow';
export {
  fetchInternalKeycloakClientAccessToken,
  fetchInternalGuestOauthAccessToken,
  clearShellInternalAuthCache,
} from './components/header/login/shellLoginGateway';
export { completeLoginWithOtp, completeLoginWithOtp as completeLoginWithOtpFlow, completeForgotPasswordUpdate, completePasswordSignIn, isLoginOtpRedirectResult } from './components/header/login/loginWithOtpFlow';
export {
  submitEstablishSessionForm,
  resolveEstablishSessionAction,
  type EstablishSessionFlow,
} from './components/header/login/establishSessionForm';
export {
  readMbAppTokenFromGatewayResponse,
  setMbAuthSessionCookies,
  readShellCookieDomain,
} from './components/header/login/authSessionCookies';
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
export {
  GATEWAY_PATHS,
  INTERNAL_PATHS,
  PROXY_REWRITES,
  PORTAL_PATHS,
  DEV_API_PROXY_PREFIXES,
  APP_ROUTES,
  AUTH_CONFIG,
  EXTERNAL_URLS,
  DEFAULT_API_ERROR_MESSAGE,
  OTP_MESSAGES,
  resolveCdnBase,
  resolveCdnAssetUrl,
  resolveShellLoginConfig,
  assertRequiredClientConfig,
  mergeRequiredClientConfig,
  readClientEnvironment,
} from './config';
export type { ClientEnvironment, ShellRuntimeConfig } from './config';
export type { RequiredClientConfigInput } from './config/requireClientConfig';
export { resolveBrowserApiBaseUrl, isSameOriginApiBase } from './config/resolveBrowserApiBaseUrl';
export { useRequiredClientConfig } from './hooks/useRequiredClientConfig';
export {
  requireMainNavItems,
  resolveMainNavItemsFromProp,
  alertMainNavLoadFailed,
} from './navigation/requireMainNavItems';
export type { RequireMainNavItemsOptions } from './navigation/requireMainNavItems';
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
